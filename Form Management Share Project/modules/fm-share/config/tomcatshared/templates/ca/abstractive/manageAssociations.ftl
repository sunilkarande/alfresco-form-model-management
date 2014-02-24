<#include "../../uofa/include/alfresco-template.ftl" />
<@templateHeader>
   
	<link rel="stylesheet" href="/share/res/css/yui-fonts-grids.css" />

    <@templateHtmlEditorAssets />
</@>
<@templateBody>
    <div id="alf-hd">
      <@region id="header" scope="global" protected=true />
      <@region id="title" scope="global" protected=true />
      <@region id="navigation" scope="global" protected=true />
   </div>
   <div id="bd">
			<@region id="body" scope="template" protected=true />
   </div>
</@>
<@templateFooter>
   <div id="alf-ft">
      <@region id="footer" scope="global" protected=true />
   </div>
</@>
