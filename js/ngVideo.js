

function NGVideo(_videoParentDivId, _metaDataObjJson){
	//var $videoElem;
	this.playerId = _videoParentDivId + "vidPlayer";
	this.$videoParentDiv = $('#' + _videoParentDivId);
	this.metaDataObj = $.parseJSON(JSON.stringify(_metaDataObjJson));

	//if(!($.flash.available)){ // instantiate a Flash object to play video
	if($.flash.available){		
		this.$videoElem = addFlashVideo(this.playerId, this.$videoParentDiv, _metaDataObjJson);
		this.htmlOrFlash = "flash";
		console.log("$videoElem: %o", this.$videoElem);
	}
	else{                    // instantiate an html element to play video
		this.$videoElem = addHtmlVideo(this.playerId, this.$videoParentDiv, this.metaDataObj);
		this.htmlOrFlash = "html";
		console.log("$videoElem: %o", this.$videoElem);
	}
	//console.log($("body").css("height"));
}
NGVideo.prototype.play = function(){
	myPlay(this);
}
NGVideo.prototype.pause = function(){
	myPause(this);
}
NGVideo.prototype.setViewportSense = function(){
	this.$videoParentDiv.scrollable();
	this.$videoParentDiv.on('scrollin', this, scrollIn);
	this.$videoParentDiv.on('scrollout', this, scrollOut);

}
function scrollIn(evt){
	console.log("scrollIn - this %o", evt.data);
	myPlay(evt.data);
}
function scrollOut(evt){
	console.log("scrollOut - this %o", evt.data);
	myPause(evt.data);
}
function myPlay(_this){
	if(_this.htmlOrFlash === "flash"){
		document.getElementById(_this.playerId).videoPlay();
	}
	else{
		document.getElementById(_this.playerId).play();
	}
}
function myPause(_this){
	if(_this.htmlOrFlash === "flash"){
		document.getElementById(_this.playerId).videoPause();
	}
	else{
		document.getElementById(_this.playerId).pause();
	}
}
function addHtmlVideo(_playerId, _$videoParentDiv, _metaDataObj){
	console.log("adding html");
	return($('<video/>', {
	    id: _playerId,
	    src: _metaDataObj.mp4_url,
	    width: '100%',
	    height: '100%',
	    autoplay:true,
		}).appendTo(_$videoParentDiv)[0]);
}
function addFlashVideo(_playerId, _$videoParentDiv, _metaDataObjJson){
	console.log("adding Flash");
	return(_$videoParentDiv.flash(
				{
					swf: './swfs/ngPlayer.swf',
					width: '100%',
					height: '100%',
					allowScriptAccess: "always", 
					allowFullScreen: "true", 
					bgcolor: 0x000000,
					id: _playerId,  // must have an id so I can use it for JS to SWF communication
					flashvars: {
						_player_w: 998,
						_videoJson: encodeURIComponent(JSON.stringify(_metaDataObjJson))
					}
				}));
}









/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com                        jquery.ui.core.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);
////////////////

/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com                                          jquery.ui.widget.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);
////////////////

/*@preserve
 * Copyright (c) 2013 Ben Olson (https://github.com/bseth99/jquery-ui-scrollable)
 * jQuery UI Scrollable 0.1.1             jquery-ui-scrollable
 *
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 */
!function($){"use strict";var rootex=/^(?:html)$/i,max=Math.max,abs=Math.abs,round=Math.round,rhorizontal=/left|center|right/,rvertical=/top|center|bottom/,roffset=/[\+\-]\d+(\.[\d]+)?%?/,rposition=/^\w+/,rpercent=/%$/;function getOffsets(offsets,width,height){return[parseFloat(offsets[0])*(rpercent.test(offsets[0])?width/100:1),parseFloat(offsets[1])*(rpercent.test(offsets[1])?height/100:1)]}function parseCss(element,property){return parseInt($.css(element,property),10)||0}function trackScrolling(scroller){var _waiter=null;scroller.onscroll=function(e){if(!_waiter&&!scroller.ignoreScrolling){_waiter=setTimeout(function(){$.each(scroller.watch,function(){this._checkPositioning(e)});_waiter=null},$.osb.scrollable.CONFIG.throttler)}};scroller.element.on("scroll.scrollable",scroller.onscroll)}var monitor={scrollers:[],getScroller:function(obj){var scroller;for(var i=0;i<this.scrollers.length;i++){if(this.scrollers[i].element[0]===obj[0]){scroller=this.scrollers[i];break}}return scroller},attach:function(scroll){var scroller;if(!(scroller=this.getScroller(scroll.container))){scroller={element:scroll.container,watch:[],onscroll:null};this.scrollers.push(scroller)}if(scroller.watch.length==0)trackScrolling(scroller);scroller.watch.push(scroll)},detach:function(scroll){var scroller;if(scroller=this.getScroller(scroll.container)){for(var i=0;i<scroller.watch.length;i++){if(scroller.watch[i]===scroll){scroller.watch.splice(i,1);break}}if(scroller.watch.length==0){scroller.element.off("scroll.scrollable")}}},scrollInProgress:function(scroll,state){var scroller;if(scroller=this.getScroller(scroll.container)){scroller.ignoreScrolling=state}}};window.Scrollable=monitor;$.widget("osb.scrollable",{version:"0.1.4",widgetEventPrefix:"scroll",options:{"in":null,out:null,direction:"both",offset:null},inView:true,_create:function(){this.options.offset=this.options.offset||{top:0,left:0,bottom:0,right:0}},_init:function(){if(this.container){monitor.detach(this)}this.container=this.element.closest(":scrollable"+(this.direction=="both"?"":"("+this.direction+")"));if(this.container.length==0||rootex.test(this.container[0].nodeName))this.container=$(window);monitor.attach(this);this._checkPositioning()},_destroy:function(){monitor.detach(this);this.container=null},_checkPositioning:function(e){var _inView=this.inView,pos=this.position();this.inView=pos.inside;if(this.inView){if(!_inView){this._trigger("in",e,{container:this.container,element:this.element,position:pos})}}else if(_inView){this._trigger("out",e,{container:this.container,element:this.element,position:pos})}},position:function(){var doc={top:this.container.scrollTop(),left:this.container.scrollLeft()},elem=this.element.position(),ofs=$.extend({},this.options.offset),width=this.container.width(),height=this.container.height(),otmp,ret;if(ofs.vertical||ofs.y){otmp=getOffsets([0,ofs.vertical||ofs.y],width,height);ofs.top=ofs.bottom=otmp[1]/2}if(ofs.horizontal||ofs.x){otmp=getOffsets([ofs.horizontal||ofs.x,0],width,height);ofs.left=ofs.right=otmp[0]/2}otmp=getOffsets([ofs.left||0,ofs.top||0],width,height);ofs.left=otmp[0];ofs.top=otmp[1];otmp=getOffsets([ofs.right||0,ofs.bottom||0],width,height);ofs.right=otmp[0];ofs.bottom=otmp[1];doc.right=doc.left+width-ofs.right;doc.bottom=doc.top+height-ofs.bottom;doc.left+=ofs.left;doc.top+=ofs.top;elem.right=elem.left+this.element.width();elem.bottom=elem.top+this.element.height();ret={container:doc,element:elem,inside:false,outside:false,left:elem.right<doc.left,right:elem.left>doc.right,top:elem.bottom<doc.top,bottom:elem.top>doc.bottom};ret.inside=!ret.left&&!ret.right&&!ret.top&&!ret.bottom;ret.outside=!ret.inside;return ret},"goto":function(options){var self=this,options=options||{},offsets={},position=this.position(),targetWidth=this.container.width(),targetHeight=this.container.height(),elemWidth=this.element.outerWidth(true),elemHeight=this.element.outerHeight(true),dir=this.options.direction,target=this.container[0]===window?$("html"):this.container,scroll,atOffset,myOffset;if(!options.onlyOutside||options.onlyOutside&&!this.inView){$.each(["my","at"],function(){var pos=(options[this]||"").split(" "),horizontalOffset,verticalOffset;if(pos.length===1){pos=rhorizontal.test(pos[0])?pos.concat(["center"]):rvertical.test(pos[0])?["center"].concat(pos):["center","center"]}pos[0]=rhorizontal.test(pos[0])?pos[0]:"center";pos[1]=rvertical.test(pos[1])?pos[1]:"center";horizontalOffset=roffset.exec(pos[0]);verticalOffset=roffset.exec(pos[1]);offsets[this]=[horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0];options[this]=[rposition.exec(pos[0])[0],rposition.exec(pos[1])[0]]});if(options.at[0]==="right"){position.element.left-=targetWidth}else if(options.at[0]==="center"){position.element.left-=targetWidth/2}if(options.at[1]==="bottom"){position.element.top-=targetHeight}else if(options.at[1]==="center"){position.element.top-=targetHeight/2}atOffset=getOffsets(offsets.at,targetWidth,targetHeight);position.element.left-=atOffset[0];position.element.top-=atOffset[1];myOffset=getOffsets(offsets.my,elemWidth,elemHeight);if(options.my[0]==="right"){position.element.left+=elemWidth}else if(options.my[0]==="center"){position.element.left+=elemWidth/2}if(options.my[1]==="bottom"){position.element.top+=elemHeight}else if(options.my[1]==="center"){position.element.top+=elemHeight/2}position.element.left-=myOffset[0];position.element.top-=myOffset[1];scroll={};if(dir=="both"||dir=="horizontal")scroll.scrollLeft=round(position.element.left)+"px";if(dir=="both"||dir=="vertical")scroll.scrollTop=round(position.element.top)+"px";monitor.scrollInProgress(this,true);target.animate(scroll,{duration:options.duration||"slow",easing:options.easing||"swing",complete:function(){monitor.scrollInProgress(self,false);self._checkPositioning();if($.isFunction(options.complete))options.complete.call()}})}else{if($.isFunction(options.complete))options.complete.call(this.element)}}});$.expr[":"].scrollable=$.expr.createPseudo(function(dir){var dir=!dir||dir=="undefined"?"both":dir;return function(elem){var $el=$(elem),isRoot=rootex.test(elem.nodeName),styles=$el.css(["overflow-x","overflow-y"]),overflow={x:styles["overflow-x"]=="auto"||styles["overflow-x"]=="scroll",y:styles["overflow-y"]=="auto"||styles["overflow-y"]=="scroll"},test=false;if(!isRoot&&!overflow.x&&!overflow.y){return false}if(dir=="both"||dir=="vertical")test=test||(overflow.x||isRoot)&&elem.scrollWidth>elem.clientWidth;if(dir=="both"||dir=="horizontal")test=test||(overflow.y||isRoot)&&elem.scrollHeight>elem.clientHeight;return test}});$.propHooks.scrollTop=$.propHooks.scrollLeft={get:function(elem,prop){var result=null;if(elem.tagName==="HTML"||elem.tagName==="BODY"){if(prop==="scrollLeft"){result=window.scrollX}else if(prop==="scrollTop"){result=window.scrollY}}if(result==null){result=elem[prop]}return result}};$.Tween.propHooks.scrollTop=$.Tween.propHooks.scrollLeft={get:function(tween){return $.propHooks.scrollTop.get(tween.elem,tween.prop)},set:function(tween){if(tween.elem.tagName==="HTML"||tween.elem.tagName==="BODY"){tween.options.bodyScrollLeft=tween.options.bodyScrollLeft||window.scrollX;tween.options.bodyScrollTop=tween.options.bodyScrollTop||window.scrollY;if(tween.prop==="scrollLeft"){tween.options.bodyScrollLeft=Math.round(tween.now)}else if(tween.prop==="scrollTop"){tween.options.bodyScrollTop=Math.round(tween.now)}window.scrollTo(tween.options.bodyScrollLeft,tween.options.bodyScrollTop)}else if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now}}};$.osb.scrollable.CONFIG={throttler:300}}(jQuery);



/////////////////// jquery swfobject plugin
(function(f,h,i){function k(a,c){var b=(a[0]||0)-(c[0]||0);return b>0||!b&&a.length>0&&k(a.slice(1),c.slice(1))}function l(a){if(typeof a!=g)return a;var c=[],b="";for(var d in a){b=typeof a[d]==g?l(a[d]):[d,m?encodeURI(a[d]):a[d]].join("=");c.push(b)}return c.join("&")}function n(a){var c=[];for(var b in a)a[b]&&c.push([b,'="',a[b],'"'].join(""));return c.join(" ")}function o(a){var c=[];for(var b in a)c.push(['<param name="',b,'" value="',l(a[b]),'" />'].join(""));return c.join("")}var g="object",m=true;try{var j=i.description||function(){return(new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}()}catch(p){j="Unavailable"}var e=j.match(/\d+/g)||[0];f[h]={available:e[0]>0,activeX:i&&!i.name,version:{original:j,array:e,string:e.join("."),major:parseInt(e[0],10)||0,minor:parseInt(e[1],10)||0,release:parseInt(e[2],10)||0},hasVersion:function(a){a=/string|number/.test(typeof a)?a.toString().split("."):/object/.test(typeof a)?[a.major,a.minor]:a||[0,0];return k(e,a)},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(a){if(!a.swf||this.expressInstallIsActive||!this.available&&!a.hasVersionFail)return false;if(!this.hasVersion(a.hasVersion||1)){this.expressInstallIsActive=true;if(typeof a.hasVersionFail=="function")if(!a.hasVersionFail.apply(a))return false;a={swf:a.expressInstall||this.expressInstall,height:137,width:214,flashvars:{MMredirectURL:location.href,MMplayerType:this.activeX?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}attrs={data:a.swf,type:"application/x-shockwave-flash",id:a.id||"flash_"+Math.floor(Math.random()*999999999),width:a.width||320,height:a.height||180,style:a.style||""};m=typeof a.useEncode!=="undefined"?a.useEncode:this.encodeParams;a.movie=a.swf;a.wmode=a.wmode||"opaque";delete a.fallback;delete a.hasVersion;delete a.hasVersionFail;delete a.height;delete a.id;delete a.swf;delete a.useEncode;delete a.width;var c=document.createElement("div");c.innerHTML=["<object ",n(attrs),">",o(a),"</object>"].join("");return c.firstChild}};f.fn[h]=function(a){var c=this.find(g).andSelf().filter(g);/string|object/.test(typeof a)&&this.each(function(){var b=f(this),d;a=typeof a==g?a:{swf:a};a.fallback=this;if(d=f[h].create(a)){b.children().remove();b.html(d)}});typeof a=="function"&&c.each(function(){var b=this;b.jsInteractionTimeoutMs=b.jsInteractionTimeoutMs||0;if(b.jsInteractionTimeoutMs<660)b.clientWidth||b.clientHeight?a.call(b):setTimeout(function(){f(b)[h](a)},b.jsInteractionTimeoutMs+66)});return c}})(jQuery,"flash",navigator.plugins["Shockwave Flash"]||window.ActiveXObject);
/////////////////// End swfobject plugin








