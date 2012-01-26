<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

var jsonProfile = search.findNode("workspace://SpacesStore/" + args.uid);

if(jsonProfile){
	var jObj = eval("(" + jsonProfile.content + ")");

	model.json = "";
	//Loop our constraints for the correct profile
	var len = jObj.length;
	for(var i=0; i<len; i++) {
		var a = jObj[i];
		if(a.key == args.key){
			//FOUND OUR PROFILE
			if(jObj[i].profile) model.json = JSON.stringify( jObj[i].profile );
		}
	}
}else{
	model.json = jsonProfile;
}

