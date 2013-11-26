var connector = remote.connect("alfresco");
model.result = connector.post("/form-management/search/csvdata/save", args.mypost);