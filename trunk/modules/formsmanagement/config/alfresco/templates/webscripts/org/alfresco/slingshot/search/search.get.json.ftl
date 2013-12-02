<#macro dateFormat date>${date?string("dd MMM yyyy HH:mm:ss 'GMT'Z '('zzz')'")}</#macro>

<#function getFieldValue prop>
  <#local propVal = "" />
  
  <#if prop?is_string>
	<#local propVal = prop />
  <#elseif prop?is_date>
  	<#local propVal = prop?string("yyyy-MM-dd") />
 <#elseif prop?is_boolean>
 	<#local propVal = prop?string("Yes", "No") />
 <#else>
  	 <#local propVal = prop?string />
 </#if>
	
  <#return propVal>
</#function>


<#if isGridEnabled>
<#escape x as jsonUtils.encodeJSONString(x)>
{
	"aaData":
	[
		<#list data.items as item>
		[
			"",
			"<a href='document-details?nodeRef=${item.nodeRef}'>${item.name!''}</a>", 
			<#list item.properties as prop>
			  <#if prop?exists><#else><#assign prop = ""></#if>
			  "${getFieldValue(prop)!''}"<#if prop_has_next>,</#if>
			</#list>,
			"<a class='ico-download' href='/share/proxy/alfresco/api/node/content/workspace/SpacesStore/${item.nodeId}/${item.name}?a=true'>Download</a>"
		]<#if item_has_next>,</#if>
		</#list>
	]
}
</#escape>
<#else>
<#escape x as jsonUtils.encodeJSONString(x)>
{
	"items":
	[
		<#list data.items as item>
		{
			"nodeRef": "${item.nodeRef}",
			"type": "${item.type}",
			<#if item.hasWriteAccess?exists>
			"hasWriteAccess": ${item.hasWriteAccess?string},
			</#if>
			<#if item.hasAssociations?exists>
			"hasAssociations": ${item.hasAssociations?string},
			</#if>
			
			"name": "${item.name!''}",
			"displayName": "${item.displayName!''}",
			<#if item.title??>
			"title": "${item.title}",
			</#if>
			"description": "${item.description!''}",
			"modifiedOn": "<@dateFormat item.modifiedOn />",
			"modifiedByUser": "${item.modifiedByUser}",
			"modifiedBy": "${item.modifiedBy}",
			"size": ${item.size?c},
			<#if item.site??>
			"site":
			{
				"shortName": "${item.site.shortName}",
				"title": "${item.site.title}"
			},
			"container": "${item.container}",
			</#if>
			<#if item.path??>
			"path": "${item.path}",
			</#if>
			"tags": [<#list item.tags as tag>"${tag}"<#if tag_has_next>,</#if></#list>]
		}<#if item_has_next>,</#if>
		</#list>
	]
}
</#escape>

</#if>