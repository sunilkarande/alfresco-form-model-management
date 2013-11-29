//JSON Stringify
if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n;}function dateToJSON(theDate){return theDate.getUTCFullYear()+"-"+f(theDate.getUTCMonth()+1)+"-"+f(theDate.getUTCDate())+"T"+f(theDate.getUTCHours())+":"+f(theDate.getUTCMinutes())+":"+f(theDate.getUTCSeconds())+"Z";}var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\","'":"'"};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"':'"'+value+'"';case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"date":return stringify(dateToJSON(value));case"object":if(!value){return"null";}if(typeof value.toJSON==="function"){return stringify(value.toJSON());}a=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||"null");}return"["+a.join(",")+"]";}if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v);}}}}else{for(k in value){if(typeof k==="string"){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+":"+v);}}}}return"{"+a.join(",")+"}";}}return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==="object"){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}else{delete v[i];}}}}return filter(k,v);}if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof filter==="function"?walk("",j):j;}throw new SyntaxError("parseJSON");}};}();}

/**
 * Site settings
 * @param formAspect What base aspect to use for
 */
var formAspect = "ua_documentTypeAspect";

/**
 * Record Management
 * @param siteid
 * @returns {String}
 */
function getRMSettings(siteid){
	var json = "{}";
	var settingNode = companyhome.childByNamePath('Sites/'+siteid+'/site-config.json');
	if(settingNode){
		var sObj = eval("("+settingNode.content+")");
		if(sObj.rmMap){
			for(i in sObj.rmMap){
				var tmpNode = companyhome.childByNamePath('Sites/rm/documentLibrary'+sObj.rmMap[i]);
				if(tmpNode){
					sObj.rmMap[i] = tmpNode.id + "";
				}else{
					sObj.rmMap[i] = "";
				}
			}
		}
		json = JSON.stringify(sObj) + "";

	}else{
		var siteHomespace = companyhome.childByNamePath('Sites/'+siteid);
		var newConfSetting = siteHomespace.createFile('site-config.json');
		newConfSetting.content = '{"formAspect":"'+ formAspect+'","rmAspect":"uarm_record","rmMap":{"example-doctype":"/Example/RM/Path"}}';
		newConfSetting.save();
		json = newConfSetting.content;
	}

	return json;
}

var user = getUserSettings();
var rm = getRMSettings(args.siteid);
var appSettings = '{';
appSettings += '"user" :' + user + ',';
appSettings += '"site" :' + rm;
appSettings += '}';
model.json = appSettings;