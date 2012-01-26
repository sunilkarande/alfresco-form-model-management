var query= "PATH:\"/app:company_home/st:sites/cm:"+args.siteid+"/cm:documentLibrary/cm:Dropbox\"";  
var result = search.luceneSearch(query); 

if(result.length <= 0){
	//Create Dropbox folder and user
	var query= "PATH:\"/app:company_home/st:sites/cm:"+args.siteid+"/cm:documentLibrary\"";  
	var docLibNode = search.luceneSearch(query); 
	var dropboxNode = docLibNode[0].createFolder("Dropbox");
	 
}else{
	var dropboxNode = result[0];
}  
var user = person.properties.userName; 
if(args.dropboxuser && args.dropboxuser != ""){
	user = args.dropboxuser;
}
var userDropbox = dropboxNode.childByNamePath(user);

function dateFormat(da){ 
	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December"); 
	var d = new Date(da); 
	var curr_hour = d.getHours();
	if(curr_hour < 10) curr_hour = "0" + curr_hour;
	var curr_min = d.getMinutes();
	if(curr_min < 10) curr_min = "0" + curr_min;
	var curr_sec = d.getSeconds();
	if(curr_sec < 10) curr_sec = "0" + curr_sec;
	var curr_date = d.getDate(); 
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear(); 
	return (curr_date+" "+ m_names[curr_month] + ", " + curr_year + " " + curr_hour + ":" + curr_min + ":" + curr_sec);
}

if(userDropbox){
	var json = '{ "aaData": [';
	if(userDropbox.children.length > 0){
		for(x in userDropbox.children){ 
			var dateForm =  dateFormat(userDropbox.children[x].properties['cm:created']); 
			json += '[ "<p>'+userDropbox.children[x].id+'</p>", "' + userDropbox.children[x].name + '", "'+dateForm+'", "<span></span>"],';
		}
		json = json.slice(0, -1);
	}
	json += "]}"; 
	model.json = json; 
}else{
	//Create dropbox for user provide an empty list
	dropboxNode.createFolder(user);
	model.json = '{ "aaData": [] }';
}

 