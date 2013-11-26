/**
 *  Create user CSV for search results
 */
var filename = "Advanced Search Results Report.csv";
var doc = userhome.childByNamePath(filename);

if(!doc) doc = userhome.createFile(filename);

doc.content = decodeURIComponent(requestbody.content);
doc.save();
model.downloadUrl = doc.getDownloadUrl();
model.nodeRef = doc.nodeRef + "";
model.name = doc.name + "";