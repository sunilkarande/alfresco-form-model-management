/**
 * Returns the date object for the date "numdays" ago
 */
function getTodayMinusXDays(numdays)
{
   var date = new Date();
   var dateMillis = new Date().getTime();
   dateMillis -= 1000 * 60 * 60 * 24 * numdays;
   date.setTime(dateMillis);

   // PENDING: should it be from the beginning of the date or exactly x days back?

   return date;
}

/**
 * Returns the date string as required by Lucene,
 * thus in the format "1970\\-01\\-01T00:00:00"
 *
 * Note: hours/minutes/seconds are currently NOT taken into account
 */
function getLuceneDateString(date)
{
   var temp = new Date();
   temp.setTime(Date.parse(date));
   return temp.getFullYear() + "-" + (temp.getMonth() + 1) + "\\-" +
     (temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate()) + "T00:00:00";
}
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

/**
 * Returns the creation date range query for the given dates.
 */
function getCreationDateRangeQuery(prefix, prop, fromDate, toDate)
{
   var luceneQuery = " +@"+prefix+"\\:"+prop+":[";
   if (fromDate !== null && ! isNaN(fromDate.getTime()))
   {
      luceneQuery += getLuceneDateString(fromDate);
   }
   else
   {
      luceneQuery += "1970\\-01\\-01T00:00:00";
   }
   luceneQuery += " TO ";
   if (toDate !== null && ! isNaN(toDate.getTime()))
   {
      luceneQuery += getLuceneDateString(toDate);
   }
   else
   {
      luceneQuery += "3000\\-12\\-31T00:00:00";
   }
   luceneQuery += "] ";
   return luceneQuery;
}

/**
 *  Checks if the file is in Records Management
 */
function isRMFile(n)
{
	var isRM = false;

	if(n.parent){
		if(n.parent.name == "documentLibrary"){
			if(n.parent.parent.name == "rm"){
				isRM = true;
			}
		}else{
			isRM = isRMFile(n.parent);
		}
	}
	return isRM;
}

/**
 * Get PATH for search
 * @returns {}
 */
function getLucenePath(siteid)
{
	var query = "";

	logger.log("test a:" + args.a + " r:" + args.r );

	if(args.r == "true")
	{
		query = "PATH:\"/app:company_home//*\" AND ((";
		/* Search company root */
	}
	else if(args.a == "true")
	{
		query = "PATH:\"/app:company_home/st:sites//*\" AND TYPE:\"{http://www.alfresco.org/model/content/1.0}content\" AND ((";
		/* Search all sites */
	}
	else
	{
		query = "PATH:\"/app:company_home/st:sites/cm:"+siteid+"/cm:documentLibrary//*\" AND TYPE:\"{http://www.alfresco.org/model/content/1.0}content\" AND ((";
		/* Search context site  */
	}

	delete args.a;
	delete args.r;

	return query;
}

/**
 * Main search function
 * Defaults to AND search
 * @args.o = o 			   //Use OR operator for search
 * @args.r = true/false    //Repository search
 * @args.a = true/false    //All Sites
 * @returns {}
 */
function main(){

	var searchTerms = decodeURIComponent( url.extension );
	var searchParams = searchTerms.split("/");
	var siteid = searchParams[0];
	var query = getLucenePath(siteid);

	var len = args.length;
	var qArr = url.args.split("&");

	if(qArr.length > 0)
	{
		var keywordSearch = "";
		var mSearch = "";
		var type = "AND";
		var hasExt = false;

		//Use OR instead of default AND
		if(args.o == "true"){ type = "OR"; delete args.o; }
		//Alfresco t arg is keyword

		for (var i in qArr) {
			var abArr = qArr[i].split("=");
			var a = abArr[0] + "";
			var b = escape(abArr[1]) + "";

			if(a == "alf_ticket"){
				//Do nothing
			}else if(a == "cm_modified_from"){
				//Collect for comparison query
				if(b != ""){
					var modArr = b.split("-");
					var modFrom = new Date(parseInt(modArr[0]), (parseInt(modArr[1]) - 1), parseInt(modArr[2]));
				}
			}else if(a == "cm_modified_to"){
				//Collect for comparison query
				if(b != ""){
					var modArr = b.split("-");
					var modTo = new Date(parseInt(modArr[0]), (parseInt(modArr[1]) - 1), parseInt(modArr[2]));
				}
			}else if(a == "o"){
				//Or vs AND on all
			}else if(a == "a"){
				//All site search
			}else if(a == "r"){
				//Repository search
			}else if(a == "t"){
				//Caught keyword search
				var ab = "cm_name";
				var ac = "cm_title";

				var keywords = b.split("%20");
				var keywordOperator = "OR";

				for(i in keywords){

					keywordSearch += "@"+ ab.replace("_", "\\:") +":\"" + keywords[i] + "\" "+keywordOperator+" ";
					keywordSearch += "@"+ ac.replace("_", "\\:") +":\"" + keywords[i] + "\" "+keywordOperator+" ";
					keywordSearch += "TEXT:\"" + keywords[i] + "\" "+keywordOperator+" ";
				}
				keywordSearch = keywordSearch.slice(0, -4);

			}else{
				hasExt = true;
				if(a == "cm_mimetype"){
					a = "\\{http\\://www.alfresco.org/model/content/1.0\\}content.mimetype";
				}

				logger.log("Checking date range " +  b);
				if(b.indexOf("-TO-") > 0){
					logger.log("Searching date range for " +  a);

					var prefixProp = a.split("_");
				 	var dateParse = b.split("-TO-");

				 	var modFromArr = dateParse[0].split("-");
					var sModFrom = new Date(parseInt(modFromArr[0]), (parseInt(modFromArr[1]) - 1), parseInt(modFromArr[2]));

					var modToArr = dateParse[1].split("-");
					var sModTo = new Date(parseInt(modToArr[0]), (parseInt(modToArr[1]) - 1), parseInt(modToArr[2]));

					mSearch += getCreationDateRangeQuery(prefixProp[0], prefixProp[1], sModFrom, sModTo) + " AND ";


				}else{
					mSearch += "@"+ a.replace("_", "\\:") +":\"" + b + "\" "+type+" ";
				}
			}
		}

		if(hasExt) mSearch = mSearch.slice(0, -4);
		//Check Query Mods
		if(modFrom && modTo){
			mSearch += " " + getCreationDateRangeQuery("cm", "modified", modFrom, modTo);
		}

		//If keyword search append it to query with OR. If not close the statement
		if(keywordSearch != ""){
			var append = "";
			if(mSearch != "") append = ") OR (";
			mSearch += append + keywordSearch + ")";
		}else{
			mSearch += ")";
		}

		query += mSearch + ") AND NOT ASPECT:\"sys:hidden\"";
		logger.log("SEARCH SERVICE LUCENE fmSearch: " + query);
		var results = search.luceneSearch(query);
	}

	model.json = "[ ";
	if(results.length > 0){
		for(a in results){
			var isRecord = false;
			var siteObj = "";
			var context = "repo";
			isRecord = isRMFile( results[a]);

			//Site information if present
			var nodeDisplayPath = results[a].displayPath;
			var sitePathArr = nodeDisplayPath.split("/");
			var siteid = sitePathArr[3];
			var siteNode = siteService.getSite(siteid);
			var doctitle = "";
			var type = "document";

			if(results[a].isContainer) type = "folder";
			if(results[a].properties['cm:title']) doctitle = decodeURIComponent(results[a].properties['cm:title']);
			if(siteNode){
				context = "site";
				nodeDisplayPath = nodeDisplayPath.replace("/Company Home/Sites/" + siteid + "/documentLibrary", "");
				if(nodeDisplayPath == "") nodeDisplayPath = "/";

				var siteObj = ', "site" :{ "shortName": "'+siteid+'", "title":"'+siteNode.title+'" }';
			}

			model.json += '{ "nodeRef": "'+results[a].nodeRef+'", "id": "'+ decodeURIComponent(results[a].id) +'", "type": "'+type+'", "name": "'+ decodeURIComponent(results[a].name) +'", "title": "'+ doctitle +'", "record": '+isRecord+', "modified" : "'+results[a].properties['cm:modified']+'" , "modifier" : "'+results[a].properties['cm:modifier']+'", "created" : "'+results[a].properties['cm:created']+'" , "creator" : "'+results[a].properties['cm:creator']+'", "size" : "'+bytesToSize(results[a].size)+'", "displayPath": "'+ nodeDisplayPath +'", "loccontext": "'+context+'"'+siteObj+' },';

		}
		model.json = model.json.slice(0, -1);
	}
	model.json += "]";

}
main();


