var luceneQuery = "PATH:\"/app:company_home/app:dictionary/app:models/cm:Contraints//*\" AND @cm\\:name:\""+args.profile+"\"";
var node = search.luceneSearch(luceneQuery);
model.json = node[0].content;