<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js"> /* 106 */
/* in_array function to check if value is in array or not */
function in_array(needle,haystack,argStrict){var key="",strict=!!argStrict;if(strict){for(key in haystack){if(haystack[key]===needle){return true;}}}else{for(key in haystack){if(haystack[key]==needle){return true;}}}return false;}

/*
	Method: getModelContent
	description: Used to collect, cache and return a content model xml
	params: model <String> (Model Name)
	returns: model <String/XML> content
*/
var modelCache = {}; 
function getModelContent(model){ 
 	var node = companyhome.childByNamePath('Data Dictionary/Models/JsonModels/' + model);
 	modelCache["" + model] = eval("(" + node.content + ")");

	return modelCache["" + model];
}
 
/*
	Method: extractAspectListFromConstraint
	params: constraint <Object>
	params: profileKey <String> What key from the profile stack should we grab 
	returns: aspectList <Array> Array of aspects from chosen Key
*/
function extractAspectListFromConstraint(constraint, profileKey){
	var aspectList = [];
	
	for(x in constraint){
		//Loop constrainst and extract profileKey Aspects
		if(constraint[x].key == profileKey){
			//Check for profile exist
			if(constraint[x].profile && constraint[x].profile.aspects){
				var profileAspect = constraint[x].profile.aspects;
				for(z in profileAspect){
					aspectList.push(profileAspect[z].name);
				} 
			}
		}
	} 
	return aspectList;
}
 
/*
	Method: getServiceAspectsById
	description: Used to collect, cache and return and array of aspect names for a given profile key
	params: uri <String> Option Service URI
	params: profileKey <String> What key from the profile stack should we grab 
	returns: aspectList <Array> Array of aspects from chosen Key
*/
var serviceCache = {};
function getServiceAspectsById(uri, profileKey){
	var aspectList = [];
	if(profileKey && profileKey != ""){ 
		if( uri.indexOf("byShareSite") >= 0){ 
			if(args.siteid){
				
				if(!serviceCache["" + siteid]) { 
					var siteid = ""+ args.siteid + ".json";
					var siteProfileNode = companyhome.childByNamePath('Data Dictionary/Models/Constraints/' + siteid);
				
					if(siteProfileNode){ 
						serviceCache["" + siteid] = eval("(" + siteProfileNode.content + ")" );
						aspectList = ( extractAspectListFromConstraint( serviceCache["" + siteid], profileKey));
					}else{
						failValidation(" /dropdown/byShareSite: Could not find share constraints list. Please check there is a dropdown list for that site. (Remember files should be named siteid-site");
					}
				}else{
					aspectList = ( extractAspectListFromConstraint( serviceCache["" + siteid], profileKey));
				}
			}else{
				failValidation("Cannot validate profile by share site, siteid not passed to the service. Please add &siteid=siteid");
			}  
		}else{
			//TO DO ADD WGET METHOD FOR COLLECTING SERVICES OUTSIDE ALFRESCO AND WEBSCRIPTS
		}
	}
    return aspectList;
}  


/*
	Method: validateAspect
	description: Used to validate a node against an aspect or array of aspects
	params: findAspects <Array> (Array of aspect names to validate against)
	params: node <Object> Object of node properties
	params: debugObj <Object> Object for service, shows what failed on what
	returns: debugObj <Object>
*/
function validateAspect(findAspects, node, debugObj){ 
	var aspectArr = getAspectList(findAspects);
	 
	debugObj.valid = true; 
	debugObj.failedProperties = []; 
	debugObj.id = node.nodeRef; 
	if(!debugObj.checkedAspects) debugObj.checkedAspects = "";
	  
	for(x in aspectArr)	{
		  
		var aspect = aspectArr[x]; 
		debugObj.checkedAspects += aspect.namespace + ":" + aspect.name + " ";
		
		//model.test += "<br><br>Aspect: " + aspect.namespace + ":" + aspect.name + " " + JSON.stringify(aspect);
		
		for(y in aspect.properties){
			var prop = aspect.properties[y];
			  
			//Check for service aspects
			if(prop.options){
				if(prop.options.service == true){
					
					//Check for value in node before calling service
					var serviceVal = node.properties[prop.namespace + ":" + prop.name]; 
					if(serviceVal){ 
						
						var profileKey = serviceVal;
						var findMoreAspects = getServiceAspectsById(prop.id, profileKey); 
						//Validate Aspects from profile if there is one 
						if(findMoreAspects != null && findMoreAspects != "") debugObj = validateAspect(findMoreAspects, node, debugObj);
					}
				}
			}

			//Check Property value against node
			if(prop.mandatory === true){
				var nodePropCheck = node.properties[prop.namespace + ":" + prop.name];
				 
				if(nodePropCheck && nodePropCheck != ""){
					//FOUND VALID
				}else{
					 
					var propFail = {};
					propFail.propertyName = prop.namespace + ":" + prop.name;
					if(!nodePropCheck) { nodePropCheck = "NULL"; }
					propFail.reason = "Value is (" + nodePropCheck.toString() + ") when it is a required field.";
					
					debugObj.failedProperties.push(propFail);
					debugObj.valid = false; 
					
				} 
			} 
		} 
	} 
	return debugObj;
}


/*
	Method: extractAspects
	params: jObj <Object> (Object to extract aspects from)
	returns: aspectProps <Object> aspect properties
*/
function extractAspects(aspectSearch, jObj, uid) {
    var aspectProps = [];
    if (jObj.aspects) {
        if (jObj.aspects.length > 0) {
			 
            for (x in jObj.aspects) {
                if (in_array(jObj.aspects[x].namespace + "_" + jObj.aspects[x].name, aspectSearch)) {
                    jObj.aspects[x].rootUid = uid + "";
                    logger.log("FOUND ASPECT: " + jObj.aspects[x].namespace + "_" + jObj.aspects[x].name);
                    aspectProps.push(jObj.aspects[x]);
                }else{
					//logger.log("CANNOT MATCH ASPECT: " + jObj.aspects[x].namespace + "_" + jObj.aspects[x].name + " to anything in " + JSON.stringify(aspectSearch) );
				}
            }
        }
    }
    return aspectProps;
}

 
/*
	Method: findAspect
	params: model <Object>  
	params: aspect <Array> (Array of aspect names)
	returns: aspectObj <Object> aspect array with properties
*/
function findAspect(modelObj, aspect){
	var found = false;

	var len = modelObj.aspects.length;
	for(var i=0; i<len; i++) {
		var a = modelObj.aspects[i];
		if(a.name == aspect){
		 	found = true;
		 	var aspect = modelObj.aspects[i];
		}
	} 
	if(found){
	    return aspect;
	}else{
		return null;
	}
}

/*
	Method: getAspectList
	params: findAspects <Array> (Array of aspect names)
	returns: aspectObj <Object> aspect array with properties
*/
function getAspectList(findAspects) { 
    var jsonList = companyhome.childByNamePath('Data Dictionary/Models/JsonModels/').children;
    var aspectObj = [];
    var len = jsonList.length;
    for (var i = 0; i < len; i++) {
        var fileObj = eval("(" + jsonList[i].content + ")");
        var searchAspect = extractAspects(findAspects, fileObj, jsonList[i].id);
        if (searchAspect.length > 0) {
            aspectObj = aspectObj.concat(searchAspect);
        }
    }
    return aspectObj;
}