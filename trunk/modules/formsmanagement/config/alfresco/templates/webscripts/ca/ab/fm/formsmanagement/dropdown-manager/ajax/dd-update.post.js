<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

function MergeRecursive(d,c){for(var b in c){try{if(c[b].constructor==Object){d[b]=MergeRecursive(d[b],c[b])}else{d[b]=c[b]}}catch(a){d[b]=c[b]}}return d};
model.status = 1;
model.msg = "";

function getProfile(sObj, sKey){
	var profile = {};
	var len = sObj.length;
	for(var i=0; i<len; i++) {
		if(sObj[i].key == sKey){
			if(sObj[i].profile) profile = sObj[i].profile;
		}
	}
	return profile;
}

var jsonProfile =  search.findNode("workspace://SpacesStore/" + args.uid);
if(jsonProfile){
	var jObj = eval("(" + jsonProfile.content + ")");
	var pObj = eval("(" + args.json + ")");

	var test = "";
	var len = pObj.length;
	for(var i=0; i<len; i++) {
		pObj[i].profile = getProfile(jObj, pObj[i].key);
	}

	jsonProfile.content = JSON.stringify(pObj);
	jsonProfile.save();
	model.msg = JSON.stringify(test);
}else{
	model.status = 0;
	model.msg = "Could not find the contraint list.";
}