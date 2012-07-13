<#include "include/alfresco-template.ftl" />
<@templateHeader>
   	<link rel="stylesheet" href="/share/css/form-management/search/forms.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="/share/css/form-management/jquery/jquery-ui.css" />

	<script type="text/javascript" src="/share/js/form-management/jquery.js"></script>
	<script type="text/javascript" src="/share/js/form-management/jquery-ui.js"></script>
	<script src="/alfresco/scripts/form-builder/jquery.live.js" type="text/javascript"></script>

	<!-- FORM MANAGEMENT TOOL -->
	<script src="/alfresco/scripts/form-builder/validation.js" type="text/javascript"></script>
	<script src="/alfresco/scripts/form-builder/form.jquery.js" type="text/javascript"></script>
	<!-- END FORM MANAGEMENT TOOL -->

    <@templateHtmlEditorAssets />
</@>
<@templateBody>
    <div id="alf-hd">
      <@region id="header" scope="global" />
      <@region id="title" scope="page" />
   </div>
   <div id="bd">
		<@region id="search" scope="page" />
   </div>
</@>
<@templateFooter>
   <div id="alf-ft">
      <@region id="footer" scope="global" protected=true />
   </div>
</@>