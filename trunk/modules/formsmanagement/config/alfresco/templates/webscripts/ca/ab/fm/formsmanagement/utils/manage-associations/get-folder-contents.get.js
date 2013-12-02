<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/manage-associations/utils.js">

var servicelog = {};
servicelog.error = [];
servicelog.status = 1;

servicelog.documents = [];

if(args.nodeRef){

        var node = search.findNode(args.nodeRef);

        if(node){
        	for (n in node.children){
        		if(node.children[n].isDocument){
        			var doc = {};

        			doc.name = node.children[n].name + "";
        			doc.nodeRef = node.children[n].nodeRef + "";
        			doc.fileType = doc.name.split('.').pop().toLowerCase();
        			doc.modified = printDate(node.children[n].properties['cm:modified']);
        			doc.modifier = node.children[n].properties['cm:modifier'] + "";
        			doc.size = bytesToSize( node.children[n].size ) + "";

        			var nodeDisplayPath = node.children[n].displayPath + "";
        			var sitePathArr = nodeDisplayPath.split("/");
        			var siteid = sitePathArr[3];
        			var siteNode = siteService.getSite(siteid);

        			if(siteNode){
        				doc.sitetitle = siteNode.title + "";
            			doc.siteid = siteid + "";
        			}

        			servicelog.documents.push(doc);
        		}
        	}
        }

}else{
    servicelog.error.push("NodeRef is Mandatory. Please contact your administrator if you see this error.");
    servicelog.status = 0;
}

model.output = JSON.stringify(servicelog);


