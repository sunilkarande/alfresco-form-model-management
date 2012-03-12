/* This webscript will create the FM Admin Group if it doesnt exists.
   It will check if the current user is a member of the Admin group
*/   
model.isFmAdmin = false;
/* var hasGroup = people.getGroup("FM_ADMINISTRATOR");
if(!hasGroup){
	people.createGroup("FM_ADMINISTRATOR");
}*/

//Use Admin group for now
if(people.isAdmin( person ) ) model.isFmAdmin = true;
