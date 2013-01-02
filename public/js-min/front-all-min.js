/*
 Copyright 2012 Martijn van de Rijdt

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var gui,printO;$(document).ready(function(){gui=new GUI;gui.init();"undefined"==typeof console&&(console={log:function(){}});"undefined"==typeof window.console.debug&&(console.debug=console.log);"true"!==getGetVariable("debug")&&(window.console.log=function(){},window.console.debug=function(){});"true"==getGetVariable("touch")?(Modernizr.touch=!0,$("html").addClass("touch")):"false"==getGetVariable("touch")&&(Modernizr.touch=!1,$("html").removeClass("touch"));printO=new Print});function GUI(){}
GUI.prototype.init=function(){this.nav.setup();this.pages.init();this.setEventHandlers();"function"===typeof this.setCustomEventHandlers&&this.setCustomEventHandlers();$(".dialog [title]").tooltip({});Modernizr.borderradius&&(Modernizr.boxshadow&&Modernizr.csstransitions&&Modernizr.opacity)&&$(document).trigger("browsersupport","fancy-visuals");$("footer").detach().appendTo("#container");this.positionPageAndBar()};GUI.prototype.setup=function(){$(window).trigger("resize")};
GUI.prototype.setEventHandlers=function(){var a=this;$(document).on("click","#feedback-bar .close",function(){a.feedbackBar.hide();return!1});$(document).on("click",".touch #feedback-bar",function(){a.feedbackBar.hide()});$(document).on("click","#page .close",function(){a.pages.close();return!1});$(document).on("click",'a[href^="#"]:not([href="#"]):not(nav ul li a)',function(a){var c=$(this).attr("href");console.log("captured click to nav page, href="+c);"#"!==c&&(a.preventDefault(),$('nav li a[href="'+
c+'"]').click())});$('nav ul li a[href^="#"]').click(function(b){b.preventDefault();b=$(this).attr("href").substr(1);a.pages.open(b);$(this).closest("li").addClass("active").siblings().removeClass("active")});$(window).on("onlinestatuschange",function(b,c){a.updateStatus.connection(c)});$(document).on("edit","form.jr",function(b,c){a.updateStatus.edit(c)});$(document).on("browsersupport",function(b,c){a.updateStatus.support(c)});$("#page, #feedback-bar").on("change",function(){a.positionPageAndBar()})};
GUI.prototype.nav={setup:function(){$("article.page").each(function(){var a,b="",c;c=$(this).attr("id");a=$(this).attr("data-display")?$(this).attr("data-display"):c;b=$(this).attr("data-title")?$(this).attr("data-title"):c;c=$(this).attr("data-ext-link")?$(this).attr("data-ext-link"):"#"+c;$('<li class=""><a href="'+c+'" title="'+b+'" >'+a+"</a></li>").appendTo($("nav ul"))})},reset:function(){$("nav ul li").removeClass("active")}};
GUI.prototype.pages={init:function(){this.$pages=$("<pages></pages>");$("article.page").detach().appendTo(this.$pages)},get:function(a){var b=this.$pages.find('article[id="'+a+'"]');return b=0<b.length?b:$('article[id="'+a+'"]')},isShowing:function(a){return 0<$("#page article.page"+("undefined"!==typeof a?'[id="'+a+'"]':"")).length},open:function(a){$("header");this.isShowing(a)||(a=this.get(a),1!==a.length?console.error("page not found"):(this.isShowing()&&this.close(),$("#page .content").prepend(a.show()).trigger("change"),
$("#page").show(),$(window).bind("resize.pageEvents",function(){$("#page").trigger("change")})))},close:function(){var a=$("#page .page").detach();0<a.length&&(this.$pages.append(a),$("#page").trigger("change"),$("nav ul li").removeClass("active"),$("#overlay, header").unbind(".pageEvents"),$(window).unbind(".pageEvents"))}};
GUI.prototype.feedbackBar={show:function(a,b){var c,b=b?1E3*b:1E4;$("#feedback-bar p").eq(1).remove();$("#feedback-bar p").html()!==a&&(c=$("<p></p>"),c.append(a),$("#feedback-bar").append(c));$("#feedback-bar").show().trigger("change");setTimeout(function(){typeof c!=="undefined"&&c.remove();$("#feedback-bar").trigger("change")},b)},hide:function(){$("#feedback-bar p").remove();$("#feedback-bar").trigger("change")}};
GUI.prototype.feedback=function(a,b,c,d){c=c||"Information";"fixed"===$("header").css("position")?this.feedbackBar.show(a,b):d?this.confirm({msg:a,heading:c},d,b):this.alert(a,c,"info",b)};
GUI.prototype.alert=function(a,b,c,d){var f,g=$("#dialog-alert"),c=c||"error",c="normal"===c?"":"alert alert-block alert-"+c;g.find(".modal-header h3").text(b||"Alert");g.find(".modal-body p").removeClass().addClass(c).html(a).capitalizeStart();g.modal({keyboard:!0,show:!0});g.on("hidden",function(){g.find(".modal-header h3, .modal-body p").html("");clearInterval(f)});if("number"===typeof d){var e=d;g.find(".self-destruct-timer").text(e);f=setInterval(function(){e--;g.find(".self-destruct-timer").text(e)},
1E3);setTimeout(function(){clearInterval(f);g.find(".close").click()},1E3*d)}};
GUI.prototype.confirm=function(a,b,c){var d,f,g,e,h;"string"===typeof a?d=a:"string"===typeof a.msg&&(d=a.msg);d="undefined"!==typeof d?d:"Please confirm action";f="undefined"!==typeof a.heading?a.heading:"Are you sure?";g="undefined"!==typeof a.errorMsg?a.errorMsg:"";a="undefined"!==typeof a.dialog?a.dialog:"confirm";b="undefined"!==typeof b?b:{};b.posButton=b.posButton||"Confirm";b.negButton=b.negButton||"Cancel";b.posAction=b.posAction||function(){return false};b.negAction=b.negAction||function(){return false};
b.beforeAction=b.beforeAction||function(){};e=$("#dialog-"+a);e.find(".modal-header h3").text(f);e.find(".modal-body .msg").html(d).capitalizeStart();e.find(".modal-body .alert-error").html(g).show();g||e.find(".modal-body .alert-error").hide();e.modal({keyboard:!0,show:!0});e.on("shown",function(){b.beforeAction.call()});e.find("button.positive").on("click",function(){b.posAction.call();e.modal("hide")}).text(b.posButton);e.find("button.negative").on("click",function(){b.negAction.call();e.modal("hide")}).text(b.negButton);
e.on("hide",function(){e.off("shown hidden hide");e.find("button.positive, button.negative").off("click")});e.on("hidden",function(){e.find(".modal-body .msg, .modal-body .alert-error, button").text("")});if("number"===typeof c){var i=c;e.find(".self-destruct-timer").text(i);h=setInterval(function(){i--;e.find(".self-destruct-timer").text(i)},1E3);setTimeout(function(){clearInterval(h);e.find(".close").click()},1E3*c)}};
GUI.prototype.updateStatus={connection:function(a){console.log("updating online status in menu bar to:");console.log(a);!0===a?($("header #status-connection").removeClass().addClass("ui-icon ui-icon-signal-diag").attr("title","It appears there is currently an Internet connection available."),$(".drawer #status").removeClass("offline waiting").text("")):!1===a?($("header #status-connection").removeClass().addClass("ui-icon ui-icon-cancel").attr("title","It appears there is currently no Internet connection"),
$(".drawer #status").removeClass("waiting").addClass("offline").text("Offline. ")):$(".drawer #status").removeClass("offline").addClass("waiting").text("Waiting. ")},edit:function(a){a?$("header #status-editing").removeClass().addClass("ui-icon ui-icon-pencil").attr("title","Form is being edited."):$("header #status-editing").removeClass().attr("title","")},support:function(){},offlineLaunch:function(a){$(".drawer #status-offline-launch").text(a?"Offline Launch: Yes":"Offline Launch: No")}};
GUI.prototype.fillHeight=function(a){var b=$(window).height(),c=$("header").outerHeight(!0),a=a.outerHeight()-a.height();return b-c-a};
GUI.prototype.positionPageAndBar=function(){console.log("positionPageAndBar called");var a,b;a=$("header");b=a.outerHeight();var c=$("#feedback-bar"),d=0<c.find("p").length?!0:!1,f=c.outerHeight(),g=$("#page"),e=this.pages.isShowing(),h=g.outerHeight();g.css({position:a.css("position")});if("fixed"!==a.css("position"))return d||c.hide(),e||g.hide(),!1;a=!d?0-f:b;b=!e?0-h:d?a+f:b;c.css("top",a);g.css("top",b)};
GUI.prototype.setSettings=function(a){var b,c=this;console.log("gui updateSettings() started");$.each(a,function(a,f){b=f?c.pages.get("settings").find('input[name="'+a+'"][value="'+f+'"]'):c.pages.get("settings").find('input[name="'+a+'"]');0<b.length&&b.attr("checked",f?!0:!1).trigger("change")})};
GUI.prototype.parseFormlist=function(a,b,c){var d,f="";if($.isEmptyObject(a))b.addClass("empty"),c||(f='<p class="alert alert-error">Error occurred during creation of form list or no forms found</p>');else{for(d in a)f+='<li><a class="btn btn-block btn-info" id="'+d+'" title="'+a[d].title+'" href="'+a[d].url+'" data-server="'+a[d].server+'" >'+a[d].name+"</a></li>";b.removeClass("empty")}b.find("ul").empty().append(f)};
function getGetVariable(a){for(var b=window.location.search.substring(1).split("&"),c=0;c<b.length;c++){var d=b[c].split("=");if(d[0]==a)return encodeURI(d[1])}return!1}function Print(){this.setStyleSheet();this.setDpi()}Print.prototype.setDpi=function(){var a,b=document.body.appendChild(document.createElement("DIV"));b.style.width="1in";b.style.padding="0";a=b.offsetWidth;b.parentNode.removeChild(b);this.dpi=a};
Print.prototype.setStyleSheet=function(){this.styleSheet=this.getStyleSheet();this.$styleSheetLink=$('link[media="print"]:eq(0)')};Print.prototype.getStyleSheet=function(){for(var a=0;a<document.styleSheets.length;a++)if("print"===document.styleSheets[a].media.mediaText)return document.styleSheets[a];return null};Print.prototype.styleToAll=function(){this.styleSheet||this.setStyleSheet();this.styleSheet.media.mediaText="all";this.$styleSheetLink.attr("media","all")};
Print.prototype.styleReset=function(){this.styleSheet.media.mediaText="print";this.$styleSheetLink.attr("media","print")};Print.prototype.printForm=function(){console.debug("preparing form for printing");this.removePageBreaks();this.removePossiblePageBreaks();this.styleToAll();this.addPageBreaks();this.styleReset();window.print()};Print.prototype.removePageBreaks=function(){$(".page-break").remove()};Print.prototype.removePossiblePageBreaks=function(){$(".possible-break").remove()};
Print.prototype.addPossiblePageBreaks=function(){var a=$("<hr>",{"class":"possible-break"});this.removePossiblePageBreaks();$("form.jr").before(a.clone()).after(a.clone()).find("fieldset>legend, label:not(.geo)>input:not(input:radio, input:checkbox), label>select, label>textarea, .trigger>*, h4>*, h3>*").parent().each(function(){var b,c;b=$(this);return(c=b.prev().get(0))&&("H3"===c.nodeName||"H4"===c.nodeName)||$(c).hasClass("repeat-number")||0<b.parents("#jr-calculated-items, #jr-preload-items").length?
null:b.before(a.clone())});$(".possible-break").each(function(){if($(this).prev().hasClass("possible-break"))return $(this).remove()})};
Print.prototype.addPageBreaks=function(){var a,b,c,d,f,g,e,h;e=9.5*this.dpi;d=function(a,b){this.begin=$(a);this.begin_top=this.begin.offset().top;this.end=$(b);this.end_top=this.end.offset().top;this.h=this.end_top-this.begin_top;if(0>this.h)throw console.debug("begin (top: "+this.begin_top+")",a),console.debug("end (top: "+this.end_top+")",b),Error("A question group has an invalid height.");};d.prototype.break_before=function(){var a,b;b=(a=this.begin.prev().get(0))?["after",a]:["before",this.begin.parent().get(0)];
a=b[0];return $(b[1])[a]("<hr class='page-break' />")};this.removePageBreaks();this.addPossiblePageBreaks();c=$(".possible-break");b=[];for(a=1;a<c.length;a++)b.push(new d(c[a-1],c[a]));d=0;c=[];a=[];g=0;for(h=b.length;g<h;g++)f=b[g],d+f.h>e?(a.push(c),c=[f],d=f.h):(c.push(f),d+=f.h);a.push(c);console.debug("pages: ",a);e=1;for(c=a.length;e<c;e++)b=a[e],0<b.length&&b[0].break_before();return $(".possible-break").remove()};
(function(a){a.fn.toLargestWidth=function(){var b=0;return this.each(function(){a(this).width()>b&&(b=a(this).width())}).each(function(){a(this).width(b)})};a.fn.toSmallestWidth=function(){var b=2E3;return this.each(function(){console.log(a(this).width());a(this).width()<b&&(b=a(this).width())}).each(function(){a(this).width(b)})};a.fn.reverse=[].reverse;a.fn.alphanumeric=function(b){b=a.extend({ichars:"!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",nchars:"",allow:""},b);return this.each(function(){b.nocaps&&
(b.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ");b.allcaps&&(b.nchars+="abcdefghijklmnopqrstuvwxyz");for(var c=b.allow.split(""),d=0;d<c.length;d++)-1!=b.ichars.indexOf(c[d])&&(c[d]="\\"+c[d]);b.allow=c.join("|");var f=b.ichars+b.nchars,f=f.replace(RegExp(b.allow,"gi"),"");a(this).keypress(function(a){var b;b=a.charCode?String.fromCharCode(a.charCode):String.fromCharCode(a.which);f.indexOf(b)!=-1&&a.preventDefault();a.ctrlKey&&b=="v"&&a.preventDefault()});a(this).bind("contextmenu",function(){return false})})};
a.fn.numeric=function(b){var c="abcdefghijklmnopqrstuvwxyz",c=c+c.toUpperCase(),b=a.extend({nchars:c},b);return this.each(function(){a(this).alphanumeric(b)})};a.fn.alpha=function(b){b=a.extend({nchars:"1234567890"},b);return this.each(function(){a(this).alphanumeric(b)})};a.fn.capitalizeStart=function(a){a||(a=1);var c=this.contents().filter(function(){return 3==this.nodeType}).first(),d=c.text(),a=d.split(" ",a).join(" ");c.length&&(c[0].nodeValue=d.slice(a.length),c.before('<span class="capitalize">'+
a+"</span>"))}})(jQuery);