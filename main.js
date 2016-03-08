!function(a,b){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",b):"object"==typeof module&&module.exports?module.exports=b():a.EvEmitter=b()}(this,function(){function a(){}var b=a.prototype;return b.on=function(a,b){if(a&&b){var c=this._events=this._events||{},d=c[a]=c[a]||[];return-1==d.indexOf(b)&&d.push(b),this}},b.once=function(a,b){if(a&&b){this.on(a,b);var c=this._onceEvents=this._onceEvents||{},d=c[a]=c[a]||[];return d[b]=!0,this}},b.off=function(a,b){var c=this._events&&this._events[a];if(c&&c.length){var d=c.indexOf(b);return-1!=d&&c.splice(d,1),this}},b.emitEvent=function(a,b){var c=this._events&&this._events[a];if(c&&c.length){var d=0,e=c[d];b=b||[];for(var f=this._onceEvents&&this._onceEvents[a];e;){var g=f&&f[e];g&&(this.off(a,e),delete f[e]),e.apply(this,b),d+=g?0:1,e=c[d]}return this}},a}),function(a,b){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(c){return b(a,c)}):"object"==typeof module&&module.exports?module.exports=b(a,require("ev-emitter")):a.imagesLoaded=b(a,a.EvEmitter)}(window,function(a,b){function c(a,b){for(var c in b)a[c]=b[c];return a}function d(a){var b=[];if(Array.isArray(a))b=a;else if("number"==typeof a.length)for(var c=0;c<a.length;c++)b.push(a[c]);else b.push(a);return b}function e(a,b,f){return this instanceof e?("string"==typeof a&&(a=document.querySelectorAll(a)),this.elements=d(a),this.options=c({},this.options),"function"==typeof b?f=b:c(this.options,b),f&&this.on("always",f),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new e(a,b,f)}function f(a){this.img=a}function g(a,b){this.url=a,this.element=b,this.img=new Image}var h=a.jQuery,i=a.console;e.prototype=Object.create(b.prototype),e.prototype.options={},e.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},e.prototype.addElementImages=function(a){"IMG"==a.nodeName&&this.addImage(a),this.options.background===!0&&this.addElementBackgroundImages(a);var b=a.nodeType;if(b&&j[b]){for(var c=a.querySelectorAll("img"),d=0;d<c.length;d++){var e=c[d];this.addImage(e)}if("string"==typeof this.options.background){var f=a.querySelectorAll(this.options.background);for(d=0;d<f.length;d++){var g=f[d];this.addElementBackgroundImages(g)}}}};var j={1:!0,9:!0,11:!0};return e.prototype.addElementBackgroundImages=function(a){var b=getComputedStyle(a);if(b)for(var c=/url\((['"])?(.*?)\1\)/gi,d=c.exec(b.backgroundImage);null!==d;){var e=d&&d[2];e&&this.addBackground(e,a),d=c.exec(b.backgroundImage)}},e.prototype.addImage=function(a){var b=new f(a);this.images.push(b)},e.prototype.addBackground=function(a,b){var c=new g(a,b);this.images.push(c)},e.prototype.check=function(){function a(a,c,d){setTimeout(function(){b.progress(a,c,d)})}var b=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(b){b.once("progress",a),b.check()}):void this.complete()},e.prototype.progress=function(a,b,c){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!a.isLoaded,this.emitEvent("progress",[this,a,b]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,a),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&i&&i.log("progress: "+c,a,b)},e.prototype.complete=function(){var a=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(a,[this]),this.emitEvent("always",[this]),this.jqDeferred){var b=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[b](this)}},f.prototype=Object.create(b.prototype),f.prototype.check=function(){var a=this.getIsImageComplete();return a?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},f.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},f.prototype.confirm=function(a,b){this.isLoaded=a,this.emitEvent("progress",[this,this.img,b])},f.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},f.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},f.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},f.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},g.prototype=Object.create(f.prototype),g.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var a=this.getIsImageComplete();a&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},g.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},g.prototype.confirm=function(a,b){this.isLoaded=a,this.emitEvent("progress",[this,this.element,b])},e.makeJQueryPlugin=function(b){b=b||a.jQuery,b&&(h=b,h.fn.imagesLoaded=function(a,b){var c=new e(this,a,b);return c.jqDeferred.promise(h(this))})},e.makeJQueryPlugin(),e});var start=function(){function a(){var a=Math.round(e.getBoundingClientRect().width/f[0].getBoundingClientRect().width),b=f[0].style.transform.match(/-?[\d\.]+/g)[1];if(b!=-100*(f.length-a)){var c=b-100;[].forEach.call(f,function(a){a.style.transform="translate3d("+c+"%,0,0)"})}}function b(){var a=f[0].style.transform.match(/-?[\d\.]+/g)[1];if(0!=a){var b=parseInt(a)+100;[].forEach.call(f,function(a){a.style.transform="translate3d("+b+"%,0,0)"})}}var c=document.querySelector(".home__button"),d=document.querySelector(".nav__work-button");c&&(c.addEventListener("click",function(){this.parentElement.classList.add("home--hidden")}),d.addEventListener("click",function(){c.parentElement.classList.add("home--hidden")}));var e=document.querySelector(".section--work"),f=document.querySelectorAll(".work__post"),g=document.querySelector(".work__next"),h=document.querySelector(".work__prev");if(e){e.getBoundingClientRect().width==f[0].getBoundingClientRect().width*f.length&&(g.style.display="none",h.style.display="none");e.getBoundingClientRect().width/f[0].getBoundingClientRect().width;[].forEach.call(f,function(a){a.style.transform="translate3d(0,0,0)"}),window.onresize=function(){e.getBoundingClientRect().width==f[0].getBoundingClientRect().width*f.length?(g.style.display="none",h.style.display="none"):(g.style.display="inline-block",h.style.display="inline-block"),[].forEach.call(f,function(a){a.style.transform="translate3d(0,0,0)"})},g.addEventListener("click",function(){a()}),h.addEventListener("click",function(){b()})}var i=document.querySelector("#post__header-image");i&&(imagesLoaded(i,{background:!0},function(){i.classList.add("loaded")}),window.onscroll=function(){var a=window.innerHeight,b=document.querySelector(".post__scroll");window.pageYOffset>a/4?b.classList.add("post__scroll--hidden"):b.classList.remove("post__scroll--hidden")}),e&&[].forEach.call(f,function(a){imagesLoaded(a,{background:!0},function(){a.classList.add("loaded")})})};!function(a,b,c,d){"use strict";if(!b.history.pushState)return a.fn.smoothState=function(){return this},void(a.fn.smoothState.options={});if(!a.fn.smoothState){var e=a("html, body"),f=b.console,g={debug:!1,anchors:"a",forms:"form",allowFormCaching:!1,repeatDelay:500,blacklist:".no-smoothState",prefetch:!1,prefetchOn:"mouseover touchstart",cacheLength:0,loadingClass:"is-loading",alterRequest:function(a){return a},onBefore:function(a,b){},onStart:{duration:0,render:function(a){}},onProgress:{duration:0,render:function(a){}},onReady:{duration:0,render:function(a,b){a.html(b)}},onAfter:function(a,b){}},h={isExternal:function(a){var c=a.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);return"string"==typeof c[1]&&c[1].length>0&&c[1].toLowerCase()!==b.location.protocol?!0:"string"==typeof c[2]&&c[2].length>0&&c[2].replace(new RegExp(":("+{"http:":80,"https:":443}[b.location.protocol]+")?$"),"")!==b.location.host},stripHash:function(a){return a.replace(/#.*/,"")},isHash:function(a,c){c=c||b.location.href;var d=a.indexOf("#")>-1,e=h.stripHash(a)===h.stripHash(c);return d&&e},translate:function(b){var c={dataType:"html",type:"GET"};return b="string"==typeof b?a.extend({},c,{url:b}):a.extend({},c,b)},shouldLoadAnchor:function(a,b){var c=a.prop("href");return!(h.isExternal(c)||h.isHash(c)||a.is(b)||a.prop("target"))},clearIfOverCapacity:function(a,b){return Object.keys||(Object.keys=function(a){var b,c=[];for(b in a)Object.prototype.hasOwnProperty.call(a,b)&&c.push(b);return c}),Object.keys(a).length>b&&(a={}),a},storePageIn:function(b,c,d,e){var f=a("<html></html>").append(a(d));return b[c]={status:"loaded",title:f.find("title").first().text(),html:f.find("#"+e)},b},triggerAllAnimationEndEvent:function(b,c){c=" "+c||"";var d=0,e="animationstart webkitAnimationStart oanimationstart MSAnimationStart",f="animationend webkitAnimationEnd oanimationend MSAnimationEnd",g="allanimationend",i=function(c){a(c.delegateTarget).is(b)&&(c.stopPropagation(),d++)},j=function(c){a(c.delegateTarget).is(b)&&(c.stopPropagation(),d--,0===d&&b.trigger(g))};b.on(e,i),b.on(f,j),b.on("allanimationend"+c,function(){d=0,h.redraw(b)})},redraw:function(a){a.height()}},i=function(c){if(null!==c.state){var d=b.location.href,e=a("#"+c.state.id),f=e.data("smoothState");f.href===d||h.isHash(d,f.href)||f.load(d,!1)}},j=function(g,i){var j=a(g),k=j.prop("id"),l=null,m=!1,n={},o=b.location.href,p=function(a){a=a||!1,a&&n.hasOwnProperty(a)?delete n[a]:n={},j.data("smoothState").cache=n},q=function(b,c){c=c||a.noop;var d=h.translate(b);if(n=h.clearIfOverCapacity(n,i.cacheLength),!n.hasOwnProperty(d.url)||"undefined"!=typeof d.data){n[d.url]={status:"fetching"};var e=a.ajax(d);e.success(function(a){h.storePageIn(n,d.url,a,k),j.data("smoothState").cache=n}),e.error(function(){n[d.url].status="error"}),c&&e.complete(c)}},r=function(){if(l){var b=a(l,j);if(b.length){var c=b.offset().top;e.scrollTop(c)}l=null}},s=function(d){var g="#"+k,h=n[d]?a(n[d].html.html()):null;h.length?(c.title=n[d].title,j.data("smoothState").href=d,i.loadingClass&&e.removeClass(i.loadingClass),i.onReady.render(j,h),j.one("ss.onReadyEnd",function(){m=!1,i.onAfter(j,h),r()}),b.setTimeout(function(){j.trigger("ss.onReadyEnd")},i.onReady.duration)):!h&&i.debug&&f?f.warn("No element with an id of "+g+" in response from "+d+" in "+n):b.location=d},t=function(a,c,d){var g=h.translate(a);"undefined"==typeof c&&(c=!0),"undefined"==typeof d&&(d=!0);var l=!1,m=!1,o={loaded:function(){var a=l?"ss.onProgressEnd":"ss.onStartEnd";m&&l?m&&s(g.url):j.one(a,function(){s(g.url),d||p(g.url)}),c&&b.history.pushState({id:k},n[g.url].title,g.url),m&&!d&&p(g.url)},fetching:function(){l||(l=!0,j.one("ss.onStartEnd",function(){i.loadingClass&&e.addClass(i.loadingClass),i.onProgress.render(j),b.setTimeout(function(){j.trigger("ss.onProgressEnd"),m=!0},i.onProgress.duration)})),b.setTimeout(function(){n.hasOwnProperty(g.url)&&o[n[g.url].status]()},10)},error:function(){i.debug&&f?f.log("There was an error loading: "+g.url):b.location=g.url}};n.hasOwnProperty(g.url)||q(g),i.onStart.render(j),b.setTimeout(function(){e.scrollTop(0),j.trigger("ss.onStartEnd")},i.onStart.duration),o[n[g.url].status]()},u=function(b){var c,d=a(b.currentTarget);h.shouldLoadAnchor(d,i.blacklist)&&!m&&(b.stopPropagation(),c=h.translate(d.prop("href")),c=i.alterRequest(c),q(c))},v=function(b){var c=a(b.currentTarget);if(!b.metaKey&&!b.ctrlKey&&h.shouldLoadAnchor(c,i.blacklist)&&(b.stopPropagation(),b.preventDefault(),!y())){z();var d=h.translate(c.prop("href"));m=!0,l=c.prop("hash"),d=i.alterRequest(d),i.onBefore(c,j),t(d)}},w=function(b){var c=a(b.currentTarget);if(!c.is(i.blacklist)&&(b.preventDefault(),b.stopPropagation(),!y())){z();var e={url:c.prop("action"),data:c.serialize(),type:c.prop("method")};m=!0,e=i.alterRequest(e),"get"===e.type.toLowerCase()&&(e.url=e.url+"?"+e.data),i.onBefore(c,j),t(e,d,i.allowFormCaching)}},x=0,y=function(){var a=null===i.repeatDelay,b=parseInt(Date.now())>x;return!(a||b)},z=function(){x=parseInt(Date.now())+parseInt(i.repeatDelay)},A=function(a){i.anchors&&(a.on("click",i.anchors,v),i.prefetch&&a.on(i.prefetchOn,i.anchors,u)),i.forms&&a.on("submit",i.forms,w)},B=function(){var a=j.prop("class");j.removeClass(a),h.redraw(j),j.addClass(a)};return i=a.extend({},a.fn.smoothState.options,i),null===b.history.state&&b.history.replaceState({id:k},c.title,o),h.storePageIn(n,o,c.documentElement.outerHTML,k),h.triggerAllAnimationEndEvent(j,"ss.onStartEnd ss.onProgressEnd ss.onEndEnd"),A(j),{href:o,cache:n,clear:p,load:t,fetch:q,restartCSSAnimations:B}},k=function(b){return this.each(function(){var c=this.tagName.toLowerCase();this.id&&"body"!==c&&"html"!==c&&!a.data(this,"smoothState")?a.data(this,"smoothState",new j(this,b)):!this.id&&f?f.warn("Every smoothState container needs an id but the following one does not have one:",this):"body"!==c&&"html"!==c||!f||f.warn("The smoothstate container cannot be the "+this.tagName+" tag")})};b.onpopstate=i,a.smoothStateUtility=h,a.fn.smoothState=k,a.fn.smoothState.options=g}}(jQuery,window,document),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-72564268-1","auto"),ga("send","pageview"),$(document).ready(function(){start()}),$(function(){"use strict";var a=$("html, body"),b={prefetch:!0,cacheLength:2,onStart:{duration:650,render:function(b){b.addClass("is-exiting"),a.animate({scrollTop:0}),c.restartCSSAnimations()}},onReady:{duration:0,render:function(a,b){a.removeClass("is-exiting"),a.html(b)}},onAfter:function(a){start(),ga("set",{page:document.location.pathname,title:document.title}),ga("send","pageview")}},c=$("#main").smoothState(b).data("smoothState")});