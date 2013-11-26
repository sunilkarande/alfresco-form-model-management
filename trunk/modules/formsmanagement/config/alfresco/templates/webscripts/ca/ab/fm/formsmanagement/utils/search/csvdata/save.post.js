var query= "PATH:\"/app:company_home/st:sites/cm:student-transcripts/cm:documentLibrary\"";  
var result = search.luceneSearch(query); 
destNode = result[0];
var doc = destNode.createFile("adv_search_results" + destNode.children.length + ".csv");
doc.content = decodeURIComponent(requestbody.content);
doc.save();
model.downloadUrl = doc.getDownloadUrl();
model.nodeRef = doc.nodeRef + "";
model.name = doc.name + "";