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
function getCreationDateRangeQuery(fromDate, toDate)
{
   var luceneQuery = " +@cm\\:modified:[";
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
function isRMFile(n){
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

function main(){
	/* END DATE UTILS */
	var searchTerms = decodeURIComponent( url.extension);
	var searchParams = searchTerms.split("/");
	var context = searchParams[0];
	model.context = context;

	var len = args.length;
	var urlDeCode = decodeURIComponent( url.args );
	var qArr = url.args.split("&");

	if(qArr.length > 0){
		//(PATH:"/app:company_home/st:sites/cm:formdemo/cm:documentLibrary//*" OR PATH:"/app:company_home/st:sites/cm:rm/cm:documentLibrary//*"  ) AND TYPE:"{http://www.alfresco.org/model/content/1.0}content"
		var query = "PATH:\"/app:company_home/st:sites/cm:"+model.context+"/cm:documentLibrary//*\" AND TYPE:\"{http://www.alfresco.org/model/content/1.0}content\" AND ((";
		var keywordSearch = "";
		var mSearch = "";
		var type = "AND";
		var hasExt = false;

		if(args.o){ type = "OR"; delete args.o; }

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
			}else if(a == "keywords"){
				//Caught keyword search
				var ab = "cm_name";
				var ac = "cm_title";

				var keywords = b.split(" ");
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
				mSearch += "@"+ a.replace("_", "\\:") +":\"" + b + "\" "+type+" ";
			}
		}

		if(hasExt) mSearch = mSearch.slice(0, -4);
		//Check Query Mods
		if(modFrom && modTo){
			mSearch += " " + getCreationDateRangeQuery(modFrom, modTo);
		}

		//If keyword search append it to query with OR. If not close the statement
		if(keywordSearch != ""){
			var append = "";
			if(mSearch != "") append = ") OR (";
			mSearch += append + keywordSearch + ")";
		}else{
			mSearch += ")";
		}

		query += mSearch + ")";
		logger.log("SEARCH SERVICE LUCENE: " + query);
		var results = search.luceneSearch(query);
	}

	model.json = "[ ";
	if(results.length > 0){
		for(a in results){
			var isRecord = false;

			isRecord = isRMFile( results[a]);
			model.json += '{ "id": "'+ decodeURIComponent(results[a].id) +'", "name": "'+ decodeURIComponent(results[a].name) +'", "record": '+isRecord+', "modified" : "'+results[a].properties['cm:modified']+'" , "modifier" : "'+results[a].properties['cm:modifier']+'", "created" : "'+results[a].properties['cm:created']+'" , "creator" : "'+results[a].properties['cm:creator']+'", "size" : "'+bytesToSize(results[a].size)+'" },';

		}
		model.json = model.json.slice(0, -1);
	}
	model.json += "]";

}
main();


