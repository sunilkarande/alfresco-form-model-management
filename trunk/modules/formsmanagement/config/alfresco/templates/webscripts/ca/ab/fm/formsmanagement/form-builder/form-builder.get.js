<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/permissions/fm-auth-user.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

function extractAspects(jObj, uid){
	var aspectString = "";

	if(jObj.aspects){
		if(jObj.aspects.length > 0){
			for(x in jObj.aspects){
				if(jObj.aspects[x]){
					jObj.aspects[x].rootUid = uid + "";
				}
			}

			var tmpS = JSON.stringify( jObj.aspects );
				tmpS = tmpS.substring(1);
			aspectString = tmpS.slice(0, -1) + ",";
		}
	}
	return aspectString;
}
function getAspectList(){
	var jsonString = "";
	var jsonList = companyhome.childByNamePath(fmPath.jsonModels).children;
	model.aspectObj = [];

	var len = jsonList.length;
	for(var i=0; i<len; i++) {
		var fileObj = eval("(" + jsonList[i].content + ")" );
		var aString = extractAspects(fileObj, jsonList[i].id);
		jsonString += aString;

	}
	return  "[" + jsonString.slice(0, -1) + "]";
}
function main(){

	var formFields = [];
		formFields.push( { "id": "t_text", "label": "Text Field" } );
		formFields.push( { "id": "t_select", "label": "Drop Down" } );
		formFields.push( { "id": "t_textarea", "label": "Paragraph" } );
		formFields.push( { "id": "t_radio", "label": "Multiple Choice" } );
		formFields.push( { "id": "t_checkbox", "label": "Checkboxes" } );

	var predefinedFields = [];
		predefinedFields.push( { "id": "t_sliderval", "label": "Slider Options" } );
		predefinedFields.push( { "id": "t_multifield", "label": "Multifield" } );


	if(args.jsonNode){
		model.ready = true;
		var jsonNode = search.findNode("workspace://SpacesStore/" + args.jsonNode);
		model.json = jsonNode.content;

		var xmlNode = jsonNode.parent.parent.childByNamePath(jsonNode.name.replace(".json", ".xml"));
		model.modeluid = xmlNode.id;
		model.xml = xmlNode.content;
		model.aspectName = args.aspect;
	}else{
		model.ready = false;
	}
	model.aspectList = eval("(" + getAspectList() + ")" );
	model.formFields = formFields;
	model.predefinedFields = predefinedFields;

}
main();