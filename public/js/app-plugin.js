/*!
 * cleave.js - 1.5.3
 * https://github.com/nosir/cleave.js
 * Apache License Version 2.0
 *
 * Copyright (C) 2012-2019 Max Huang https://github.com/nosir/
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Cleave=t():e.Cleave=t()}(this,function(){return function(e){function t(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){(function(t){"use strict";var i=function(e,t){var r=this,n=!1;if("string"==typeof e?(r.element=document.querySelector(e),n=document.querySelectorAll(e).length>1):"undefined"!=typeof e.length&&e.length>0?(r.element=e[0],n=e.length>1):r.element=e,!r.element)throw new Error("[cleave.js] Please check the element");if(n)try{console.warn("[cleave.js] Multiple input fields matched, cleave.js will only take the first one.")}catch(a){}t.initValue=r.element.value,r.properties=i.DefaultProperties.assign({},t),r.init()};i.prototype={init:function(){var e=this,t=e.properties;return t.numeral||t.phone||t.creditCard||t.time||t.date||0!==t.blocksLength||t.prefix?(t.maxLength=i.Util.getMaxLength(t.blocks),e.isAndroid=i.Util.isAndroid(),e.lastInputValue="",e.onChangeListener=e.onChange.bind(e),e.onKeyDownListener=e.onKeyDown.bind(e),e.onFocusListener=e.onFocus.bind(e),e.onCutListener=e.onCut.bind(e),e.onCopyListener=e.onCopy.bind(e),e.element.addEventListener("input",e.onChangeListener),e.element.addEventListener("keydown",e.onKeyDownListener),e.element.addEventListener("focus",e.onFocusListener),e.element.addEventListener("cut",e.onCutListener),e.element.addEventListener("copy",e.onCopyListener),e.initPhoneFormatter(),e.initDateFormatter(),e.initTimeFormatter(),e.initNumeralFormatter(),void((t.initValue||t.prefix&&!t.noImmediatePrefix)&&e.onInput(t.initValue))):void e.onInput(t.initValue)},initNumeralFormatter:function(){var e=this,t=e.properties;t.numeral&&(t.numeralFormatter=new i.NumeralFormatter(t.numeralDecimalMark,t.numeralIntegerScale,t.numeralDecimalScale,t.numeralThousandsGroupStyle,t.numeralPositiveOnly,t.stripLeadingZeroes,t.prefix,t.signBeforePrefix,t.delimiter))},initTimeFormatter:function(){var e=this,t=e.properties;t.time&&(t.timeFormatter=new i.TimeFormatter(t.timePattern,t.timeFormat),t.blocks=t.timeFormatter.getBlocks(),t.blocksLength=t.blocks.length,t.maxLength=i.Util.getMaxLength(t.blocks))},initDateFormatter:function(){var e=this,t=e.properties;t.date&&(t.dateFormatter=new i.DateFormatter(t.datePattern,t.dateMin,t.dateMax),t.blocks=t.dateFormatter.getBlocks(),t.blocksLength=t.blocks.length,t.maxLength=i.Util.getMaxLength(t.blocks))},initPhoneFormatter:function(){var e=this,t=e.properties;if(t.phone)try{t.phoneFormatter=new i.PhoneFormatter(new t.root.Cleave.AsYouTypeFormatter(t.phoneRegionCode),t.delimiter)}catch(r){throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")}},onKeyDown:function(e){var t=this,r=t.properties,n=e.which||e.keyCode,a=i.Util,o=t.element.value;t.hasBackspaceSupport=t.hasBackspaceSupport||8===n,!t.hasBackspaceSupport&&a.isAndroidBackspaceKeydown(t.lastInputValue,o)&&(n=8),t.lastInputValue=o;var l=a.getPostDelimiter(o,r.delimiter,r.delimiters);8===n&&l?r.postDelimiterBackspace=l:r.postDelimiterBackspace=!1},onChange:function(){this.onInput(this.element.value)},onFocus:function(){var e=this,t=e.properties;i.Util.fixPrefixCursor(e.element,t.prefix,t.delimiter,t.delimiters)},onCut:function(e){i.Util.checkFullSelection(this.element.value)&&(this.copyClipboardData(e),this.onInput(""))},onCopy:function(e){i.Util.checkFullSelection(this.element.value)&&this.copyClipboardData(e)},copyClipboardData:function(e){var t=this,r=t.properties,n=i.Util,a=t.element.value,o="";o=r.copyDelimiter?a:n.stripDelimiters(a,r.delimiter,r.delimiters);try{e.clipboardData?e.clipboardData.setData("Text",o):window.clipboardData.setData("Text",o),e.preventDefault()}catch(l){}},onInput:function(e){var t=this,r=t.properties,n=i.Util,a=n.getPostDelimiter(e,r.delimiter,r.delimiters);return r.numeral||!r.postDelimiterBackspace||a||(e=n.headStr(e,e.length-r.postDelimiterBackspace.length)),r.phone?(!r.prefix||r.noImmediatePrefix&&!e.length?r.result=r.phoneFormatter.format(e):r.result=r.prefix+r.phoneFormatter.format(e).slice(r.prefix.length),void t.updateValueState()):r.numeral?(r.prefix&&r.noImmediatePrefix&&0===e.length?r.result="":r.result=r.numeralFormatter.format(e),void t.updateValueState()):(r.date&&(e=r.dateFormatter.getValidatedDate(e)),r.time&&(e=r.timeFormatter.getValidatedTime(e)),e=n.stripDelimiters(e,r.delimiter,r.delimiters),e=n.getPrefixStrippedValue(e,r.prefix,r.prefixLength,r.result,r.delimiter,r.delimiters,r.noImmediatePrefix),e=r.numericOnly?n.strip(e,/[^\d]/g):e,e=r.uppercase?e.toUpperCase():e,e=r.lowercase?e.toLowerCase():e,!r.prefix||r.noImmediatePrefix&&!e.length||(e=r.prefix+e,0!==r.blocksLength)?(r.creditCard&&t.updateCreditCardPropsByValue(e),e=n.headStr(e,r.maxLength),r.result=n.getFormattedValue(e,r.blocks,r.blocksLength,r.delimiter,r.delimiters,r.delimiterLazyShow),void t.updateValueState()):(r.result=e,void t.updateValueState()))},updateCreditCardPropsByValue:function(e){var t,r=this,n=r.properties,a=i.Util;a.headStr(n.result,4)!==a.headStr(e,4)&&(t=i.CreditCardDetector.getInfo(e,n.creditCardStrictMode),n.blocks=t.blocks,n.blocksLength=n.blocks.length,n.maxLength=a.getMaxLength(n.blocks),n.creditCardType!==t.type&&(n.creditCardType=t.type,n.onCreditCardTypeChanged.call(r,n.creditCardType)))},updateValueState:function(){var e=this,t=i.Util,r=e.properties;if(e.element){var n=e.element.selectionEnd,a=e.element.value,o=r.result;if(n=t.getNextCursorPosition(n,a,o,r.delimiter,r.delimiters),e.isAndroid)return void window.setTimeout(function(){e.element.value=o,t.setSelection(e.element,n,r.document,!1),e.callOnValueChanged()},1);e.element.value=o,t.setSelection(e.element,n,r.document,!1),e.callOnValueChanged()}},callOnValueChanged:function(){var e=this,t=e.properties;t.onValueChanged.call(e,{target:{value:t.result,rawValue:e.getRawValue()}})},setPhoneRegionCode:function(e){var t=this,r=t.properties;r.phoneRegionCode=e,t.initPhoneFormatter(),t.onChange()},setRawValue:function(e){var t=this,r=t.properties;e=void 0!==e&&null!==e?e.toString():"",r.numeral&&(e=e.replace(".",r.numeralDecimalMark)),r.postDelimiterBackspace=!1,t.element.value=e,t.onInput(e)},getRawValue:function(){var e=this,t=e.properties,r=i.Util,n=e.element.value;return t.rawValueTrimPrefix&&(n=r.getPrefixStrippedValue(n,t.prefix,t.prefixLength,t.result,t.delimiter,t.delimiters)),n=t.numeral?t.numeralFormatter.getRawValue(n):r.stripDelimiters(n,t.delimiter,t.delimiters)},getISOFormatDate:function(){var e=this,t=e.properties;return t.date?t.dateFormatter.getISOFormatDate():""},getISOFormatTime:function(){var e=this,t=e.properties;return t.time?t.timeFormatter.getISOFormatTime():""},getFormattedValue:function(){return this.element.value},destroy:function(){var e=this;e.element.removeEventListener("input",e.onChangeListener),e.element.removeEventListener("keydown",e.onKeyDownListener),e.element.removeEventListener("focus",e.onFocusListener),e.element.removeEventListener("cut",e.onCutListener),e.element.removeEventListener("copy",e.onCopyListener)},toString:function(){return"[Cleave Object]"}},i.NumeralFormatter=r(1),i.DateFormatter=r(2),i.TimeFormatter=r(3),i.PhoneFormatter=r(4),i.CreditCardDetector=r(5),i.Util=r(6),i.DefaultProperties=r(7),("object"==typeof t&&t?t:window).Cleave=i,e.exports=i}).call(t,function(){return this}())},function(e,t){"use strict";var r=function(e,t,i,n,a,o,l,s,c){var u=this;u.numeralDecimalMark=e||".",u.numeralIntegerScale=t>0?t:0,u.numeralDecimalScale=i>=0?i:2,u.numeralThousandsGroupStyle=n||r.groupStyle.thousand,u.numeralPositiveOnly=!!a,u.stripLeadingZeroes=o!==!1,u.prefix=l||""===l?l:"",u.signBeforePrefix=!!s,u.delimiter=c||""===c?c:",",u.delimiterRE=c?new RegExp("\\"+c,"g"):""};r.groupStyle={thousand:"thousand",lakh:"lakh",wan:"wan",none:"none"},r.prototype={getRawValue:function(e){return e.replace(this.delimiterRE,"").replace(this.numeralDecimalMark,".")},format:function(e){var t,i,n,a,o=this,l="";switch(e=e.replace(/[A-Za-z]/g,"").replace(o.numeralDecimalMark,"M").replace(/[^\dM-]/g,"").replace(/^\-/,"N").replace(/\-/g,"").replace("N",o.numeralPositiveOnly?"":"-").replace("M",o.numeralDecimalMark),o.stripLeadingZeroes&&(e=e.replace(/^(-)?0+(?=\d)/,"$1")),i="-"===e.slice(0,1)?"-":"",n="undefined"!=typeof o.prefix?o.signBeforePrefix?i+o.prefix:o.prefix+i:i,a=e,e.indexOf(o.numeralDecimalMark)>=0&&(t=e.split(o.numeralDecimalMark),a=t[0],l=o.numeralDecimalMark+t[1].slice(0,o.numeralDecimalScale)),"-"===i&&(a=a.slice(1)),o.numeralIntegerScale>0&&(a=a.slice(0,o.numeralIntegerScale)),o.numeralThousandsGroupStyle){case r.groupStyle.lakh:a=a.replace(/(\d)(?=(\d\d)+\d$)/g,"$1"+o.delimiter);break;case r.groupStyle.wan:a=a.replace(/(\d)(?=(\d{4})+$)/g,"$1"+o.delimiter);break;case r.groupStyle.thousand:a=a.replace(/(\d)(?=(\d{3})+$)/g,"$1"+o.delimiter)}return n+a.toString()+(o.numeralDecimalScale>0?l.toString():"")}},e.exports=r},function(e,t){"use strict";var r=function(e,t,r){var i=this;i.date=[],i.blocks=[],i.datePattern=e,i.dateMin=t.split("-").reverse().map(function(e){return parseInt(e,10)}),2===i.dateMin.length&&i.dateMin.unshift(0),i.dateMax=r.split("-").reverse().map(function(e){return parseInt(e,10)}),2===i.dateMax.length&&i.dateMax.unshift(0),i.initBlocks()};r.prototype={initBlocks:function(){var e=this;e.datePattern.forEach(function(t){"Y"===t?e.blocks.push(4):e.blocks.push(2)})},getISOFormatDate:function(){var e=this,t=e.date;return t[2]?t[2]+"-"+e.addLeadingZero(t[1])+"-"+e.addLeadingZero(t[0]):""},getBlocks:function(){return this.blocks},getValidatedDate:function(e){var t=this,r="";return e=e.replace(/[^\d]/g,""),t.blocks.forEach(function(i,n){if(e.length>0){var a=e.slice(0,i),o=a.slice(0,1),l=e.slice(i);switch(t.datePattern[n]){case"d":"00"===a?a="01":parseInt(o,10)>3?a="0"+o:parseInt(a,10)>31&&(a="31");break;case"m":"00"===a?a="01":parseInt(o,10)>1?a="0"+o:parseInt(a,10)>12&&(a="12")}r+=a,e=l}}),this.getFixedDateString(r)},getFixedDateString:function(e){var t,r,i,n=this,a=n.datePattern,o=[],l=0,s=0,c=0,u=0,d=0,m=0,p=!1;4===e.length&&"y"!==a[0].toLowerCase()&&"y"!==a[1].toLowerCase()&&(u="d"===a[0]?0:2,d=2-u,t=parseInt(e.slice(u,u+2),10),r=parseInt(e.slice(d,d+2),10),o=this.getFixedDate(t,r,0)),8===e.length&&(a.forEach(function(e,t){switch(e){case"d":l=t;break;case"m":s=t;break;default:c=t}}),m=2*c,u=l<=c?2*l:2*l+2,d=s<=c?2*s:2*s+2,t=parseInt(e.slice(u,u+2),10),r=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(m,m+4),10),p=4===e.slice(m,m+4).length,o=this.getFixedDate(t,r,i)),4!==e.length||"y"!==a[0]&&"y"!==a[1]||(d="m"===a[0]?0:2,m=2-d,r=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(m,m+2),10),p=2===e.slice(m,m+2).length,o=[0,r,i]),6!==e.length||"Y"!==a[0]&&"Y"!==a[1]||(d="m"===a[0]?0:4,m=2-.5*d,r=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(m,m+4),10),p=4===e.slice(m,m+4).length,o=[0,r,i]),o=n.getRangeFixedDate(o),n.date=o;var h=0===o.length?e:a.reduce(function(e,t){switch(t){case"d":return e+(0===o[0]?"":n.addLeadingZero(o[0]));case"m":return e+(0===o[1]?"":n.addLeadingZero(o[1]));case"y":return e+(p?n.addLeadingZeroForYear(o[2],!1):"");case"Y":return e+(p?n.addLeadingZeroForYear(o[2],!0):"")}},"");return h},getRangeFixedDate:function(e){var t=this,r=t.datePattern,i=t.dateMin||[],n=t.dateMax||[];return!e.length||i.length<3&&n.length<3?e:r.find(function(e){return"y"===e.toLowerCase()})&&0===e[2]?e:n.length&&(n[2]<e[2]||n[2]===e[2]&&(n[1]<e[1]||n[1]===e[1]&&n[0]<e[0]))?n:i.length&&(i[2]>e[2]||i[2]===e[2]&&(i[1]>e[1]||i[1]===e[1]&&i[0]>e[0]))?i:e},getFixedDate:function(e,t,r){return e=Math.min(e,31),t=Math.min(t,12),r=parseInt(r||0,10),(t<7&&t%2===0||t>8&&t%2===1)&&(e=Math.min(e,2===t?this.isLeapYear(r)?29:28:30)),[e,t,r]},isLeapYear:function(e){return e%4===0&&e%100!==0||e%400===0},addLeadingZero:function(e){return(e<10?"0":"")+e},addLeadingZeroForYear:function(e,t){return t?(e<10?"000":e<100?"00":e<1e3?"0":"")+e:(e<10?"0":"")+e}},e.exports=r},function(e,t){"use strict";var r=function(e,t){var r=this;r.time=[],r.blocks=[],r.timePattern=e,r.timeFormat=t,r.initBlocks()};r.prototype={initBlocks:function(){var e=this;e.timePattern.forEach(function(){e.blocks.push(2)})},getISOFormatTime:function(){var e=this,t=e.time;return t[2]?e.addLeadingZero(t[0])+":"+e.addLeadingZero(t[1])+":"+e.addLeadingZero(t[2]):""},getBlocks:function(){return this.blocks},getTimeFormatOptions:function(){var e=this;return"12"===String(e.timeFormat)?{maxHourFirstDigit:1,maxHours:12,maxMinutesFirstDigit:5,maxMinutes:60}:{maxHourFirstDigit:2,maxHours:23,maxMinutesFirstDigit:5,maxMinutes:60}},getValidatedTime:function(e){var t=this,r="";e=e.replace(/[^\d]/g,"");var i=t.getTimeFormatOptions();return t.blocks.forEach(function(n,a){if(e.length>0){var o=e.slice(0,n),l=o.slice(0,1),s=e.slice(n);switch(t.timePattern[a]){case"h":parseInt(l,10)>i.maxHourFirstDigit?o="0"+l:parseInt(o,10)>i.maxHours&&(o=i.maxHours+"");break;case"m":case"s":parseInt(l,10)>i.maxMinutesFirstDigit?o="0"+l:parseInt(o,10)>i.maxMinutes&&(o=i.maxMinutes+"")}r+=o,e=s}}),this.getFixedTimeString(r)},getFixedTimeString:function(e){var t,r,i,n=this,a=n.timePattern,o=[],l=0,s=0,c=0,u=0,d=0,m=0;return 6===e.length&&(a.forEach(function(e,t){switch(e){case"s":l=2*t;break;case"m":s=2*t;break;case"h":c=2*t}}),m=c,d=s,u=l,t=parseInt(e.slice(u,u+2),10),r=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(m,m+2),10),o=this.getFixedTime(i,r,t)),4===e.length&&n.timePattern.indexOf("s")<0&&(a.forEach(function(e,t){switch(e){case"m":s=2*t;break;case"h":c=2*t}}),m=c,d=s,t=0,r=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(m,m+2),10),o=this.getFixedTime(i,r,t)),n.time=o,0===o.length?e:a.reduce(function(e,t){switch(t){case"s":return e+n.addLeadingZero(o[2]);case"m":return e+n.addLeadingZero(o[1]);case"h":return e+n.addLeadingZero(o[0])}},"")},getFixedTime:function(e,t,r){return r=Math.min(parseInt(r||0,10),60),t=Math.min(t,60),e=Math.min(e,60),[e,t,r]},addLeadingZero:function(e){return(e<10?"0":"")+e}},e.exports=r},function(e,t){"use strict";var r=function(e,t){var r=this;r.delimiter=t||""===t?t:" ",r.delimiterRE=t?new RegExp("\\"+t,"g"):"",r.formatter=e};r.prototype={setFormatter:function(e){this.formatter=e},format:function(e){var t=this;t.formatter.clear(),e=e.replace(/[^\d+]/g,""),e=e.replace(/^\+/,"B").replace(/\+/g,"").replace("B","+"),e=e.replace(t.delimiterRE,"");for(var r,i="",n=!1,a=0,o=e.length;a<o;a++)r=t.formatter.inputDigit(e.charAt(a)),/[\s()-]/g.test(r)?(i=r,n=!0):n||(i=r);return i=i.replace(/[()]/g,""),i=i.replace(/[\s-]/g,t.delimiter)}},e.exports=r},function(e,t){"use strict";var r={blocks:{uatp:[4,5,6],amex:[4,6,5],diners:[4,6,4],discover:[4,4,4,4],mastercard:[4,4,4,4],dankort:[4,4,4,4],instapayment:[4,4,4,4],jcb15:[4,6,5],jcb:[4,4,4,4],maestro:[4,4,4,4],visa:[4,4,4,4],mir:[4,4,4,4],unionPay:[4,4,4,4],general:[4,4,4,4]},re:{uatp:/^(?!1800)1\d{0,14}/,amex:/^3[47]\d{0,13}/,discover:/^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,diners:/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,mastercard:/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,dankort:/^(5019|4175|4571)\d{0,12}/,instapayment:/^63[7-9]\d{0,13}/,jcb15:/^(?:2131|1800)\d{0,11}/,jcb:/^(?:35\d{0,2})\d{0,12}/,maestro:/^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,mir:/^220[0-4]\d{0,12}/,visa:/^4\d{0,15}/,unionPay:/^62\d{0,14}/},getStrictBlocks:function(e){var t=e.reduce(function(e,t){return e+t},0);return e.concat(19-t)},getInfo:function(e,t){var i=r.blocks,n=r.re;t=!!t;for(var a in n)if(n[a].test(e)){var o=i[a];return{type:a,blocks:t?this.getStrictBlocks(o):o}}return{type:"unknown",blocks:t?this.getStrictBlocks(i.general):i.general}}};e.exports=r},function(e,t){"use strict";var r={noop:function(){},strip:function(e,t){return e.replace(t,"")},getPostDelimiter:function(e,t,r){if(0===r.length)return e.slice(-t.length)===t?t:"";var i="";return r.forEach(function(t){e.slice(-t.length)===t&&(i=t)}),i},getDelimiterREByDelimiter:function(e){return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),"g")},getNextCursorPosition:function(e,t,r,i,n){return t.length===e?r.length:e+this.getPositionOffset(e,t,r,i,n)},getPositionOffset:function(e,t,r,i,n){var a,o,l;return a=this.stripDelimiters(t.slice(0,e),i,n),o=this.stripDelimiters(r.slice(0,e),i,n),l=a.length-o.length,0!==l?l/Math.abs(l):0},stripDelimiters:function(e,t,r){var i=this;if(0===r.length){var n=t?i.getDelimiterREByDelimiter(t):"";return e.replace(n,"")}return r.forEach(function(t){t.split("").forEach(function(t){e=e.replace(i.getDelimiterREByDelimiter(t),"")})}),e},headStr:function(e,t){return e.slice(0,t)},getMaxLength:function(e){return e.reduce(function(e,t){return e+t},0)},getPrefixStrippedValue:function(e,t,r,i,n,a,o){if(0===r)return e;if(i.slice(0,r)!==t)return o&&!i&&e?e:"";var l=this.stripDelimiters(i,n,a);return e.slice(0,r)!==t?l.slice(r):e.slice(r)},getFirstDiffIndex:function(e,t){for(var r=0;e.charAt(r)===t.charAt(r);)if(""===e.charAt(r++))return-1;return r},getFormattedValue:function(e,t,r,i,n,a){var o,l="",s=n.length>0;return 0===r?e:(t.forEach(function(t,c){if(e.length>0){var u=e.slice(0,t),d=e.slice(t);o=s?n[a?c-1:c]||o:i,a?(c>0&&(l+=o),l+=u):(l+=u,u.length===t&&c<r-1&&(l+=o)),e=d}}),l)},fixPrefixCursor:function(e,t,r,i){if(e){var n=e.value,a=r||i[0]||" ";if(e.setSelectionRange&&t&&!(t.length+a.length<n.length)){var o=2*n.length;setTimeout(function(){e.setSelectionRange(o,o)},1)}}},checkFullSelection:function(e){try{var t=window.getSelection()||document.getSelection()||{};return t.toString().length===e.length}catch(r){}return!1},setSelection:function(e,t,r){if(e===this.getActiveElement(r)&&!(e&&e.value.length<=t))if(e.createTextRange){var i=e.createTextRange();i.move("character",t),i.select()}else try{e.setSelectionRange(t,t)}catch(n){console.warn("The input element type does not support selection")}},getActiveElement:function(e){var t=e.activeElement;return t&&t.shadowRoot?this.getActiveElement(t.shadowRoot):t},isAndroid:function(){return navigator&&/android/i.test(navigator.userAgent)},isAndroidBackspaceKeydown:function(e,t){return!!(this.isAndroid()&&e&&t)&&t===e.slice(0,-1)}};e.exports=r},function(e,t){(function(t){"use strict";var r={assign:function(e,r){return e=e||{},r=r||{},e.creditCard=!!r.creditCard,e.creditCardStrictMode=!!r.creditCardStrictMode,e.creditCardType="",e.onCreditCardTypeChanged=r.onCreditCardTypeChanged||function(){},e.phone=!!r.phone,e.phoneRegionCode=r.phoneRegionCode||"AU",e.phoneFormatter={},e.time=!!r.time,e.timePattern=r.timePattern||["h","m","s"],e.timeFormat=r.timeFormat||"24",e.timeFormatter={},e.date=!!r.date,e.datePattern=r.datePattern||["d","m","Y"],e.dateMin=r.dateMin||"",e.dateMax=r.dateMax||"",e.dateFormatter={},e.numeral=!!r.numeral,e.numeralIntegerScale=r.numeralIntegerScale>0?r.numeralIntegerScale:0,e.numeralDecimalScale=r.numeralDecimalScale>=0?r.numeralDecimalScale:2,e.numeralDecimalMark=r.numeralDecimalMark||".",e.numeralThousandsGroupStyle=r.numeralThousandsGroupStyle||"thousand",e.numeralPositiveOnly=!!r.numeralPositiveOnly,e.stripLeadingZeroes=r.stripLeadingZeroes!==!1,e.signBeforePrefix=!!r.signBeforePrefix,e.numericOnly=e.creditCard||e.date||!!r.numericOnly,e.uppercase=!!r.uppercase,e.lowercase=!!r.lowercase,e.prefix=e.creditCard||e.date?"":r.prefix||"",e.noImmediatePrefix=!!r.noImmediatePrefix,e.prefixLength=e.prefix.length,e.rawValueTrimPrefix=!!r.rawValueTrimPrefix,e.copyDelimiter=!!r.copyDelimiter,e.initValue=void 0!==r.initValue&&null!==r.initValue?r.initValue.toString():"",e.delimiter=r.delimiter||""===r.delimiter?r.delimiter:r.date?"/":r.time?":":r.numeral?",":(r.phone," "),e.delimiterLength=e.delimiter.length,e.delimiterLazyShow=!!r.delimiterLazyShow,e.delimiters=r.delimiters||[],e.blocks=r.blocks||[],e.blocksLength=e.blocks.length,e.root="object"==typeof t&&t?t:window,e.document=r.document||e.root.document,e.maxLength=0,e.backspace=!1,e.result="",e.onValueChanged=r.onValueChanged||function(){},e}};e.exports=r}).call(t,function(){return this}())}])});
!function(){function l(l,n){var u=l.split("."),t=Y;u[0]in t||!t.execScript||t.execScript("var "+u[0]);for(var e;u.length&&(e=u.shift());)u.length||void 0===n?t=t[e]?t[e]:t[e]={}:t[e]=n}function n(l,n){function u(){}u.prototype=n.prototype,l.M=n.prototype,l.prototype=new u,l.prototype.constructor=l,l.N=function(l,u,t){for(var e=Array(arguments.length-2),r=2;r<arguments.length;r++)e[r-2]=arguments[r];return n.prototype[u].apply(l,e)}}function u(l,n){null!=l&&this.a.apply(this,arguments)}function t(l){l.b=""}function e(l,n){l.sort(n||r)}function r(l,n){return l>n?1:l<n?-1:0}function i(l){var n,u=[],t=0;for(n in l)u[t++]=l[n];return u}function a(l,n){this.b=l,this.a={};for(var u=0;u<n.length;u++){var t=n[u];this.a[t.b]=t}}function d(l){return l=i(l.a),e(l,function(l,n){return l.b-n.b}),l}function o(l,n){switch(this.b=l,this.g=!!n.v,this.a=n.c,this.i=n.type,this.h=!1,this.a){case O:case H:case q:case X:case k:case L:case J:this.h=!0}this.f=n.defaultValue}function s(){this.a={},this.f=this.j().a,this.b=this.g=null}function f(l,n){for(var u=d(l.j()),t=0;t<u.length;t++){var e=u[t],r=e.b;if(null!=n.a[r]){l.b&&delete l.b[e.b];var i=11==e.a||10==e.a;if(e.g)for(var e=p(n,r)||[],a=0;a<e.length;a++){var o=l,s=r,c=i?e[a].clone():e[a];o.a[s]||(o.a[s]=[]),o.a[s].push(c),o.b&&delete o.b[s]}else e=p(n,r),i?(i=p(l,r))?f(i,e):m(l,r,e.clone()):m(l,r,e)}}}function p(l,n){var u=l.a[n];if(null==u)return null;if(l.g){if(!(n in l.b)){var t=l.g,e=l.f[n];if(null!=u)if(e.g){for(var r=[],i=0;i<u.length;i++)r[i]=t.b(e,u[i]);u=r}else u=t.b(e,u);return l.b[n]=u}return l.b[n]}return u}function c(l,n,u){var t=p(l,n);return l.f[n].g?t[u||0]:t}function h(l,n){var u;if(null!=l.a[n])u=c(l,n,void 0);else l:{if(u=l.f[n],void 0===u.f){var t=u.i;if(t===Boolean)u.f=!1;else if(t===Number)u.f=0;else{if(t!==String){u=new t;break l}u.f=u.h?"0":""}}u=u.f}return u}function g(l,n){return l.f[n].g?null!=l.a[n]?l.a[n].length:0:null!=l.a[n]?1:0}function m(l,n,u){l.a[n]=u,l.b&&(l.b[n]=u)}function b(l,n){var u,t=[];for(u in n)0!=u&&t.push(new o(u,n[u]));return new a(l,t)}/*

 Protocol Buffer 2 Copyright 2008 Google Inc.
 All other code copyright its respective owners.
 Copyright (C) 2010 The Libphonenumber Authors

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
function y(){s.call(this)}function v(){s.call(this)}function S(){s.call(this)}function _(){}function w(){}function A(){}/*

 Copyright (C) 2010 The Libphonenumber Authors.

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
function x(){this.a={}}function B(l){return 0==l.length||rl.test(l)}function C(l,n){if(null==n)return null;n=n.toUpperCase();var u=l.a[n];if(null==u){if(u=nl[n],null==u)return null;u=(new A).a(S.j(),u),l.a[n]=u}return u}function M(l){return l=ll[l],null==l?"ZZ":l[0]}function N(l){this.H=RegExp(" "),this.C="",this.m=new u,this.w="",this.i=new u,this.u=new u,this.l=!0,this.A=this.o=this.F=!1,this.G=x.b(),this.s=0,this.b=new u,this.B=!1,this.h="",this.a=new u,this.f=[],this.D=l,this.J=this.g=D(this,this.D)}function D(l,n){var u;if(null!=n&&isNaN(n)&&n.toUpperCase()in nl){if(u=C(l.G,n),null==u)throw Error("Invalid region code: "+n);u=h(u,10)}else u=0;return u=C(l.G,M(u)),null!=u?u:il}function G(l){for(var n=l.f.length,u=0;u<n;++u){var e=l.f[u],r=h(e,1);if(l.w==r)return!1;var i;i=l;var a=e,d=h(a,1);if(-1!=d.indexOf("|"))i=!1;else{d=d.replace(al,"\\d"),d=d.replace(dl,"\\d"),t(i.m);var o;o=i;var a=h(a,2),s="999999999999999".match(d)[0];s.length<o.a.b.length?o="":(o=s.replace(new RegExp(d,"g"),a),o=o.replace(RegExp("9","g")," ")),0<o.length?(i.m.a(o),i=!0):i=!1}if(i)return l.w=r,l.B=sl.test(c(e,4)),l.s=0,!0}return l.l=!1}function j(l,n){for(var u=[],t=n.length-3,e=l.f.length,r=0;r<e;++r){var i=l.f[r];0==g(i,3)?u.push(l.f[r]):(i=c(i,3,Math.min(t,g(i,3)-1)),0==n.search(i)&&u.push(l.f[r]))}l.f=u}function I(l,n){l.i.a(n);var u=n;if(el.test(u)||1==l.i.b.length&&tl.test(u)){var e,u=n;"+"==u?(e=u,l.u.a(u)):(e=ul[u],l.u.a(e),l.a.a(e)),n=e}else l.l=!1,l.F=!0;if(!l.l){if(!l.F)if(F(l)){if(U(l))return V(l)}else if(0<l.h.length&&(u=l.a.toString(),t(l.a),l.a.a(l.h),l.a.a(u),u=l.b.toString(),e=u.lastIndexOf(l.h),t(l.b),l.b.a(u.substring(0,e))),l.h!=P(l))return l.b.a(" "),V(l);return l.i.toString()}switch(l.u.b.length){case 0:case 1:case 2:return l.i.toString();case 3:if(!F(l))return l.h=P(l),E(l);l.A=!0;default:return l.A?(U(l)&&(l.A=!1),l.b.toString()+l.a.toString()):0<l.f.length?(u=K(l,n),e=$(l),0<e.length?e:(j(l,l.a.toString()),G(l)?T(l):l.l?R(l,u):l.i.toString())):E(l)}}function V(l){return l.l=!0,l.A=!1,l.f=[],l.s=0,t(l.m),l.w="",E(l)}function $(l){for(var n=l.a.toString(),u=l.f.length,t=0;t<u;++t){var e=l.f[t],r=h(e,1);if(new RegExp("^(?:"+r+")$").test(n))return l.B=sl.test(c(e,4)),n=n.replace(new RegExp(r,"g"),c(e,2)),R(l,n)}return""}function R(l,n){var u=l.b.b.length;return l.B&&0<u&&" "!=l.b.toString().charAt(u-1)?l.b+" "+n:l.b+n}function E(l){var n=l.a.toString();if(3<=n.length){for(var u=l.o&&0==l.h.length&&0<g(l.g,20)?p(l.g,20)||[]:p(l.g,19)||[],t=u.length,e=0;e<t;++e){var r=u[e];0<l.h.length&&B(h(r,4))&&!c(r,6)&&null==r.a[5]||(0!=l.h.length||l.o||B(h(r,4))||c(r,6))&&ol.test(h(r,2))&&l.f.push(r)}return j(l,n),n=$(l),0<n.length?n:G(l)?T(l):l.i.toString()}return R(l,n)}function T(l){var n=l.a.toString(),u=n.length;if(0<u){for(var t="",e=0;e<u;e++)t=K(l,n.charAt(e));return l.l?R(l,t):l.i.toString()}return l.b.toString()}function P(l){var n,u=l.a.toString(),e=0;return 1!=c(l.g,10)?n=!1:(n=l.a.toString(),n="1"==n.charAt(0)&&"0"!=n.charAt(1)&&"1"!=n.charAt(1)),n?(e=1,l.b.a("1").a(" "),l.o=!0):null!=l.g.a[15]&&(n=new RegExp("^(?:"+c(l.g,15)+")"),n=u.match(n),null!=n&&null!=n[0]&&0<n[0].length&&(l.o=!0,e=n[0].length,l.b.a(u.substring(0,e)))),t(l.a),l.a.a(u.substring(e)),u.substring(0,e)}function F(l){var n=l.u.toString(),u=new RegExp("^(?:\\+|"+c(l.g,11)+")"),u=n.match(u);return null!=u&&null!=u[0]&&0<u[0].length&&(l.o=!0,u=u[0].length,t(l.a),l.a.a(n.substring(u)),t(l.b),l.b.a(n.substring(0,u)),"+"!=n.charAt(0)&&l.b.a(" "),!0)}function U(l){if(0==l.a.b.length)return!1;var n,e=new u;l:{if(n=l.a.toString(),0!=n.length&&"0"!=n.charAt(0))for(var r,i=n.length,a=1;3>=a&&a<=i;++a)if(r=parseInt(n.substring(0,a),10),r in ll){e.a(n.substring(a)),n=r;break l}n=0}return 0!=n&&(t(l.a),l.a.a(e.toString()),e=M(n),"001"==e?l.g=C(l.G,""+n):e!=l.D&&(l.g=D(l,e)),l.b.a(""+n).a(" "),l.h="",!0)}function K(l,n){var u=l.m.toString();if(0<=u.substring(l.s).search(l.H)){var e=u.search(l.H),u=u.replace(l.H,n);return t(l.m),l.m.a(u),l.s=e,u.substring(0,l.s+1)}return 1==l.f.length&&(l.l=!1),l.w="",l.i.toString()}var Y=this;u.prototype.b="",u.prototype.set=function(l){this.b=""+l},u.prototype.a=function(l,n,u){if(this.b+=String(l),null!=n)for(var t=1;t<arguments.length;t++)this.b+=arguments[t];return this},u.prototype.toString=function(){return this.b};var J=1,L=2,O=3,H=4,q=6,X=16,k=18;s.prototype.set=function(l,n){m(this,l.b,n)},s.prototype.clone=function(){var l=new this.constructor;return l!=this&&(l.a={},l.b&&(l.b={}),f(l,this)),l},n(y,s);var Z=null;n(v,s);var z=null;n(S,s);var Q=null;y.prototype.j=function(){var l=Z;return l||(Z=l=b(y,{0:{name:"NumberFormat",I:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,c:9,type:String},2:{name:"format",required:!0,c:9,type:String},3:{name:"leading_digits_pattern",v:!0,c:9,type:String},4:{name:"national_prefix_formatting_rule",c:9,type:String},6:{name:"national_prefix_optional_when_formatting",c:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",c:9,type:String}})),l},y.j=y.prototype.j,v.prototype.j=function(){var l=z;return l||(z=l=b(v,{0:{name:"PhoneNumberDesc",I:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",c:9,type:String},9:{name:"possible_length",v:!0,c:5,type:Number},10:{name:"possible_length_local_only",v:!0,c:5,type:Number},6:{name:"example_number",c:9,type:String}})),l},v.j=v.prototype.j,S.prototype.j=function(){var l=Q;return l||(Q=l=b(S,{0:{name:"PhoneMetadata",I:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",c:11,type:v},2:{name:"fixed_line",c:11,type:v},3:{name:"mobile",c:11,type:v},4:{name:"toll_free",c:11,type:v},5:{name:"premium_rate",c:11,type:v},6:{name:"shared_cost",c:11,type:v},7:{name:"personal_number",c:11,type:v},8:{name:"voip",c:11,type:v},21:{name:"pager",c:11,type:v},25:{name:"uan",c:11,type:v},27:{name:"emergency",c:11,type:v},28:{name:"voicemail",c:11,type:v},29:{name:"short_code",c:11,type:v},30:{name:"standard_rate",c:11,type:v},31:{name:"carrier_specific",c:11,type:v},33:{name:"sms_services",c:11,type:v},24:{name:"no_international_dialling",c:11,type:v},9:{name:"id",required:!0,c:9,type:String},10:{name:"country_code",c:5,type:Number},11:{name:"international_prefix",c:9,type:String},17:{name:"preferred_international_prefix",c:9,type:String},12:{name:"national_prefix",c:9,type:String},13:{name:"preferred_extn_prefix",c:9,type:String},15:{name:"national_prefix_for_parsing",c:9,type:String},16:{name:"national_prefix_transform_rule",c:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",c:8,defaultValue:!1,type:Boolean},19:{name:"number_format",v:!0,c:11,type:y},20:{name:"intl_number_format",v:!0,c:11,type:y},22:{name:"main_country_for_code",c:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",c:9,type:String},26:{name:"leading_zero_possible",c:8,defaultValue:!1,type:Boolean}})),l},S.j=S.prototype.j,_.prototype.a=function(l){throw new l.b,Error("Unimplemented")},_.prototype.b=function(l,n){if(11==l.a||10==l.a)return n instanceof s?n:this.a(l.i.prototype.j(),n);if(14==l.a){if("string"==typeof n&&W.test(n)){var u=Number(n);if(0<u)return u}return n}if(!l.h)return n;if(u=l.i,u===String){if("number"==typeof n)return String(n)}else if(u===Number&&"string"==typeof n&&("Infinity"===n||"-Infinity"===n||"NaN"===n||W.test(n)))return Number(n);return n};var W=/^-?[0-9]+$/;n(w,_),w.prototype.a=function(l,n){var u=new l.b;return u.g=this,u.a=n,u.b={},u},n(A,w),A.prototype.b=function(l,n){return 8==l.a?!!n:_.prototype.b.apply(this,arguments)},A.prototype.a=function(l,n){return A.M.a.call(this,l,n)};/*

 Copyright (C) 2010 The Libphonenumber Authors

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
var ll={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" ")},nl={AG:[null,[null,null,"(?:268|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",null,null,null,"2684601234",null,null,null,[7]],[null,null,"268(?:464|7(?:1[3-9]|2\\d|3[246]|64|[78][0-689]))\\d{4}",null,null,null,"2684641234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,"26848[01]\\d{4}",null,null,null,"2684801234",null,null,null,[7]],"AG",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,"26840[69]\\d{4}",null,null,null,"2684061234",null,null,null,[7]],null,"268",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],AI:[null,[null,null,"(?:264|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"2644(?:6[12]|9[78])\\d{4}",null,null,null,"2644612345",null,null,null,[7]],[null,null,"264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",null,null,null,"2642351234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"AI",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"264",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],AS:[null,[null,null,"(?:[58]\\d\\d|684|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",null,null,null,"6846221234",null,null,null,[7]],[null,null,"684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}",null,null,null,"6847331234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"AS",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"684",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],BB:[null,[null,null,"(?:246|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",null,null,null,"2464123456",null,null,null,[7]],[null,null,"246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}",null,null,null,"2462501234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"(?:246976|900[2-9]\\d\\d)\\d{4}",null,null,null,"9002123456",null,null,null,[7]],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,"24631\\d{5}",null,null,null,"2463101234",null,null,null,[7]],"BB",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"246",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"246(?:292|367|4(?:1[7-9]|3[01]|44|67)|7(?:36|53))\\d{4}",null,null,null,"2464301234",null,null,null,[7]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],BM:[null,[null,null,"(?:441|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"441(?:2(?:02|23|[3479]\\d|61)|[46]\\d\\d|5(?:4\\d|60|89)|824)\\d{4}",null,null,null,"4412345678",null,null,null,[7]],[null,null,"441(?:[37]\\d|5[0-39])\\d{5}",null,null,null,"4413701234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"BM",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"441",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],BS:[null,[null,null,"(?:242|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",null,null,null,"2423456789",null,null,null,[7]],[null,null,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",null,null,null,"2423591234",null,null,null,[7]],[null,null,"(?:242300|8(?:00|33|44|55|66|77|88)[2-9]\\d\\d)\\d{4}",null,null,null,"8002123456",null,null,null,[7]],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"BS",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"242",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"242225[0-46-9]\\d{3}",null,null,null,"2422250123"],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],CA:[null,[null,null,"(?:[2-8]\\d|90)\\d{8}",null,null,null,null,null,null,[10],[7]],[null,null,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",null,null,null,"5062345678",null,null,null,[7]],[null,null,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",null,null,null,"5062345678",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,"600[2-9]\\d{6}",null,null,null,"6002012345"],"CA",1,"011","1",null,null,"1",null,null,1,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],DM:[null,[null,null,"(?:[58]\\d\\d|767|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",null,null,null,"7674201234",null,null,null,[7]],[null,null,"767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}",null,null,null,"7672251234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"DM",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"767",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],DO:[null,[null,null,"(?:[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",null,null,null,"8092345678",null,null,null,[7]],[null,null,"8[024]9[2-9]\\d{6}",null,null,null,"8092345678",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"DO",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"8[024]9",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],GD:[null,[null,null,"(?:473|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",null,null,null,"4732691234",null,null,null,[7]],[null,null,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}",null,null,null,"4734031234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"GD",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"473",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],GU:[null,[null,null,"(?:[58]\\d\\d|671|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",null,null,null,"6713001234",null,null,null,[7]],[null,null,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",null,null,null,"6713001234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"GU",1,"011","1",null,null,"1",null,null,1,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"671",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],JM:[null,[null,null,"(?:[58]\\d\\d|658|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"(?:658[2-9]\\d\\d|876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468])))\\d{4}",null,null,null,"8765230123",null,null,null,[7]],[null,null,"876(?:(?:2[14-9]|[348]\\d)\\d|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}",null,null,null,"8762101234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"JM",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"658|876",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],KN:[null,[null,null,"(?:[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",null,null,null,"8692361234",null,null,null,[7]],[null,null,"869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",null,null,null,"8697652917",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"KN",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"869",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],KY:[null,[null,null,"(?:345|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",null,null,null,"3452221234",null,null,null,[7]],[null,null,"345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}",null,null,null,"3453231234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"(?:345976|900[2-9]\\d\\d)\\d{4}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"KY",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,"345849\\d{4}",null,null,null,"3458491234"],null,"345",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],LC:[null,[null,null,"(?:[58]\\d\\d|758|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"758(?:4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}",null,null,null,"7584305678",null,null,null,[7]],[null,null,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}",null,null,null,"7582845678",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"LC",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"758",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],MP:[null,[null,null,"(?:[58]\\d\\d|(?:67|90)0)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",null,null,null,"6702345678",null,null,null,[7]],[null,null,"670(?:2(?:3[3-7]|56|8[5-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",null,null,null,"6702345678",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"MP",1,"011","1",null,null,"1",null,null,1,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"670",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],MS:[null,[null,null,"(?:(?:[58]\\d\\d|900)\\d\\d|66449)\\d{5}",null,null,null,null,null,null,[10],[7]],[null,null,"664491\\d{4}",null,null,null,"6644912345",null,null,null,[7]],[null,null,"66449[2-6]\\d{4}",null,null,null,"6644923456",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"MS",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"664",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],PR:[null,[null,null,"(?:[589]\\d\\d|787)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"(?:787|939)[2-9]\\d{6}",null,null,null,"7872345678",null,null,null,[7]],[null,null,"(?:787|939)[2-9]\\d{6}",null,null,null,"7872345678",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"PR",1,"011","1",null,null,"1",null,null,1,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"787|939",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],SX:[null,[null,null,"(?:(?:[58]\\d\\d|900)\\d|7215)\\d{6}",null,null,null,null,null,null,[10],[7]],[null,null,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",null,null,null,"7215425678",null,null,null,[7]],[null,null,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",null,null,null,"7215205678",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002123456"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002123456"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"SX",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"721",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],TC:[null,[null,null,"(?:[58]\\d\\d|649|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"649(?:712|9(?:4\\d|50))\\d{4}",null,null,null,"6497121234",null,null,null,[7]],[null,null,"649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",null,null,null,"6492311234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,"64971[01]\\d{4}",null,null,null,"6497101234",null,null,null,[7]],"TC",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"649",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],TT:[null,[null,null,"(?:[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"868(?:2(?:01|[23]\\d)|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",null,null,null,"8682211234",null,null,null,[7]],[null,null,"868(?:2(?:6[6-9]|[7-9]\\d)|[37](?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d))\\d{4}",null,null,null,"8682911234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"TT",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"868",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,"868619\\d{4}",null,null,null,"8686191234",null,null,null,[7]]],US:[null,[null,null,"[2-9]\\d{9}",null,null,null,null,null,null,[10],[7]],[null,null,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",null,null,null,"2015550123",null,null,null,[7]],[null,null,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[017]|6[0-279]|78|8[0-2])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",null,null,null,"2015550123",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"US",1,"011","1",null,null,"1",null,null,1,[[null,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"]],[null,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],null,null,1]],[[null,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[2-9]"]]],[null,null,null,null,null,null,null,null,null,[-1]],1,null,[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"710[2-9]\\d{6}",null,null,null,"7102123456"],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],VC:[null,[null,null,"(?:[58]\\d\\d|784|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",null,null,null,"7842661234",null,null,null,[7]],[null,null,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4]))\\d{4}",null,null,null,"7844301234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"VC",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"784",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],VG:[null,[null,null,"(?:284|[58]\\d\\d|900)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"284(?:(?:229|774|8(?:52|6[459]))\\d|4(?:22\\d|9(?:[45]\\d|6[0-5])))\\d{3}",null,null,null,"2842291234",null,null,null,[7]],[null,null,"284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|54[0-57])\\d|4(?:(?:4[0-6]|68)\\d|9(?:6[6-9]|9\\d)))\\d{3}",null,null,null,"2843001234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"VG",1,"011","1",null,null,"1",null,null,null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"284",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],VI:[null,[null,null,"(?:(?:34|90)0|[58]\\d\\d)\\d{7}",null,null,null,null,null,null,[10],[7]],[null,null,"340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",null,null,null,"3406421234",null,null,null,[7]],[null,null,"340(?:2(?:01|2[06-8]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",null,null,null,"3406421234",null,null,null,[7]],[null,null,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",null,null,null,"8002345678"],[null,null,"900[2-9]\\d{6}",null,null,null,"9002345678"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",null,null,null,"5002345678"],[null,null,null,null,null,null,null,null,null,[-1]],"VI",1,"011","1",null,null,"1",null,null,1,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"340",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]]};x.b=function(){return x.a?x.a:x.a=new x};var ul={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"},tl=RegExp("[+＋]+"),el=RegExp("([0-9０-９٠-٩۰-۹])"),rl=/^\(?\$1\)?$/,il=new S;m(il,11,"NA");var al=/\[([^\[\]])*\]/g,dl=/\d(?=[^,}][^,}])/g,ol=RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)+$"),sl=/[- ]/;N.prototype.K=function(){this.C="",t(this.i),t(this.u),t(this.m),this.s=0,this.w="",t(this.b),this.h="",t(this.a),this.l=!0,this.A=this.o=this.F=!1,this.f=[],this.B=!1,this.g!=this.J&&(this.g=D(this,this.D))},N.prototype.L=function(l){return this.C=I(this,l)},l("Cleave.AsYouTypeFormatter",N),l("Cleave.AsYouTypeFormatter.prototype.inputDigit",N.prototype.L),l("Cleave.AsYouTypeFormatter.prototype.clear",N.prototype.K)}.call("object"==typeof global&&global?global:window);
/**
 * jquery.pwstrength http://matoilic.github.com/jquery.pwstrength
 *
 * @version v0.1.1
 * @author Mato Ilic <info@matoilic.ch>
 * @copyright 2013 Mato Ilic
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function(c){function g(a){var b=c.pwstrength(c(this).val()),a=a.data,d;d=a.classes[b];a.indicator.removeClass(a.indicator.data("pwclass"));a.indicator.data("pwclass",d);a.indicator.addClass(d);a.indicator.find(a.label).html(a.texts[b])}c.pwstrength=function(a){var b=0,d=a.length,c,e,f;b+=d<5?0:d<8?5:d<16?10:15;(c=a.match(/[a-z]/g))&&(b+=1);(d=a.match(/[A-Z]/g))&&(b+=5);d&&c&&(b+=2);(e=a.match(/\d/g))&&e.length>1&&(b+=5);(f=a.match(/\W/g))&&(b+=f.length>1?15:10);d&&c&&e&&f&&(b+=15);a.match(/\s/)&&
(b+=10);return b<15?0:b<20?1:b<35?2:b<50?3:4};c.fn.pwstrength=function(a){a=c.extend({label:".label",classes:["pw-very-weak","pw-weak","pw-mediocre","pw-strong","pw-very-strong"],texts:["very weak","weak","mediocre","strong","very strong"]},a||{});a.indicator=c("#"+this.data("indicator"));return this.keyup(a,g)}})(jQuery);

/**
* @version: 3.0.5
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2019 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: http://www.daterangepicker.com/
*/
// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Make globaly available as well
        define(['moment', 'jquery'], function (moment, jquery) {
            if (!jquery.fn) jquery.fn = {}; // webpack server rendering
            if (typeof moment !== 'function' && moment.default) moment = moment.default
            return factory(moment, jquery);
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node / Browserify
        //isomorphic issue
        var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
        if (!jQuery) {
            jQuery = require('jquery');
            if (!jQuery.fn) jQuery.fn = {};
        }
        var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
        module.exports = factory(moment, jQuery);
    } else {
        // Browser globals
        root.daterangepicker = factory(root.moment, root.jQuery);
    }
}(this, function(moment, $) {
    var DateRangePicker = function(element, options, cb) {

        //default settings for options
        this.parentEl = 'body';
        this.element = $(element);
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.maxSpan = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.minYear = moment().subtract(100, 'year').format('YYYY');
        this.maxYear = moment().add(100, 'year').format('YYYY');
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.showCustomRangeLabel = true;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};

        this.opens = 'right';
        if (this.element.hasClass('pull-right'))
            this.opens = 'left';

        this.drops = 'down';
        if (this.element.hasClass('dropup'))
            this.drops = 'up';

        this.buttonClasses = 'btn btn-sm';
        this.applyButtonClasses = 'btn-primary';
        this.cancelButtonClasses = 'btn-default';

        this.locale = {
            direction: 'ltr',
            format: moment.localeData().longDateFormat('L'),
            separator: ' - ',
            applyLabel: 'Apply',
            cancelLabel: 'Cancel',
            weekLabel: 'W',
            customRangeLabel: 'Custom Range',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek()
        };

        this.callback = function() { };

        //some state information
        this.isShowing = false;
        this.leftCalendar = {};
        this.rightCalendar = {};

        //custom options from user
        if (typeof options !== 'object' || options === null)
            options = {};

        //allow setting options with data attributes
        //data-api options will be overwritten with custom javascript options
        options = $.extend(this.element.data(), options);

        //html template for the picker UI
        if (typeof options.template !== 'string' && !(options.template instanceof $))
            options.template =
            '<div class="daterangepicker">' +
                '<div class="ranges"></div>' +
                '<div class="drp-calendar left">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="calendar-time"></div>' +
                '</div>' +
                '<div class="drp-calendar right">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="calendar-time"></div>' +
                '</div>' +
                '<div class="drp-buttons">' +
                    '<span class="drp-selected"></span>' +
                    '<button class="cancelBtn" type="button"></button>' +
                    '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                '</div>' +
            '</div>';

        this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(options.template).appendTo(this.parentEl);

        //
        // handle all the possible options overriding defaults
        //

        if (typeof options.locale === 'object') {

            if (typeof options.locale.direction === 'string')
                this.locale.direction = options.locale.direction;

            if (typeof options.locale.format === 'string')
                this.locale.format = options.locale.format;

            if (typeof options.locale.separator === 'string')
                this.locale.separator = options.locale.separator;

            if (typeof options.locale.daysOfWeek === 'object')
                this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

            if (typeof options.locale.monthNames === 'object')
              this.locale.monthNames = options.locale.monthNames.slice();

            if (typeof options.locale.firstDay === 'number')
              this.locale.firstDay = options.locale.firstDay;

            if (typeof options.locale.applyLabel === 'string')
              this.locale.applyLabel = options.locale.applyLabel;

            if (typeof options.locale.cancelLabel === 'string')
              this.locale.cancelLabel = options.locale.cancelLabel;

            if (typeof options.locale.weekLabel === 'string')
              this.locale.weekLabel = options.locale.weekLabel;

            if (typeof options.locale.customRangeLabel === 'string'){
                //Support unicode chars in the custom range name.
                var elem = document.createElement('textarea');
                elem.innerHTML = options.locale.customRangeLabel;
                var rangeHtml = elem.value;
                this.locale.customRangeLabel = rangeHtml;
            }
        }
        this.container.addClass(this.locale.direction);

        if (typeof options.startDate === 'string')
            this.startDate = moment(options.startDate, this.locale.format);

        if (typeof options.endDate === 'string')
            this.endDate = moment(options.endDate, this.locale.format);

        if (typeof options.minDate === 'string')
            this.minDate = moment(options.minDate, this.locale.format);

        if (typeof options.maxDate === 'string')
            this.maxDate = moment(options.maxDate, this.locale.format);

        if (typeof options.startDate === 'object')
            this.startDate = moment(options.startDate);

        if (typeof options.endDate === 'object')
            this.endDate = moment(options.endDate);

        if (typeof options.minDate === 'object')
            this.minDate = moment(options.minDate);

        if (typeof options.maxDate === 'object')
            this.maxDate = moment(options.maxDate);

        // sanity check for bad options
        if (this.minDate && this.startDate.isBefore(this.minDate))
            this.startDate = this.minDate.clone();

        // sanity check for bad options
        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (typeof options.applyButtonClasses === 'string')
            this.applyButtonClasses = options.applyButtonClasses;

        if (typeof options.applyClass === 'string') //backwards compat
            this.applyButtonClasses = options.applyClass;

        if (typeof options.cancelButtonClasses === 'string')
            this.cancelButtonClasses = options.cancelButtonClasses;

        if (typeof options.cancelClass === 'string') //backwards compat
            this.cancelButtonClasses = options.cancelClass;

        if (typeof options.maxSpan === 'object')
            this.maxSpan = options.maxSpan;

        if (typeof options.dateLimit === 'object') //backwards compat
            this.maxSpan = options.dateLimit;

        if (typeof options.opens === 'string')
            this.opens = options.opens;

        if (typeof options.drops === 'string')
            this.drops = options.drops;

        if (typeof options.showWeekNumbers === 'boolean')
            this.showWeekNumbers = options.showWeekNumbers;

        if (typeof options.showISOWeekNumbers === 'boolean')
            this.showISOWeekNumbers = options.showISOWeekNumbers;

        if (typeof options.buttonClasses === 'string')
            this.buttonClasses = options.buttonClasses;

        if (typeof options.buttonClasses === 'object')
            this.buttonClasses = options.buttonClasses.join(' ');

        if (typeof options.showDropdowns === 'boolean')
            this.showDropdowns = options.showDropdowns;

        if (typeof options.minYear === 'number')
            this.minYear = options.minYear;

        if (typeof options.maxYear === 'number')
            this.maxYear = options.maxYear;

        if (typeof options.showCustomRangeLabel === 'boolean')
            this.showCustomRangeLabel = options.showCustomRangeLabel;

        if (typeof options.singleDatePicker === 'boolean') {
            this.singleDatePicker = options.singleDatePicker;
            if (this.singleDatePicker)
                this.endDate = this.startDate.clone();
        }

        if (typeof options.timePicker === 'boolean')
            this.timePicker = options.timePicker;

        if (typeof options.timePickerSeconds === 'boolean')
            this.timePickerSeconds = options.timePickerSeconds;

        if (typeof options.timePickerIncrement === 'number')
            this.timePickerIncrement = options.timePickerIncrement;

        if (typeof options.timePicker24Hour === 'boolean')
            this.timePicker24Hour = options.timePicker24Hour;

        if (typeof options.autoApply === 'boolean')
            this.autoApply = options.autoApply;

        if (typeof options.autoUpdateInput === 'boolean')
            this.autoUpdateInput = options.autoUpdateInput;

        if (typeof options.linkedCalendars === 'boolean')
            this.linkedCalendars = options.linkedCalendars;

        if (typeof options.isInvalidDate === 'function')
            this.isInvalidDate = options.isInvalidDate;

        if (typeof options.isCustomDate === 'function')
            this.isCustomDate = options.isCustomDate;

        if (typeof options.alwaysShowCalendars === 'boolean')
            this.alwaysShowCalendars = options.alwaysShowCalendars;

        // update day names order to firstDay
        if (this.locale.firstDay != 0) {
            var iterator = this.locale.firstDay;
            while (iterator > 0) {
                this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                iterator--;
            }
        }

        var start, end, range;

        //if no start/end dates set, check if an input element contains initial values
        if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
            if ($(this.element).is(':text')) {
                var val = $(this.element).val(),
                    split = val.split(this.locale.separator);

                start = end = null;

                if (split.length == 2) {
                    start = moment(split[0], this.locale.format);
                    end = moment(split[1], this.locale.format);
                } else if (this.singleDatePicker && val !== "") {
                    start = moment(val, this.locale.format);
                    end = moment(val, this.locale.format);
                }
                if (start !== null && end !== null) {
                    this.setStartDate(start);
                    this.setEndDate(end);
                }
            }
        }

        if (typeof options.ranges === 'object') {
            for (range in options.ranges) {

                if (typeof options.ranges[range][0] === 'string')
                    start = moment(options.ranges[range][0], this.locale.format);
                else
                    start = moment(options.ranges[range][0]);

                if (typeof options.ranges[range][1] === 'string')
                    end = moment(options.ranges[range][1], this.locale.format);
                else
                    end = moment(options.ranges[range][1]);

                // If the start or end date exceed those allowed by the minDate or maxSpan
                // options, shorten the range to the allowable period.
                if (this.minDate && start.isBefore(this.minDate))
                    start = this.minDate.clone();

                var maxDate = this.maxDate;
                if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate))
                    maxDate = start.clone().add(this.maxSpan);
                if (maxDate && end.isAfter(maxDate))
                    end = maxDate.clone();

                // If the end of the range is before the minimum or the start of the range is
                // after the maximum, don't display this range option at all.
                if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day'))
                  || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                    continue;

                //Support unicode chars in the range names.
                var elem = document.createElement('textarea');
                elem.innerHTML = range;
                var rangeHtml = elem.value;

                this.ranges[rangeHtml] = [start, end];
            }

            var list = '<ul>';
            for (range in this.ranges) {
                list += '<li data-range-key="' + range + '">' + range + '</li>';
            }
            if (this.showCustomRangeLabel) {
                list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
            }
            list += '</ul>';
            this.container.find('.ranges').prepend(list);
        }

        if (typeof cb === 'function') {
            this.callback = cb;
        }

        if (!this.timePicker) {
            this.startDate = this.startDate.startOf('day');
            this.endDate = this.endDate.endOf('day');
            this.container.find('.calendar-time').hide();
        }

        //can't be used together for now
        if (this.timePicker && this.autoApply)
            this.autoApply = false;

        if (this.autoApply) {
            this.container.addClass('auto-apply');
        }

        if (typeof options.ranges === 'object')
            this.container.addClass('show-ranges');

        if (this.singleDatePicker) {
            this.container.addClass('single');
            this.container.find('.drp-calendar.left').addClass('single');
            this.container.find('.drp-calendar.left').show();
            this.container.find('.drp-calendar.right').hide();
            if (!this.timePicker) {
                this.container.addClass('auto-apply');
            }
        }

        if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
            this.container.addClass('show-calendar');
        }

        this.container.addClass('opens' + this.opens);

        //apply CSS classes and labels to buttons
        this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
        if (this.applyButtonClasses.length)
            this.container.find('.applyBtn').addClass(this.applyButtonClasses);
        if (this.cancelButtonClasses.length)
            this.container.find('.cancelBtn').addClass(this.cancelButtonClasses);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //
        // event listeners
        //

        this.container.find('.drp-calendar')
            .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
            .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
            .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
            .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
            .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))

        this.container.find('.ranges')
            .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))

        this.container.find('.drp-buttons')
            .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))

        if (this.element.is('input') || this.element.is('button')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                'keydown.daterangepicker': $.proxy(this.keydown, this) //IE 11 compatibility
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
            this.element.on('keydown.daterangepicker', $.proxy(this.toggle, this));
        }

        //
        // if attached to a text input, set the initial value
        //

        this.updateElement();

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setStartDate: function(startDate) {
            if (typeof startDate === 'string')
                this.startDate = moment(startDate, this.locale.format);

            if (typeof startDate === 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.minDate && this.startDate.isBefore(this.minDate)) {
                this.startDate = this.minDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }

            if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                this.startDate = this.maxDate.clone();
                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
            }

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string')
                this.endDate = moment(endDate, this.locale.format);

            if (typeof endDate === 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.endOf('day');

            if (this.timePicker && this.timePickerIncrement)
                this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

            if (this.endDate.isBefore(this.startDate))
                this.endDate = this.startDate.clone();

            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();

            if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate))
                this.endDate = this.startDate.clone().add(this.maxSpan);

            this.previousRightTime = this.endDate.clone();

            this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));

            if (!this.isShowing)
                this.updateElement();

            this.updateMonthsInView();
        },

        isInvalidDate: function() {
            return false;
        },

        isCustomDate: function() {
            return false;
        },

        updateView: function() {
            if (this.timePicker) {
                this.renderTimePicker('left');
                this.renderTimePicker('right');
                if (!this.endDate) {
                    this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                } else {
                    this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                }
            }
            if (this.endDate)
                this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.updateMonthsInView();
            this.updateCalendars();
            this.updateFormInputs();
        },

        updateMonthsInView: function() {
            if (this.endDate) {

                //if both dates are visible already, do nothing
                if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                    (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    &&
                    (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                    return;
                }

                this.leftCalendar.month = this.startDate.clone().date(2);
                if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                    this.rightCalendar.month = this.endDate.clone().date(2);
                } else {
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }

            } else {
                if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                    this.leftCalendar.month = this.startDate.clone().date(2);
                    this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                }
            }
            if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
              this.rightCalendar.month = this.maxDate.clone().date(2);
              this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
            }
        },

        updateCalendars: function() {

            if (this.timePicker) {
                var hour, minute, second;
                if (this.endDate) {
                    hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    if (isNaN(minute)) {
                        minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
                    }
                    second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                } else {
                    hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    if (isNaN(minute)) {
                        minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
                    }
                    second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                }
                this.leftCalendar.month.hour(hour).minute(minute).second(second);
                this.rightCalendar.month.hour(hour).minute(minute).second(second);
            }

            this.renderCalendar('left');
            this.renderCalendar('right');

            //highlight any predefined range matching the current start and end dates
            this.container.find('.ranges li').removeClass('active');
            if (this.endDate == null) return;

            this.calculateChosenLabel();
        },

        renderCalendar: function(side) {

            //
            // Build the matrix of dates that will populate the calendar
            //

            var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
            var month = calendar.month.month();
            var year = calendar.month.year();
            var hour = calendar.month.hour();
            var minute = calendar.month.minute();
            var second = calendar.month.second();
            var daysInMonth = moment([year, month]).daysInMonth();
            var firstDay = moment([year, month, 1]);
            var lastDay = moment([year, month, daysInMonth]);
            var lastMonth = moment(firstDay).subtract(1, 'month').month();
            var lastYear = moment(firstDay).subtract(1, 'month').year();
            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            calendar.firstDay = firstDay;
            calendar.lastDay = lastDay;

            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

            var col, row;
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                curDate.hour(12);

                if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                    calendar[row][col] = this.minDate.clone();
                }

                if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                    calendar[row][col] = this.maxDate.clone();
                }

            }

            //make the calendar object available to hoverDate/clickDate
            if (side == 'left') {
                this.leftCalendar.calendar = calendar;
            } else {
                this.rightCalendar.calendar = calendar;
            }

            //
            // Display the calendar
            //

            var minDate = side == 'left' ? this.minDate : this.startDate;
            var maxDate = this.maxDate;
            var selected = side == 'left' ? this.startDate : this.endDate;
            var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

            var html = '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th></th>';

            if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                html += '<th class="prev available"><span></span></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                var currentMonth = calendar[1][1].month();
                var currentYear = calendar[1][1].year();
                var maxYear = (maxDate && maxDate.year()) || (this.maxYear);
                var minYear = (minDate && minDate.year()) || (this.minYear);
                var inMinYear = currentYear == minYear;
                var inMaxYear = currentYear == maxYear;

                var monthHtml = '<select class="monthselect">';
                for (var m = 0; m < 12; m++) {
                    if ((!inMinYear || (minDate && m >= minDate.month())) && (!inMaxYear || (maxDate && m <= maxDate.month()))) {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            ">" + this.locale.monthNames[m] + "</option>";
                    } else {
                        monthHtml += "<option value='" + m + "'" +
                            (m === currentMonth ? " selected='selected'" : "") +
                            " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                    }
                }
                monthHtml += "</select>";

                var yearHtml = '<select class="yearselect">';
                for (var y = minYear; y <= maxYear; y++) {
                    yearHtml += '<option value="' + y + '"' +
                        (y === currentYear ? ' selected="selected"' : '') +
                        '>' + y + '</option>';
                }
                yearHtml += '</select>';

                dateHtml = monthHtml + yearHtml;
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                html += '<th class="next available"><span></span></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers || this.showISOWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            //adjust maxDate to reflect the maxSpan setting in order to
            //grey out end dates beyond the maxSpan
            if (this.endDate == null && this.maxSpan) {
                var maxLimit = this.startDate.clone().add(this.maxSpan).endOf('day');
                if (!maxDate || maxLimit.isBefore(maxDate)) {
                    maxDate = maxLimit;
                }
            }

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';
                else if (this.showISOWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

                for (var col = 0; col < 7; col++) {

                    var classes = [];

                    //highlight today's date
                    if (calendar[row][col].isSame(new Date(), "day"))
                        classes.push('today');

                    //highlight weekends
                    if (calendar[row][col].isoWeekday() > 5)
                        classes.push('weekend');

                    //grey out the dates in other months displayed at beginning and end of this calendar
                    if (calendar[row][col].month() != calendar[1][1].month())
                        classes.push('off', 'ends');

                    //don't allow selection of dates before the minimum date
                    if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of dates after the maximum date
                    if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                        classes.push('off', 'disabled');

                    //don't allow selection of date if a custom function decides it's invalid
                    if (this.isInvalidDate(calendar[row][col]))
                        classes.push('off', 'disabled');

                    //highlight the currently selected start date
                    if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                        classes.push('active', 'start-date');

                    //highlight the currently selected end date
                    if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                        classes.push('active', 'end-date');

                    //highlight dates in-between the selected dates
                    if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                        classes.push('in-range');

                    //apply custom classes for this date
                    var isCustom = this.isCustomDate(calendar[row][col]);
                    if (isCustom !== false) {
                        if (typeof isCustom === 'string')
                            classes.push(isCustom);
                        else
                            Array.prototype.push.apply(classes, isCustom);
                    }

                    var cname = '', disabled = false;
                    for (var i = 0; i < classes.length; i++) {
                        cname += classes[i] + ' ';
                        if (classes[i] == 'disabled')
                            disabled = true;
                    }
                    if (!disabled)
                        cname += 'available';

                    html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';

            this.container.find('.drp-calendar.' + side + ' .calendar-table').html(html);

        },

        renderTimePicker: function(side) {

            // Don't bother updating the time picker if it's currently disabled
            // because an end date hasn't been clicked yet
            if (side == 'right' && !this.endDate) return;

            var html, selected, minDate, maxDate = this.maxDate;

            if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)))
                maxDate = this.startDate.clone().add(this.maxSpan);

            if (side == 'left') {
                selected = this.startDate.clone();
                minDate = this.minDate;
            } else if (side == 'right') {
                selected = this.endDate.clone();
                minDate = this.startDate;

                //Preserve the time already selected
                var timeSelector = this.container.find('.drp-calendar.right .calendar-time');
                if (timeSelector.html() != '') {

                    selected.hour(!isNaN(selected.hour()) ? selected.hour() : timeSelector.find('.hourselect option:selected').val());
                    selected.minute(!isNaN(selected.minute()) ? selected.minute() : timeSelector.find('.minuteselect option:selected').val());
                    selected.second(!isNaN(selected.second()) ? selected.second() : timeSelector.find('.secondselect option:selected').val());

                    if (!this.timePicker24Hour) {
                        var ampm = timeSelector.find('.ampmselect option:selected').val();
                        if (ampm === 'PM' && selected.hour() < 12)
                            selected.hour(selected.hour() + 12);
                        if (ampm === 'AM' && selected.hour() === 12)
                            selected.hour(0);
                    }

                }

                if (selected.isBefore(this.startDate))
                    selected = this.startDate.clone();

                if (maxDate && selected.isAfter(maxDate))
                    selected = maxDate.clone();

            }

            //
            // hours
            //

            html = '<select class="hourselect">';

            var start = this.timePicker24Hour ? 0 : 1;
            var end = this.timePicker24Hour ? 23 : 12;

            for (var i = start; i <= end; i++) {
                var i_in_24 = i;
                if (!this.timePicker24Hour)
                    i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                var time = selected.clone().hour(i_in_24);
                var disabled = false;
                if (minDate && time.minute(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.minute(0).isAfter(maxDate))
                    disabled = true;

                if (i_in_24 == selected.hour() && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                } else {
                    html += '<option value="' + i + '">' + i + '</option>';
                }
            }

            html += '</select> ';

            //
            // minutes
            //

            html += ': <select class="minuteselect">';

            for (var i = 0; i < 60; i += this.timePickerIncrement) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().minute(i);

                var disabled = false;
                if (minDate && time.second(59).isBefore(minDate))
                    disabled = true;
                if (maxDate && time.second(0).isAfter(maxDate))
                    disabled = true;

                if (selected.minute() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';

            //
            // seconds
            //

            if (this.timePickerSeconds) {
                html += ': <select class="secondselect">';

                for (var i = 0; i < 60; i++) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().second(i);

                    var disabled = false;
                    if (minDate && time.isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.isAfter(maxDate))
                        disabled = true;

                    if (selected.second() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';
            }

            //
            // AM/PM
            //

            if (!this.timePicker24Hour) {
                html += '<select class="ampmselect">';

                var am_html = '';
                var pm_html = '';

                if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                    am_html = ' disabled="disabled" class="disabled"';

                if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                    pm_html = ' disabled="disabled" class="disabled"';

                if (selected.hour() >= 12) {
                    html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                } else {
                    html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                }

                html += '</select>';
            }

            this.container.find('.drp-calendar.' + side + ' .calendar-time').html(html);

        },

        updateFormInputs: function() {

            if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }

        },

        move: function() {
            var parentOffset = { top: 0, left: 0 },
                containerTop;
            var parentRightEdge = $(window).width();
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
                parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
            }

            if (this.drops == 'up')
                containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
            else
                containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;

            // Force the container to it's actual width
            this.container.css({
              top: 0,
              left: 0,
              right: 'auto'
            });
            var containerWidth = this.container.outerWidth();

            this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('drop-up');

            if (this.opens == 'left') {
                var containerRight = parentRightEdge - this.element.offset().left - this.element.outerWidth();
                if (containerWidth + containerRight > $(window).width()) {
                    this.container.css({
                        top: containerTop,
                        right: 'auto',
                        left: 9
                    });
                } else {
                    this.container.css({
                        top: containerTop,
                        right: containerRight,
                        left: 'auto'
                    });
                }
            } else if (this.opens == 'center') {
                var containerLeft = this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                                        - containerWidth / 2;
                if (containerLeft < 0) {
                    this.container.css({
                        top: containerTop,
                        right: 'auto',
                        left: 9
                    });
                } else if (containerLeft + containerWidth > $(window).width()) {
                    this.container.css({
                        top: containerTop,
                        left: 'auto',
                        right: 0
                    });
                } else {
                    this.container.css({
                        top: containerTop,
                        left: containerLeft,
                        right: 'auto'
                    });
                }
            } else {
                var containerLeft = this.element.offset().left - parentOffset.left;
                if (containerLeft + containerWidth > $(window).width()) {
                    this.container.css({
                        top: containerTop,
                        left: 'auto',
                        right: 0
                    });
                } else {
                    this.container.css({
                        top: containerTop,
                        left: containerLeft,
                        right: 'auto'
                    });
                }
            }
        },

        show: function(e) {
            if (this.isShowing) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        },

        hide: function(e) {
            if (!this.isShowing) return;

            //incomplete date selection, revert to last values
            if (!this.endDate) {
                this.startDate = this.oldStartDate.clone();
                this.endDate = this.oldEndDate.clone();
            }

            //if a new date range was selected, invoke the user callback function
            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);

            //if picker is attached to a text input, update it
            this.updateElement();

            $(document).off('.daterangepicker');
            $(window).off('.daterangepicker');
            this.container.hide();
            this.element.trigger('hide.daterangepicker', this);
            this.isShowing = false;
        },

        toggle: function(e) {
            if (this.isShowing) {
                this.hide();
            } else {
                this.show();
            }
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (
                // ie modal dialog fix
                e.type == "focusin" ||
                target.closest(this.element).length ||
                target.closest(this.container).length ||
                target.closest('.calendar-table').length
                ) return;
            this.hide();
            this.element.trigger('outsideClick.daterangepicker', this);
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
            this.element.trigger('showCalendar.daterangepicker', this);
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
            this.element.trigger('hideCalendar.daterangepicker', this);
        },

        clickRange: function(e) {
            var label = e.target.getAttribute('data-range-key');
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];
                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

                if (!this.alwaysShowCalendars)
                    this.hideCalendars();
                this.clickApply();
            }
        },

        clickPrev: function(e) {
            var cal = $(e.target).parents('.drp-calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract(1, 'month');
                if (this.linkedCalendars)
                    this.rightCalendar.month.subtract(1, 'month');
            } else {
                this.rightCalendar.month.subtract(1, 'month');
            }
            this.updateCalendars();
        },

        clickNext: function(e) {
            var cal = $(e.target).parents('.drp-calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add(1, 'month');
            } else {
                this.rightCalendar.month.add(1, 'month');
                if (this.linkedCalendars)
                    this.leftCalendar.month.add(1, 'month');
            }
            this.updateCalendars();
        },

        hoverDate: function(e) {

            //ignore dates that can't be selected
            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.drp-calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //highlight the dates between the start date and the date being hovered as a potential end date
            var leftCalendar = this.leftCalendar;
            var rightCalendar = this.rightCalendar;
            var startDate = this.startDate;
            if (!this.endDate) {
                this.container.find('.drp-calendar tbody td').each(function(index, el) {

                    //skip week numbers, only look at dates
                    if ($(el).hasClass('week')) return;

                    var title = $(el).attr('data-title');
                    var row = title.substr(1, 1);
                    var col = title.substr(3, 1);
                    var cal = $(el).parents('.drp-calendar');
                    var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                    if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                        $(el).addClass('in-range');
                    } else {
                        $(el).removeClass('in-range');
                    }

                });
            }

        },

        clickDate: function(e) {

            if (!$(e.target).hasClass('available')) return;

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.drp-calendar');
            var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

            //
            // this function needs to do a few things:
            // * alternate between selecting a start and end date for the range,
            // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
            // * if autoapply is enabled, and an end date was chosen, apply the selection
            // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
            // * if one of the inputs above the calendars was focused, cancel that manual input
            //

            if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.left .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                    if (isNaN(minute)) {
                        minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
                    }
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.endDate = null;
                this.setStartDate(date.clone());
            } else if (!this.endDate && date.isBefore(this.startDate)) {
                //special case: clicking the same date for start/end,
                //but the time of the end date is before the start date
                this.setEndDate(this.startDate.clone());
            } else { // picking end
                if (this.timePicker) {
                    var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                    if (!this.timePicker24Hour) {
                        var ampm = this.container.find('.right .ampmselect').val();
                        if (ampm === 'PM' && hour < 12)
                            hour += 12;
                        if (ampm === 'AM' && hour === 12)
                            hour = 0;
                    }
                    var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                    if (isNaN(minute)) {
                        minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
                    }
                    var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                    date = date.clone().hour(hour).minute(minute).second(second);
                }
                this.setEndDate(date.clone());
                if (this.autoApply) {
                  this.calculateChosenLabel();
                  this.clickApply();
                }
            }

            if (this.singleDatePicker) {
                this.setEndDate(this.startDate);
                if (!this.timePicker)
                    this.clickApply();
            }

            this.updateView();

            //This is to cancel the blur event handler if the mouse was in one of the inputs
            e.stopPropagation();

        },

        calculateChosenLabel: function () {
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
              if (this.timePicker) {
                    var format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                    //ignore times when comparing dates if time picker seconds is not enabled
                    if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                        break;
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                        break;
                    }
                }
                i++;
            }
            if (customRange) {
                if (this.showCustomRangeLabel) {
                    this.chosenLabel = this.container.find('.ranges li:last').addClass('active').attr('data-range-key');
                } else {
                    this.chosenLabel = null;
                }
                this.showCalendars();
            }
        },

        clickApply: function(e) {
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        monthOrYearChanged: function(e) {
            var isLeft = $(e.target).closest('.drp-calendar').hasClass('left'),
                leftOrRight = isLeft ? 'left' : 'right',
                cal = this.container.find('.drp-calendar.'+leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (!isLeft) {
                if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                    month = this.startDate.month();
                    year = this.startDate.year();
                }
            }

            if (this.minDate) {
                if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                    month = this.minDate.month();
                    year = this.minDate.year();
                }
            }

            if (this.maxDate) {
                if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                    month = this.maxDate.month();
                    year = this.maxDate.year();
                }
            }

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
            } else {
                this.rightCalendar.month.month(month).year(year);
                if (this.linkedCalendars)
                    this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
            }
            this.updateCalendars();
        },

        timeChanged: function(e) {

            var cal = $(e.target).closest('.drp-calendar'),
                isLeft = cal.hasClass('left');

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);
            if (isNaN(minute)) {
                minute = parseInt(cal.find('.minuteselect option:last').val(), 10);
            }
            var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

            if (!this.timePicker24Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12)
                    hour += 12;
                if (ampm === 'AM' && hour === 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                start.second(second);
                this.setStartDate(start);
                if (this.singleDatePicker) {
                    this.endDate = this.startDate.clone();
                } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                    this.setEndDate(start.clone());
                }
            } else if (this.endDate) {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                end.second(second);
                this.setEndDate(end);
            }

            //update the calendars so all clickable dates reflect the new time component
            this.updateCalendars();

            //update the form inputs above the calendars with the new time
            this.updateFormInputs();

            //re-render the time pickers because changing one selection can affect what's enabled in another
            this.renderTimePicker('left');
            this.renderTimePicker('right');

        },

        elementChanged: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.locale.separator),
                start = null,
                end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.locale.format);
                end = moment(dateString[1], this.locale.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.locale.format);
                end = start;
            }

            if (!start.isValid() || !end.isValid()) return;

            this.setStartDate(start);
            this.setEndDate(end);
            this.updateView();
        },

        keydown: function(e) {
            //hide on tab or enter
            if ((e.keyCode === 9) || (e.keyCode === 13)) {
                this.hide();
            }

            //hide on esc and prevent propagation
            if (e.keyCode === 27) {
                e.preventDefault();
                e.stopPropagation();

                this.hide();
            }
        },

        updateElement: function() {
            if (this.element.is('input') && this.autoUpdateInput) {
                var newValue = this.startDate.format(this.locale.format);
                if (!this.singleDatePicker) {
                    newValue += this.locale.separator + this.endDate.format(this.locale.format);
                }
                if (newValue !== this.element.val()) {
                    this.element.val(newValue).trigger('change');
                }
            }
        },

        remove: function() {
            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData();
        }

    };

    $.fn.daterangepicker = function(options, callback) {
        var implementOptions = $.extend(true, {}, $.fn.daterangepicker.defaultOptions, options);
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, implementOptions, callback));
        });
        return this;
    };

    return DateRangePicker;

}));

/*! bootstrap-timepicker v0.5.2 
* http://jdewit.github.com/bootstrap-timepicker 
* Copyright (c) 2016 Joris de Wit and bootstrap-timepicker contributors 
* MIT License 
*/!function(a,b,c){"use strict";var d=function(b,c){this.widget="",this.$element=a(b),this.defaultTime=c.defaultTime,this.disableFocus=c.disableFocus,this.disableMousewheel=c.disableMousewheel,this.isOpen=c.isOpen,this.minuteStep=c.minuteStep,this.modalBackdrop=c.modalBackdrop,this.orientation=c.orientation,this.secondStep=c.secondStep,this.snapToStep=c.snapToStep,this.showInputs=c.showInputs,this.showMeridian=c.showMeridian,this.showSeconds=c.showSeconds,this.template=c.template,this.appendWidgetTo=c.appendWidgetTo,this.showWidgetOnAddonClick=c.showWidgetOnAddonClick,this.icons=c.icons,this.maxHours=c.maxHours,this.explicitMode=c.explicitMode,this.handleDocumentClick=function(a){var b=a.data.scope;b.$element.parent().find(a.target).length||b.$widget.is(a.target)||b.$widget.find(a.target).length||b.hideWidget()},this._init()};d.prototype={constructor:d,_init:function(){var b=this;this.showWidgetOnAddonClick&&this.$element.parent().hasClass("input-group")&&this.$element.parent().hasClass("bootstrap-timepicker")?(this.$element.parent(".input-group.bootstrap-timepicker").find(".input-group-addon").on({"click.timepicker":a.proxy(this.showWidget,this)}),this.$element.on({"focus.timepicker":a.proxy(this.highlightUnit,this),"click.timepicker":a.proxy(this.highlightUnit,this),"keydown.timepicker":a.proxy(this.elementKeydown,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)})):this.template?this.$element.on({"focus.timepicker":a.proxy(this.showWidget,this),"click.timepicker":a.proxy(this.showWidget,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)}):this.$element.on({"focus.timepicker":a.proxy(this.highlightUnit,this),"click.timepicker":a.proxy(this.highlightUnit,this),"keydown.timepicker":a.proxy(this.elementKeydown,this),"blur.timepicker":a.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":a.proxy(this.mousewheel,this)}),this.template!==!1?this.$widget=a(this.getTemplate()).on("click",a.proxy(this.widgetClick,this)):this.$widget=!1,this.showInputs&&this.$widget!==!1&&this.$widget.find("input").each(function(){a(this).on({"click.timepicker":function(){a(this).select()},"keydown.timepicker":a.proxy(b.widgetKeydown,b),"keyup.timepicker":a.proxy(b.widgetKeyup,b)})}),this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=null,this.updateFromElementVal()},clear:function(){this.hour="",this.minute="",this.second="",this.meridian="",this.$element.val("")},decrementHour:function(){if(this.showMeridian)if(1===this.hour)this.hour=12;else{if(12===this.hour)return this.hour--,this.toggleMeridian();if(0===this.hour)return this.hour=11,this.toggleMeridian();this.hour--}else this.hour<=0?this.hour=this.maxHours-1:this.hour--},decrementMinute:function(a){var b;b=a?this.minute-a:this.minute-this.minuteStep,0>b?(this.decrementHour(),this.minute=b+60):this.minute=b},decrementSecond:function(){var a=this.second-this.secondStep;0>a?(this.decrementMinute(!0),this.second=a+60):this.second=a},elementKeydown:function(a){switch(a.which){case 9:if(a.shiftKey){if("hour"===this.highlightedUnit){this.hideWidget();break}this.highlightPrevUnit()}else{if(this.showMeridian&&"meridian"===this.highlightedUnit||this.showSeconds&&"second"===this.highlightedUnit||!this.showMeridian&&!this.showSeconds&&"minute"===this.highlightedUnit){this.hideWidget();break}this.highlightNextUnit()}a.preventDefault(),this.updateFromElementVal();break;case 27:this.updateFromElementVal();break;case 37:a.preventDefault(),this.highlightPrevUnit(),this.updateFromElementVal();break;case 38:switch(a.preventDefault(),this.highlightedUnit){case"hour":this.incrementHour(),this.highlightHour();break;case"minute":this.incrementMinute(),this.highlightMinute();break;case"second":this.incrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update();break;case 39:a.preventDefault(),this.highlightNextUnit(),this.updateFromElementVal();break;case 40:switch(a.preventDefault(),this.highlightedUnit){case"hour":this.decrementHour(),this.highlightHour();break;case"minute":this.decrementMinute(),this.highlightMinute();break;case"second":this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian()}this.update()}},getCursorPosition:function(){var a=this.$element.get(0);if("selectionStart"in a)return a.selectionStart;if(c.selection){a.focus();var b=c.selection.createRange(),d=c.selection.createRange().text.length;return b.moveStart("character",-a.value.length),b.text.length-d}},getTemplate:function(){var a,b,c,d,e,f;switch(this.showInputs?(b='<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>',c='<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>',d='<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>',e='<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>'):(b='<span class="bootstrap-timepicker-hour"></span>',c='<span class="bootstrap-timepicker-minute"></span>',d='<span class="bootstrap-timepicker-second"></span>',e='<span class="bootstrap-timepicker-meridian"></span>'),f='<table><tr><td><a href="#" data-action="incrementHour"><span class="'+this.icons.up+'"></span></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><span class="'+this.icons.up+'"></span></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><span class="'+this.icons.up+'"></span></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><span class="'+this.icons.up+'"></span></a></td>':"")+"</tr><tr><td>"+b+'</td> <td class="separator">:</td><td>'+c+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+d+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+e+"</td>":"")+'</tr><tr><td><a href="#" data-action="decrementHour"><span class="'+this.icons.down+'"></span></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><span class="'+this.icons.down+'"></span></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><span class="'+this.icons.down+'"></span></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><span class="'+this.icons.down+'"></span></a></td>':"")+"</tr></table>",this.template){case"modal":a='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">&times;</a><h3>Pick a Time</h3></div><div class="modal-content">'+f+'</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';break;case"dropdown":a='<div class="bootstrap-timepicker-widget dropdown-menu">'+f+"</div>"}return a},getTime:function(){return""===this.hour?"":this.hour+":"+(1===this.minute.toString().length?"0"+this.minute:this.minute)+(this.showSeconds?":"+(1===this.second.toString().length?"0"+this.second:this.second):"")+(this.showMeridian?" "+this.meridian:"")},hideWidget:function(){this.isOpen!==!1&&(this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),"modal"===this.template&&this.$widget.modal?this.$widget.modal("hide"):this.$widget.removeClass("open"),a(c).off("mousedown.timepicker, touchend.timepicker",this.handleDocumentClick),this.isOpen=!1,this.$widget.detach())},highlightUnit:function(){this.position=this.getCursorPosition(),this.position>=0&&this.position<=2?this.highlightHour():this.position>=3&&this.position<=5?this.highlightMinute():this.position>=6&&this.position<=8?this.showSeconds?this.highlightSecond():this.highlightMeridian():this.position>=9&&this.position<=11&&this.highlightMeridian()},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":this.showSeconds?this.highlightSecond():this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"second":this.showMeridian?this.highlightMeridian():this.highlightHour();break;case"meridian":this.highlightHour()}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":this.showMeridian?this.highlightMeridian():this.showSeconds?this.highlightSecond():this.highlightMinute();break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":this.showSeconds?this.highlightSecond():this.highlightMinute()}},highlightHour:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="hour",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(0,1):a.setSelectionRange(0,2)},0)},highlightMinute:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="minute",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(2,4):a.setSelectionRange(3,5)},0)},highlightSecond:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="second",a.setSelectionRange&&setTimeout(function(){b.hour<10?a.setSelectionRange(5,7):a.setSelectionRange(6,8)},0)},highlightMeridian:function(){var a=this.$element.get(0),b=this;this.highlightedUnit="meridian",a.setSelectionRange&&(this.showSeconds?setTimeout(function(){b.hour<10?a.setSelectionRange(8,10):a.setSelectionRange(9,11)},0):setTimeout(function(){b.hour<10?a.setSelectionRange(5,7):a.setSelectionRange(6,8)},0))},incrementHour:function(){if(this.showMeridian){if(11===this.hour)return this.hour++,this.toggleMeridian();12===this.hour&&(this.hour=0)}return this.hour===this.maxHours-1?void(this.hour=0):void this.hour++},incrementMinute:function(a){var b;b=a?this.minute+a:this.minute+this.minuteStep-this.minute%this.minuteStep,b>59?(this.incrementHour(),this.minute=b-60):this.minute=b},incrementSecond:function(){var a=this.second+this.secondStep-this.second%this.secondStep;a>59?(this.incrementMinute(!0),this.second=a-60):this.second=a},mousewheel:function(b){if(!this.disableMousewheel){b.preventDefault(),b.stopPropagation();var c=b.originalEvent.wheelDelta||-b.originalEvent.detail,d=null;switch("mousewheel"===b.type?d=-1*b.originalEvent.wheelDelta:"DOMMouseScroll"===b.type&&(d=40*b.originalEvent.detail),d&&(b.preventDefault(),a(this).scrollTop(d+a(this).scrollTop())),this.highlightedUnit){case"minute":c>0?this.incrementMinute():this.decrementMinute(),this.highlightMinute();break;case"second":c>0?this.incrementSecond():this.decrementSecond(),this.highlightSecond();break;case"meridian":this.toggleMeridian(),this.highlightMeridian();break;default:c>0?this.incrementHour():this.decrementHour(),this.highlightHour()}return!1}},changeToNearestStep:function(a,b){return a%b===0?a:Math.round(a%b/b)?(a+(b-a%b))%60:a-a%b},place:function(){if(!this.isInline){var c=this.$widget.outerWidth(),d=this.$widget.outerHeight(),e=10,f=a(b).width(),g=a(b).height(),h=a(b).scrollTop(),i=parseInt(this.$element.parents().filter(function(){return"auto"!==a(this).css("z-index")}).first().css("z-index"),10)+10,j=this.component?this.component.parent().offset():this.$element.offset(),k=this.component?this.component.outerHeight(!0):this.$element.outerHeight(!1),l=this.component?this.component.outerWidth(!0):this.$element.outerWidth(!1),m=j.left,n=j.top;this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left"),"auto"!==this.orientation.x?(this.$widget.addClass("timepicker-orient-"+this.orientation.x),"right"===this.orientation.x&&(m-=c-l)):(this.$widget.addClass("timepicker-orient-left"),j.left<0?m-=j.left-e:j.left+c>f&&(m=f-c-e));var o,p,q=this.orientation.y;"auto"===q&&(o=-h+j.top-d,p=h+g-(j.top+k+d),q=Math.max(o,p)===p?"top":"bottom"),this.$widget.addClass("timepicker-orient-"+q),"top"===q?n+=k:n-=d+parseInt(this.$widget.css("padding-top"),10),this.$widget.css({top:n,left:m,zIndex:i})}},remove:function(){a("document").off(".timepicker"),this.$widget&&this.$widget.remove(),delete this.$element.data().timepicker},setDefaultTime:function(a){if(this.$element.val())this.updateFromElementVal();else if("current"===a){var b=new Date,c=b.getHours(),d=b.getMinutes(),e=b.getSeconds(),f="AM";0!==e&&(e=Math.ceil(b.getSeconds()/this.secondStep)*this.secondStep,60===e&&(d+=1,e=0)),0!==d&&(d=Math.ceil(b.getMinutes()/this.minuteStep)*this.minuteStep,60===d&&(c+=1,d=0)),this.showMeridian&&(0===c?c=12:c>=12?(c>12&&(c-=12),f="PM"):f="AM"),this.hour=c,this.minute=d,this.second=e,this.meridian=f,this.update()}else a===!1?(this.hour=0,this.minute=0,this.second=0,this.meridian="AM"):this.setTime(a)},setTime:function(a,b){if(!a)return void this.clear();var c,d,e,f,g,h;if("object"==typeof a&&a.getMonth)e=a.getHours(),f=a.getMinutes(),g=a.getSeconds(),this.showMeridian&&(h="AM",e>12&&(h="PM",e%=12),12===e&&(h="PM"));else{if(c=(/a/i.test(a)?1:0)+(/p/i.test(a)?2:0),c>2)return void this.clear();if(d=a.replace(/[^0-9\:]/g,"").split(":"),e=d[0]?d[0].toString():d.toString(),this.explicitMode&&e.length>2&&e.length%2!==0)return void this.clear();f=d[1]?d[1].toString():"",g=d[2]?d[2].toString():"",e.length>4&&(g=e.slice(-2),e=e.slice(0,-2)),e.length>2&&(f=e.slice(-2),e=e.slice(0,-2)),f.length>2&&(g=f.slice(-2),f=f.slice(0,-2)),e=parseInt(e,10),f=parseInt(f,10),g=parseInt(g,10),isNaN(e)&&(e=0),isNaN(f)&&(f=0),isNaN(g)&&(g=0),g>59&&(g=59),f>59&&(f=59),e>=this.maxHours&&(e=this.maxHours-1),this.showMeridian?(e>12&&(c=2,e-=12),c||(c=1),0===e&&(e=12),h=1===c?"AM":"PM"):12>e&&2===c?e+=12:e>=this.maxHours?e=this.maxHours-1:(0>e||12===e&&1===c)&&(e=0)}this.hour=e,this.snapToStep?(this.minute=this.changeToNearestStep(f,this.minuteStep),this.second=this.changeToNearestStep(g,this.secondStep)):(this.minute=f,this.second=g),this.meridian=h,this.update(b)},showWidget:function(){this.isOpen||this.$element.is(":disabled")||(this.$widget.appendTo(this.appendWidgetTo),a(c).on("mousedown.timepicker, touchend.timepicker",{scope:this},this.handleDocumentClick),this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}}),this.place(),this.disableFocus&&this.$element.blur(),""===this.hour&&(this.defaultTime?this.setDefaultTime(this.defaultTime):this.setTime("0:0:0")),"modal"===this.template&&this.$widget.modal?this.$widget.modal("show").on("hidden",a.proxy(this.hideWidget,this)):this.isOpen===!1&&this.$widget.addClass("open"),this.isOpen=!0)},toggleMeridian:function(){this.meridian="AM"===this.meridian?"PM":"AM"},update:function(a){this.updateElement(),a||this.updateWidget(),this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}})},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){this.setTime(this.$element.val())},updateWidget:function(){if(this.$widget!==!1){var a=this.hour,b=1===this.minute.toString().length?"0"+this.minute:this.minute,c=1===this.second.toString().length?"0"+this.second:this.second;this.showInputs?(this.$widget.find("input.bootstrap-timepicker-hour").val(a),this.$widget.find("input.bootstrap-timepicker-minute").val(b),this.showSeconds&&this.$widget.find("input.bootstrap-timepicker-second").val(c),this.showMeridian&&this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)):(this.$widget.find("span.bootstrap-timepicker-hour").text(a),this.$widget.find("span.bootstrap-timepicker-minute").text(b),this.showSeconds&&this.$widget.find("span.bootstrap-timepicker-second").text(c),this.showMeridian&&this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))}},updateFromWidgetInputs:function(){if(this.$widget!==!1){var a=this.$widget.find("input.bootstrap-timepicker-hour").val()+":"+this.$widget.find("input.bootstrap-timepicker-minute").val()+(this.showSeconds?":"+this.$widget.find("input.bootstrap-timepicker-second").val():"")+(this.showMeridian?this.$widget.find("input.bootstrap-timepicker-meridian").val():"");this.setTime(a,!0)}},widgetClick:function(b){b.stopPropagation(),b.preventDefault();var c=a(b.target),d=c.closest("a").data("action");d&&this[d](),this.update(),c.is("input")&&c.get(0).setSelectionRange(0,2)},widgetKeydown:function(b){var c=a(b.target),d=c.attr("class").replace("bootstrap-timepicker-","");switch(b.which){case 9:if(b.shiftKey){if("hour"===d)return this.hideWidget()}else if(this.showMeridian&&"meridian"===d||this.showSeconds&&"second"===d||!this.showMeridian&&!this.showSeconds&&"minute"===d)return this.hideWidget();break;case 27:this.hideWidget();break;case 38:switch(b.preventDefault(),d){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),c.get(0).setSelectionRange(0,2);break;case 40:switch(b.preventDefault(),d){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian()}this.setTime(this.getTime()),c.get(0).setSelectionRange(0,2)}},widgetKeyup:function(a){(65===a.which||77===a.which||80===a.which||46===a.which||8===a.which||a.which>=48&&a.which<=57||a.which>=96&&a.which<=105)&&this.updateFromWidgetInputs()}},a.fn.timepicker=function(b){var c=Array.apply(null,arguments);return c.shift(),this.each(function(){var e=a(this),f=e.data("timepicker"),g="object"==typeof b&&b;f||e.data("timepicker",f=new d(this,a.extend({},a.fn.timepicker.defaults,g,a(this).data()))),"string"==typeof b&&f[b].apply(f,c)})},a.fn.timepicker.defaults={defaultTime:"current",disableFocus:!1,disableMousewheel:!1,isOpen:!1,minuteStep:15,modalBackdrop:!1,orientation:{x:"auto",y:"auto"},secondStep:15,snapToStep:!1,showSeconds:!1,showInputs:!0,showMeridian:!0,template:"dropdown",appendWidgetTo:"body",showWidgetOnAddonClick:!0,icons:{up:"glyphicon glyphicon-chevron-up",down:"glyphicon glyphicon-chevron-down"},maxHours:24,explicitMode:!1},a.fn.timepicker.Constructor=d,a(c).on("focus.timepicker.data-api click.timepicker.data-api",'[data-provide="timepicker"]',function(b){var c=a(this);c.data("timepicker")||(b.preventDefault(),c.timepicker())})}(jQuery,window,document);
/*
 * bootstrap-tagsinput v0.7.1 by Tim Schlechter
 * 
 */

!function(a){"use strict";function b(b,c){this.isInit=!0,this.itemsArray=[],this.$element=a(b),this.$element.hide(),this.isSelect="SELECT"===b.tagName,this.multiple=this.isSelect&&b.hasAttribute("multiple"),this.objectItems=c&&c.itemValue,this.placeholderText=b.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=a('<div class="bootstrap-tagsinput"></div>'),this.$input=a('<input type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.before(this.$container),this.build(c),this.isInit=!1}function c(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(a){return a[c]}}}function d(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(){return c}}}function e(a){return a?i.text(a).html():""}function f(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else(a.selectionStart||"0"==a.selectionStart)&&(b=a.selectionStart);return b}function g(b,c){var d=!1;return a.each(c,function(a,c){if("number"==typeof c&&b.which===c)return d=!0,!1;if(b.which===c.which){var e=!c.hasOwnProperty("altKey")||b.altKey===c.altKey,f=!c.hasOwnProperty("shiftKey")||b.shiftKey===c.shiftKey,g=!c.hasOwnProperty("ctrlKey")||b.ctrlKey===c.ctrlKey;if(e&&f&&g)return d=!0,!1}}),d}var h={tagClass:function(a){return"label label-info"},itemValue:function(a){return a?a.toString():a},itemText:function(a){return this.itemValue(a)},itemTitle:function(a){return null},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],delimiter:",",delimiterRegex:null,cancelConfirmKeysOnEmpty:!1,onTagExists:function(a,b){b.hide().fadeIn()},trimValue:!1,allowDuplicates:!1};b.prototype={constructor:b,add:function(b,c,d){var f=this;if(!(f.options.maxTags&&f.itemsArray.length>=f.options.maxTags)&&(b===!1||b)){if("string"==typeof b&&f.options.trimValue&&(b=a.trim(b)),"object"==typeof b&&!f.objectItems)throw"Can't add objects when itemValue option is not set";if(!b.toString().match(/^\s*$/)){if(f.isSelect&&!f.multiple&&f.itemsArray.length>0&&f.remove(f.itemsArray[0]),"string"==typeof b&&"INPUT"===this.$element[0].tagName){var g=f.options.delimiterRegex?f.options.delimiterRegex:f.options.delimiter,h=b.split(g);if(h.length>1){for(var i=0;i<h.length;i++)this.add(h[i],!0);return void(c||f.pushVal())}}var j=f.options.itemValue(b),k=f.options.itemText(b),l=f.options.tagClass(b),m=f.options.itemTitle(b),n=a.grep(f.itemsArray,function(a){return f.options.itemValue(a)===j})[0];if(!n||f.options.allowDuplicates){if(!(f.items().toString().length+b.length+1>f.options.maxInputLength)){var o=a.Event("beforeItemAdd",{item:b,cancel:!1,options:d});if(f.$element.trigger(o),!o.cancel){f.itemsArray.push(b);var p=a('<span class="tag '+e(l)+(null!==m?'" title="'+m:"")+'">'+e(k)+'<span data-role="remove"></span></span>');p.data("item",b),f.findInputWrapper().before(p),p.after(" ");var q=a('option[value="'+encodeURIComponent(j)+'"]',f.$element).length||a('option[value="'+e(j)+'"]',f.$element).length;if(f.isSelect&&!q){var r=a("<option selected>"+e(k)+"</option>");r.data("item",b),r.attr("value",j),f.$element.append(r)}c||f.pushVal(),(f.options.maxTags===f.itemsArray.length||f.items().toString().length===f.options.maxInputLength)&&f.$container.addClass("bootstrap-tagsinput-max"),a(".typeahead, .twitter-typeahead",f.$container).length&&f.$input.typeahead("val",""),this.isInit?f.$element.trigger(a.Event("itemAddedOnInit",{item:b,options:d})):f.$element.trigger(a.Event("itemAdded",{item:b,options:d}))}}}else if(f.options.onTagExists){var s=a(".tag",f.$container).filter(function(){return a(this).data("item")===n});f.options.onTagExists(b,s)}}}},remove:function(b,c,d){var e=this;if(e.objectItems&&(b="object"==typeof b?a.grep(e.itemsArray,function(a){return e.options.itemValue(a)==e.options.itemValue(b)}):a.grep(e.itemsArray,function(a){return e.options.itemValue(a)==b}),b=b[b.length-1]),b){var f=a.Event("beforeItemRemove",{item:b,cancel:!1,options:d});if(e.$element.trigger(f),f.cancel)return;a(".tag",e.$container).filter(function(){return a(this).data("item")===b}).remove(),a("option",e.$element).filter(function(){return a(this).data("item")===b}).remove(),-1!==a.inArray(b,e.itemsArray)&&e.itemsArray.splice(a.inArray(b,e.itemsArray),1)}c||e.pushVal(),e.options.maxTags>e.itemsArray.length&&e.$container.removeClass("bootstrap-tagsinput-max"),e.$element.trigger(a.Event("itemRemoved",{item:b,options:d}))},removeAll:function(){var b=this;for(a(".tag",b.$container).remove(),a("option",b.$element).remove();b.itemsArray.length>0;)b.itemsArray.pop();b.pushVal()},refresh:function(){var b=this;a(".tag",b.$container).each(function(){var c=a(this),d=c.data("item"),f=b.options.itemValue(d),g=b.options.itemText(d),h=b.options.tagClass(d);if(c.attr("class",null),c.addClass("tag "+e(h)),c.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=e(g),b.isSelect){var i=a("option",b.$element).filter(function(){return a(this).data("item")===d});i.attr("value",f)}})},items:function(){return this.itemsArray},pushVal:function(){var b=this,c=a.map(b.items(),function(a){return b.options.itemValue(a).toString()});b.$element.val(c,!0).trigger("change")},build:function(b){var e=this;if(e.options=a.extend({},h,b),e.objectItems&&(e.options.freeInput=!1),c(e.options,"itemValue"),c(e.options,"itemText"),d(e.options,"tagClass"),e.options.typeahead){var i=e.options.typeahead||{};d(i,"source"),e.$input.typeahead(a.extend({},i,{source:function(b,c){function d(a){for(var b=[],d=0;d<a.length;d++){var g=e.options.itemText(a[d]);f[g]=a[d],b.push(g)}c(b)}this.map={};var f=this.map,g=i.source(b);a.isFunction(g.success)?g.success(d):a.isFunction(g.then)?g.then(d):a.when(g).then(d)},updater:function(a){return e.add(this.map[a]),this.map[a]},matcher:function(a){return-1!==a.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(a){return a.sort()},highlighter:function(a){var b=new RegExp("("+this.query+")","gi");return a.replace(b,"<strong>$1</strong>")}}))}if(e.options.typeaheadjs){var j=null,k={},l=e.options.typeaheadjs;a.isArray(l)?(j=l[0],k=l[1]):k=l,e.$input.typeahead(j,k).on("typeahead:selected",a.proxy(function(a,b){k.valueKey?e.add(b[k.valueKey]):e.add(b),e.$input.typeahead("val","")},e))}e.$container.on("click",a.proxy(function(a){e.$element.attr("disabled")||e.$input.removeAttr("disabled"),e.$input.focus()},e)),e.options.addOnBlur&&e.options.freeInput&&e.$input.on("focusout",a.proxy(function(b){0===a(".typeahead, .twitter-typeahead",e.$container).length&&(e.add(e.$input.val()),e.$input.val(""))},e)),e.$container.on("keydown","input",a.proxy(function(b){var c=a(b.target),d=e.findInputWrapper();if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");switch(b.which){case 8:if(0===f(c[0])){var g=d.prev();g.length&&e.remove(g.data("item"))}break;case 46:if(0===f(c[0])){var h=d.next();h.length&&e.remove(h.data("item"))}break;case 37:var i=d.prev();0===c.val().length&&i[0]&&(i.before(d),c.focus());break;case 39:var j=d.next();0===c.val().length&&j[0]&&(j.after(d),c.focus())}var k=c.val().length;Math.ceil(k/5);c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("keypress","input",a.proxy(function(b){var c=a(b.target);if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");var d=c.val(),f=e.options.maxChars&&d.length>=e.options.maxChars;e.options.freeInput&&(g(b,e.options.confirmKeys)||f)&&(0!==d.length&&(e.add(f?d.substr(0,e.options.maxChars):d),c.val("")),e.options.cancelConfirmKeysOnEmpty===!1&&b.preventDefault());var h=c.val().length;Math.ceil(h/5);c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("click","[data-role=remove]",a.proxy(function(b){e.$element.attr("disabled")||e.remove(a(b.target).closest(".tag").data("item"))},e)),e.options.itemValue===h.itemValue&&("INPUT"===e.$element[0].tagName?e.add(e.$element.val()):a("option",e.$element).each(function(){e.add(a(this).attr("value"),!0)}))},destroy:function(){var a=this;a.$container.off("keypress","input"),a.$container.off("click","[role=remove]"),a.$container.remove(),a.$element.removeData("tagsinput"),a.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var b=this.$input[0],c=this.$container[0];b&&b.parentNode!==c;)b=b.parentNode;return a(b)}},a.fn.tagsinput=function(c,d,e){var f=[];return this.each(function(){var g=a(this).data("tagsinput");if(g)if(c||d){if(void 0!==g[c]){if(3===g[c].length&&void 0!==e)var h=g[c](d,null,e);else var h=g[c](d);void 0!==h&&f.push(h)}}else f.push(g);else g=new b(this,c),a(this).data("tagsinput",g),f.push(g),"SELECT"===this.tagName&&a("option",a(this)).attr("selected","selected"),a(this).val(a(this).val())}),"string"==typeof c?f.length>1?f:f[0]:f},a.fn.tagsinput.Constructor=b;var i=a("<div />");a(function(){a("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery);
//# sourceMappingURL=bootstrap-tagsinput.min.js.map
/*! Select2 4.0.7 | https://github.com/select2/select2/blob/master/LICENSE.md */!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){var b=function(){if(a&&a.fn&&a.fn.select2&&a.fn.select2.amd)var b=a.fn.select2.amd;var b;return function(){if(!b||!b.requirejs){b?c=b:b={};var a,c,d;!function(b){function e(a,b){return v.call(a,b)}function f(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o=b&&b.split("/"),p=t.map,q=p&&p["*"]||{};if(a){for(a=a.split("/"),g=a.length-1,t.nodeIdCompat&&x.test(a[g])&&(a[g]=a[g].replace(x,"")),"."===a[0].charAt(0)&&o&&(n=o.slice(0,o.length-1),a=n.concat(a)),k=0;k<a.length;k++)if("."===(m=a[k]))a.splice(k,1),k-=1;else if(".."===m){if(0===k||1===k&&".."===a[2]||".."===a[k-1])continue;k>0&&(a.splice(k-1,2),k-=2)}a=a.join("/")}if((o||q)&&p){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),o)for(l=o.length;l>0;l-=1)if((e=p[o.slice(0,l).join("/")])&&(e=e[d])){f=e,h=k;break}if(f)break;!i&&q&&q[d]&&(i=q[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))}return a}function g(a,c){return function(){var d=w.call(arguments,0);return"string"!=typeof d[0]&&1===d.length&&d.push(null),o.apply(b,d.concat([a,c]))}}function h(a){return function(b){return f(b,a)}}function i(a){return function(b){r[a]=b}}function j(a){if(e(s,a)){var c=s[a];delete s[a],u[a]=!0,n.apply(b,c)}if(!e(r,a)&&!e(u,a))throw new Error("No "+a);return r[a]}function k(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]}function l(a){return a?k(a):[]}function m(a){return function(){return t&&t.config&&t.config[a]||{}}}var n,o,p,q,r={},s={},t={},u={},v=Object.prototype.hasOwnProperty,w=[].slice,x=/\.js$/;p=function(a,b){var c,d=k(a),e=d[0],g=b[1];return a=d[1],e&&(e=f(e,g),c=j(e)),e?a=c&&c.normalize?c.normalize(a,h(g)):f(a,g):(a=f(a,g),d=k(a),e=d[0],a=d[1],e&&(c=j(e))),{f:e?e+"!"+a:a,n:a,pr:e,p:c}},q={require:function(a){return g(a)},exports:function(a){var b=r[a];return void 0!==b?b:r[a]={}},module:function(a){return{id:a,uri:"",exports:r[a],config:m(a)}}},n=function(a,c,d,f){var h,k,m,n,o,t,v,w=[],x=typeof d;if(f=f||a,t=l(f),"undefined"===x||"function"===x){for(c=!c.length&&d.length?["require","exports","module"]:c,o=0;o<c.length;o+=1)if(n=p(c[o],t),"require"===(k=n.f))w[o]=q.require(a);else if("exports"===k)w[o]=q.exports(a),v=!0;else if("module"===k)h=w[o]=q.module(a);else if(e(r,k)||e(s,k)||e(u,k))w[o]=j(k);else{if(!n.p)throw new Error(a+" missing "+k);n.p.load(n.n,g(f,!0),i(k),{}),w[o]=r[k]}m=d?d.apply(r[a],w):void 0,a&&(h&&h.exports!==b&&h.exports!==r[a]?r[a]=h.exports:m===b&&v||(r[a]=m))}else a&&(r[a]=d)},a=c=o=function(a,c,d,e,f){if("string"==typeof a)return q[a]?q[a](c):j(p(a,l(c)).f);if(!a.splice){if(t=a,t.deps&&o(t.deps,t.callback),!c)return;c.splice?(a=c,c=d,d=null):a=b}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?n(b,a,c,d):setTimeout(function(){n(b,a,c,d)},4),o},o.config=function(a){return o(a)},a._defined=r,d=function(a,b,c){if("string"!=typeof a)throw new Error("See almond README: incorrect module build, no module name");b.splice||(c=b,b=[]),e(r,a)||e(s,a)||(s[a]=[a,b,c])},d.amd={jQuery:!0}}(),b.requirejs=a,b.require=c,b.define=d}}(),b.define("almond",function(){}),b.define("jquery",[],function(){var b=a||$;return null==b&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),b}),b.define("select2/utils",["jquery"],function(a){function b(a){var b=a.prototype,c=[];for(var d in b){"function"==typeof b[d]&&("constructor"!==d&&c.push(d))}return c}var c={};c.Extend=function(a,b){function c(){this.constructor=a}var d={}.hasOwnProperty;for(var e in b)d.call(b,e)&&(a[e]=b[e]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},c.Decorate=function(a,c){function d(){var b=Array.prototype.unshift,d=c.prototype.constructor.length,e=a.prototype.constructor;d>0&&(b.call(arguments,a.prototype.constructor),e=c.prototype.constructor),e.apply(this,arguments)}function e(){this.constructor=d}var f=b(c),g=b(a);c.displayName=a.displayName,d.prototype=new e;for(var h=0;h<g.length;h++){var i=g[h];d.prototype[i]=a.prototype[i]}for(var j=(function(a){var b=function(){};a in d.prototype&&(b=d.prototype[a]);var e=c.prototype[a];return function(){return Array.prototype.unshift.call(arguments,b),e.apply(this,arguments)}}),k=0;k<f.length;k++){var l=f[k];d.prototype[l]=j(l)}return d};var d=function(){this.listeners={}};d.prototype.on=function(a,b){this.listeners=this.listeners||{},a in this.listeners?this.listeners[a].push(b):this.listeners[a]=[b]},d.prototype.trigger=function(a){var b=Array.prototype.slice,c=b.call(arguments,1);this.listeners=this.listeners||{},null==c&&(c=[]),0===c.length&&c.push({}),c[0]._type=a,a in this.listeners&&this.invoke(this.listeners[a],b.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},d.prototype.invoke=function(a,b){for(var c=0,d=a.length;c<d;c++)a[c].apply(this,b)},c.Observable=d,c.generateChars=function(a){for(var b="",c=0;c<a;c++){b+=Math.floor(36*Math.random()).toString(36)}return b},c.bind=function(a,b){return function(){a.apply(b,arguments)}},c._convertData=function(a){for(var b in a){var c=b.split("-"),d=a;if(1!==c.length){for(var e=0;e<c.length;e++){var f=c[e];f=f.substring(0,1).toLowerCase()+f.substring(1),f in d||(d[f]={}),e==c.length-1&&(d[f]=a[b]),d=d[f]}delete a[b]}}return a},c.hasScroll=function(b,c){var d=a(c),e=c.style.overflowX,f=c.style.overflowY;return(e!==f||"hidden"!==f&&"visible"!==f)&&("scroll"===e||"scroll"===f||(d.innerHeight()<c.scrollHeight||d.innerWidth()<c.scrollWidth))},c.escapeMarkup=function(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof a?a:String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})},c.appendMany=function(b,c){if("1.7"===a.fn.jquery.substr(0,3)){var d=a();a.map(c,function(a){d=d.add(a)}),c=d}b.append(c)},c.__cache={};var e=0;return c.GetUniqueElementId=function(a){var b=a.getAttribute("data-select2-id");return null==b&&(a.id?(b=a.id,a.setAttribute("data-select2-id",b)):(a.setAttribute("data-select2-id",++e),b=e.toString())),b},c.StoreData=function(a,b,d){var e=c.GetUniqueElementId(a);c.__cache[e]||(c.__cache[e]={}),c.__cache[e][b]=d},c.GetData=function(b,d){var e=c.GetUniqueElementId(b);return d?c.__cache[e]&&null!=c.__cache[e][d]?c.__cache[e][d]:a(b).data(d):c.__cache[e]},c.RemoveData=function(a){var b=c.GetUniqueElementId(a);null!=c.__cache[b]&&delete c.__cache[b]},c}),b.define("select2/results",["jquery","./utils"],function(a,b){function c(a,b,d){this.$element=a,this.data=d,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&b.attr("aria-multiselectable","true"),this.$results=b,b},c.prototype.clear=function(){this.$results.empty()},c.prototype.displayMessage=function(b){var c=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var d=a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),e=this.options.get("translations").get(b.message);d.append(c(e(b.args))),d[0].className+=" select2-results__message",this.$results.append(d)},c.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},c.prototype.append=function(a){this.hideLoading();var b=[];if(null==a.results||0===a.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));a.results=this.sort(a.results);for(var c=0;c<a.results.length;c++){var d=a.results[c],e=this.option(d);b.push(e)}this.$results.append(b)},c.prototype.position=function(a,b){b.find(".select2-results").append(a)},c.prototype.sort=function(a){return this.options.get("sorter")(a)},c.prototype.highlightFirstItem=function(){var a=this.$results.find(".select2-results__option[aria-selected]"),b=a.filter("[aria-selected=true]");b.length>0?b.first().trigger("mouseenter"):a.first().trigger("mouseenter"),this.ensureHighlightVisible()},c.prototype.setClasses=function(){var c=this;this.data.current(function(d){var e=a.map(d,function(a){return a.id.toString()});c.$results.find(".select2-results__option[aria-selected]").each(function(){var c=a(this),d=b.GetData(this,"data"),f=""+d.id;null!=d.element&&d.element.selected||null==d.element&&a.inArray(f,e)>-1?c.attr("aria-selected","true"):c.attr("aria-selected","false")})})},c.prototype.showLoading=function(a){this.hideLoading();var b=this.options.get("translations").get("searching"),c={disabled:!0,loading:!0,text:b(a)},d=this.option(c);d.className+=" loading-results",this.$results.prepend(d)},c.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},c.prototype.option=function(c){var d=document.createElement("li");d.className="select2-results__option";var e={role:"treeitem","aria-selected":"false"};c.disabled&&(delete e["aria-selected"],e["aria-disabled"]="true"),null==c.id&&delete e["aria-selected"],null!=c._resultId&&(d.id=c._resultId),c.title&&(d.title=c.title),c.children&&(e.role="group",e["aria-label"]=c.text,delete e["aria-selected"]);for(var f in e){var g=e[f];d.setAttribute(f,g)}if(c.children){var h=a(d),i=document.createElement("strong");i.className="select2-results__group";a(i);this.template(c,i);for(var j=[],k=0;k<c.children.length;k++){var l=c.children[k],m=this.option(l);j.push(m)}var n=a("<ul></ul>",{class:"select2-results__options select2-results__options--nested"});n.append(j),h.append(i),h.append(n)}else this.template(c,d);return b.StoreData(d,"data",c),d},c.prototype.bind=function(c,d){var e=this,f=c.id+"-results";this.$results.attr("id",f),c.on("results:all",function(a){e.clear(),e.append(a.data),c.isOpen()&&(e.setClasses(),e.highlightFirstItem())}),c.on("results:append",function(a){e.append(a.data),c.isOpen()&&e.setClasses()}),c.on("query",function(a){e.hideMessages(),e.showLoading(a)}),c.on("select",function(){c.isOpen()&&(e.setClasses(),e.options.get("scrollAfterSelect")&&e.highlightFirstItem())}),c.on("unselect",function(){c.isOpen()&&(e.setClasses(),e.options.get("scrollAfterSelect")&&e.highlightFirstItem())}),c.on("open",function(){e.$results.attr("aria-expanded","true"),e.$results.attr("aria-hidden","false"),e.setClasses(),e.ensureHighlightVisible()}),c.on("close",function(){e.$results.attr("aria-expanded","false"),e.$results.attr("aria-hidden","true"),e.$results.removeAttr("aria-activedescendant")}),c.on("results:toggle",function(){var a=e.getHighlightedResults();0!==a.length&&a.trigger("mouseup")}),c.on("results:select",function(){var a=e.getHighlightedResults();if(0!==a.length){var c=b.GetData(a[0],"data");"true"==a.attr("aria-selected")?e.trigger("close",{}):e.trigger("select",{data:c})}}),c.on("results:previous",function(){var a=e.getHighlightedResults(),b=e.$results.find("[aria-selected]"),c=b.index(a);if(!(c<=0)){var d=c-1;0===a.length&&(d=0);var f=b.eq(d);f.trigger("mouseenter");var g=e.$results.offset().top,h=f.offset().top,i=e.$results.scrollTop()+(h-g);0===d?e.$results.scrollTop(0):h-g<0&&e.$results.scrollTop(i)}}),c.on("results:next",function(){var a=e.getHighlightedResults(),b=e.$results.find("[aria-selected]"),c=b.index(a),d=c+1;if(!(d>=b.length)){var f=b.eq(d);f.trigger("mouseenter");var g=e.$results.offset().top+e.$results.outerHeight(!1),h=f.offset().top+f.outerHeight(!1),i=e.$results.scrollTop()+h-g;0===d?e.$results.scrollTop(0):h>g&&e.$results.scrollTop(i)}}),c.on("results:focus",function(a){a.element.addClass("select2-results__option--highlighted")}),c.on("results:message",function(a){e.displayMessage(a)}),a.fn.mousewheel&&this.$results.on("mousewheel",function(a){var b=e.$results.scrollTop(),c=e.$results.get(0).scrollHeight-b+a.deltaY,d=a.deltaY>0&&b-a.deltaY<=0,f=a.deltaY<0&&c<=e.$results.height();d?(e.$results.scrollTop(0),a.preventDefault(),a.stopPropagation()):f&&(e.$results.scrollTop(e.$results.get(0).scrollHeight-e.$results.height()),a.preventDefault(),a.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(c){var d=a(this),f=b.GetData(this,"data");if("true"===d.attr("aria-selected"))return void(e.options.get("multiple")?e.trigger("unselect",{originalEvent:c,data:f}):e.trigger("close",{}));e.trigger("select",{originalEvent:c,data:f})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(c){var d=b.GetData(this,"data");e.getHighlightedResults().removeClass("select2-results__option--highlighted"),e.trigger("results:focus",{data:d,element:a(this)})})},c.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},c.prototype.destroy=function(){this.$results.remove()},c.prototype.ensureHighlightVisible=function(){var a=this.getHighlightedResults();if(0!==a.length){var b=this.$results.find("[aria-selected]"),c=b.index(a),d=this.$results.offset().top,e=a.offset().top,f=this.$results.scrollTop()+(e-d),g=e-d;f-=2*a.outerHeight(!1),c<=2?this.$results.scrollTop(0):(g>this.$results.outerHeight()||g<0)&&this.$results.scrollTop(f)}},c.prototype.template=function(b,c){var d=this.options.get("templateResult"),e=this.options.get("escapeMarkup"),f=d(b,c);null==f?c.style.display="none":"string"==typeof f?c.innerHTML=e(f):a(c).append(f)},c}),b.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),b.define("select2/selection/base",["jquery","../utils","../keys"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,b.Observable),d.prototype.render=function(){var c=a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=b.GetData(this.$element[0],"old-tabindex")?this._tabindex=b.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),c.attr("title",this.$element.attr("title")),c.attr("tabindex",this._tabindex),this.$selection=c,c},d.prototype.bind=function(a,b){var d=this,e=(a.id,a.id+"-results");this.container=a,this.$selection.on("focus",function(a){d.trigger("focus",a)}),this.$selection.on("blur",function(a){d._handleBlur(a)}),this.$selection.on("keydown",function(a){d.trigger("keypress",a),a.which===c.SPACE&&a.preventDefault()}),a.on("results:focus",function(a){d.$selection.attr("aria-activedescendant",a.data._resultId)}),a.on("selection:update",function(a){d.update(a.data)}),a.on("open",function(){d.$selection.attr("aria-expanded","true"),d.$selection.attr("aria-owns",e),d._attachCloseHandler(a)}),a.on("close",function(){d.$selection.attr("aria-expanded","false"),d.$selection.removeAttr("aria-activedescendant"),d.$selection.removeAttr("aria-owns"),window.setTimeout(function(){d.$selection.focus()},0),d._detachCloseHandler(a)}),a.on("enable",function(){d.$selection.attr("tabindex",d._tabindex)}),a.on("disable",function(){d.$selection.attr("tabindex","-1")})},d.prototype._handleBlur=function(b){var c=this;window.setTimeout(function(){document.activeElement==c.$selection[0]||a.contains(c.$selection[0],document.activeElement)||c.trigger("blur",b)},1)},d.prototype._attachCloseHandler=function(c){a(document.body).on("mousedown.select2."+c.id,function(c){var d=a(c.target),e=d.closest(".select2");a(".select2.select2-container--open").each(function(){a(this),this!=e[0]&&b.GetData(this,"element").select2("close")})})},d.prototype._detachCloseHandler=function(b){a(document.body).off("mousedown.select2."+b.id)},d.prototype.position=function(a,b){b.find(".selection").append(a)},d.prototype.destroy=function(){this._detachCloseHandler(this.container)},d.prototype.update=function(a){throw new Error("The `update` method must be defined in child classes.")},d}),b.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(a,b,c,d){function e(){e.__super__.constructor.apply(this,arguments)}return c.Extend(e,b),e.prototype.render=function(){var a=e.__super__.render.call(this);return a.addClass("select2-selection--single"),a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),a},e.prototype.bind=function(a,b){var c=this;e.__super__.bind.apply(this,arguments);var d=a.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",d).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",d),this.$selection.on("mousedown",function(a){1===a.which&&c.trigger("toggle",{originalEvent:a})}),this.$selection.on("focus",function(a){}),this.$selection.on("blur",function(a){}),a.on("focus",function(b){a.isOpen()||c.$selection.focus()})},e.prototype.clear=function(){var a=this.$selection.find(".select2-selection__rendered");a.empty(),a.removeAttr("title")},e.prototype.display=function(a,b){var c=this.options.get("templateSelection");return this.options.get("escapeMarkup")(c(a,b))},e.prototype.selectionContainer=function(){return a("<span></span>")},e.prototype.update=function(a){if(0===a.length)return void this.clear();var b=a[0],c=this.$selection.find(".select2-selection__rendered"),d=this.display(b,c);c.empty().append(d),c.attr("title",b.title||b.text)},e}),b.define("select2/selection/multiple",["jquery","./base","../utils"],function(a,b,c){function d(a,b){d.__super__.constructor.apply(this,arguments)}return c.Extend(d,b),d.prototype.render=function(){var a=d.__super__.render.call(this);return a.addClass("select2-selection--multiple"),a.html('<ul class="select2-selection__rendered"></ul>'),a},d.prototype.bind=function(b,e){var f=this;d.__super__.bind.apply(this,arguments),this.$selection.on("click",function(a){f.trigger("toggle",{originalEvent:a})}),this.$selection.on("click",".select2-selection__choice__remove",function(b){if(!f.options.get("disabled")){var d=a(this),e=d.parent(),g=c.GetData(e[0],"data");f.trigger("unselect",{originalEvent:b,data:g})}})},d.prototype.clear=function(){var a=this.$selection.find(".select2-selection__rendered");a.empty(),a.removeAttr("title")},d.prototype.display=function(a,b){var c=this.options.get("templateSelection");return this.options.get("escapeMarkup")(c(a,b))},d.prototype.selectionContainer=function(){return a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>')},d.prototype.update=function(a){if(this.clear(),0!==a.length){for(var b=[],d=0;d<a.length;d++){var e=a[d],f=this.selectionContainer(),g=this.display(e,f);f.append(g),f.attr("title",e.title||e.text),c.StoreData(f[0],"data",e),b.push(f)}var h=this.$selection.find(".select2-selection__rendered");c.appendMany(h,b)}},d}),b.define("select2/selection/placeholder",["../utils"],function(a){function b(a,b,c){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c)}return b.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},b.prototype.createPlaceholder=function(a,b){var c=this.selectionContainer();return c.html(this.display(b)),c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),c},b.prototype.update=function(a,b){var c=1==b.length&&b[0].id!=this.placeholder.id;if(b.length>1||c)return a.call(this,b);this.clear();var d=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(d)},b}),b.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(a,b,c){function d(){}return d.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(a){d._handleClear(a)}),b.on("keypress",function(a){d._handleKeyboardClear(a,b)})},d.prototype._handleClear=function(a,b){if(!this.options.get("disabled")){var d=this.$selection.find(".select2-selection__clear");if(0!==d.length){b.stopPropagation();var e=c.GetData(d[0],"data"),f=this.$element.val();this.$element.val(this.placeholder.id);var g={data:e};if(this.trigger("clear",g),g.prevented)return void this.$element.val(f);for(var h=0;h<e.length;h++)if(g={data:e[h]},this.trigger("unselect",g),g.prevented)return void this.$element.val(f);this.$element.trigger("change"),this.trigger("toggle",{})}}},d.prototype._handleKeyboardClear=function(a,c,d){d.isOpen()||c.which!=b.DELETE&&c.which!=b.BACKSPACE||this._handleClear(c)},d.prototype.update=function(b,d){if(b.call(this,d),!(this.$selection.find(".select2-selection__placeholder").length>0||0===d.length)){var e=this.options.get("translations").get("removeAllItems"),f=a('<span class="select2-selection__clear" title="'+e()+'">&times;</span>');c.StoreData(f[0],"data",d),this.$selection.find(".select2-selection__rendered").prepend(f)}},d}),b.define("select2/selection/search",["jquery","../utils","../keys"],function(a,b,c){function d(a,b,c){a.call(this,b,c)}return d.prototype.render=function(b){var c=a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=c,this.$search=c.find("input");var d=b.call(this);return this._transferTabIndex(),d},d.prototype.bind=function(a,d,e){var f=this;a.call(this,d,e),d.on("open",function(){f.$search.trigger("focus")}),d.on("close",function(){f.$search.val(""),f.$search.removeAttr("aria-activedescendant"),f.$search.trigger("focus")}),d.on("enable",function(){f.$search.prop("disabled",!1),f._transferTabIndex()}),d.on("disable",function(){f.$search.prop("disabled",!0)}),d.on("focus",function(a){f.$search.trigger("focus")}),d.on("results:focus",function(a){f.$search.attr("aria-activedescendant",a.id)}),this.$selection.on("focusin",".select2-search--inline",function(a){f.trigger("focus",a)}),this.$selection.on("focusout",".select2-search--inline",function(a){f._handleBlur(a)}),this.$selection.on("keydown",".select2-search--inline",function(a){if(a.stopPropagation(),f.trigger("keypress",a),f._keyUpPrevented=a.isDefaultPrevented(),a.which===c.BACKSPACE&&""===f.$search.val()){var d=f.$searchContainer.prev(".select2-selection__choice");if(d.length>0){var e=b.GetData(d[0],"data");f.searchRemoveChoice(e),a.preventDefault()}}});var g=document.documentMode,h=g&&g<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(a){if(h)return void f.$selection.off("input.search input.searchcheck");f.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(a){if(h&&"input"===a.type)return void f.$selection.off("input.search input.searchcheck");var b=a.which;b!=c.SHIFT&&b!=c.CTRL&&b!=c.ALT&&b!=c.TAB&&f.handleSearch(a)})},d.prototype._transferTabIndex=function(a){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},d.prototype.createPlaceholder=function(a,b){this.$search.attr("placeholder",b.text)},d.prototype.update=function(a,b){var c=this.$search[0]==document.activeElement;if(this.$search.attr("placeholder",""),a.call(this,b),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),c){this.$element.find("[data-select2-tag]").length?this.$element.focus():this.$search.focus()}},d.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var a=this.$search.val();this.trigger("query",{term:a})}this._keyUpPrevented=!1},d.prototype.searchRemoveChoice=function(a,b){this.trigger("unselect",{data:b}),this.$search.val(b.text),this.handleSearch()},d.prototype.resizeSearch=function(){this.$search.css("width","25px");var a="";if(""!==this.$search.attr("placeholder"))a=this.$selection.find(".select2-selection__rendered").innerWidth();else{a=.75*(this.$search.val().length+1)+"em"}this.$search.css("width",a)},d}),b.define("select2/selection/eventRelay",["jquery"],function(a){function b(){}return b.prototype.bind=function(b,c,d){var e=this,f=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],g=["opening","closing","selecting","unselecting","clearing"];b.call(this,c,d),c.on("*",function(b,c){if(-1!==a.inArray(b,f)){c=c||{};var d=a.Event("select2:"+b,{params:c});e.$element.trigger(d),-1!==a.inArray(b,g)&&(c.prevented=d.isDefaultPrevented())}})},b}),b.define("select2/translation",["jquery","require"],function(a,b){function c(a){this.dict=a||{}}return c.prototype.all=function(){return this.dict},c.prototype.get=function(a){return this.dict[a]},c.prototype.extend=function(b){this.dict=a.extend({},b.all(),this.dict)},c._cache={},c.loadPath=function(a){if(!(a in c._cache)){var d=b(a);c._cache[a]=d}return new c(c._cache[a])},c}),b.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Œ":"OE","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","œ":"oe","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ώ":"ω","ς":"σ","’":"'"}}),b.define("select2/data/base",["../utils"],function(a){function b(a,c){b.__super__.constructor.call(this)}return a.Extend(b,a.Observable),b.prototype.current=function(a){throw new Error("The `current` method must be defined in child classes.")},b.prototype.query=function(a,b){throw new Error("The `query` method must be defined in child classes.")},b.prototype.bind=function(a,b){},b.prototype.destroy=function(){},b.prototype.generateResultId=function(b,c){var d=b.id+"-result-";return d+=a.generateChars(4),null!=c.id?d+="-"+c.id.toString():d+="-"+a.generateChars(4),d},b}),b.define("select2/data/select",["./base","../utils","jquery"],function(a,b,c){function d(a,b){this.$element=a,this.options=b,d.__super__.constructor.call(this)}return b.Extend(d,a),d.prototype.current=function(a){var b=[],d=this;this.$element.find(":selected").each(function(){var a=c(this),e=d.item(a);b.push(e)}),a(b)},d.prototype.select=function(a){var b=this;if(a.selected=!0,c(a.element).is("option"))return a.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(d){var e=[];a=[a],a.push.apply(a,d);for(var f=0;f<a.length;f++){var g=a[f].id;-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")});else{var d=a.id;this.$element.val(d),this.$element.trigger("change")}},d.prototype.unselect=function(a){var b=this;if(this.$element.prop("multiple")){if(a.selected=!1,c(a.element).is("option"))return a.element.selected=!1,void this.$element.trigger("change");this.current(function(d){for(var e=[],f=0;f<d.length;f++){var g=d[f].id;g!==a.id&&-1===c.inArray(g,e)&&e.push(g)}b.$element.val(e),b.$element.trigger("change")})}},d.prototype.bind=function(a,b){var c=this;this.container=a,a.on("select",function(a){c.select(a.data)}),a.on("unselect",function(a){c.unselect(a.data)})},d.prototype.destroy=function(){this.$element.find("*").each(function(){b.RemoveData(this)})},d.prototype.query=function(a,b){var d=[],e=this;this.$element.children().each(function(){var b=c(this);if(b.is("option")||b.is("optgroup")){var f=e.item(b),g=e.matches(a,f);null!==g&&d.push(g)}}),b({results:d})},d.prototype.addOptions=function(a){b.appendMany(this.$element,a)},d.prototype.option=function(a){var d;a.children?(d=document.createElement("optgroup"),d.label=a.text):(d=document.createElement("option"),void 0!==d.textContent?d.textContent=a.text:d.innerText=a.text),void 0!==a.id&&(d.value=a.id),a.disabled&&(d.disabled=!0),a.selected&&(d.selected=!0),a.title&&(d.title=a.title);var e=c(d),f=this._normalizeItem(a);return f.element=d,b.StoreData(d,"data",f),e},d.prototype.item=function(a){var d={};if(null!=(d=b.GetData(a[0],"data")))return d;if(a.is("option"))d={id:a.val(),text:a.text(),disabled:a.prop("disabled"),selected:a.prop("selected"),title:a.prop("title")};else if(a.is("optgroup")){d={text:a.prop("label"),children:[],title:a.prop("title")};for(var e=a.children("option"),f=[],g=0;g<e.length;g++){var h=c(e[g]),i=this.item(h);f.push(i)}d.children=f}return d=this._normalizeItem(d),d.element=a[0],b.StoreData(a[0],"data",d),d},d.prototype._normalizeItem=function(a){a!==Object(a)&&(a={id:a,text:a}),a=c.extend({},{text:""},a);var b={selected:!1,disabled:!1};return null!=a.id&&(a.id=a.id.toString()),null!=a.text&&(a.text=a.text.toString()),null==a._resultId&&a.id&&null!=this.container&&(a._resultId=this.generateResultId(this.container,a)),c.extend({},b,a)},d.prototype.matches=function(a,b){return this.options.get("matcher")(a,b)},d}),b.define("select2/data/array",["./select","../utils","jquery"],function(a,b,c){function d(a,b){var c=b.get("data")||[];d.__super__.constructor.call(this,a,b),this.addOptions(this.convertToOptions(c))}return b.Extend(d,a),d.prototype.select=function(a){var b=this.$element.find("option").filter(function(b,c){return c.value==a.id.toString()});0===b.length&&(b=this.option(a),this.addOptions(b)),d.__super__.select.call(this,a)},d.prototype.convertToOptions=function(a){function d(a){return function(){return c(this).val()==a.id}}for(var e=this,f=this.$element.find("option"),g=f.map(function(){return e.item(c(this)).id}).get(),h=[],i=0;i<a.length;i++){var j=this._normalizeItem(a[i]);if(c.inArray(j.id,g)>=0){var k=f.filter(d(j)),l=this.item(k),m=c.extend(!0,{},j,l),n=this.option(m);k.replaceWith(n)}else{var o=this.option(j);if(j.children){var p=this.convertToOptions(j.children);b.appendMany(o,p)}h.push(o)}}return h},d}),b.define("select2/data/ajax",["./array","../utils","jquery"],function(a,b,c){function d(a,b){this.ajaxOptions=this._applyDefaults(b.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),d.__super__.constructor.call(this,a,b)}return b.Extend(d,a),d.prototype._applyDefaults=function(a){var b={data:function(a){return c.extend({},a,{q:a.term})},transport:function(a,b,d){var e=c.ajax(a);return e.then(b),e.fail(d),e}};return c.extend({},b,a,!0)},d.prototype.processResults=function(a){return a},d.prototype.query=function(a,b){function d(){var d=f.transport(f,function(d){var f=e.processResults(d,a);e.options.get("debug")&&window.console&&console.error&&(f&&f.results&&c.isArray(f.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),b(f)},function(){"status"in d&&(0===d.status||"0"===d.status)||e.trigger("results:message",{message:"errorLoading"})});e._request=d}var e=this;null!=this._request&&(c.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var f=c.extend({type:"GET"},this.ajaxOptions);"function"==typeof f.url&&(f.url=f.url.call(this.$element,a)),"function"==typeof f.data&&(f.data=f.data.call(this.$element,a)),this.ajaxOptions.delay&&null!=a.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(d,this.ajaxOptions.delay)):d()},d}),b.define("select2/data/tags",["jquery"],function(a){function b(b,c,d){var e=d.get("tags"),f=d.get("createTag");void 0!==f&&(this.createTag=f);var g=d.get("insertTag");if(void 0!==g&&(this.insertTag=g),b.call(this,c,d),a.isArray(e))for(var h=0;h<e.length;h++){var i=e[h],j=this._normalizeItem(i),k=this.option(j);this.$element.append(k)}}return b.prototype.query=function(a,b,c){function d(a,f){for(var g=a.results,h=0;h<g.length;h++){var i=g[h],j=null!=i.children&&!d({results:i.children},!0);if((i.text||"").toUpperCase()===(b.term||"").toUpperCase()||j)return!f&&(a.data=g,void c(a))}if(f)return!0;var k=e.createTag(b);if(null!=k){var l=e.option(k);l.attr("data-select2-tag",!0),e.addOptions([l]),e.insertTag(g,k)}a.results=g,c(a)}var e=this;if(this._removeOldTags(),null==b.term||null!=b.page)return void a.call(this,b,c);a.call(this,b,d)},b.prototype.createTag=function(b,c){var d=a.trim(c.term);return""===d?null:{id:d,text:d}},b.prototype.insertTag=function(a,b,c){b.unshift(c)},b.prototype._removeOldTags=function(b){this._lastTag;this.$element.find("option[data-select2-tag]").each(function(){this.selected||a(this).remove()})},b}),b.define("select2/data/tokenizer",["jquery"],function(a){function b(a,b,c){var d=c.get("tokenizer");void 0!==d&&(this.tokenizer=d),a.call(this,b,c)}return b.prototype.bind=function(a,b,c){a.call(this,b,c),this.$search=b.dropdown.$search||b.selection.$search||c.find(".select2-search__field")},b.prototype.query=function(b,c,d){function e(b){var c=g._normalizeItem(b);if(!g.$element.find("option").filter(function(){return a(this).val()===c.id}).length){var d=g.option(c);d.attr("data-select2-tag",!0),g._removeOldTags(),g.addOptions([d])}f(c)}function f(a){g.trigger("select",{data:a})}var g=this;c.term=c.term||"";var h=this.tokenizer(c,this.options,e);h.term!==c.term&&(this.$search.length&&(this.$search.val(h.term),this.$search.focus()),c.term=h.term),b.call(this,c,d)},b.prototype.tokenizer=function(b,c,d,e){for(var f=d.get("tokenSeparators")||[],g=c.term,h=0,i=this.createTag||function(a){return{id:a.term,text:a.term}};h<g.length;){var j=g[h];if(-1!==a.inArray(j,f)){var k=g.substr(0,h),l=a.extend({},c,{term:k}),m=i(l);null!=m?(e(m),g=g.substr(h+1)||"",h=0):h++}else h++}return{term:g}},b}),b.define("select2/data/minimumInputLength",[],function(){function a(a,b,c){this.minimumInputLength=c.get("minimumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){if(b.term=b.term||"",b.term.length<this.minimumInputLength)return void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:b.term,params:b}});a.call(this,b,c)},a}),b.define("select2/data/maximumInputLength",[],function(){function a(a,b,c){this.maximumInputLength=c.get("maximumInputLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){if(b.term=b.term||"",this.maximumInputLength>0&&b.term.length>this.maximumInputLength)return void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:b.term,params:b}});a.call(this,b,c)},a}),b.define("select2/data/maximumSelectionLength",[],function(){function a(a,b,c){this.maximumSelectionLength=c.get("maximumSelectionLength"),a.call(this,b,c)}return a.prototype.query=function(a,b,c){var d=this;this.current(function(e){var f=null!=e?e.length:0;if(d.maximumSelectionLength>0&&f>=d.maximumSelectionLength)return void d.trigger("results:message",{message:"maximumSelected",args:{maximum:d.maximumSelectionLength}});a.call(d,b,c)})},a}),b.define("select2/dropdown",["jquery","./utils"],function(a,b){function c(a,b){this.$element=a,this.options=b,c.__super__.constructor.call(this)}return b.Extend(c,b.Observable),c.prototype.render=function(){var b=a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir",this.options.get("dir")),this.$dropdown=b,b},c.prototype.bind=function(){},c.prototype.position=function(a,b){},c.prototype.destroy=function(){this.$dropdown.remove()},c}),b.define("select2/dropdown/search",["jquery","../utils"],function(a,b){function c(){}return c.prototype.render=function(b){var c=b.call(this),d=a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=d,this.$search=d.find("input"),c.prepend(d),c},c.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),this.$search.on("keydown",function(a){e.trigger("keypress",a),e._keyUpPrevented=a.isDefaultPrevented()}),this.$search.on("input",function(b){a(this).off("keyup")}),this.$search.on("keyup input",function(a){e.handleSearch(a)}),c.on("open",function(){e.$search.attr("tabindex",0),e.$search.focus(),window.setTimeout(function(){e.$search.focus()},0)}),c.on("close",function(){e.$search.attr("tabindex",-1),e.$search.val(""),e.$search.blur()}),c.on("focus",function(){c.isOpen()||e.$search.focus()}),c.on("results:all",function(a){if(null==a.query.term||""===a.query.term){e.showSearch(a)?e.$searchContainer.removeClass("select2-search--hide"):e.$searchContainer.addClass("select2-search--hide")}})},c.prototype.handleSearch=function(a){if(!this._keyUpPrevented){var b=this.$search.val();this.trigger("query",{term:b})}this._keyUpPrevented=!1},c.prototype.showSearch=function(a,b){return!0},c}),b.define("select2/dropdown/hidePlaceholder",[],function(){function a(a,b,c,d){this.placeholder=this.normalizePlaceholder(c.get("placeholder")),a.call(this,b,c,d)}return a.prototype.append=function(a,b){b.results=this.removePlaceholder(b.results),a.call(this,b)},a.prototype.normalizePlaceholder=function(a,b){return"string"==typeof b&&(b={id:"",text:b}),b},a.prototype.removePlaceholder=function(a,b){for(var c=b.slice(0),d=b.length-1;d>=0;d--){var e=b[d];this.placeholder.id===e.id&&c.splice(d,1)}return c},a}),b.define("select2/dropdown/infiniteScroll",["jquery"],function(a){function b(a,b,c,d){this.lastParams={},a.call(this,b,c,d),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return b.prototype.append=function(a,b){this.$loadingMore.remove(),this.loading=!1,a.call(this,b),this.showLoadingMore(b)&&this.$results.append(this.$loadingMore)},b.prototype.bind=function(b,c,d){var e=this;b.call(this,c,d),c.on("query",function(a){e.lastParams=a,e.loading=!0}),c.on("query:append",function(a){e.lastParams=a,e.loading=!0}),this.$results.on("scroll",function(){var b=a.contains(document.documentElement,e.$loadingMore[0]);if(!e.loading&&b){e.$results.offset().top+e.$results.outerHeight(!1)+50>=e.$loadingMore.offset().top+e.$loadingMore.outerHeight(!1)&&e.loadMore()}})},b.prototype.loadMore=function(){this.loading=!0;var b=a.extend({},{page:1},this.lastParams);b.page++,this.trigger("query:append",b)},b.prototype.showLoadingMore=function(a,b){return b.pagination&&b.pagination.more},b.prototype.createLoadingMore=function(){var b=a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),c=this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)),b},b}),b.define("select2/dropdown/attachBody",["jquery","../utils"],function(a,b){function c(b,c,d){this.$dropdownParent=d.get("dropdownParent")||a(document.body),b.call(this,c,d)}return c.prototype.bind=function(a,b,c){var d=this,e=!1;a.call(this,b,c),b.on("open",function(){d._showDropdown(),d._attachPositioningHandler(b),e||(e=!0,b.on("results:all",function(){d._positionDropdown(),d._resizeDropdown()}),b.on("results:append",function(){d._positionDropdown(),d._resizeDropdown()}))}),b.on("close",function(){d._hideDropdown(),d._detachPositioningHandler(b)}),this.$dropdownContainer.on("mousedown",function(a){a.stopPropagation()})},c.prototype.destroy=function(a){a.call(this),this.$dropdownContainer.remove()},c.prototype.position=function(a,b,c){b.attr("class",c.attr("class")),b.removeClass("select2"),b.addClass("select2-container--open"),b.css({position:"absolute",top:-999999}),this.$container=c},c.prototype.render=function(b){var c=a("<span></span>"),d=b.call(this);return c.append(d),this.$dropdownContainer=c,c},c.prototype._hideDropdown=function(a){this.$dropdownContainer.detach()},c.prototype._attachPositioningHandler=function(c,d){var e=this,f="scroll.select2."+d.id,g="resize.select2."+d.id,h="orientationchange.select2."+d.id,i=this.$container.parents().filter(b.hasScroll);i.each(function(){b.StoreData(this,"select2-scroll-position",{x:a(this).scrollLeft(),y:a(this).scrollTop()})}),i.on(f,function(c){var d=b.GetData(this,"select2-scroll-position");a(this).scrollTop(d.y)}),a(window).on(f+" "+g+" "+h,function(a){e._positionDropdown(),e._resizeDropdown()})},c.prototype._detachPositioningHandler=function(c,d){var e="scroll.select2."+d.id,f="resize.select2."+d.id,g="orientationchange.select2."+d.id;this.$container.parents().filter(b.hasScroll).off(e),a(window).off(e+" "+f+" "+g)},c.prototype._positionDropdown=function(){var b=a(window),c=this.$dropdown.hasClass("select2-dropdown--above"),d=this.$dropdown.hasClass("select2-dropdown--below"),e=null,f=this.$container.offset();f.bottom=f.top+this.$container.outerHeight(!1);var g={height:this.$container.outerHeight(!1)};g.top=f.top,g.bottom=f.top+g.height;var h={height:this.$dropdown.outerHeight(!1)},i={top:b.scrollTop(),bottom:b.scrollTop()+b.height()},j=i.top<f.top-h.height,k=i.bottom>f.bottom+h.height,l={left:f.left,top:g.bottom},m=this.$dropdownParent;"static"===m.css("position")&&(m=m.offsetParent());var n=m.offset();l.top-=n.top,l.left-=n.left,c||d||(e="below"),k||!j||c?!j&&k&&c&&(e="below"):e="above",("above"==e||c&&"below"!==e)&&(l.top=g.top-n.top-h.height),null!=e&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+e),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+e)),this.$dropdownContainer.css(l)},c.prototype._resizeDropdown=function(){var a={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(a.minWidth=a.width,a.position="relative",a.width="auto"),this.$dropdown.css(a)},c.prototype._showDropdown=function(a){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},c}),b.define("select2/dropdown/minimumResultsForSearch",[],function(){function a(b){for(var c=0,d=0;d<b.length;d++){var e=b[d];e.children?c+=a(e.children):c++}return c}function b(a,b,c,d){this.minimumResultsForSearch=c.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),a.call(this,b,c,d)}return b.prototype.showSearch=function(b,c){return!(a(c.data.results)<this.minimumResultsForSearch)&&b.call(this,c)},b}),b.define("select2/dropdown/selectOnClose",["../utils"],function(a){function b(){}return b.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("close",function(a){d._handleSelectOnClose(a)})},b.prototype._handleSelectOnClose=function(b,c){if(c&&null!=c.originalSelect2Event){var d=c.originalSelect2Event;if("select"===d._type||"unselect"===d._type)return}var e=this.getHighlightedResults();if(!(e.length<1)){var f=a.GetData(e[0],"data");null!=f.element&&f.element.selected||null==f.element&&f.selected||this.trigger("select",{data:f})}},b}),b.define("select2/dropdown/closeOnSelect",[],function(){function a(){}return a.prototype.bind=function(a,b,c){var d=this;a.call(this,b,c),b.on("select",function(a){d._selectTriggered(a)}),b.on("unselect",function(a){d._selectTriggered(a)})},a.prototype._selectTriggered=function(a,b){var c=b.originalEvent;c&&(c.ctrlKey||c.metaKey)||this.trigger("close",{originalEvent:c,originalSelect2Event:b})},a}),b.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(a){var b=a.input.length-a.maximum,c="Please delete "+b+" character";return 1!=b&&(c+="s"),c},inputTooShort:function(a){return"Please enter "+(a.minimum-a.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(a){var b="You can only select "+a.maximum+" item";return 1!=a.maximum&&(b+="s"),b},noResults:function(){return"No results found"},searching:function(){return"Searching…"},removeAllItems:function(){return"Remove all items"}}}),b.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){this.reset()}return D.prototype.apply=function(l){if(l=a.extend(!0,{},this.defaults,l),null==l.dataAdapter){if(null!=l.ajax?l.dataAdapter=o:null!=l.data?l.dataAdapter=n:l.dataAdapter=m,l.minimumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,r)),l.maximumInputLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,s)),l.maximumSelectionLength>0&&(l.dataAdapter=j.Decorate(l.dataAdapter,t)),l.tags&&(l.dataAdapter=j.Decorate(l.dataAdapter,p)),null==l.tokenSeparators&&null==l.tokenizer||(l.dataAdapter=j.Decorate(l.dataAdapter,q)),null!=l.query){var C=b(l.amdBase+"compat/query");l.dataAdapter=j.Decorate(l.dataAdapter,C)}if(null!=l.initSelection){var D=b(l.amdBase+"compat/initSelection");l.dataAdapter=j.Decorate(l.dataAdapter,D)}}if(null==l.resultsAdapter&&(l.resultsAdapter=c,null!=l.ajax&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,x)),null!=l.placeholder&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,w)),l.selectOnClose&&(l.resultsAdapter=j.Decorate(l.resultsAdapter,A))),null==l.dropdownAdapter){if(l.multiple)l.dropdownAdapter=u;else{var E=j.Decorate(u,v);l.dropdownAdapter=E}if(0!==l.minimumResultsForSearch&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,z)),l.closeOnSelect&&(l.dropdownAdapter=j.Decorate(l.dropdownAdapter,B)),null!=l.dropdownCssClass||null!=l.dropdownCss||null!=l.adaptDropdownCssClass){var F=b(l.amdBase+"compat/dropdownCss");l.dropdownAdapter=j.Decorate(l.dropdownAdapter,F)}l.dropdownAdapter=j.Decorate(l.dropdownAdapter,y)}if(null==l.selectionAdapter){if(l.multiple?l.selectionAdapter=e:l.selectionAdapter=d,null!=l.placeholder&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,f)),l.allowClear&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,g)),l.multiple&&(l.selectionAdapter=j.Decorate(l.selectionAdapter,h)),null!=l.containerCssClass||null!=l.containerCss||null!=l.adaptContainerCssClass){var G=b(l.amdBase+"compat/containerCss");l.selectionAdapter=j.Decorate(l.selectionAdapter,G)}l.selectionAdapter=j.Decorate(l.selectionAdapter,i)}if("string"==typeof l.language)if(l.language.indexOf("-")>0){var H=l.language.split("-"),I=H[0];l.language=[l.language,I]}else l.language=[l.language];if(a.isArray(l.language)){var J=new k;l.language.push("en");for(var K=l.language,L=0;L<K.length;L++){var M=K[L],N={};try{N=k.loadPath(M)}catch(a){try{M=this.defaults.amdLanguageBase+M,N=k.loadPath(M)}catch(a){l.debug&&window.console&&console.warn&&console.warn('Select2: The language file for "'+M+'" could not be automatically loaded. A fallback will be used instead.');continue}}J.extend(N)}l.translations=J}else{var O=k.loadPath(this.defaults.amdLanguageBase+"en"),P=new k(l.language);P.extend(O),l.translations=P}return l},D.prototype.reset=function(){function b(a){function b(a){return l[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function c(d,e){if(""===a.trim(d.term))return e;if(e.children&&e.children.length>0){for(var f=a.extend(!0,{},e),g=e.children.length-1;g>=0;g--){null==c(d,e.children[g])&&f.children.splice(g,1)}return f.children.length>0?f:c(d,f)}var h=b(e.text).toUpperCase(),i=b(d.term).toUpperCase();return h.indexOf(i)>-1?e:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:j.escapeMarkup,language:C,matcher:c,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,scrollAfterSelect:!1,sorter:function(a){return a},templateResult:function(a){return a.text},templateSelection:function(a){return a.text},theme:"default",width:"resolve"}},D.prototype.set=function(b,c){var d=a.camelCase(b),e={};e[d]=c;var f=j._convertData(e);a.extend(!0,this.defaults,f)},new D}),b.define("select2/options",["require","jquery","./defaults","./utils"],function(a,b,c,d){function e(b,e){if(this.options=b,null!=e&&this.fromElement(e),this.options=c.apply(this.options),e&&e.is("input")){var f=a(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=d.Decorate(this.options.dataAdapter,f)}}return e.prototype.fromElement=function(a){function c(a,b){return b.toUpperCase()}var e=["select2"];null==this.options.multiple&&(this.options.multiple=a.prop("multiple")),null==this.options.disabled&&(this.options.disabled=a.prop("disabled")),null==this.options.language&&(a.prop("lang")?this.options.language=a.prop("lang").toLowerCase():a.closest("[lang]").prop("lang")&&(this.options.language=a.closest("[lang]").prop("lang"))),null==this.options.dir&&(a.prop("dir")?this.options.dir=a.prop("dir"):a.closest("[dir]").prop("dir")?this.options.dir=a.closest("[dir]").prop("dir"):this.options.dir="ltr"),a.prop("disabled",this.options.disabled),a.prop("multiple",this.options.multiple),d.GetData(a[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),d.StoreData(a[0],"data",d.GetData(a[0],"select2Tags")),d.StoreData(a[0],"tags",!0)),d.GetData(a[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),a.attr("ajax--url",d.GetData(a[0],"ajaxUrl")),d.StoreData(a[0],"ajax-Url",d.GetData(a[0],"ajaxUrl")));for(var f={},g=0;g<a[0].attributes.length;g++){var h=a[0].attributes[g].name,i="data-";if(h.substr(0,i.length)==i){var j=h.substring(i.length),k=d.GetData(a[0],j);f[j.replace(/-([a-z])/g,c)]=k}}b.fn.jquery&&"1."==b.fn.jquery.substr(0,2)&&a[0].dataset&&(f=b.extend(!0,{},a[0].dataset,f));var l=b.extend(!0,{},d.GetData(a[0]),f);l=d._convertData(l);for(var m in l)b.inArray(m,e)>-1||(b.isPlainObject(this.options[m])?b.extend(this.options[m],l[m]):this.options[m]=l[m]);return this},e.prototype.get=function(a){return this.options[a]},e.prototype.set=function(a,b){this.options[a]=b},e}),b.define("select2/core",["jquery","./options","./utils","./keys"],function(a,b,c,d){var e=function(a,d){null!=c.GetData(a[0],"select2")&&c.GetData(a[0],"select2").destroy(),this.$element=a,this.id=this._generateId(a),d=d||{},this.options=new b(d,a),e.__super__.constructor.call(this);var f=a.attr("tabindex")||0;c.StoreData(a[0],"old-tabindex",f),a.attr("tabindex","-1");var g=this.options.get("dataAdapter");this.dataAdapter=new g(a,this.options);var h=this.render();this._placeContainer(h);var i=this.options.get("selectionAdapter");this.selection=new i(a,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,h);var j=this.options.get("dropdownAdapter");this.dropdown=new j(a,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,h);var k=this.options.get("resultsAdapter");this.results=new k(a,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var l=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(a){l.trigger("selection:update",{data:a})}),a.addClass("select2-hidden-accessible"),a.attr("aria-hidden","true"),this._syncAttributes(),c.StoreData(a[0],"select2",this),a.data("select2",this)};return c.Extend(e,c.Observable),e.prototype._generateId=function(a){var b="";return b=null!=a.attr("id")?a.attr("id"):null!=a.attr("name")?a.attr("name")+"-"+c.generateChars(2):c.generateChars(4),b=b.replace(/(:|\.|\[|\]|,)/g,""),b="select2-"+b},e.prototype._placeContainer=function(a){a.insertAfter(this.$element);var b=this._resolveWidth(this.$element,this.options.get("width"));null!=b&&a.css("width",b)},e.prototype._resolveWidth=function(a,b){var c=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==b){var d=this._resolveWidth(a,"style");return null!=d?d:this._resolveWidth(a,"element")}if("element"==b){var e=a.outerWidth(!1);return e<=0?"auto":e+"px"}if("style"==b){var f=a.attr("style");if("string"!=typeof f)return null;for(var g=f.split(";"),h=0,i=g.length;h<i;h+=1){var j=g[h].replace(/\s/g,""),k=j.match(c);if(null!==k&&k.length>=1)return k[1]}return null}return b},e.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},e.prototype._registerDomEvents=function(){var b=this;this.$element.on("change.select2",function(){b.dataAdapter.current(function(a){b.trigger("selection:update",{data:a})})}),this.$element.on("focus.select2",function(a){b.trigger("focus",a)}),this._syncA=c.bind(this._syncAttributes,this),this._syncS=c.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=d?(this._observer=new d(function(c){a.each(c,b._syncA),a.each(c,b._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",b._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",b._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",b._syncS,!1))},e.prototype._registerDataEvents=function(){var a=this;this.dataAdapter.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerSelectionEvents=function(){var b=this,c=["toggle","focus"];this.selection.on("toggle",function(){b.toggleDropdown()}),this.selection.on("focus",function(a){b.focus(a)}),this.selection.on("*",function(d,e){-1===a.inArray(d,c)&&b.trigger(d,e)})},e.prototype._registerDropdownEvents=function(){var a=this;this.dropdown.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerResultsEvents=function(){var a=this;this.results.on("*",function(b,c){a.trigger(b,c)})},e.prototype._registerEvents=function(){var a=this;this.on("open",function(){a.$container.addClass("select2-container--open")}),this.on("close",function(){a.$container.removeClass("select2-container--open")}),this.on("enable",function(){a.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){a.$container.addClass("select2-container--disabled")}),this.on("blur",function(){a.$container.removeClass("select2-container--focus")}),this.on("query",function(b){a.isOpen()||a.trigger("open",{}),this.dataAdapter.query(b,function(c){a.trigger("results:all",{data:c,query:b})})}),this.on("query:append",function(b){this.dataAdapter.query(b,function(c){a.trigger("results:append",{data:c,query:b})})}),this.on("keypress",function(b){var c=b.which;a.isOpen()?c===d.ESC||c===d.TAB||c===d.UP&&b.altKey?(a.close(),b.preventDefault()):c===d.ENTER?(a.trigger("results:select",{}),b.preventDefault()):c===d.SPACE&&b.ctrlKey?(a.trigger("results:toggle",{}),b.preventDefault()):c===d.UP?(a.trigger("results:previous",{}),b.preventDefault()):c===d.DOWN&&(a.trigger("results:next",{}),b.preventDefault()):(c===d.ENTER||c===d.SPACE||c===d.DOWN&&b.altKey)&&(a.open(),b.preventDefault())})},e.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},e.prototype._syncSubtree=function(a,b){var c=!1,d=this;if(!a||!a.target||"OPTION"===a.target.nodeName||"OPTGROUP"===a.target.nodeName){if(b)if(b.addedNodes&&b.addedNodes.length>0)for(var e=0;e<b.addedNodes.length;e++){var f=b.addedNodes[e];f.selected&&(c=!0)}else b.removedNodes&&b.removedNodes.length>0&&(c=!0);else c=!0;c&&this.dataAdapter.current(function(a){d.trigger("selection:update",{data:a})})}},e.prototype.trigger=function(a,b){var c=e.__super__.trigger,d={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===b&&(b={}),a in d){var f=d[a],g={prevented:!1,name:a,args:b};if(c.call(this,f,g),g.prevented)return void(b.prevented=!0)}c.call(this,a,b)},e.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},e.prototype.open=function(){this.isOpen()||this.trigger("query",{})},e.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},e.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},e.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},e.prototype.focus=function(a){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},e.prototype.enable=function(a){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),null!=a&&0!==a.length||(a=[!0]);var b=!a[0];this.$element.prop("disabled",b)},e.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a=[];return this.dataAdapter.current(function(b){a=b}),a},e.prototype.val=function(b){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==b||0===b.length)return this.$element.val();var c=b[0];a.isArray(c)&&(c=a.map(c,function(a){return a.toString()})),this.$element.val(c).trigger("change")},e.prototype.destroy=function(){this.$container.remove(),this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",c.GetData(this.$element[0],"old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),c.RemoveData(this.$element[0]),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},e.prototype.render=function(){var b=a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir",this.options.get("dir")),this.$container=b,this.$container.addClass("select2-container--"+this.options.get("theme")),c.StoreData(b[0],"element",this.$element),b},e}),b.define("select2/compat/utils",["jquery"],function(a){function b(b,c,d){var e,f,g=[];e=a.trim(b.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each(function(){0===this.indexOf("select2-")&&g.push(this)})),e=a.trim(c.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each(function(){0!==this.indexOf("select2-")&&null!=(f=d(this))&&g.push(f)})),b.attr("class",g.join(" "))}return{syncCssClasses:b}}),b.define("select2/compat/containerCss",["jquery","./utils"],function(a,b){function c(a){return null}function d(){}return d.prototype.render=function(d){var e=d.call(this),f=this.options.get("containerCssClass")||"";a.isFunction(f)&&(f=f(this.$element));var g=this.options.get("adaptContainerCssClass");if(g=g||c,-1!==f.indexOf(":all:")){f=f.replace(":all:","");var h=g;g=function(a){var b=h(a);return null!=b?b+" "+a:a}}var i=this.options.get("containerCss")||{};return a.isFunction(i)&&(i=i(this.$element)),b.syncCssClasses(e,this.$element,g),e.css(i),e.addClass(f),e},d}),b.define("select2/compat/dropdownCss",["jquery","./utils"],function(a,b){function c(a){return null}function d(){}return d.prototype.render=function(d){var e=d.call(this),f=this.options.get("dropdownCssClass")||"";a.isFunction(f)&&(f=f(this.$element));var g=this.options.get("adaptDropdownCssClass");if(g=g||c,-1!==f.indexOf(":all:")){f=f.replace(":all:","");var h=g;g=function(a){var b=h(a);return null!=b?b+" "+a:a}}var i=this.options.get("dropdownCss")||{};return a.isFunction(i)&&(i=i(this.$element)),b.syncCssClasses(e,this.$element,g),e.css(i),e.addClass(f),e},d}),b.define("select2/compat/initSelection",["jquery"],function(a){function b(a,b,c){c.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"),this.initSelection=c.get("initSelection"),this._isInitialized=!1,a.call(this,b,c)}return b.prototype.current=function(b,c){var d=this;if(this._isInitialized)return void b.call(this,c);this.initSelection.call(null,this.$element,function(b){d._isInitialized=!0,a.isArray(b)||(b=[b]),c(b)})},b}),b.define("select2/compat/inputData",["jquery","../utils"],function(a,b){function c(a,b,c){this._currentData=[],this._valueSeparator=c.get("valueSeparator")||",","hidden"===b.prop("type")&&c.get("debug")&&console&&console.warn&&console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."),a.call(this,b,c)}return c.prototype.current=function(b,c){function d(b,c){var e=[];return b.selected||-1!==a.inArray(b.id,c)?(b.selected=!0,e.push(b)):b.selected=!1,b.children&&e.push.apply(e,d(b.children,c)),e}for(var e=[],f=0;f<this._currentData.length;f++){var g=this._currentData[f];e.push.apply(e,d(g,this.$element.val().split(this._valueSeparator)))}c(e)},c.prototype.select=function(b,c){if(this.options.get("multiple")){var d=this.$element.val();d+=this._valueSeparator+c.id,this.$element.val(d),this.$element.trigger("change")}else this.current(function(b){a.map(b,function(a){a.selected=!1})}),this.$element.val(c.id),this.$element.trigger("change")},c.prototype.unselect=function(a,b){var c=this;b.selected=!1,this.current(function(a){for(var d=[],e=0;e<a.length;e++){var f=a[e];b.id!=f.id&&d.push(f.id)}c.$element.val(d.join(c._valueSeparator)),c.$element.trigger("change")})},c.prototype.query=function(a,b,c){for(var d=[],e=0;e<this._currentData.length;e++){var f=this._currentData[e],g=this.matches(b,f);null!==g&&d.push(g)}c({results:d})},c.prototype.addOptions=function(c,d){var e=a.map(d,function(a){return b.GetData(a[0],"data")});this._currentData.push.apply(this._currentData,e)},c}),b.define("select2/compat/matcher",["jquery"],function(a){function b(b){function c(c,d){var e=a.extend(!0,{},d);if(null==c.term||""===a.trim(c.term))return e;if(d.children){for(var f=d.children.length-1;f>=0;f--){var g=d.children[f];b(c.term,g.text,g)||e.children.splice(f,1)}if(e.children.length>0)return e}return b(c.term,d.text,d)?e:null}return c}return b}),b.define("select2/compat/query",[],function(){function a(a,b,c){c.get("debug")&&window.console&&console.warn&&console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."),a.call(this,b,c)}return a.prototype.query=function(a,b,c){b.callback=c,this.options.get("query").call(null,b)},a}),b.define("select2/dropdown/attachContainer",[],function(){function a(a,b,c){a.call(this,b,c)}return a.prototype.position=function(a,b,c){c.find(".dropdown-wrapper").append(b),b.addClass("select2-dropdown--below"),c.addClass("select2-container--below")},a}),b.define("select2/dropdown/stopPropagation",[],function(){function a(){}return a.prototype.bind=function(a,b,c){a.call(this,b,c);var d=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$dropdown.on(d.join(" "),function(a){a.stopPropagation()})},a}),b.define("select2/selection/stopPropagation",[],function(){function a(){}return a.prototype.bind=function(a,b,c){a.call(this,b,c);var d=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$selection.on(d.join(" "),function(a){a.stopPropagation()})},a}),function(c){"function"==typeof b.define&&b.define.amd?b.define("jquery-mousewheel",["jquery"],c):"object"==typeof exports?module.exports=c:c(a)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||n<f)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120==0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})}),b.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(a,b,c,d,e){if(null==a.fn.select2){var f=["open","close","destroy"];a.fn.select2=function(b){if("object"==typeof(b=b||{}))return this.each(function(){var d=a.extend(!0,{},b);new c(a(this),d)}),this;if("string"==typeof b){var d,g=Array.prototype.slice.call(arguments,1);return this.each(function(){var a=e.GetData(this,"select2");null==a&&window.console&&console.error&&console.error("The select2('"+b+"') method was called on an element that is not using Select2."),d=a[b].apply(a,g)}),a.inArray(b,f)>-1?this:d}throw new Error("Invalid arguments for Select2: "+b)}}return null==a.fn.select2.defaults&&(a.fn.select2.defaults=d),c}),{define:b.define,require:b.require}}(),c=b.require("jquery.select2");return a.fn.select2.amd=b,c});
/*! Selectric ϟ v1.13.0 (2017-08-22) - git.io/tjl9sQ - Copyright (c) 2017 Leonardo Santos - MIT License */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,s){return void 0===s&&(s="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(s),s}:e(jQuery)}(function(e){"use strict";var t=e(document),s=e(window),l=["a","e","i","o","u","n","c","y"],i=[/[\xE0-\xE5]/g,/[\xE8-\xEB]/g,/[\xEC-\xEF]/g,/[\xF2-\xF6]/g,/[\xF9-\xFC]/g,/[\xF1]/g,/[\xE7]/g,/[\xFD-\xFF]/g],n=function(t,s){var l=this;l.element=t,l.$element=e(t),l.state={multiple:!!l.$element.attr("multiple"),enabled:!1,opened:!1,currValue:-1,selectedIdx:-1,highlightedIdx:-1},l.eventTriggers={open:l.open,close:l.close,destroy:l.destroy,refresh:l.refresh,init:l.init},l.init(s)};n.prototype={utils:{isMobile:function(){return/android|ip(hone|od|ad)/i.test(navigator.userAgent)},escapeRegExp:function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},replaceDiacritics:function(e){for(var t=i.length;t--;)e=e.toLowerCase().replace(i[t],l[t]);return e},format:function(e){var t=arguments;return(""+e).replace(/\{(?:(\d+)|(\w+))\}/g,function(e,s,l){return l&&t[1]?t[1][l]:t[s]})},nextEnabledItem:function(e,t){for(;e[t=(t+1)%e.length].disabled;);return t},previousEnabledItem:function(e,t){for(;e[t=(t>0?t:e.length)-1].disabled;);return t},toDash:function(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()},triggerCallback:function(t,s){var l=s.element,i=s.options["on"+t],n=[l].concat([].slice.call(arguments).slice(1));e.isFunction(i)&&i.apply(l,n),e(l).trigger("selectric-"+this.toDash(t),n)},arrayToClassname:function(t){var s=e.grep(t,function(e){return!!e});return e.trim(s.join(" "))}},init:function(t){var s=this;if(s.options=e.extend(!0,{},e.fn.selectric.defaults,s.options,t),s.utils.triggerCallback("BeforeInit",s),s.destroy(!0),s.options.disableOnMobile&&s.utils.isMobile())return void(s.disableOnMobile=!0);s.classes=s.getClassNames();var l=e("<input/>",{class:s.classes.input,readonly:s.utils.isMobile()}),i=e("<div/>",{class:s.classes.items,tabindex:-1}),n=e("<div/>",{class:s.classes.scroll}),a=e("<div/>",{class:s.classes.prefix,html:s.options.arrowButtonMarkup}),o=e("<span/>",{class:"label"}),r=s.$element.wrap("<div/>").parent().append(a.prepend(o),i,l),u=e("<div/>",{class:s.classes.hideselect});s.elements={input:l,items:i,itemsScroll:n,wrapper:a,label:o,outerWrapper:r},s.options.nativeOnMobile&&s.utils.isMobile()&&(s.elements.input=void 0,u.addClass(s.classes.prefix+"-is-native"),s.$element.on("change",function(){s.refresh()})),s.$element.on(s.eventTriggers).wrap(u),s.originalTabindex=s.$element.prop("tabindex"),s.$element.prop("tabindex",-1),s.populate(),s.activate(),s.utils.triggerCallback("Init",s)},activate:function(){var e=this,t=e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),s=e.$element.width();t.removeClass(e.classes.tempshow),e.utils.triggerCallback("BeforeActivate",e),e.elements.outerWrapper.prop("class",e.utils.arrayToClassname([e.classes.wrapper,e.$element.prop("class").replace(/\S+/g,e.classes.prefix+"-$&"),e.options.responsive?e.classes.responsive:""])),e.options.inheritOriginalWidth&&s>0&&e.elements.outerWrapper.width(s),e.unbindEvents(),e.$element.prop("disabled")?(e.elements.outerWrapper.addClass(e.classes.disabled),e.elements.input&&e.elements.input.prop("disabled",!0)):(e.state.enabled=!0,e.elements.outerWrapper.removeClass(e.classes.disabled),e.$li=e.elements.items.removeAttr("style").find("li"),e.bindEvents()),e.utils.triggerCallback("Activate",e)},getClassNames:function(){var t=this,s=t.options.customClass,l={};return e.each("Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel".split(" "),function(e,i){var n=s.prefix+i;l[i.toLowerCase()]=s.camelCase?n:t.utils.toDash(n)}),l.prefix=s.prefix,l},setLabel:function(){var t=this,s=t.options.labelBuilder;if(t.state.multiple){var l=e.isArray(t.state.currValue)?t.state.currValue:[t.state.currValue];l=0===l.length?[0]:l;var i=e.map(l,function(s){return e.grep(t.lookupItems,function(e){return e.index===s})[0]});i=e.grep(i,function(t){return i.length>1||0===i.length?""!==e.trim(t.value):t}),i=e.map(i,function(l){return e.isFunction(s)?s(l):t.utils.format(s,l)}),t.options.multiple.maxLabelEntries&&(i.length>=t.options.multiple.maxLabelEntries+1?(i=i.slice(0,t.options.multiple.maxLabelEntries),i.push(e.isFunction(s)?s({text:"..."}):t.utils.format(s,{text:"..."}))):i.slice(i.length-1)),t.elements.label.html(i.join(t.options.multiple.separator))}else{var n=t.lookupItems[t.state.currValue];t.elements.label.html(e.isFunction(s)?s(n):t.utils.format(s,n))}},populate:function(){var t=this,s=t.$element.children(),l=t.$element.find("option"),i=l.filter(":selected"),n=l.index(i),a=0,o=t.state.multiple?[]:0;i.length>1&&t.state.multiple&&(n=[],i.each(function(){n.push(e(this).index())})),t.state.currValue=~n?n:o,t.state.selectedIdx=t.state.currValue,t.state.highlightedIdx=t.state.currValue,t.items=[],t.lookupItems=[],s.length&&(s.each(function(s){var l=e(this);if(l.is("optgroup")){var i={element:l,label:l.prop("label"),groupDisabled:l.prop("disabled"),items:[]};l.children().each(function(s){var l=e(this);i.items[s]=t.getItemData(a,l,i.groupDisabled||l.prop("disabled")),t.lookupItems[a]=i.items[s],a++}),t.items[s]=i}else t.items[s]=t.getItemData(a,l,l.prop("disabled")),t.lookupItems[a]=t.items[s],a++}),t.setLabel(),t.elements.items.append(t.elements.itemsScroll.html(t.getItemsMarkup(t.items))))},getItemData:function(t,s,l){var i=this;return{index:t,element:s,value:s.val(),className:s.prop("class"),text:s.html(),slug:e.trim(i.utils.replaceDiacritics(s.html())),alt:s.attr("data-alt"),selected:s.prop("selected"),disabled:l}},getItemsMarkup:function(t){var s=this,l="<ul>";return e.isFunction(s.options.listBuilder)&&s.options.listBuilder&&(t=s.options.listBuilder(t)),e.each(t,function(t,i){void 0!==i.label?(l+=s.utils.format('<ul class="{1}"><li class="{2}">{3}</li>',s.utils.arrayToClassname([s.classes.group,i.groupDisabled?"disabled":"",i.element.prop("class")]),s.classes.grouplabel,i.element.prop("label")),e.each(i.items,function(e,t){l+=s.getItemMarkup(t.index,t)}),l+="</ul>"):l+=s.getItemMarkup(i.index,i)}),l+"</ul>"},getItemMarkup:function(t,s){var l=this,i=l.options.optionsItemBuilder,n={value:s.value,text:s.text,slug:s.slug,index:s.index};return l.utils.format('<li data-index="{1}" class="{2}">{3}</li>',t,l.utils.arrayToClassname([s.className,t===l.items.length-1?"last":"",s.disabled?"disabled":"",s.selected?"selected":""]),e.isFunction(i)?l.utils.format(i(s,this.$element,t),s):l.utils.format(i,n))},unbindEvents:function(){var e=this;e.elements.wrapper.add(e.$element).add(e.elements.outerWrapper).add(e.elements.input).off(".sl")},bindEvents:function(){var t=this;t.elements.outerWrapper.on("mouseenter.sl mouseleave.sl",function(s){e(this).toggleClass(t.classes.hover,"mouseenter"===s.type),t.options.openOnHover&&(clearTimeout(t.closeTimer),"mouseleave"===s.type?t.closeTimer=setTimeout(e.proxy(t.close,t),t.options.hoverIntentTimeout):t.open())}),t.elements.wrapper.on("click.sl",function(e){t.state.opened?t.close():t.open(e)}),t.options.nativeOnMobile&&t.utils.isMobile()||(t.$element.on("focus.sl",function(){t.elements.input.focus()}),t.elements.input.prop({tabindex:t.originalTabindex,disabled:!1}).on("keydown.sl",e.proxy(t.handleKeys,t)).on("focusin.sl",function(e){t.elements.outerWrapper.addClass(t.classes.focus),t.elements.input.one("blur",function(){t.elements.input.blur()}),t.options.openOnFocus&&!t.state.opened&&t.open(e)}).on("focusout.sl",function(){t.elements.outerWrapper.removeClass(t.classes.focus)}).on("input propertychange",function(){var s=t.elements.input.val(),l=new RegExp("^"+t.utils.escapeRegExp(s),"i");clearTimeout(t.resetStr),t.resetStr=setTimeout(function(){t.elements.input.val("")},t.options.keySearchTimeout),s.length&&e.each(t.items,function(e,s){if(!s.disabled){if(l.test(s.text)||l.test(s.slug))return void t.highlight(e);if(s.alt)for(var i=s.alt.split("|"),n=0;n<i.length&&i[n];n++)if(l.test(i[n].trim()))return void t.highlight(e)}})})),t.$li.on({mousedown:function(e){e.preventDefault(),e.stopPropagation()},click:function(){return t.select(e(this).data("index")),!1}})},handleKeys:function(t){var s=this,l=t.which,i=s.options.keys,n=e.inArray(l,i.previous)>-1,a=e.inArray(l,i.next)>-1,o=e.inArray(l,i.select)>-1,r=e.inArray(l,i.open)>-1,u=s.state.highlightedIdx,p=n&&0===u||a&&u+1===s.items.length,c=0;if(13!==l&&32!==l||t.preventDefault(),n||a){if(!s.options.allowWrap&&p)return;n&&(c=s.utils.previousEnabledItem(s.lookupItems,u)),a&&(c=s.utils.nextEnabledItem(s.lookupItems,u)),s.highlight(c)}if(o&&s.state.opened)return s.select(u),void(s.state.multiple&&s.options.multiple.keepMenuOpen||s.close());r&&!s.state.opened&&s.open()},refresh:function(){var e=this;e.populate(),e.activate(),e.utils.triggerCallback("Refresh",e)},setOptionsDimensions:function(){var e=this,t=e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),s=e.options.maxHeight,l=e.elements.items.outerWidth(),i=e.elements.wrapper.outerWidth()-(l-e.elements.items.width());!e.options.expandToItemText||i>l?e.finalWidth=i:(e.elements.items.css("overflow","scroll"),e.elements.outerWrapper.width(9e4),e.finalWidth=e.elements.items.width(),e.elements.items.css("overflow",""),e.elements.outerWrapper.width("")),e.elements.items.width(e.finalWidth).height()>s&&e.elements.items.height(s),t.removeClass(e.classes.tempshow)},isInViewport:function(){var e=this;if(!0===e.options.forceRenderAbove)e.elements.outerWrapper.addClass(e.classes.above);else if(!0===e.options.forceRenderBelow)e.elements.outerWrapper.addClass(e.classes.below);else{var t=s.scrollTop(),l=s.height(),i=e.elements.outerWrapper.offset().top,n=e.elements.outerWrapper.outerHeight(),a=i+n+e.itemsHeight<=t+l,o=i-e.itemsHeight>t,r=!a&&o,u=!r;e.elements.outerWrapper.toggleClass(e.classes.above,r),e.elements.outerWrapper.toggleClass(e.classes.below,u)}},detectItemVisibility:function(t){var s=this,l=s.$li.filter("[data-index]");s.state.multiple&&(t=e.isArray(t)&&0===t.length?0:t,t=e.isArray(t)?Math.min.apply(Math,t):t);var i=l.eq(t).outerHeight(),n=l[t].offsetTop,a=s.elements.itemsScroll.scrollTop(),o=n+2*i;s.elements.itemsScroll.scrollTop(o>a+s.itemsHeight?o-s.itemsHeight:n-i<a?n-i:a)},open:function(s){var l=this;if(l.options.nativeOnMobile&&l.utils.isMobile())return!1;l.utils.triggerCallback("BeforeOpen",l),s&&(s.preventDefault(),l.options.stopPropagation&&s.stopPropagation()),l.state.enabled&&(l.setOptionsDimensions(),e("."+l.classes.hideselect,"."+l.classes.open).children().selectric("close"),l.state.opened=!0,l.itemsHeight=l.elements.items.outerHeight(),l.itemsInnerHeight=l.elements.items.height(),l.elements.outerWrapper.addClass(l.classes.open),l.elements.input.val(""),s&&"focusin"!==s.type&&l.elements.input.focus(),setTimeout(function(){t.on("click.sl",e.proxy(l.close,l)).on("scroll.sl",e.proxy(l.isInViewport,l))},1),l.isInViewport(),l.options.preventWindowScroll&&t.on("mousewheel.sl DOMMouseScroll.sl","."+l.classes.scroll,function(t){var s=t.originalEvent,i=e(this).scrollTop(),n=0;"detail"in s&&(n=-1*s.detail),"wheelDelta"in s&&(n=s.wheelDelta),"wheelDeltaY"in s&&(n=s.wheelDeltaY),"deltaY"in s&&(n=-1*s.deltaY),(i===this.scrollHeight-l.itemsInnerHeight&&n<0||0===i&&n>0)&&t.preventDefault()}),l.detectItemVisibility(l.state.selectedIdx),l.highlight(l.state.multiple?-1:l.state.selectedIdx),l.utils.triggerCallback("Open",l))},close:function(){var e=this;e.utils.triggerCallback("BeforeClose",e),t.off(".sl"),e.elements.outerWrapper.removeClass(e.classes.open),e.state.opened=!1,e.utils.triggerCallback("Close",e)},change:function(){var t=this;t.utils.triggerCallback("BeforeChange",t),t.state.multiple?(e.each(t.lookupItems,function(e){t.lookupItems[e].selected=!1,t.$element.find("option").prop("selected",!1)}),e.each(t.state.selectedIdx,function(e,s){t.lookupItems[s].selected=!0,t.$element.find("option").eq(s).prop("selected",!0)}),t.state.currValue=t.state.selectedIdx,t.setLabel(),t.utils.triggerCallback("Change",t)):t.state.currValue!==t.state.selectedIdx&&(t.$element.prop("selectedIndex",t.state.currValue=t.state.selectedIdx).data("value",t.lookupItems[t.state.selectedIdx].text),t.setLabel(),t.utils.triggerCallback("Change",t))},highlight:function(e){var t=this,s=t.$li.filter("[data-index]").removeClass("highlighted");t.utils.triggerCallback("BeforeHighlight",t),void 0===e||-1===e||t.lookupItems[e].disabled||(s.eq(t.state.highlightedIdx=e).addClass("highlighted"),t.detectItemVisibility(e),t.utils.triggerCallback("Highlight",t))},select:function(t){var s=this,l=s.$li.filter("[data-index]");if(s.utils.triggerCallback("BeforeSelect",s,t),void 0!==t&&-1!==t&&!s.lookupItems[t].disabled){if(s.state.multiple){s.state.selectedIdx=e.isArray(s.state.selectedIdx)?s.state.selectedIdx:[s.state.selectedIdx];var i=e.inArray(t,s.state.selectedIdx);-1!==i?s.state.selectedIdx.splice(i,1):s.state.selectedIdx.push(t),l.removeClass("selected").filter(function(t){return-1!==e.inArray(t,s.state.selectedIdx)}).addClass("selected")}else l.removeClass("selected").eq(s.state.selectedIdx=t).addClass("selected");s.state.multiple&&s.options.multiple.keepMenuOpen||s.close(),s.change(),s.utils.triggerCallback("Select",s,t)}},destroy:function(e){var t=this;t.state&&t.state.enabled&&(t.elements.items.add(t.elements.wrapper).add(t.elements.input).remove(),e||t.$element.removeData("selectric").removeData("value"),t.$element.prop("tabindex",t.originalTabindex).off(".sl").off(t.eventTriggers).unwrap().unwrap(),t.state.enabled=!1)}},e.fn.selectric=function(t){return this.each(function(){var s=e.data(this,"selectric");s&&!s.disableOnMobile?"string"==typeof t&&s[t]?s[t]():s.init(t):e.data(this,"selectric",new n(this,t))})},e.fn.selectric.defaults={onChange:function(t){e(t).change()},maxHeight:300,keySearchTimeout:500,arrowButtonMarkup:'<b class="button">&#x25be;</b>',disableOnMobile:!1,nativeOnMobile:!0,openOnFocus:!0,openOnHover:!1,hoverIntentTimeout:500,expandToItemText:!1,responsive:!1,preventWindowScroll:!0,inheritOriginalWidth:!1,allowWrap:!0,forceRenderAbove:!1,forceRenderBelow:!1,stopPropagation:!0,optionsItemBuilder:"{text}",labelBuilder:"{text}",listBuilder:!1,keys:{previous:[37,38],next:[39,40],select:[9,13,27],open:[13,32,37,38,39,40],close:[9,27]},customClass:{prefix:"selectric",camelCase:!1},multiple:{separator:", ",keepMenuOpen:!0,maxLabelEntries:!1}}});
/**
 * Super simple wysiwyg editor v0.8.12
 * https://summernote.org
 *
 * Copyright 2013- Alan Hong. and other contributors
 * summernote may be freely distributed under the MIT license.
 *
 * Date: 2019-05-16T08:16Z
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = global || self, factory(global.jQuery));
}(this, function ($$1) { 'use strict';

  $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

  var Renderer = /** @class */ (function () {
      function Renderer(markup, children, options, callback) {
          this.markup = markup;
          this.children = children;
          this.options = options;
          this.callback = callback;
      }
      Renderer.prototype.render = function ($parent) {
          var $node = $$1(this.markup);
          if (this.options && this.options.contents) {
              $node.html(this.options.contents);
          }
          if (this.options && this.options.className) {
              $node.addClass(this.options.className);
          }
          if (this.options && this.options.data) {
              $$1.each(this.options.data, function (k, v) {
                  $node.attr('data-' + k, v);
              });
          }
          if (this.options && this.options.click) {
              $node.on('click', this.options.click);
          }
          if (this.children) {
              var $container_1 = $node.find('.note-children-container');
              this.children.forEach(function (child) {
                  child.render($container_1.length ? $container_1 : $node);
              });
          }
          if (this.callback) {
              this.callback($node, this.options);
          }
          if (this.options && this.options.callback) {
              this.options.callback($node);
          }
          if ($parent) {
              $parent.append($node);
          }
          return $node;
      };
      return Renderer;
  }());
  var renderer = {
      create: function (markup, callback) {
          return function () {
              var options = typeof arguments[1] === 'object' ? arguments[1] : arguments[0];
              var children = Array.isArray(arguments[0]) ? arguments[0] : [];
              if (options && options.children) {
                  children = options.children;
              }
              return new Renderer(markup, children, options, callback);
          };
      }
  };

  var editor = renderer.create('<div class="note-editor note-frame card"/>');
  var toolbar = renderer.create('<div class="note-toolbar card-header" role="toolbar"></div>');
  var editingArea = renderer.create('<div class="note-editing-area"/>');
  var codable = renderer.create('<textarea class="note-codable" role="textbox" aria-multiline="true"/>');
  var editable = renderer.create('<div class="note-editable card-block" contentEditable="true" role="textbox" aria-multiline="true"/>');
  var statusbar = renderer.create([
      '<output class="note-status-output" aria-live="polite"/>',
      '<div class="note-statusbar" role="status">',
      '  <output class="note-status-output" aria-live="polite"></output>',
      '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="Resize">',
      '    <div class="note-icon-bar"/>',
      '    <div class="note-icon-bar"/>',
      '    <div class="note-icon-bar"/>',
      '  </div>',
      '</div>',
  ].join(''));
  var airEditor = renderer.create('<div class="note-editor"/>');
  var airEditable = renderer.create([
      '<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>',
      '<output class="note-status-output" aria-live="polite"/>',
  ].join(''));
  var buttonGroup = renderer.create('<div class="note-btn-group btn-group">');
  var dropdown = renderer.create('<div class="dropdown-menu" role="list">', function ($node, options) {
      var markup = Array.isArray(options.items) ? options.items.map(function (item) {
          var value = (typeof item === 'string') ? item : (item.value || '');
          var content = options.template ? options.template(item) : item;
          var option = (typeof item === 'object') ? item.option : undefined;
          var dataValue = 'data-value="' + value + '"';
          var dataOption = (option !== undefined) ? ' data-option="' + option + '"' : '';
          return '<a class="dropdown-item" href="#" ' + (dataValue + dataOption) + ' role="listitem" aria-label="' + value + '">' + content + '</a>';
      }).join('') : options.items;
      $node.html(markup).attr({ 'aria-label': options.title });
  });
  var dropdownButtonContents = function (contents) {
      return contents;
  };
  var dropdownCheck = renderer.create('<div class="dropdown-menu note-check" role="list">', function ($node, options) {
      var markup = Array.isArray(options.items) ? options.items.map(function (item) {
          var value = (typeof item === 'string') ? item : (item.value || '');
          var content = options.template ? options.template(item) : item;
          return '<a class="dropdown-item" href="#" data-value="' + value + '" role="listitem" aria-label="' + item + '">' + icon(options.checkClassName) + ' ' + content + '</a>';
      }).join('') : options.items;
      $node.html(markup).attr({ 'aria-label': options.title });
  });
  var palette = renderer.create('<div class="note-color-palette"/>', function ($node, options) {
      var contents = [];
      for (var row = 0, rowSize = options.colors.length; row < rowSize; row++) {
          var eventName = options.eventName;
          var colors = options.colors[row];
          var colorsName = options.colorsName[row];
          var buttons = [];
          for (var col = 0, colSize = colors.length; col < colSize; col++) {
              var color = colors[col];
              var colorName = colorsName[col];
              buttons.push([
                  '<button type="button" class="note-color-btn"',
                  'style="background-color:', color, '" ',
                  'data-event="', eventName, '" ',
                  'data-value="', color, '" ',
                  'title="', colorName, '" ',
                  'aria-label="', colorName, '" ',
                  'data-toggle="button" tabindex="-1"></button>',
              ].join(''));
          }
          contents.push('<div class="note-color-row">' + buttons.join('') + '</div>');
      }
      $node.html(contents.join(''));
      if (options.tooltip) {
          $node.find('.note-color-btn').tooltip({
              container: options.container,
              trigger: 'hover',
              placement: 'bottom'
          });
      }
  });
  var dialog = renderer.create('<div class="modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function ($node, options) {
      if (options.fade) {
          $node.addClass('fade');
      }
      $node.attr({
          'aria-label': options.title
      });
      $node.html([
          '<div class="modal-dialog">',
          '  <div class="modal-content">',
          (options.title
              ? '    <div class="modal-header">' +
                  '      <h4 class="modal-title">' + options.title + '</h4>' +
                  '      <button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>' +
                  '    </div>' : ''),
          '    <div class="modal-body">' + options.body + '</div>',
          (options.footer
              ? '    <div class="modal-footer">' + options.footer + '</div>' : ''),
          '  </div>',
          '</div>',
      ].join(''));
  });
  var popover = renderer.create([
      '<div class="note-popover popover in">',
      '  <div class="arrow"/>',
      '  <div class="popover-content note-children-container"/>',
      '</div>',
  ].join(''), function ($node, options) {
      var direction = typeof options.direction !== 'undefined' ? options.direction : 'bottom';
      $node.addClass(direction);
      if (options.hideArrow) {
          $node.find('.arrow').hide();
      }
  });
  var checkbox = renderer.create('<div class="form-check"></div>', function ($node, options) {
      $node.html([
          '<label class="form-check-label"' + (options.id ? ' for="' + options.id + '"' : '') + '>',
          ' <input role="checkbox" type="checkbox" class="form-check-input"' + (options.id ? ' id="' + options.id + '"' : ''),
          (options.checked ? ' checked' : ''),
          ' aria-label="' + (options.text ? options.text : '') + '"',
          ' aria-checked="' + (options.checked ? 'true' : 'false') + '"/>',
          ' ' + (options.text ? options.text : '') + '</label>',
      ].join(''));
  });
  var icon = function (iconClassName, tagName) {
      tagName = tagName || 'i';
      return '<' + tagName + ' class="' + iconClassName + '"/>';
  };
  var ui = {
      editor: editor,
      toolbar: toolbar,
      editingArea: editingArea,
      codable: codable,
      editable: editable,
      statusbar: statusbar,
      airEditor: airEditor,
      airEditable: airEditable,
      buttonGroup: buttonGroup,
      dropdown: dropdown,
      dropdownButtonContents: dropdownButtonContents,
      dropdownCheck: dropdownCheck,
      palette: palette,
      dialog: dialog,
      popover: popover,
      icon: icon,
      checkbox: checkbox,
      options: {},
      button: function ($node, options) {
          return renderer.create('<button type="button" class="note-btn btn btn-light btn-sm" role="button" tabindex="-1">', function ($node, options) {
              if (options && options.tooltip) {
                  $node.attr({
                      title: options.tooltip,
                      'aria-label': options.tooltip
                  }).tooltip({
                      container: (options.container !== undefined) ? options.container : 'body',
                      trigger: 'hover',
                      placement: 'bottom'
                  }).on('click', function (e) {
                      $$1(e.currentTarget).tooltip('hide');
                  });
              }
          })($node, options);
      },
      toggleBtn: function ($btn, isEnable) {
          $btn.toggleClass('disabled', !isEnable);
          $btn.attr('disabled', !isEnable);
      },
      toggleBtnActive: function ($btn, isActive) {
          $btn.toggleClass('active', isActive);
      },
      onDialogShown: function ($dialog, handler) {
          $dialog.one('shown.bs.modal', handler);
      },
      onDialogHidden: function ($dialog, handler) {
          $dialog.one('hidden.bs.modal', handler);
      },
      showDialog: function ($dialog) {
          $dialog.modal('show');
      },
      hideDialog: function ($dialog) {
          $dialog.modal('hide');
      },
      createLayout: function ($note, options) {
          var $editor = (options.airMode ? ui.airEditor([
              ui.editingArea([
                  ui.airEditable(),
              ]),
          ]) : ui.editor([
              ui.toolbar(),
              ui.editingArea([
                  ui.codable(),
                  ui.editable(),
              ]),
              ui.statusbar(),
          ])).render();
          $editor.insertAfter($note);
          return {
              note: $note,
              editor: $editor,
              toolbar: $editor.find('.note-toolbar'),
              editingArea: $editor.find('.note-editing-area'),
              editable: $editor.find('.note-editable'),
              codable: $editor.find('.note-codable'),
              statusbar: $editor.find('.note-statusbar')
          };
      },
      removeLayout: function ($note, layoutInfo) {
          $note.html(layoutInfo.editable.html());
          layoutInfo.editor.remove();
          $note.show();
      }
  };

  $$1.summernote = $$1.summernote || {
      lang: {}
  };
  $$1.extend($$1.summernote.lang, {
      'en-US': {
          font: {
              bold: 'Bold',
              italic: 'Italic',
              underline: 'Underline',
              clear: 'Remove Font Style',
              height: 'Line Height',
              name: 'Font Family',
              strikethrough: 'Strikethrough',
              subscript: 'Subscript',
              superscript: 'Superscript',
              size: 'Font Size'
          },
          image: {
              image: 'Picture',
              insert: 'Insert Image',
              resizeFull: 'Resize full',
              resizeHalf: 'Resize half',
              resizeQuarter: 'Resize quarter',
              resizeNone: 'Original size',
              floatLeft: 'Float Left',
              floatRight: 'Float Right',
              floatNone: 'Remove float',
              shapeRounded: 'Shape: Rounded',
              shapeCircle: 'Shape: Circle',
              shapeThumbnail: 'Shape: Thumbnail',
              shapeNone: 'Shape: None',
              dragImageHere: 'Drag image or text here',
              dropImage: 'Drop image or Text',
              selectFromFiles: 'Select from files',
              maximumFileSize: 'Maximum file size',
              maximumFileSizeError: 'Maximum file size exceeded.',
              url: 'Image URL',
              remove: 'Remove Image',
              original: 'Original'
          },
          video: {
              video: 'Video',
              videoLink: 'Video Link',
              insert: 'Insert Video',
              url: 'Video URL',
              providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)'
          },
          link: {
              link: 'Link',
              insert: 'Insert Link',
              unlink: 'Unlink',
              edit: 'Edit',
              textToDisplay: 'Text to display',
              url: 'To what URL should this link go?',
              openInNewWindow: 'Open in new window'
          },
          table: {
              table: 'Table',
              addRowAbove: 'Add row above',
              addRowBelow: 'Add row below',
              addColLeft: 'Add column left',
              addColRight: 'Add column right',
              delRow: 'Delete row',
              delCol: 'Delete column',
              delTable: 'Delete table'
          },
          hr: {
              insert: 'Insert Horizontal Rule'
          },
          style: {
              style: 'Style',
              p: 'Normal',
              blockquote: 'Quote',
              pre: 'Code',
              h1: 'Header 1',
              h2: 'Header 2',
              h3: 'Header 3',
              h4: 'Header 4',
              h5: 'Header 5',
              h6: 'Header 6'
          },
          lists: {
              unordered: 'Unordered list',
              ordered: 'Ordered list'
          },
          options: {
              help: 'Help',
              fullscreen: 'Full Screen',
              codeview: 'Code View'
          },
          paragraph: {
              paragraph: 'Paragraph',
              outdent: 'Outdent',
              indent: 'Indent',
              left: 'Align left',
              center: 'Align center',
              right: 'Align right',
              justify: 'Justify full'
          },
          color: {
              recent: 'Recent Color',
              more: 'More Color',
              background: 'Background Color',
              foreground: 'Foreground Color',
              transparent: 'Transparent',
              setTransparent: 'Set transparent',
              reset: 'Reset',
              resetToDefault: 'Reset to default',
              cpSelect: 'Select'
          },
          shortcut: {
              shortcuts: 'Keyboard shortcuts',
              close: 'Close',
              textFormatting: 'Text formatting',
              action: 'Action',
              paragraphFormatting: 'Paragraph formatting',
              documentStyle: 'Document Style',
              extraKeys: 'Extra keys'
          },
          help: {
              'insertParagraph': 'Insert Paragraph',
              'undo': 'Undoes the last command',
              'redo': 'Redoes the last command',
              'tab': 'Tab',
              'untab': 'Untab',
              'bold': 'Set a bold style',
              'italic': 'Set a italic style',
              'underline': 'Set a underline style',
              'strikethrough': 'Set a strikethrough style',
              'removeFormat': 'Clean a style',
              'justifyLeft': 'Set left align',
              'justifyCenter': 'Set center align',
              'justifyRight': 'Set right align',
              'justifyFull': 'Set full align',
              'insertUnorderedList': 'Toggle unordered list',
              'insertOrderedList': 'Toggle ordered list',
              'outdent': 'Outdent on current paragraph',
              'indent': 'Indent on current paragraph',
              'formatPara': 'Change current block\'s format as a paragraph(P tag)',
              'formatH1': 'Change current block\'s format as H1',
              'formatH2': 'Change current block\'s format as H2',
              'formatH3': 'Change current block\'s format as H3',
              'formatH4': 'Change current block\'s format as H4',
              'formatH5': 'Change current block\'s format as H5',
              'formatH6': 'Change current block\'s format as H6',
              'insertHorizontalRule': 'Insert horizontal rule',
              'linkDialog.show': 'Show Link Dialog'
          },
          history: {
              undo: 'Undo',
              redo: 'Redo'
          },
          specialChar: {
              specialChar: 'SPECIAL CHARACTERS',
              select: 'Select Special characters'
          }
      }
  });

  var isSupportAmd = typeof define === 'function' && define.amd; // eslint-disable-line
  /**
   * returns whether font is installed or not.
   *
   * @param {String} fontName
   * @return {Boolean}
   */
  function isFontInstalled(fontName) {
      var testFontName = fontName === 'Comic Sans MS' ? 'Courier New' : 'Comic Sans MS';
      var testText = 'mmmmmmmmmmwwwww';
      var testSize = '200px';
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.font = testSize + " '" + testFontName + "'";
      var originalWidth = context.measureText(testText).width;
      context.font = testSize + " '" + fontName + "', '" + testFontName + "'";
      var width = context.measureText(testText).width;
      return originalWidth !== width;
  }
  var userAgent = navigator.userAgent;
  var isMSIE = /MSIE|Trident/i.test(userAgent);
  var browserVersion;
  if (isMSIE) {
      var matches = /MSIE (\d+[.]\d+)/.exec(userAgent);
      if (matches) {
          browserVersion = parseFloat(matches[1]);
      }
      matches = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(userAgent);
      if (matches) {
          browserVersion = parseFloat(matches[1]);
      }
  }
  var isEdge = /Edge\/\d+/.test(userAgent);
  var hasCodeMirror = !!window.CodeMirror;
  var isSupportTouch = (('ontouchstart' in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  // [workaround] IE doesn't have input events for contentEditable
  // - see: https://goo.gl/4bfIvA
  var inputEventName = (isMSIE || isEdge) ? 'DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted' : 'input';
  /**
   * @class core.env
   *
   * Object which check platform and agent
   *
   * @singleton
   * @alternateClassName env
   */
  var env = {
      isMac: navigator.appVersion.indexOf('Mac') > -1,
      isMSIE: isMSIE,
      isEdge: isEdge,
      isFF: !isEdge && /firefox/i.test(userAgent),
      isPhantom: /PhantomJS/i.test(userAgent),
      isWebkit: !isEdge && /webkit/i.test(userAgent),
      isChrome: !isEdge && /chrome/i.test(userAgent),
      isSafari: !isEdge && /safari/i.test(userAgent),
      browserVersion: browserVersion,
      jqueryVersion: parseFloat($$1.fn.jquery),
      isSupportAmd: isSupportAmd,
      isSupportTouch: isSupportTouch,
      hasCodeMirror: hasCodeMirror,
      isFontInstalled: isFontInstalled,
      isW3CRangeSupport: !!document.createRange,
      inputEventName: inputEventName
  };

  /**
   * @class core.func
   *
   * func utils (for high-order func's arg)
   *
   * @singleton
   * @alternateClassName func
   */
  function eq(itemA) {
      return function (itemB) {
          return itemA === itemB;
      };
  }
  function eq2(itemA, itemB) {
      return itemA === itemB;
  }
  function peq2(propName) {
      return function (itemA, itemB) {
          return itemA[propName] === itemB[propName];
      };
  }
  function ok() {
      return true;
  }
  function fail() {
      return false;
  }
  function not(f) {
      return function () {
          return !f.apply(f, arguments);
      };
  }
  function and(fA, fB) {
      return function (item) {
          return fA(item) && fB(item);
      };
  }
  function self(a) {
      return a;
  }
  function invoke(obj, method) {
      return function () {
          return obj[method].apply(obj, arguments);
      };
  }
  var idCounter = 0;
  /**
   * generate a globally-unique id
   *
   * @param {String} [prefix]
   */
  function uniqueId(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
  }
  /**
   * returns bnd (bounds) from rect
   *
   * - IE Compatibility Issue: http://goo.gl/sRLOAo
   * - Scroll Issue: http://goo.gl/sNjUc
   *
   * @param {Rect} rect
   * @return {Object} bounds
   * @return {Number} bounds.top
   * @return {Number} bounds.left
   * @return {Number} bounds.width
   * @return {Number} bounds.height
   */
  function rect2bnd(rect) {
      var $document = $(document);
      return {
          top: rect.top + $document.scrollTop(),
          left: rect.left + $document.scrollLeft(),
          width: rect.right - rect.left,
          height: rect.bottom - rect.top
      };
  }
  /**
   * returns a copy of the object where the keys have become the values and the values the keys.
   * @param {Object} obj
   * @return {Object}
   */
  function invertObject(obj) {
      var inverted = {};
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              inverted[obj[key]] = key;
          }
      }
      return inverted;
  }
  /**
   * @param {String} namespace
   * @param {String} [prefix]
   * @return {String}
   */
  function namespaceToCamel(namespace, prefix) {
      prefix = prefix || '';
      return prefix + namespace.split('.').map(function (name) {
          return name.substring(0, 1).toUpperCase() + name.substring(1);
      }).join('');
  }
  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   * @param {Function} func
   * @param {Number} wait
   * @param {Boolean} immediate
   * @return {Function}
   */
  function debounce(func, wait, immediate) {
      var timeout;
      return function () {
          var context = this;
          var args = arguments;
          var later = function () {
              timeout = null;
              if (!immediate) {
                  func.apply(context, args);
              }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) {
              func.apply(context, args);
          }
      };
  }
  /**
   *
   * @param {String} url
   * @return {Boolean}
   */
  function isValidUrl(url) {
      var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
      return expression.test(url);
  }
  var func = {
      eq: eq,
      eq2: eq2,
      peq2: peq2,
      ok: ok,
      fail: fail,
      self: self,
      not: not,
      and: and,
      invoke: invoke,
      uniqueId: uniqueId,
      rect2bnd: rect2bnd,
      invertObject: invertObject,
      namespaceToCamel: namespaceToCamel,
      debounce: debounce,
      isValidUrl: isValidUrl
  };

  /**
   * returns the first item of an array.
   *
   * @param {Array} array
   */
  function head(array) {
      return array[0];
  }
  /**
   * returns the last item of an array.
   *
   * @param {Array} array
   */
  function last(array) {
      return array[array.length - 1];
  }
  /**
   * returns everything but the last entry of the array.
   *
   * @param {Array} array
   */
  function initial(array) {
      return array.slice(0, array.length - 1);
  }
  /**
   * returns the rest of the items in an array.
   *
   * @param {Array} array
   */
  function tail(array) {
      return array.slice(1);
  }
  /**
   * returns item of array
   */
  function find(array, pred) {
      for (var idx = 0, len = array.length; idx < len; idx++) {
          var item = array[idx];
          if (pred(item)) {
              return item;
          }
      }
  }
  /**
   * returns true if all of the values in the array pass the predicate truth test.
   */
  function all(array, pred) {
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (!pred(array[idx])) {
              return false;
          }
      }
      return true;
  }
  /**
   * returns true if the value is present in the list.
   */
  function contains(array, item) {
      if (array && array.length && item) {
          return array.indexOf(item) !== -1;
      }
      return false;
  }
  /**
   * get sum from a list
   *
   * @param {Array} array - array
   * @param {Function} fn - iterator
   */
  function sum(array, fn) {
      fn = fn || func.self;
      return array.reduce(function (memo, v) {
          return memo + fn(v);
      }, 0);
  }
  /**
   * returns a copy of the collection with array type.
   * @param {Collection} collection - collection eg) node.childNodes, ...
   */
  function from(collection) {
      var result = [];
      var length = collection.length;
      var idx = -1;
      while (++idx < length) {
          result[idx] = collection[idx];
      }
      return result;
  }
  /**
   * returns whether list is empty or not
   */
  function isEmpty(array) {
      return !array || !array.length;
  }
  /**
   * cluster elements by predicate function.
   *
   * @param {Array} array - array
   * @param {Function} fn - predicate function for cluster rule
   * @param {Array[]}
   */
  function clusterBy(array, fn) {
      if (!array.length) {
          return [];
      }
      var aTail = tail(array);
      return aTail.reduce(function (memo, v) {
          var aLast = last(memo);
          if (fn(last(aLast), v)) {
              aLast[aLast.length] = v;
          }
          else {
              memo[memo.length] = [v];
          }
          return memo;
      }, [[head(array)]]);
  }
  /**
   * returns a copy of the array with all false values removed
   *
   * @param {Array} array - array
   * @param {Function} fn - predicate function for cluster rule
   */
  function compact(array) {
      var aResult = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (array[idx]) {
              aResult.push(array[idx]);
          }
      }
      return aResult;
  }
  /**
   * produces a duplicate-free version of the array
   *
   * @param {Array} array
   */
  function unique(array) {
      var results = [];
      for (var idx = 0, len = array.length; idx < len; idx++) {
          if (!contains(results, array[idx])) {
              results.push(array[idx]);
          }
      }
      return results;
  }
  /**
   * returns next item.
   * @param {Array} array
   */
  function next(array, item) {
      if (array && array.length && item) {
          var idx = array.indexOf(item);
          return idx === -1 ? null : array[idx + 1];
      }
      return null;
  }
  /**
   * returns prev item.
   * @param {Array} array
   */
  function prev(array, item) {
      if (array && array.length && item) {
          var idx = array.indexOf(item);
          return idx === -1 ? null : array[idx - 1];
      }
      return null;
  }
  /**
   * @class core.list
   *
   * list utils
   *
   * @singleton
   * @alternateClassName list
   */
  var lists = {
      head: head,
      last: last,
      initial: initial,
      tail: tail,
      prev: prev,
      next: next,
      find: find,
      contains: contains,
      all: all,
      sum: sum,
      from: from,
      isEmpty: isEmpty,
      clusterBy: clusterBy,
      compact: compact,
      unique: unique
  };

  var NBSP_CHAR = String.fromCharCode(160);
  var ZERO_WIDTH_NBSP_CHAR = '\ufeff';
  /**
   * @method isEditable
   *
   * returns whether node is `note-editable` or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isEditable(node) {
      return node && $$1(node).hasClass('note-editable');
  }
  /**
   * @method isControlSizing
   *
   * returns whether node is `note-control-sizing` or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isControlSizing(node) {
      return node && $$1(node).hasClass('note-control-sizing');
  }
  /**
   * @method makePredByNodeName
   *
   * returns predicate which judge whether nodeName is same
   *
   * @param {String} nodeName
   * @return {Function}
   */
  function makePredByNodeName(nodeName) {
      nodeName = nodeName.toUpperCase();
      return function (node) {
          return node && node.nodeName.toUpperCase() === nodeName;
      };
  }
  /**
   * @method isText
   *
   *
   *
   * @param {Node} node
   * @return {Boolean} true if node's type is text(3)
   */
  function isText(node) {
      return node && node.nodeType === 3;
  }
  /**
   * @method isElement
   *
   *
   *
   * @param {Node} node
   * @return {Boolean} true if node's type is element(1)
   */
  function isElement(node) {
      return node && node.nodeType === 1;
  }
  /**
   * ex) br, col, embed, hr, img, input, ...
   * @see http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
   */
  function isVoid(node) {
      return node && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(node.nodeName.toUpperCase());
  }
  function isPara(node) {
      if (isEditable(node)) {
          return false;
      }
      // Chrome(v31.0), FF(v25.0.1) use DIV for paragraph
      return node && /^DIV|^P|^LI|^H[1-7]/.test(node.nodeName.toUpperCase());
  }
  function isHeading(node) {
      return node && /^H[1-7]/.test(node.nodeName.toUpperCase());
  }
  var isPre = makePredByNodeName('PRE');
  var isLi = makePredByNodeName('LI');
  function isPurePara(node) {
      return isPara(node) && !isLi(node);
  }
  var isTable = makePredByNodeName('TABLE');
  var isData = makePredByNodeName('DATA');
  function isInline(node) {
      return !isBodyContainer(node) &&
          !isList(node) &&
          !isHr(node) &&
          !isPara(node) &&
          !isTable(node) &&
          !isBlockquote(node) &&
          !isData(node);
  }
  function isList(node) {
      return node && /^UL|^OL/.test(node.nodeName.toUpperCase());
  }
  var isHr = makePredByNodeName('HR');
  function isCell(node) {
      return node && /^TD|^TH/.test(node.nodeName.toUpperCase());
  }
  var isBlockquote = makePredByNodeName('BLOCKQUOTE');
  function isBodyContainer(node) {
      return isCell(node) || isBlockquote(node) || isEditable(node);
  }
  var isAnchor = makePredByNodeName('A');
  function isParaInline(node) {
      return isInline(node) && !!ancestor(node, isPara);
  }
  function isBodyInline(node) {
      return isInline(node) && !ancestor(node, isPara);
  }
  var isBody = makePredByNodeName('BODY');
  /**
   * returns whether nodeB is closest sibling of nodeA
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   * @return {Boolean}
   */
  function isClosestSibling(nodeA, nodeB) {
      return nodeA.nextSibling === nodeB ||
          nodeA.previousSibling === nodeB;
  }
  /**
   * returns array of closest siblings with node
   *
   * @param {Node} node
   * @param {function} [pred] - predicate function
   * @return {Node[]}
   */
  function withClosestSiblings(node, pred) {
      pred = pred || func.ok;
      var siblings = [];
      if (node.previousSibling && pred(node.previousSibling)) {
          siblings.push(node.previousSibling);
      }
      siblings.push(node);
      if (node.nextSibling && pred(node.nextSibling)) {
          siblings.push(node.nextSibling);
      }
      return siblings;
  }
  /**
   * blank HTML for cursor position
   * - [workaround] old IE only works with &nbsp;
   * - [workaround] IE11 and other browser works with bogus br
   */
  var blankHTML = env.isMSIE && env.browserVersion < 11 ? '&nbsp;' : '<br>';
  /**
   * @method nodeLength
   *
   * returns #text's text size or element's childNodes size
   *
   * @param {Node} node
   */
  function nodeLength(node) {
      if (isText(node)) {
          return node.nodeValue.length;
      }
      if (node) {
          return node.childNodes.length;
      }
      return 0;
  }
  /**
   * returns whether node is empty or not.
   *
   * @param {Node} node
   * @return {Boolean}
   */
  function isEmpty$1(node) {
      var len = nodeLength(node);
      if (len === 0) {
          return true;
      }
      else if (!isText(node) && len === 1 && node.innerHTML === blankHTML) {
          // ex) <p><br></p>, <span><br></span>
          return true;
      }
      else if (lists.all(node.childNodes, isText) && node.innerHTML === '') {
          // ex) <p></p>, <span></span>
          return true;
      }
      return false;
  }
  /**
   * padding blankHTML if node is empty (for cursor position)
   */
  function paddingBlankHTML(node) {
      if (!isVoid(node) && !nodeLength(node)) {
          node.innerHTML = blankHTML;
      }
  }
  /**
   * find nearest ancestor predicate hit
   *
   * @param {Node} node
   * @param {Function} pred - predicate function
   */
  function ancestor(node, pred) {
      while (node) {
          if (pred(node)) {
              return node;
          }
          if (isEditable(node)) {
              break;
          }
          node = node.parentNode;
      }
      return null;
  }
  /**
   * find nearest ancestor only single child blood line and predicate hit
   *
   * @param {Node} node
   * @param {Function} pred - predicate function
   */
  function singleChildAncestor(node, pred) {
      node = node.parentNode;
      while (node) {
          if (nodeLength(node) !== 1) {
              break;
          }
          if (pred(node)) {
              return node;
          }
          if (isEditable(node)) {
              break;
          }
          node = node.parentNode;
      }
      return null;
  }
  /**
   * returns new array of ancestor nodes (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [optional] pred - predicate function
   */
  function listAncestor(node, pred) {
      pred = pred || func.fail;
      var ancestors = [];
      ancestor(node, function (el) {
          if (!isEditable(el)) {
              ancestors.push(el);
          }
          return pred(el);
      });
      return ancestors;
  }
  /**
   * find farthest ancestor predicate hit
   */
  function lastAncestor(node, pred) {
      var ancestors = listAncestor(node);
      return lists.last(ancestors.filter(pred));
  }
  /**
   * returns common ancestor node between two nodes.
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   */
  function commonAncestor(nodeA, nodeB) {
      var ancestors = listAncestor(nodeA);
      for (var n = nodeB; n; n = n.parentNode) {
          if (ancestors.indexOf(n) > -1)
              return n;
      }
      return null; // difference document area
  }
  /**
   * listing all previous siblings (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [optional] pred - predicate function
   */
  function listPrev(node, pred) {
      pred = pred || func.fail;
      var nodes = [];
      while (node) {
          if (pred(node)) {
              break;
          }
          nodes.push(node);
          node = node.previousSibling;
      }
      return nodes;
  }
  /**
   * listing next siblings (until predicate hit).
   *
   * @param {Node} node
   * @param {Function} [pred] - predicate function
   */
  function listNext(node, pred) {
      pred = pred || func.fail;
      var nodes = [];
      while (node) {
          if (pred(node)) {
              break;
          }
          nodes.push(node);
          node = node.nextSibling;
      }
      return nodes;
  }
  /**
   * listing descendant nodes
   *
   * @param {Node} node
   * @param {Function} [pred] - predicate function
   */
  function listDescendant(node, pred) {
      var descendants = [];
      pred = pred || func.ok;
      // start DFS(depth first search) with node
      (function fnWalk(current) {
          if (node !== current && pred(current)) {
              descendants.push(current);
          }
          for (var idx = 0, len = current.childNodes.length; idx < len; idx++) {
              fnWalk(current.childNodes[idx]);
          }
      })(node);
      return descendants;
  }
  /**
   * wrap node with new tag.
   *
   * @param {Node} node
   * @param {Node} tagName of wrapper
   * @return {Node} - wrapper
   */
  function wrap(node, wrapperName) {
      var parent = node.parentNode;
      var wrapper = $$1('<' + wrapperName + '>')[0];
      parent.insertBefore(wrapper, node);
      wrapper.appendChild(node);
      return wrapper;
  }
  /**
   * insert node after preceding
   *
   * @param {Node} node
   * @param {Node} preceding - predicate function
   */
  function insertAfter(node, preceding) {
      var next = preceding.nextSibling;
      var parent = preceding.parentNode;
      if (next) {
          parent.insertBefore(node, next);
      }
      else {
          parent.appendChild(node);
      }
      return node;
  }
  /**
   * append elements.
   *
   * @param {Node} node
   * @param {Collection} aChild
   */
  function appendChildNodes(node, aChild) {
      $$1.each(aChild, function (idx, child) {
          node.appendChild(child);
      });
      return node;
  }
  /**
   * returns whether boundaryPoint is left edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isLeftEdgePoint(point) {
      return point.offset === 0;
  }
  /**
   * returns whether boundaryPoint is right edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isRightEdgePoint(point) {
      return point.offset === nodeLength(point.node);
  }
  /**
   * returns whether boundaryPoint is edge or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isEdgePoint(point) {
      return isLeftEdgePoint(point) || isRightEdgePoint(point);
  }
  /**
   * returns whether node is left edge of ancestor or not.
   *
   * @param {Node} node
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isLeftEdgeOf(node, ancestor) {
      while (node && node !== ancestor) {
          if (position(node) !== 0) {
              return false;
          }
          node = node.parentNode;
      }
      return true;
  }
  /**
   * returns whether node is right edge of ancestor or not.
   *
   * @param {Node} node
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isRightEdgeOf(node, ancestor) {
      if (!ancestor) {
          return false;
      }
      while (node && node !== ancestor) {
          if (position(node) !== nodeLength(node.parentNode) - 1) {
              return false;
          }
          node = node.parentNode;
      }
      return true;
  }
  /**
   * returns whether point is left edge of ancestor or not.
   * @param {BoundaryPoint} point
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isLeftEdgePointOf(point, ancestor) {
      return isLeftEdgePoint(point) && isLeftEdgeOf(point.node, ancestor);
  }
  /**
   * returns whether point is right edge of ancestor or not.
   * @param {BoundaryPoint} point
   * @param {Node} ancestor
   * @return {Boolean}
   */
  function isRightEdgePointOf(point, ancestor) {
      return isRightEdgePoint(point) && isRightEdgeOf(point.node, ancestor);
  }
  /**
   * returns offset from parent.
   *
   * @param {Node} node
   */
  function position(node) {
      var offset = 0;
      while ((node = node.previousSibling)) {
          offset += 1;
      }
      return offset;
  }
  function hasChildren(node) {
      return !!(node && node.childNodes && node.childNodes.length);
  }
  /**
   * returns previous boundaryPoint
   *
   * @param {BoundaryPoint} point
   * @param {Boolean} isSkipInnerOffset
   * @return {BoundaryPoint}
   */
  function prevPoint(point, isSkipInnerOffset) {
      var node;
      var offset;
      if (point.offset === 0) {
          if (isEditable(point.node)) {
              return null;
          }
          node = point.node.parentNode;
          offset = position(point.node);
      }
      else if (hasChildren(point.node)) {
          node = point.node.childNodes[point.offset - 1];
          offset = nodeLength(node);
      }
      else {
          node = point.node;
          offset = isSkipInnerOffset ? 0 : point.offset - 1;
      }
      return {
          node: node,
          offset: offset
      };
  }
  /**
   * returns next boundaryPoint
   *
   * @param {BoundaryPoint} point
   * @param {Boolean} isSkipInnerOffset
   * @return {BoundaryPoint}
   */
  function nextPoint(point, isSkipInnerOffset) {
      var node, offset;
      if (nodeLength(point.node) === point.offset) {
          if (isEditable(point.node)) {
              return null;
          }
          node = point.node.parentNode;
          offset = position(point.node) + 1;
      }
      else if (hasChildren(point.node)) {
          node = point.node.childNodes[point.offset];
          offset = 0;
      }
      else {
          node = point.node;
          offset = isSkipInnerOffset ? nodeLength(point.node) : point.offset + 1;
      }
      return {
          node: node,
          offset: offset
      };
  }
  /**
   * returns whether pointA and pointB is same or not.
   *
   * @param {BoundaryPoint} pointA
   * @param {BoundaryPoint} pointB
   * @return {Boolean}
   */
  function isSamePoint(pointA, pointB) {
      return pointA.node === pointB.node && pointA.offset === pointB.offset;
  }
  /**
   * returns whether point is visible (can set cursor) or not.
   *
   * @param {BoundaryPoint} point
   * @return {Boolean}
   */
  function isVisiblePoint(point) {
      if (isText(point.node) || !hasChildren(point.node) || isEmpty$1(point.node)) {
          return true;
      }
      var leftNode = point.node.childNodes[point.offset - 1];
      var rightNode = point.node.childNodes[point.offset];
      if ((!leftNode || isVoid(leftNode)) && (!rightNode || isVoid(rightNode))) {
          return true;
      }
      return false;
  }
  /**
   * @method prevPointUtil
   *
   * @param {BoundaryPoint} point
   * @param {Function} pred
   * @return {BoundaryPoint}
   */
  function prevPointUntil(point, pred) {
      while (point) {
          if (pred(point)) {
              return point;
          }
          point = prevPoint(point);
      }
      return null;
  }
  /**
   * @method nextPointUntil
   *
   * @param {BoundaryPoint} point
   * @param {Function} pred
   * @return {BoundaryPoint}
   */
  function nextPointUntil(point, pred) {
      while (point) {
          if (pred(point)) {
              return point;
          }
          point = nextPoint(point);
      }
      return null;
  }
  /**
   * returns whether point has character or not.
   *
   * @param {Point} point
   * @return {Boolean}
   */
  function isCharPoint(point) {
      if (!isText(point.node)) {
          return false;
      }
      var ch = point.node.nodeValue.charAt(point.offset - 1);
      return ch && (ch !== ' ' && ch !== NBSP_CHAR);
  }
  /**
   * @method walkPoint
   *
   * @param {BoundaryPoint} startPoint
   * @param {BoundaryPoint} endPoint
   * @param {Function} handler
   * @param {Boolean} isSkipInnerOffset
   */
  function walkPoint(startPoint, endPoint, handler, isSkipInnerOffset) {
      var point = startPoint;
      while (point) {
          handler(point);
          if (isSamePoint(point, endPoint)) {
              break;
          }
          var isSkipOffset = isSkipInnerOffset &&
              startPoint.node !== point.node &&
              endPoint.node !== point.node;
          point = nextPoint(point, isSkipOffset);
      }
  }
  /**
   * @method makeOffsetPath
   *
   * return offsetPath(array of offset) from ancestor
   *
   * @param {Node} ancestor - ancestor node
   * @param {Node} node
   */
  function makeOffsetPath(ancestor, node) {
      var ancestors = listAncestor(node, func.eq(ancestor));
      return ancestors.map(position).reverse();
  }
  /**
   * @method fromOffsetPath
   *
   * return element from offsetPath(array of offset)
   *
   * @param {Node} ancestor - ancestor node
   * @param {array} offsets - offsetPath
   */
  function fromOffsetPath(ancestor, offsets) {
      var current = ancestor;
      for (var i = 0, len = offsets.length; i < len; i++) {
          if (current.childNodes.length <= offsets[i]) {
              current = current.childNodes[current.childNodes.length - 1];
          }
          else {
              current = current.childNodes[offsets[i]];
          }
      }
      return current;
  }
  /**
   * @method splitNode
   *
   * split element or #text
   *
   * @param {BoundaryPoint} point
   * @param {Object} [options]
   * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
   * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
   * @param {Boolean} [options.isDiscardEmptySplits] - default: false
   * @return {Node} right node of boundaryPoint
   */
  function splitNode(point, options) {
      var isSkipPaddingBlankHTML = options && options.isSkipPaddingBlankHTML;
      var isNotSplitEdgePoint = options && options.isNotSplitEdgePoint;
      var isDiscardEmptySplits = options && options.isDiscardEmptySplits;
      if (isDiscardEmptySplits) {
          isSkipPaddingBlankHTML = true;
      }
      // edge case
      if (isEdgePoint(point) && (isText(point.node) || isNotSplitEdgePoint)) {
          if (isLeftEdgePoint(point)) {
              return point.node;
          }
          else if (isRightEdgePoint(point)) {
              return point.node.nextSibling;
          }
      }
      // split #text
      if (isText(point.node)) {
          return point.node.splitText(point.offset);
      }
      else {
          var childNode = point.node.childNodes[point.offset];
          var clone = insertAfter(point.node.cloneNode(false), point.node);
          appendChildNodes(clone, listNext(childNode));
          if (!isSkipPaddingBlankHTML) {
              paddingBlankHTML(point.node);
              paddingBlankHTML(clone);
          }
          if (isDiscardEmptySplits) {
              if (isEmpty$1(point.node)) {
                  remove(point.node);
              }
              if (isEmpty$1(clone)) {
                  remove(clone);
                  return point.node.nextSibling;
              }
          }
          return clone;
      }
  }
  /**
   * @method splitTree
   *
   * split tree by point
   *
   * @param {Node} root - split root
   * @param {BoundaryPoint} point
   * @param {Object} [options]
   * @param {Boolean} [options.isSkipPaddingBlankHTML] - default: false
   * @param {Boolean} [options.isNotSplitEdgePoint] - default: false
   * @return {Node} right node of boundaryPoint
   */
  function splitTree(root, point, options) {
      // ex) [#text, <span>, <p>]
      var ancestors = listAncestor(point.node, func.eq(root));
      if (!ancestors.length) {
          return null;
      }
      else if (ancestors.length === 1) {
          return splitNode(point, options);
      }
      return ancestors.reduce(function (node, parent) {
          if (node === point.node) {
              node = splitNode(point, options);
          }
          return splitNode({
              node: parent,
              offset: node ? position(node) : nodeLength(parent)
          }, options);
      });
  }
  /**
   * split point
   *
   * @param {Point} point
   * @param {Boolean} isInline
   * @return {Object}
   */
  function splitPoint(point, isInline) {
      // find splitRoot, container
      //  - inline: splitRoot is a child of paragraph
      //  - block: splitRoot is a child of bodyContainer
      var pred = isInline ? isPara : isBodyContainer;
      var ancestors = listAncestor(point.node, pred);
      var topAncestor = lists.last(ancestors) || point.node;
      var splitRoot, container;
      if (pred(topAncestor)) {
          splitRoot = ancestors[ancestors.length - 2];
          container = topAncestor;
      }
      else {
          splitRoot = topAncestor;
          container = splitRoot.parentNode;
      }
      // if splitRoot is exists, split with splitTree
      var pivot = splitRoot && splitTree(splitRoot, point, {
          isSkipPaddingBlankHTML: isInline,
          isNotSplitEdgePoint: isInline
      });
      // if container is point.node, find pivot with point.offset
      if (!pivot && container === point.node) {
          pivot = point.node.childNodes[point.offset];
      }
      return {
          rightNode: pivot,
          container: container
      };
  }
  function create(nodeName) {
      return document.createElement(nodeName);
  }
  function createText(text) {
      return document.createTextNode(text);
  }
  /**
   * @method remove
   *
   * remove node, (isRemoveChild: remove child or not)
   *
   * @param {Node} node
   * @param {Boolean} isRemoveChild
   */
  function remove(node, isRemoveChild) {
      if (!node || !node.parentNode) {
          return;
      }
      if (node.removeNode) {
          return node.removeNode(isRemoveChild);
      }
      var parent = node.parentNode;
      if (!isRemoveChild) {
          var nodes = [];
          for (var i = 0, len = node.childNodes.length; i < len; i++) {
              nodes.push(node.childNodes[i]);
          }
          for (var i = 0, len = nodes.length; i < len; i++) {
              parent.insertBefore(nodes[i], node);
          }
      }
      parent.removeChild(node);
  }
  /**
   * @method removeWhile
   *
   * @param {Node} node
   * @param {Function} pred
   */
  function removeWhile(node, pred) {
      while (node) {
          if (isEditable(node) || !pred(node)) {
              break;
          }
          var parent = node.parentNode;
          remove(node);
          node = parent;
      }
  }
  /**
   * @method replace
   *
   * replace node with provided nodeName
   *
   * @param {Node} node
   * @param {String} nodeName
   * @return {Node} - new node
   */
  function replace(node, nodeName) {
      if (node.nodeName.toUpperCase() === nodeName.toUpperCase()) {
          return node;
      }
      var newNode = create(nodeName);
      if (node.style.cssText) {
          newNode.style.cssText = node.style.cssText;
      }
      appendChildNodes(newNode, lists.from(node.childNodes));
      insertAfter(newNode, node);
      remove(node);
      return newNode;
  }
  var isTextarea = makePredByNodeName('TEXTAREA');
  /**
   * @param {jQuery} $node
   * @param {Boolean} [stripLinebreaks] - default: false
   */
  function value($node, stripLinebreaks) {
      var val = isTextarea($node[0]) ? $node.val() : $node.html();
      if (stripLinebreaks) {
          return val.replace(/[\n\r]/g, '');
      }
      return val;
  }
  /**
   * @method html
   *
   * get the HTML contents of node
   *
   * @param {jQuery} $node
   * @param {Boolean} [isNewlineOnBlock]
   */
  function html($node, isNewlineOnBlock) {
      var markup = value($node);
      if (isNewlineOnBlock) {
          var regexTag = /<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g;
          markup = markup.replace(regexTag, function (match, endSlash, name) {
              name = name.toUpperCase();
              var isEndOfInlineContainer = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(name) &&
                  !!endSlash;
              var isBlockNode = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(name);
              return match + ((isEndOfInlineContainer || isBlockNode) ? '\n' : '');
          });
          markup = markup.trim();
      }
      return markup;
  }
  function posFromPlaceholder(placeholder) {
      var $placeholder = $$1(placeholder);
      var pos = $placeholder.offset();
      var height = $placeholder.outerHeight(true); // include margin
      return {
          left: pos.left,
          top: pos.top + height
      };
  }
  function attachEvents($node, events) {
      Object.keys(events).forEach(function (key) {
          $node.on(key, events[key]);
      });
  }
  function detachEvents($node, events) {
      Object.keys(events).forEach(function (key) {
          $node.off(key, events[key]);
      });
  }
  /**
   * @method isCustomStyleTag
   *
   * assert if a node contains a "note-styletag" class,
   * which implies that's a custom-made style tag node
   *
   * @param {Node} an HTML DOM node
   */
  function isCustomStyleTag(node) {
      return node && !isText(node) && lists.contains(node.classList, 'note-styletag');
  }
  var dom = {
      /** @property {String} NBSP_CHAR */
      NBSP_CHAR: NBSP_CHAR,
      /** @property {String} ZERO_WIDTH_NBSP_CHAR */
      ZERO_WIDTH_NBSP_CHAR: ZERO_WIDTH_NBSP_CHAR,
      /** @property {String} blank */
      blank: blankHTML,
      /** @property {String} emptyPara */
      emptyPara: "<p>" + blankHTML + "</p>",
      makePredByNodeName: makePredByNodeName,
      isEditable: isEditable,
      isControlSizing: isControlSizing,
      isText: isText,
      isElement: isElement,
      isVoid: isVoid,
      isPara: isPara,
      isPurePara: isPurePara,
      isHeading: isHeading,
      isInline: isInline,
      isBlock: func.not(isInline),
      isBodyInline: isBodyInline,
      isBody: isBody,
      isParaInline: isParaInline,
      isPre: isPre,
      isList: isList,
      isTable: isTable,
      isData: isData,
      isCell: isCell,
      isBlockquote: isBlockquote,
      isBodyContainer: isBodyContainer,
      isAnchor: isAnchor,
      isDiv: makePredByNodeName('DIV'),
      isLi: isLi,
      isBR: makePredByNodeName('BR'),
      isSpan: makePredByNodeName('SPAN'),
      isB: makePredByNodeName('B'),
      isU: makePredByNodeName('U'),
      isS: makePredByNodeName('S'),
      isI: makePredByNodeName('I'),
      isImg: makePredByNodeName('IMG'),
      isTextarea: isTextarea,
      isEmpty: isEmpty$1,
      isEmptyAnchor: func.and(isAnchor, isEmpty$1),
      isClosestSibling: isClosestSibling,
      withClosestSiblings: withClosestSiblings,
      nodeLength: nodeLength,
      isLeftEdgePoint: isLeftEdgePoint,
      isRightEdgePoint: isRightEdgePoint,
      isEdgePoint: isEdgePoint,
      isLeftEdgeOf: isLeftEdgeOf,
      isRightEdgeOf: isRightEdgeOf,
      isLeftEdgePointOf: isLeftEdgePointOf,
      isRightEdgePointOf: isRightEdgePointOf,
      prevPoint: prevPoint,
      nextPoint: nextPoint,
      isSamePoint: isSamePoint,
      isVisiblePoint: isVisiblePoint,
      prevPointUntil: prevPointUntil,
      nextPointUntil: nextPointUntil,
      isCharPoint: isCharPoint,
      walkPoint: walkPoint,
      ancestor: ancestor,
      singleChildAncestor: singleChildAncestor,
      listAncestor: listAncestor,
      lastAncestor: lastAncestor,
      listNext: listNext,
      listPrev: listPrev,
      listDescendant: listDescendant,
      commonAncestor: commonAncestor,
      wrap: wrap,
      insertAfter: insertAfter,
      appendChildNodes: appendChildNodes,
      position: position,
      hasChildren: hasChildren,
      makeOffsetPath: makeOffsetPath,
      fromOffsetPath: fromOffsetPath,
      splitTree: splitTree,
      splitPoint: splitPoint,
      create: create,
      createText: createText,
      remove: remove,
      removeWhile: removeWhile,
      replace: replace,
      html: html,
      value: value,
      posFromPlaceholder: posFromPlaceholder,
      attachEvents: attachEvents,
      detachEvents: detachEvents,
      isCustomStyleTag: isCustomStyleTag
  };

  var Context = /** @class */ (function () {
      /**
       * @param {jQuery} $note
       * @param {Object} options
       */
      function Context($note, options) {
          this.ui = $$1.summernote.ui;
          this.$note = $note;
          this.memos = {};
          this.modules = {};
          this.layoutInfo = {};
          this.options = options;
          this.initialize();
      }
      /**
       * create layout and initialize modules and other resources
       */
      Context.prototype.initialize = function () {
          this.layoutInfo = this.ui.createLayout(this.$note, this.options);
          this._initialize();
          this.$note.hide();
          return this;
      };
      /**
       * destroy modules and other resources and remove layout
       */
      Context.prototype.destroy = function () {
          this._destroy();
          this.$note.removeData('summernote');
          this.ui.removeLayout(this.$note, this.layoutInfo);
      };
      /**
       * destory modules and other resources and initialize it again
       */
      Context.prototype.reset = function () {
          var disabled = this.isDisabled();
          this.code(dom.emptyPara);
          this._destroy();
          this._initialize();
          if (disabled) {
              this.disable();
          }
      };
      Context.prototype._initialize = function () {
          var _this = this;
          // add optional buttons
          var buttons = $$1.extend({}, this.options.buttons);
          Object.keys(buttons).forEach(function (key) {
              _this.memo('button.' + key, buttons[key]);
          });
          var modules = $$1.extend({}, this.options.modules, $$1.summernote.plugins || {});
          // add and initialize modules
          Object.keys(modules).forEach(function (key) {
              _this.module(key, modules[key], true);
          });
          Object.keys(this.modules).forEach(function (key) {
              _this.initializeModule(key);
          });
      };
      Context.prototype._destroy = function () {
          var _this = this;
          // destroy modules with reversed order
          Object.keys(this.modules).reverse().forEach(function (key) {
              _this.removeModule(key);
          });
          Object.keys(this.memos).forEach(function (key) {
              _this.removeMemo(key);
          });
          // trigger custom onDestroy callback
          this.triggerEvent('destroy', this);
      };
      Context.prototype.code = function (html) {
          var isActivated = this.invoke('codeview.isActivated');
          if (html === undefined) {
              this.invoke('codeview.sync');
              return isActivated ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
          }
          else {
              if (isActivated) {
                  this.layoutInfo.codable.val(html);
              }
              else {
                  this.layoutInfo.editable.html(html);
              }
              this.$note.val(html);
              this.triggerEvent('change', html, this.layoutInfo.editable);
          }
      };
      Context.prototype.isDisabled = function () {
          return this.layoutInfo.editable.attr('contenteditable') === 'false';
      };
      Context.prototype.enable = function () {
          this.layoutInfo.editable.attr('contenteditable', true);
          this.invoke('toolbar.activate', true);
          this.triggerEvent('disable', false);
      };
      Context.prototype.disable = function () {
          // close codeview if codeview is opend
          if (this.invoke('codeview.isActivated')) {
              this.invoke('codeview.deactivate');
          }
          this.layoutInfo.editable.attr('contenteditable', false);
          this.invoke('toolbar.deactivate', true);
          this.triggerEvent('disable', true);
      };
      Context.prototype.triggerEvent = function () {
          var namespace = lists.head(arguments);
          var args = lists.tail(lists.from(arguments));
          var callback = this.options.callbacks[func.namespaceToCamel(namespace, 'on')];
          if (callback) {
              callback.apply(this.$note[0], args);
          }
          this.$note.trigger('summernote.' + namespace, args);
      };
      Context.prototype.initializeModule = function (key) {
          var module = this.modules[key];
          module.shouldInitialize = module.shouldInitialize || func.ok;
          if (!module.shouldInitialize()) {
              return;
          }
          // initialize module
          if (module.initialize) {
              module.initialize();
          }
          // attach events
          if (module.events) {
              dom.attachEvents(this.$note, module.events);
          }
      };
      Context.prototype.module = function (key, ModuleClass, withoutIntialize) {
          if (arguments.length === 1) {
              return this.modules[key];
          }
          this.modules[key] = new ModuleClass(this);
          if (!withoutIntialize) {
              this.initializeModule(key);
          }
      };
      Context.prototype.removeModule = function (key) {
          var module = this.modules[key];
          if (module.shouldInitialize()) {
              if (module.events) {
                  dom.detachEvents(this.$note, module.events);
              }
              if (module.destroy) {
                  module.destroy();
              }
          }
          delete this.modules[key];
      };
      Context.prototype.memo = function (key, obj) {
          if (arguments.length === 1) {
              return this.memos[key];
          }
          this.memos[key] = obj;
      };
      Context.prototype.removeMemo = function (key) {
          if (this.memos[key] && this.memos[key].destroy) {
              this.memos[key].destroy();
          }
          delete this.memos[key];
      };
      /**
       * Some buttons need to change their visual style immediately once they get pressed
       */
      Context.prototype.createInvokeHandlerAndUpdateState = function (namespace, value) {
          var _this = this;
          return function (event) {
              _this.createInvokeHandler(namespace, value)(event);
              _this.invoke('buttons.updateCurrentStyle');
          };
      };
      Context.prototype.createInvokeHandler = function (namespace, value) {
          var _this = this;
          return function (event) {
              event.preventDefault();
              var $target = $$1(event.target);
              _this.invoke(namespace, value || $target.closest('[data-value]').data('value'), $target);
          };
      };
      Context.prototype.invoke = function () {
          var namespace = lists.head(arguments);
          var args = lists.tail(lists.from(arguments));
          var splits = namespace.split('.');
          var hasSeparator = splits.length > 1;
          var moduleName = hasSeparator && lists.head(splits);
          var methodName = hasSeparator ? lists.last(splits) : lists.head(splits);
          var module = this.modules[moduleName || 'editor'];
          if (!moduleName && this[methodName]) {
              return this[methodName].apply(this, args);
          }
          else if (module && module[methodName] && module.shouldInitialize()) {
              return module[methodName].apply(module, args);
          }
      };
      return Context;
  }());

  $$1.fn.extend({
      /**
       * Summernote API
       *
       * @param {Object|String}
       * @return {this}
       */
      summernote: function () {
          var type = $$1.type(lists.head(arguments));
          var isExternalAPICalled = type === 'string';
          var hasInitOptions = type === 'object';
          var options = $$1.extend({}, $$1.summernote.options, hasInitOptions ? lists.head(arguments) : {});
          // Update options
          options.langInfo = $$1.extend(true, {}, $$1.summernote.lang['en-US'], $$1.summernote.lang[options.lang]);
          options.icons = $$1.extend(true, {}, $$1.summernote.options.icons, options.icons);
          options.tooltip = options.tooltip === 'auto' ? !env.isSupportTouch : options.tooltip;
          this.each(function (idx, note) {
              var $note = $$1(note);
              if (!$note.data('summernote')) {
                  var context = new Context($note, options);
                  $note.data('summernote', context);
                  $note.data('summernote').triggerEvent('init', context.layoutInfo);
              }
          });
          var $note = this.first();
          if ($note.length) {
              var context = $note.data('summernote');
              if (isExternalAPICalled) {
                  return context.invoke.apply(context, lists.from(arguments));
              }
              else if (options.focus) {
                  context.invoke('editor.focus');
              }
          }
          return this;
      }
  });

  /**
   * return boundaryPoint from TextRange, inspired by Andy Na's HuskyRange.js
   *
   * @param {TextRange} textRange
   * @param {Boolean} isStart
   * @return {BoundaryPoint}
   *
   * @see http://msdn.microsoft.com/en-us/library/ie/ms535872(v=vs.85).aspx
   */
  function textRangeToPoint(textRange, isStart) {
      var container = textRange.parentElement();
      var offset;
      var tester = document.body.createTextRange();
      var prevContainer;
      var childNodes = lists.from(container.childNodes);
      for (offset = 0; offset < childNodes.length; offset++) {
          if (dom.isText(childNodes[offset])) {
              continue;
          }
          tester.moveToElementText(childNodes[offset]);
          if (tester.compareEndPoints('StartToStart', textRange) >= 0) {
              break;
          }
          prevContainer = childNodes[offset];
      }
      if (offset !== 0 && dom.isText(childNodes[offset - 1])) {
          var textRangeStart = document.body.createTextRange();
          var curTextNode = null;
          textRangeStart.moveToElementText(prevContainer || container);
          textRangeStart.collapse(!prevContainer);
          curTextNode = prevContainer ? prevContainer.nextSibling : container.firstChild;
          var pointTester = textRange.duplicate();
          pointTester.setEndPoint('StartToStart', textRangeStart);
          var textCount = pointTester.text.replace(/[\r\n]/g, '').length;
          while (textCount > curTextNode.nodeValue.length && curTextNode.nextSibling) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
          }
          // [workaround] enforce IE to re-reference curTextNode, hack
          var dummy = curTextNode.nodeValue; // eslint-disable-line
          if (isStart && curTextNode.nextSibling && dom.isText(curTextNode.nextSibling) &&
              textCount === curTextNode.nodeValue.length) {
              textCount -= curTextNode.nodeValue.length;
              curTextNode = curTextNode.nextSibling;
          }
          container = curTextNode;
          offset = textCount;
      }
      return {
          cont: container,
          offset: offset
      };
  }
  /**
   * return TextRange from boundary point (inspired by google closure-library)
   * @param {BoundaryPoint} point
   * @return {TextRange}
   */
  function pointToTextRange(point) {
      var textRangeInfo = function (container, offset) {
          var node, isCollapseToStart;
          if (dom.isText(container)) {
              var prevTextNodes = dom.listPrev(container, func.not(dom.isText));
              var prevContainer = lists.last(prevTextNodes).previousSibling;
              node = prevContainer || container.parentNode;
              offset += lists.sum(lists.tail(prevTextNodes), dom.nodeLength);
              isCollapseToStart = !prevContainer;
          }
          else {
              node = container.childNodes[offset] || container;
              if (dom.isText(node)) {
                  return textRangeInfo(node, 0);
              }
              offset = 0;
              isCollapseToStart = false;
          }
          return {
              node: node,
              collapseToStart: isCollapseToStart,
              offset: offset
          };
      };
      var textRange = document.body.createTextRange();
      var info = textRangeInfo(point.node, point.offset);
      textRange.moveToElementText(info.node);
      textRange.collapse(info.collapseToStart);
      textRange.moveStart('character', info.offset);
      return textRange;
  }
  /**
     * Wrapped Range
     *
     * @constructor
     * @param {Node} sc - start container
     * @param {Number} so - start offset
     * @param {Node} ec - end container
     * @param {Number} eo - end offset
     */
  var WrappedRange = /** @class */ (function () {
      function WrappedRange(sc, so, ec, eo) {
          this.sc = sc;
          this.so = so;
          this.ec = ec;
          this.eo = eo;
          // isOnEditable: judge whether range is on editable or not
          this.isOnEditable = this.makeIsOn(dom.isEditable);
          // isOnList: judge whether range is on list node or not
          this.isOnList = this.makeIsOn(dom.isList);
          // isOnAnchor: judge whether range is on anchor node or not
          this.isOnAnchor = this.makeIsOn(dom.isAnchor);
          // isOnCell: judge whether range is on cell node or not
          this.isOnCell = this.makeIsOn(dom.isCell);
          // isOnData: judge whether range is on data node or not
          this.isOnData = this.makeIsOn(dom.isData);
      }
      // nativeRange: get nativeRange from sc, so, ec, eo
      WrappedRange.prototype.nativeRange = function () {
          if (env.isW3CRangeSupport) {
              var w3cRange = document.createRange();
              w3cRange.setStart(this.sc, this.sc.data && this.so > this.sc.data.length ? 0 : this.so);
              w3cRange.setEnd(this.ec, this.sc.data ? Math.min(this.eo, this.sc.data.length) : this.eo);
              return w3cRange;
          }
          else {
              var textRange = pointToTextRange({
                  node: this.sc,
                  offset: this.so
              });
              textRange.setEndPoint('EndToEnd', pointToTextRange({
                  node: this.ec,
                  offset: this.eo
              }));
              return textRange;
          }
      };
      WrappedRange.prototype.getPoints = function () {
          return {
              sc: this.sc,
              so: this.so,
              ec: this.ec,
              eo: this.eo
          };
      };
      WrappedRange.prototype.getStartPoint = function () {
          return {
              node: this.sc,
              offset: this.so
          };
      };
      WrappedRange.prototype.getEndPoint = function () {
          return {
              node: this.ec,
              offset: this.eo
          };
      };
      /**
       * select update visible range
       */
      WrappedRange.prototype.select = function () {
          var nativeRng = this.nativeRange();
          if (env.isW3CRangeSupport) {
              var selection = document.getSelection();
              if (selection.rangeCount > 0) {
                  selection.removeAllRanges();
              }
              selection.addRange(nativeRng);
          }
          else {
              nativeRng.select();
          }
          return this;
      };
      /**
       * Moves the scrollbar to start container(sc) of current range
       *
       * @return {WrappedRange}
       */
      WrappedRange.prototype.scrollIntoView = function (container) {
          var height = $$1(container).height();
          if (container.scrollTop + height < this.sc.offsetTop) {
              container.scrollTop += Math.abs(container.scrollTop + height - this.sc.offsetTop);
          }
          return this;
      };
      /**
       * @return {WrappedRange}
       */
      WrappedRange.prototype.normalize = function () {
          /**
           * @param {BoundaryPoint} point
           * @param {Boolean} isLeftToRight - true: prefer to choose right node
           *                                - false: prefer to choose left node
           * @return {BoundaryPoint}
           */
          var getVisiblePoint = function (point, isLeftToRight) {
              // Just use the given point [XXX:Adhoc]
              //  - case 01. if the point is on the middle of the node
              //  - case 02. if the point is on the right edge and prefer to choose left node
              //  - case 03. if the point is on the left edge and prefer to choose right node
              //  - case 04. if the point is on the right edge and prefer to choose right node but the node is void
              //  - case 05. if the point is on the left edge and prefer to choose left node but the node is void
              //  - case 06. if the point is on the block node and there is no children
              if (dom.isVisiblePoint(point)) {
                  if (!dom.isEdgePoint(point) ||
                      (dom.isRightEdgePoint(point) && !isLeftToRight) ||
                      (dom.isLeftEdgePoint(point) && isLeftToRight) ||
                      (dom.isRightEdgePoint(point) && isLeftToRight && dom.isVoid(point.node.nextSibling)) ||
                      (dom.isLeftEdgePoint(point) && !isLeftToRight && dom.isVoid(point.node.previousSibling)) ||
                      (dom.isBlock(point.node) && dom.isEmpty(point.node))) {
                      return point;
                  }
              }
              // point on block's edge
              var block = dom.ancestor(point.node, dom.isBlock);
              if (((dom.isLeftEdgePointOf(point, block) || dom.isVoid(dom.prevPoint(point).node)) && !isLeftToRight) ||
                  ((dom.isRightEdgePointOf(point, block) || dom.isVoid(dom.nextPoint(point).node)) && isLeftToRight)) {
                  // returns point already on visible point
                  if (dom.isVisiblePoint(point)) {
                      return point;
                  }
                  // reverse direction
                  isLeftToRight = !isLeftToRight;
              }
              var nextPoint = isLeftToRight ? dom.nextPointUntil(dom.nextPoint(point), dom.isVisiblePoint)
                  : dom.prevPointUntil(dom.prevPoint(point), dom.isVisiblePoint);
              return nextPoint || point;
          };
          var endPoint = getVisiblePoint(this.getEndPoint(), false);
          var startPoint = this.isCollapsed() ? endPoint : getVisiblePoint(this.getStartPoint(), true);
          return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      };
      /**
       * returns matched nodes on range
       *
       * @param {Function} [pred] - predicate function
       * @param {Object} [options]
       * @param {Boolean} [options.includeAncestor]
       * @param {Boolean} [options.fullyContains]
       * @return {Node[]}
       */
      WrappedRange.prototype.nodes = function (pred, options) {
          pred = pred || func.ok;
          var includeAncestor = options && options.includeAncestor;
          var fullyContains = options && options.fullyContains;
          // TODO compare points and sort
          var startPoint = this.getStartPoint();
          var endPoint = this.getEndPoint();
          var nodes = [];
          var leftEdgeNodes = [];
          dom.walkPoint(startPoint, endPoint, function (point) {
              if (dom.isEditable(point.node)) {
                  return;
              }
              var node;
              if (fullyContains) {
                  if (dom.isLeftEdgePoint(point)) {
                      leftEdgeNodes.push(point.node);
                  }
                  if (dom.isRightEdgePoint(point) && lists.contains(leftEdgeNodes, point.node)) {
                      node = point.node;
                  }
              }
              else if (includeAncestor) {
                  node = dom.ancestor(point.node, pred);
              }
              else {
                  node = point.node;
              }
              if (node && pred(node)) {
                  nodes.push(node);
              }
          }, true);
          return lists.unique(nodes);
      };
      /**
       * returns commonAncestor of range
       * @return {Element} - commonAncestor
       */
      WrappedRange.prototype.commonAncestor = function () {
          return dom.commonAncestor(this.sc, this.ec);
      };
      /**
       * returns expanded range by pred
       *
       * @param {Function} pred - predicate function
       * @return {WrappedRange}
       */
      WrappedRange.prototype.expand = function (pred) {
          var startAncestor = dom.ancestor(this.sc, pred);
          var endAncestor = dom.ancestor(this.ec, pred);
          if (!startAncestor && !endAncestor) {
              return new WrappedRange(this.sc, this.so, this.ec, this.eo);
          }
          var boundaryPoints = this.getPoints();
          if (startAncestor) {
              boundaryPoints.sc = startAncestor;
              boundaryPoints.so = 0;
          }
          if (endAncestor) {
              boundaryPoints.ec = endAncestor;
              boundaryPoints.eo = dom.nodeLength(endAncestor);
          }
          return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
      };
      /**
       * @param {Boolean} isCollapseToStart
       * @return {WrappedRange}
       */
      WrappedRange.prototype.collapse = function (isCollapseToStart) {
          if (isCollapseToStart) {
              return new WrappedRange(this.sc, this.so, this.sc, this.so);
          }
          else {
              return new WrappedRange(this.ec, this.eo, this.ec, this.eo);
          }
      };
      /**
       * splitText on range
       */
      WrappedRange.prototype.splitText = function () {
          var isSameContainer = this.sc === this.ec;
          var boundaryPoints = this.getPoints();
          if (dom.isText(this.ec) && !dom.isEdgePoint(this.getEndPoint())) {
              this.ec.splitText(this.eo);
          }
          if (dom.isText(this.sc) && !dom.isEdgePoint(this.getStartPoint())) {
              boundaryPoints.sc = this.sc.splitText(this.so);
              boundaryPoints.so = 0;
              if (isSameContainer) {
                  boundaryPoints.ec = boundaryPoints.sc;
                  boundaryPoints.eo = this.eo - this.so;
              }
          }
          return new WrappedRange(boundaryPoints.sc, boundaryPoints.so, boundaryPoints.ec, boundaryPoints.eo);
      };
      /**
       * delete contents on range
       * @return {WrappedRange}
       */
      WrappedRange.prototype.deleteContents = function () {
          if (this.isCollapsed()) {
              return this;
          }
          var rng = this.splitText();
          var nodes = rng.nodes(null, {
              fullyContains: true
          });
          // find new cursor point
          var point = dom.prevPointUntil(rng.getStartPoint(), function (point) {
              return !lists.contains(nodes, point.node);
          });
          var emptyParents = [];
          $$1.each(nodes, function (idx, node) {
              // find empty parents
              var parent = node.parentNode;
              if (point.node !== parent && dom.nodeLength(parent) === 1) {
                  emptyParents.push(parent);
              }
              dom.remove(node, false);
          });
          // remove empty parents
          $$1.each(emptyParents, function (idx, node) {
              dom.remove(node, false);
          });
          return new WrappedRange(point.node, point.offset, point.node, point.offset).normalize();
      };
      /**
       * makeIsOn: return isOn(pred) function
       */
      WrappedRange.prototype.makeIsOn = function (pred) {
          return function () {
              var ancestor = dom.ancestor(this.sc, pred);
              return !!ancestor && (ancestor === dom.ancestor(this.ec, pred));
          };
      };
      /**
       * @param {Function} pred
       * @return {Boolean}
       */
      WrappedRange.prototype.isLeftEdgeOf = function (pred) {
          if (!dom.isLeftEdgePoint(this.getStartPoint())) {
              return false;
          }
          var node = dom.ancestor(this.sc, pred);
          return node && dom.isLeftEdgeOf(this.sc, node);
      };
      /**
       * returns whether range was collapsed or not
       */
      WrappedRange.prototype.isCollapsed = function () {
          return this.sc === this.ec && this.so === this.eo;
      };
      /**
       * wrap inline nodes which children of body with paragraph
       *
       * @return {WrappedRange}
       */
      WrappedRange.prototype.wrapBodyInlineWithPara = function () {
          if (dom.isBodyContainer(this.sc) && dom.isEmpty(this.sc)) {
              this.sc.innerHTML = dom.emptyPara;
              return new WrappedRange(this.sc.firstChild, 0, this.sc.firstChild, 0);
          }
          /**
           * [workaround] firefox often create range on not visible point. so normalize here.
           *  - firefox: |<p>text</p>|
           *  - chrome: <p>|text|</p>
           */
          var rng = this.normalize();
          if (dom.isParaInline(this.sc) || dom.isPara(this.sc)) {
              return rng;
          }
          // find inline top ancestor
          var topAncestor;
          if (dom.isInline(rng.sc)) {
              var ancestors = dom.listAncestor(rng.sc, func.not(dom.isInline));
              topAncestor = lists.last(ancestors);
              if (!dom.isInline(topAncestor)) {
                  topAncestor = ancestors[ancestors.length - 2] || rng.sc.childNodes[rng.so];
              }
          }
          else {
              topAncestor = rng.sc.childNodes[rng.so > 0 ? rng.so - 1 : 0];
          }
          // siblings not in paragraph
          var inlineSiblings = dom.listPrev(topAncestor, dom.isParaInline).reverse();
          inlineSiblings = inlineSiblings.concat(dom.listNext(topAncestor.nextSibling, dom.isParaInline));
          // wrap with paragraph
          if (inlineSiblings.length) {
              var para = dom.wrap(lists.head(inlineSiblings), 'p');
              dom.appendChildNodes(para, lists.tail(inlineSiblings));
          }
          return this.normalize();
      };
      /**
       * insert node at current cursor
       *
       * @param {Node} node
       * @return {Node}
       */
      WrappedRange.prototype.insertNode = function (node) {
          var rng = this.wrapBodyInlineWithPara().deleteContents();
          var info = dom.splitPoint(rng.getStartPoint(), dom.isInline(node));
          if (info.rightNode) {
              info.rightNode.parentNode.insertBefore(node, info.rightNode);
          }
          else {
              info.container.appendChild(node);
          }
          return node;
      };
      /**
       * insert html at current cursor
       */
      WrappedRange.prototype.pasteHTML = function (markup) {
          var contentsContainer = $$1('<div></div>').html(markup)[0];
          var childNodes = lists.from(contentsContainer.childNodes);
          var rng = this.wrapBodyInlineWithPara().deleteContents();
          if (rng.so > 0) {
              childNodes = childNodes.reverse();
          }
          childNodes = childNodes.map(function (childNode) {
              return rng.insertNode(childNode);
          });
          if (rng.so > 0) {
              childNodes = childNodes.reverse();
          }
          return childNodes;
      };
      /**
       * returns text in range
       *
       * @return {String}
       */
      WrappedRange.prototype.toString = function () {
          var nativeRng = this.nativeRange();
          return env.isW3CRangeSupport ? nativeRng.toString() : nativeRng.text;
      };
      /**
       * returns range for word before cursor
       *
       * @param {Boolean} [findAfter] - find after cursor, default: false
       * @return {WrappedRange}
       */
      WrappedRange.prototype.getWordRange = function (findAfter) {
          var endPoint = this.getEndPoint();
          if (!dom.isCharPoint(endPoint)) {
              return this;
          }
          var startPoint = dom.prevPointUntil(endPoint, function (point) {
              return !dom.isCharPoint(point);
          });
          if (findAfter) {
              endPoint = dom.nextPointUntil(endPoint, function (point) {
                  return !dom.isCharPoint(point);
              });
          }
          return new WrappedRange(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset);
      };
      /**
       * create offsetPath bookmark
       *
       * @param {Node} editable
       */
      WrappedRange.prototype.bookmark = function (editable) {
          return {
              s: {
                  path: dom.makeOffsetPath(editable, this.sc),
                  offset: this.so
              },
              e: {
                  path: dom.makeOffsetPath(editable, this.ec),
                  offset: this.eo
              }
          };
      };
      /**
       * create offsetPath bookmark base on paragraph
       *
       * @param {Node[]} paras
       */
      WrappedRange.prototype.paraBookmark = function (paras) {
          return {
              s: {
                  path: lists.tail(dom.makeOffsetPath(lists.head(paras), this.sc)),
                  offset: this.so
              },
              e: {
                  path: lists.tail(dom.makeOffsetPath(lists.last(paras), this.ec)),
                  offset: this.eo
              }
          };
      };
      /**
       * getClientRects
       * @return {Rect[]}
       */
      WrappedRange.prototype.getClientRects = function () {
          var nativeRng = this.nativeRange();
          return nativeRng.getClientRects();
      };
      return WrappedRange;
  }());
  /**
   * Data structure
   *  * BoundaryPoint: a point of dom tree
   *  * BoundaryPoints: two boundaryPoints corresponding to the start and the end of the Range
   *
   * See to http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Position
   */
  var range = {
      /**
       * create Range Object From arguments or Browser Selection
       *
       * @param {Node} sc - start container
       * @param {Number} so - start offset
       * @param {Node} ec - end container
       * @param {Number} eo - end offset
       * @return {WrappedRange}
       */
      create: function (sc, so, ec, eo) {
          if (arguments.length === 4) {
              return new WrappedRange(sc, so, ec, eo);
          }
          else if (arguments.length === 2) { // collapsed
              ec = sc;
              eo = so;
              return new WrappedRange(sc, so, ec, eo);
          }
          else {
              var wrappedRange = this.createFromSelection();
              if (!wrappedRange && arguments.length === 1) {
                  wrappedRange = this.createFromNode(arguments[0]);
                  return wrappedRange.collapse(dom.emptyPara === arguments[0].innerHTML);
              }
              return wrappedRange;
          }
      },
      createFromSelection: function () {
          var sc, so, ec, eo;
          if (env.isW3CRangeSupport) {
              var selection = document.getSelection();
              if (!selection || selection.rangeCount === 0) {
                  return null;
              }
              else if (dom.isBody(selection.anchorNode)) {
                  // Firefox: returns entire body as range on initialization.
                  // We won't never need it.
                  return null;
              }
              var nativeRng = selection.getRangeAt(0);
              sc = nativeRng.startContainer;
              so = nativeRng.startOffset;
              ec = nativeRng.endContainer;
              eo = nativeRng.endOffset;
          }
          else { // IE8: TextRange
              var textRange = document.selection.createRange();
              var textRangeEnd = textRange.duplicate();
              textRangeEnd.collapse(false);
              var textRangeStart = textRange;
              textRangeStart.collapse(true);
              var startPoint = textRangeToPoint(textRangeStart, true);
              var endPoint = textRangeToPoint(textRangeEnd, false);
              // same visible point case: range was collapsed.
              if (dom.isText(startPoint.node) && dom.isLeftEdgePoint(startPoint) &&
                  dom.isTextNode(endPoint.node) && dom.isRightEdgePoint(endPoint) &&
                  endPoint.node.nextSibling === startPoint.node) {
                  startPoint = endPoint;
              }
              sc = startPoint.cont;
              so = startPoint.offset;
              ec = endPoint.cont;
              eo = endPoint.offset;
          }
          return new WrappedRange(sc, so, ec, eo);
      },
      /**
       * @method
       *
       * create WrappedRange from node
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNode: function (node) {
          var sc = node;
          var so = 0;
          var ec = node;
          var eo = dom.nodeLength(ec);
          // browsers can't target a picture or void node
          if (dom.isVoid(sc)) {
              so = dom.listPrev(sc).length - 1;
              sc = sc.parentNode;
          }
          if (dom.isBR(ec)) {
              eo = dom.listPrev(ec).length - 1;
              ec = ec.parentNode;
          }
          else if (dom.isVoid(ec)) {
              eo = dom.listPrev(ec).length;
              ec = ec.parentNode;
          }
          return this.create(sc, so, ec, eo);
      },
      /**
       * create WrappedRange from node after position
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNodeBefore: function (node) {
          return this.createFromNode(node).collapse(true);
      },
      /**
       * create WrappedRange from node after position
       *
       * @param {Node} node
       * @return {WrappedRange}
       */
      createFromNodeAfter: function (node) {
          return this.createFromNode(node).collapse();
      },
      /**
       * @method
       *
       * create WrappedRange from bookmark
       *
       * @param {Node} editable
       * @param {Object} bookmark
       * @return {WrappedRange}
       */
      createFromBookmark: function (editable, bookmark) {
          var sc = dom.fromOffsetPath(editable, bookmark.s.path);
          var so = bookmark.s.offset;
          var ec = dom.fromOffsetPath(editable, bookmark.e.path);
          var eo = bookmark.e.offset;
          return new WrappedRange(sc, so, ec, eo);
      },
      /**
       * @method
       *
       * create WrappedRange from paraBookmark
       *
       * @param {Object} bookmark
       * @param {Node[]} paras
       * @return {WrappedRange}
       */
      createFromParaBookmark: function (bookmark, paras) {
          var so = bookmark.s.offset;
          var eo = bookmark.e.offset;
          var sc = dom.fromOffsetPath(lists.head(paras), bookmark.s.path);
          var ec = dom.fromOffsetPath(lists.last(paras), bookmark.e.path);
          return new WrappedRange(sc, so, ec, eo);
      }
  };

  var KEY_MAP = {
      'BACKSPACE': 8,
      'TAB': 9,
      'ENTER': 13,
      'SPACE': 32,
      'DELETE': 46,
      // Arrow
      'LEFT': 37,
      'UP': 38,
      'RIGHT': 39,
      'DOWN': 40,
      // Number: 0-9
      'NUM0': 48,
      'NUM1': 49,
      'NUM2': 50,
      'NUM3': 51,
      'NUM4': 52,
      'NUM5': 53,
      'NUM6': 54,
      'NUM7': 55,
      'NUM8': 56,
      // Alphabet: a-z
      'B': 66,
      'E': 69,
      'I': 73,
      'J': 74,
      'K': 75,
      'L': 76,
      'R': 82,
      'S': 83,
      'U': 85,
      'V': 86,
      'Y': 89,
      'Z': 90,
      'SLASH': 191,
      'LEFTBRACKET': 219,
      'BACKSLASH': 220,
      'RIGHTBRACKET': 221
  };
  /**
   * @class core.key
   *
   * Object for keycodes.
   *
   * @singleton
   * @alternateClassName key
   */
  var key = {
      /**
       * @method isEdit
       *
       * @param {Number} keyCode
       * @return {Boolean}
       */
      isEdit: function (keyCode) {
          return lists.contains([
              KEY_MAP.BACKSPACE,
              KEY_MAP.TAB,
              KEY_MAP.ENTER,
              KEY_MAP.SPACE,
              KEY_MAP.DELETE,
          ], keyCode);
      },
      /**
       * @method isMove
       *
       * @param {Number} keyCode
       * @return {Boolean}
       */
      isMove: function (keyCode) {
          return lists.contains([
              KEY_MAP.LEFT,
              KEY_MAP.UP,
              KEY_MAP.RIGHT,
              KEY_MAP.DOWN,
          ], keyCode);
      },
      /**
       * @property {Object} nameFromCode
       * @property {String} nameFromCode.8 "BACKSPACE"
       */
      nameFromCode: func.invertObject(KEY_MAP),
      code: KEY_MAP
  };

  /**
   * @method readFileAsDataURL
   *
   * read contents of file as representing URL
   *
   * @param {File} file
   * @return {Promise} - then: dataUrl
   */
  function readFileAsDataURL(file) {
      return $$1.Deferred(function (deferred) {
          $$1.extend(new FileReader(), {
              onload: function (e) {
                  var dataURL = e.target.result;
                  deferred.resolve(dataURL);
              },
              onerror: function (err) {
                  deferred.reject(err);
              }
          }).readAsDataURL(file);
      }).promise();
  }
  /**
   * @method createImage
   *
   * create `<image>` from url string
   *
   * @param {String} url
   * @return {Promise} - then: $image
   */
  function createImage(url) {
      return $$1.Deferred(function (deferred) {
          var $img = $$1('<img>');
          $img.one('load', function () {
              $img.off('error abort');
              deferred.resolve($img);
          }).one('error abort', function () {
              $img.off('load').detach();
              deferred.reject($img);
          }).css({
              display: 'none'
          }).appendTo(document.body).attr('src', url);
      }).promise();
  }

  var History = /** @class */ (function () {
      function History($editable) {
          this.stack = [];
          this.stackOffset = -1;
          this.$editable = $editable;
          this.editable = $editable[0];
      }
      History.prototype.makeSnapshot = function () {
          var rng = range.create(this.editable);
          var emptyBookmark = { s: { path: [], offset: 0 }, e: { path: [], offset: 0 } };
          return {
              contents: this.$editable.html(),
              bookmark: ((rng && rng.isOnEditable()) ? rng.bookmark(this.editable) : emptyBookmark)
          };
      };
      History.prototype.applySnapshot = function (snapshot) {
          if (snapshot.contents !== null) {
              this.$editable.html(snapshot.contents);
          }
          if (snapshot.bookmark !== null) {
              range.createFromBookmark(this.editable, snapshot.bookmark).select();
          }
      };
      /**
      * @method rewind
      * Rewinds the history stack back to the first snapshot taken.
      * Leaves the stack intact, so that "Redo" can still be used.
      */
      History.prototype.rewind = function () {
          // Create snap shot if not yet recorded
          if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
              this.recordUndo();
          }
          // Return to the first available snapshot.
          this.stackOffset = 0;
          // Apply that snapshot.
          this.applySnapshot(this.stack[this.stackOffset]);
      };
      /**
      *  @method commit
      *  Resets history stack, but keeps current editor's content.
      */
      History.prototype.commit = function () {
          // Clear the stack.
          this.stack = [];
          // Restore stackOffset to its original value.
          this.stackOffset = -1;
          // Record our first snapshot (of nothing).
          this.recordUndo();
      };
      /**
      * @method reset
      * Resets the history stack completely; reverting to an empty editor.
      */
      History.prototype.reset = function () {
          // Clear the stack.
          this.stack = [];
          // Restore stackOffset to its original value.
          this.stackOffset = -1;
          // Clear the editable area.
          this.$editable.html('');
          // Record our first snapshot (of nothing).
          this.recordUndo();
      };
      /**
       * undo
       */
      History.prototype.undo = function () {
          // Create snap shot if not yet recorded
          if (this.$editable.html() !== this.stack[this.stackOffset].contents) {
              this.recordUndo();
          }
          if (this.stackOffset > 0) {
              this.stackOffset--;
              this.applySnapshot(this.stack[this.stackOffset]);
          }
      };
      /**
       * redo
       */
      History.prototype.redo = function () {
          if (this.stack.length - 1 > this.stackOffset) {
              this.stackOffset++;
              this.applySnapshot(this.stack[this.stackOffset]);
          }
      };
      /**
       * recorded undo
       */
      History.prototype.recordUndo = function () {
          this.stackOffset++;
          // Wash out stack after stackOffset
          if (this.stack.length > this.stackOffset) {
              this.stack = this.stack.slice(0, this.stackOffset);
          }
          // Create new snapshot and push it to the end
          this.stack.push(this.makeSnapshot());
      };
      return History;
  }());

  var Style = /** @class */ (function () {
      function Style() {
      }
      /**
       * @method jQueryCSS
       *
       * [workaround] for old jQuery
       * passing an array of style properties to .css()
       * will result in an object of property-value pairs.
       * (compability with version < 1.9)
       *
       * @private
       * @param  {jQuery} $obj
       * @param  {Array} propertyNames - An array of one or more CSS properties.
       * @return {Object}
       */
      Style.prototype.jQueryCSS = function ($obj, propertyNames) {
          if (env.jqueryVersion < 1.9) {
              var result_1 = {};
              $$1.each(propertyNames, function (idx, propertyName) {
                  result_1[propertyName] = $obj.css(propertyName);
              });
              return result_1;
          }
          return $obj.css(propertyNames);
      };
      /**
       * returns style object from node
       *
       * @param {jQuery} $node
       * @return {Object}
       */
      Style.prototype.fromNode = function ($node) {
          var properties = ['font-family', 'font-size', 'text-align', 'list-style-type', 'line-height'];
          var styleInfo = this.jQueryCSS($node, properties) || {};
          styleInfo['font-size'] = parseInt(styleInfo['font-size'], 10);
          return styleInfo;
      };
      /**
       * paragraph level style
       *
       * @param {WrappedRange} rng
       * @param {Object} styleInfo
       */
      Style.prototype.stylePara = function (rng, styleInfo) {
          $$1.each(rng.nodes(dom.isPara, {
              includeAncestor: true
          }), function (idx, para) {
              $$1(para).css(styleInfo);
          });
      };
      /**
       * insert and returns styleNodes on range.
       *
       * @param {WrappedRange} rng
       * @param {Object} [options] - options for styleNodes
       * @param {String} [options.nodeName] - default: `SPAN`
       * @param {Boolean} [options.expandClosestSibling] - default: `false`
       * @param {Boolean} [options.onlyPartialContains] - default: `false`
       * @return {Node[]}
       */
      Style.prototype.styleNodes = function (rng, options) {
          rng = rng.splitText();
          var nodeName = (options && options.nodeName) || 'SPAN';
          var expandClosestSibling = !!(options && options.expandClosestSibling);
          var onlyPartialContains = !!(options && options.onlyPartialContains);
          if (rng.isCollapsed()) {
              return [rng.insertNode(dom.create(nodeName))];
          }
          var pred = dom.makePredByNodeName(nodeName);
          var nodes = rng.nodes(dom.isText, {
              fullyContains: true
          }).map(function (text) {
              return dom.singleChildAncestor(text, pred) || dom.wrap(text, nodeName);
          });
          if (expandClosestSibling) {
              if (onlyPartialContains) {
                  var nodesInRange_1 = rng.nodes();
                  // compose with partial contains predication
                  pred = func.and(pred, function (node) {
                      return lists.contains(nodesInRange_1, node);
                  });
              }
              return nodes.map(function (node) {
                  var siblings = dom.withClosestSiblings(node, pred);
                  var head = lists.head(siblings);
                  var tails = lists.tail(siblings);
                  $$1.each(tails, function (idx, elem) {
                      dom.appendChildNodes(head, elem.childNodes);
                      dom.remove(elem);
                  });
                  return lists.head(siblings);
              });
          }
          else {
              return nodes;
          }
      };
      /**
       * get current style on cursor
       *
       * @param {WrappedRange} rng
       * @return {Object} - object contains style properties.
       */
      Style.prototype.current = function (rng) {
          var $cont = $$1(!dom.isElement(rng.sc) ? rng.sc.parentNode : rng.sc);
          var styleInfo = this.fromNode($cont);
          // document.queryCommandState for toggle state
          // [workaround] prevent Firefox nsresult: "0x80004005 (NS_ERROR_FAILURE)"
          try {
              styleInfo = $$1.extend(styleInfo, {
                  'font-bold': document.queryCommandState('bold') ? 'bold' : 'normal',
                  'font-italic': document.queryCommandState('italic') ? 'italic' : 'normal',
                  'font-underline': document.queryCommandState('underline') ? 'underline' : 'normal',
                  'font-subscript': document.queryCommandState('subscript') ? 'subscript' : 'normal',
                  'font-superscript': document.queryCommandState('superscript') ? 'superscript' : 'normal',
                  'font-strikethrough': document.queryCommandState('strikethrough') ? 'strikethrough' : 'normal',
                  'font-family': document.queryCommandValue('fontname') || styleInfo['font-family']
              });
          }
          catch (e) { }
          // list-style-type to list-style(unordered, ordered)
          if (!rng.isOnList()) {
              styleInfo['list-style'] = 'none';
          }
          else {
              var orderedTypes = ['circle', 'disc', 'disc-leading-zero', 'square'];
              var isUnordered = orderedTypes.indexOf(styleInfo['list-style-type']) > -1;
              styleInfo['list-style'] = isUnordered ? 'unordered' : 'ordered';
          }
          var para = dom.ancestor(rng.sc, dom.isPara);
          if (para && para.style['line-height']) {
              styleInfo['line-height'] = para.style.lineHeight;
          }
          else {
              var lineHeight = parseInt(styleInfo['line-height'], 10) / parseInt(styleInfo['font-size'], 10);
              styleInfo['line-height'] = lineHeight.toFixed(1);
          }
          styleInfo.anchor = rng.isOnAnchor() && dom.ancestor(rng.sc, dom.isAnchor);
          styleInfo.ancestors = dom.listAncestor(rng.sc, dom.isEditable);
          styleInfo.range = rng;
          return styleInfo;
      };
      return Style;
  }());

  var Bullet = /** @class */ (function () {
      function Bullet() {
      }
      /**
       * toggle ordered list
       */
      Bullet.prototype.insertOrderedList = function (editable) {
          this.toggleList('OL', editable);
      };
      /**
       * toggle unordered list
       */
      Bullet.prototype.insertUnorderedList = function (editable) {
          this.toggleList('UL', editable);
      };
      /**
       * indent
       */
      Bullet.prototype.indent = function (editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              if (dom.isLi(head)) {
                  var previousList_1 = _this.findList(head.previousSibling);
                  if (previousList_1) {
                      paras
                          .map(function (para) { return previousList_1.appendChild(para); });
                  }
                  else {
                      _this.wrapList(paras, head.parentNode.nodeName);
                      paras
                          .map(function (para) { return para.parentNode; })
                          .map(function (para) { return _this.appendToPrevious(para); });
                  }
              }
              else {
                  $$1.each(paras, function (idx, para) {
                      $$1(para).css('marginLeft', function (idx, val) {
                          return (parseInt(val, 10) || 0) + 25;
                      });
                  });
              }
          });
          rng.select();
      };
      /**
       * outdent
       */
      Bullet.prototype.outdent = function (editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              if (dom.isLi(head)) {
                  _this.releaseList([paras]);
              }
              else {
                  $$1.each(paras, function (idx, para) {
                      $$1(para).css('marginLeft', function (idx, val) {
                          val = (parseInt(val, 10) || 0);
                          return val > 25 ? val - 25 : '';
                      });
                  });
              }
          });
          rng.select();
      };
      /**
       * toggle list
       *
       * @param {String} listName - OL or UL
       */
      Bullet.prototype.toggleList = function (listName, editable) {
          var _this = this;
          var rng = range.create(editable).wrapBodyInlineWithPara();
          var paras = rng.nodes(dom.isPara, { includeAncestor: true });
          var bookmark = rng.paraBookmark(paras);
          var clustereds = lists.clusterBy(paras, func.peq2('parentNode'));
          // paragraph to list
          if (lists.find(paras, dom.isPurePara)) {
              var wrappedParas_1 = [];
              $$1.each(clustereds, function (idx, paras) {
                  wrappedParas_1 = wrappedParas_1.concat(_this.wrapList(paras, listName));
              });
              paras = wrappedParas_1;
              // list to paragraph or change list style
          }
          else {
              var diffLists = rng.nodes(dom.isList, {
                  includeAncestor: true
              }).filter(function (listNode) {
                  return !$$1.nodeName(listNode, listName);
              });
              if (diffLists.length) {
                  $$1.each(diffLists, function (idx, listNode) {
                      dom.replace(listNode, listName);
                  });
              }
              else {
                  paras = this.releaseList(clustereds, true);
              }
          }
          range.createFromParaBookmark(bookmark, paras).select();
      };
      /**
       * @param {Node[]} paras
       * @param {String} listName
       * @return {Node[]}
       */
      Bullet.prototype.wrapList = function (paras, listName) {
          var head = lists.head(paras);
          var last = lists.last(paras);
          var prevList = dom.isList(head.previousSibling) && head.previousSibling;
          var nextList = dom.isList(last.nextSibling) && last.nextSibling;
          var listNode = prevList || dom.insertAfter(dom.create(listName || 'UL'), last);
          // P to LI
          paras = paras.map(function (para) {
              return dom.isPurePara(para) ? dom.replace(para, 'LI') : para;
          });
          // append to list(<ul>, <ol>)
          dom.appendChildNodes(listNode, paras);
          if (nextList) {
              dom.appendChildNodes(listNode, lists.from(nextList.childNodes));
              dom.remove(nextList);
          }
          return paras;
      };
      /**
       * @method releaseList
       *
       * @param {Array[]} clustereds
       * @param {Boolean} isEscapseToBody
       * @return {Node[]}
       */
      Bullet.prototype.releaseList = function (clustereds, isEscapseToBody) {
          var _this = this;
          var releasedParas = [];
          $$1.each(clustereds, function (idx, paras) {
              var head = lists.head(paras);
              var last = lists.last(paras);
              var headList = isEscapseToBody ? dom.lastAncestor(head, dom.isList) : head.parentNode;
              var parentItem = headList.parentNode;
              if (headList.parentNode.nodeName === 'LI') {
                  paras.map(function (para) {
                      var newList = _this.findNextSiblings(para);
                      if (parentItem.nextSibling) {
                          parentItem.parentNode.insertBefore(para, parentItem.nextSibling);
                      }
                      else {
                          parentItem.parentNode.appendChild(para);
                      }
                      if (newList.length) {
                          _this.wrapList(newList, headList.nodeName);
                          para.appendChild(newList[0].parentNode);
                      }
                  });
                  if (headList.children.length === 0) {
                      parentItem.removeChild(headList);
                  }
                  if (parentItem.childNodes.length === 0) {
                      parentItem.parentNode.removeChild(parentItem);
                  }
              }
              else {
                  var lastList = headList.childNodes.length > 1 ? dom.splitTree(headList, {
                      node: last.parentNode,
                      offset: dom.position(last) + 1
                  }, {
                      isSkipPaddingBlankHTML: true
                  }) : null;
                  var middleList = dom.splitTree(headList, {
                      node: head.parentNode,
                      offset: dom.position(head)
                  }, {
                      isSkipPaddingBlankHTML: true
                  });
                  paras = isEscapseToBody ? dom.listDescendant(middleList, dom.isLi)
                      : lists.from(middleList.childNodes).filter(dom.isLi);
                  // LI to P
                  if (isEscapseToBody || !dom.isList(headList.parentNode)) {
                      paras = paras.map(function (para) {
                          return dom.replace(para, 'P');
                      });
                  }
                  $$1.each(lists.from(paras).reverse(), function (idx, para) {
                      dom.insertAfter(para, headList);
                  });
                  // remove empty lists
                  var rootLists = lists.compact([headList, middleList, lastList]);
                  $$1.each(rootLists, function (idx, rootList) {
                      var listNodes = [rootList].concat(dom.listDescendant(rootList, dom.isList));
                      $$1.each(listNodes.reverse(), function (idx, listNode) {
                          if (!dom.nodeLength(listNode)) {
                              dom.remove(listNode, true);
                          }
                      });
                  });
              }
              releasedParas = releasedParas.concat(paras);
          });
          return releasedParas;
      };
      /**
       * @method appendToPrevious
       *
       * Appends list to previous list item, if
       * none exist it wraps the list in a new list item.
       *
       * @param {HTMLNode} ListItem
       * @return {HTMLNode}
       */
      Bullet.prototype.appendToPrevious = function (node) {
          return node.previousSibling
              ? dom.appendChildNodes(node.previousSibling, [node])
              : this.wrapList([node], 'LI');
      };
      /**
       * @method findList
       *
       * Finds an existing list in list item
       *
       * @param {HTMLNode} ListItem
       * @return {Array[]}
       */
      Bullet.prototype.findList = function (node) {
          return node
              ? lists.find(node.children, function (child) { return ['OL', 'UL'].indexOf(child.nodeName) > -1; })
              : null;
      };
      /**
       * @method findNextSiblings
       *
       * Finds all list item siblings that follow it
       *
       * @param {HTMLNode} ListItem
       * @return {HTMLNode}
       */
      Bullet.prototype.findNextSiblings = function (node) {
          var siblings = [];
          while (node.nextSibling) {
              siblings.push(node.nextSibling);
              node = node.nextSibling;
          }
          return siblings;
      };
      return Bullet;
  }());

  /**
   * @class editing.Typing
   *
   * Typing
   *
   */
  var Typing = /** @class */ (function () {
      function Typing(context) {
          // a Bullet instance to toggle lists off
          this.bullet = new Bullet();
          this.options = context.options;
      }
      /**
       * insert tab
       *
       * @param {WrappedRange} rng
       * @param {Number} tabsize
       */
      Typing.prototype.insertTab = function (rng, tabsize) {
          var tab = dom.createText(new Array(tabsize + 1).join(dom.NBSP_CHAR));
          rng = rng.deleteContents();
          rng.insertNode(tab, true);
          rng = range.create(tab, tabsize);
          rng.select();
      };
      /**
       * insert paragraph
       *
       * @param {jQuery} $editable
       * @param {WrappedRange} rng Can be used in unit tests to "mock" the range
       *
       * blockquoteBreakingLevel
       *   0 - No break, the new paragraph remains inside the quote
       *   1 - Break the first blockquote in the ancestors list
       *   2 - Break all blockquotes, so that the new paragraph is not quoted (this is the default)
       */
      Typing.prototype.insertParagraph = function (editable, rng) {
          rng = rng || range.create(editable);
          // deleteContents on range.
          rng = rng.deleteContents();
          // Wrap range if it needs to be wrapped by paragraph
          rng = rng.wrapBodyInlineWithPara();
          // finding paragraph
          var splitRoot = dom.ancestor(rng.sc, dom.isPara);
          var nextPara;
          // on paragraph: split paragraph
          if (splitRoot) {
              // if it is an empty line with li
              if (dom.isEmpty(splitRoot) && dom.isLi(splitRoot)) {
                  // toogle UL/OL and escape
                  this.bullet.toggleList(splitRoot.parentNode.nodeName);
                  return;
              }
              else {
                  var blockquote = null;
                  if (this.options.blockquoteBreakingLevel === 1) {
                      blockquote = dom.ancestor(splitRoot, dom.isBlockquote);
                  }
                  else if (this.options.blockquoteBreakingLevel === 2) {
                      blockquote = dom.lastAncestor(splitRoot, dom.isBlockquote);
                  }
                  if (blockquote) {
                      // We're inside a blockquote and options ask us to break it
                      nextPara = $$1(dom.emptyPara)[0];
                      // If the split is right before a <br>, remove it so that there's no "empty line"
                      // after the split in the new blockquote created
                      if (dom.isRightEdgePoint(rng.getStartPoint()) && dom.isBR(rng.sc.nextSibling)) {
                          $$1(rng.sc.nextSibling).remove();
                      }
                      var split = dom.splitTree(blockquote, rng.getStartPoint(), { isDiscardEmptySplits: true });
                      if (split) {
                          split.parentNode.insertBefore(nextPara, split);
                      }
                      else {
                          dom.insertAfter(nextPara, blockquote); // There's no split if we were at the end of the blockquote
                      }
                  }
                  else {
                      nextPara = dom.splitTree(splitRoot, rng.getStartPoint());
                      // not a blockquote, just insert the paragraph
                      var emptyAnchors = dom.listDescendant(splitRoot, dom.isEmptyAnchor);
                      emptyAnchors = emptyAnchors.concat(dom.listDescendant(nextPara, dom.isEmptyAnchor));
                      $$1.each(emptyAnchors, function (idx, anchor) {
                          dom.remove(anchor);
                      });
                      // replace empty heading, pre or custom-made styleTag with P tag
                      if ((dom.isHeading(nextPara) || dom.isPre(nextPara) || dom.isCustomStyleTag(nextPara)) && dom.isEmpty(nextPara)) {
                          nextPara = dom.replace(nextPara, 'p');
                      }
                  }
              }
              // no paragraph: insert empty paragraph
          }
          else {
              var next = rng.sc.childNodes[rng.so];
              nextPara = $$1(dom.emptyPara)[0];
              if (next) {
                  rng.sc.insertBefore(nextPara, next);
              }
              else {
                  rng.sc.appendChild(nextPara);
              }
          }
          range.create(nextPara, 0).normalize().select().scrollIntoView(editable);
      };
      return Typing;
  }());

  /**
   * @class Create a virtual table to create what actions to do in change.
   * @param {object} startPoint Cell selected to apply change.
   * @param {enum} where  Where change will be applied Row or Col. Use enum: TableResultAction.where
   * @param {enum} action Action to be applied. Use enum: TableResultAction.requestAction
   * @param {object} domTable Dom element of table to make changes.
   */
  var TableResultAction = function (startPoint, where, action, domTable) {
      var _startPoint = { 'colPos': 0, 'rowPos': 0 };
      var _virtualTable = [];
      var _actionCellList = [];
      /// ///////////////////////////////////////////
      // Private functions
      /// ///////////////////////////////////////////
      /**
       * Set the startPoint of action.
       */
      function setStartPoint() {
          if (!startPoint || !startPoint.tagName || (startPoint.tagName.toLowerCase() !== 'td' && startPoint.tagName.toLowerCase() !== 'th')) {
              console.error('Impossible to identify start Cell point.', startPoint);
              return;
          }
          _startPoint.colPos = startPoint.cellIndex;
          if (!startPoint.parentElement || !startPoint.parentElement.tagName || startPoint.parentElement.tagName.toLowerCase() !== 'tr') {
              console.error('Impossible to identify start Row point.', startPoint);
              return;
          }
          _startPoint.rowPos = startPoint.parentElement.rowIndex;
      }
      /**
       * Define virtual table position info object.
       *
       * @param {int} rowIndex Index position in line of virtual table.
       * @param {int} cellIndex Index position in column of virtual table.
       * @param {object} baseRow Row affected by this position.
       * @param {object} baseCell Cell affected by this position.
       * @param {bool} isSpan Inform if it is an span cell/row.
       */
      function setVirtualTablePosition(rowIndex, cellIndex, baseRow, baseCell, isRowSpan, isColSpan, isVirtualCell) {
          var objPosition = {
              'baseRow': baseRow,
              'baseCell': baseCell,
              'isRowSpan': isRowSpan,
              'isColSpan': isColSpan,
              'isVirtual': isVirtualCell
          };
          if (!_virtualTable[rowIndex]) {
              _virtualTable[rowIndex] = [];
          }
          _virtualTable[rowIndex][cellIndex] = objPosition;
      }
      /**
       * Create action cell object.
       *
       * @param {object} virtualTableCellObj Object of specific position on virtual table.
       * @param {enum} resultAction Action to be applied in that item.
       */
      function getActionCell(virtualTableCellObj, resultAction, virtualRowPosition, virtualColPosition) {
          return {
              'baseCell': virtualTableCellObj.baseCell,
              'action': resultAction,
              'virtualTable': {
                  'rowIndex': virtualRowPosition,
                  'cellIndex': virtualColPosition
              }
          };
      }
      /**
       * Recover free index of row to append Cell.
       *
       * @param {int} rowIndex Index of row to find free space.
       * @param {int} cellIndex Index of cell to find free space in table.
       */
      function recoverCellIndex(rowIndex, cellIndex) {
          if (!_virtualTable[rowIndex]) {
              return cellIndex;
          }
          if (!_virtualTable[rowIndex][cellIndex]) {
              return cellIndex;
          }
          var newCellIndex = cellIndex;
          while (_virtualTable[rowIndex][newCellIndex]) {
              newCellIndex++;
              if (!_virtualTable[rowIndex][newCellIndex]) {
                  return newCellIndex;
              }
          }
      }
      /**
       * Recover info about row and cell and add information to virtual table.
       *
       * @param {object} row Row to recover information.
       * @param {object} cell Cell to recover information.
       */
      function addCellInfoToVirtual(row, cell) {
          var cellIndex = recoverCellIndex(row.rowIndex, cell.cellIndex);
          var cellHasColspan = (cell.colSpan > 1);
          var cellHasRowspan = (cell.rowSpan > 1);
          var isThisSelectedCell = (row.rowIndex === _startPoint.rowPos && cell.cellIndex === _startPoint.colPos);
          setVirtualTablePosition(row.rowIndex, cellIndex, row, cell, cellHasRowspan, cellHasColspan, false);
          // Add span rows to virtual Table.
          var rowspanNumber = cell.attributes.rowSpan ? parseInt(cell.attributes.rowSpan.value, 10) : 0;
          if (rowspanNumber > 1) {
              for (var rp = 1; rp < rowspanNumber; rp++) {
                  var rowspanIndex = row.rowIndex + rp;
                  adjustStartPoint(rowspanIndex, cellIndex, cell, isThisSelectedCell);
                  setVirtualTablePosition(rowspanIndex, cellIndex, row, cell, true, cellHasColspan, true);
              }
          }
          // Add span cols to virtual table.
          var colspanNumber = cell.attributes.colSpan ? parseInt(cell.attributes.colSpan.value, 10) : 0;
          if (colspanNumber > 1) {
              for (var cp = 1; cp < colspanNumber; cp++) {
                  var cellspanIndex = recoverCellIndex(row.rowIndex, (cellIndex + cp));
                  adjustStartPoint(row.rowIndex, cellspanIndex, cell, isThisSelectedCell);
                  setVirtualTablePosition(row.rowIndex, cellspanIndex, row, cell, cellHasRowspan, true, true);
              }
          }
      }
      /**
       * Process validation and adjust of start point if needed
       *
       * @param {int} rowIndex
       * @param {int} cellIndex
       * @param {object} cell
       * @param {bool} isSelectedCell
       */
      function adjustStartPoint(rowIndex, cellIndex, cell, isSelectedCell) {
          if (rowIndex === _startPoint.rowPos && _startPoint.colPos >= cell.cellIndex && cell.cellIndex <= cellIndex && !isSelectedCell) {
              _startPoint.colPos++;
          }
      }
      /**
       * Create virtual table of cells with all cells, including span cells.
       */
      function createVirtualTable() {
          var rows = domTable.rows;
          for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
              var cells = rows[rowIndex].cells;
              for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                  addCellInfoToVirtual(rows[rowIndex], cells[cellIndex]);
              }
          }
      }
      /**
       * Get action to be applied on the cell.
       *
       * @param {object} cell virtual table cell to apply action
       */
      function getDeleteResultActionToCell(cell) {
          switch (where) {
              case TableResultAction.where.Column:
                  if (cell.isColSpan) {
                      return TableResultAction.resultAction.SubtractSpanCount;
                  }
                  break;
              case TableResultAction.where.Row:
                  if (!cell.isVirtual && cell.isRowSpan) {
                      return TableResultAction.resultAction.AddCell;
                  }
                  else if (cell.isRowSpan) {
                      return TableResultAction.resultAction.SubtractSpanCount;
                  }
                  break;
          }
          return TableResultAction.resultAction.RemoveCell;
      }
      /**
       * Get action to be applied on the cell.
       *
       * @param {object} cell virtual table cell to apply action
       */
      function getAddResultActionToCell(cell) {
          switch (where) {
              case TableResultAction.where.Column:
                  if (cell.isColSpan) {
                      return TableResultAction.resultAction.SumSpanCount;
                  }
                  else if (cell.isRowSpan && cell.isVirtual) {
                      return TableResultAction.resultAction.Ignore;
                  }
                  break;
              case TableResultAction.where.Row:
                  if (cell.isRowSpan) {
                      return TableResultAction.resultAction.SumSpanCount;
                  }
                  else if (cell.isColSpan && cell.isVirtual) {
                      return TableResultAction.resultAction.Ignore;
                  }
                  break;
          }
          return TableResultAction.resultAction.AddCell;
      }
      function init() {
          setStartPoint();
          createVirtualTable();
      }
      /// ///////////////////////////////////////////
      // Public functions
      /// ///////////////////////////////////////////
      /**
       * Recover array os what to do in table.
       */
      this.getActionList = function () {
          var fixedRow = (where === TableResultAction.where.Row) ? _startPoint.rowPos : -1;
          var fixedCol = (where === TableResultAction.where.Column) ? _startPoint.colPos : -1;
          var actualPosition = 0;
          var canContinue = true;
          while (canContinue) {
              var rowPosition = (fixedRow >= 0) ? fixedRow : actualPosition;
              var colPosition = (fixedCol >= 0) ? fixedCol : actualPosition;
              var row = _virtualTable[rowPosition];
              if (!row) {
                  canContinue = false;
                  return _actionCellList;
              }
              var cell = row[colPosition];
              if (!cell) {
                  canContinue = false;
                  return _actionCellList;
              }
              // Define action to be applied in this cell
              var resultAction = TableResultAction.resultAction.Ignore;
              switch (action) {
                  case TableResultAction.requestAction.Add:
                      resultAction = getAddResultActionToCell(cell);
                      break;
                  case TableResultAction.requestAction.Delete:
                      resultAction = getDeleteResultActionToCell(cell);
                      break;
              }
              _actionCellList.push(getActionCell(cell, resultAction, rowPosition, colPosition));
              actualPosition++;
          }
          return _actionCellList;
      };
      init();
  };
  /**
  *
  * Where action occours enum.
  */
  TableResultAction.where = { 'Row': 0, 'Column': 1 };
  /**
  *
  * Requested action to apply enum.
  */
  TableResultAction.requestAction = { 'Add': 0, 'Delete': 1 };
  /**
  *
  * Result action to be executed enum.
  */
  TableResultAction.resultAction = { 'Ignore': 0, 'SubtractSpanCount': 1, 'RemoveCell': 2, 'AddCell': 3, 'SumSpanCount': 4 };
  /**
   *
   * @class editing.Table
   *
   * Table
   *
   */
  var Table = /** @class */ (function () {
      function Table() {
      }
      /**
       * handle tab key
       *
       * @param {WrappedRange} rng
       * @param {Boolean} isShift
       */
      Table.prototype.tab = function (rng, isShift) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var table = dom.ancestor(cell, dom.isTable);
          var cells = dom.listDescendant(table, dom.isCell);
          var nextCell = lists[isShift ? 'prev' : 'next'](cells, cell);
          if (nextCell) {
              range.create(nextCell, 0).select();
          }
      };
      /**
       * Add a new row
       *
       * @param {WrappedRange} rng
       * @param {String} position (top/bottom)
       * @return {Node}
       */
      Table.prototype.addRow = function (rng, position) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var currentTr = $$1(cell).closest('tr');
          var trAttributes = this.recoverAttributes(currentTr);
          var html = $$1('<tr' + trAttributes + '></tr>');
          var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Add, $$1(currentTr).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var idCell = 0; idCell < actions.length; idCell++) {
              var currentCell = actions[idCell];
              var tdAttributes = this.recoverAttributes(currentCell.baseCell);
              switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                      html.append('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      break;
                  case TableResultAction.resultAction.SumSpanCount:
                      if (position === 'top') {
                          var baseCellTr = currentCell.baseCell.parent;
                          var isTopFromRowSpan = (!baseCellTr ? 0 : currentCell.baseCell.closest('tr').rowIndex) <= currentTr[0].rowIndex;
                          if (isTopFromRowSpan) {
                              var newTd = $$1('<div></div>').append($$1('<td' + tdAttributes + '>' + dom.blank + '</td>').removeAttr('rowspan')).html();
                              html.append(newTd);
                              break;
                          }
                      }
                      var rowspanNumber = parseInt(currentCell.baseCell.rowSpan, 10);
                      rowspanNumber++;
                      currentCell.baseCell.setAttribute('rowSpan', rowspanNumber);
                      break;
              }
          }
          if (position === 'top') {
              currentTr.before(html);
          }
          else {
              var cellHasRowspan = (cell.rowSpan > 1);
              if (cellHasRowspan) {
                  var lastTrIndex = currentTr[0].rowIndex + (cell.rowSpan - 2);
                  $$1($$1(currentTr).parent().find('tr')[lastTrIndex]).after($$1(html));
                  return;
              }
              currentTr.after(html);
          }
      };
      /**
       * Add a new col
       *
       * @param {WrappedRange} rng
       * @param {String} position (left/right)
       * @return {Node}
       */
      Table.prototype.addCol = function (rng, position) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var rowsGroup = $$1(row).siblings();
          rowsGroup.push(row);
          var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Add, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              var currentCell = actions[actionIndex];
              var tdAttributes = this.recoverAttributes(currentCell.baseCell);
              switch (currentCell.action) {
                  case TableResultAction.resultAction.AddCell:
                      if (position === 'right') {
                          $$1(currentCell.baseCell).after('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      else {
                          $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      break;
                  case TableResultAction.resultAction.SumSpanCount:
                      if (position === 'right') {
                          var colspanNumber = parseInt(currentCell.baseCell.colSpan, 10);
                          colspanNumber++;
                          currentCell.baseCell.setAttribute('colSpan', colspanNumber);
                      }
                      else {
                          $$1(currentCell.baseCell).before('<td' + tdAttributes + '>' + dom.blank + '</td>');
                      }
                      break;
              }
          }
      };
      /*
      * Copy attributes from element.
      *
      * @param {object} Element to recover attributes.
      * @return {string} Copied string elements.
      */
      Table.prototype.recoverAttributes = function (el) {
          var resultStr = '';
          if (!el) {
              return resultStr;
          }
          var attrList = el.attributes || [];
          for (var i = 0; i < attrList.length; i++) {
              if (attrList[i].name.toLowerCase() === 'id') {
                  continue;
              }
              if (attrList[i].specified) {
                  resultStr += ' ' + attrList[i].name + '=\'' + attrList[i].value + '\'';
              }
          }
          return resultStr;
      };
      /**
       * Delete current row
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteRow = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var cellPos = row.children('td, th').index($$1(cell));
          var rowPos = row[0].rowIndex;
          var vTable = new TableResultAction(cell, TableResultAction.where.Row, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              if (!actions[actionIndex]) {
                  continue;
              }
              var baseCell = actions[actionIndex].baseCell;
              var virtualPosition = actions[actionIndex].virtualTable;
              var hasRowspan = (baseCell.rowSpan && baseCell.rowSpan > 1);
              var rowspanNumber = (hasRowspan) ? parseInt(baseCell.rowSpan, 10) : 0;
              switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                      continue;
                  case TableResultAction.resultAction.AddCell:
                      var nextRow = row.next('tr')[0];
                      if (!nextRow) {
                          continue;
                      }
                      var cloneRow = row[0].cells[cellPos];
                      if (hasRowspan) {
                          if (rowspanNumber > 2) {
                              rowspanNumber--;
                              nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                              nextRow.cells[cellPos].setAttribute('rowSpan', rowspanNumber);
                              nextRow.cells[cellPos].innerHTML = '';
                          }
                          else if (rowspanNumber === 2) {
                              nextRow.insertBefore(cloneRow, nextRow.cells[cellPos]);
                              nextRow.cells[cellPos].removeAttribute('rowSpan');
                              nextRow.cells[cellPos].innerHTML = '';
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.SubtractSpanCount:
                      if (hasRowspan) {
                          if (rowspanNumber > 2) {
                              rowspanNumber--;
                              baseCell.setAttribute('rowSpan', rowspanNumber);
                              if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                          else if (rowspanNumber === 2) {
                              baseCell.removeAttribute('rowSpan');
                              if (virtualPosition.rowIndex !== rowPos && baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.RemoveCell:
                      // Do not need remove cell because row will be deleted.
                      continue;
              }
          }
          row.remove();
      };
      /**
       * Delete current col
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteCol = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          var row = $$1(cell).closest('tr');
          var cellPos = row.children('td, th').index($$1(cell));
          var vTable = new TableResultAction(cell, TableResultAction.where.Column, TableResultAction.requestAction.Delete, $$1(row).closest('table')[0]);
          var actions = vTable.getActionList();
          for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
              if (!actions[actionIndex]) {
                  continue;
              }
              switch (actions[actionIndex].action) {
                  case TableResultAction.resultAction.Ignore:
                      continue;
                  case TableResultAction.resultAction.SubtractSpanCount:
                      var baseCell = actions[actionIndex].baseCell;
                      var hasColspan = (baseCell.colSpan && baseCell.colSpan > 1);
                      if (hasColspan) {
                          var colspanNumber = (baseCell.colSpan) ? parseInt(baseCell.colSpan, 10) : 0;
                          if (colspanNumber > 2) {
                              colspanNumber--;
                              baseCell.setAttribute('colSpan', colspanNumber);
                              if (baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                          else if (colspanNumber === 2) {
                              baseCell.removeAttribute('colSpan');
                              if (baseCell.cellIndex === cellPos) {
                                  baseCell.innerHTML = '';
                              }
                          }
                      }
                      continue;
                  case TableResultAction.resultAction.RemoveCell:
                      dom.remove(actions[actionIndex].baseCell, true);
                      continue;
              }
          }
      };
      /**
       * create empty table element
       *
       * @param {Number} rowCount
       * @param {Number} colCount
       * @return {Node}
       */
      Table.prototype.createTable = function (colCount, rowCount, options) {
          var tds = [];
          var tdHTML;
          for (var idxCol = 0; idxCol < colCount; idxCol++) {
              tds.push('<td>' + dom.blank + '</td>');
          }
          tdHTML = tds.join('');
          var trs = [];
          var trHTML;
          for (var idxRow = 0; idxRow < rowCount; idxRow++) {
              trs.push('<tr>' + tdHTML + '</tr>');
          }
          trHTML = trs.join('');
          var $table = $$1('<table>' + trHTML + '</table>');
          if (options && options.tableClassName) {
              $table.addClass(options.tableClassName);
          }
          return $table[0];
      };
      /**
       * Delete current table
       *
       * @param {WrappedRange} rng
       * @return {Node}
       */
      Table.prototype.deleteTable = function (rng) {
          var cell = dom.ancestor(rng.commonAncestor(), dom.isCell);
          $$1(cell).closest('table').remove();
      };
      return Table;
  }());

  var KEY_BOGUS = 'bogus';
  /**
   * @class Editor
   */
  var Editor = /** @class */ (function () {
      function Editor(context) {
          var _this = this;
          this.context = context;
          this.$note = context.layoutInfo.note;
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.editable = this.$editable[0];
          this.lastRange = null;
          this.style = new Style();
          this.table = new Table();
          this.typing = new Typing(context);
          this.bullet = new Bullet();
          this.history = new History(this.$editable);
          this.context.memo('help.undo', this.lang.help.undo);
          this.context.memo('help.redo', this.lang.help.redo);
          this.context.memo('help.tab', this.lang.help.tab);
          this.context.memo('help.untab', this.lang.help.untab);
          this.context.memo('help.insertParagraph', this.lang.help.insertParagraph);
          this.context.memo('help.insertOrderedList', this.lang.help.insertOrderedList);
          this.context.memo('help.insertUnorderedList', this.lang.help.insertUnorderedList);
          this.context.memo('help.indent', this.lang.help.indent);
          this.context.memo('help.outdent', this.lang.help.outdent);
          this.context.memo('help.formatPara', this.lang.help.formatPara);
          this.context.memo('help.insertHorizontalRule', this.lang.help.insertHorizontalRule);
          this.context.memo('help.fontName', this.lang.help.fontName);
          // native commands(with execCommand), generate function for execCommand
          var commands = [
              'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript',
              'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
              'formatBlock', 'removeFormat', 'backColor',
          ];
          for (var idx = 0, len = commands.length; idx < len; idx++) {
              this[commands[idx]] = (function (sCmd) {
                  return function (value) {
                      _this.beforeCommand();
                      document.execCommand(sCmd, false, value);
                      _this.afterCommand(true);
                  };
              })(commands[idx]);
              this.context.memo('help.' + commands[idx], this.lang.help[commands[idx]]);
          }
          this.fontName = this.wrapCommand(function (value) {
              return _this.fontStyling('font-family', "\'" + value + "\'");
          });
          this.fontSize = this.wrapCommand(function (value) {
              return _this.fontStyling('font-size', value + 'px');
          });
          for (var idx = 1; idx <= 6; idx++) {
              this['formatH' + idx] = (function (idx) {
                  return function () {
                      _this.formatBlock('H' + idx);
                  };
              })(idx);
              this.context.memo('help.formatH' + idx, this.lang.help['formatH' + idx]);
          }
          this.insertParagraph = this.wrapCommand(function () {
              _this.typing.insertParagraph(_this.editable);
          });
          this.insertOrderedList = this.wrapCommand(function () {
              _this.bullet.insertOrderedList(_this.editable);
          });
          this.insertUnorderedList = this.wrapCommand(function () {
              _this.bullet.insertUnorderedList(_this.editable);
          });
          this.indent = this.wrapCommand(function () {
              _this.bullet.indent(_this.editable);
          });
          this.outdent = this.wrapCommand(function () {
              _this.bullet.outdent(_this.editable);
          });
          /**
           * insertNode
           * insert node
           * @param {Node} node
           */
          this.insertNode = this.wrapCommand(function (node) {
              if (_this.isLimited($$1(node).text().length)) {
                  return;
              }
              var rng = _this.getLastRange();
              rng.insertNode(node);
              range.createFromNodeAfter(node).select();
              _this.setLastRange();
          });
          /**
           * insert text
           * @param {String} text
           */
          this.insertText = this.wrapCommand(function (text) {
              if (_this.isLimited(text.length)) {
                  return;
              }
              var rng = _this.getLastRange();
              var textNode = rng.insertNode(dom.createText(text));
              range.create(textNode, dom.nodeLength(textNode)).select();
              _this.setLastRange();
          });
          /**
           * paste HTML
           * @param {String} markup
           */
          this.pasteHTML = this.wrapCommand(function (markup) {
              if (_this.isLimited(markup.length)) {
                  return;
              }
              markup = _this.context.invoke('codeview.purify', markup);
              var contents = _this.getLastRange().pasteHTML(markup);
              range.createFromNodeAfter(lists.last(contents)).select();
              _this.setLastRange();
          });
          /**
           * formatBlock
           *
           * @param {String} tagName
           */
          this.formatBlock = this.wrapCommand(function (tagName, $target) {
              var onApplyCustomStyle = _this.options.callbacks.onApplyCustomStyle;
              if (onApplyCustomStyle) {
                  onApplyCustomStyle.call(_this, $target, _this.context, _this.onFormatBlock);
              }
              else {
                  _this.onFormatBlock(tagName, $target);
              }
          });
          /**
           * insert horizontal rule
           */
          this.insertHorizontalRule = this.wrapCommand(function () {
              var hrNode = _this.getLastRange().insertNode(dom.create('HR'));
              if (hrNode.nextSibling) {
                  range.create(hrNode.nextSibling, 0).normalize().select();
                  _this.setLastRange();
              }
          });
          /**
           * lineHeight
           * @param {String} value
           */
          this.lineHeight = this.wrapCommand(function (value) {
              _this.style.stylePara(_this.getLastRange(), {
                  lineHeight: value
              });
          });
          /**
           * create link (command)
           *
           * @param {Object} linkInfo
           */
          this.createLink = this.wrapCommand(function (linkInfo) {
              var linkUrl = linkInfo.url;
              var linkText = linkInfo.text;
              var isNewWindow = linkInfo.isNewWindow;
              var rng = linkInfo.range || _this.getLastRange();
              var additionalTextLength = linkText.length - rng.toString().length;
              if (additionalTextLength > 0 && _this.isLimited(additionalTextLength)) {
                  return;
              }
              var isTextChanged = rng.toString() !== linkText;
              // handle spaced urls from input
              if (typeof linkUrl === 'string') {
                  linkUrl = linkUrl.trim();
              }
              if (_this.options.onCreateLink) {
                  linkUrl = _this.options.onCreateLink(linkUrl);
              }
              else {
                  // if url doesn't have any protocol and not even a relative or a label, use http:// as default
                  linkUrl = /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/.test(linkUrl)
                      ? linkUrl : 'http://' + linkUrl;
              }
              var anchors = [];
              if (isTextChanged) {
                  rng = rng.deleteContents();
                  var anchor = rng.insertNode($$1('<A>' + linkText + '</A>')[0]);
                  anchors.push(anchor);
              }
              else {
                  anchors = _this.style.styleNodes(rng, {
                      nodeName: 'A',
                      expandClosestSibling: true,
                      onlyPartialContains: true
                  });
              }
              $$1.each(anchors, function (idx, anchor) {
                  $$1(anchor).attr('href', linkUrl);
                  if (isNewWindow) {
                      $$1(anchor).attr('target', '_blank');
                  }
                  else {
                      $$1(anchor).removeAttr('target');
                  }
              });
              var startRange = range.createFromNodeBefore(lists.head(anchors));
              var startPoint = startRange.getStartPoint();
              var endRange = range.createFromNodeAfter(lists.last(anchors));
              var endPoint = endRange.getEndPoint();
              range.create(startPoint.node, startPoint.offset, endPoint.node, endPoint.offset).select();
              _this.setLastRange();
          });
          /**
           * setting color
           *
           * @param {Object} sObjColor  color code
           * @param {String} sObjColor.foreColor foreground color
           * @param {String} sObjColor.backColor background color
           */
          this.color = this.wrapCommand(function (colorInfo) {
              var foreColor = colorInfo.foreColor;
              var backColor = colorInfo.backColor;
              if (foreColor) {
                  document.execCommand('foreColor', false, foreColor);
              }
              if (backColor) {
                  document.execCommand('backColor', false, backColor);
              }
          });
          /**
           * Set foreground color
           *
           * @param {String} colorCode foreground color code
           */
          this.foreColor = this.wrapCommand(function (colorInfo) {
              document.execCommand('styleWithCSS', false, true);
              document.execCommand('foreColor', false, colorInfo);
          });
          /**
           * insert Table
           *
           * @param {String} dimension of table (ex : "5x5")
           */
          this.insertTable = this.wrapCommand(function (dim) {
              var dimension = dim.split('x');
              var rng = _this.getLastRange().deleteContents();
              rng.insertNode(_this.table.createTable(dimension[0], dimension[1], _this.options));
          });
          /**
           * remove media object and Figure Elements if media object is img with Figure.
           */
          this.removeMedia = this.wrapCommand(function () {
              var $target = $$1(_this.restoreTarget()).parent();
              if ($target.parent('figure').length) {
                  $target.parent('figure').remove();
              }
              else {
                  $target = $$1(_this.restoreTarget()).detach();
              }
              _this.context.triggerEvent('media.delete', $target, _this.$editable);
          });
          /**
           * float me
           *
           * @param {String} value
           */
          this.floatMe = this.wrapCommand(function (value) {
              var $target = $$1(_this.restoreTarget());
              $target.toggleClass('note-float-left', value === 'left');
              $target.toggleClass('note-float-right', value === 'right');
              $target.css('float', (value === 'none' ? '' : value));
          });
          /**
           * resize overlay element
           * @param {String} value
           */
          this.resize = this.wrapCommand(function (value) {
              var $target = $$1(_this.restoreTarget());
              value = parseFloat(value);
              if (value === 0) {
                  $target.css('width', '');
              }
              else {
                  $target.css({
                      width: value * 100 + '%',
                      height: ''
                  });
              }
          });
      }
      Editor.prototype.initialize = function () {
          var _this = this;
          // bind custom events
          this.$editable.on('keydown', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  _this.context.triggerEvent('enter', event);
              }
              _this.context.triggerEvent('keydown', event);
              if (!event.isDefaultPrevented()) {
                  if (_this.options.shortcuts) {
                      _this.handleKeyMap(event);
                  }
                  else {
                      _this.preventDefaultEditableShortCuts(event);
                  }
              }
              if (_this.isLimited(1, event)) {
                  return false;
              }
          }).on('keyup', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('keyup', event);
          }).on('focus', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('focus', event);
          }).on('blur', function (event) {
              _this.context.triggerEvent('blur', event);
          }).on('mousedown', function (event) {
              _this.context.triggerEvent('mousedown', event);
          }).on('mouseup', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('mouseup', event);
          }).on('scroll', function (event) {
              _this.context.triggerEvent('scroll', event);
          }).on('paste', function (event) {
              _this.setLastRange();
              _this.context.triggerEvent('paste', event);
          });
          this.$editable.attr('spellcheck', this.options.spellCheck);
          // init content before set event
          this.$editable.html(dom.html(this.$note) || dom.emptyPara);
          this.$editable.on(env.inputEventName, func.debounce(function () {
              _this.context.triggerEvent('change', _this.$editable.html(), _this.$editable);
          }, 10));
          this.$editor.on('focusin', function (event) {
              _this.context.triggerEvent('focusin', event);
          }).on('focusout', function (event) {
              _this.context.triggerEvent('focusout', event);
          });
          if (!this.options.airMode) {
              if (this.options.width) {
                  this.$editor.outerWidth(this.options.width);
              }
              if (this.options.height) {
                  this.$editable.outerHeight(this.options.height);
              }
              if (this.options.maxHeight) {
                  this.$editable.css('max-height', this.options.maxHeight);
              }
              if (this.options.minHeight) {
                  this.$editable.css('min-height', this.options.minHeight);
              }
          }
          this.history.recordUndo();
          this.setLastRange();
      };
      Editor.prototype.destroy = function () {
          this.$editable.off();
      };
      Editor.prototype.handleKeyMap = function (event) {
          var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
          var keys = [];
          if (event.metaKey) {
              keys.push('CMD');
          }
          if (event.ctrlKey && !event.altKey) {
              keys.push('CTRL');
          }
          if (event.shiftKey) {
              keys.push('SHIFT');
          }
          var keyName = key.nameFromCode[event.keyCode];
          if (keyName) {
              keys.push(keyName);
          }
          var eventName = keyMap[keys.join('+')];
          if (eventName) {
              if (this.context.invoke(eventName) !== false) {
                  event.preventDefault();
              }
          }
          else if (key.isEdit(event.keyCode)) {
              this.afterCommand();
          }
      };
      Editor.prototype.preventDefaultEditableShortCuts = function (event) {
          // B(Bold, 66) / I(Italic, 73) / U(Underline, 85)
          if ((event.ctrlKey || event.metaKey) &&
              lists.contains([66, 73, 85], event.keyCode)) {
              event.preventDefault();
          }
      };
      Editor.prototype.isLimited = function (pad, event) {
          pad = pad || 0;
          if (typeof event !== 'undefined') {
              if (key.isMove(event.keyCode) ||
                  (event.ctrlKey || event.metaKey) ||
                  lists.contains([key.code.BACKSPACE, key.code.DELETE], event.keyCode)) {
                  return false;
              }
          }
          if (this.options.maxTextLength > 0) {
              if ((this.$editable.text().length + pad) >= this.options.maxTextLength) {
                  return true;
              }
          }
          return false;
      };
      /**
       * create range
       * @return {WrappedRange}
       */
      Editor.prototype.createRange = function () {
          this.focus();
          this.setLastRange();
          return this.getLastRange();
      };
      Editor.prototype.setLastRange = function () {
          this.lastRange = range.create(this.editable);
      };
      Editor.prototype.getLastRange = function () {
          if (!this.lastRange) {
              this.setLastRange();
          }
          return this.lastRange;
      };
      /**
       * saveRange
       *
       * save current range
       *
       * @param {Boolean} [thenCollapse=false]
       */
      Editor.prototype.saveRange = function (thenCollapse) {
          if (thenCollapse) {
              this.getLastRange().collapse().select();
          }
      };
      /**
       * restoreRange
       *
       * restore lately range
       */
      Editor.prototype.restoreRange = function () {
          if (this.lastRange) {
              this.lastRange.select();
              this.focus();
          }
      };
      Editor.prototype.saveTarget = function (node) {
          this.$editable.data('target', node);
      };
      Editor.prototype.clearTarget = function () {
          this.$editable.removeData('target');
      };
      Editor.prototype.restoreTarget = function () {
          return this.$editable.data('target');
      };
      /**
       * currentStyle
       *
       * current style
       * @return {Object|Boolean} unfocus
       */
      Editor.prototype.currentStyle = function () {
          var rng = range.create();
          if (rng) {
              rng = rng.normalize();
          }
          return rng ? this.style.current(rng) : this.style.fromNode(this.$editable);
      };
      /**
       * style from node
       *
       * @param {jQuery} $node
       * @return {Object}
       */
      Editor.prototype.styleFromNode = function ($node) {
          return this.style.fromNode($node);
      };
      /**
       * undo
       */
      Editor.prototype.undo = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.undo();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      };
      /*
      * commit
      */
      Editor.prototype.commit = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.commit();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      };
      /**
       * redo
       */
      Editor.prototype.redo = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          this.history.redo();
          this.context.triggerEvent('change', this.$editable.html(), this.$editable);
      };
      /**
       * before command
       */
      Editor.prototype.beforeCommand = function () {
          this.context.triggerEvent('before.command', this.$editable.html());
          // keep focus on editable before command execution
          this.focus();
      };
      /**
       * after command
       * @param {Boolean} isPreventTrigger
       */
      Editor.prototype.afterCommand = function (isPreventTrigger) {
          this.normalizeContent();
          this.history.recordUndo();
          if (!isPreventTrigger) {
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
          }
      };
      /**
       * handle tab key
       */
      Editor.prototype.tab = function () {
          var rng = this.getLastRange();
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.table.tab(rng);
          }
          else {
              if (this.options.tabSize === 0) {
                  return false;
              }
              if (!this.isLimited(this.options.tabSize)) {
                  this.beforeCommand();
                  this.typing.insertTab(rng, this.options.tabSize);
                  this.afterCommand();
              }
          }
      };
      /**
       * handle shift+tab key
       */
      Editor.prototype.untab = function () {
          var rng = this.getLastRange();
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.table.tab(rng, true);
          }
          else {
              if (this.options.tabSize === 0) {
                  return false;
              }
          }
      };
      /**
       * run given function between beforeCommand and afterCommand
       */
      Editor.prototype.wrapCommand = function (fn) {
          return function () {
              this.beforeCommand();
              fn.apply(this, arguments);
              this.afterCommand();
          };
      };
      /**
       * insert image
       *
       * @param {String} src
       * @param {String|Function} param
       * @return {Promise}
       */
      Editor.prototype.insertImage = function (src, param) {
          var _this = this;
          return createImage(src, param).then(function ($image) {
              _this.beforeCommand();
              if (typeof param === 'function') {
                  param($image);
              }
              else {
                  if (typeof param === 'string') {
                      $image.attr('data-filename', param);
                  }
                  $image.css('width', Math.min(_this.$editable.width(), $image.width()));
              }
              $image.show();
              range.create(_this.editable).insertNode($image[0]);
              range.createFromNodeAfter($image[0]).select();
              _this.setLastRange();
              _this.afterCommand();
          }).fail(function (e) {
              _this.context.triggerEvent('image.upload.error', e);
          });
      };
      /**
       * insertImages
       * @param {File[]} files
       */
      Editor.prototype.insertImagesAsDataURL = function (files) {
          var _this = this;
          $$1.each(files, function (idx, file) {
              var filename = file.name;
              if (_this.options.maximumImageFileSize && _this.options.maximumImageFileSize < file.size) {
                  _this.context.triggerEvent('image.upload.error', _this.lang.image.maximumFileSizeError);
              }
              else {
                  readFileAsDataURL(file).then(function (dataURL) {
                      return _this.insertImage(dataURL, filename);
                  }).fail(function () {
                      _this.context.triggerEvent('image.upload.error');
                  });
              }
          });
      };
      /**
       * insertImagesOrCallback
       * @param {File[]} files
       */
      Editor.prototype.insertImagesOrCallback = function (files) {
          var callbacks = this.options.callbacks;
          // If onImageUpload set,
          if (callbacks.onImageUpload) {
              this.context.triggerEvent('image.upload', files);
              // else insert Image as dataURL
          }
          else {
              this.insertImagesAsDataURL(files);
          }
      };
      /**
       * return selected plain text
       * @return {String} text
       */
      Editor.prototype.getSelectedText = function () {
          var rng = this.getLastRange();
          // if range on anchor, expand range with anchor
          if (rng.isOnAnchor()) {
              rng = range.createFromNode(dom.ancestor(rng.sc, dom.isAnchor));
          }
          return rng.toString();
      };
      Editor.prototype.onFormatBlock = function (tagName, $target) {
          // [workaround] for MSIE, IE need `<`
          document.execCommand('FormatBlock', false, env.isMSIE ? '<' + tagName + '>' : tagName);
          // support custom class
          if ($target && $target.length) {
              // find the exact element has given tagName
              if ($target[0].tagName.toUpperCase() !== tagName.toUpperCase()) {
                  $target = $target.find(tagName);
              }
              if ($target && $target.length) {
                  var className = $target[0].className || '';
                  if (className) {
                      var currentRange = this.createRange();
                      var $parent = $$1([currentRange.sc, currentRange.ec]).closest(tagName);
                      $parent.addClass(className);
                  }
              }
          }
      };
      Editor.prototype.formatPara = function () {
          this.formatBlock('P');
      };
      Editor.prototype.fontStyling = function (target, value) {
          var rng = this.getLastRange();
          if (rng) {
              var spans = this.style.styleNodes(rng);
              $$1(spans).css(target, value);
              // [workaround] added styled bogus span for style
              //  - also bogus character needed for cursor position
              if (rng.isCollapsed()) {
                  var firstSpan = lists.head(spans);
                  if (firstSpan && !dom.nodeLength(firstSpan)) {
                      firstSpan.innerHTML = dom.ZERO_WIDTH_NBSP_CHAR;
                      range.createFromNodeAfter(firstSpan.firstChild).select();
                      this.setLastRange();
                      this.$editable.data(KEY_BOGUS, firstSpan);
                  }
              }
          }
      };
      /**
       * unlink
       *
       * @type command
       */
      Editor.prototype.unlink = function () {
          var rng = this.getLastRange();
          if (rng.isOnAnchor()) {
              var anchor = dom.ancestor(rng.sc, dom.isAnchor);
              rng = range.createFromNode(anchor);
              rng.select();
              this.setLastRange();
              this.beforeCommand();
              document.execCommand('unlink');
              this.afterCommand();
          }
      };
      /**
       * returns link info
       *
       * @return {Object}
       * @return {WrappedRange} return.range
       * @return {String} return.text
       * @return {Boolean} [return.isNewWindow=true]
       * @return {String} [return.url=""]
       */
      Editor.prototype.getLinkInfo = function () {
          var rng = this.getLastRange().expand(dom.isAnchor);
          // Get the first anchor on range(for edit).
          var $anchor = $$1(lists.head(rng.nodes(dom.isAnchor)));
          var linkInfo = {
              range: rng,
              text: rng.toString(),
              url: $anchor.length ? $anchor.attr('href') : ''
          };
          // When anchor exists,
          if ($anchor.length) {
              // Set isNewWindow by checking its target.
              linkInfo.isNewWindow = $anchor.attr('target') === '_blank';
          }
          return linkInfo;
      };
      Editor.prototype.addRow = function (position) {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.addRow(rng, position);
              this.afterCommand();
          }
      };
      Editor.prototype.addCol = function (position) {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.addCol(rng, position);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteRow = function () {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteRow(rng);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteCol = function () {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteCol(rng);
              this.afterCommand();
          }
      };
      Editor.prototype.deleteTable = function () {
          var rng = this.getLastRange(this.$editable);
          if (rng.isCollapsed() && rng.isOnCell()) {
              this.beforeCommand();
              this.table.deleteTable(rng);
              this.afterCommand();
          }
      };
      /**
       * @param {Position} pos
       * @param {jQuery} $target - target element
       * @param {Boolean} [bKeepRatio] - keep ratio
       */
      Editor.prototype.resizeTo = function (pos, $target, bKeepRatio) {
          var imageSize;
          if (bKeepRatio) {
              var newRatio = pos.y / pos.x;
              var ratio = $target.data('ratio');
              imageSize = {
                  width: ratio > newRatio ? pos.x : pos.y / ratio,
                  height: ratio > newRatio ? pos.x * ratio : pos.y
              };
          }
          else {
              imageSize = {
                  width: pos.x,
                  height: pos.y
              };
          }
          $target.css(imageSize);
      };
      /**
       * returns whether editable area has focus or not.
       */
      Editor.prototype.hasFocus = function () {
          return this.$editable.is(':focus');
      };
      /**
       * set focus
       */
      Editor.prototype.focus = function () {
          // [workaround] Screen will move when page is scolled in IE.
          //  - do focus when not focused
          if (!this.hasFocus()) {
              this.$editable.focus();
          }
      };
      /**
       * returns whether contents is empty or not.
       * @return {Boolean}
       */
      Editor.prototype.isEmpty = function () {
          return dom.isEmpty(this.$editable[0]) || dom.emptyPara === this.$editable.html();
      };
      /**
       * Removes all contents and restores the editable instance to an _emptyPara_.
       */
      Editor.prototype.empty = function () {
          this.context.invoke('code', dom.emptyPara);
      };
      /**
       * normalize content
       */
      Editor.prototype.normalizeContent = function () {
          this.$editable[0].normalize();
      };
      return Editor;
  }());

  var Clipboard = /** @class */ (function () {
      function Clipboard(context) {
          this.context = context;
          this.$editable = context.layoutInfo.editable;
      }
      Clipboard.prototype.initialize = function () {
          this.$editable.on('paste', this.pasteByEvent.bind(this));
      };
      /**
       * paste by clipboard event
       *
       * @param {Event} event
       */
      Clipboard.prototype.pasteByEvent = function (event) {
          var clipboardData = event.originalEvent.clipboardData;
          if (clipboardData && clipboardData.items && clipboardData.items.length) {
              // paste img file
              var item = clipboardData.items.length > 1 ? clipboardData.items[1] : lists.head(clipboardData.items);
              if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                  this.context.invoke('editor.insertImagesOrCallback', [item.getAsFile()]);
              }
              this.context.invoke('editor.afterCommand');
          }
      };
      return Clipboard;
  }());

  var Dropzone = /** @class */ (function () {
      function Dropzone(context) {
          this.context = context;
          this.$eventListener = $$1(document);
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.documentEventHandlers = {};
          this.$dropzone = $$1([
              '<div class="note-dropzone">',
              '  <div class="note-dropzone-message"/>',
              '</div>',
          ].join('')).prependTo(this.$editor);
      }
      /**
       * attach Drag and Drop Events
       */
      Dropzone.prototype.initialize = function () {
          if (this.options.disableDragAndDrop) {
              // prevent default drop event
              this.documentEventHandlers.onDrop = function (e) {
                  e.preventDefault();
              };
              // do not consider outside of dropzone
              this.$eventListener = this.$dropzone;
              this.$eventListener.on('drop', this.documentEventHandlers.onDrop);
          }
          else {
              this.attachDragAndDropEvent();
          }
      };
      /**
       * attach Drag and Drop Events
       */
      Dropzone.prototype.attachDragAndDropEvent = function () {
          var _this = this;
          var collection = $$1();
          var $dropzoneMessage = this.$dropzone.find('.note-dropzone-message');
          this.documentEventHandlers.onDragenter = function (e) {
              var isCodeview = _this.context.invoke('codeview.isActivated');
              var hasEditorSize = _this.$editor.width() > 0 && _this.$editor.height() > 0;
              if (!isCodeview && !collection.length && hasEditorSize) {
                  _this.$editor.addClass('dragover');
                  _this.$dropzone.width(_this.$editor.width());
                  _this.$dropzone.height(_this.$editor.height());
                  $dropzoneMessage.text(_this.lang.image.dragImageHere);
              }
              collection = collection.add(e.target);
          };
          this.documentEventHandlers.onDragleave = function (e) {
              collection = collection.not(e.target);
              if (!collection.length) {
                  _this.$editor.removeClass('dragover');
              }
          };
          this.documentEventHandlers.onDrop = function () {
              collection = $$1();
              _this.$editor.removeClass('dragover');
          };
          // show dropzone on dragenter when dragging a object to document
          // -but only if the editor is visible, i.e. has a positive width and height
          this.$eventListener.on('dragenter', this.documentEventHandlers.onDragenter)
              .on('dragleave', this.documentEventHandlers.onDragleave)
              .on('drop', this.documentEventHandlers.onDrop);
          // change dropzone's message on hover.
          this.$dropzone.on('dragenter', function () {
              _this.$dropzone.addClass('hover');
              $dropzoneMessage.text(_this.lang.image.dropImage);
          }).on('dragleave', function () {
              _this.$dropzone.removeClass('hover');
              $dropzoneMessage.text(_this.lang.image.dragImageHere);
          });
          // attach dropImage
          this.$dropzone.on('drop', function (event) {
              var dataTransfer = event.originalEvent.dataTransfer;
              // stop the browser from opening the dropped content
              event.preventDefault();
              if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                  _this.$editable.focus();
                  _this.context.invoke('editor.insertImagesOrCallback', dataTransfer.files);
              }
              else {
                  $$1.each(dataTransfer.types, function (idx, type) {
                      var content = dataTransfer.getData(type);
                      if (type.toLowerCase().indexOf('text') > -1) {
                          _this.context.invoke('editor.pasteHTML', content);
                      }
                      else {
                          $$1(content).each(function (idx, item) {
                              _this.context.invoke('editor.insertNode', item);
                          });
                      }
                  });
              }
          }).on('dragover', false); // prevent default dragover event
      };
      Dropzone.prototype.destroy = function () {
          var _this = this;
          Object.keys(this.documentEventHandlers).forEach(function (key) {
              _this.$eventListener.off(key.substr(2).toLowerCase(), _this.documentEventHandlers[key]);
          });
          this.documentEventHandlers = {};
      };
      return Dropzone;
  }());

  var CodeMirror;
  if (env.hasCodeMirror) {
      CodeMirror = window.CodeMirror;
  }
  /**
   * @class Codeview
   */
  var CodeView = /** @class */ (function () {
      function CodeView(context) {
          this.context = context;
          this.$editor = context.layoutInfo.editor;
          this.$editable = context.layoutInfo.editable;
          this.$codable = context.layoutInfo.codable;
          this.options = context.options;
      }
      CodeView.prototype.sync = function () {
          var isCodeview = this.isActivated();
          if (isCodeview && env.hasCodeMirror) {
              this.$codable.data('cmEditor').save();
          }
      };
      /**
       * @return {Boolean}
       */
      CodeView.prototype.isActivated = function () {
          return this.$editor.hasClass('codeview');
      };
      /**
       * toggle codeview
       */
      CodeView.prototype.toggle = function () {
          if (this.isActivated()) {
              this.deactivate();
          }
          else {
              this.activate();
          }
          this.context.triggerEvent('codeview.toggled');
      };
      /**
       * purify input value
       * @param value
       * @returns {*}
       */
      CodeView.prototype.purify = function (value) {
          if (this.options.codeviewFilter) {
              // filter code view regex
              value = value.replace(this.options.codeviewFilterRegex, '');
              // allow specific iframe tag
              if (this.options.codeviewIframeFilter) {
                  var whitelist_1 = this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase);
                  value = value.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function (tag) {
                      // remove if src attribute is duplicated
                      if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(tag)) {
                          return '';
                      }
                      for (var _i = 0, whitelist_2 = whitelist_1; _i < whitelist_2.length; _i++) {
                          var src = whitelist_2[_i];
                          // pass if src is trusted
                          if ((new RegExp('src="(https?:)?\/\/' + src.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\/(.+)"')).test(tag)) {
                              return tag;
                          }
                      }
                      return '';
                  });
              }
          }
          return value;
      };
      /**
       * activate code view
       */
      CodeView.prototype.activate = function () {
          var _this = this;
          this.$codable.val(dom.html(this.$editable, this.options.prettifyHtml));
          this.$codable.height(this.$editable.height());
          this.context.invoke('toolbar.updateCodeview', true);
          this.$editor.addClass('codeview');
          this.$codable.focus();
          // activate CodeMirror as codable
          if (env.hasCodeMirror) {
              var cmEditor_1 = CodeMirror.fromTextArea(this.$codable[0], this.options.codemirror);
              // CodeMirror TernServer
              if (this.options.codemirror.tern) {
                  var server_1 = new CodeMirror.TernServer(this.options.codemirror.tern);
                  cmEditor_1.ternServer = server_1;
                  cmEditor_1.on('cursorActivity', function (cm) {
                      server_1.updateArgHints(cm);
                  });
              }
              cmEditor_1.on('blur', function (event) {
                  _this.context.triggerEvent('blur.codeview', cmEditor_1.getValue(), event);
              });
              cmEditor_1.on('change', function (event) {
                  _this.context.triggerEvent('change.codeview', cmEditor_1.getValue(), cmEditor_1);
              });
              // CodeMirror hasn't Padding.
              cmEditor_1.setSize(null, this.$editable.outerHeight());
              this.$codable.data('cmEditor', cmEditor_1);
          }
          else {
              this.$codable.on('blur', function (event) {
                  _this.context.triggerEvent('blur.codeview', _this.$codable.val(), event);
              });
              this.$codable.on('input', function (event) {
                  _this.context.triggerEvent('change.codeview', _this.$codable.val(), _this.$codable);
              });
          }
      };
      /**
       * deactivate code view
       */
      CodeView.prototype.deactivate = function () {
          // deactivate CodeMirror as codable
          if (env.hasCodeMirror) {
              var cmEditor = this.$codable.data('cmEditor');
              this.$codable.val(cmEditor.getValue());
              cmEditor.toTextArea();
          }
          var value = this.purify(dom.value(this.$codable, this.options.prettifyHtml) || dom.emptyPara);
          var isChange = this.$editable.html() !== value;
          this.$editable.html(value);
          this.$editable.height(this.options.height ? this.$codable.height() : 'auto');
          this.$editor.removeClass('codeview');
          if (isChange) {
              this.context.triggerEvent('change', this.$editable.html(), this.$editable);
          }
          this.$editable.focus();
          this.context.invoke('toolbar.updateCodeview', false);
      };
      CodeView.prototype.destroy = function () {
          if (this.isActivated()) {
              this.deactivate();
          }
      };
      return CodeView;
  }());

  var EDITABLE_PADDING = 24;
  var Statusbar = /** @class */ (function () {
      function Statusbar(context) {
          this.$document = $$1(document);
          this.$statusbar = context.layoutInfo.statusbar;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
      }
      Statusbar.prototype.initialize = function () {
          var _this = this;
          if (this.options.airMode || this.options.disableResizeEditor) {
              this.destroy();
              return;
          }
          this.$statusbar.on('mousedown', function (event) {
              event.preventDefault();
              event.stopPropagation();
              var editableTop = _this.$editable.offset().top - _this.$document.scrollTop();
              var onMouseMove = function (event) {
                  var height = event.clientY - (editableTop + EDITABLE_PADDING);
                  height = (_this.options.minheight > 0) ? Math.max(height, _this.options.minheight) : height;
                  height = (_this.options.maxHeight > 0) ? Math.min(height, _this.options.maxHeight) : height;
                  _this.$editable.height(height);
              };
              _this.$document.on('mousemove', onMouseMove).one('mouseup', function () {
                  _this.$document.off('mousemove', onMouseMove);
              });
          });
      };
      Statusbar.prototype.destroy = function () {
          this.$statusbar.off();
          this.$statusbar.addClass('locked');
      };
      return Statusbar;
  }());

  var Fullscreen = /** @class */ (function () {
      function Fullscreen(context) {
          var _this = this;
          this.context = context;
          this.$editor = context.layoutInfo.editor;
          this.$toolbar = context.layoutInfo.toolbar;
          this.$editable = context.layoutInfo.editable;
          this.$codable = context.layoutInfo.codable;
          this.$window = $$1(window);
          this.$scrollbar = $$1('html, body');
          this.onResize = function () {
              _this.resizeTo({
                  h: _this.$window.height() - _this.$toolbar.outerHeight()
              });
          };
      }
      Fullscreen.prototype.resizeTo = function (size) {
          this.$editable.css('height', size.h);
          this.$codable.css('height', size.h);
          if (this.$codable.data('cmeditor')) {
              this.$codable.data('cmeditor').setsize(null, size.h);
          }
      };
      /**
       * toggle fullscreen
       */
      Fullscreen.prototype.toggle = function () {
          this.$editor.toggleClass('fullscreen');
          if (this.isFullscreen()) {
              this.$editable.data('orgHeight', this.$editable.css('height'));
              this.$editable.data('orgMaxHeight', this.$editable.css('maxHeight'));
              this.$editable.css('maxHeight', '');
              this.$window.on('resize', this.onResize).trigger('resize');
              this.$scrollbar.css('overflow', 'hidden');
          }
          else {
              this.$window.off('resize', this.onResize);
              this.resizeTo({ h: this.$editable.data('orgHeight') });
              this.$editable.css('maxHeight', this.$editable.css('orgMaxHeight'));
              this.$scrollbar.css('overflow', 'visible');
          }
          this.context.invoke('toolbar.updateFullscreen', this.isFullscreen());
      };
      Fullscreen.prototype.isFullscreen = function () {
          return this.$editor.hasClass('fullscreen');
      };
      return Fullscreen;
  }());

  var Handle = /** @class */ (function () {
      function Handle(context) {
          var _this = this;
          this.context = context;
          this.$document = $$1(document);
          this.$editingArea = context.layoutInfo.editingArea;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.events = {
              'summernote.mousedown': function (we, e) {
                  if (_this.update(e.target, e)) {
                      e.preventDefault();
                  }
              },
              'summernote.keyup summernote.scroll summernote.change summernote.dialog.shown': function () {
                  _this.update();
              },
              'summernote.disable': function () {
                  _this.hide();
              },
              'summernote.codeview.toggled': function () {
                  _this.update();
              }
          };
      }
      Handle.prototype.initialize = function () {
          var _this = this;
          this.$handle = $$1([
              '<div class="note-handle">',
              '<div class="note-control-selection">',
              '<div class="note-control-selection-bg"></div>',
              '<div class="note-control-holder note-control-nw"></div>',
              '<div class="note-control-holder note-control-ne"></div>',
              '<div class="note-control-holder note-control-sw"></div>',
              '<div class="',
              (this.options.disableResizeImage ? 'note-control-holder' : 'note-control-sizing'),
              ' note-control-se"></div>',
              (this.options.disableResizeImage ? '' : '<div class="note-control-selection-info"></div>'),
              '</div>',
              '</div>',
          ].join('')).prependTo(this.$editingArea);
          this.$handle.on('mousedown', function (event) {
              if (dom.isControlSizing(event.target)) {
                  event.preventDefault();
                  event.stopPropagation();
                  var $target_1 = _this.$handle.find('.note-control-selection').data('target');
                  var posStart_1 = $target_1.offset();
                  var scrollTop_1 = _this.$document.scrollTop();
                  var onMouseMove_1 = function (event) {
                      _this.context.invoke('editor.resizeTo', {
                          x: event.clientX - posStart_1.left,
                          y: event.clientY - (posStart_1.top - scrollTop_1)
                      }, $target_1, !event.shiftKey);
                      _this.update($target_1[0]);
                  };
                  _this.$document
                      .on('mousemove', onMouseMove_1)
                      .one('mouseup', function (e) {
                      e.preventDefault();
                      _this.$document.off('mousemove', onMouseMove_1);
                      _this.context.invoke('editor.afterCommand');
                  });
                  if (!$target_1.data('ratio')) { // original ratio.
                      $target_1.data('ratio', $target_1.height() / $target_1.width());
                  }
              }
          });
          // Listen for scrolling on the handle overlay.
          this.$handle.on('wheel', function (e) {
              e.preventDefault();
              _this.update();
          });
      };
      Handle.prototype.destroy = function () {
          this.$handle.remove();
      };
      Handle.prototype.update = function (target, event) {
          if (this.context.isDisabled()) {
              return false;
          }
          var isImage = dom.isImg(target);
          var $selection = this.$handle.find('.note-control-selection');
          this.context.invoke('imagePopover.update', target, event);
          if (isImage) {
              var $image = $$1(target);
              var position = $image.position();
              var pos = {
                  left: position.left + parseInt($image.css('marginLeft'), 10),
                  top: position.top + parseInt($image.css('marginTop'), 10)
              };
              // exclude margin
              var imageSize = {
                  w: $image.outerWidth(false),
                  h: $image.outerHeight(false)
              };
              $selection.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top,
                  width: imageSize.w,
                  height: imageSize.h
              }).data('target', $image); // save current image element.
              var origImageObj = new Image();
              origImageObj.src = $image.attr('src');
              var sizingText = imageSize.w + 'x' + imageSize.h + ' (' + this.lang.image.original + ': ' + origImageObj.width + 'x' + origImageObj.height + ')';
              $selection.find('.note-control-selection-info').text(sizingText);
              this.context.invoke('editor.saveTarget', target);
          }
          else {
              this.hide();
          }
          return isImage;
      };
      /**
       * hide
       *
       * @param {jQuery} $handle
       */
      Handle.prototype.hide = function () {
          this.context.invoke('editor.clearTarget');
          this.$handle.children().hide();
      };
      return Handle;
  }());

  var defaultScheme = 'http://';
  var linkPattern = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i;
  var AutoLink = /** @class */ (function () {
      function AutoLink(context) {
          var _this = this;
          this.context = context;
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              }
          };
      }
      AutoLink.prototype.initialize = function () {
          this.lastWordRange = null;
      };
      AutoLink.prototype.destroy = function () {
          this.lastWordRange = null;
      };
      AutoLink.prototype.replace = function () {
          if (!this.lastWordRange) {
              return;
          }
          var keyword = this.lastWordRange.toString();
          var match = keyword.match(linkPattern);
          if (match && (match[1] || match[2])) {
              var link = match[1] ? keyword : defaultScheme + keyword;
              var node = $$1('<a />').html(keyword).attr('href', link)[0];
              if (this.context.options.linkTargetBlank) {
                  $$1(node).attr('target', '_blank');
              }
              this.lastWordRange.insertNode(node);
              this.lastWordRange = null;
              this.context.invoke('editor.focus');
          }
      };
      AutoLink.prototype.handleKeydown = function (e) {
          if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
              var wordRange = this.context.invoke('editor.createRange').getWordRange();
              this.lastWordRange = wordRange;
          }
      };
      AutoLink.prototype.handleKeyup = function (e) {
          if (lists.contains([key.code.ENTER, key.code.SPACE], e.keyCode)) {
              this.replace();
          }
      };
      return AutoLink;
  }());

  /**
   * textarea auto sync.
   */
  var AutoSync = /** @class */ (function () {
      function AutoSync(context) {
          var _this = this;
          this.$note = context.layoutInfo.note;
          this.events = {
              'summernote.change': function () {
                  _this.$note.val(context.invoke('code'));
              }
          };
      }
      AutoSync.prototype.shouldInitialize = function () {
          return dom.isTextarea(this.$note[0]);
      };
      return AutoSync;
  }());

  var AutoReplace = /** @class */ (function () {
      function AutoReplace(context) {
          var _this = this;
          this.context = context;
          this.options = context.options.replace || {};
          this.keys = [key.code.ENTER, key.code.SPACE, key.code.PERIOD, key.code.COMMA, key.code.SEMICOLON, key.code.SLASH];
          this.previousKeydownCode = null;
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              }
          };
      }
      AutoReplace.prototype.shouldInitialize = function () {
          return !!this.options.match;
      };
      AutoReplace.prototype.initialize = function () {
          this.lastWord = null;
      };
      AutoReplace.prototype.destroy = function () {
          this.lastWord = null;
      };
      AutoReplace.prototype.replace = function () {
          if (!this.lastWord) {
              return;
          }
          var self = this;
          var keyword = this.lastWord.toString();
          this.options.match(keyword, function (match) {
              if (match) {
                  var node = '';
                  if (typeof match === 'string') {
                      node = dom.createText(match);
                  }
                  else if (match instanceof jQuery) {
                      node = match[0];
                  }
                  else if (match instanceof Node) {
                      node = match;
                  }
                  if (!node)
                      return;
                  self.lastWord.insertNode(node);
                  self.lastWord = null;
                  self.context.invoke('editor.focus');
              }
          });
      };
      AutoReplace.prototype.handleKeydown = function (e) {
          // this forces it to remember the last whole word, even if multiple termination keys are pressed
          // before the previous key is let go.
          if (this.previousKeydownCode && lists.contains(this.keys, this.previousKeydownCode)) {
              this.previousKeydownCode = e.keyCode;
              return;
          }
          if (lists.contains(this.keys, e.keyCode)) {
              var wordRange = this.context.invoke('editor.createRange').getWordRange();
              this.lastWord = wordRange;
          }
          this.previousKeydownCode = e.keyCode;
      };
      AutoReplace.prototype.handleKeyup = function (e) {
          if (lists.contains(this.keys, e.keyCode)) {
              this.replace();
          }
      };
      return AutoReplace;
  }());

  var Placeholder = /** @class */ (function () {
      function Placeholder(context) {
          var _this = this;
          this.context = context;
          this.$editingArea = context.layoutInfo.editingArea;
          this.options = context.options;
          this.events = {
              'summernote.init summernote.change': function () {
                  _this.update();
              },
              'summernote.codeview.toggled': function () {
                  _this.update();
              }
          };
      }
      Placeholder.prototype.shouldInitialize = function () {
          return !!this.options.placeholder;
      };
      Placeholder.prototype.initialize = function () {
          var _this = this;
          this.$placeholder = $$1('<div class="note-placeholder">');
          this.$placeholder.on('click', function () {
              _this.context.invoke('focus');
          }).html(this.options.placeholder).prependTo(this.$editingArea);
          this.update();
      };
      Placeholder.prototype.destroy = function () {
          this.$placeholder.remove();
      };
      Placeholder.prototype.update = function () {
          var isShow = !this.context.invoke('codeview.isActivated') && this.context.invoke('editor.isEmpty');
          this.$placeholder.toggle(isShow);
      };
      return Placeholder;
  }());

  var Buttons = /** @class */ (function () {
      function Buttons(context) {
          this.ui = $$1.summernote.ui;
          this.context = context;
          this.$toolbar = context.layoutInfo.toolbar;
          this.options = context.options;
          this.lang = this.options.langInfo;
          this.invertedKeyMap = func.invertObject(this.options.keyMap[env.isMac ? 'mac' : 'pc']);
      }
      Buttons.prototype.representShortcut = function (editorMethod) {
          var shortcut = this.invertedKeyMap[editorMethod];
          if (!this.options.shortcuts || !shortcut) {
              return '';
          }
          if (env.isMac) {
              shortcut = shortcut.replace('CMD', '⌘').replace('SHIFT', '⇧');
          }
          shortcut = shortcut.replace('BACKSLASH', '\\')
              .replace('SLASH', '/')
              .replace('LEFTBRACKET', '[')
              .replace('RIGHTBRACKET', ']');
          return ' (' + shortcut + ')';
      };
      Buttons.prototype.button = function (o) {
          if (!this.options.tooltip && o.tooltip) {
              delete o.tooltip;
          }
          o.container = this.options.container;
          return this.ui.button(o);
      };
      Buttons.prototype.initialize = function () {
          this.addToolbarButtons();
          this.addImagePopoverButtons();
          this.addLinkPopoverButtons();
          this.addTablePopoverButtons();
          this.fontInstalledMap = {};
      };
      Buttons.prototype.destroy = function () {
          delete this.fontInstalledMap;
      };
      Buttons.prototype.isFontInstalled = function (name) {
          if (!this.fontInstalledMap.hasOwnProperty(name)) {
              this.fontInstalledMap[name] = env.isFontInstalled(name) ||
                  lists.contains(this.options.fontNamesIgnoreCheck, name);
          }
          return this.fontInstalledMap[name];
      };
      Buttons.prototype.isFontDeservedToAdd = function (name) {
          var genericFamilies = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy'];
          name = name.toLowerCase();
          return (name !== '' && this.isFontInstalled(name) && genericFamilies.indexOf(name) === -1);
      };
      Buttons.prototype.colorPalette = function (className, tooltip, backColor, foreColor) {
          var _this = this;
          return this.ui.buttonGroup({
              className: 'note-color ' + className,
              children: [
                  this.button({
                      className: 'note-current-color-button',
                      contents: this.ui.icon(this.options.icons.font + ' note-recent-color'),
                      tooltip: tooltip,
                      click: function (e) {
                          var $button = $$1(e.currentTarget);
                          if (backColor && foreColor) {
                              _this.context.invoke('editor.color', {
                                  backColor: $button.attr('data-backColor'),
                                  foreColor: $button.attr('data-foreColor')
                              });
                          }
                          else if (backColor) {
                              _this.context.invoke('editor.color', {
                                  backColor: $button.attr('data-backColor')
                              });
                          }
                          else if (foreColor) {
                              _this.context.invoke('editor.color', {
                                  foreColor: $button.attr('data-foreColor')
                              });
                          }
                      },
                      callback: function ($button) {
                          var $recentColor = $button.find('.note-recent-color');
                          if (backColor) {
                              $recentColor.css('background-color', _this.options.colorButton.backColor);
                              $button.attr('data-backColor', _this.options.colorButton.backColor);
                          }
                          if (foreColor) {
                              $recentColor.css('color', _this.options.colorButton.foreColor);
                              $button.attr('data-foreColor', _this.options.colorButton.foreColor);
                          }
                          else {
                              $recentColor.css('color', 'transparent');
                          }
                      }
                  }),
                  this.button({
                      className: 'dropdown-toggle',
                      contents: this.ui.dropdownButtonContents('', this.options),
                      tooltip: this.lang.color.more,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  this.ui.dropdown({
                      items: (backColor ? [
                          '<div class="note-palette">',
                          '  <div class="note-palette-title">' + this.lang.color.background + '</div>',
                          '  <div>',
                          '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">',
                          this.lang.color.transparent,
                          '    </button>',
                          '  </div>',
                          '  <div class="note-holder" data-event="backColor"/>',
                          '  <div>',
                          '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">',
                          this.lang.color.cpSelect,
                          '    </button>',
                          '    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.backColor + '" data-event="backColorPalette">',
                          '  </div>',
                          '  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"/>',
                          '</div>',
                      ].join('') : '') +
                          (foreColor ? [
                              '<div class="note-palette">',
                              '  <div class="note-palette-title">' + this.lang.color.foreground + '</div>',
                              '  <div>',
                              '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">',
                              this.lang.color.resetToDefault,
                              '    </button>',
                              '  </div>',
                              '  <div class="note-holder" data-event="foreColor"/>',
                              '  <div>',
                              '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">',
                              this.lang.color.cpSelect,
                              '    </button>',
                              '    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="' + this.options.colorButton.foreColor + '" data-event="foreColorPalette">',
                              '  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"/>',
                              '</div>',
                          ].join('') : ''),
                      callback: function ($dropdown) {
                          $dropdown.find('.note-holder').each(function (idx, item) {
                              var $holder = $$1(item);
                              $holder.append(_this.ui.palette({
                                  colors: _this.options.colors,
                                  colorsName: _this.options.colorsName,
                                  eventName: $holder.data('event'),
                                  container: _this.options.container,
                                  tooltip: _this.options.tooltip
                              }).render());
                          });
                          /* TODO: do we have to record recent custom colors within cookies? */
                          var customColors = [
                              ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                          ];
                          $dropdown.find('.note-holder-custom').each(function (idx, item) {
                              var $holder = $$1(item);
                              $holder.append(_this.ui.palette({
                                  colors: customColors,
                                  colorsName: customColors,
                                  eventName: $holder.data('event'),
                                  container: _this.options.container,
                                  tooltip: _this.options.tooltip
                              }).render());
                          });
                          $dropdown.find('input[type=color]').each(function (idx, item) {
                              $$1(item).change(function () {
                                  var $chip = $dropdown.find('#' + $$1(this).data('event')).find('.note-color-btn').first();
                                  var color = this.value.toUpperCase();
                                  $chip.css('background-color', color)
                                      .attr('aria-label', color)
                                      .attr('data-value', color)
                                      .attr('data-original-title', color);
                                  $chip.click();
                              });
                          });
                      },
                      click: function (event) {
                          event.stopPropagation();
                          var $parent = $$1('.' + className);
                          var $button = $$1(event.target);
                          var eventName = $button.data('event');
                          var value = $button.attr('data-value');
                          if (eventName === 'openPalette') {
                              var $picker = $parent.find('#' + value);
                              var $palette = $$1($parent.find('#' + $picker.data('event')).find('.note-color-row')[0]);
                              // Shift palette chips
                              var $chip = $palette.find('.note-color-btn').last().detach();
                              // Set chip attributes
                              var color = $picker.val();
                              $chip.css('background-color', color)
                                  .attr('aria-label', color)
                                  .attr('data-value', color)
                                  .attr('data-original-title', color);
                              $palette.prepend($chip);
                              $picker.click();
                          }
                          else if (lists.contains(['backColor', 'foreColor'], eventName)) {
                              var key = eventName === 'backColor' ? 'background-color' : 'color';
                              var $color = $button.closest('.note-color').find('.note-recent-color');
                              var $currentButton = $button.closest('.note-color').find('.note-current-color-button');
                              $color.css(key, value);
                              $currentButton.attr('data-' + eventName, value);
                              _this.context.invoke('editor.' + eventName, value);
                          }
                      }
                  }),
              ]
          }).render();
      };
      Buttons.prototype.addToolbarButtons = function () {
          var _this = this;
          this.context.memo('button.style', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.magic), _this.options),
                      tooltip: _this.lang.style.style,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown({
                      className: 'dropdown-style',
                      items: _this.options.styleTags,
                      title: _this.lang.style.style,
                      template: function (item) {
                          if (typeof item === 'string') {
                              item = { tag: item, title: (_this.lang.style.hasOwnProperty(item) ? _this.lang.style[item] : item) };
                          }
                          var tag = item.tag;
                          var title = item.title;
                          var style = item.style ? ' style="' + item.style + '" ' : '';
                          var className = item.className ? ' class="' + item.className + '"' : '';
                          return '<' + tag + style + className + '>' + title + '</' + tag + '>';
                      },
                      click: _this.context.createInvokeHandler('editor.formatBlock')
                  }),
              ]).render();
          });
          var _loop_1 = function (styleIdx, styleLen) {
              var item = this_1.options.styleTags[styleIdx];
              this_1.context.memo('button.style.' + item, function () {
                  return _this.button({
                      className: 'note-btn-style-' + item,
                      contents: '<div data-value="' + item + '">' + item.toUpperCase() + '</div>',
                      tooltip: _this.lang.style[item],
                      click: _this.context.createInvokeHandler('editor.formatBlock')
                  }).render();
              });
          };
          var this_1 = this;
          for (var styleIdx = 0, styleLen = this.options.styleTags.length; styleIdx < styleLen; styleIdx++) {
              _loop_1(styleIdx, styleLen);
          }
          this.context.memo('button.bold', function () {
              return _this.button({
                  className: 'note-btn-bold',
                  contents: _this.ui.icon(_this.options.icons.bold),
                  tooltip: _this.lang.font.bold + _this.representShortcut('bold'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.bold')
              }).render();
          });
          this.context.memo('button.italic', function () {
              return _this.button({
                  className: 'note-btn-italic',
                  contents: _this.ui.icon(_this.options.icons.italic),
                  tooltip: _this.lang.font.italic + _this.representShortcut('italic'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.italic')
              }).render();
          });
          this.context.memo('button.underline', function () {
              return _this.button({
                  className: 'note-btn-underline',
                  contents: _this.ui.icon(_this.options.icons.underline),
                  tooltip: _this.lang.font.underline + _this.representShortcut('underline'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.underline')
              }).render();
          });
          this.context.memo('button.clear', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.eraser),
                  tooltip: _this.lang.font.clear + _this.representShortcut('removeFormat'),
                  click: _this.context.createInvokeHandler('editor.removeFormat')
              }).render();
          });
          this.context.memo('button.strikethrough', function () {
              return _this.button({
                  className: 'note-btn-strikethrough',
                  contents: _this.ui.icon(_this.options.icons.strikethrough),
                  tooltip: _this.lang.font.strikethrough + _this.representShortcut('strikethrough'),
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.strikethrough')
              }).render();
          });
          this.context.memo('button.superscript', function () {
              return _this.button({
                  className: 'note-btn-superscript',
                  contents: _this.ui.icon(_this.options.icons.superscript),
                  tooltip: _this.lang.font.superscript,
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.superscript')
              }).render();
          });
          this.context.memo('button.subscript', function () {
              return _this.button({
                  className: 'note-btn-subscript',
                  contents: _this.ui.icon(_this.options.icons.subscript),
                  tooltip: _this.lang.font.subscript,
                  click: _this.context.createInvokeHandlerAndUpdateState('editor.subscript')
              }).render();
          });
          this.context.memo('button.fontname', function () {
              var styleInfo = _this.context.invoke('editor.currentStyle');
              // Add 'default' fonts into the fontnames array if not exist
              $$1.each(styleInfo['font-family'].split(','), function (idx, fontname) {
                  fontname = fontname.trim().replace(/['"]+/g, '');
                  if (_this.isFontDeservedToAdd(fontname)) {
                      if (_this.options.fontNames.indexOf(fontname) === -1) {
                          _this.options.fontNames.push(fontname);
                      }
                  }
              });
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents('<span class="note-current-fontname"/>', _this.options),
                      tooltip: _this.lang.font.name,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      className: 'dropdown-fontname',
                      checkClassName: _this.options.icons.menuCheck,
                      items: _this.options.fontNames.filter(_this.isFontInstalled.bind(_this)),
                      title: _this.lang.font.name,
                      template: function (item) {
                          return '<span style="font-family: \'' + item + '\'">' + item + '</span>';
                      },
                      click: _this.context.createInvokeHandlerAndUpdateState('editor.fontName')
                  }),
              ]).render();
          });
          this.context.memo('button.fontsize', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', _this.options),
                      tooltip: _this.lang.font.size,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      className: 'dropdown-fontsize',
                      checkClassName: _this.options.icons.menuCheck,
                      items: _this.options.fontSizes,
                      title: _this.lang.font.size,
                      click: _this.context.createInvokeHandlerAndUpdateState('editor.fontSize')
                  }),
              ]).render();
          });
          this.context.memo('button.color', function () {
              return _this.colorPalette('note-color-all', _this.lang.color.recent, true, true);
          });
          this.context.memo('button.forecolor', function () {
              return _this.colorPalette('note-color-fore', _this.lang.color.foreground, false, true);
          });
          this.context.memo('button.backcolor', function () {
              return _this.colorPalette('note-color-back', _this.lang.color.background, true, false);
          });
          this.context.memo('button.ul', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.unorderedlist),
                  tooltip: _this.lang.lists.unordered + _this.representShortcut('insertUnorderedList'),
                  click: _this.context.createInvokeHandler('editor.insertUnorderedList')
              }).render();
          });
          this.context.memo('button.ol', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.orderedlist),
                  tooltip: _this.lang.lists.ordered + _this.representShortcut('insertOrderedList'),
                  click: _this.context.createInvokeHandler('editor.insertOrderedList')
              }).render();
          });
          var justifyLeft = this.button({
              contents: this.ui.icon(this.options.icons.alignLeft),
              tooltip: this.lang.paragraph.left + this.representShortcut('justifyLeft'),
              click: this.context.createInvokeHandler('editor.justifyLeft')
          });
          var justifyCenter = this.button({
              contents: this.ui.icon(this.options.icons.alignCenter),
              tooltip: this.lang.paragraph.center + this.representShortcut('justifyCenter'),
              click: this.context.createInvokeHandler('editor.justifyCenter')
          });
          var justifyRight = this.button({
              contents: this.ui.icon(this.options.icons.alignRight),
              tooltip: this.lang.paragraph.right + this.representShortcut('justifyRight'),
              click: this.context.createInvokeHandler('editor.justifyRight')
          });
          var justifyFull = this.button({
              contents: this.ui.icon(this.options.icons.alignJustify),
              tooltip: this.lang.paragraph.justify + this.representShortcut('justifyFull'),
              click: this.context.createInvokeHandler('editor.justifyFull')
          });
          var outdent = this.button({
              contents: this.ui.icon(this.options.icons.outdent),
              tooltip: this.lang.paragraph.outdent + this.representShortcut('outdent'),
              click: this.context.createInvokeHandler('editor.outdent')
          });
          var indent = this.button({
              contents: this.ui.icon(this.options.icons.indent),
              tooltip: this.lang.paragraph.indent + this.representShortcut('indent'),
              click: this.context.createInvokeHandler('editor.indent')
          });
          this.context.memo('button.justifyLeft', func.invoke(justifyLeft, 'render'));
          this.context.memo('button.justifyCenter', func.invoke(justifyCenter, 'render'));
          this.context.memo('button.justifyRight', func.invoke(justifyRight, 'render'));
          this.context.memo('button.justifyFull', func.invoke(justifyFull, 'render'));
          this.context.memo('button.outdent', func.invoke(outdent, 'render'));
          this.context.memo('button.indent', func.invoke(indent, 'render'));
          this.context.memo('button.paragraph', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.alignLeft), _this.options),
                      tooltip: _this.lang.paragraph.paragraph,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown([
                      _this.ui.buttonGroup({
                          className: 'note-align',
                          children: [justifyLeft, justifyCenter, justifyRight, justifyFull]
                      }),
                      _this.ui.buttonGroup({
                          className: 'note-list',
                          children: [outdent, indent]
                      }),
                  ]),
              ]).render();
          });
          this.context.memo('button.height', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.textHeight), _this.options),
                      tooltip: _this.lang.font.height,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdownCheck({
                      items: _this.options.lineHeights,
                      checkClassName: _this.options.icons.menuCheck,
                      className: 'dropdown-line-height',
                      title: _this.lang.font.height,
                      click: _this.context.createInvokeHandler('editor.lineHeight')
                  }),
              ]).render();
          });
          this.context.memo('button.table', function () {
              return _this.ui.buttonGroup([
                  _this.button({
                      className: 'dropdown-toggle',
                      contents: _this.ui.dropdownButtonContents(_this.ui.icon(_this.options.icons.table), _this.options),
                      tooltip: _this.lang.table.table,
                      data: {
                          toggle: 'dropdown'
                      }
                  }),
                  _this.ui.dropdown({
                      title: _this.lang.table.table,
                      className: 'note-table',
                      items: [
                          '<div class="note-dimension-picker">',
                          '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>',
                          '  <div class="note-dimension-picker-highlighted"/>',
                          '  <div class="note-dimension-picker-unhighlighted"/>',
                          '</div>',
                          '<div class="note-dimension-display">1 x 1</div>',
                      ].join('')
                  }),
              ], {
                  callback: function ($node) {
                      var $catcher = $node.find('.note-dimension-picker-mousecatcher');
                      $catcher.css({
                          width: _this.options.insertTableMaxSize.col + 'em',
                          height: _this.options.insertTableMaxSize.row + 'em'
                      }).mousedown(_this.context.createInvokeHandler('editor.insertTable'))
                          .on('mousemove', _this.tableMoveHandler.bind(_this));
                  }
              }).render();
          });
          this.context.memo('button.link', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.link),
                  tooltip: _this.lang.link.link + _this.representShortcut('linkDialog.show'),
                  click: _this.context.createInvokeHandler('linkDialog.show')
              }).render();
          });
          this.context.memo('button.picture', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.picture),
                  tooltip: _this.lang.image.image,
                  click: _this.context.createInvokeHandler('imageDialog.show')
              }).render();
          });
          this.context.memo('button.video', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.video),
                  tooltip: _this.lang.video.video,
                  click: _this.context.createInvokeHandler('videoDialog.show')
              }).render();
          });
          this.context.memo('button.hr', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.minus),
                  tooltip: _this.lang.hr.insert + _this.representShortcut('insertHorizontalRule'),
                  click: _this.context.createInvokeHandler('editor.insertHorizontalRule')
              }).render();
          });
          this.context.memo('button.fullscreen', function () {
              return _this.button({
                  className: 'btn-fullscreen',
                  contents: _this.ui.icon(_this.options.icons.arrowsAlt),
                  tooltip: _this.lang.options.fullscreen,
                  click: _this.context.createInvokeHandler('fullscreen.toggle')
              }).render();
          });
          this.context.memo('button.codeview', function () {
              return _this.button({
                  className: 'btn-codeview',
                  contents: _this.ui.icon(_this.options.icons.code),
                  tooltip: _this.lang.options.codeview,
                  click: _this.context.createInvokeHandler('codeview.toggle')
              }).render();
          });
          this.context.memo('button.redo', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.redo),
                  tooltip: _this.lang.history.redo + _this.representShortcut('redo'),
                  click: _this.context.createInvokeHandler('editor.redo')
              }).render();
          });
          this.context.memo('button.undo', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.undo),
                  tooltip: _this.lang.history.undo + _this.representShortcut('undo'),
                  click: _this.context.createInvokeHandler('editor.undo')
              }).render();
          });
          this.context.memo('button.help', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.question),
                  tooltip: _this.lang.options.help,
                  click: _this.context.createInvokeHandler('helpDialog.show')
              }).render();
          });
      };
      /**
       * image: [
       *   ['imageResize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
       *   ['float', ['floatLeft', 'floatRight', 'floatNone']],
       *   ['remove', ['removeMedia']],
       * ],
       */
      Buttons.prototype.addImagePopoverButtons = function () {
          var _this = this;
          // Image Size Buttons
          this.context.memo('button.resizeFull', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">100%</span>',
                  tooltip: _this.lang.image.resizeFull,
                  click: _this.context.createInvokeHandler('editor.resize', '1')
              }).render();
          });
          this.context.memo('button.resizeHalf', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">50%</span>',
                  tooltip: _this.lang.image.resizeHalf,
                  click: _this.context.createInvokeHandler('editor.resize', '0.5')
              }).render();
          });
          this.context.memo('button.resizeQuarter', function () {
              return _this.button({
                  contents: '<span class="note-fontsize-10">25%</span>',
                  tooltip: _this.lang.image.resizeQuarter,
                  click: _this.context.createInvokeHandler('editor.resize', '0.25')
              }).render();
          });
          this.context.memo('button.resizeNone', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.rollback),
                  tooltip: _this.lang.image.resizeNone,
                  click: _this.context.createInvokeHandler('editor.resize', '0')
              }).render();
          });
          // Float Buttons
          this.context.memo('button.floatLeft', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.floatLeft),
                  tooltip: _this.lang.image.floatLeft,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'left')
              }).render();
          });
          this.context.memo('button.floatRight', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.floatRight),
                  tooltip: _this.lang.image.floatRight,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'right')
              }).render();
          });
          this.context.memo('button.floatNone', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.rollback),
                  tooltip: _this.lang.image.floatNone,
                  click: _this.context.createInvokeHandler('editor.floatMe', 'none')
              }).render();
          });
          // Remove Buttons
          this.context.memo('button.removeMedia', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.image.remove,
                  click: _this.context.createInvokeHandler('editor.removeMedia')
              }).render();
          });
      };
      Buttons.prototype.addLinkPopoverButtons = function () {
          var _this = this;
          this.context.memo('button.linkDialogShow', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.link),
                  tooltip: _this.lang.link.edit,
                  click: _this.context.createInvokeHandler('linkDialog.show')
              }).render();
          });
          this.context.memo('button.unlink', function () {
              return _this.button({
                  contents: _this.ui.icon(_this.options.icons.unlink),
                  tooltip: _this.lang.link.unlink,
                  click: _this.context.createInvokeHandler('editor.unlink')
              }).render();
          });
      };
      /**
       * table : [
       *  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
       *  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
       * ],
       */
      Buttons.prototype.addTablePopoverButtons = function () {
          var _this = this;
          this.context.memo('button.addRowUp', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowAbove),
                  tooltip: _this.lang.table.addRowAbove,
                  click: _this.context.createInvokeHandler('editor.addRow', 'top')
              }).render();
          });
          this.context.memo('button.addRowDown', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowBelow),
                  tooltip: _this.lang.table.addRowBelow,
                  click: _this.context.createInvokeHandler('editor.addRow', 'bottom')
              }).render();
          });
          this.context.memo('button.addColLeft', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colBefore),
                  tooltip: _this.lang.table.addColLeft,
                  click: _this.context.createInvokeHandler('editor.addCol', 'left')
              }).render();
          });
          this.context.memo('button.addColRight', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colAfter),
                  tooltip: _this.lang.table.addColRight,
                  click: _this.context.createInvokeHandler('editor.addCol', 'right')
              }).render();
          });
          this.context.memo('button.deleteRow', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.rowRemove),
                  tooltip: _this.lang.table.delRow,
                  click: _this.context.createInvokeHandler('editor.deleteRow')
              }).render();
          });
          this.context.memo('button.deleteCol', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.colRemove),
                  tooltip: _this.lang.table.delCol,
                  click: _this.context.createInvokeHandler('editor.deleteCol')
              }).render();
          });
          this.context.memo('button.deleteTable', function () {
              return _this.button({
                  className: 'btn-md',
                  contents: _this.ui.icon(_this.options.icons.trash),
                  tooltip: _this.lang.table.delTable,
                  click: _this.context.createInvokeHandler('editor.deleteTable')
              }).render();
          });
      };
      Buttons.prototype.build = function ($container, groups) {
          for (var groupIdx = 0, groupLen = groups.length; groupIdx < groupLen; groupIdx++) {
              var group = groups[groupIdx];
              var groupName = Array.isArray(group) ? group[0] : group;
              var buttons = Array.isArray(group) ? ((group.length === 1) ? [group[0]] : group[1]) : [group];
              var $group = this.ui.buttonGroup({
                  className: 'note-' + groupName
              }).render();
              for (var idx = 0, len = buttons.length; idx < len; idx++) {
                  var btn = this.context.memo('button.' + buttons[idx]);
                  if (btn) {
                      $group.append(typeof btn === 'function' ? btn() : btn);
                  }
              }
              $group.appendTo($container);
          }
      };
      /**
       * @param {jQuery} [$container]
       */
      Buttons.prototype.updateCurrentStyle = function ($container) {
          var _this = this;
          var $cont = $container || this.$toolbar;
          var styleInfo = this.context.invoke('editor.currentStyle');
          this.updateBtnStates($cont, {
              '.note-btn-bold': function () {
                  return styleInfo['font-bold'] === 'bold';
              },
              '.note-btn-italic': function () {
                  return styleInfo['font-italic'] === 'italic';
              },
              '.note-btn-underline': function () {
                  return styleInfo['font-underline'] === 'underline';
              },
              '.note-btn-subscript': function () {
                  return styleInfo['font-subscript'] === 'subscript';
              },
              '.note-btn-superscript': function () {
                  return styleInfo['font-superscript'] === 'superscript';
              },
              '.note-btn-strikethrough': function () {
                  return styleInfo['font-strikethrough'] === 'strikethrough';
              }
          });
          if (styleInfo['font-family']) {
              var fontNames = styleInfo['font-family'].split(',').map(function (name) {
                  return name.replace(/[\'\"]/g, '')
                      .replace(/\s+$/, '')
                      .replace(/^\s+/, '');
              });
              var fontName_1 = lists.find(fontNames, this.isFontInstalled.bind(this));
              $cont.find('.dropdown-fontname a').each(function (idx, item) {
                  var $item = $$1(item);
                  // always compare string to avoid creating another func.
                  var isChecked = ($item.data('value') + '') === (fontName_1 + '');
                  $item.toggleClass('checked', isChecked);
              });
              $cont.find('.note-current-fontname').text(fontName_1).css('font-family', fontName_1);
          }
          if (styleInfo['font-size']) {
              var fontSize_1 = styleInfo['font-size'];
              $cont.find('.dropdown-fontsize a').each(function (idx, item) {
                  var $item = $$1(item);
                  // always compare with string to avoid creating another func.
                  var isChecked = ($item.data('value') + '') === (fontSize_1 + '');
                  $item.toggleClass('checked', isChecked);
              });
              $cont.find('.note-current-fontsize').text(fontSize_1);
          }
          if (styleInfo['line-height']) {
              var lineHeight_1 = styleInfo['line-height'];
              $cont.find('.dropdown-line-height li a').each(function (idx, item) {
                  // always compare with string to avoid creating another func.
                  var isChecked = ($$1(item).data('value') + '') === (lineHeight_1 + '');
                  _this.className = isChecked ? 'checked' : '';
              });
          }
      };
      Buttons.prototype.updateBtnStates = function ($container, infos) {
          var _this = this;
          $$1.each(infos, function (selector, pred) {
              _this.ui.toggleBtnActive($container.find(selector), pred());
          });
      };
      Buttons.prototype.tableMoveHandler = function (event) {
          var PX_PER_EM = 18;
          var $picker = $$1(event.target.parentNode); // target is mousecatcher
          var $dimensionDisplay = $picker.next();
          var $catcher = $picker.find('.note-dimension-picker-mousecatcher');
          var $highlighted = $picker.find('.note-dimension-picker-highlighted');
          var $unhighlighted = $picker.find('.note-dimension-picker-unhighlighted');
          var posOffset;
          // HTML5 with jQuery - e.offsetX is undefined in Firefox
          if (event.offsetX === undefined) {
              var posCatcher = $$1(event.target).offset();
              posOffset = {
                  x: event.pageX - posCatcher.left,
                  y: event.pageY - posCatcher.top
              };
          }
          else {
              posOffset = {
                  x: event.offsetX,
                  y: event.offsetY
              };
          }
          var dim = {
              c: Math.ceil(posOffset.x / PX_PER_EM) || 1,
              r: Math.ceil(posOffset.y / PX_PER_EM) || 1
          };
          $highlighted.css({ width: dim.c + 'em', height: dim.r + 'em' });
          $catcher.data('value', dim.c + 'x' + dim.r);
          if (dim.c > 3 && dim.c < this.options.insertTableMaxSize.col) {
              $unhighlighted.css({ width: dim.c + 1 + 'em' });
          }
          if (dim.r > 3 && dim.r < this.options.insertTableMaxSize.row) {
              $unhighlighted.css({ height: dim.r + 1 + 'em' });
          }
          $dimensionDisplay.html(dim.c + ' x ' + dim.r);
      };
      return Buttons;
  }());

  var Toolbar = /** @class */ (function () {
      function Toolbar(context) {
          this.context = context;
          this.$window = $$1(window);
          this.$document = $$1(document);
          this.ui = $$1.summernote.ui;
          this.$note = context.layoutInfo.note;
          this.$editor = context.layoutInfo.editor;
          this.$toolbar = context.layoutInfo.toolbar;
          this.$editable = context.layoutInfo.editable;
          this.$statusbar = context.layoutInfo.statusbar;
          this.options = context.options;
          this.isFollowing = false;
          this.followScroll = this.followScroll.bind(this);
      }
      Toolbar.prototype.shouldInitialize = function () {
          return !this.options.airMode;
      };
      Toolbar.prototype.initialize = function () {
          var _this = this;
          this.options.toolbar = this.options.toolbar || [];
          if (!this.options.toolbar.length) {
              this.$toolbar.hide();
          }
          else {
              this.context.invoke('buttons.build', this.$toolbar, this.options.toolbar);
          }
          if (this.options.toolbarContainer) {
              this.$toolbar.appendTo(this.options.toolbarContainer);
          }
          this.changeContainer(false);
          this.$note.on('summernote.keyup summernote.mouseup summernote.change', function () {
              _this.context.invoke('buttons.updateCurrentStyle');
          });
          this.context.invoke('buttons.updateCurrentStyle');
          if (this.options.followingToolbar) {
              this.$window.on('scroll resize', this.followScroll);
          }
      };
      Toolbar.prototype.destroy = function () {
          this.$toolbar.children().remove();
          if (this.options.followingToolbar) {
              this.$window.off('scroll resize', this.followScroll);
          }
      };
      Toolbar.prototype.followScroll = function () {
          if (this.$editor.hasClass('fullscreen')) {
              return false;
          }
          var editorHeight = this.$editor.outerHeight();
          var editorWidth = this.$editor.width();
          var toolbarHeight = this.$toolbar.height();
          var statusbarHeight = this.$statusbar.height();
          // check if the web app is currently using another static bar
          var otherBarHeight = 0;
          if (this.options.otherStaticBar) {
              otherBarHeight = $$1(this.options.otherStaticBar).outerHeight();
          }
          var currentOffset = this.$document.scrollTop();
          var editorOffsetTop = this.$editor.offset().top;
          var editorOffsetBottom = editorOffsetTop + editorHeight;
          var activateOffset = editorOffsetTop - otherBarHeight;
          var deactivateOffsetBottom = editorOffsetBottom - otherBarHeight - toolbarHeight - statusbarHeight;
          if (!this.isFollowing &&
              (currentOffset > activateOffset) && (currentOffset < deactivateOffsetBottom - toolbarHeight)) {
              this.isFollowing = true;
              this.$toolbar.css({
                  position: 'fixed',
                  top: otherBarHeight,
                  width: editorWidth
              });
              this.$editable.css({
                  marginTop: this.$toolbar.height() + 5
              });
          }
          else if (this.isFollowing &&
              ((currentOffset < activateOffset) || (currentOffset > deactivateOffsetBottom))) {
              this.isFollowing = false;
              this.$toolbar.css({
                  position: 'relative',
                  top: 0,
                  width: '100%'
              });
              this.$editable.css({
                  marginTop: ''
              });
          }
      };
      Toolbar.prototype.changeContainer = function (isFullscreen) {
          if (isFullscreen) {
              this.$toolbar.prependTo(this.$editor);
          }
          else {
              if (this.options.toolbarContainer) {
                  this.$toolbar.appendTo(this.options.toolbarContainer);
              }
          }
          this.followScroll();
      };
      Toolbar.prototype.updateFullscreen = function (isFullscreen) {
          this.ui.toggleBtnActive(this.$toolbar.find('.btn-fullscreen'), isFullscreen);
          this.changeContainer(isFullscreen);
      };
      Toolbar.prototype.updateCodeview = function (isCodeview) {
          this.ui.toggleBtnActive(this.$toolbar.find('.btn-codeview'), isCodeview);
          if (isCodeview) {
              this.deactivate();
          }
          else {
              this.activate();
          }
      };
      Toolbar.prototype.activate = function (isIncludeCodeview) {
          var $btn = this.$toolbar.find('button');
          if (!isIncludeCodeview) {
              $btn = $btn.not('.btn-codeview');
          }
          this.ui.toggleBtn($btn, true);
      };
      Toolbar.prototype.deactivate = function (isIncludeCodeview) {
          var $btn = this.$toolbar.find('button');
          if (!isIncludeCodeview) {
              $btn = $btn.not('.btn-codeview');
          }
          this.ui.toggleBtn($btn, false);
      };
      return Toolbar;
  }());

  var LinkDialog = /** @class */ (function () {
      function LinkDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
          context.memo('help.linkDialog.show', this.options.langInfo.help['linkDialog.show']);
      }
      LinkDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.textToDisplay + "</label>",
              '<input class="note-link-text form-control note-form-control note-input" type="text" />',
              '</div>',
              '<div class="form-group note-form-group">',
              "<label class=\"note-form-label\">" + this.lang.link.url + "</label>",
              '<input class="note-link-url form-control note-form-control note-input" type="text" value="http://" />',
              '</div>',
              !this.options.disableLinkTarget
                  ? $$1('<div/>').append(this.ui.checkbox({
                      className: 'sn-checkbox-open-in-new-window',
                      text: this.lang.link.openInNewWindow,
                      checked: true
                  }).render()).html()
                  : '',
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-link-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.link.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              className: 'link-dialog',
              title: this.lang.link.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      LinkDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      LinkDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      /**
       * toggle update button
       */
      LinkDialog.prototype.toggleLinkBtn = function ($linkBtn, $linkText, $linkUrl) {
          this.ui.toggleBtn($linkBtn, $linkText.val() && $linkUrl.val());
      };
      /**
       * Show link dialog and set event handlers on dialog controls.
       *
       * @param {Object} linkInfo
       * @return {Promise}
       */
      LinkDialog.prototype.showLinkDialog = function (linkInfo) {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $linkText = _this.$dialog.find('.note-link-text');
              var $linkUrl = _this.$dialog.find('.note-link-url');
              var $linkBtn = _this.$dialog.find('.note-link-btn');
              var $openInNewWindow = _this.$dialog
                  .find('.sn-checkbox-open-in-new-window input[type=checkbox]');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // If no url was given and given text is valid URL then copy that into URL Field
                  if (!linkInfo.url && func.isValidUrl(linkInfo.text)) {
                      linkInfo.url = linkInfo.text;
                  }
                  $linkText.on('input paste propertychange', function () {
                      // If linktext was modified by input events,
                      // cloning text from linkUrl will be stopped.
                      linkInfo.text = $linkText.val();
                      _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  }).val(linkInfo.text);
                  $linkUrl.on('input paste propertychange', function () {
                      // Display same text on `Text to display` as default
                      // when linktext has no text
                      if (!linkInfo.text) {
                          $linkText.val($linkUrl.val());
                      }
                      _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  }).val(linkInfo.url);
                  if (!env.isSupportTouch) {
                      $linkUrl.trigger('focus');
                  }
                  _this.toggleLinkBtn($linkBtn, $linkText, $linkUrl);
                  _this.bindEnterKey($linkUrl, $linkBtn);
                  _this.bindEnterKey($linkText, $linkBtn);
                  var isNewWindowChecked = linkInfo.isNewWindow !== undefined
                      ? linkInfo.isNewWindow : _this.context.options.linkTargetBlank;
                  $openInNewWindow.prop('checked', isNewWindowChecked);
                  $linkBtn.one('click', function (event) {
                      event.preventDefault();
                      deferred.resolve({
                          range: linkInfo.range,
                          url: $linkUrl.val(),
                          text: $linkText.val(),
                          isNewWindow: $openInNewWindow.is(':checked')
                      });
                      _this.ui.hideDialog(_this.$dialog);
                  });
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  // detach events
                  $linkText.off();
                  $linkUrl.off();
                  $linkBtn.off();
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      /**
       * @param {Object} layoutInfo
       */
      LinkDialog.prototype.show = function () {
          var _this = this;
          var linkInfo = this.context.invoke('editor.getLinkInfo');
          this.context.invoke('editor.saveRange');
          this.showLinkDialog(linkInfo).then(function (linkInfo) {
              _this.context.invoke('editor.restoreRange');
              _this.context.invoke('editor.createLink', linkInfo);
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return LinkDialog;
  }());

  var LinkPopover = /** @class */ (function () {
      function LinkPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.keyup summernote.mouseup summernote.change summernote.scroll': function () {
                  _this.update();
              },
              'summernote.disable summernote.dialog.shown': function () {
                  _this.hide();
              }
          };
      }
      LinkPopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.link);
      };
      LinkPopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-link-popover',
              callback: function ($node) {
                  var $content = $node.find('.popover-content,.note-popover-content');
                  $content.prepend('<span><a target="_blank"></a>&nbsp;</span>');
              }
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.link);
      };
      LinkPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      LinkPopover.prototype.update = function () {
          // Prevent focusing on editable when invoke('code') is executed
          if (!this.context.invoke('editor.hasFocus')) {
              this.hide();
              return;
          }
          var rng = this.context.invoke('editor.getLastRange');
          if (rng.isCollapsed() && rng.isOnAnchor()) {
              var anchor = dom.ancestor(rng.sc, dom.isAnchor);
              var href = $$1(anchor).attr('href');
              this.$popover.find('a').attr('href', href).html(href);
              var pos = dom.posFromPlaceholder(anchor);
              this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
              });
          }
          else {
              this.hide();
          }
      };
      LinkPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return LinkPopover;
  }());

  var ImageDialog = /** @class */ (function () {
      function ImageDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      ImageDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var imageLimitation = '';
          if (this.options.maximumImageFileSize) {
              var unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
              var readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +
                  ' ' + ' KMGTP'[unit] + 'B';
              imageLimitation = "<small>" + (this.lang.image.maximumFileSize + ' : ' + readableSize) + "</small>";
          }
          var body = [
              '<div class="form-group note-form-group note-group-select-from-files">',
              '<label class="note-form-label">' + this.lang.image.selectFromFiles + '</label>',
              '<input class="note-image-input form-control-file note-form-control note-input" ',
              ' type="file" name="files" accept="image/*" multiple="multiple" />',
              imageLimitation,
              '</div>',
              '<div class="form-group note-group-image-url" style="overflow:auto;">',
              '<label class="note-form-label">' + this.lang.image.url + '</label>',
              '<input class="note-image-url form-control note-form-control note-input ',
              ' col-md-12" type="text" />',
              '</div>',
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.image.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              title: this.lang.image.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      ImageDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      ImageDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      ImageDialog.prototype.show = function () {
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showImageDialog().then(function (data) {
              // [workaround] hide dialog before restore range for IE range focus
              _this.ui.hideDialog(_this.$dialog);
              _this.context.invoke('editor.restoreRange');
              if (typeof data === 'string') { // image url
                  // If onImageLinkInsert set,
                  if (_this.options.callbacks.onImageLinkInsert) {
                      _this.context.triggerEvent('image.link.insert', data);
                  }
                  else {
                      _this.context.invoke('editor.insertImage', data);
                  }
              }
              else { // array of files
                  _this.context.invoke('editor.insertImagesOrCallback', data);
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      /**
       * show image dialog
       *
       * @param {jQuery} $dialog
       * @return {Promise}
       */
      ImageDialog.prototype.showImageDialog = function () {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $imageInput = _this.$dialog.find('.note-image-input');
              var $imageUrl = _this.$dialog.find('.note-image-url');
              var $imageBtn = _this.$dialog.find('.note-image-btn');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  // Cloning imageInput to clear element.
                  $imageInput.replaceWith($imageInput.clone().on('change', function (event) {
                      deferred.resolve(event.target.files || event.target.value);
                  }).val(''));
                  $imageUrl.on('input paste propertychange', function () {
                      _this.ui.toggleBtn($imageBtn, $imageUrl.val());
                  }).val('');
                  if (!env.isSupportTouch) {
                      $imageUrl.trigger('focus');
                  }
                  $imageBtn.click(function (event) {
                      event.preventDefault();
                      deferred.resolve($imageUrl.val());
                  });
                  _this.bindEnterKey($imageUrl, $imageBtn);
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  $imageInput.off();
                  $imageUrl.off();
                  $imageBtn.off();
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          });
      };
      return ImageDialog;
  }());

  /**
   * Image popover module
   *  mouse events that show/hide popover will be handled by Handle.js.
   *  Handle.js will receive the events and invoke 'imagePopover.update'.
   */
  var ImagePopover = /** @class */ (function () {
      function ImagePopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.editable = context.layoutInfo.editable[0];
          this.options = context.options;
          this.events = {
              'summernote.disable': function () {
                  _this.hide();
              }
          };
      }
      ImagePopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.image);
      };
      ImagePopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-image-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.image);
      };
      ImagePopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      ImagePopover.prototype.update = function (target, event) {
          if (dom.isImg(target)) {
              var pos = dom.posFromPlaceholder(target);
              var posEditor = dom.posFromPlaceholder(this.editable);
              this.$popover.css({
                  display: 'block',
                  left: this.options.popatmouse ? event.pageX - 20 : pos.left,
                  top: this.options.popatmouse ? event.pageY : Math.min(pos.top, posEditor.top)
              });
          }
          else {
              this.hide();
          }
      };
      ImagePopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return ImagePopover;
  }());

  var TablePopover = /** @class */ (function () {
      function TablePopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.mousedown': function (we, e) {
                  _this.update(e.target);
              },
              'summernote.keyup summernote.scroll summernote.change': function () {
                  _this.update();
              },
              'summernote.disable': function () {
                  _this.hide();
              }
          };
      }
      TablePopover.prototype.shouldInitialize = function () {
          return !lists.isEmpty(this.options.popover.table);
      };
      TablePopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-table-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content,.note-popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.table);
          // [workaround] Disable Firefox's default table editor
          if (env.isFF) {
              document.execCommand('enableInlineTableEditing', false, false);
          }
      };
      TablePopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      TablePopover.prototype.update = function (target) {
          if (this.context.isDisabled()) {
              return false;
          }
          var isCell = dom.isCell(target);
          if (isCell) {
              var pos = dom.posFromPlaceholder(target);
              this.$popover.css({
                  display: 'block',
                  left: pos.left,
                  top: pos.top
              });
          }
          else {
              this.hide();
          }
          return isCell;
      };
      TablePopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return TablePopover;
  }());

  var VideoDialog = /** @class */ (function () {
      function VideoDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      VideoDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<div class="form-group note-form-group row-fluid">',
              "<label class=\"note-form-label\">" + this.lang.video.url + " <small class=\"text-muted\">" + this.lang.video.providers + "</small></label>",
              '<input class="note-video-url form-control note-form-control note-input" type="text" />',
              '</div>',
          ].join('');
          var buttonClass = 'btn btn-primary note-btn note-btn-primary note-video-btn';
          var footer = "<input type=\"button\" href=\"#\" class=\"" + buttonClass + "\" value=\"" + this.lang.video.insert + "\" disabled>";
          this.$dialog = this.ui.dialog({
              title: this.lang.video.insert,
              fade: this.options.dialogsFade,
              body: body,
              footer: footer
          }).render().appendTo($container);
      };
      VideoDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      VideoDialog.prototype.bindEnterKey = function ($input, $btn) {
          $input.on('keypress', function (event) {
              if (event.keyCode === key.code.ENTER) {
                  event.preventDefault();
                  $btn.trigger('click');
              }
          });
      };
      VideoDialog.prototype.createVideoNode = function (url) {
          // video url patterns(youtube, instagram, vimeo, dailymotion, youku, mp4, ogg, webm)
          var ytRegExp = /\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/;
          var ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
          var ytMatch = url.match(ytRegExp);
          var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
          var igMatch = url.match(igRegExp);
          var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
          var vMatch = url.match(vRegExp);
          var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
          var vimMatch = url.match(vimRegExp);
          var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
          var dmMatch = url.match(dmRegExp);
          var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
          var youkuMatch = url.match(youkuRegExp);
          var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
          var qqMatch = url.match(qqRegExp);
          var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
          var qqMatch2 = url.match(qqRegExp2);
          var mp4RegExp = /^.+.(mp4|m4v)$/;
          var mp4Match = url.match(mp4RegExp);
          var oggRegExp = /^.+.(ogg|ogv)$/;
          var oggMatch = url.match(oggRegExp);
          var webmRegExp = /^.+.(webm)$/;
          var webmMatch = url.match(webmRegExp);
          var fbRegExp = /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/;
          var fbMatch = url.match(fbRegExp);
          var $video;
          if (ytMatch && ytMatch[1].length === 11) {
              var youtubeId = ytMatch[1];
              var start = 0;
              if (typeof ytMatch[2] !== 'undefined') {
                  var ytMatchForStart = ytMatch[2].match(ytRegExpForStart);
                  if (ytMatchForStart) {
                      for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
                          start += (typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0);
                      }
                  }
              }
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', '//www.youtube.com/embed/' + youtubeId + (start > 0 ? '?start=' + start : ''))
                  .attr('width', '640').attr('height', '360');
          }
          else if (igMatch && igMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', 'https://instagram.com/p/' + igMatch[1] + '/embed/')
                  .attr('width', '612').attr('height', '710')
                  .attr('scrolling', 'no')
                  .attr('allowtransparency', 'true');
          }
          else if (vMatch && vMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', vMatch[0] + '/embed/simple')
                  .attr('width', '600').attr('height', '600')
                  .attr('class', 'vine-embed');
          }
          else if (vimMatch && vimMatch[3].length) {
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('src', '//player.vimeo.com/video/' + vimMatch[3])
                  .attr('width', '640').attr('height', '360');
          }
          else if (dmMatch && dmMatch[2].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2])
                  .attr('width', '640').attr('height', '360');
          }
          else if (youkuMatch && youkuMatch[1].length) {
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('height', '498')
                  .attr('width', '510')
                  .attr('src', '//player.youku.com/embed/' + youkuMatch[1]);
          }
          else if ((qqMatch && qqMatch[1].length) || (qqMatch2 && qqMatch2[2].length)) {
              var vid = ((qqMatch && qqMatch[1].length) ? qqMatch[1] : qqMatch2[2]);
              $video = $$1('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
                  .attr('frameborder', 0)
                  .attr('height', '310')
                  .attr('width', '500')
                  .attr('src', 'http://v.qq.com/iframe/player.html?vid=' + vid + '&amp;auto=0');
          }
          else if (mp4Match || oggMatch || webmMatch) {
              $video = $$1('<video controls>')
                  .attr('src', url)
                  .attr('width', '640').attr('height', '360');
          }
          else if (fbMatch && fbMatch[0].length) {
              $video = $$1('<iframe>')
                  .attr('frameborder', 0)
                  .attr('src', 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(fbMatch[0]) + '&show_text=0&width=560')
                  .attr('width', '560').attr('height', '301')
                  .attr('scrolling', 'no')
                  .attr('allowtransparency', 'true');
          }
          else {
              // this is not a known video link. Now what, Cat? Now what?
              return false;
          }
          $video.addClass('note-video-clip');
          return $video[0];
      };
      VideoDialog.prototype.show = function () {
          var _this = this;
          var text = this.context.invoke('editor.getSelectedText');
          this.context.invoke('editor.saveRange');
          this.showVideoDialog(text).then(function (url) {
              // [workaround] hide dialog before restore range for IE range focus
              _this.ui.hideDialog(_this.$dialog);
              _this.context.invoke('editor.restoreRange');
              // build node
              var $node = _this.createVideoNode(url);
              if ($node) {
                  // insert video node
                  _this.context.invoke('editor.insertNode', $node);
              }
          }).fail(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      /**
       * show image dialog
       *
       * @param {jQuery} $dialog
       * @return {Promise}
       */
      VideoDialog.prototype.showVideoDialog = function (text) {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              var $videoUrl = _this.$dialog.find('.note-video-url');
              var $videoBtn = _this.$dialog.find('.note-video-btn');
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  $videoUrl.on('input paste propertychange', function () {
                      _this.ui.toggleBtn($videoBtn, $videoUrl.val());
                  });
                  if (!env.isSupportTouch) {
                      $videoUrl.trigger('focus');
                  }
                  $videoBtn.click(function (event) {
                      event.preventDefault();
                      deferred.resolve($videoUrl.val());
                  });
                  _this.bindEnterKey($videoUrl, $videoBtn);
              });
              _this.ui.onDialogHidden(_this.$dialog, function () {
                  $videoUrl.off();
                  $videoBtn.off();
                  if (deferred.state() === 'pending') {
                      deferred.reject();
                  }
              });
              _this.ui.showDialog(_this.$dialog);
          });
      };
      return VideoDialog;
  }());

  var HelpDialog = /** @class */ (function () {
      function HelpDialog(context) {
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$body = $$1(document.body);
          this.$editor = context.layoutInfo.editor;
          this.options = context.options;
          this.lang = this.options.langInfo;
      }
      HelpDialog.prototype.initialize = function () {
          var $container = this.options.dialogsInBody ? this.$body : this.$editor;
          var body = [
              '<p class="text-center">',
              '<a href="http://summernote.org/" target="_blank">Summernote 0.8.12</a> · ',
              '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ',
              '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>',
              '</p>',
          ].join('');
          this.$dialog = this.ui.dialog({
              title: this.lang.options.help,
              fade: this.options.dialogsFade,
              body: this.createShortcutList(),
              footer: body,
              callback: function ($node) {
                  $node.find('.modal-body,.note-modal-body').css({
                      'max-height': 300,
                      'overflow': 'scroll'
                  });
              }
          }).render().appendTo($container);
      };
      HelpDialog.prototype.destroy = function () {
          this.ui.hideDialog(this.$dialog);
          this.$dialog.remove();
      };
      HelpDialog.prototype.createShortcutList = function () {
          var _this = this;
          var keyMap = this.options.keyMap[env.isMac ? 'mac' : 'pc'];
          return Object.keys(keyMap).map(function (key) {
              var command = keyMap[key];
              var $row = $$1('<div><div class="help-list-item"/></div>');
              $row.append($$1('<label><kbd>' + key + '</kdb></label>').css({
                  'width': 180,
                  'margin-right': 10
              })).append($$1('<span/>').html(_this.context.memo('help.' + command) || command));
              return $row.html();
          }).join('');
      };
      /**
       * show help dialog
       *
       * @return {Promise}
       */
      HelpDialog.prototype.showHelpDialog = function () {
          var _this = this;
          return $$1.Deferred(function (deferred) {
              _this.ui.onDialogShown(_this.$dialog, function () {
                  _this.context.triggerEvent('dialog.shown');
                  deferred.resolve();
              });
              _this.ui.showDialog(_this.$dialog);
          }).promise();
      };
      HelpDialog.prototype.show = function () {
          var _this = this;
          this.context.invoke('editor.saveRange');
          this.showHelpDialog().then(function () {
              _this.context.invoke('editor.restoreRange');
          });
      };
      return HelpDialog;
  }());

  var AIR_MODE_POPOVER_X_OFFSET = 20;
  var AirPopover = /** @class */ (function () {
      function AirPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.options = context.options;
          this.events = {
              'summernote.keyup summernote.mouseup summernote.scroll': function () {
                  _this.update();
              },
              'summernote.disable summernote.change summernote.dialog.shown': function () {
                  _this.hide();
              },
              'summernote.focusout': function (we, e) {
                  // [workaround] Firefox doesn't support relatedTarget on focusout
                  //  - Ignore hide action on focus out in FF.
                  if (env.isFF) {
                      return;
                  }
                  if (!e.relatedTarget || !dom.ancestor(e.relatedTarget, func.eq(_this.$popover[0]))) {
                      _this.hide();
                  }
              }
          };
      }
      AirPopover.prototype.shouldInitialize = function () {
          return this.options.airMode && !lists.isEmpty(this.options.popover.air);
      };
      AirPopover.prototype.initialize = function () {
          this.$popover = this.ui.popover({
              className: 'note-air-popover'
          }).render().appendTo(this.options.container);
          var $content = this.$popover.find('.popover-content');
          this.context.invoke('buttons.build', $content, this.options.popover.air);
      };
      AirPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      AirPopover.prototype.update = function () {
          var styleInfo = this.context.invoke('editor.currentStyle');
          if (styleInfo.range && !styleInfo.range.isCollapsed()) {
              var rect = lists.last(styleInfo.range.getClientRects());
              if (rect) {
                  var bnd = func.rect2bnd(rect);
                  this.$popover.css({
                      display: 'block',
                      left: Math.max(bnd.left + bnd.width / 2, 0) - AIR_MODE_POPOVER_X_OFFSET,
                      top: bnd.top + bnd.height
                  });
                  this.context.invoke('buttons.updateCurrentStyle', this.$popover);
              }
          }
          else {
              this.hide();
          }
      };
      AirPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return AirPopover;
  }());

  var POPOVER_DIST = 5;
  var HintPopover = /** @class */ (function () {
      function HintPopover(context) {
          var _this = this;
          this.context = context;
          this.ui = $$1.summernote.ui;
          this.$editable = context.layoutInfo.editable;
          this.options = context.options;
          this.hint = this.options.hint || [];
          this.direction = this.options.hintDirection || 'bottom';
          this.hints = Array.isArray(this.hint) ? this.hint : [this.hint];
          this.events = {
              'summernote.keyup': function (we, e) {
                  if (!e.isDefaultPrevented()) {
                      _this.handleKeyup(e);
                  }
              },
              'summernote.keydown': function (we, e) {
                  _this.handleKeydown(e);
              },
              'summernote.disable summernote.dialog.shown': function () {
                  _this.hide();
              }
          };
      }
      HintPopover.prototype.shouldInitialize = function () {
          return this.hints.length > 0;
      };
      HintPopover.prototype.initialize = function () {
          var _this = this;
          this.lastWordRange = null;
          this.$popover = this.ui.popover({
              className: 'note-hint-popover',
              hideArrow: true,
              direction: ''
          }).render().appendTo(this.options.container);
          this.$popover.hide();
          this.$content = this.$popover.find('.popover-content,.note-popover-content');
          this.$content.on('click', '.note-hint-item', function (e) {
              _this.$content.find('.active').removeClass('active');
              $$1(e.currentTarget).addClass('active');
              _this.replace();
          });
      };
      HintPopover.prototype.destroy = function () {
          this.$popover.remove();
      };
      HintPopover.prototype.selectItem = function ($item) {
          this.$content.find('.active').removeClass('active');
          $item.addClass('active');
          this.$content[0].scrollTop = $item[0].offsetTop - (this.$content.innerHeight() / 2);
      };
      HintPopover.prototype.moveDown = function () {
          var $current = this.$content.find('.note-hint-item.active');
          var $next = $current.next();
          if ($next.length) {
              this.selectItem($next);
          }
          else {
              var $nextGroup = $current.parent().next();
              if (!$nextGroup.length) {
                  $nextGroup = this.$content.find('.note-hint-group').first();
              }
              this.selectItem($nextGroup.find('.note-hint-item').first());
          }
      };
      HintPopover.prototype.moveUp = function () {
          var $current = this.$content.find('.note-hint-item.active');
          var $prev = $current.prev();
          if ($prev.length) {
              this.selectItem($prev);
          }
          else {
              var $prevGroup = $current.parent().prev();
              if (!$prevGroup.length) {
                  $prevGroup = this.$content.find('.note-hint-group').last();
              }
              this.selectItem($prevGroup.find('.note-hint-item').last());
          }
      };
      HintPopover.prototype.replace = function () {
          var $item = this.$content.find('.note-hint-item.active');
          if ($item.length) {
              var node = this.nodeFromItem($item);
              // XXX: consider to move codes to editor for recording redo/undo.
              this.lastWordRange.insertNode(node);
              range.createFromNode(node).collapse().select();
              this.lastWordRange = null;
              this.hide();
              this.context.triggerEvent('change', this.$editable.html(), this.$editable[0]);
              this.context.invoke('editor.focus');
          }
      };
      HintPopover.prototype.nodeFromItem = function ($item) {
          var hint = this.hints[$item.data('index')];
          var item = $item.data('item');
          var node = hint.content ? hint.content(item) : item;
          if (typeof node === 'string') {
              node = dom.createText(node);
          }
          return node;
      };
      HintPopover.prototype.createItemTemplates = function (hintIdx, items) {
          var hint = this.hints[hintIdx];
          return items.map(function (item, idx) {
              var $item = $$1('<div class="note-hint-item"/>');
              $item.append(hint.template ? hint.template(item) : item + '');
              $item.data({
                  'index': hintIdx,
                  'item': item
              });
              return $item;
          });
      };
      HintPopover.prototype.handleKeydown = function (e) {
          if (!this.$popover.is(':visible')) {
              return;
          }
          if (e.keyCode === key.code.ENTER) {
              e.preventDefault();
              this.replace();
          }
          else if (e.keyCode === key.code.UP) {
              e.preventDefault();
              this.moveUp();
          }
          else if (e.keyCode === key.code.DOWN) {
              e.preventDefault();
              this.moveDown();
          }
      };
      HintPopover.prototype.searchKeyword = function (index, keyword, callback) {
          var hint = this.hints[index];
          if (hint && hint.match.test(keyword) && hint.search) {
              var matches = hint.match.exec(keyword);
              hint.search(matches[1], callback);
          }
          else {
              callback();
          }
      };
      HintPopover.prototype.createGroup = function (idx, keyword) {
          var _this = this;
          var $group = $$1('<div class="note-hint-group note-hint-group-' + idx + '"/>');
          this.searchKeyword(idx, keyword, function (items) {
              items = items || [];
              if (items.length) {
                  $group.html(_this.createItemTemplates(idx, items));
                  _this.show();
              }
          });
          return $group;
      };
      HintPopover.prototype.handleKeyup = function (e) {
          var _this = this;
          if (!lists.contains([key.code.ENTER, key.code.UP, key.code.DOWN], e.keyCode)) {
              var wordRange = this.context.invoke('editor.getLastRange').getWordRange();
              var keyword_1 = wordRange.toString();
              if (this.hints.length && keyword_1) {
                  this.$content.empty();
                  var bnd = func.rect2bnd(lists.last(wordRange.getClientRects()));
                  if (bnd) {
                      this.$popover.hide();
                      this.lastWordRange = wordRange;
                      this.hints.forEach(function (hint, idx) {
                          if (hint.match.test(keyword_1)) {
                              _this.createGroup(idx, keyword_1).appendTo(_this.$content);
                          }
                      });
                      // select first .note-hint-item
                      this.$content.find('.note-hint-item:first').addClass('active');
                      // set position for popover after group is created
                      if (this.direction === 'top') {
                          this.$popover.css({
                              left: bnd.left,
                              top: bnd.top - this.$popover.outerHeight() - POPOVER_DIST
                          });
                      }
                      else {
                          this.$popover.css({
                              left: bnd.left,
                              top: bnd.top + bnd.height + POPOVER_DIST
                          });
                      }
                  }
              }
              else {
                  this.hide();
              }
          }
      };
      HintPopover.prototype.show = function () {
          this.$popover.show();
      };
      HintPopover.prototype.hide = function () {
          this.$popover.hide();
      };
      return HintPopover;
  }());

  $$1.summernote = $$1.extend($$1.summernote, {
      version: '0.8.12',
      plugins: {},
      dom: dom,
      range: range,
      options: {
          langInfo: $$1.summernote.lang['en-US'],
          modules: {
              'editor': Editor,
              'clipboard': Clipboard,
              'dropzone': Dropzone,
              'codeview': CodeView,
              'statusbar': Statusbar,
              'fullscreen': Fullscreen,
              'handle': Handle,
              // FIXME: HintPopover must be front of autolink
              //  - Script error about range when Enter key is pressed on hint popover
              'hintPopover': HintPopover,
              'autoLink': AutoLink,
              'autoSync': AutoSync,
              'autoReplace': AutoReplace,
              'placeholder': Placeholder,
              'buttons': Buttons,
              'toolbar': Toolbar,
              'linkDialog': LinkDialog,
              'linkPopover': LinkPopover,
              'imageDialog': ImageDialog,
              'imagePopover': ImagePopover,
              'tablePopover': TablePopover,
              'videoDialog': VideoDialog,
              'helpDialog': HelpDialog,
              'airPopover': AirPopover
          },
          buttons: {},
          lang: 'en-US',
          followingToolbar: false,
          otherStaticBar: '',
          // toolbar
          toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['color', ['color']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview', 'help']],
          ],
          // popover
          popatmouse: true,
          popover: {
              image: [
                  ['resize', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
                  ['float', ['floatLeft', 'floatRight', 'floatNone']],
                  ['remove', ['removeMedia']],
              ],
              link: [
                  ['link', ['linkDialogShow', 'unlink']],
              ],
              table: [
                  ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
                  ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
              ],
              air: [
                  ['color', ['color']],
                  ['font', ['bold', 'underline', 'clear']],
                  ['para', ['ul', 'paragraph']],
                  ['table', ['table']],
                  ['insert', ['link', 'picture']],
              ]
          },
          // air mode: inline editor
          airMode: false,
          width: null,
          height: null,
          linkTargetBlank: true,
          focus: false,
          tabSize: 4,
          styleWithSpan: true,
          shortcuts: true,
          textareaAutoSync: true,
          hintDirection: 'bottom',
          tooltip: 'auto',
          container: 'body',
          maxTextLength: 0,
          blockquoteBreakingLevel: 2,
          spellCheck: true,
          styleTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          fontNames: [
              'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
              'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
              'Tahoma', 'Times New Roman', 'Verdana',
          ],
          fontNamesIgnoreCheck: [],
          fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
          // pallete colors(n x n)
          colors: [
              ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF'],
              ['#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF'],
              ['#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE'],
              ['#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD'],
              ['#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5'],
              ['#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B'],
              ['#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842'],
              ['#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
          ],
          // http://chir.ag/projects/name-that-color/
          colorsName: [
              ['Black', 'Tundora', 'Dove Gray', 'Star Dust', 'Pale Slate', 'Gallery', 'Alabaster', 'White'],
              ['Red', 'Orange Peel', 'Yellow', 'Green', 'Cyan', 'Blue', 'Electric Violet', 'Magenta'],
              ['Azalea', 'Karry', 'Egg White', 'Zanah', 'Botticelli', 'Tropical Blue', 'Mischka', 'Twilight'],
              ['Tonys Pink', 'Peach Orange', 'Cream Brulee', 'Sprout', 'Casper', 'Perano', 'Cold Purple', 'Careys Pink'],
              ['Mandy', 'Rajah', 'Dandelion', 'Olivine', 'Gulf Stream', 'Viking', 'Blue Marguerite', 'Puce'],
              ['Guardsman Red', 'Fire Bush', 'Golden Dream', 'Chelsea Cucumber', 'Smalt Blue', 'Boston Blue', 'Butterfly Bush', 'Cadillac'],
              ['Sangria', 'Mai Tai', 'Buddha Gold', 'Forest Green', 'Eden', 'Venice Blue', 'Meteorite', 'Claret'],
              ['Rosewood', 'Cinnamon', 'Olive', 'Parsley', 'Tiber', 'Midnight Blue', 'Valentino', 'Loulou'],
          ],
          colorButton: {
              foreColor: '#000000',
              backColor: '#FFFF00'
          },
          lineHeights: ['1.0', '1.2', '1.4', '1.5', '1.6', '1.8', '2.0', '3.0'],
          tableClassName: 'table table-bordered',
          insertTableMaxSize: {
              col: 10,
              row: 10
          },
          dialogsInBody: false,
          dialogsFade: false,
          maximumImageFileSize: null,
          callbacks: {
              onBeforeCommand: null,
              onBlur: null,
              onBlurCodeview: null,
              onChange: null,
              onChangeCodeview: null,
              onDialogShown: null,
              onEnter: null,
              onFocus: null,
              onImageLinkInsert: null,
              onImageUpload: null,
              onImageUploadError: null,
              onInit: null,
              onKeydown: null,
              onKeyup: null,
              onMousedown: null,
              onMouseup: null,
              onPaste: null,
              onScroll: null
          },
          codemirror: {
              mode: 'text/html',
              htmlMode: true,
              lineNumbers: true
          },
          codeviewFilter: false,
          codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi,
          codeviewIframeFilter: true,
          codeviewIframeWhitelistSrc: [],
          codeviewIframeWhitelistSrcBase: [
              'www.youtube.com',
              'www.youtube-nocookie.com',
              'www.facebook.com',
              'vine.co',
              'instagram.com',
              'player.vimeo.com',
              'www.dailymotion.com',
              'player.youku.com',
              'v.qq.com',
          ],
          keyMap: {
              pc: {
                  'ENTER': 'insertParagraph',
                  'CTRL+Z': 'undo',
                  'CTRL+Y': 'redo',
                  'TAB': 'tab',
                  'SHIFT+TAB': 'untab',
                  'CTRL+B': 'bold',
                  'CTRL+I': 'italic',
                  'CTRL+U': 'underline',
                  'CTRL+SHIFT+S': 'strikethrough',
                  'CTRL+BACKSLASH': 'removeFormat',
                  'CTRL+SHIFT+L': 'justifyLeft',
                  'CTRL+SHIFT+E': 'justifyCenter',
                  'CTRL+SHIFT+R': 'justifyRight',
                  'CTRL+SHIFT+J': 'justifyFull',
                  'CTRL+SHIFT+NUM7': 'insertUnorderedList',
                  'CTRL+SHIFT+NUM8': 'insertOrderedList',
                  'CTRL+LEFTBRACKET': 'outdent',
                  'CTRL+RIGHTBRACKET': 'indent',
                  'CTRL+NUM0': 'formatPara',
                  'CTRL+NUM1': 'formatH1',
                  'CTRL+NUM2': 'formatH2',
                  'CTRL+NUM3': 'formatH3',
                  'CTRL+NUM4': 'formatH4',
                  'CTRL+NUM5': 'formatH5',
                  'CTRL+NUM6': 'formatH6',
                  'CTRL+ENTER': 'insertHorizontalRule',
                  'CTRL+K': 'linkDialog.show'
              },
              mac: {
                  'ENTER': 'insertParagraph',
                  'CMD+Z': 'undo',
                  'CMD+SHIFT+Z': 'redo',
                  'TAB': 'tab',
                  'SHIFT+TAB': 'untab',
                  'CMD+B': 'bold',
                  'CMD+I': 'italic',
                  'CMD+U': 'underline',
                  'CMD+SHIFT+S': 'strikethrough',
                  'CMD+BACKSLASH': 'removeFormat',
                  'CMD+SHIFT+L': 'justifyLeft',
                  'CMD+SHIFT+E': 'justifyCenter',
                  'CMD+SHIFT+R': 'justifyRight',
                  'CMD+SHIFT+J': 'justifyFull',
                  'CMD+SHIFT+NUM7': 'insertUnorderedList',
                  'CMD+SHIFT+NUM8': 'insertOrderedList',
                  'CMD+LEFTBRACKET': 'outdent',
                  'CMD+RIGHTBRACKET': 'indent',
                  'CMD+NUM0': 'formatPara',
                  'CMD+NUM1': 'formatH1',
                  'CMD+NUM2': 'formatH2',
                  'CMD+NUM3': 'formatH3',
                  'CMD+NUM4': 'formatH4',
                  'CMD+NUM5': 'formatH5',
                  'CMD+NUM6': 'formatH6',
                  'CMD+ENTER': 'insertHorizontalRule',
                  'CMD+K': 'linkDialog.show'
              }
          },
          icons: {
              'align': 'note-icon-align',
              'alignCenter': 'note-icon-align-center',
              'alignJustify': 'note-icon-align-justify',
              'alignLeft': 'note-icon-align-left',
              'alignRight': 'note-icon-align-right',
              'rowBelow': 'note-icon-row-below',
              'colBefore': 'note-icon-col-before',
              'colAfter': 'note-icon-col-after',
              'rowAbove': 'note-icon-row-above',
              'rowRemove': 'note-icon-row-remove',
              'colRemove': 'note-icon-col-remove',
              'indent': 'note-icon-align-indent',
              'outdent': 'note-icon-align-outdent',
              'arrowsAlt': 'note-icon-arrows-alt',
              'bold': 'note-icon-bold',
              'caret': 'note-icon-caret',
              'circle': 'note-icon-circle',
              'close': 'note-icon-close',
              'code': 'note-icon-code',
              'eraser': 'note-icon-eraser',
              'floatLeft': 'note-icon-float-left',
              'floatRight': 'note-icon-float-right',
              'font': 'note-icon-font',
              'frame': 'note-icon-frame',
              'italic': 'note-icon-italic',
              'link': 'note-icon-link',
              'unlink': 'note-icon-chain-broken',
              'magic': 'note-icon-magic',
              'menuCheck': 'note-icon-menu-check',
              'minus': 'note-icon-minus',
              'orderedlist': 'note-icon-orderedlist',
              'pencil': 'note-icon-pencil',
              'picture': 'note-icon-picture',
              'question': 'note-icon-question',
              'redo': 'note-icon-redo',
              'rollback': 'note-icon-rollback',
              'square': 'note-icon-square',
              'strikethrough': 'note-icon-strikethrough',
              'subscript': 'note-icon-subscript',
              'superscript': 'note-icon-superscript',
              'table': 'note-icon-table',
              'textHeight': 'note-icon-text-height',
              'trash': 'note-icon-trash',
              'underline': 'note-icon-underline',
              'undo': 'note-icon-undo',
              'unorderedlist': 'note-icon-unorderedlist',
              'video': 'note-icon-video'
          }
      }
  });

  $$1.summernote = $$1.extend($$1.summernote, {
      ui: ui
  });
  $$1.summernote.options.styleTags = [
      'p',
      { title: 'Blockquote', tag: 'blockquote', className: 'blockquote', value: 'blockquote' },
      'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  ];

}));
//# sourceMappingURL=summernote-bs4.js.map

/*
* iziToast | v1.4.0
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
!function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.iziToast=e(t)}("undefined"!=typeof global?global:window||this.window||this.global,function(t){"use strict";var e={},n="iziToast",o=(document.querySelector("body"),!!/Mobi/.test(navigator.userAgent)),i=/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor),s="undefined"!=typeof InstallTrigger,a="ontouchstart"in document.documentElement,r=["bottomRight","bottomLeft","bottomCenter","topRight","topLeft","topCenter","center"],l={info:{color:"blue",icon:"ico-info"},success:{color:"green",icon:"ico-success"},warning:{color:"orange",icon:"ico-warning"},error:{color:"red",icon:"ico-error"},question:{color:"yellow",icon:"ico-question"}},d=568,c={};e.children={};var u={id:null,"class":"",title:"",titleColor:"",titleSize:"",titleLineHeight:"",message:"",messageColor:"",messageSize:"",messageLineHeight:"",backgroundColor:"",theme:"light",color:"",icon:"",iconText:"",iconColor:"",iconUrl:null,image:"",imageWidth:50,maxWidth:null,zindex:null,layout:1,balloon:!1,close:!0,closeOnEscape:!1,closeOnClick:!1,displayMode:0,position:"bottomRight",target:"",targetFirst:!0,timeout:5e3,rtl:!1,animateInside:!0,drag:!0,pauseOnHover:!0,resetOnHover:!1,progressBar:!0,progressBarColor:"",progressBarEasing:"linear",overlay:!1,overlayClose:!1,overlayColor:"rgba(0, 0, 0, 0.6)",transitionIn:"fadeInUp",transitionOut:"fadeOut",transitionInMobile:"fadeInUp",transitionOutMobile:"fadeOutDown",buttons:{},inputs:{},onOpening:function(){},onOpened:function(){},onClosing:function(){},onClosed:function(){}};if("remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),"function"!=typeof window.CustomEvent){var p=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n};p.prototype=window.Event.prototype,window.CustomEvent=p}var m=function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(n,t[o],o,t);else if(t)for(var i=0,s=t.length;s>i;i++)e.call(n,t[i],i,t)},g=function(t,e){var n={};return m(t,function(e,o){n[o]=t[o]}),m(e,function(t,o){n[o]=e[o]}),n},f=function(t){var e=document.createDocumentFragment(),n=document.createElement("div");for(n.innerHTML=t;n.firstChild;)e.appendChild(n.firstChild);return e},v=function(t){var e=btoa(encodeURIComponent(t));return e.replace(/=/g,"")},y=function(t){return"#"==t.substring(0,1)||"rgb"==t.substring(0,3)||"hsl"==t.substring(0,3)},h=function(t){try{return btoa(atob(t))==t}catch(e){return!1}},b=function(){return{move:function(t,e,o,a){var r,l=.3,d=180;0!==a&&(t.classList.add(n+"-dragged"),t.style.transform="translateX("+a+"px)",a>0?(r=(d-a)/d,l>r&&e.hide(g(o,{transitionOut:"fadeOutRight",transitionOutMobile:"fadeOutRight"}),t,"drag")):(r=(d+a)/d,l>r&&e.hide(g(o,{transitionOut:"fadeOutLeft",transitionOutMobile:"fadeOutLeft"}),t,"drag")),t.style.opacity=r,l>r&&((i||s)&&(t.style.left=a+"px"),t.parentNode.style.opacity=l,this.stopMoving(t,null)))},startMoving:function(t,e,n,o){o=o||window.event;var i=a?o.touches[0].clientX:o.clientX,s=t.style.transform.replace("px)","");s=s.replace("translateX(","");var r=i-s;n.transitionIn&&t.classList.remove(n.transitionIn),n.transitionInMobile&&t.classList.remove(n.transitionInMobile),t.style.transition="",a?document.ontouchmove=function(o){o.preventDefault(),o=o||window.event;var i=o.touches[0].clientX,s=i-r;b.move(t,e,n,s)}:document.onmousemove=function(o){o.preventDefault(),o=o||window.event;var i=o.clientX,s=i-r;b.move(t,e,n,s)}},stopMoving:function(t,e){a?document.ontouchmove=function(){}:document.onmousemove=function(){},t.style.opacity="",t.style.transform="",t.classList.contains(n+"-dragged")&&(t.classList.remove(n+"-dragged"),t.style.transition="transform 0.4s ease, opacity 0.4s ease",setTimeout(function(){t.style.transition=""},400))}}}();return e.setSetting=function(t,n,o){e.children[t][n]=o},e.getSetting=function(t,n){return e.children[t][n]},e.destroy=function(){m(document.querySelectorAll("."+n+"-overlay"),function(t,e){t.remove()}),m(document.querySelectorAll("."+n+"-wrapper"),function(t,e){t.remove()}),m(document.querySelectorAll("."+n),function(t,e){t.remove()}),this.children={},document.removeEventListener(n+"-opened",{},!1),document.removeEventListener(n+"-opening",{},!1),document.removeEventListener(n+"-closing",{},!1),document.removeEventListener(n+"-closed",{},!1),document.removeEventListener("keyup",{},!1),c={}},e.settings=function(t){e.destroy(),c=t,u=g(u,t||{})},m(l,function(t,n){e[n]=function(e){var n=g(c,e||{});n=g(t,n||{}),this.show(n)}}),e.progress=function(t,e,o){var i=this,s=e.getAttribute("data-iziToast-ref"),a=g(this.children[s],t||{}),r=e.querySelector("."+n+"-progressbar div");return{start:function(){"undefined"==typeof a.time.REMAINING&&(e.classList.remove(n+"-reseted"),null!==r&&(r.style.transition="width "+a.timeout+"ms "+a.progressBarEasing,r.style.width="0%"),a.time.START=(new Date).getTime(),a.time.END=a.time.START+a.timeout,a.time.TIMER=setTimeout(function(){clearTimeout(a.time.TIMER),e.classList.contains(n+"-closing")||(i.hide(a,e,"timeout"),"function"==typeof o&&o.apply(i))},a.timeout),i.setSetting(s,"time",a.time))},pause:function(){if("undefined"!=typeof a.time.START&&!e.classList.contains(n+"-paused")&&!e.classList.contains(n+"-reseted")){if(e.classList.add(n+"-paused"),a.time.REMAINING=a.time.END-(new Date).getTime(),clearTimeout(a.time.TIMER),i.setSetting(s,"time",a.time),null!==r){var t=window.getComputedStyle(r),l=t.getPropertyValue("width");r.style.transition="none",r.style.width=l}"function"==typeof o&&setTimeout(function(){o.apply(i)},10)}},resume:function(){"undefined"!=typeof a.time.REMAINING?(e.classList.remove(n+"-paused"),null!==r&&(r.style.transition="width "+a.time.REMAINING+"ms "+a.progressBarEasing,r.style.width="0%"),a.time.END=(new Date).getTime()+a.time.REMAINING,a.time.TIMER=setTimeout(function(){clearTimeout(a.time.TIMER),e.classList.contains(n+"-closing")||(i.hide(a,e,"timeout"),"function"==typeof o&&o.apply(i))},a.time.REMAINING),i.setSetting(s,"time",a.time)):this.start()},reset:function(){clearTimeout(a.time.TIMER),delete a.time.REMAINING,i.setSetting(s,"time",a.time),e.classList.add(n+"-reseted"),e.classList.remove(n+"-paused"),null!==r&&(r.style.transition="none",r.style.width="100%"),"function"==typeof o&&setTimeout(function(){o.apply(i)},10)}}},e.hide=function(t,e,i){"object"!=typeof e&&(e=document.querySelector(e));var s=this,a=g(this.children[e.getAttribute("data-iziToast-ref")],t||{});a.closedBy=i||null,delete a.time.REMAINING,e.classList.add(n+"-closing"),function(){var t=document.querySelector("."+n+"-overlay");if(null!==t){var e=t.getAttribute("data-iziToast-ref");e=e.split(",");var o=e.indexOf(String(a.ref));-1!==o&&e.splice(o,1),t.setAttribute("data-iziToast-ref",e.join()),0===e.length&&(t.classList.remove("fadeIn"),t.classList.add("fadeOut"),setTimeout(function(){t.remove()},700))}}(),a.transitionIn&&e.classList.remove(a.transitionIn),a.transitionInMobile&&e.classList.remove(a.transitionInMobile),o||window.innerWidth<=d?a.transitionOutMobile&&e.classList.add(a.transitionOutMobile):a.transitionOut&&e.classList.add(a.transitionOut);var r=e.parentNode.offsetHeight;e.parentNode.style.height=r+"px",e.style.pointerEvents="none",(!o||window.innerWidth>d)&&(e.parentNode.style.transitionDelay="0.2s");try{var l=new CustomEvent(n+"-closing",{detail:a,bubbles:!0,cancelable:!0});document.dispatchEvent(l)}catch(c){console.warn(c)}setTimeout(function(){e.parentNode.style.height="0px",e.parentNode.style.overflow="",setTimeout(function(){delete s.children[a.ref],e.parentNode.remove();try{var t=new CustomEvent(n+"-closed",{detail:a,bubbles:!0,cancelable:!0});document.dispatchEvent(t)}catch(o){console.warn(o)}"undefined"!=typeof a.onClosed&&a.onClosed.apply(null,[a,e,i])},1e3)},200),"undefined"!=typeof a.onClosing&&a.onClosing.apply(null,[a,e,i])},e.show=function(t){var i=this,s=g(c,t||{});if(s=g(u,s),s.time={},null===s.id&&(s.id=v(s.title+s.message+s.color)),1===s.displayMode||"once"==s.displayMode)try{if(document.querySelectorAll("."+n+"#"+s.id).length>0)return!1}catch(l){console.warn("["+n+"] Could not find an element with this selector: #"+s.id+". Try to set an valid id.")}if(2===s.displayMode||"replace"==s.displayMode)try{m(document.querySelectorAll("."+n+"#"+s.id),function(t,e){i.hide(s,t,"replaced")})}catch(l){console.warn("["+n+"] Could not find an element with this selector: #"+s.id+". Try to set an valid id.")}s.ref=(new Date).getTime()+Math.floor(1e7*Math.random()+1),e.children[s.ref]=s;var p={body:document.querySelector("body"),overlay:document.createElement("div"),toast:document.createElement("div"),toastBody:document.createElement("div"),toastTexts:document.createElement("div"),toastCapsule:document.createElement("div"),cover:document.createElement("div"),buttons:document.createElement("div"),inputs:document.createElement("div"),icon:s.iconUrl?document.createElement("img"):document.createElement("i"),wrapper:null};p.toast.setAttribute("data-iziToast-ref",s.ref),p.toast.appendChild(p.toastBody),p.toastCapsule.appendChild(p.toast),function(){if(p.toast.classList.add(n),p.toast.classList.add(n+"-opening"),p.toastCapsule.classList.add(n+"-capsule"),p.toastBody.classList.add(n+"-body"),p.toastTexts.classList.add(n+"-texts"),o||window.innerWidth<=d?s.transitionInMobile&&p.toast.classList.add(s.transitionInMobile):s.transitionIn&&p.toast.classList.add(s.transitionIn),s["class"]){var t=s["class"].split(" ");m(t,function(t,e){p.toast.classList.add(t)})}s.id&&(p.toast.id=s.id),s.rtl&&(p.toast.classList.add(n+"-rtl"),p.toast.setAttribute("dir","rtl")),s.layout>1&&p.toast.classList.add(n+"-layout"+s.layout),s.balloon&&p.toast.classList.add(n+"-balloon"),s.maxWidth&&(isNaN(s.maxWidth)?p.toast.style.maxWidth=s.maxWidth:p.toast.style.maxWidth=s.maxWidth+"px"),""===s.theme&&"light"===s.theme||p.toast.classList.add(n+"-theme-"+s.theme),s.color&&(y(s.color)?p.toast.style.background=s.color:p.toast.classList.add(n+"-color-"+s.color)),s.backgroundColor&&(p.toast.style.background=s.backgroundColor,s.balloon&&(p.toast.style.borderColor=s.backgroundColor))}(),function(){s.image&&(p.cover.classList.add(n+"-cover"),p.cover.style.width=s.imageWidth+"px",h(s.image.replace(/ /g,""))?p.cover.style.backgroundImage="url(data:image/png;base64,"+s.image.replace(/ /g,"")+")":p.cover.style.backgroundImage="url("+s.image+")",s.rtl?p.toastBody.style.marginRight=s.imageWidth+10+"px":p.toastBody.style.marginLeft=s.imageWidth+10+"px",p.toast.appendChild(p.cover))}(),function(){s.close?(p.buttonClose=document.createElement("button"),p.buttonClose.type="button",p.buttonClose.classList.add(n+"-close"),p.buttonClose.addEventListener("click",function(t){t.target;i.hide(s,p.toast,"button")}),p.toast.appendChild(p.buttonClose)):s.rtl?p.toast.style.paddingLeft="18px":p.toast.style.paddingRight="18px"}(),function(){s.progressBar&&(p.progressBar=document.createElement("div"),p.progressBarDiv=document.createElement("div"),p.progressBar.classList.add(n+"-progressbar"),p.progressBarDiv.style.background=s.progressBarColor,p.progressBar.appendChild(p.progressBarDiv),p.toast.appendChild(p.progressBar)),s.timeout&&(s.pauseOnHover&&!s.resetOnHover&&(p.toast.addEventListener("mouseenter",function(t){i.progress(s,p.toast).pause()}),p.toast.addEventListener("mouseleave",function(t){i.progress(s,p.toast).resume()})),s.resetOnHover&&(p.toast.addEventListener("mouseenter",function(t){i.progress(s,p.toast).reset()}),p.toast.addEventListener("mouseleave",function(t){i.progress(s,p.toast).start()})))}(),function(){s.iconUrl?(p.icon.setAttribute("class",n+"-icon"),p.icon.setAttribute("src",s.iconUrl)):s.icon&&(p.icon.setAttribute("class",n+"-icon "+s.icon),s.iconText&&p.icon.appendChild(document.createTextNode(s.iconText)),s.iconColor&&(p.icon.style.color=s.iconColor)),(s.icon||s.iconUrl)&&(s.rtl?p.toastBody.style.paddingRight="33px":p.toastBody.style.paddingLeft="33px",p.toastBody.appendChild(p.icon))}(),function(){s.title.length>0&&(p.strong=document.createElement("strong"),p.strong.classList.add(n+"-title"),p.strong.appendChild(f(s.title)),p.toastTexts.appendChild(p.strong),s.titleColor&&(p.strong.style.color=s.titleColor),s.titleSize&&(isNaN(s.titleSize)?p.strong.style.fontSize=s.titleSize:p.strong.style.fontSize=s.titleSize+"px"),s.titleLineHeight&&(isNaN(s.titleSize)?p.strong.style.lineHeight=s.titleLineHeight:p.strong.style.lineHeight=s.titleLineHeight+"px")),s.message.length>0&&(p.p=document.createElement("p"),p.p.classList.add(n+"-message"),p.p.appendChild(f(s.message)),p.toastTexts.appendChild(p.p),s.messageColor&&(p.p.style.color=s.messageColor),s.messageSize&&(isNaN(s.titleSize)?p.p.style.fontSize=s.messageSize:p.p.style.fontSize=s.messageSize+"px"),s.messageLineHeight&&(isNaN(s.titleSize)?p.p.style.lineHeight=s.messageLineHeight:p.p.style.lineHeight=s.messageLineHeight+"px")),s.title.length>0&&s.message.length>0&&(s.rtl?p.strong.style.marginLeft="10px":2===s.layout||s.rtl||(p.strong.style.marginRight="10px"))}(),p.toastBody.appendChild(p.toastTexts);var L;!function(){s.inputs.length>0&&(p.inputs.classList.add(n+"-inputs"),m(s.inputs,function(t,e){p.inputs.appendChild(f(t[0])),L=p.inputs.childNodes,L[e].classList.add(n+"-inputs-child"),t[3]&&setTimeout(function(){L[e].focus()},300),L[e].addEventListener(t[1],function(e){var n=t[2];return n(i,p.toast,this,e)})}),p.toastBody.appendChild(p.inputs))}(),function(){s.buttons.length>0&&(p.buttons.classList.add(n+"-buttons"),m(s.buttons,function(t,e){p.buttons.appendChild(f(t[0]));var o=p.buttons.childNodes;o[e].classList.add(n+"-buttons-child"),t[2]&&setTimeout(function(){o[e].focus()},300),o[e].addEventListener("click",function(e){e.preventDefault();var n=t[1];return n(i,p.toast,this,e,L)})})),p.toastBody.appendChild(p.buttons)}(),s.message.length>0&&(s.inputs.length>0||s.buttons.length>0)&&(p.p.style.marginBottom="0"),(s.inputs.length>0||s.buttons.length>0)&&(s.rtl?p.toastTexts.style.marginLeft="10px":p.toastTexts.style.marginRight="10px",s.inputs.length>0&&s.buttons.length>0&&(s.rtl?p.inputs.style.marginLeft="8px":p.inputs.style.marginRight="8px")),function(){p.toastCapsule.style.visibility="hidden",setTimeout(function(){var t=p.toast.offsetHeight,e=p.toast.currentStyle||window.getComputedStyle(p.toast),n=e.marginTop;n=n.split("px"),n=parseInt(n[0]);var o=e.marginBottom;o=o.split("px"),o=parseInt(o[0]),p.toastCapsule.style.visibility="",p.toastCapsule.style.height=t+o+n+"px",setTimeout(function(){p.toastCapsule.style.height="auto",s.target&&(p.toastCapsule.style.overflow="visible")},500),s.timeout&&i.progress(s,p.toast).start()},100)}(),function(){var t=s.position;if(s.target)p.wrapper=document.querySelector(s.target),p.wrapper.classList.add(n+"-target"),s.targetFirst?p.wrapper.insertBefore(p.toastCapsule,p.wrapper.firstChild):p.wrapper.appendChild(p.toastCapsule);else{if(-1==r.indexOf(s.position))return void console.warn("["+n+"] Incorrect position.\nIt can be › "+r);t=o||window.innerWidth<=d?"bottomLeft"==s.position||"bottomRight"==s.position||"bottomCenter"==s.position?n+"-wrapper-bottomCenter":"topLeft"==s.position||"topRight"==s.position||"topCenter"==s.position?n+"-wrapper-topCenter":n+"-wrapper-center":n+"-wrapper-"+t,p.wrapper=document.querySelector("."+n+"-wrapper."+t),p.wrapper||(p.wrapper=document.createElement("div"),p.wrapper.classList.add(n+"-wrapper"),p.wrapper.classList.add(t),document.body.appendChild(p.wrapper)),"topLeft"==s.position||"topCenter"==s.position||"topRight"==s.position?p.wrapper.insertBefore(p.toastCapsule,p.wrapper.firstChild):p.wrapper.appendChild(p.toastCapsule)}isNaN(s.zindex)?console.warn("["+n+"] Invalid zIndex."):p.wrapper.style.zIndex=s.zindex}(),function(){s.overlay&&(null!==document.querySelector("."+n+"-overlay.fadeIn")?(p.overlay=document.querySelector("."+n+"-overlay"),p.overlay.setAttribute("data-iziToast-ref",p.overlay.getAttribute("data-iziToast-ref")+","+s.ref),isNaN(s.zindex)||null===s.zindex||(p.overlay.style.zIndex=s.zindex-1)):(p.overlay.classList.add(n+"-overlay"),p.overlay.classList.add("fadeIn"),p.overlay.style.background=s.overlayColor,p.overlay.setAttribute("data-iziToast-ref",s.ref),isNaN(s.zindex)||null===s.zindex||(p.overlay.style.zIndex=s.zindex-1),document.querySelector("body").appendChild(p.overlay)),s.overlayClose?(p.overlay.removeEventListener("click",{}),p.overlay.addEventListener("click",function(t){i.hide(s,p.toast,"overlay")})):p.overlay.removeEventListener("click",{}))}(),function(){if(s.animateInside){p.toast.classList.add(n+"-animateInside");var t=[200,100,300];"bounceInLeft"!=s.transitionIn&&"bounceInRight"!=s.transitionIn||(t=[400,200,400]),s.title.length>0&&setTimeout(function(){p.strong.classList.add("slideIn")},t[0]),s.message.length>0&&setTimeout(function(){p.p.classList.add("slideIn")},t[1]),(s.icon||s.iconUrl)&&setTimeout(function(){p.icon.classList.add("revealIn")},t[2]);var e=150;s.buttons.length>0&&p.buttons&&setTimeout(function(){m(p.buttons.childNodes,function(t,n){setTimeout(function(){t.classList.add("revealIn")},e),e+=150})},s.inputs.length>0?150:0),s.inputs.length>0&&p.inputs&&(e=150,m(p.inputs.childNodes,function(t,n){setTimeout(function(){t.classList.add("revealIn")},e),e+=150}))}}(),s.onOpening.apply(null,[s,p.toast]);try{var C=new CustomEvent(n+"-opening",{detail:s,bubbles:!0,cancelable:!0});document.dispatchEvent(C)}catch(w){console.warn(w)}setTimeout(function(){p.toast.classList.remove(n+"-opening"),p.toast.classList.add(n+"-opened");try{var t=new CustomEvent(n+"-opened",{detail:s,bubbles:!0,cancelable:!0});document.dispatchEvent(t)}catch(e){console.warn(e)}s.onOpened.apply(null,[s,p.toast])},1e3),s.drag&&(a?(p.toast.addEventListener("touchstart",function(t){b.startMoving(this,i,s,t)},!1),p.toast.addEventListener("touchend",function(t){b.stopMoving(this,t)},!1)):(p.toast.addEventListener("mousedown",function(t){t.preventDefault(),b.startMoving(this,i,s,t)},!1),p.toast.addEventListener("mouseup",function(t){t.preventDefault(),b.stopMoving(this,t)},!1))),s.closeOnEscape&&document.addEventListener("keyup",function(t){t=t||window.event,27==t.keyCode&&i.hide(s,p.toast,"esc")}),s.closeOnClick&&p.toast.addEventListener("click",function(t){i.hide(s,p.toast,"toast")}),i.toast=p.toast},e});
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.swal=e():t.swal=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="swal-button";e.CLASS_NAMES={MODAL:"swal-modal",OVERLAY:"swal-overlay",SHOW_MODAL:"swal-overlay--show-modal",MODAL_TITLE:"swal-title",MODAL_TEXT:"swal-text",ICON:"swal-icon",ICON_CUSTOM:"swal-icon--custom",CONTENT:"swal-content",FOOTER:"swal-footer",BUTTON_CONTAINER:"swal-button-container",BUTTON:o,CONFIRM_BUTTON:o+"--confirm",CANCEL_BUTTON:o+"--cancel",DANGER_BUTTON:o+"--danger",BUTTON_LOADING:o+"--loading",BUTTON_LOADER:o+"__loader"},e.default=e.CLASS_NAMES},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getNode=function(t){var e="."+t;return document.querySelector(e)},e.stringToNode=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.insertAfter=function(t,e){var n=e.nextSibling;e.parentNode.insertBefore(t,n)},e.removeNode=function(t){t.parentElement.removeChild(t)},e.throwErr=function(t){throw t=t.replace(/ +(?= )/g,""),"SweetAlert: "+(t=t.trim())},e.isPlainObject=function(t){if("[object Object]"!==Object.prototype.toString.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype},e.ordinalSuffixOf=function(t){var e=t%10,n=t%100;return 1===e&&11!==n?t+"st":2===e&&12!==n?t+"nd":3===e&&13!==n?t+"rd":t+"th"}},function(t,e,n){"use strict";function o(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),o(n(25));var r=n(26);e.overlayMarkup=r.default,o(n(27)),o(n(28)),o(n(29));var i=n(0),a=i.default.MODAL_TITLE,s=i.default.MODAL_TEXT,c=i.default.ICON,l=i.default.FOOTER;e.iconMarkup='\n  <div class="'+c+'"></div>',e.titleMarkup='\n  <div class="'+a+'"></div>\n',e.textMarkup='\n  <div class="'+s+'"></div>',e.footerMarkup='\n  <div class="'+l+'"></div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1);e.CONFIRM_KEY="confirm",e.CANCEL_KEY="cancel";var r={visible:!0,text:null,value:null,className:"",closeModal:!0},i=Object.assign({},r,{visible:!1,text:"Cancel",value:null}),a=Object.assign({},r,{text:"OK",value:!0});e.defaultButtonList={cancel:i,confirm:a};var s=function(t){switch(t){case e.CONFIRM_KEY:return a;case e.CANCEL_KEY:return i;default:var n=t.charAt(0).toUpperCase()+t.slice(1);return Object.assign({},r,{text:n,value:t})}},c=function(t,e){var n=s(t);return!0===e?Object.assign({},n,{visible:!0}):"string"==typeof e?Object.assign({},n,{visible:!0,text:e}):o.isPlainObject(e)?Object.assign({visible:!0},n,e):Object.assign({},n,{visible:!1})},l=function(t){for(var e={},n=0,o=Object.keys(t);n<o.length;n++){var r=o[n],a=t[r],s=c(r,a);e[r]=s}return e.cancel||(e.cancel=i),e},u=function(t){var n={};switch(t.length){case 1:n[e.CANCEL_KEY]=Object.assign({},i,{visible:!1});break;case 2:n[e.CANCEL_KEY]=c(e.CANCEL_KEY,t[0]),n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t[1]);break;default:o.throwErr("Invalid number of 'buttons' in array ("+t.length+").\n      If you want more than 2 buttons, you need to use an object!")}return n};e.getButtonListOpts=function(t){var n=e.defaultButtonList;return"string"==typeof t?n[e.CONFIRM_KEY]=c(e.CONFIRM_KEY,t):Array.isArray(t)?n=u(t):o.isPlainObject(t)?n=l(t):!0===t?n=u([!0,!0]):!1===t?n=u([!1,!1]):void 0===t&&(n=e.defaultButtonList),n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=n(0),a=i.default.MODAL,s=i.default.OVERLAY,c=n(30),l=n(31),u=n(32),f=n(33);e.injectElIntoModal=function(t){var e=o.getNode(a),n=o.stringToNode(t);return e.appendChild(n),n};var d=function(t){t.className=a,t.textContent=""},p=function(t,e){d(t);var n=e.className;n&&t.classList.add(n)};e.initModalContent=function(t){var e=o.getNode(a);p(e,t),c.default(t.icon),l.initTitle(t.title),l.initText(t.text),f.default(t.content),u.default(t.buttons,t.dangerMode)};var m=function(){var t=o.getNode(s),e=o.stringToNode(r.modalMarkup);t.appendChild(e)};e.default=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r={isOpen:!1,promise:null,actions:{},timer:null},i=Object.assign({},r);e.resetState=function(){i=Object.assign({},r)},e.setActionValue=function(t){if("string"==typeof t)return a(o.CONFIRM_KEY,t);for(var e in t)a(e,t[e])};var a=function(t,e){i.actions[t]||(i.actions[t]={}),Object.assign(i.actions[t],{value:e})};e.setActionOptionsFor=function(t,e){var n=(void 0===e?{}:e).closeModal,o=void 0===n||n;Object.assign(i.actions[t],{closeModal:o})},e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(0),a=i.default.OVERLAY,s=i.default.SHOW_MODAL,c=i.default.BUTTON,l=i.default.BUTTON_LOADING,u=n(5);e.openModal=function(){o.getNode(a).classList.add(s),u.default.isOpen=!0};var f=function(){o.getNode(a).classList.remove(s),u.default.isOpen=!1};e.onAction=function(t){void 0===t&&(t=r.CANCEL_KEY);var e=u.default.actions[t],n=e.value;if(!1===e.closeModal){var i=c+"--"+t;o.getNode(i).classList.add(l)}else f();u.default.promise.resolve(n)},e.getState=function(){var t=Object.assign({},u.default);return delete t.promise,delete t.timer,t},e.stopLoading=function(){for(var t=document.querySelectorAll("."+c),e=0;e<t.length;e++){t[e].classList.remove(l)}}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){(function(e){t.exports=e.sweetAlert=n(9)}).call(e,n(7))},function(t,e,n){(function(e){t.exports=e.swal=n(10)}).call(e,n(7))},function(t,e,n){"undefined"!=typeof window&&n(11),n(16);var o=n(23).default;t.exports=o},function(t,e,n){var o=n(12);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insertAt:"top"};r.transform=void 0;n(14)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){e=t.exports=n(13)(void 0),e.push([t.i,'.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=m[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(u(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(u(o.parts[i],e));m[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function i(t,e){var n=v(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=w[w.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),w.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=w.indexOf(t);e>=0&&w.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var l=h++;n=g||(g=s(e)),o=f.bind(null,n,l,!1),r=f.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),o=d.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function d(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=y(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(t){var e={};return function(n){return void 0===e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),g=null,h=0,w=[],y=n(15);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var s=n[a],c=m[s.id];c.refs--,i.push(c)}if(t){o(r(t,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete m[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},function(t,e,n){var o=n(17);"undefined"==typeof window||window.Promise||(window.Promise=o),n(21),String.prototype.includes||(String.prototype.includes=function(t,e){"use strict";return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return!1;for(var r=0|e,i=Math.max(r>=0?r:o-Math.abs(r),0);i<o;){if(function(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}(n[i],t))return!0;i++}return!1}}),"undefined"!=typeof window&&function(t){t.forEach(function(t){t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode.removeChild(this)}})})}([Element.prototype,CharacterData.prototype,DocumentType.prototype])},function(t,e,n){(function(e){!function(n){function o(){}function r(t,e){return function(){t.apply(e,arguments)}}function i(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(t,this)}function a(t,e){for(;3===t._state;)t=t._value;if(0===t._state)return void t._deferreds.push(e);t._handled=!0,i._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._state?s:c)(e.promise,t._value);var o;try{o=n(t._value)}catch(t){return void c(e.promise,t)}s(e.promise,o)})}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof i)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void f(r(n,e),t)}t._state=1,t._value=e,l(t)}catch(e){c(t,e)}}function c(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&i._immediateFn(function(){t._handled||i._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)a(t,t._deferreds[e]);t._deferreds=null}function u(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function f(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,c(e,t))})}catch(t){if(n)return;n=!0,c(e,t)}}var d=setTimeout;i.prototype.catch=function(t){return this.then(null,t)},i.prototype.then=function(t,e){var n=new this.constructor(o);return a(this,new u(t,e,n)),n},i.all=function(t){var e=Array.prototype.slice.call(t);return new i(function(t,n){function o(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(t){o(i,t)},n)}e[i]=a,0==--r&&t(e)}catch(t){n(t)}}if(0===e.length)return t([]);for(var r=e.length,i=0;i<e.length;i++)o(i,e[i])})},i.resolve=function(t){return t&&"object"==typeof t&&t.constructor===i?t:new i(function(e){e(t)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(t){return new i(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},i._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){d(t,0)},i._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},i._setImmediateFn=function(t){i._immediateFn=t},i._setUnhandledRejectionFn=function(t){i._unhandledRejectionFn=t},void 0!==t&&t.exports?t.exports=i:n.Promise||(n.Promise=i)}(this)}).call(e,n(18).setImmediate)},function(t,e,n){function o(t,e){this._id=t,this._clearFn=e}var r=Function.prototype.apply;e.setTimeout=function(){return new o(r.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(19),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){(function(t,e){!function(t,n){"use strict";function o(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return l[c]=o,s(c),c++}function r(t){delete l[t]}function i(t){var e=t.callback,o=t.args;switch(o.length){case 0:e();break;case 1:e(o[0]);break;case 2:e(o[0],o[1]);break;case 3:e(o[0],o[1],o[2]);break;default:e.apply(n,o)}}function a(t){if(u)setTimeout(a,0,t);else{var e=l[t];if(e){u=!0;try{i(e)}finally{r(t),u=!1}}}}if(!t.setImmediate){var s,c=1,l={},u=!1,f=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,"[object process]"==={}.toString.call(t.process)?function(){s=function(t){e.nextTick(function(){a(t)})}}():function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?function(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),s=function(n){t.postMessage(e+n,"*")}}():t.MessageChannel?function(){var t=new MessageChannel;t.port1.onmessage=function(t){a(t.data)},s=function(e){t.port2.postMessage(e)}}():f&&"onreadystatechange"in f.createElement("script")?function(){var t=f.documentElement;s=function(e){var n=f.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}():function(){s=function(t){setTimeout(a,0,t)}}(),d.setImmediate=o,d.clearImmediate=r}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(7),n(20))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){b&&p&&(b=!1,p.length?m=p.concat(m):v=-1,m.length&&s())}function s(){if(!b){var t=r(a);b=!0;for(var e=m.length;e;){for(p=m,m=[];++v<e;)p&&p[v].run();v=-1,e=m.length}p=null,b=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function l(){}var u,f,d=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var p,m=[],b=!1,v=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];m.push(new c(t,e)),1!==m.length||b||r(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.prependListener=l,d.prependOnceListener=l,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";n(22).polyfill()},function(t,e,n){"use strict";function o(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,s=i.length;a<s;a++){var c=i[a],l=Object.getOwnPropertyDescriptor(r,c);void 0!==l&&l.enumerable&&(n[c]=r[c])}}return n}function r(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:o})}t.exports={assign:o,polyfill:r}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(24),r=n(6),i=n(5),a=n(36),s=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if("undefined"!=typeof window){var n=a.getOpts.apply(void 0,t);return new Promise(function(t,e){i.default.promise={resolve:t,reject:e},o.default(n),setTimeout(function(){r.openModal()})})}};s.close=r.onAction,s.getState=r.getState,s.setActionValue=i.setActionValue,s.stopLoading=r.stopLoading,s.setDefaults=a.setDefaults,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(0),i=r.default.MODAL,a=n(4),s=n(34),c=n(35),l=n(1);e.init=function(t){o.getNode(i)||(document.body||l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"),s.default(),a.default()),a.initModalContent(t),c.default(t)},e.default=e.init},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.MODAL;e.modalMarkup='\n  <div class="'+r+'" role="dialog" aria-modal="true"></div>',e.default=e.modalMarkup},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.OVERLAY,i='<div \n    class="'+r+'"\n    tabIndex="-1">\n  </div>';e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.ICON;e.errorIconMarkup=function(){var t=r+"--error",e=t+"__line";return'\n    <div class="'+t+'__x-mark">\n      <span class="'+e+" "+e+'--left"></span>\n      <span class="'+e+" "+e+'--right"></span>\n    </div>\n  '},e.warningIconMarkup=function(){var t=r+"--warning";return'\n    <span class="'+t+'__body">\n      <span class="'+t+'__dot"></span>\n    </span>\n  '},e.successIconMarkup=function(){var t=r+"--success";return'\n    <span class="'+t+"__line "+t+'__line--long"></span>\n    <span class="'+t+"__line "+t+'__line--tip"></span>\n\n    <div class="'+t+'__ring"></div>\n    <div class="'+t+'__hide-corners"></div>\n  '}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.CONTENT;e.contentMarkup='\n  <div class="'+r+'">\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=o.default.BUTTON_CONTAINER,i=o.default.BUTTON,a=o.default.BUTTON_LOADER;e.buttonMarkup='\n  <div class="'+r+'">\n\n    <button\n      class="'+i+'"\n    ></button>\n\n    <div class="'+a+'">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4),r=n(2),i=n(0),a=i.default.ICON,s=i.default.ICON_CUSTOM,c=["error","warning","success","info"],l={error:r.errorIconMarkup(),warning:r.warningIconMarkup(),success:r.successIconMarkup()},u=function(t,e){var n=a+"--"+t;e.classList.add(n);var o=l[t];o&&(e.innerHTML=o)},f=function(t,e){e.classList.add(s);var n=document.createElement("img");n.src=t,e.appendChild(n)},d=function(t){if(t){var e=o.injectElIntoModal(r.iconMarkup);c.includes(t)?u(t,e):f(t,e)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),r=n(4),i=function(t){navigator.userAgent.includes("AppleWebKit")&&(t.style.display="none",t.offsetHeight,t.style.display="")};e.initTitle=function(t){if(t){var e=r.injectElIntoModal(o.titleMarkup);e.textContent=t,i(e)}},e.initText=function(t){if(t){var e=document.createDocumentFragment();t.split("\n").forEach(function(t,n,o){e.appendChild(document.createTextNode(t)),n<o.length-1&&e.appendChild(document.createElement("br"))});var n=r.injectElIntoModal(o.textMarkup);n.appendChild(e),i(n)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(4),i=n(0),a=i.default.BUTTON,s=i.default.DANGER_BUTTON,c=n(3),l=n(2),u=n(6),f=n(5),d=function(t,e,n){var r=e.text,i=e.value,d=e.className,p=e.closeModal,m=o.stringToNode(l.buttonMarkup),b=m.querySelector("."+a),v=a+"--"+t;if(b.classList.add(v),d){(Array.isArray(d)?d:d.split(" ")).filter(function(t){return t.length>0}).forEach(function(t){b.classList.add(t)})}n&&t===c.CONFIRM_KEY&&b.classList.add(s),b.textContent=r;var g={};return g[t]=i,f.setActionValue(g),f.setActionOptionsFor(t,{closeModal:p}),b.addEventListener("click",function(){return u.onAction(t)}),m},p=function(t,e){var n=r.injectElIntoModal(l.footerMarkup);for(var o in t){var i=t[o],a=d(o,i,e);i.visible&&n.appendChild(a)}0===n.children.length&&n.remove()};e.default=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),r=n(4),i=n(2),a=n(5),s=n(6),c=n(0),l=c.default.CONTENT,u=function(t){t.addEventListener("input",function(t){var e=t.target,n=e.value;a.setActionValue(n)}),t.addEventListener("keyup",function(t){if("Enter"===t.key)return s.onAction(o.CONFIRM_KEY)}),setTimeout(function(){t.focus(),a.setActionValue("")},0)},f=function(t,e,n){var o=document.createElement(e),r=l+"__"+e;o.classList.add(r);for(var i in n){var a=n[i];o[i]=a}"input"===e&&u(o),t.appendChild(o)},d=function(t){if(t){var e=r.injectElIntoModal(i.contentMarkup),n=t.element,o=t.attributes;"string"==typeof n?f(e,n,o):e.appendChild(n)}};e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(2),i=function(){var t=o.stringToNode(r.overlayMarkup);document.body.appendChild(t)};e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(5),r=n(6),i=n(1),a=n(3),s=n(0),c=s.default.MODAL,l=s.default.BUTTON,u=s.default.OVERLAY,f=function(t){t.preventDefault(),v()},d=function(t){t.preventDefault(),g()},p=function(t){if(o.default.isOpen)switch(t.key){case"Escape":return r.onAction(a.CANCEL_KEY)}},m=function(t){if(o.default.isOpen)switch(t.key){case"Tab":return f(t)}},b=function(t){if(o.default.isOpen)return"Tab"===t.key&&t.shiftKey?d(t):void 0},v=function(){var t=i.getNode(l);t&&(t.tabIndex=0,t.focus())},g=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l),n=e.length-1,o=e[n];o&&o.focus()},h=function(t){t[t.length-1].addEventListener("keydown",m)},w=function(t){t[0].addEventListener("keydown",b)},y=function(){var t=i.getNode(c),e=t.querySelectorAll("."+l);e.length&&(h(e),w(e))},x=function(t){if(i.getNode(u)===t.target)return r.onAction(a.CANCEL_KEY)},_=function(t){var e=i.getNode(u);e.removeEventListener("click",x),t&&e.addEventListener("click",x)},k=function(t){o.default.timer&&clearTimeout(o.default.timer),t&&(o.default.timer=window.setTimeout(function(){return r.onAction(a.CANCEL_KEY)},t))},O=function(t){t.closeOnEsc?document.addEventListener("keyup",p):document.removeEventListener("keyup",p),t.dangerMode?v():g(),y(),_(t.closeOnClickOutside),k(t.timer)};e.default=O},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r=n(3),i=n(37),a=n(38),s={title:null,text:null,icon:null,buttons:r.defaultButtonList,content:null,className:null,closeOnClickOutside:!0,closeOnEsc:!0,dangerMode:!1,timer:null},c=Object.assign({},s);e.setDefaults=function(t){c=Object.assign({},s,t)};var l=function(t){var e=t&&t.button,n=t&&t.buttons;return void 0!==e&&void 0!==n&&o.throwErr("Cannot set both 'button' and 'buttons' options!"),void 0!==e?{confirm:e}:n},u=function(t){return o.ordinalSuffixOf(t+1)},f=function(t,e){o.throwErr(u(e)+" argument ('"+t+"') is invalid")},d=function(t,e){var n=t+1,r=e[n];o.isPlainObject(r)||void 0===r||o.throwErr("Expected "+u(n)+" argument ('"+r+"') to be a plain object")},p=function(t,e){var n=t+1,r=e[n];void 0!==r&&o.throwErr("Unexpected "+u(n)+" argument ("+r+")")},m=function(t,e,n,r){var i=typeof e,a="string"===i,s=e instanceof Element;if(a){if(0===n)return{text:e};if(1===n)return{text:e,title:r[0]};if(2===n)return d(n,r),{icon:e};f(e,n)}else{if(s&&0===n)return d(n,r),{content:e};if(o.isPlainObject(e))return p(n,r),e;f(e,n)}};e.getOpts=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n={};t.forEach(function(e,o){var r=m(0,e,o,t);Object.assign(n,r)});var o=l(n);n.buttons=r.getButtonListOpts(o),delete n.button,n.content=i.getContentOpts(n.content);var u=Object.assign({},s,c,n);return Object.keys(u).forEach(function(t){a.DEPRECATED_OPTS[t]&&a.logDeprecation(t)}),u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),r={element:"input",attributes:{placeholder:""}};e.getContentOpts=function(t){var e={};return o.isPlainObject(t)?Object.assign(e,t):t instanceof Element?{element:t}:"input"===t?r:null}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.logDeprecation=function(t){var n=e.DEPRECATED_OPTS[t],o=n.onlyRename,r=n.replacement,i=n.subOption,a=n.link,s=o?"renamed":"deprecated",c='SweetAlert warning: "'+t+'" option has been '+s+".";if(r){c+=" Please use"+(i?' "'+i+'" in ':" ")+'"'+r+'" instead.'}var l="https://sweetalert.js.org";c+=a?" More details: "+l+a:" More details: "+l+"/guides/#upgrading-from-1x",console.warn(c)},e.DEPRECATED_OPTS={type:{replacement:"icon",link:"/docs/#icon"},imageUrl:{replacement:"icon",link:"/docs/#icon"},customClass:{replacement:"className",onlyRename:!0,link:"/docs/#classname"},imageSize:{},showCancelButton:{replacement:"buttons",link:"/docs/#buttons"},showConfirmButton:{replacement:"button",link:"/docs/#button"},confirmButtonText:{replacement:"button",link:"/docs/#button"},confirmButtonColor:{},cancelButtonText:{replacement:"buttons",link:"/docs/#buttons"},closeOnConfirm:{replacement:"button",subOption:"closeModal",link:"/docs/#button"},closeOnCancel:{replacement:"buttons",subOption:"closeModal",link:"/docs/#buttons"},showLoaderOnConfirm:{replacement:"buttons"},animation:{},inputType:{replacement:"content",link:"/docs/#content"},inputValue:{replacement:"content",link:"/docs/#content"},inputPlaceholder:{replacement:"content",link:"/docs/#content"},html:{replacement:"content",link:"/docs/#content"},allowEscapeKey:{replacement:"closeOnEsc",onlyRename:!0,link:"/docs/#closeonesc"},allowClickOutside:{replacement:"closeOnClickOutside",onlyRename:!0,link:"/docs/#closeonclickoutside"}}}])});
"use strict";

// ChartJS
if(window.Chart) {
  Chart.defaults.global.defaultFontFamily = "'Nunito', 'Segoe UI', 'Arial'";
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.defaultFontStyle = 500;
  Chart.defaults.global.defaultFontColor = "#999";
  Chart.defaults.global.tooltips.backgroundColor = "#000";
  Chart.defaults.global.tooltips.bodyFontColor = "rgba(255,255,255,.7)";
  Chart.defaults.global.tooltips.titleMarginBottom = 10;
  Chart.defaults.global.tooltips.titleFontSize = 14;
  Chart.defaults.global.tooltips.titleFontFamily = "'Nunito', 'Segoe UI', 'Arial'";
  Chart.defaults.global.tooltips.titleFontColor = '#fff';
  Chart.defaults.global.tooltips.xPadding = 15;
  Chart.defaults.global.tooltips.yPadding = 15;
  Chart.defaults.global.tooltips.displayColors = false;
  Chart.defaults.global.tooltips.intersect = false;
  Chart.defaults.global.tooltips.mode = 'nearest';
}

// DropzoneJS
if(window.Dropzone) {
  Dropzone.autoDiscover = false;
}

// Basic confirm box
$('[data-confirm]').each(function() {
  var me = $(this),
      me_data = me.data('confirm');

  me_data = me_data.split("|");
  me.fireModal({
    title: me_data[0],
    body: me_data[1],
    buttons: [
      {
        text: me.data('confirm-text-yes') || 'Yes',
        class: 'btn btn-danger btn-shadow',
        handler: function() {
          eval(me.data('confirm-yes'));
        }
      },
      {
        text: me.data('confirm-text-cancel') || 'Cancel',
        class: 'btn btn-secondary',
        handler: function(modal) {
          $.destroyModal(modal);
          eval(me.data('confirm-no'));
        }
      }
    ]
  })
});

// Global
$(function() {
  let sidebar_nicescroll_opts = {
    cursoropacitymin: 0,
    cursoropacitymax: .8,
    zindex: 892
  }, now_layout_class = null;

  var sidebar_sticky = function() {
    if($("body").hasClass('layout-2')) {
      $("body.layout-2 #sidebar-wrapper").stick_in_parent({
        parent: $('body')
      });
      $("body.layout-2 #sidebar-wrapper").stick_in_parent({recalc_every: 1});
    }
  }
  sidebar_sticky();

  var sidebar_nicescroll;
  var update_sidebar_nicescroll = function() {
    let a = setInterval(function() {
      if(sidebar_nicescroll != null)
        sidebar_nicescroll.resize();
    }, 10);

    setTimeout(function() {
      clearInterval(a);
    }, 600);
  }

  var sidebar_dropdown = function() {
    if($(".main-sidebar").length) {
      $(".main-sidebar").niceScroll(sidebar_nicescroll_opts);
      sidebar_nicescroll = $(".main-sidebar").getNiceScroll();

      $(".main-sidebar .sidebar-menu li a.has-dropdown").off('click').on('click', function() {
        var me     = $(this);
        var active = false;
        if(me.parent().hasClass("active")){
          active = true;
        }
        
        $('.main-sidebar .sidebar-menu li.active > .dropdown-menu').slideUp(500, function() {
          update_sidebar_nicescroll();          
          return false;
        });
        
        $('.main-sidebar .sidebar-menu li.active').removeClass('active');

        if(active==true) {
          me.parent().removeClass('active');          
          me.parent().find('> .dropdown-menu').slideUp(500, function() {            
            update_sidebar_nicescroll();
            return false;
          });
        }else{
          me.parent().addClass('active');          
          me.parent().find('> .dropdown-menu').slideDown(500, function() {            
            update_sidebar_nicescroll();
            return false;
          });
        }

        return false;
      });

      $('.main-sidebar .sidebar-menu li.active > .dropdown-menu').slideDown(500, function() {
        update_sidebar_nicescroll();        
        return false;
      });
    }
  }
  sidebar_dropdown();

  if($("#top-5-scroll").length) {
    $("#top-5-scroll").css({
      height: 315
    }).niceScroll();
  }

  $(".main-content").css({
    minHeight: $(window).outerHeight() - 108
  })

  $(".nav-collapse-toggle").click(function() {
    $(this).parent().find('.navbar-nav').toggleClass('show');
    return false;
  });

  $(document).on('click', function(e) {
    $(".nav-collapse .navbar-nav").removeClass('show');
  });

  var toggle_sidebar_mini = function(mini) {
    let body = $('body');

    if(!mini) {
      body.removeClass('sidebar-mini');
      $(".main-sidebar").css({
        overflow: 'hidden'
      });
      setTimeout(function() {
        $(".main-sidebar").niceScroll(sidebar_nicescroll_opts);
        sidebar_nicescroll = $(".main-sidebar").getNiceScroll();
      }, 500);
      $(".main-sidebar .sidebar-menu > li > ul .dropdown-title").remove();
      $(".main-sidebar .sidebar-menu > li > a").removeAttr('data-toggle');
      $(".main-sidebar .sidebar-menu > li > a").removeAttr('data-original-title');
      $(".main-sidebar .sidebar-menu > li > a").removeAttr('title');
    }else{
      body.addClass('sidebar-mini');
      body.removeClass('sidebar-show');
      sidebar_nicescroll.remove();
      sidebar_nicescroll = null;
      $(".main-sidebar .sidebar-menu > li").each(function() {
        let me = $(this);

        if(me.find('> .dropdown-menu').length) {
          me.find('> .dropdown-menu').hide();
          me.find('> .dropdown-menu').prepend('<li class="dropdown-title pt-3">'+ me.find('> a').text() +'</li>');
        }else{
          me.find('> a').attr('data-toggle', 'tooltip');
          me.find('> a').attr('data-original-title', me.find('> a').text());
          $("[data-toggle='tooltip']").tooltip({
            placement: 'right'
          });
        }
      });
    }
  }

  $("[data-toggle='sidebar']").click(function() {
    var body = $("body"),
      w = $(window);

    if(w.outerWidth() <= 1024) {
      body.removeClass('search-show search-gone');
      if(body.hasClass('sidebar-gone')) {
        body.removeClass('sidebar-gone');
        body.addClass('sidebar-show');
      }else{
        body.addClass('sidebar-gone');
        body.removeClass('sidebar-show');
      }

      update_sidebar_nicescroll();
    }else{
      body.removeClass('search-show search-gone');
      if(body.hasClass('sidebar-mini')) {
        toggle_sidebar_mini(false);
      }else{
        toggle_sidebar_mini(true);
      }
    }

    return false;
  });

  var toggleLayout = function() {
    var w = $(window),
      layout_class = $('body').attr('class') || '',
      layout_classes = (layout_class.trim().length > 0 ? layout_class.split(' ') : '');

    if(layout_classes.length > 0) {
      layout_classes.forEach(function(item) {
        if(item.indexOf('layout-') != -1) {
          now_layout_class = item;
        }
      });
    }

    if(w.outerWidth() <= 1024) {
      if($('body').hasClass('sidebar-mini')) {
        toggle_sidebar_mini(false);
        $('.main-sidebar').niceScroll(sidebar_nicescroll_opts);
        sidebar_nicescroll = $(".main-sidebar").getNiceScroll();
      }

      $("body").addClass("sidebar-gone");
      $("body").removeClass("layout-2 layout-3 sidebar-mini sidebar-show");
      $("body").off('click touchend').on('click touchend', function(e) {
        if($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
          $("body").removeClass("sidebar-show");
          $("body").addClass("sidebar-gone");
          $("body").removeClass("search-show");

          update_sidebar_nicescroll();
        }
      });

      update_sidebar_nicescroll();

      if(now_layout_class == 'layout-3') {
        let nav_second_classes = $(".navbar-secondary").attr('class'),
          nav_second = $(".navbar-secondary");

        nav_second.attr('data-nav-classes', nav_second_classes);
        nav_second.removeAttr('class');
        nav_second.addClass('main-sidebar');

        let main_sidebar = $(".main-sidebar");
        main_sidebar.find('.container').addClass('sidebar-wrapper').removeClass('container');
        main_sidebar.find('.navbar-nav').addClass('sidebar-menu').removeClass('navbar-nav');
        main_sidebar.find('.sidebar-menu .nav-item.dropdown.show a').click();
        main_sidebar.find('.sidebar-brand').remove();
        main_sidebar.find('.sidebar-menu').before($('<div>', {
          class: 'sidebar-brand'
        }).append(
          $('<a>', {
            href: $('.navbar-brand').attr('href'),
          }).html($('.navbar-brand').html())
        ));
        setTimeout(function() {
          sidebar_nicescroll = main_sidebar.niceScroll(sidebar_nicescroll_opts);
          sidebar_nicescroll = main_sidebar.getNiceScroll();
        }, 700);

        sidebar_dropdown();
        $(".main-wrapper").removeClass("container");
      }
    }else{
      $("body").removeClass("sidebar-gone sidebar-show");
      if(now_layout_class)
        $("body").addClass(now_layout_class);

      let nav_second_classes = $(".main-sidebar").attr('data-nav-classes'),
        nav_second = $(".main-sidebar");

      if(now_layout_class == 'layout-3' && nav_second.hasClass('main-sidebar')) {
        nav_second.find(".sidebar-menu li a.has-dropdown").off('click');
        nav_second.find('.sidebar-brand').remove();
        nav_second.removeAttr('class');
        nav_second.addClass(nav_second_classes);

        let main_sidebar = $(".navbar-secondary");
        main_sidebar.find('.sidebar-wrapper').addClass('container').removeClass('sidebar-wrapper');
        main_sidebar.find('.sidebar-menu').addClass('navbar-nav').removeClass('sidebar-menu');
        main_sidebar.find('.dropdown-menu').hide();
        main_sidebar.removeAttr('style');
        main_sidebar.removeAttr('tabindex');
        main_sidebar.removeAttr('data-nav-classes');
        $(".main-wrapper").addClass("container");
        // if(sidebar_nicescroll != null)
        //   sidebar_nicescroll.remove();
      }else if(now_layout_class == 'layout-2') {
        $("body").addClass("layout-2");
      }else{
        update_sidebar_nicescroll();
      }
    }
  }
  toggleLayout();
  $(window).resize(toggleLayout);

  $("[data-toggle='search']").click(function() {
    var body = $("body");

    if(body.hasClass('search-gone')) {
      body.addClass('search-gone');
      body.removeClass('search-show');
    }else{
      body.removeClass('search-gone');
      body.addClass('search-show');
    }
  });

  // tooltip
  $("[data-toggle='tooltip']").tooltip();

  // popover
  $('[data-toggle="popover"]').popover({
    container: 'body'
  });

  // Select2
  if(jQuery().select2) {
    $(".select2").select2();
  }

  // Selectric
  if(jQuery().selectric) {
    $(".selectric").selectric({
      disableOnMobile: false,
      nativeOnMobile: false
    });
  }

  $(".notification-toggle").dropdown();
  $(".notification-toggle").parent().on('shown.bs.dropdown', function() {
    $(".dropdown-list-icons").niceScroll({
      cursoropacitymin: .3,
      cursoropacitymax: .8,
      cursorwidth: 7
    });
  });

  $(".message-toggle").dropdown();
  $(".message-toggle").parent().on('shown.bs.dropdown', function() {
    $(".dropdown-list-message").niceScroll({
      cursoropacitymin: .3,
      cursoropacitymax: .8,
      cursorwidth: 7
    });
  });

  if($(".chat-content").length) {
    $(".chat-content").niceScroll({
        cursoropacitymin: .3,
        cursoropacitymax: .8,
    });
    $('.chat-content').getNiceScroll(0).doScrollTop($('.chat-content').height());
  }

  if(jQuery().summernote) {
    $(".summernote").summernote({
       dialogsInBody: true,
      minHeight: 250,
    });
    $(".summernote-simple").summernote({
       dialogsInBody: true,
      minHeight: 150,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough']],
        ['para', ['paragraph']]
      ]
    });
  }

  if(window.CodeMirror) {
    $(".codeeditor").each(function() {
      let editor = CodeMirror.fromTextArea(this, {
        lineNumbers: true,
        theme: "duotone-dark",
        mode: 'javascript',
        height: 200
      });
      editor.setSize("100%", 200);
    });
  }

  // Follow function
  $('.follow-btn, .following-btn').each(function() {
    var me = $(this),
        follow_text = 'Follow',
        unfollow_text = 'Following';

    me.click(function() {
      if(me.hasClass('following-btn')) {
        me.removeClass('btn-danger');
        me.removeClass('following-btn');
        me.addClass('btn-primary');
        me.html(follow_text);

        eval(me.data('unfollow-action'));
      }else{
        me.removeClass('btn-primary');
        me.addClass('btn-danger');
        me.addClass('following-btn');
        me.html(unfollow_text);

        eval(me.data('follow-action'));
      }
      return false;
    });
  });

  // Dismiss function
  $("[data-dismiss]").each(function() {
    var me = $(this),
        target = me.data('dismiss');

    me.click(function() {
      $(target).fadeOut(function() {
        $(target).remove();
      });
      return false;
    });
  });

  // Collapsable
  $("[data-collapse]").each(function() {
    var me = $(this),
        target = me.data('collapse');

    me.click(function() {
      $(target).collapse('toggle');
      $(target).on('shown.bs.collapse', function(e) {
        e.stopPropagation();
        me.html('<i class="fas fa-minus"></i>');
      });
      $(target).on('hidden.bs.collapse', function(e) {
        e.stopPropagation();
        me.html('<i class="fas fa-plus"></i>');
      });
      return false;
    });
  });

  // Gallery
  $(".gallery .gallery-item").each(function() {
    var me = $(this);

    me.attr('href', me.data('image'));
    me.attr('title', me.data('title'));
    if(me.parent().hasClass('gallery-fw')) {
      me.css({
        height: me.parent().data('item-height'),
      });
      me.find('div').css({
        lineHeight: me.parent().data('item-height') + 'px'
      });
    }
    me.css({
      backgroundImage: 'url("'+ me.data('image') +'")'
    });
  });
  if(jQuery().Chocolat) {
    $(".gallery").Chocolat({
      className: 'gallery',
      imageSelector: '.gallery-item',
    });
  }

  // Background
  $("[data-background]").each(function() {
    var me = $(this);
    me.css({
      backgroundImage: 'url(' + me.data('background') + ')'
    });
  });

  // Custom Tab
  $("[data-tab]").each(function() {
    var me = $(this);

    me.click(function() {
      if(!me.hasClass('active')) {
        var tab_group = $('[data-tab-group="' + me.data('tab') + '"]'),
            tab_group_active = $('[data-tab-group="' + me.data('tab') + '"].active'),
            target = $(me.attr('href')),
            links = $('[data-tab="'+me.data('tab') +'"]');

        links.removeClass('active');
        me.addClass('active');
        target.addClass('active');
        tab_group_active.removeClass('active');
      }
      return false;
    });
  });

  // Bootstrap 4 Validation
  $(".needs-validation").submit(function() {
    var form = $(this);
    if (form[0].checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.addClass('was-validated');
  });

  // alert dismissible
  $(".alert-dismissible").each(function() {
    var me = $(this);

    me.find('.close').click(function() {
      me.alert('close');
    });
  });

  if($('.main-navbar').length) {
  }

  // Image cropper
  $('[data-crop-image]').each(function(e) {
    $(this).css({
      overflow: 'hidden',
      position: 'relative',
      height: $(this).data('crop-image')
    });
  });

  // Slide Toggle
  $('[data-toggle-slide]').click(function() {
    let target = $(this).data('toggle-slide');

    $(target).slideToggle();
    return false;
  });

  // Dismiss modal
  $("[data-dismiss=modal]").click(function() {
    $(this).closest('.modal').modal('hide');

    return false;
  });

  // Width attribute
  $('[data-width]').each(function() {
    $(this).css({
      width: $(this).data('width')
    });
  });

  // Height attribute
  $('[data-height]').each(function() {
    $(this).css({
      height: $(this).data('height')
    });
  });

  // Chocolat
  if($('.chocolat-parent').length && jQuery().Chocolat) {
    $('.chocolat-parent').Chocolat();
  }

  // Sortable card
  if($('.sortable-card').length && jQuery().sortable) {
    $('.sortable-card').sortable({
      handle: '.card-header',
      opacity: .8,
      tolerance: 'pointer'
    });
  }

  // Daterangepicker
  if(jQuery().daterangepicker) {
    if($(".datepicker").length) {
      $('.datepicker').daterangepicker({
        locale: {format: 'YYYY-MM-DD'},
        singleDatePicker: true,
      });
    }
    if($(".datetimepicker").length) {
      $('.datetimepicker').daterangepicker({
        locale: {format: 'YYYY-MM-DD hh:mm'},
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
      });
    }
    if($(".daterange").length) {
      $('.daterange').daterangepicker({
        locale: {format: 'YYYY-MM-DD'},
        drops: 'down',
        opens: 'right'
      });
    }
  }

  // Timepicker
  if(jQuery().timepicker && $(".timepicker").length) {
    $(".timepicker").timepicker({
      icons: {
        up: 'fas fa-chevron-up',
        down: 'fas fa-chevron-down'
      }
    });
  }
});

/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";

var cleavePN = new Cleave('.phone-number', {
  phone: true,
  phoneRegionCode: 'us'
});
var cleaveC = new Cleave('.currency', {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand'
});
var cleavePC = new Cleave('.purchase-code', {
  delimiter: '-',
  blocks: [4, 4, 4, 4],
  uppercase: true
});
var cleaveI = new Cleave('.invoice-input', {
  prefix: 'INV',
  delimiter: '-',
  blocks: [10],
  uppercase: true
});
var cleaveD = new Cleave('.datemask', {
  date: true,
  datePattern: ['Y', 'm', 'd']
});
var cc_last_type;
var cleaveCC = new Cleave('.creditcard', {
  creditCard: true,
  onCreditCardTypeChanged: function(type) {
    if(type !== 'unknown') {
      if(type == 'amex') {
        type = 'americanexpress';
      }else if(type == 'mastercard') {
        type = 'mastercard';
      }else if(type == 'visa') {
        type = 'visa';
      }else if(type == 'diners') {
        type = 'dinersclub';
      }else if(type == 'discover') {
        type = 'discover';
      }else if(type == 'jcb') {
        type = 'jcb';
      }
      $(".creditcard").removeClass(cc_last_type);
      $(".creditcard").addClass(type);
      cc_last_type = type;                        
    }
  }
});

$(".pwstrength").pwstrength();

$('.daterange-cus').daterangepicker({
  locale: {format: 'YYYY-MM-DD'},
  drops: 'down',
  opens: 'right'
});
$('.daterange-btn').daterangepicker({
  ranges: {
    'Today'       : [moment(), moment()],
    'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month'  : [moment().startOf('month'), moment().endOf('month')],
    'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  startDate: moment().subtract(29, 'days'),
  endDate  : moment()
}, function (start, end) {
  $('.daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
});

$(".colorpickerinput").colorpicker({
  format: 'hex',
  component: '.input-group-append',
});
$(".inputtags").tagsinput('items');


"use strict";

var cleavePN = new Cleave('.phone-number', {
  phone: true,
  phoneRegionCode: 'us'
});
var cleaveC = new Cleave('.currency', {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand'
});
var cleavePC = new Cleave('.purchase-code', {
  delimiter: '-',
  blocks: [4, 4, 4, 4],
  uppercase: true
});
var cleaveI = new Cleave('.invoice-input', {
  prefix: 'INV',
  delimiter: '-',
  blocks: [10],
  uppercase: true
});
var cleaveD = new Cleave('.datemask', {
  date: true,
  datePattern: ['Y', 'm', 'd']
});
var cc_last_type;
var cleaveCC = new Cleave('.creditcard', {
  creditCard: true,
  onCreditCardTypeChanged: function(type) {
    if(type !== 'unknown') {
      if(type == 'amex') {
        type = 'americanexpress';
      }else if(type == 'mastercard') {
        type = 'mastercard';
      }else if(type == 'visa') {
        type = 'visa';
      }else if(type == 'diners') {
        type = 'dinersclub';
      }else if(type == 'discover') {
        type = 'discover';
      }else if(type == 'jcb') {
        type = 'jcb';
      }
      $(".creditcard").removeClass(cc_last_type);
      $(".creditcard").addClass(type);
      cc_last_type = type;                        
    }
  }
});

$(".pwstrength").pwstrength();

$('.daterange-cus').daterangepicker({
  locale: {format: 'YYYY-MM-DD'},
  drops: 'down',
  opens: 'right'
});
$('.daterange-btn').daterangepicker({
  ranges: {
    'Today'       : [moment(), moment()],
    'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month'  : [moment().startOf('month'), moment().endOf('month')],
    'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  startDate: moment().subtract(29, 'days'),
  endDate  : moment()
}, function (start, end) {
  $('.daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
});

$(".colorpickerinput").colorpicker({
  format: 'hex',
  component: '.input-group-append',
});
$(".inputtags").tagsinput('items');

"use strict";

$("#modal-1").fireModal({body: 'Modal body text goes here.'});
$("#modal-2").fireModal({body: 'Modal body text goes here.', center: true});

let modal_3_body = '<p>Object to create a button on the modal.</p><pre class="language-javascript"><code>';
modal_3_body += '[\n';
modal_3_body += ' {\n';
modal_3_body += "   text: 'Login',\n";
modal_3_body += "   submit: true,\n";
modal_3_body += "   class: 'btn btn-primary btn-shadow',\n";
modal_3_body += "   handler: function(modal) {\n";
modal_3_body += "     alert('Hello, you clicked me!');\n"
modal_3_body += "   }\n"
modal_3_body += ' }\n';
modal_3_body += ']';
modal_3_body += '</code></pre>';
$("#modal-3").fireModal({
  title: 'Modal with Buttons',
  body: modal_3_body,
  buttons: [
    {
      text: 'Click, me!',
      class: 'btn btn-primary btn-shadow',
      handler: function(modal) {
        alert('Hello, you clicked me!');
      }
    }
  ]
});

$("#modal-4").fireModal({
  footerClass: 'bg-whitesmoke',
  body: 'Add the <code>bg-whitesmoke</code> class to the <code>footerClass</code> option.',
  buttons: [
    {
      text: 'No Action!',
      class: 'btn btn-primary btn-shadow',
      handler: function(modal) {
      }
    }
  ]
});

$("#modal-5").fireModal({
  title: 'Login',
  body: $("#modal-login-part"),
  footerClass: 'bg-whitesmoke',
  autoFocus: false,
  onFormSubmit: function(modal, e, form) {
    // Form Data
    let form_data = $(e.target).serialize();
    console.log(form_data)

    // DO AJAX HERE
    let fake_ajax = setTimeout(function() {
      form.stopProgress();
      modal.find('.modal-body').prepend('<div class="alert alert-info">Please check your browser console</div>')

      clearInterval(fake_ajax);
    }, 1500);

    e.preventDefault();
  },
  shown: function(modal, form) {
    console.log(form)
  },
  buttons: [
    {
      text: 'Login',
      submit: true,
      class: 'btn btn-primary btn-shadow',
      handler: function(modal) {
      }
    }
  ]
});

$("#modal-6").fireModal({
  body: '<p>Now you can see something on the left side of the footer.</p>',
  created: function(modal) {
    modal.find('.modal-footer').prepend('<div class="mr-auto"><a href="#">I\'m a hyperlink!</a></div>');
  },
  buttons: [
    {
      text: 'No Action',
      submit: true,
      class: 'btn btn-primary btn-shadow',
      handler: function(modal) {
      }
    }
  ]
});

$('.oh-my-modal').fireModal({
  title: 'My Modal',
  body: 'This is cool plugin!'
});