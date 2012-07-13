<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Form Builder</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/formBuilder.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">

</head>
<body>
<#assign menu = "metadata-profiles" >
<div class="infoMessage saving" style="display:none">
	<span>Please wait...</span>
</div>

<div class="sticky-wrapper ${args.style!}">
	<#include "*/global/header.ftl" />

	<div class="fm-header">
		<div class="saveButtonWrapper">
				<div class="jfk-button-standard jfk-button ico-btn" onClick="javascript: history.go(-1)">
					<span class="ico-back-btn">&nbsp;</span>
				</div>
				<div class="jfk-button-standard jfk-button frmSaveButton">
					<span id="alfSaveForm">Save</span>
				</div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div style="padding-top:6px;"><a href="javascript: history.go(-1)">cancel</a></div>
		</div>
		<div class="fm-title"><span>Profile builder</span><span class="fm-filename"></span></div>
		<p class="clear"></p>

	</div>

	<div class="fm-sidebar">
		<div class="fm-title-bar"><span>Profiles:</span></div>
		<div class="fm-search-aspects">
			<input type="text" name="filter" id="search_filter" />
		</div>
		<div id="titles">
			<ul>
				 <!--
					<li>
						<a class="" href="#" style="width:auto!important;"><span>TITLE</span></a>
					</li>
				  -->
			</ul>
		</div>
	</div>
	<div class="fm-main-window">
	    <div class="fm-info">
			<p>To manage your profiles first select one from the left.</p>
		</div>

	    <div class="grid_12" style="display:none;">

		</div>

	</div>
	<div class="push"></div>
</div>
<#include "*/global/footer.ftl" />

<script type="text/javascript">
	/* Filter for aspects */
	var My={};My.List={Filter:function(inputSelector,listSelector){var inp,rgx=new RegExp(),titles=$(listSelector),keys;if(titles.length===0){return false;}keys=[13,27,32,37,38,39,40];$(inputSelector).bind("keyup",function(e){if(jQuery.inArray(e.keyCode,keys)>=0){return false;}inp=$(this).attr("value");try{rgx.compile(inp,"im");for(var i=0;i<titles.length;i++){if(rgx.source!==""&&!rgx.test(titles[i].innerHTML)){titles[i].parentNode.style.display="none";}else{titles[i].parentNode.style.display="";}}}catch(e){}});}};$(document).ready(function(){My.List.Filter("input#search_filter","#titles>ul>li>a");});
</script>
</body>
</html>


