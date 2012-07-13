<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/permissions/fm-auth-user.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/aspects/modelUtils.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">


function getAdvsearchSettings()
{
	var ddConstraints = companyhome.childByNamePath(fmPath.constraints);
	var settingNode = ddConstraints.childByNamePath("advsearch.json");

	if(!settingNode)
	{
		settingNode = ddConstraints.createFile("advsearch.json");
		settingNode.content = '[{"label":"Advanced Search Profile","profile":{"title":"Advanced Search","description":"","aspects":[]},"key":"advsearch"}]';
		settingNode.save();
	}
	return settingNode;
}

function getProfileToProperty( profile )
{
	model.json = "";

	var aspectArr = [];

	for(x in profile.aspects){
		var aspect = profile.aspects[x];

		//Get the model for this profile aspect and cache its jsonModel content
		if(modelCache["" + aspect.parent]){
			var modelObj = modelCache["" + aspect.parent];
		}else{
			var modelObj = getModelContent( aspect.parent );
		}

		//Find aspect
		var tAspect = findAspect(modelObj, aspect.name.split("_")[1]);
		aspectArr.push(tAspect);
	}
	model.json = JSON.stringify( aspectArr );

}

function main(){
	//Get the advsearch config
	var settingNode = getAdvsearchSettings();

	var jsonObj = eval( "(" + settingNode.content + ")" );

	getProfileToProperty( jsonObj[0].profile );
}

main();