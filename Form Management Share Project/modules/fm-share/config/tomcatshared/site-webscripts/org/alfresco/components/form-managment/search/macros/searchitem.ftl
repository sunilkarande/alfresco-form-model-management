<!-- Item details
     Name, Link, Site, Size
 -->
<#macro itemdetails doc>
	<h3>
		<a class="theme-color-1 ua-res-doc-title" href="document-details?nodeRef=workspace://SpacesStore/${doc.id}">${doc.name} </a>
		<#if doc.title != ""><span class="title">(${doc.title})</span></#if>
	</h3>
	<div class="ua-res-detail">

		<#assign linkPath = "/share/page/repository?path=" + doc.displayPath?url />
		<#assign siteLink = "" />

		<#if doc.loccontext == "site">
			<#assign linkPath = "/share/page/site/"  + doc.site.shortName?url + "/documentlibrary?path=" + doc.displayPath?url />
			<#assign siteLink = 'Site: <a href="/share/page/site/'+doc.site.shortName+'/dashboard">'+doc.site.title+'</a>,' />
		</#if>

		<span class="item"><em>Modified on:</em>${doc.modified} by <a href="/share/page/user/${doc.modifier}/profile">${doc.modifier}</a></span>
		<#if doc.type != "folder">
			<span>${siteLink} size: ${doc.size}</span>
		</#if>
		<span>In Folder: <a href="${linkPath}">${doc.displayPath}</a></span>
	</div>
</#macro>


<!-- Individual row from result parsing -->
<#macro searchitem doc>
	<table style="width:100%">
		<tr>
			<td style="  padding-left: 10px;  vertical-align: top; width: 45px;">
				<input type="checkbox" class="fileSelect" id="${doc.id}" />
				<span class="ico-${doc.loccontext}">&nbsp;</span>
			</td>
			<td style="text-align: center; width: 115px; vertical-align: top; ">
				<#if doc.type == "folder">
					<a href="#" id="yui-gen126"><img title="test" alt="test" src="/share/res/components/search/images/folder.png" id="yui-gen125"></a>
				<#else>
					<a target="_blank" href="/share/proxy/alfresco/api/node/content/workspace/SpacesStore//${doc.id}/${doc.name}?a=true"><img src="/share/proxy/alfresco/api/node/workspace/SpacesStore/${doc.id}/content/thumbnails/doclib?ph=true&c=queue" /></a>
				</#if>
			</td>

			<td class="doc-search-details">
				<@itemdetails doc />
			</td>
			<td style="width: 170px;">
				<div class="resultTools">
					<ul>
						<li><a href="document-details?nodeRef=workspace://SpacesStore/${doc.id}" class="ico-view">View Metadata</a></li>
						<!--
						<#if !doc.record>
							<#if doc.creator == user.name><li><a href="${doc.id!}" class="ico-move-dropbox">Move to Dropbox</a></li></#if>
						</#if>
						 -->
						<li><a target="_blank" href="/share/proxy/alfresco/api/node/content/workspace/SpacesStore//${doc.id}/${doc.name}?a=true" class="ico-download">Download</a></li>
					</ul>
				</div>
			</td>
		</tr>
	</table>
</#macro>