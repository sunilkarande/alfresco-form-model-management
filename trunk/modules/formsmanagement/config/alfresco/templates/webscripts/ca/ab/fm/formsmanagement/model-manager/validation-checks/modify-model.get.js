var action = args.action;
var query = "";
var valid = true;

if(action == "remove_property"){
	query =  "@frm\\:phn:\""+args.phn+"\" ";
 	var r = search.luceneSearch(luceneQuery);

 	if(r.length > 0){
 		valid = false;
 		msg = "We are unable to remove this property as there are " + r.length +" nodes using this property";
 	}
}

model.valid = valid;
model.msg = msg;

