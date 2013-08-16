/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2009 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.2.2 (03/09/2009 22:39:06)
*/
(function(a){var c=(a.browser.msie?"paste":"input")+".mask";var b=(window.orientation!=undefined);a.mask={definitions:{"9":"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"}};a.fn.extend({caret:function(e,f){if(this.length==0){return}if(typeof e=="number"){f=(typeof f=="number")?f:e;return this.each(function(){if(this.setSelectionRange){this.focus();this.setSelectionRange(e,f)}else{if(this.createTextRange){var g=this.createTextRange();g.collapse(true);g.moveEnd("character",f);g.moveStart("character",e);g.select()}}})}else{if(this[0].setSelectionRange){e=this[0].selectionStart;f=this[0].selectionEnd}else{if(document.selection&&document.selection.createRange){var d=document.selection.createRange();e=0-d.duplicate().moveStart("character",-100000);f=e+d.text.length}}return{begin:e,end:f}}},unmask:function(){return this.trigger("unmask")},mask:function(j,d){if(!j&&this.length>0){var f=a(this[0]);var g=f.data("tests");return a.map(f.data("buffer"),function(l,m){return g[m]?l:null}).join("")}d=a.extend({placeholder:"_",completed:null},d);var k=a.mask.definitions;var g=[];var e=j.length;var i=null;var h=j.length;a.each(j.split(""),function(m,l){if(l=="?"){h--;e=m}else{if(k[l]){g.push(new RegExp(k[l]));if(i==null){i=g.length-1}}else{g.push(null)}}});return this.each(function(){var r=a(this);var m=a.map(j.split(""),function(x,y){if(x!="?"){return k[x]?d.placeholder:x}});var n=false;var q=r.val();r.data("buffer",m).data("tests",g);function v(x){while(++x<=h&&!g[x]){}return x}function t(x){while(!g[x]&&--x>=0){}for(var y=x;y<h;y++){if(g[y]){m[y]=d.placeholder;var z=v(y);if(z<h&&g[y].test(m[z])){m[y]=m[z]}else{break}}}s();r.caret(Math.max(i,x))}function u(y){for(var A=y,z=d.placeholder;A<h;A++){if(g[A]){var B=v(A);var x=m[A];m[A]=z;if(B<h&&g[B].test(x)){z=x}else{break}}}}function l(y){var x=a(this).caret();var z=y.keyCode;n=(z<16||(z>16&&z<32)||(z>32&&z<41));if((x.begin-x.end)!=0&&(!n||z==8||z==46)){w(x.begin,x.end)}if(z==8||z==46||(b&&z==127)){t(x.begin+(z==46?0:-1));return false}else{if(z==27){r.val(q);r.caret(0,p());return false}}}function o(B){if(n){n=false;return(B.keyCode==8)?false:null}B=B||window.event;var C=B.charCode||B.keyCode||B.which;var z=a(this).caret();if(B.ctrlKey||B.altKey||B.metaKey){return true}else{if((C>=32&&C<=125)||C>186){var x=v(z.begin-1);if(x<h){var A=String.fromCharCode(C);if(g[x].test(A)){u(x);m[x]=A;s();var y=v(x);a(this).caret(y);if(d.completed&&y==h){d.completed.call(r)}}}}}return false}function w(x,y){for(var z=x;z<y&&z<h;z++){if(g[z]){m[z]=d.placeholder}}}function s(){return r.val(m.join("")).val()}function p(y){var z=r.val();var C=-1;for(var B=0,x=0;B<h;B++){if(g[B]){m[B]=d.placeholder;while(x++<z.length){var A=z.charAt(x-1);if(g[B].test(A)){m[B]=A;C=B;break}}if(x>z.length){break}}else{if(m[B]==z[x]&&B!=e){x++;C=B}}}if(!y&&C+1<e){r.val("");w(0,h)}else{if(y||C+1>=e){s();if(!y){r.val(r.val().substring(0,C+1))}}}return(e?B:i)}if(!r.attr("readonly")){r.one("unmask",function(){r.unbind(".mask").removeData("buffer").removeData("tests")}).bind("focus.mask",function(){q=r.val();var x=p();s();setTimeout(function(){if(x==j.length){r.caret(0,x)}else{r.caret(x)}},0)}).bind("blur.mask",function(){p();if(r.val()!=q){r.change()}}).bind("keydown.mask",l).bind("keypress.mask",o).bind(c,function(){setTimeout(function(){r.caret(p(true))},0)})}p()})}})})(jQuery);
var JSON;if(!JSON){JSON={};}(function(){function f(n){return n<10?"0"+n:n;}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key);}if(typeof rep==="function"){value=rep.call(holder,key,value);}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null";}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null";}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v;}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v);}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v;}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" ";}}else{if(typeof space==="string"){indent=space;}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify");}return str("",{"":value});};}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j;}throw new SyntaxError("JSON.parse");};}}());

/*  Form builder validation
    Copyright (c) 2011 Mike Priest (Abstractive)
	Licensed under the MIT license
	Version: 1.0.0 (21/11/2011 11:13:06)
*/

/*
 * --------------------------------------------------------------------
 * jQuery-Plugin - selectToUISlider - creates a UI slider component from a select element(s)
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_jquery_ui_16_slider_from_a_select_element/
 * demo page: http://www.filamentgroup.com/examples/slider_v2/index.html
 *
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Usage Notes: please refer to our article above for documentation
 *
 * --------------------------------------------------------------------
 */
jQuery.fn.selectToUISlider=function(settings){var selects=jQuery(this);var options=jQuery.extend({labels:3,tooltip:true,tooltipSrc:"text",labelSrc:"value",sliderOptions:null},settings);var handleIds=(function(){var tempArr=[];selects.each(function(){tempArr.push("handle_"+jQuery(this).attr("id"));});return tempArr;})();var selectOptions=(function(){var opts=[];selects.eq(0).find("option").each(function(){opts.push({value:jQuery(this).attr("value"),text:jQuery(this).text()});});return opts;})();var groups=(function(){if(selects.eq(0).find("optgroup").size()>0){var groupedData=[];selects.eq(0).find("optgroup").each(function(i){groupedData[i]={};groupedData[i].label=jQuery(this).attr("label");groupedData[i].options=[];jQuery(this).find("option").each(function(){groupedData[i].options.push({text:jQuery(this).text(),value:jQuery(this).attr("value")});});});return groupedData;}else{return null;}})();function isArray(obj){return obj.constructor==Array;}function ttText(optIndex){return(options.tooltipSrc=="text")?selectOptions[optIndex].text:selectOptions[optIndex].value;}var sliderOptions={step:1,min:0,orientation:"horizontal",max:selectOptions.length-1,range:selects.length>1,slide:function(e,ui){var thisHandle=jQuery(ui.handle);var textval=ttText(ui.value);thisHandle.attr("aria-valuetext",textval).attr("aria-valuenow",ui.value).find(".ui-slider-tooltip .ttContent").text(textval);var currSelect=jQuery("#"+thisHandle.attr("id").split("handle_")[1]);currSelect.find("option").eq(ui.value).attr("selected","selected");},values:(function(){var values=[];selects.each(function(){values.push(jQuery(this).get(0).selectedIndex);});return values;})()};options.sliderOptions=(settings)?jQuery.extend(sliderOptions,settings.sliderOptions):sliderOptions;selects.bind("change keyup click",function(){var thisIndex=jQuery(this).get(0).selectedIndex;var thisHandle=jQuery("#handle_"+jQuery(this).attr("id"));var handleIndex=thisHandle.data("handleNum");thisHandle.parents(".ui-slider:eq(0)").slider("values",handleIndex,thisIndex);});var sliderComponent=jQuery("<div></div>");selects.each(function(i){var hidett="";var thisLabel=jQuery("label[for="+jQuery(this).attr("id")+"]");var labelText=(thisLabel.size()>0)?"Slider control for "+thisLabel.text()+"":"";var thisLabelId=thisLabel.attr("id")||thisLabel.attr("id","label_"+handleIds[i]).attr("id");if(options.tooltip==false){hidett=' style="display: none;"';}jQuery("<a "+'href="#" tabindex="0" '+'id="'+handleIds[i]+'" '+'class="ui-slider-handle" '+'role="slider" '+'aria-labelledby="'+thisLabelId+'" '+'aria-valuemin="'+options.sliderOptions.min+'" '+'aria-valuemax="'+options.sliderOptions.max+'" '+'aria-valuenow="'+options.sliderOptions.values[i]+'" '+'aria-valuetext="'+ttText(options.sliderOptions.values[i])+'" '+'><span class="screenReaderContext">'+labelText+"</span>"+'<span class="ui-slider-tooltip ui-widget-content ui-corner-all"'+hidett+'><span class="ttContent"></span>'+'<span class="ui-tooltip-pointer-down ui-widget-content"><span class="ui-tooltip-pointer-down-inner"></span></span>'+"</span></a>").data("handleNum",i).appendTo(sliderComponent);});if(groups){var inc=0;var scale=sliderComponent.append('<dl class="ui-slider-scale ui-helper-reset" role="presentation"></dl>').find(".ui-slider-scale:eq(0)");jQuery(groups).each(function(h){scale.append('<dt style="width: '+(100/groups.length).toFixed(2)+"%"+"; left:"+(h/(groups.length-1)*100).toFixed(2)+"%"+'"><span>'+this.label+"</span></dt>");var groupOpts=this.options;jQuery(this.options).each(function(i){var style=(inc==selectOptions.length-1||inc==0)?'style="display: none;"':"";var labelText=(options.labelSrc=="text")?groupOpts[i].text:groupOpts[i].value;scale.append('<dd style="left:'+leftVal(inc)+'"><span class="ui-slider-label">'+labelText+'</span><span class="ui-slider-tic ui-widget-content"'+style+"></span></dd>");inc++;});});}else{var scale=sliderComponent.append('<ol class="ui-slider-scale ui-helper-reset" role="presentation"></ol>').find(".ui-slider-scale:eq(0)");jQuery(selectOptions).each(function(i){var style=(i==selectOptions.length-1||i==0)?'style="display: none;"':"";var labelText=(options.labelSrc=="text")?this.text:this.value;scale.append('<li style="left:'+leftVal(i)+'"><span class="ui-slider-label">'+labelText+'</span><span class="ui-slider-tic ui-widget-content"'+style+"></span></li>");});}function leftVal(i){return(i/(selectOptions.length-1)*100).toFixed(2)+"%";}if(options.labels>1){sliderComponent.find(".ui-slider-scale li:last span.ui-slider-label, .ui-slider-scale dd:last span.ui-slider-label").addClass("ui-slider-label-show");}var increm=Math.max(1,Math.round(selectOptions.length/options.labels));for(var j=0;j<selectOptions.length;j+=increm){if((selectOptions.length-j)>increm){sliderComponent.find(".ui-slider-scale li:eq("+j+") span.ui-slider-label, .ui-slider-scale dd:eq("+j+") span.ui-slider-label").addClass("ui-slider-label-show");}}sliderComponent.find(".ui-slider-scale dt").each(function(i){jQuery(this).css({"left":((100/(groups.length))*i).toFixed(2)+"%"});});sliderComponent.insertAfter(jQuery(this).eq(this.length-1)).slider(options.sliderOptions).attr("role","application").find(".ui-slider-label").each(function(){jQuery(this).css("marginLeft",-jQuery(this).width()/2);});sliderComponent.find(".ui-tooltip-pointer-down-inner").each(function(){var bWidth=jQuery(".ui-tooltip-pointer-down-inner").css("borderTopWidth");var bColor=jQuery(this).parents(".ui-slider-tooltip").css("backgroundColor");jQuery(this).css("border-top",bWidth+" solid "+bColor);});var values=sliderComponent.slider("values");if(isArray(values)){jQuery(values).each(function(i){sliderComponent.find(".ui-slider-tooltip .ttContent").eq(i).text(ttText(this));});}else{sliderComponent.find(".ui-slider-tooltip .ttContent").eq(0).text(ttText(values));}return this;};

/*
Alfresco form management validation
Author: Mike Priest
Copyright (c) MPT Mozilla Public License 
*/
$(function () {
 $(".sliderForm").each(function () {
     var value = parseInt($(this).text(), 10);
     $(this).empty().slider({
         value: 5,
         min: 0,
         range: "min",
         max: 10,
         step: 1,
         slide: function (event, ui) {
             $(this).parents(".group").find(".slider-value:eq(0)").val(ui.value);
         }
     });
 });
 $(".frm_submit").live("click", function () {
     return validateForm($(".fm-doctypes"));
 });
 $(".numOnly").live("keydown", function (e) {
     if (e.which != 9 && e.which != 8 && e.which != 46 && e.which != 37 && e.which != 190 && e.which != 110 && e.which != 39 && e.which != 0 && (!((e.which >= 48 && e.which <= 57) || (e.which <= 105 && e.which >= 96)))) {
         return false;
     }
 });
 $(".alphanumOnly").live("keyup", function () {
     if (this.value.match(/[^a-zA-Z0-9 ]/g)) {
         this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, "");
     }
 });
 $(".currency").livequery("blur", function (e) {
     $(this).val(formatCurrency($(this).val()));
 });
});

function setMasks() {
 $(".date").mask("9999-99-99").datepicker({
     "dateFormat": "yy-mm-dd",
     changeMonth: true,
     changeYear: true
 });
 $(".phn").mask("99999-9999");
 $(".phone").mask("(999) 999-9999");
 $(".sin").mask("999-999-999");
 $(".phoneext").mask("(999) 999-9999? x99999");
 $(".postcode").mask("a9a 9a9");
 $(".isOtherExp").each(function () {
     var thisId = $(this).attr("regex");
     if (thisId) {
         var thisMask = thisId;
         $(this).mask(thisMask);
     }
 });
}

function formatCurrency(num) {
 num = num.toString().replace(/\$|\,/g, "");
 if (isNaN(num)) {
     num = "0";
 }
 sign = (num == (num = Math.abs(num)));
 num = Math.floor(num * 100 + 0.50000000001);
 cents = num % 100;
 num = Math.floor(num / 100).toString();
 if (cents < 10) {
     cents = "0" + cents;
 }
 for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
     num = num.substring(0, num.length - (4 * i + 3)) + "," + num.substring(num.length - (4 * i + 3));
 }
 return (((sign) ? "" : "-") + "$" + num + "." + cents);
}

function validateForm(wrapper) {
 var form = wrapper.find("form");
 var li = "";
 form.find(".errHandleBox ul").html("");
 form.find(".errHandleBox").hide();
 form.find(".frmErr").removeClass("frmErr");
 var frmValid = true;
 form.find(".required").each(function () {
     if ($(this).hasClass("mceEditor")) {
         var mceId = $(this).attr("id");
         htmlval = tinyMCE.get(mceId).getContent();
         if (htmlval == "") {
             frmValid = false;
             $(this).parents(".group").children("label").addClass("frmErr");
         }
     } else {
         if ($(this).attr("type") == "checkbox" || $(this).attr("type") == "radio") {
             console.log($('input[name="' + $(this).attr("name") + '"]:checked').length > 0);
             if ($('input[name="' + $(this).attr("name") + '"]:checked').length == 0) {
                 $(this).parent().find(".fld-lbl").addClass("frmErr");
                 frmValid = false;
             }
         } else {
             if ($(this).val().length == 0 || $(this).val() == "-Select-" || $(this).val() == "- select-" || $(this).val() == "select") {
                 $(this).addClass("frmErr");
                 frmValid = false;
             }
         }
     }
 });
 if (!frmValid) {
     li += "<li>Please check all required fields</li>";
 }
 form.find(".verification").each(function () {
     var vVal = $(this);
     var cVal = $(this).parents(".group").next().find(".verification-check");
     var label = $(this).parents(".group").children("label");
     if (vVal.val() != cVal.val()) {
         vVal.addClass("frmErr");
         cVal.addClass("frmErr");
         li += "<li>" + label.html() + " fields did not match. Please verify</li>";
         frmValid = false;
     }
 });
 form.find(".frm-fld").each(function () {
     var minLength = parseInt($(this).attr("minlength"));
     var maxLength = parseInt($(this).attr("maxlength"));
     var thisLength = $(this).val().length;
     var label = $(this).parents(".group").children("label");
     if (isNaN(minLength) == false && minLength > 1 && minLength < 51 && minLength != 0) {
         if (thisLength >= minLength) {} else {
             frmValid = false;
             li += "<li>" + label.html() + " requires a minimum value of " + minLength + "</li>";
             $(this).addClass("frmErr");
         }
     }
     if (isNaN(maxLength) == false && maxLength > 1 && maxLength < 51 && maxLength != 0) {
         if (thisLength >= maxLength) {} else {
             frmValid = false;
             li += "<li>" + label.html() + " requires a maximum value of " + maxLength + "</li>";
             $(this).addClass("frmErr");
         }
     }
 });
 if (!frmValid) {
     form.find(".errHandleBox").show();
     form.find(".errHandleBox ul").append(li);
     return false;
 }
 return true;
}

function setTinyMce() {
 tinyMCE.init({
     mode: "textareas",
     width: 400,
     editor_selector: "mceEditor",
     force_p_newlines: true,
     theme: "advanced",
     plugins: "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
     theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontsizeselect",
     theme_advanced_buttons2: "pastetext,pasteword,|, bullist,numlist,|,outdent,indent,|,forecolor,backcolor",
     theme_advanced_buttons3: "",
     theme_advanced_toolbar_location: "top",
     theme_advanced_toolbar_align: "left",
     theme_advanced_statusbar_location: "bottom",
     theme_advanced_resizing: true
 });
}

/* Tagging */
(function ($) {
 var delimiter = new Array();
 var tags_callbacks = new Array();
 $.fn.doAutosize = function (o) {
     var minWidth = $(this).data("minwidth"),
         maxWidth = $(this).data("maxwidth"),
         val = "",
         input = $(this),
         testSubject = $("#" + $(this).data("tester_id"));
     if (val === (val = input.val())) {
         return;
     }
     var escaped = val.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
     testSubject.html(escaped);
     var testerWidth = testSubject.width(),
         newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
         currentWidth = input.width(),
         isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth) || (newWidth > minWidth && newWidth < maxWidth);
     if (isValidWidthChange) {
         input.width(newWidth);
     }
 };
 $.fn.resetAutosize = function (options) {
     var minWidth = $(this).data("minwidth") || options.minInputWidth || $(this).width(),
         maxWidth = $(this).data("maxwidth") || options.maxInputWidth || ($(this).closest(".tagsinput").width() - options.inputPadding),
         val = "",
         input = $(this),
         testSubject = $("<tester/>").css({
             position: "absolute",
             top: -9999,
             left: -9999,
             width: "auto",
             fontSize: input.css("fontSize"),
             fontFamily: input.css("fontFamily"),
             fontWeight: input.css("fontWeight"),
             letterSpacing: input.css("letterSpacing"),
             whiteSpace: "nowrap"
         }),
         testerId = $(this).attr("id") + "_autosize_tester";
     if (!$("#" + testerId).length > 0) {
         testSubject.attr("id", testerId);
         testSubject.appendTo("body");
     }
     input.data("minwidth", minWidth);
     input.data("maxwidth", maxWidth);
     input.data("tester_id", testerId);
     input.css("width", minWidth);
 };
 $.fn.addTag = function (value, options) {
     options = jQuery.extend({
         focus: false,
         callback: true
     }, options);
     this.each(function () {
         var id = $(this).attr("id");
         var tagslist = $(this).val().split(delimiter[id]);
         if (tagslist[0] == "") {
             tagslist = new Array();
         }
         value = jQuery.trim(value);
         if (options.unique) {
             var skipTag = $(this).tagExist(value);
             if (skipTag == true) {
                 $("#" + id + "_tag").addClass("not_valid");
             }
         } else {
             var skipTag = false;
         } if (value != "" && skipTag != true) {
             $("<span>").addClass("tag").append($("<span>").text(value).append("&nbsp;&nbsp;"), $('<a href="#">x</a>').click(function () {
                 return $("#" + id).removeTag(escape(value));
             })).insertBefore("#" + id + "_addTag");
             tagslist.push(value);
             $("#" + id + "_tag").val("");
             if (options.focus) {
                 $("#" + id + "_tag").focus();
             } else {
                 $("#" + id + "_tag").blur();
             }
             $.fn.tagsInput.updateTagsField(this, tagslist);
             if (options.callback && tags_callbacks[id] && tags_callbacks[id]["onAddTag"]) {
                 var f = tags_callbacks[id]["onAddTag"];
                 f.call(this, value);
             }
             if (tags_callbacks[id] && tags_callbacks[id]["onChange"]) {
                 var i = tagslist.length;
                 var f = tags_callbacks[id]["onChange"];
                 f.call(this, $(this), tagslist[i - 1]);
             }
         }
     });
     return false;
 };
 $.fn.removeTag = function (value) {
     value = unescape(value);
     this.each(function () {
         var id = $(this).attr("id");
         var old = $(this).val().split(delimiter[id]);
         $("#" + id + "_tagsinput .tag").remove();
         str = "";
         for (i = 0; i < old.length; i++) {
             if (old[i] != value) {
                 str = str + delimiter[id] + old[i];
             }
         }
         $.fn.tagsInput.importTags(this, str);
         if (tags_callbacks[id] && tags_callbacks[id]["onRemoveTag"]) {
             var f = tags_callbacks[id]["onRemoveTag"];
             f.call(this, value);
         }
     });
     return false;
 };
 $.fn.tagExist = function (val) {
     var id = $(this).attr("id");
     var tagslist = $(this).val().split(delimiter[id]);
     return (jQuery.inArray(val, tagslist) >= 0);
 };
 $.fn.importTags = function (str) {
     id = $(this).attr("id");
     $("#" + id + "_tagsinput .tag").remove();
     $.fn.tagsInput.importTags(this, str);
 };
 $.fn.tagsInput = function (options) {
     var settings = jQuery.extend({
         interactive: true,
         defaultText: "add a tag",
         minChars: 0,
         width: "300px",
         height: "100px",
         autocomplete: {
             selectFirst: false
         },
         "hide": true,
         "delimiter": ",",
         "unique": true,
         removeWithBackspace: true,
         placeholderColor: "#666666",
         autosize: true,
         comfortZone: 20,
         inputPadding: 6 * 2
     }, options);
     this.each(function () {
         if (settings.hide) {
             $(this).hide();
         }
         var id = $(this).attr("id");
         if (!id || delimiter[$(this).attr("id")]) {
             id = $(this).attr("id", "tags" + new Date().getTime()).attr("id");
         }
         var data = jQuery.extend({
             pid: id,
             real_input: "#" + id,
             holder: "#" + id + "_tagsinput",
             input_wrapper: "#" + id + "_addTag",
             fake_input: "#" + id + "_tag"
         }, settings);
         delimiter[id] = data.delimiter;
         if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
             tags_callbacks[id] = new Array();
             tags_callbacks[id]["onAddTag"] = settings.onAddTag;
             tags_callbacks[id]["onRemoveTag"] = settings.onRemoveTag;
             tags_callbacks[id]["onChange"] = settings.onChange;
         }
         var markup = '<div id="' + id + '_tagsinput" class="tagsinput"><div id="' + id + '_addTag">';
         if (settings.interactive) {
             markup = markup + '<input id="' + id + '_tag" value="" data-default="' + settings.defaultText + '" />';
         }
         markup = markup + '</div><div class="tags_clear"></div></div>';
         $(markup).insertAfter(this);
         $(data.holder).css("width", settings.width);
         $(data.holder).css("min-height", settings.height);
         $(data.holder).css("height", settings.height);
         if ($(data.real_input).val() != "") {
             $.fn.tagsInput.importTags($(data.real_input), $(data.real_input).val());
         }
         if (settings.interactive) {
             $(data.fake_input).val($(data.fake_input).attr("data-default"));
             $(data.fake_input).css("color", settings.placeholderColor);
             $(data.fake_input).resetAutosize(settings);
             $(data.holder).bind("click", data, function (event) {
                 $(event.data.fake_input).focus();
             });
             $(data.fake_input).bind("focus", data, function (event) {
                 if ($(event.data.fake_input).val() == $(event.data.fake_input).attr("data-default")) {
                     $(event.data.fake_input).val("");
                 }
                 $(event.data.fake_input).css("color", "#000000");
             });
             if (settings.autocomplete_url != undefined) {
                 autocomplete_options = {
                     source: settings.autocomplete_url
                 };
                 for (attrname in settings.autocomplete) {
                     autocomplete_options[attrname] = settings.autocomplete[attrname];
                 }
                 if (jQuery.Autocompleter !== undefined) {
                     $(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete);
                     $(data.fake_input).bind("result", data, function (event, data, formatted) {
                         if (data) {
                             $("#" + id).addTag(data[0] + "", {
                                 focus: true,
                                 unique: (settings.unique)
                             });
                         }
                     });
                 } else {
                     if (jQuery.ui.autocomplete !== undefined) {
                         $(data.fake_input).autocomplete(autocomplete_options);
                         $(data.fake_input).bind("autocompleteselect", data, function (event, ui) {
                             $(event.data.real_input).addTag(ui.item.value, {
                                 focus: true,
                                 unique: (settings.unique)
                             });
                             return false;
                         });
                     }
                 }
             } else {
                 $(data.fake_input).bind("blur", data, function (event) {
                     var d = $(this).attr("data-default");
                     if ($(event.data.fake_input).val() != "" && $(event.data.fake_input).val() != d) {
                         if ((event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length))) {
                             $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                                 focus: true,
                                 unique: (settings.unique)
                             });
                         }
                     } else {
                         $(event.data.fake_input).val($(event.data.fake_input).attr("data-default"));
                         $(event.data.fake_input).css("color", settings.placeholderColor);
                     }
                     return false;
                 });
             }
             $(data.fake_input).bind("keypress", data, function (event) {
                 if (event.which == event.data.delimiter.charCodeAt(0) || event.which == 13) {
                     event.preventDefault();
                     if ((event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length))) {
                         $(event.data.real_input).addTag($(event.data.fake_input).val(), {
                             focus: true,
                             unique: (settings.unique)
                         });
                     }
                     $(event.data.fake_input).resetAutosize(settings);
                     return false;
                 } else {
                     if (event.data.autosize) {
                         $(event.data.fake_input).doAutosize(settings);
                     }
                 }
             });
             data.removeWithBackspace && $(data.fake_input).bind("keydown", function (event) {
                 if (event.keyCode == 8 && $(this).val() == "") {
                     event.preventDefault();
                     var last_tag = $(this).closest(".tagsinput").find(".tag:last").text();
                     var id = $(this).attr("id").replace(/_tag$/, "");
                     last_tag = last_tag.replace(/[\s]+x$/, "");
                     $("#" + id).removeTag(escape(last_tag));
                     $(this).trigger("focus");
                 }
             });
             $(data.fake_input).blur();
             if (data.unique) {
                 $(data.fake_input).keydown(function (event) {
                     if (event.keyCode == 8 || String.fromCharCode(event.which).match(/\w+|[Ã¡Ã©ÃÃ³ÃºÃÃ‰ÃÃ“ÃšÃ±Ã‘,/]+/)) {
                         $(this).removeClass("not_valid");
                     }
                 });
             }
         }
     });
     return this;
 };
 $.fn.tagsInput.updateTagsField = function (obj, tagslist) {
     var id = $(obj).attr("id");
     $(obj).val(tagslist.join(delimiter[id]));
 };
 $.fn.tagsInput.importTags = function (obj, val) {
     $(obj).val("");
     var id = $(obj).attr("id");
     var tags = val.split(delimiter[id]);
     for (i = 0; i < tags.length; i++) {
         $(obj).addTag(tags[i], {
             focus: false,
             callback: false
         });
     }
     if (tags_callbacks[id] && tags_callbacks[id]["onChange"]) {
         var f = tags_callbacks[id]["onChange"];
         f.call(obj, obj, tags[i]);
     }
 };
})(jQuery);