<div class="search-filter">
	<div class="ibg">
		<input type="text" title="Filter by filename or title..." class="default filter-field" value="" >
	</div>
</div>

<div class="toggle-detail">
	<a class="btn-simple-view btn-jq" href="#"><span>&nbsp;</span></a>
	<a class="btn-detail-view btn-jq btn-jq-active" href="#"><span>&nbsp;</span></a>
</div>

<div class="search-sort">
	<span>0</span> ${msg("search.results")}

	<input type="submit" id="sortmenu" name="sortmenu_button" value="sorted by: Relevance">
	<select id="sortmenuselect" name="sortmenuselect">
	    <option value="">Relevance</option>
	    <option value="cm:name">Name</option>
	    <option value="cm:title">Title</option>
	    <option value="cm:description">Description</option>
	    <option value="cm:author">Author</option>
	    <option value="cm:modifier">Modifier</option>
	    <option value="cm:modified|false">Modified</option>
	    <option value="cm:creator">Creator</option>
	    <option value="cm:created|false">Created</option>
	    <option value=".size|true">Size</option>
	    <option value=".mimetype">Mimetype</option>
	    <option value="TYPE">Type</option>
	</select>
</div>
<p class="clear"></p>