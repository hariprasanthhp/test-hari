/**
 * JSONViewer - by Roman Makudera 2016 (c) MIT licence.
 * Adapted for Calix CC+ Generic Profile by Lumi.
 */
JSONViewer = (function () {
    var JSONViewer = function () {
        this._dom = {};
        this._dom.container = document.createElement("pre");
        this._dom.container.classList.add("json-viewer");
    };

    /**
     * Add path to each parameter
     */
    JSONViewer.prototype.addPath = function (parent, parentName) {
        var childrenNames = _.keys(parent);
        for (var i = 0; i < childrenNames.length; i++) {

            var childName = childrenNames[i];
            var child = parent[childName];

            if (typeof child === "object") {
                var path;
                if (parentName !== "root") {
                    path = parentName + "." + childName;
                    child["path"] = path;
                } else {
                    path = childName;
                }

                //recursive call
                this.addPath(child, path);
            }
        }
    };


    /**
     * Visualise JSON object.
     *
     * @param {Object|Array} json Input value
     * @param {Boolean} [isNetOps] true if user has NetOps permissions
     * @param {Number} [maxLvl] Process only to max level, where 0..n, -1 unlimited
     * @param {Number} [colAt] Collapse at level, where 0..n, -1 unlimited
     */
    JSONViewer.prototype.showJSON = function (json, isNetOps, maxLvl, colAt) {
        maxLvl = (typeof maxLvl === "number") ? maxLvl : -1; // -1 means unlimited
        colAt = (typeof colAt === "number") ? colAt : -1; // collapse at

        this.addPath(json, 'root');

        var jsonData = this._processInput(json);
        var walkEl = this._walk(jsonData, maxLvl, colAt, 0, isNetOps);

        this._dom.container.innerHTML = "";
        this._dom.container.appendChild(walkEl);
    };

    /**
     * Get container with pre object - this container is used for visualise JSON data.
     *
     * @return {Element}
     */
    JSONViewer.prototype.getContainer = function () {
        return this._dom.container;
    };

    /**
     * Process input JSON - throws exception for unrecognized input.
     *
     * @param {Object|Array} json Input value
     * @return {Object|Array}
     */
    JSONViewer.prototype._processInput = function (json) {
        if (json && typeof json === "object") {
            return json;
        }
        //else {
        //  throw "Input value is not object or array!";
        //}
    };

    JSONViewer.prototype._filter = function (items) {
        return items.filter(value => ['type', 'path', 'writable'].indexOf(value) === -1);
    };

    /**
     * Recursive walk for input value.
     *
     * @param {Object|Array} value Input value
     * @param {Number} maxLvl Process only to max level, where 0..n, -1 unlimited
     * @param {Number} colAt Collapse at level, where 0..n, -1 unlimited
     * @param {Number} lvl Current level
     * @param {Boolean} [isNetOps] if user is NetOp, add checkbox for parameter
     */
    JSONViewer.prototype._walk = function (value, maxLvl, colAt, lvl, isNetOps) {
        var frag = document.createDocumentFragment();
        var isMaxLvl = maxLvl >= 0 && lvl >= maxLvl;
        var isCollapse = colAt >= 0 && lvl >= colAt;
        var itemsCount;

        // Supported Types in the Profile "Set Parameter Value"
        let supportedTypes = ['boolean', 'string', 'int', 'unsignedInt', 'long', 'base64Binary', 'dateTime'];

        if (typeof value === "object") {
            if (value) {
                var isArray = Array.isArray(value);
                var items = isArray ? value : Object.keys(value);
                items = this._filter(items);

                if (items.length === 1 && _.has(items, 'value')) {
                    // simple value
                    frag.appendChild(this._createSimple(items.value));
                    return frag;
                }

                if (lvl === 0) {
                    // root level
                    var rootCount = this._createItemsCount(items.length);
                    // hide/show
                    var rootLink = this._createLink(isArray ? "[" : "{");

                    if (items.length) {
                        rootLink.addEventListener("click", function () {
                            if (isMaxLvl) return;

                            rootLink.classList.toggle("collapsed");
                            rootCount.classList.toggle("hide");

                            // main list
                            this._dom.container.querySelector("ul").classList.toggle("hide");
                        }.bind(this));

                        if (isCollapse) {
                            rootLink.classList.add("collapsed");
                            rootCount.classList.remove("hide");
                        }
                    } else {
                        rootLink.classList.add("empty");
                    }

                    rootLink.appendChild(rootCount);
                    frag.appendChild(rootLink);
                }

                if (items.length && !isMaxLvl) {
                    var len = items.length - 1;
                    var ulList = document.createElement("ul");
                    ulList.setAttribute("data-level", lvl);
                    ulList.classList.add("type-" + (isArray ? "array" : "object"));

                    items.forEach(function (key, ind) {
                        //for NetOps, add checkbox for parameter objects with "type" and "value"
                        var addCheckbox = false;
                        var addLogicCheckbox = false;
                        var currentObject = value[key];
                        if (isNetOps &&
                            (typeof currentObject === "object") &&
                            _.has(currentObject, "type") &&
                            _.has(currentObject, "value") &&
                            currentObject.writable &&
                            supportedTypes.indexOf(currentObject.type) >= 0) {
                            addCheckbox = true;
                        }
                        // if (isNetOps &&
                        //   (typeof currentObject === "object") &&
                        //   _.has(currentObject, "type") &&
                        //   _.has(currentObject, "value") &&
                        //   supportedTypes.indexOf(currentObject.type) >= 0) {
                        //   addLogicCheckbox = true;
                        // } 
                        var item = isArray ? key : value[key];
                        var li = document.createElement("li");

                        if (typeof item === "object") {
                            let itemKeys = _.keys(item);
                            itemKeys = this._filter(itemKeys);
                            // null or date
                            if (!item || item instanceof Date) {
                                li.appendChild(document.createTextNode(isArray ? "" : key + ": "));
                                li.appendChild(this._createSimple(item ? item : null));
                            }
                            // array & object
                            else {
                                var itemIsArray = Array.isArray(item);
                                if (itemIsArray) {
                                    itemKeys = this._filter(item);
                                }
                                var itemLen = itemKeys.length;

                                // empty
                                if (!itemLen) {
                                    li.appendChild(document.createTextNode(key + ": " + (itemIsArray ? "[]" : "{}")));
                                } else { // 1+ items
                                    if (itemLen === 1 && _.has(item, 'value') && item.type !== 'array') {
                                        let itemTitle = typeof key === "string" ? key + ": " : "";
                                        let value = item.value;
                                        li.appendChild(document.createTextNode(itemTitle));
                                        li.appendChild(this._createSimple(value));
                                        if (addCheckbox === true) {
                                            li.append(this._createCheckBoxParam(currentObject));
                                        }
                                        if (addLogicCheckbox === true) {
                                            li.append(this._createCheckBoxLogic(currentObject));
                                        }
                                    } else {
                                        var itemTitle = (typeof key === "string" ? key + ": " : "") + (itemIsArray ? "[" : "{");

                                        var itemLink = this._createLink(itemTitle);
                                        var itemsCount = this._createItemsCount(itemLen);

                                        // maxLvl - only text, no link
                                        if (maxLvl >= 0 && lvl + 1 >= maxLvl) {
                                            li.appendChild(document.createTextNode(itemTitle));
                                        } else {
                                            itemLink.appendChild(itemsCount);
                                            li.appendChild(itemLink);
                                        }

                                        if (addCheckbox === true) {
                                            li.append(this._createCheckBoxParam(currentObject));
                                        }
                                        if (addLogicCheckbox === true) {
                                            li.append(this._createCheckBoxLogic(currentObject));
                                        }
                                        li.appendChild(this._walk(item, maxLvl, colAt, lvl + 1, isNetOps));
                                        li.appendChild(document.createTextNode(itemIsArray ? "]" : "}"));

                                        var list = li.querySelector("ul");
                                        var itemLinkCb = function () {
                                            itemLink.classList.toggle("collapsed");
                                            itemsCount.classList.toggle("hide");
                                            list.classList.toggle("hide");
                                        };

                                        // hide/show
                                        itemLink.addEventListener("click", itemLinkCb);

                                        // collapse lower level
                                        if (colAt >= 0 && lvl + 1 >= colAt) {
                                            itemLinkCb();
                                        }
                                    }

                                }
                            }
                        }
                        // simple values
                        else {
                            // object keys with key:
                            if (!isArray) {
                                li.appendChild(document.createTextNode(key + ": "));
                            }

                            // recursive
                            li.appendChild(this._walk(item, maxLvl, colAt, lvl + 1, isNetOps));
                        }

                        // add comma to the end
                        if (ind < len) {
                            li.appendChild(document.createTextNode(","));
                        }

                        ulList.appendChild(li);
                    }, this);

                    frag.appendChild(ulList);
                } else if (items.length && isMaxLvl) {
                    itemsCount = this._createItemsCount(items.length);
                    itemsCount.classList.remove("hide");

                    frag.appendChild(itemsCount);
                }

                if (lvl === 0) {
                    // empty root
                    if (!items.length) {
                        itemsCount = this._createItemsCount(0);
                        itemsCount.classList.remove("hide");

                        frag.appendChild(itemsCount);
                    }

                    // root cover
                    frag.appendChild(document.createTextNode(isArray ? "]" : "}"));

                    // collapse
                    if (isCollapse) {
                        frag.querySelector("ul").classList.add("hide");
                    }
                }
                //break; //commented out by Lumi
            }
        } else {
            // simple value
            frag.appendChild(this._createSimple(value));
        }


        return frag;
    };

    /**
     * Create a param checkbox
     * Per convention, the id is set to the param path,
     * while the data-type property represents its type
     *
     * @return {Element}
     */
    JSONViewer.prototype._createCheckBoxParam = function (object) {
        var checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = "parameterCheckbox";

        if (object && _.has(object, "path")) {
            checkboxElement.id = object["path"];
        }

        if (_.has(object, "type")) {
            checkboxElement["data-type"] = object["type"];
            checkboxElement['data-value'] = object.value;
        }

        checkboxElement.classList.add('type-checkbox-param');

        return checkboxElement;
    };

    /**
     * Create a logic checkbox
     * Per convention, the id is set to the param path,
     * while the data-type property represents its type
     *
     * @return {Element}
     */
    JSONViewer.prototype._createCheckBoxLogic = function (object) {
        var checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.name = "logicCheckbox";

        if (object && _.has(object, "path")) {
            checkboxElement.id = object["path"];
        }

        if (_.has(object, "type")) {
            checkboxElement["data-type"] = object["type"];
            checkboxElement['data-value'] = object.value;
        }

        if (_.has(object, "writable")) {
            checkboxElement['data-writable'] = object.writable;
        } else {
            checkboxElement['data-writable'] = false;
        }

        checkboxElement.classList.add('type-checkbox-logic');

        return checkboxElement;
    };
    /**
     * Create simple value (no object|array).
     *
     * @param  {Number|String|null|undefined|Date} value Input value
     * @return {Element}
     */
    JSONViewer.prototype._createSimple = function (value) {
        var spanEl = document.createElement("span");
        var type = typeof value;
        var txt = value;

        if (type === "string") {
            txt = '"' + value + '"';
        } else if (value === null) {
            type = "null";
            txt = "null";
        } else if (value === undefined) {
            txt = "undefined";
        } else if (value instanceof Date) {
            type = "date";
            txt = value.toString();
        }

        spanEl.classList.add("type-" + type);
        spanEl.innerHTML = txt;

        return spanEl;
    };

    /**
     * Create items count element.
     *
     * @param  {Number} count Items count
     * @return {Element}
     */
    JSONViewer.prototype._createItemsCount = function (count) {
        var itemsCount = document.createElement("span");
        itemsCount.classList.add("items-ph");
        itemsCount.classList.add("hide");
        itemsCount.innerHTML = this._getItemsTitle(count);

        return itemsCount;
    };

    /**
     * Create clickable link.
     *
     * @param  {String} title Link title
     * @return {Element}
     */
    JSONViewer.prototype._createLink = function (title) {
        var linkEl = document.createElement("a");
        linkEl.classList.add("list-link");
        linkEl.href = "javascript:void(0)";
        linkEl.innerHTML = title || "";

        return linkEl;
    };

    /**
     * Get correct item|s title for count.
     *
     * @param  {Number} count Items count
     * @return {String}
     */
    JSONViewer.prototype._getItemsTitle = function (count) {
        var itemsTxt = count > 1 || count === 0 ? "items" : "item";

        return (count + " " + itemsTxt);
    };

    return JSONViewer;
})();
