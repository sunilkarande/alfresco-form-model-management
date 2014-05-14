<#include "include/alfresco-template.ftl" />
<@templateHeader>
   	<link rel="stylesheet" href="/share/css/form-management/search/forms.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="/share/css/form-management/jquery/jquery-ui.css" />
	<script type="text/javascript" src="/share/js/form-management/jquery.js"></script>
	<script type="text/javascript" src="/share/js/form-management/jquery-ui.js"></script>
	<script type="text/javascript" src="/share/js/form-management/jquery.live.js"></script>
	<script type="text/javascript" src="/share/js/form-management/validation.js"></script>
	<script type="text/javascript" src="/share/js/form-management/form.jquery.js"></script>

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