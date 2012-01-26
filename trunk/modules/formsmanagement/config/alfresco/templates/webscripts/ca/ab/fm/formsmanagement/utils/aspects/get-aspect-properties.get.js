<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/aspects/modelUtils.js">

var findAspects = args.aspects.split("~");
model.json = JSON.stringify(getAspectList(findAspects));