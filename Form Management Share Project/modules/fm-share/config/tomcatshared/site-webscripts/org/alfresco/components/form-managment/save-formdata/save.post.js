var params = [];
var isDebug = false;

//MANDATORY VARIABLES
params["storeObj"] = encodeURIComponent( args["storeObj"] );
params["aspects"]  = encodeURIComponent( args["aspects"] );
params["nodeId"]   = encodeURIComponent( args["nodeId"] );
params["moveId"]   = encodeURIComponent( args["moveId"] );


// DEBUGING
model.result = jsonUtils.toJSONString( params );

if(!isDebug){
	// get a connector to the Alfresco repository endpoint
	var connector = remote.connect("alfresco");
	model.result = connector.post("/form-management/formdata/save?isShare=true", jsonUtils.toJSONString(params), "application/json");

}