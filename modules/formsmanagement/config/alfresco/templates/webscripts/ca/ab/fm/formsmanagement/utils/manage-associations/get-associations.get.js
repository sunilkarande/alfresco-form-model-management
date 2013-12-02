<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/manage-associations/utils.js">

var servicelog = {};
servicelog.error = [];
servicelog.status = 1;

servicelog.assocs = [];

if(args.nodeRef){

        var node = search.findNode(args.nodeRef);

        if(node){

        	if(args.assocRef && args.assocRef != ""){
	        	var assocNodesArr = args.assocRef.split(',');

	        	for(i in assocNodesArr){
	        		var sourceNode = search.findNode( decodeURIComponent( assocNodesArr[i] ));

	                node.removeAssociation(sourceNode, "asm:attachment");
	                node.createAssociation(sourceNode, "asm:attachment");

	        	}
        	}

        	//Build list of associations for this document
            for(i in node.assocs['asm:attachment']){

                var doc = {};

    			doc.name = node.assocs['asm:attachment'][i].name + "";
    			doc.nodeRef = node.assocs['asm:attachment'][i].nodeRef + "";
    			doc.fileType = doc.name.split('.').pop().toLowerCase();
    			doc.modified = printDate(node.assocs['asm:attachment'][i].properties['cm:modified']);
    			doc.modifier = node.assocs['asm:attachment'][i].properties['cm:modifier'] + "";
    			doc.size = bytesToSize( node.assocs['asm:attachment'][i].size ) + "";

    			var nodeDisplayPath = node.assocs['asm:attachment'][i].displayPath + "";
    			var sitePathArr = nodeDisplayPath.split("/");
    			var siteid = sitePathArr[3];
    			var siteNode = siteService.getSite(siteid);

    			if(siteNode){
    				doc.sitetitle = siteNode.title + "";
        			doc.siteid = siteid + "";
    			}

    			servicelog.assocs.push(doc);

            }
        }

}else{
    servicelog.error.push("NodeRef is Mandatory. Please contact your administrator if you see this error.");
    servicelog.status = 0;
}

model.output = JSON.stringify(servicelog);

