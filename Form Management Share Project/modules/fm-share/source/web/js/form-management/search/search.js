function injectAlfrescoDefaults()
{
	var injectionForm = $('.injectionForm').html();
	$('.injectionForm').html("");

	$('.f_b_root:eq(0)').prepend( injectionForm );
	$(".modDatePicker").mask("9999-99-99").datepicker({
		"dateFormat": "yy-mm-dd",
		changeMonth: true,
		changeYear: true
	});

	var nodeObj = getQueryObject();
	console.log( JSON.stringify(nodeObj) );
	$('.fm-profile').form("loadPropertiesToFields", nodeObj);
}

function getQueryPath()
{
	var path = "r=false";
	var qtype = $(".fm-search-type").val();

	if(qtype == "all-sites") path = "a=true";
	if(qtype == "repo") path = "r=true";

	return path;
}
function getQueryObject()
{
	var queryString = decodeURIComponent( location.search.substring(1) );
	var paramArr    =  queryString.split("&");
	var queryMap = {};
	var nodeObj = {};
		nodeObj.node = {};

	for(i in paramArr)
	{
		var keyVal = paramArr[i].split("=");
		queryMap[ keyVal[0].replace("_", ":") ] = keyVal[1];
	}

	nodeObj.node.properties = queryMap;

	return nodeObj;
}

function collectQuery(){
	var qString = "";

	$('#formFormat .group .frm-fld').each(function(){
		var node = $(this);
		var hasVal = false;
		var dataType = "";
		if(node.data("type")) dataType = node.data("type");

		if(node.attr("name") == "cm_modified_from" || node.attr("name") == "cm_modified_to"){
			if($("input[name='cm_modified_to']").val() != "" || $("input[name='cm_modified_from']").val() != ""){
				hasVal = true;
			}
		}else if( node.val() != "" ){
			hasVal = true;
		}

		//Make sure its not working data
		if(node.attr("id")){
			if(node.attr("id").indexOf("bool-") >= 0){
				node = node.parents('.group').find('.isBoolHidden');
			}
		}
		if(node.attr("type") == "radio"){
			//Check if its checked
			if(node.is(':checked')){
				var nodeName = node.attr("name");
				var rVal = node.val();
				qString += node.attr('name') + "=" + encodeURIComponent( $("input[name='"+nodeName+"']:checked").val()  ) + "&";
			}

		}else if( dataType.indexOf("boolean") > 0){
			//Add boolean true only so we can still get docs undefined
			if(node.is(":checked")) qString += node.attr('name') + "=true&";

		}else if(node.attr('name').indexOf('_toDate') > 0){
			//ignore replication
		}else if(node.hasClass("date")){

			if( node.val() != ""){
				var toVal = $("input[name='" + node.attr('name') + "_toDate']").val();

				if(toVal != ""){
					qString += node.attr('name') + "=" + encodeURIComponent( node.val()) + "-TO-"+toVal+"&";
				} else{
					qString += node.attr('name') + "=" + encodeURIComponent( node.val()) +"&";
				}
			}

		} else if( hasVal && node.val() != "false"){

			if(node.attr("name") == "img_documenttype"){
				if($('.docInSearch').attr("checked")){
					qString += node.attr('name') + "=" + encodeURIComponent( node.val()) + "&";
				}
			}else{
				qString += node.attr('name') + "=" + encodeURIComponent( node.val()) + "&";
			}
		}
	});
	return qString;
}
function moveDocument(nodes, aspectsToValidate, isRecord, moveNodeRef){
	if(!moveNodeRef) moveNodeRef = "";
	$('.infoMessage span').html("Please wait...");
	$('.infoMessage').removeClass("good").center();
	$('.infoMessage').fadeIn(300).center();

	jQuery.ajax({
		type: "GET",
		url: "/share/proxy/alfresco/imaging/form-management/formdata/move",
		dataType:"json",
		data:{
			nodes: nodes,
			destination: moveNodeRef,
			aspect: aspectsToValidate,
			siteid: $('.fm-site-id').val(),
			isRecord: isRecord
		},
		success:function(r){
			if(r.status == 0){
				$('.infoMessage').addClass("warning");
				$('.infoMessage span').html(r.msg + " " + r.validation.service.msg);
				$('.infoMessage').center();
				setTimeout( '$(".infoMessage").fadeOut(300, function(){  $(".infoMessage").removeClass("warning"); }); ', 4000 );

			}else{
				/* if(parseInt(r.validation.filesFailed) > 0){
					$('.infoMessage').addClass("warning");
					$('.infoMessage span').html("1 item(s) failed. That file did not seem to have all the required metadata to become a Record.");
					$('.infoMessage').center();
					setTimeout( '$(".infoMessage").fadeOut(300, function(){  $(".infoMessage").removeClass("warning"); }); ', 4000 );

				}else{ */
					$('.infoMessage span').html(""+r.successMove + " item(s) moved successfully. " + r.failedMove + " item(s) failed.");
					$('.infoMessage').removeClass("good").center();
					setTimeout( '$(".infoMessage").fadeOut(300, function(){ location.reload(true) }); ', 3000 );
			}
		},
		error:function (xhr, ajaxOptions, thrownError){

			$('.infoMessage').addClass("warning");
			$('.infoMessage span').html("Sorry, you do not have the right permission to do that. Please contact your administrator if you require access.");
			$('.infoMessage').center();
			setTimeout( '$(".infoMessage").fadeOut(300, function(){  $(".infoMessage").removeClass("warning"); }); ', 4000 );
		}
	});

}
$(function(){

	$('.search-type .ibg a').click(function(){
		$('.search-type ul').toggle();
	});

	$('.search-type ul').mouseleave(function(){
		setTimeout("$('.search-type ul').hide();", 500);
	});

	$('.search-type > ul > li > a').click(function(){
		var tClass = $(this).attr("class");
		$('#btnSearchType span').attr("class",  tClass );
		$('.fm-search-type').val(tClass.replace("ico-", ""));
		$('.search-type ul').hide();
		return false;
	});


	var pagingCount = parseInt( $('.sb-page-count').val() );

	if( pagingCount > 0){
		$(".uaSearchPaging").paginate({
			count 		: pagingCount,
			start 		: 1,
			start 		: 1,
			display     : 10,
			border					: false,
			text_color  			: '#79B5E3',
			background_color    	: 'none',
			text_hover_color  		: '#2573AF',
			background_hover_color	: 'none',
			images		: false,
			mouse		: 'press',
			onChange : function(page){
				$('#uaPages .ua-res-page').removeClass('_current').hide();
				$('#uaPages .ua-res-page:eq('+(page - 1)+')').addClass('_current').show();
			}
		});
	}
	else
	{
		$(".ua-res-foot").hide();
	}

	$('.fileSelect').click(function(){
		var totalSelected = $('.fileSelect:checked').length;
		if(totalSelected > 0){
			$('.recdocflip .ua-menu').removeClass("ua-disabled");
		} else{
			$('.recdocflip .ua-menu').addClass("ua-disabled");
		}
	});

	$('.ac-mvrecords').click(function(){
		var idList = "";
		$('.fileSelect:checked').each(function(){
			if( !$(this).parents(".ua-res-doc").hasClass("record")) idList += $(this).attr("id") + "~";
		});
		idList = idList.slice(0, -1);
		if(idList != "") moveDocument(idList, nodeValFormAspect, true);

		return false;
	});

	$('.ac-mvdropbox').click(function(){
		var idList = "";
		$('.fileSelect:checked').each(function(){
			if( !$(this).parents(".ua-res-doc").hasClass("record")) idList += $(this).attr("id") + "~";
		});
		idList = idList.slice(0, -1);
		if(idList != "") moveDocument(idList, "", false, $('.fm-dropbox-nodeRef').val().replace("workspace://SpacesStore/", "") );

		return false;
	});

    $('.ico-move').click(function(){
		var conf = confirm("Are you sure you want to move this item to Records?");
		if(conf){
			moveDocument($(this).attr("href"), nodeValFormAspect, true);
		}
		return false;
	});
	$('.ico-move-dropbox').click(function(){
		var conf = confirm("Are you sure you want to move this item to your Dropbox?");
		if(conf){
			moveDocument($(this).attr("href"), "", false, $('.fm-dropbox-nodeRef').val().replace("workspace://SpacesStore/", "") );
		}
		return false;
	});

	$('.switch').click(function(){
		$('.switch-selected').removeClass('switch-selected');
		if($(this).hasClass('show-records')){
			$('.document').hide();
			$('.record').show();
			$(this).addClass('switch-selected');
		}
		if($(this).hasClass('show-document')){
			$('.record').hide();
			$('.document').show();
			$(this).addClass('switch-selected');
		}
		if($(this).hasClass('show-all')){
			$('.document, .record').show();
			$(this).addClass('switch-selected');
		}
	});
	$( "#configTabs" ).tabs({
		selected: 0
	});
	var defaultLbl = "Search by keywords...";
	$('.default').val(defaultLbl);
	$('.default').livequery("focus", function(){
		$(this).removeClass("default");
		$(this).val("");
	});

	$('.search-field').livequery("blur", function(){
		if( $(this).val() == "") {
			$(this).addClass("default");
			$(this).val( defaultLbl );
		}
	});

	$('.lsb').mouseup(function(){
		var sterm = $('#searchindex').val();
		var path = getQueryPath();
		window.location = "?" + path + "&" + sterm.replace(/#VALUE#/g, encodeURIComponent( $('.search-field').val()) );
	});
	$('.search-field').live('keydown', function (e) {
		if(e.which == 13){
			var sterm = $('#searchindex').val();
			var path = getQueryPath();
			window.location = "?" + path + "&" + sterm.replace(/#VALUE#/g, encodeURIComponent( $('.search-field').val()) );
		}
	});

	$('.dynamic-criteria').dialog({
		autoOpen: false,
		width:585,
		resizable: false,
		modal:true,
		draggable:false,
		position: ['center', 15],
		buttons: {
			Cancel: function() {
				$( this ).dialog( "close" );
			},
			"Search": function() {
				var q = collectQuery();
				var path = getQueryPath();
				window.location = "?" + path + "&" + q;
			}
		},
		open: function() {
			$(this).find('.ui-dialog-titlebar-close').blur();
			$(this).addClass('ui-dialog-tabs');

		}
    }).parent().find('.ui-dialog-titlebar-close').prependTo('#configTabs').closest('.ui-dialog').children('.ui-dialog-titlebar').remove()

	$('.dynamic-criteria').parent().draggable({ handle: '.ui-tabs-nav' });

	/* Events */
	$('.advanced-search-button').click(function(){
		$('.dynamic-criteria').dialog("open");
		$('.pageCountCheck ').select().focus();
	});

	$('.ua-menu').mouseenter(function(){
		if(!$(this).hasClass('ua-disabled') ) $(this).addClass('ua-dropdown-hover-state');

	}).mouseleave(function(){
		$(this).removeClass('ua-dropdown-hover-state');
	});

	$('.ua-menu').mousedown(function(){
		if(!$(this).hasClass('ua-disabled') )  $(this).find("ul").fadeIn(100).addClass("open-state");
	});

	$('.ua-menu ul').mouseleave(function(){
		submenuTimer = setTimeout("$('.open-state').hide(); $('.open-state').removeClass('open-state'); ", 200 );
    });
    $('.ua-menu li ul').mouseenter(function(){ clearTimeout(submenuTimer) });

	/* Search table */
	$('.ua-res-doc').mouseenter(function(){
		$(this).addClass("ua-res-row-highlight");
		$(this).find(".resultTools").show();
	})
	.mouseleave(function(){
		$(this).removeClass("ua-res-row-highlight");
		$(this).find(".resultTools").hide();
	});
});

 jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", 200);
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}
