"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[4604,5381,0],{86295:function(r,t,e){var n,a,o;o=function(r){function t(r,t,e,n){r.hasOwnProperty(t)||(r[t]=n.apply(null,e))}t(r=r?r._modules:{},"Extensions/NoDataToDisplay.js",[r["Core/Renderer/HTML/AST.js"],r["Core/Chart/Chart.js"],r["Core/DefaultOptions.js"],r["Core/Utilities.js"]],function(r,t,e,n){var a=e.getOptions;e=n.addEvent;var o=n.extend;n=t.prototype,a=a(),o(a.lang,{noData:"No data to display"}),a.noData={attr:{zIndex:1},position:{x:0,y:0,align:"center",verticalAlign:"middle"},style:{fontWeight:"bold",fontSize:"12px",color:"#666666"}},n.showNoData=function(t){var e=this.options;t=t||e&&e.lang.noData||"",e=e&&(e.noData||{}),this.renderer&&(this.noDataLabel||(this.noDataLabel=this.renderer.label(t,0,0,void 0,void 0,void 0,e.useHTML,void 0,"no-data").add()),this.styledMode||this.noDataLabel.attr(r.filterUserAttributes(e.attr||{})).css(e.style||{}),this.noDataLabel.align(o(this.noDataLabel.getBBox(),e.position||{}),!1,"plotBox"))},n.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())},n.hasData=function(){for(var r=this.series||[],t=r.length;t--;)if(r[t].hasData()&&!r[t].options.isInternal)return!0;return this.loadingShown},e(t,"render",function(){this.hasData()?this.hideNoData():this.showNoData()})}),t(r,"masters/modules/no-data-to-display.src.js",[],function(){})},r.exports?(o.default=o,r.exports=o):(n=[e(1282)],void 0!==(a=(function(r){return o(r),o.Highcharts=r,o}).apply(t,n))&&(r.exports=a))},43721:function(r,t,e){e.d(t,{o:function(){return i}});var n=e(49457),a=e(84487),o=e(37716),u=e(7450);const s="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",l=".xlsx";let i=(()=>{class r{constructor(r){this.translateService=r,this.language=this.translateService.defualtLanguage,this.languageSubject=this.translateService.selectedLanguage.subscribe(r=>{console.log("check"),this.language=r,this.isRerender=!0})}exportAsExcelFile(r,t){const e={Sheets:{data:a.utils.json_to_sheet(r)},SheetNames:["data"]},n=a.write(e,{bookType:"xlsx",type:"array"});this.saveAsExcelFile(n,t)}saveAsExcelFile(r,t){const e=new Blob([r],{type:s});n.saveAs(e,"Software_Versions_Report"+l)}exportAsExcelFileUSR(r,t){const e={Sheets:{data:a.utils.json_to_sheet(r)},SheetNames:["data"]},n=a.write(e,{bookType:"xlsx",type:"array"});this.saveAsCSVFile(n,t)}saveAsCSVFile(r,t){var e=new Blob([r],{type:"text/csv"});n.saveAs(e,"Unassociated_Systems_Report.csv")}saveAsExcelFileUSR(r,t){const e=new Blob([r],{type:s});n.saveAs(e,"Unassociated_System_Report"+l)}mobileValidator(r){return!(void 0!==r&&""!==r&&null!==r&&!isNaN(r))||10!==r.length}emailValidator(r){return!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r)}stringValidator(r){return void 0===r||""===r||null===r}numberValidator(r){return void 0===r||""===r||null===r||!!isNaN(r)}thresholdValidator(r){return!(void 0!==r&&""!==r&&null!==r&&!isNaN(r)&&r>=30&&r<=999)}resendValidator(r){return!(void 0!==r&&""!==r&&null!==r&&!isNaN(r)&&r>=45&&r<=365)}confirmPasswordValidator(r,t){let e=this.stringValidator(r),n=this.stringValidator(t);return!(!e&&!n)||r!==t}percentageValidator(r){return!(!r&&0!=r)&&(r>100||r<=0)}durationValidator(r){return!(!r&&0!=r)&&(r>99||r<=0)}stringValidatorWithCrossScriptAndErrorMsg(r){return void 0===r||""===r||null===r?{error:!0,errorMsg:void 0}:r.includes("<")||r.includes(">")?{error:!0,errorMsg:this.language.Script_not}:0==r.replaceAll(" ","").length?{error:!0,errorMsg:this.language.Valid_Text}:{error:!1,errorMsg:void 0}}urlValidation(r){var t=this.isUrlValid(r);return r?0==t?{error:!0,errorMsg:this.language.Enter_valid_URL}:1==t?{error:!1,errorMsg:void 0}:void 0:this.stringValidatorWithCrossScriptAndErrorMsg(r)}isUrlValid(r){return/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(r)}isValidIpV4Addr(r){return-1==r.indexOf("/")?/^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(r):/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(3[0-2]|[1-2][0-9]|[0-9]))$/.test(r)}isValidIpV6Addr(r){return/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/g.test(r)}isValidateIPHostName(r){return/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(r)}isValidSubnetV4(r){return/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))$/.test(r)}isValidSubnetV6(r){return/^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))$/.test(r)}}return r.\u0275fac=function(t){return new(t||r)(o.LFG(u.s))},r.\u0275prov=o.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},77351:function(r,t,e){e.d(t,{Z:function(){return o}});var n=e(3679),a=e(37716);let o=(()=>{class r{validate(r){if(n.kI.required(r))return null;let t=r.value;return isNaN(this.customMax)?null:t.length>this.customMax?{customMax:!0}:null}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=a.lG2({type:r,selectors:[["","customMax","","formControlName",""],["","customMax","","formControl",""],["","customMax","","ngModel",""]],inputs:{customMax:"customMax"},features:[a._Bn([{provide:n.Cf,useExisting:r,multi:!0}])]}),r})()},26329:function(r,t,e){e.d(t,{a:function(){return o}});var n=e(3679),a=e(37716);let o=(()=>{class r{validate(r){if(n.kI.required(r))return null;let t=r.value;return isNaN(this.customMin)?null:t.length<this.customMin?{customMin:!0}:null}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=a.lG2({type:r,selectors:[["","customMin","","formControlName",""],["","customMin","","formControl",""],["","customMin","","ngModel",""]],inputs:{customMin:"customMin"},features:[a._Bn([{provide:n.Cf,useExisting:r,multi:!0}])]}),r})()},74375:function(r,t,e){e.d(t,{v:function(){return o}});var n=e(3679),a=e(37716);let o=(()=>{class r{validate(r){if(n.kI.required(r))return null;let t=r.value;return isNaN(t)?null:+t<0?{customNeg:!0}:null}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=a.lG2({type:r,selectors:[["","customNeg","","formControlName",""],["","customNeg","","formControl",""],["","customNeg","","ngModel",""]],features:[a._Bn([{provide:n.Cf,useExisting:r,multi:!0}])]}),r})()},99178:function(r,t,e){e.d(t,{a:function(){return o}});var n=e(3679),a=e(37716);let o=(()=>{class r{validate(r){if(n.kI.required(r))return null;let t=r.value;return!isNaN(this.customNumMax)&&!isNaN(t)&&t>0&&+t>this.customNumMax?{customNumMax:!0}:null}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=a.lG2({type:r,selectors:[["","customNumMax","","formControlName",""],["","customNumMax","","formControl",""],["","customNumMax","","ngModel",""]],inputs:{customNumMax:"customNumMax"},features:[a._Bn([{provide:n.Cf,useExisting:r,multi:!0}])]}),r})()},28931:function(r,t,e){e.d(t,{D:function(){return o}});var n=e(3679),a=e(37716);let o=(()=>{class r{validate(r){if(n.kI.required(r))return null;let t=r.value;return!isNaN(this.customNumMin)&&!isNaN(+t)&&+t>=0&&+t<+this.customNumMin?{customNumMin:!0}:null}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275dir=a.lG2({type:r,selectors:[["","customNumMin","","formControlName",""],["","customNumMin","","formControl",""],["","customNumMin","","ngModel",""]],inputs:{customNumMin:"customNumMin"},features:[a._Bn([{provide:n.Cf,useExisting:r,multi:!0}])]}),r})()},27492:function(r,t,e){e.d(t,{sH:function(){return a},ZS:function(){return o},zm:function(){return u},yK:function(){return s},ov:function(){return l},w_:function(){return i},b8:function(){return d},eS:function(){return c}});var n=e(9579);function a(r,t,e){return n=>{const a=n.controls[r],o=n.controls[t];if(!a||!o||o.errors&&!o.errors.mustMatch||e&&(!a.value||!o.value))return null;o.setErrors(a.value>o.value?{mustMatch:!0}:null)}}function o(r,t){return e=>{const a=e.controls[r],o=e.controls[t];if(!a||!o||o.errors&&!o.errors.ipBeforeValidate||a.errors&&!a.errors.ipBeforeValidate)return null;var u=null,s=null;a.value&&o.value&&(u=(0,n.l5)(a.value),s=(0,n.l5)(o.value)),u<=s?(a.setErrors(null),o.setErrors(null)):(a.setErrors({ipBeforeValidate:!0}),o.setErrors({ipBeforeValidate:!0}))}}function u(r,t){return e=>{const a=e.controls[r],o=e.controls[t];if(!a||!o||a.errors&&!a.errors.IpNetworkBroadcast||o.errors&&!o.errors.IpNetworkBroadcast)return null;var u=null,s=null,l=null,i=null;a.value&&o.value&&(i=((l=((u=(0,n.l5)(a.value))>>>0&(s=(0,n.l5)(o.value))>>>0)>>>0)|~s)>>>0),u<=l||u>=i?(a.setErrors({IpNetworkBroadcast:!0}),o.setErrors({IpNetworkBroadcast:!0})):(a.setErrors(null),o.setErrors(null))}}function s(r,t,e){return a=>{const o=a.controls[t],u=a.controls[e],s=a.controls[r];if(!o||!u||!s||s.errors&&!s.errors.ipIsOutside||u.errors&&!u.errors.ipIsOutside||o.errors&&!o.errors.ipIsOutside)return null;var l=null,i=null,d=null;o.value&&u.value&&s.value&&(l=(0,n.l5)(o.value),i=(0,n.l5)(u.value),d=(0,n.l5)(s.value)),d<l||d>i?(o.setErrors(null),u.setErrors(null),s.setErrors(null)):(o.setErrors({ipIsOutside:!0}),u.setErrors({ipIsOutside:!0}),s.setErrors({ipIsOutside:!0}))}}function l(r,t,e,a){return o=>{const u=o.controls[t],s=o.controls[e],l=o.controls[r],i=o.controls[a];if(!u||!s||!l||!i||l.errors&&!l.errors.sameIpNetwork||u.errors&&!u.errors.sameIpNetwork||s.errors&&!s.errors.sameIpNetwork||i.errors&&!i.errors.sameIpNetwork)return null;var d=null,c=null,f=null,F=null,m=null;u.value&&s.value&&l.value&&i.value&&(d=(0,n.l5)(u.value),c=(0,n.l5)(s.value),f=(0,n.l5)(l.value),m=(F=(0,n.l5)(i.value))&f),m!=(F&d)||m!=(F&c)?(l.setErrors({sameIpNetwork:!0}),s.setErrors({sameIpNetwork:!0}),u.setErrors({sameIpNetwork:!0}),i.setErrors({sameIpNetwork:!0})):(l.setErrors(null),s.setErrors(null),u.setErrors(null),i.setErrors(null))}}function i(r,t,e){return a=>{const o=a.controls[r],u=a.controls[e],s=a.controls[t];if(!o||!u||!s||o.errors&&!o.errors.maxNetworkBroadcast||u.errors&&!u.errors.maxNetworkBroadcast||s.errors&&!s.errors.maxNetworkBroadcast)return null;var l=null,i=null,d=null,c=null,f=null;s.value&&(l=(0,n.l5)(o.value),i=(0,n.l5)(u.value),d=(0,n.l5)(s.value),f=((c=(l>>>0&i>>>0)>>>0)|~i)>>>0),d<=c||d>=f?(o.setErrors({maxNetworkBroadcast:!0}),u.setErrors({maxNetworkBroadcast:!0}),s.setErrors({maxNetworkBroadcast:!0})):(o.setErrors(null),u.setErrors(null),s.setErrors(null))}}function d(r,t,e){return a=>{const o=a.controls[r],u=a.controls[t],s=a.controls[e];if(!o||!u||!s||o.errors&&!o.errors.minNetworkBroadcast||u.errors&&!u.errors.minNetworkBroadcast||s.errors&&!s.errors.minNetworkBroadcast)return null;var l=null,i=null,d=null,c=null,f=null;o.value&&u.value&&s.value&&(l=(0,n.l5)(o.value),i=(0,n.l5)(u.value),d=(0,n.l5)(s.value),f=((c=(l>>>0&i>>>0)>>>0)|~i)>>>0),d<=c||d>=f?(o.setErrors({minNetworkBroadcast:!0}),u.setErrors({minNetworkBroadcast:!0}),s.setErrors({minNetworkBroadcast:!0})):(o.setErrors(null),u.setErrors(null),s.setErrors(null))}}function c(r,t){return e=>{const n=e.controls[r],a=e.controls[t];if(!n||!a||a.errors&&!a.errors.longDigitTimer)return null;n.value&&a.value&&a.setErrors(n.value>a.value||n.value==a.value?{longDigitTimer:!0}:null)}}},9579:function(r,t,e){e.d(t,{wd:function(){return n},dJ:function(){return o},Nm:function(){return u},v:function(){return s},l5:function(){return l},p2:function(){return i},Z_:function(){return d},Ai:function(){return c},Nr:function(){return f},RR:function(){return F},oE:function(){return m},n9:function(){return v},cU:function(){return p},nY:function(){return A},Yr:function(){return h},SC:function(){return N},F8:function(){return g},sW:function(){return S},Rv:function(){return D},qn:function(){return y},Yq:function(){return M}});const n=[{id:"",name:""},{id:"AESEncryption",name:"AES"}],a={SecurityOff:"Security Off","WPA-PSK":"WPA-Personal","WPA2-PSK":"WPA2-Personal","WPA/WPA2-PSK":"WPA WPA2-Personal","WPA3-PSK":"WPA3-Personal","WPA2/WPA3-PSK":"WPA2 WPA3-Personal","WPA3-SAE":"WPA3-SAE"},o=/^[ssid,SSID]{4}[0-9]+/,u=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,s=/^[a-zA-Z0-9\_\!\@\#\$\%\^\&\*\(\)\-\=\+\~\`\,\s\.\?\|\[\]\{\}\"\;\:\,\<\>\\\/\']*$/;function l(r){var t=r.split(".");return 256*(256*(256*t[0]+parseInt(t[1]))+parseInt(t[2]))+parseInt(t[3])}const i="The SSID Name may only contain letters [a-zA-Z], numbers [0-9], spaces, or [_!@#$%^&*()-=+~`,.?|[]{}\";:<>/'] , head or trailing spaces are not allowed";function d(r){let t=r.split("/");return(t[0]+"//"+t[2]).split("?")[0]}function c(r,t,e){var n={},a=null==t?void 0:t.filter(t=>t.featureName==r.SSIDName)[0];return a&&a.fields.forEach(r=>{if("boolean"==typeof r.writable)n[r.name]=r.writable;else{let a=Object.keys(r.writable);var t=null==e?void 0:e.filter(r=>r.SSIDName==a[0].split(".")[0]);n[r.name]=function(r){return r.Enable}(t[0])}}),n}function f(r,t,e){var n=[],a=null==t?void 0:t.filter(t=>t.featureName==r.SSIDName)[0];return a&&a.fields.forEach(r=>{e&&e.forEach(t=>{"BeaconType"===r.name&&r.valueList&&r.valueList.forEach(r=>{(r==t.id||r==t.name)&&n.push(t)})})}),n}function F(r,t,e){var n=[];return r&&r.fields.forEach(r=>{e&&e.forEach(t=>{"BeaconType"===r.name&&r.valueList&&r.valueList.forEach(r=>{(r==t.id||r==t.name)&&n.push(t)})})}),n}function m(r){var t=!1;return r&&0!=(null==r?void 0:r.length)&&r.forEach(r=>{0!=Object.keys(r).length&&(r.id.match("2.4G")||r.id.match("5G")||r.id.match("6G"))&&(t=!0)}),t}function v(r){var t=[],e=[],n=[];return r.forEach(r=>{"2.4GHz"==r.freqBand?t.push(r):"5GHz"==r.freqBand?e.push(r):"6GHz"==r.freqBand&&n.push(r)}),{"2.4G":t,"5G":e,"6G":n}}function p(r,t){switch(r){case"2.4G":for(let r=0;r<t.length;r++)if(t[r].id.match("2.4G"))return t[r];case"5G":for(let r=0;r<t.length;r++)if(t[r].id.match("5G"))return t[r];case"6G":for(let r=0;r<t.length;r++)if(t[r].id.match("6G"))return t[r]}}function A(r){var t=[],e=r.properties.filter(r=>r.featureName.includes("SecurityOptions"))[0];return e&&e.configuration&&Object.keys(e.configuration).forEach(r=>{e.configuration[r]&&t.push({id:e.configuration[r].BeaconType,name:r})}),t}function h(r,t){var e,n=null===(e=null==r?void 0:r.properties)||void 0===e?void 0:e.filter(r=>r.featureName.includes("SecurityOptions"))[0];if(n&&n.configuration)return function(r,t,e){var n=[];return Object.keys(a).forEach(a=>{if(r[a]&&r[a].BeaconType==e)for(let e=0;e<t.length;e++){var o=r[a][t[e]];if(o){if(E(o))return void o.forEach(r=>{n.push(N(r))});if("string"!=typeof o){let r=[],t=[],e=[];return Object.keys(o).forEach(n=>{n.match("2.4G")&&o[n].forEach(t=>{r.push(N(t))}),n.match("5G")&&o[n].forEach(r=>{t.push(N(r))}),n.match("6G")&&o[n].forEach(r=>{e.push(N(r))})}),n.push({id:"2.4G",name:r}),n.push({id:"5G",name:t}),void n.push({id:"6G",name:e})}}}}),n}(n.configuration,["BasicEncryptionModes","WPAEncryptionModes","IEEE11iEncryptionModes"],t)}function E(r){return Array.isArray(r)&&r.length&&r.every(r=>"string"==typeof r)}function N(r){var t={};switch(r){case"AESEncryption":t={id:"AESEncryption",name:"AES"};break;case"TKIPEncryption":t={id:"TKIPEncryption",name:"TKIP"};break;case"TKIPandAESEncryption":t={id:"TKIPandAESEncryption",name:"Both"};break;case"tkip+aes":t={id:"tkip+aes",name:"TKIP+AES"};break;case"aes":t={id:"aes",name:"AES"}}return t}function g(r){try{return JSON.parse(r)}catch(t){return!1}}function S(r){for(var t in r)(null==r[t]||""===r[t])&&delete r[t];return r}function D(r){return r.filter(function(r){return null!=r})}function y(r,t){return delete r[t],r}function M(r,t,e){var n;let a=1;"X_CALIX_SXACC_PRIMARY_2DOT4GHZ_SSID"==t?a=1:"X_CALIX_SXACC_PRIMARY_5GHZ_SSID"==t?a=9:"X_CALIX_SXACC_GUEST_2DOT4GHZ_SSID"==t?a=2:"X_CALIX_SXACC_GUEST_5GHZ_SSID"==t?a=10:"X_CALIX_SXACC_PRIMARY_6GHZ_SSID"==t?a=17:"X_CALIX_SXACC_GUEST_6GHZ_SSID"==t&&(a=18);let o=e.properties.filter(r=>r.featureName=="SSID"+a);if(o.length){let t=o[0].fields.filter(r=>"BeaconType"==r.name).length?null===(n=o[0].fields.filter(r=>"BeaconType"==r.name)[0])||void 0===n?void 0:n.valueList:[];return r.filter(r=>t.includes(r.id))}return r}},94690:function(r,t,e){e.d(t,{e:function(){return s}});var n=e(11067),a=e(65424),o=e.n(a),u=e(37716);o()(n);let s=(()=>{class r{constructor(){}bitsToSize(r,t){var e;let a=r;if(0==a)return"0";var o=Math.floor(Math.log(a)/Math.log(1e3));let u=null!==(e=["bps","Kbps","Mbps","Gbps","Tbps"][o])&&void 0!==e?e:"bits";return t?Math.round(a/Math.pow(1e3,o))+" "+u:n.numberFormat(Math.abs(a/Math.pow(1e3,o)),2)+" "+u}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=u.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);