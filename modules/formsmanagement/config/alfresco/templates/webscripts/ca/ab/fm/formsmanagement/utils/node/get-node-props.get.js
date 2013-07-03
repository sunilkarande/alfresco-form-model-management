<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

//Bytes user friendly view
function bytesToSize(bytes) { var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];if (bytes == 0) return 'n/a';var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]; }

model.status = 1;
model.msg = "";
model.associations = "[]";
var node = search.findNode(args.uid);

if(!node){
	model.status = 0;
	model.msg = "Could not find node.";
	model.node = "{}";
}else{
	
	var assocArr = [];
	
	for(i in node.assocs['asm:attachment']){
		 
        var doc = {};
		
		doc.name = node.assocs['asm:attachment'][i].name + "";
		doc.nodeRef = node.assocs['asm:attachment'][i].nodeRef + "";
		doc.fileType = doc.name.split('.').pop().toLowerCase();
		doc.icon =  node.assocs['asm:attachment'][i].icon32 + "";
		doc.size = bytesToSize( node.assocs['asm:attachment'][i].size ) + "";
		
		var nodeDisplayPath = node.assocs['asm:attachment'][i].displayPath + "";
		var sitePathArr = nodeDisplayPath.split("/");
		var siteid = sitePathArr[3];
		var siteNode = siteService.getSite(siteid);
		
		
		if(siteNode){ 
			doc.sitetitle = siteNode.title + "";
			doc.siteid = siteid + "";
		}
		
		assocArr.push(doc);
		
    }
	
	model.node = node.toJSON(true);
	
	if(assocArr.length > 0){ 
		model.associations = JSON.stringify( assocArr );
	}
}