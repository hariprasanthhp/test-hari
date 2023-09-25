"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[6628],{16628:function(t,e,a){a.d(e,{Q:function(){return O}});var i=a(11067),s=a(65424),r=a.n(s),n=a(40006),l=a.n(n),o=a(37716),h=a(7450),c=a(48483),p=a(51071),d=a(38048),g=a(38583),b=a(25317);function u(t,e){if(1&t&&(o.TgZ(0,"span",16),o._UZ(1,"i",17),o._uU(2),o.qZA()),2&t){const t=o.oxw(2);o.xp6(2),o.hij(" ",t.upRate," ")}}function m(t,e){if(1&t&&(o.TgZ(0,"span",18),o._UZ(1,"i",19),o._uU(2),o.qZA()),2&t){const t=o.oxw(2);o.xp6(2),o.hij(" ",t.downRate,"")}}function C(t,e){if(1&t&&o._UZ(0,"highcharts-chart",20),2&t){const t=o.oxw(2);o.Q6J("Highcharts",t.highcharts)("options",t.streamOptions)("callbackFunction",t.chartCallback)}}const x=function(t){return{"background-color":t}};function f(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",1),o.TgZ(1,"div",2),o.TgZ(2,"div",3),o.TgZ(3,"div",4),o.TgZ(4,"span",5),o._uU(5),o.qZA(),o.TgZ(6,"a",6),o.NdJ("click",function(){return o.CHM(t),o.oxw().toggleUpStream()}),o._UZ(7,"span",7),o._uU(8),o.qZA(),o.TgZ(9,"a",8),o.NdJ("click",function(){return o.CHM(t),o.oxw().toggleDownStream()}),o._UZ(10,"span",7),o._uU(11),o.qZA(),o.TgZ(12,"span",9),o._uU(13),o.qZA(),o.qZA(),o.TgZ(14,"div",10),o.TgZ(15,"span",11),o.YNc(16,u,3,1,"span",12),o.YNc(17,m,3,1,"span",13),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(18,"div",14),o.YNc(19,C,1,3,"highcharts-chart",15),o.qZA(),o.qZA()}if(2&t){const t=o.oxw();o.xp6(4),o.s9C("title",t.chartName),o.xp6(1),o.hij(" ",t.chartName," "),o.xp6(2),o.Q6J("ngStyle",o.VKq(10,x,!0===t.isUpStreamVisible?"#0027FF":"grey")),o.xp6(1),o.hij(" ",t.language.up," "),o.xp6(2),o.Q6J("ngStyle",o.VKq(12,x,!0===t.isDownStreamVisible?"#00d0ff":"grey")),o.xp6(1),o.hij(" ",t.language.down," "),o.xp6(2),o.hij("",t.language.interval," 1 sec"),o.xp6(3),o.Q6J("ngIf",t.isUpStreamVisible),o.xp6(1),o.Q6J("ngIf",t.isDownStreamVisible),o.xp6(2),o.Q6J("ngIf",t.load)}}r()(i),l()(i);let O=(()=>{class t{constructor(t,e,a,s){this.customTranslateService=t,this.dateUtilsService=e,this.websocketService=a,this.sso=s,this.load=!0,this.title="myHighchart",this.highcharts=i,this.yAxixTitle="",this.pageAvailable=!1,this.windowLen=5,this.selectedFilter=1,this.selectedLocation=[],this.selectedApplication=[],this.selectedRegion=[],this.selectedSystem=[],this.lastData=[0,0],this.chartData=[0,0],this.lastChartDataObj={},this.triggerReloadChart=!1,this.minutes=[5,10,15,20,25,30],this.msgLen=0,this.inc=0,this.isDownStreamVisible=!0,this.isUpStreamVisible=!0,this.conversions={bps:1,Kbps:1e3,Mbps:1e6,Gbps:1e9,Tbps:1e12,pps:1,Kpps:1e3,Mpps:1e6,Gpps:1e9,Tpps:1e12},this.reloadChart=!1,this.sizes={bps:1,Kbps:1e3,Mbps:1e6,Gbps:1e9,Tbps:1e12,pps:1,Kpps:1e3,Mpps:1e6,Gpps:1e9,Tpps:1e12}}ngOnInit(){this.language=this.customTranslateService.defualtLanguage,this.language&&(this.pageAvailable=!0),this.customTranslateService.selectedLanguage.subscribe(t=>{this.language=t,i.setOptions({lang:{resetZoom:this.language.resetButton}})})}ngOnChanges(t){this.chartName.toLowerCase(),t.data&&t.data.currentValue&&this.data&&(this.msgLen++,this.yAxixTitle=this.getYAxisTitle(t.data.currentValue),this.originalData=t.data.currentValue,this.bitsToSize(this.data[0]),this.bitsToSize(this.data[1]),this.chartName.toLowerCase(),this.currentData?(this.lastData=this.currentData,this.chartData=this.currentData):(this.lastData=[0,0],this.chartData=[0,0]),this.currentData=this.data),t.monitorId&&t.monitorId.currentValue&&(this.lastChartDataObj={},this.lastData=[0,0],this.currentData=[0,0],this.buildNewChart()),t.selectedFilter&&t.selectedFilter.currentValue&&(this.selectedFilter=t.selectedFilter.currentValue,"/cco/health/pon-utilization/realtime/realtime-basic"!=window.location.pathname&&this.websocketService.setWindowLen(this.selectedFilter),this.buildNewChart()),t.selectedLocation&&t.selectedLocation.currentValue&&(this.selectedLocation=t.selectedLocation.currentValue,this.buildNewChart()),t.selectedApplication&&t.selectedApplication.currentValue&&(this.selectedApplication=t.selectedApplication.currentValue,this.buildNewChart()),t.selectedRegion&&t.selectedRegion.currentValue&&(this.selectedRegion=t.selectedRegion.currentValue,this.buildNewChart()),t.selectedSystem&&t.selectedSystem.currentValue&&(this.selectedSystem=t.selectedSystem.currentValue,this.buildNewChart()),t.windowLen&&t.windowLen.currentValue&&this.data&&(this.time=1e3*this.dateUtilsService.getCurrentUtcTime(),this.triggerReloadChart=!1,this.load=!0,this.yAxixTitle="rate"===this.chartName.toLowerCase()?"bps":"pps",this.lastChartDataObj=this.history?this.history:{},Object.keys(this.lastChartDataObj).length?(this.lastData=this.data,this.chartData=this.data,this.rebuildData()):this.buildNewChart()),t.history&&t.history.currentValue&&(this.lastChartDataObj=this.history?this.history:{},Object.keys(this.lastChartDataObj).length?(this.lastData=this.data,this.chartData=this.data,this.rebuildData()):this.buildNewChart())}chartCallback(t){}toggleDownStream(){this.streamOptions.series[1].visible?(this.streamOptions.series[1].visible=!1,this.isDownStreamVisible=!1):(this.streamOptions.series[1].visible=!0,this.isDownStreamVisible=!0),this.rebuildData()}toggleUpStream(){this.streamOptions.series[0].visible?(this.streamOptions.series[0].visible=!1,this.isUpStreamVisible=!1):(this.streamOptions.series[0].visible=!0,this.isUpStreamVisible=!0),this.rebuildData()}ngOnDestroy(){this.streamOptions={},clearInterval(this.interval),clearInterval(this.interval2),this.interval=null,this.interval2=null}transformData(t,e,a){this.chartName.toLowerCase(),(!e||!e.length)&&(e=[0,0]);let i=[];for(let s=0;s<t.length;s++){let r=parseFloat(t[s])-parseFloat(e[s]);!parseFloat(t[s])&&!parseFloat(e[s])&&(a[s]=0);let n=r/15,l=parseFloat(a[s])+n;i.push(l)}return!i[0]&&!i[1]&&(t[0]||t[1])&&this.msgLen>2&&(i=t),i}bitsToSize(t){let e=parseFloat(t),a="rate"===this.chartName.toLowerCase()?["bps","Kbps","Mbps","Gbps","Tbps"]:["pps","Kpps","Mpps","Gpps","Tpps"];if(0==e&&"rate"===this.chartName.toLowerCase())return"0 bps";if(0==e&&"packet"===this.chartName.toLowerCase())return"0 pps";var s=Math.floor(Math.log(e)/Math.log(1e3));return i.numberFormat(Math.abs(e/Math.pow(1e3,s)),2)+" "+a[s]}removeLast3Chars(t){return t=(t=t.toString()).slice(0,-3),parseInt(t)}removeOldKeys(){let t=Object.keys(this.lastChartDataObj),e=t.length;if(e>1800){let a=this.lastChartDataObj,i=e-1800;for(let e=0;e<i;e++)delete a[t[e]];this.lastChartDataObj=a}}getPacketRate(t){let e=t,a="rate"===this.chartName.toLowerCase()?["bps","Kbps","Mbps","Gbps","Tbps"]:["pps","Kpps","Mpps","Gpps","Tpps"];if(0==e&&"rate"===this.chartName.toLowerCase())return"0 bps";if(0==e&&"packet"===this.chartName.toLowerCase())return"0 pps";var i=Math.floor(Math.log(e)/Math.log(1024));return Math.round(e/Math.pow(1e3,i))+" "+a[i]}timezoneDetected(){var t,e=new Date("1/1/"+(new Date).getUTCFullYear()),a=1e4;for(t=0;t<12;t++)e.setUTCMonth(e.getUTCMonth()+1),a>-1*e.getTimezoneOffset()&&(a=-1*e.getTimezoneOffset());return parseInt(this.sso.getRealtimeDelay())}rebuildData(){if(this.chartName.toLowerCase(),Object.keys(this.lastChartDataObj).length){let t,e=(new Date).getTime()+this.timezoneDetected();for(t=-299;t<=0;t+=1){let a=this.removeLast3Chars(e+1e3*t);void 0===this.lastChartDataObj[a]&&void 0!==this.lastChartDataObj[a-1]?this.lastChartDataObj[a]=this.lastChartDataObj[a-1]:void 0===this.lastChartDataObj[a]&&void 0!==this.lastChartDataObj[a-2]&&(this.lastChartDataObj[a]=this.lastChartDataObj[a-2])}this.reloadChart=!0,this.buildNewChart()}}buildNewChart(){var t,e;this.time=1e3*this.dateUtilsService.getCurrentUtcTime(),this.streamOptions={};let a=this.timezoneDetected();(new Date).getTime();let s=this;this.streamOptions={chart:{type:"areaspline",zoomType:"x",height:200,events:{load:function(){let t="rate"===s.chartName.toLowerCase()?["bps","Kbps","Mbps","Gbps","Tbps"]:["pps","Kpps","Mpps","Gpps","Tpps"];var e=this.series;s.interval=setInterval(function(){s.inc++;let r=s.transformData(s.currentData,s.lastData,s.chartData);s.chartData=r,r[0]||(r[0]=0),r[1]||(r[1]=0);let n=s.bitsToSize(r[0]),l=s.bitsToSize(r[1]),o=n.split(" "),h=l.split(" "),c=o[0],p=h[0],d=o[1]?o[1]:"rate"===s.chartName.toLowerCase()?"bps":"pps",g=h[1]?h[1]:"rate"===s.chartName.toLowerCase()?"bps":"pps",b="";if(d="undefined"==d?"rate"===s.chartName.toLowerCase()?"bps":"pps":d,g="undefined"==g?"rate"===s.chartName.toLowerCase()?"bps":"pps":g,b=r[0]||r[1]?r[0]>r[1]?o[1]:h[1]:s.yAxixTitle?s.yAxixTitle:"rate"===s.chartName.toLowerCase()?"bps":"pps","undefined"==b&&(b=s.yAxixTitle?s.yAxixTitle:"rate"===s.chartName.toLowerCase()?"bps":"pps"),null!=b&&s.yAxixTitle!=b&&(r[0]||r[1]))return s.yAxixTitle=b,s.streamOptions.yAxis.title.text=s.yAxixTitle,void s.rebuildData();"string"==typeof b&&(s.yAxixTitle=b);let u=parseFloat(o[0]),m=parseFloat(h[0]);if((r[0]||r[1])&&r[0]<r[1]&&o[1]!==h[1]){let e=t.indexOf(o[1]),a=t.indexOf(h[1])-e;if(a)for(let t=a;t>0;t--)u/=1e3}if((r[0]||r[1])&&r[0]>r[1]&&o[1]!==h[1]){let e=t.indexOf(o[1])-t.indexOf(h[1]);if(e)for(let t=e;t>0;t--)m/=1e3}if(r){var C=(new Date).getTime()+a;let t=parseFloat(i.numberFormat(Math.abs(u),2));s.upRate=`${c} ${d||("rate"===s.chartName.toLowerCase()?"bps":"pps")}`,t=parseFloat(i.numberFormat(Math.abs(m),2)),s.removeOldKeys(),s.downRate=`${p} ${g||("rate"===s.chartName.toLowerCase()?"bps":"pps")}`,e[0].addPoint([C,u],!0,!0),e[1].addPoint([C,-m],!0,!0);let n=s.removeLast3Chars(C);if(s.lastChartDataObj[n]=[r[0],r[1],s.yAxixTitle,d,g],s.lastChartDataObj[n+1]=[r[0],r[1],s.yAxixTitle,d,g],e[0].chart.resetZoomButton&&e[0].xData.length){let t=e[0].chart.xAxis[0].getExtremes();e[0].chart.xAxis[0].setExtremes(t.min+1200,t.max+1200)}s.websocketService.shouldReflow&&e[0].chart.reflow()}},1e3)}}},time:{useUTC:!1},title:{text:""},colors:["#0027FF","#5ACFEA"],xAxis:{type:"datetime",tickPixelInterval:120},yAxis:{gridLineDashStyle:"longdash",opposite:!1,startOnTick:!1,endOnTick:!1,title:{text:this.yAxixTitle,margin:40},labels:{align:"left",x:-35,formatter:function(){return Math.abs(this.value)}}},credits:{enabled:!1},plotOptions:{areaspline:{lineWidth:1,marker:{enabled:!1},fillOpacity:.75},spline:{animation:!1,marker:{enabled:!1,radius:.9,lineWidth:.7}},series:{turboThreshold:1e6}},tooltip:{formatter:function(){var t=s.dateUtilsService.getLocalRealtimeDateFormat(this.point.x);return s.removeLast3Chars(this.point.x),"up"==this.series.name?`<b> ${t}  </b><br/>\n            ${s.language.Upstream}: ${i.numberFormat(Math.abs(this.point.y),2)} ${s.yAxixTitle}`:"down"==this.series.name?`<b> ${t}  </b><br/>\n            ${s.language.Downstream}: ${i.numberFormat(Math.abs(this.point.y),2)} ${s.yAxixTitle}`:void 0}},legend:{enabled:!1},exporting:{enabled:!1},series:[{name:(null===(t=null==s?void 0:s.language)||void 0===t?void 0:t.upStream)?s.language.upStream:"up",data:function(){var t,e=[],i=(new Date).getTime()+a;for(t=-299*s.selectedFilter;t<=0;t+=1){let a=i+1e3*t,r=s.removeLast3Chars(a),n=void 0!==s.lastChartDataObj[r]?s.lastChartDataObj[r][0]:s.lastChartDataObj[r-1]&&s.lastChartDataObj[r-1][0]?s.lastChartDataObj[r-1][0]:0;s.reloadChart&&!n&&(n=void 0!==s.lastChartDataObj[r-1]?s.lastChartDataObj[r-1][0]:s.lastChartDataObj[r-2]&&s.lastChartDataObj[r-2][0]?s.lastChartDataObj[r-2][0]:0),n&&(n/=s.sizes[s.yAxixTitle]),e.push({x:a,y:n})}return e}()},{name:(null===(e=null==s?void 0:s.language)||void 0===e?void 0:e.downStream)?s.language.downStream:"down",data:function(){var t,e=[],i=(new Date).getTime()+a;for(t=-299*s.selectedFilter;t<=0;t+=1){let a=i+1e3*t,r=s.removeLast3Chars(a),n=void 0!==s.lastChartDataObj[r]?s.lastChartDataObj[r][1]:s.lastChartDataObj[r-1]&&s.lastChartDataObj[r-1][1]?s.lastChartDataObj[r-1][1]:0;s.reloadChart&&!n&&(n=void 0!==s.lastChartDataObj[r-1]?s.lastChartDataObj[r-1][1]:s.lastChartDataObj[r-2]&&s.lastChartDataObj[r-2][1]?s.lastChartDataObj[r-2][1]:0),s.lastChartDataObj[r]&&(s.lastChartDataObj[r][1]=n),n&&(n/=s.sizes[s.yAxixTitle]),n*=-1,e.push({x:a,y:n})}return e}()}]},this.streamOptions.series[0].visible=this.isUpStreamVisible,this.streamOptions.series[1].visible=this.isDownStreamVisible,this.streamOptions=Object.assign({},this.streamOptions)}bitsConversion(t){let e=!1;t<0&&(t=-t,e=!0);let a=parseFloat(t);if(0==a)return 0;var s=Math.floor(Math.log(a)/Math.log(1e3)),r=parseInt(i.numberFormat(Math.abs(a/Math.pow(1e3,s)),2));return e?-1*r:r}getYAxisTitle(t){let e=t;return("rate"===this.chartName.toLowerCase()?["bps","Kbps","Mbps","Gbps","Tbps","pbps","ebps"]:["pps","Kpps","Mpps","Gpps","Tpps","ppps","epps"])[Math.floor(Math.log(e)/Math.log(1024))]}removePrevious(){this.lastChartDataObj=Object.keys(this.lastChartDataObj).reduce((t,e)=>(t[e]=[0,0,"bps","bps","bps"],t),{}),this.lastData=[0,0],this.currentData=[0,0],this.rebuildData()}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(h.s),o.Y36(c.s),o.Y36(p.i),o.Y36(d.t6))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-stream-chart"]],inputs:{chartName:"chartName",yAxixTitle:"yAxixTitle",xAxix:"xAxix",data:"data",windowLen:"windowLen",selectedFilter:"selectedFilter",selectedLocation:"selectedLocation",selectedApplication:"selectedApplication",selectedRegion:"selectedRegion",selectedSystem:"selectedSystem",monitorId:"monitorId",time:"time",history:"history"},features:[o.TTD],decls:1,vars:1,consts:[["class","analytic-widget",4,"ngIf"],[1,"analytic-widget"],[1,"analytic-widget-header"],[1,"d-flex","justify-content-between"],[1,"mx-2"],[1,"widget-title",3,"title"],[1,"legend-label","toggle-up",3,"click"],[1,"legend-glyph",3,"ngStyle"],[1,"legend-label","toggle-down",3,"click"],[1,"interval"],[1,"mr-2",2,"text-align","right"],[1,"traffic-volume","monitor-status-normal"],["style","color: #0027FF;",4,"ngIf"],["style","color: #5ACFEA;",4,"ngIf"],[1,"analytic-widget-body"],["id","custom-mirrot-chart","style","width: 100%; display: block;",3,"Highcharts","options","callbackFunction",4,"ngIf"],[2,"color","#0027FF"],["aria-hidden","true",1,"fa","fa-arrow-up"],[2,"color","#5ACFEA"],["aria-hidden","true",1,"fa","fa-arrow-down"],["id","custom-mirrot-chart",2,"width","100%","display","block",3,"Highcharts","options","callbackFunction"]],template:function(t,e){1&t&&o.YNc(0,f,20,14,"div",0),2&t&&o.Q6J("ngIf",e.pageAvailable)},directives:[g.O5,g.PC,b.x],styles:[".highcharts-data-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{min-width:320px;max-width:800px;margin:1em auto}.highcharts-data-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{font-family:Verdana,sans-serif;border-collapse:collapse;border:1px solid #EBEBEB;margin:10px auto;text-align:center;width:100%;max-width:500px}.highcharts-data-table[_ngcontent-%COMP%]   caption[_ngcontent-%COMP%]{padding:1em 0;font-size:1.2em;color:#555}.highcharts-data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:600;padding:.5em}.highcharts-data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .highcharts-data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .highcharts-data-table[_ngcontent-%COMP%]   caption[_ngcontent-%COMP%]{padding:.5em}.highcharts-data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], .highcharts-data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(even){background:#f8f8f8}.highcharts-data-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:#f1f7ff}.analytic-widget[_ngcontent-%COMP%]   .analytic-widget-header[_ngcontent-%COMP%]{display:block}.analytic-widget[_ngcontent-%COMP%]   .analytic-widget-header-cell[_ngcontent-%COMP%]{display:block;padding:5px 5px 5px 10px;position:relative}.analytic-widget[_ngcontent-%COMP%]   .legend-glyph[_ngcontent-%COMP%]{display:inline-block;margin-left:4px;margin-right:4px;width:10px;height:10px;border-radius:6px}.analytic-widget[_ngcontent-%COMP%]   .legend-label[_ngcontent-%COMP%]{display:inline-block;font-size:12px;padding-right:8px;margin-right:4px;border-color:#e1dfec;background-color:#eae8f3;border-width:1px;text-decoration:none;cursor:pointer}.analytic-widget[_ngcontent-%COMP%]   .interval[_ngcontent-%COMP%]{background:#efefef;padding:2px 6px;font-size:11px;border-radius:2px;color:#666;margin-right:15px}.analytic-widget[_ngcontent-%COMP%]   .traffic-volume.monitor-status-normal[_ngcontent-%COMP%]{margin-top:0;background-color:#eae8f3;border-color:#e1dfec;border-width:1px;font-size:12px}"]}),t})()}}]);