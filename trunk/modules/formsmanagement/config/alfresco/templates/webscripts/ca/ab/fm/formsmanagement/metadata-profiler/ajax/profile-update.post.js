<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

var found = false;
model.status = 1;
model.msg = "";

var jsonProfile = search.findNode("workspace://SpacesStore/" + args.uid);
if(jsonProfile){
	var jObj = eval("(" + jsonProfile.content + ")");
	var tmpProfile = eval("(" + args.profile + ")");

	//Loop our constraints for the correct profile
	var len = jObj.length;
	for(var i=0; i<len; i++) {
		var a = jObj[i];
		if(a.key == args.key){
		 	found = true;
		 	jObj[i].profile = tmpProfile;
		}
	}

	if(found){
		jsonProfile.content = JSON.stringify(jObj);
		jsonProfile.save();
	}else{
		model.status = 0;
		model.msg = "Could not find key for " + args.key;
	}
}else{
	model.status = 0;
	model.msg = "Could not find the Constraints list for UID:" + args.uid;
}