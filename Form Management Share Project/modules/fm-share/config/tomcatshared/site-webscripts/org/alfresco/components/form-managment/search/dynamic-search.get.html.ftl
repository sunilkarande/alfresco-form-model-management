<#include 'macros/searchitem.ftl' />
<#include 'dialog/fm-form.ftl' />

<input type="hidden" id="indexType" value="" />
<input type="hidden" id="tifRef" value="" />
<input type="hidden" id="searchindex" value="t=#VALUE#" />
<input type="hidden" class="fm-site-id" value="${siteid!}-site" />
<input type="hidden" class="fm-dropbox-nodeRef" value="${fmDropboxNodeRef!}" />
<input type="hidden" class="fm-search-type" value="${searchType!}" />
<script type="text/javascript">
	<#if isAdvSearchProfile>
		var advsearchAspects = ${advsearchAspects!};
	<#else>
		var advsearchAspects = ${docTypeAspect!};
	</#if>

</script>

<div style="display: none;" class="infoMessage saving"><span>${msg("search.saving")}</span></div>

<div class="sym-header">
	<div class="search-box">
		<div class="ft is-type">
			<div class="search-type">
				<div class="ibg">
					<a id="btnSearchType" href="#" title="">
						 <span class="ico-${searchType}"></span>
					</a>
				</div>
				<ul>
					<#if site?exists><li><a href="#" class="ico-site">${site.title} ${msg("search.site")}</a></li></#if>
					<li><a href="#" class="ico-all-sites">${msg("search.allsites")}</a></li>
					<li><a href="#" class="ico-repo">${msg("search.repository")}</a></li>
				</ul>
			</div>
		</div>
		<div class="ft ibgw">
			<div class="ibg"><input type="text" class="default search-field" title="Search by keywords..." value="" />  </div>
			<a href="#" class="advanced-search-button theme-color-1"><span>${msg("search.title")}</span></a>
		</div>
		<div id="sblsbb" class="ft ise">
			<div class="isb">
				<button name="btnG" type="submit" class="lsb" value="Search">
					<span class="sbico">&nbsp;</span>
				</button>
			</div>
		</div>

		<div class="recdocflip">
		 <div class="ua-menu ua-disabled">
			<span>Selected Items...</span>
			<ul>
				<!-- <li><a class="ac-mvrecords" href="#">Move > Records</a></li>  -->
			    <li><a class="ac-mvdropbox" href="#">Move > Dropbox</a></li>
			</ul>
		</div>


			<!--
			<div class="switch show-records"><span class="ico-record" ></span></div>
			<div class="switch show-all switch-selected"><span  class="ico-all"></span></div>
			<div class="switch show-document slast"><span  class="ico-document"></span></div>
			<p class="clear"></p>
			 -->

		</div>
		<p class="clear"></p>
	</div>
</div>

<div class="sym-search-info" style="">
	 <#include 'actions.ftl' />
</div>
<div class="sym-search-body">
	 <div class="info">${msg("search.tip")}</div>
</div>
<div class="sym-footer"></div>
<input type="hidden" class="sb-main-id" value="" />
<input type="hidden" class="sb-main-type" value="" />
<input type="hidden" class="sb-main-exception-list" value="" />
<input type="hidden" class="sb-page-count" value="${pCount!}" />
