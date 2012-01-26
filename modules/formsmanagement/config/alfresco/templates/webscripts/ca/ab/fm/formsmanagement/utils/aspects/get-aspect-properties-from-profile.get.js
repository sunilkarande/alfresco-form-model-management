<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/aspects/modelUtils.js">

model.json = "";   

var profile = eval("(" + args.profile + ")");
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

