function getURLParam(name) { return decodeURI( (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1] );}

function fileAssosicatedTemplate(node){
	var tmp = '<div class="assoc-item"><a href="#" class="delete-assoc">Delete association</a><div class="doc-search-icon" id="'+node.nodeRef+'"><a href="#"><img src="/share/proxy/alfresco/api/node/'+ node.nodeRef.replace('://', '/') + '/content/thumbnails/doclib?ph=true&amp;c=queue">		</a>	</div><div><h3> ';
		tmp += '<a href="document-details?nodeRef='+node.nodeRef+'"class="theme-color-1 ua-res-doc-title">'+node.name+'</a>';
		tmp += '</h3><div class="ua-res-detail"><span class="item"><em>Modified on:</em>'+ node.modified+ ' by <a href="/share/page/user/'+node.modifier+'/profile">'+node.modifier+'</a></span> <div> ';
	    if(node.siteid) tmp += '<span>Site: <a href="/share/page/site/'+node.siteid+'/dashboard">'+ node.siteid+'</a>, ';
	    tmp += 'size: '+node.size +'</span></div></div></div><p class="clear"></p></div>';
	
	    return tmp;
}

function fileSelectFolderTemplate(node) {
	return '<li class="fs-folder" id="nodelookup-'
			+ node.nodeRef.split("/")[3]
			+ '"><a href="#" class="icoFolder fs-closed"></a><a href="#" class="fs-filename">'
			+ node.name + '</a><span class="clear"></span></li>';
}

function documentTemplate(node){
	return '<li class="fs-document"><input type="checkbox" id="' + node.nodeRef + '" class="fs-doc-select" /><img src="/share/res/components/images/filetypes/html-file-32.png" /><a href="#"><span>'+ node.name +'</span></a><p class="clear"></p></li>';
}

function getSiteList(username) {
	$.getJSON(Alfresco.constants.PROXY_URI + "api/people/"+ username +"/sites", {
	}, function(site) {
		$('.site-selector').html('<ul></ul>');
		
		for(i in site){
			var classn = "";
			if( site[i].shortName == Alfresco.constants.SITE ) classn="active-site";
			
			$('.site-selector ul').append('<li><a id="'+ site[i].shortName +'" href="#" class="'+classn+' select-site">'+ site[i].title +'</a></li>');
		}
		
		injectFolder($(".fs-root"), "/documentLibrary");
		
	});
}

function injectFolder(pos, folder, children) {
	
	var siteid = $('.active-site').attr("id");
	pos.html("");
	
	$.getJSON(Alfresco.constants.PROXY_URI + "slingshot/doclib/treenode/site/" + siteid + folder, {
		children : "false"
	}, function(r) {
		
		$('.file-selector').html("<ul></ul>");
		
		$.getJSON(Alfresco.constants.PROXY_URI + "node/get-folder-contents", {
			nodeRef: r.parent.nodeRef
		}, function(r) {
			
			for( z in r.documents){
				$('.file-selector ul').append( documentTemplate(r.documents[z]) );
				$('.file-selector ul li:last').data('node', r.documents[z]);
			}
		});
		
		
		for (x in r.items) {
			pos.append(fileSelectFolderTemplate(r.items[x]));
		}
	});
}

function extractUri(pos) {
	var atRoot = false;
	var curBun = pos;
	var nodeName = "";
	if (!pos.parents("ul:eq(0)").hasClass("fs-root")) {
		while (atRoot == false) {
			var parent = curBun.parents("li:eq(0)");
			if (parent) {
				if (parent.parents("ul:eq(0)").length <= 0) {
					atRoot = true;
					break;
				} else {
					nodeName = encodeURIComponent(parent.find(
							".fs-filename:eq(0)").text())
							+ "/" + nodeName;
					curBun = parent;
				}
			} else {
				atRoot = true;
			}
		}
	}
	return nodeName;
}

function openCloseFolder(pos, allowClose) {
	if (pos.find(".icoFolder:eq(0)").hasClass("fs-closed")) {
		if (!pos.find("ul").length > 0) {
			pos.append("<ul></ul>");
			var nodeName = pos.find(".fs-filename:eq(0)").text();
			nodeName = extractUri(pos) + nodeName;

			var filePath = (nodeName);
			filePath = filePath.replace(/%2F/g, "/");

			injectFolder(pos.find("ul:eq(0)"), "/documentLibrary/" + filePath, true);
		}
		pos.find(".icoFolder:eq(0)").removeClass("fs-closed");
		pos.find("ul:eq(0)").show();
	} else {
		if (allowClose) {
			pos.find("ul:eq(0)").hide();
			pos.find(".icoFolder:eq(0)").addClass("fs-closed");
		}
	}
}

function getAssociatedDocuments(nodeRef){

	$.getJSON(Alfresco.constants.PROXY_URI + "node/get-associations?nodeRef=" + nodeRef, {
	}, function(r) {
		
		if(r.assocs.length > 0){ 
			
			for(i in r.assocs){
				$('.doc-search-details').append( fileAssosicatedTemplate(r.assocs[i]) );
			}
		}else{
			$('.doc-search-details').html('<p class="no-assocs">There are no associations to this document, click "Add files" to create one.</p>');
		}
	});
}

function saveAssociatedDocments(){
	
	var nodeRef = getURLParam('nodeRef');
	var assocRef = [];
	$('.doc-search-icon').each(function(){
		 assocRef.push( $(this).attr('id') );
	});
	
	// Pop-up a message...
    Alfresco.util.PopupManager.displayMessage({
      text: "Saving association..."
    });
	
	$.ajax({
		method: "GET",
		async:false,
		url : Alfresco.constants.PROXY_URI + "node/get-associations?nodeRef=" + nodeRef,
		data: { assocRef: assocRef.join(','), nodeRef: nodeRef },
		success: function(){
			history.back();
			
		}
	});
}


/**
 * Main
 */
$(function() {
	
	$('#filePickerDialog').dialog({
		modal:true,
		autoOpen: false,
		width:900,
		buttons: {
			"Cancel" : function(){
				 $(this).dialog("close");
			},
			"Create association" : function(){
		    	
				$('.no-assocs').remove();
				
				$('.fs-doc-select:checked').each(function(){
					 var node = $(this).parent().data('node');
		    	     nodeTmp = fileAssosicatedTemplate(node);
		    		 
		    		 $('.doc-search-details:last').append(nodeTmp); 
		    	});
				
				$(this).dialog("close");
		    }
		}
	});

	$('#save-assoc-button').live("click", function(){
		saveAssociatedDocments();
		return false;
	});
	
	$('.delete-assoc').live("click", function(){
		$(this).parents('.assoc-item').remove();
		return false;
	});
	$('#select-assoc-button').live("click", function(){
		$('#filePickerDialog').dialog("open");
		return false;
	});
	
	$('#cancel-assoc-button').live("click", function(){
		history.back();
	});
	
	$(".icoFolder").live(
			"click",
			function() {
				var pos = $(this).parents("li:eq(0)");
				$(".fs-selected-folder, .folder-highlight").removeClass("fs-selected-folder").removeClass('folder-highlight');
				
				pos.find(".fs-filename:eq(0), .icoFolder:eq(0)").addClass(
						"fs-selected-folder");
				pos.addClass('folder-highlight');
				openCloseFolder(pos, true);
				return false;
			});
	$(".fs-filename").live(
			"click",
			function() {
				var pos = $(this).parents("li:eq(0)");
				$(".fs-selected-folder, .folder-highlight").removeClass("fs-selected-folder").removeClass('folder-highlight');
				pos.find(".fs-filename:eq(0), .icoFolder:eq(0)").addClass(
						"fs-selected-folder");
				
				
				pos.addClass('folder-highlight');
				openCloseFolder(pos, false);
				return false;
			});
	$(".saveFSPosition").live(
			"click",
			function() {
				var pos = $(".fs-selected-folder:eq(0)").parents("li:eq(0)")
						.attr("id").replace("nodelookup-", "");
			});
	
	$('.select-site').live(
			"click",
			function() {
				$('.active-site').removeClass('active-site');
				$(this).addClass('active-site');
				
				injectFolder($(".fs-root"), "/documentLibrary");
			});

	// Start open current folder
	getSiteList(Alfresco.constants.USERNAME);
	getAssociatedDocuments(getURLParam('nodeRef'));
	
	
	var oButton = new YAHOO.widget.Button(
		    "select-assoc",  // Source element id
		    {  
		});
	var oButton2 = new YAHOO.widget.Button(
		    "save-assoc",  // Source element id
		    {  
		});
	
	var oButton3 = new YAHOO.widget.Button(
		    "cancel-assoc",  // Source element id
		    {  
		});

});