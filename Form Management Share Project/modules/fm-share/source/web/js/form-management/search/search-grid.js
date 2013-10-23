/**
 *  Enable document type search grid
 */
var documentTypeGrid = "prop_ua_documenttype";
var gridEnabled = true;
var oSearchGrid = null;


/**
 * From model, find out what fields are "search grid enabled"
 * @param aspects object
 * @returns {Array}
 */
function getGridEnabled(aspects){

	var obj = {};
		obj.fields = [];
		obj.headers = [];

	for(i in aspects){
		var a = aspects[i];

		for(z in a.properties){
			var f = a.properties[z];

			if(f.searchGrid){
				obj.fields.push( a.namespace  + ":" + f.name );
				obj.headers.push( f.title );

			}
		}
	}

	return obj;
}


/**
 * Setup a table with fields that are grid enabled
 * @param aspects object
 * @returns {Array}
 */
function setSearchTableHeaders(aspects){
	var query = getURLParameter("q");
	var obj = {};
		obj.fields = [];

	if(gridEnabled && query.length > 0 && documentTypeGrid){
		var q = eval("(" + query + ")");

		if(q[documentTypeGrid] != ""){

			$('.btn-grid-view').show();
			obj = getGridEnabled(aspects);

			$('#dropbox thead tr').append('<th class="dt-check-column"><input type="checkbox" class="dtRowSelectAll" /></th><th>Filename</th>');

			for(i in obj.headers)$('#dropbox thead tr').append("<th>"+ obj.headers[i]+"</th>");

			$('#dropbox thead tr').append('<th>Actions</th>');
		}
	}

	return obj.fields;
}

function loadDatatable(){

	if(!oSearchGrid){

		var url = "/share/proxy/alfresco/slingshot/search";
		oSearchGrid = $('#dropbox').dataTable({

	        "bProcessing": true,
	        "sAjaxSource": url,
	        "sPaginationType": "full_numbers",
	        "oLanguage": {
				"sSearch": ""
	        },
            "aaSorting":[],
	        "fnServerData": function ( sSource, aoData, fnCallback ) {

	    	   aoData = getQueryForSearch();
	    	   aoData.fields = dtFields.join(",");

	            $.ajax( {
	                "dataType": 'json',
	                "url": sSource,
	                "data": aoData,
	                "success": fnCallback
	            });
	        },
	        "aoColumnDefs"  : [
			 {
				bSortable: false,
				aTargets: [0],    // Column number which needs to be modified
			    fnRender: function (o, v) {   // o, v contains the object and value for the column
			        return '<input type="checkbox" class="dtRowSelect" />';
			    }
			}],
			"aLengthMenu": [[10, 25, 50, 100, 200], [10, 25, 50, 100, 200]],
			"iDisplayLength" : 200

	    });
	}
}


/**
 *  Select menu for grid
 */
function printSelected(){

	//Create print table
	$('body').append('<div id="printme"><table style="font-family:helvetica; font-size:12px; width:100%">'+$('table#dropbox').html()+'</table></div>');
	$('#printme table tbody').html("");
	$('#printme table th').attr("style", "");

	$('.dtRowSelect:checked').each(function(){
		$(this).parents("tr").clone().appendTo("#printme table tbody");
	});

	var q = getQueryObject();

	if(q.node.properties){
		var dr = q.node.properties["ua:datereceived-date-range"];
		if(dr){
			var dateR = dr.split("|");
			var from = dateR[0].substring(0, 10);
			var to = "";

			if(dateR[1]) to = " - " + dateR[1].substring(0, 10);

			$('#printme').prepend('<div style="font-family:helvetica; font-size:12px; margin-bottom:20px;">Date Received Searched: '+ from + to + '</div>');

		}
	}

	//Remove first and last column
	$('#printme table tbody tr').each(function(){ $(this).find("td:eq(0)").remove();$(this).find("td:last").remove(); });
	$('#printme table thead tr').each(function(){ $(this).find("th:eq(0)").remove(); $(this).find("th:last").remove(); });

	//Print and clean up
	$("#printme").printThis({
		loadCSS : "/share/css/form-management/search/print-search-grid.css",
		pageTitle : "Alfresco search print results"
	});
	$("#printme").remove();
}

var oSelectMenuButton = null;
function toggleSelectMenu(){
	oSelectMenuButton.set('disabled', true);

	if( $('.dtRowSelect:checked').length > 0 ){
		oSelectMenuButton.set('disabled', false);
	}
}
function setupSelectMenu(){

	$('.dtRowSelect').live("click", function(){
		toggleSelectMenu();
	});
	$('.dtRowSelectAll').live("click", function(){
		$('.dtRowSelect').attr("checked", false);
		if( $('.dtRowSelectAll:checked').length > 0 ){
			$('.dtRowSelect').attr("checked", true);
		}
		toggleSelectMenu();
	});

	//YUI BUTTONS
	oSelectMenuButton = new YAHOO.widget.Button("selectmenu", {
            type: "menu",
            menu: "selectmenuselect" });
	oSelectMenuButton.addClass('sort-button');
	oSelectMenuButton.set('disabled', true);

	var onSelectMenuClick = function (p_sType, p_aArgs) {

	    var oEvent = p_aArgs[0],    //  DOM event
	        oMenuItem = p_aArgs[1]; //  MenuItem instance that was the target of the event

	    if (oMenuItem) {
	    	switch(oMenuItem.value)
	    	{
	    	case "print":
	    		printSelected();
	    		break;

	    	case "downloadZip":
	    		var nodes = [];

	    		$('.dtRowSelect:checked').each(function(){

	    			var id = $(this).parents("tr:eq(0)").find("td:eq(1) > a").attr("href").split("/").reverse()[0];
	    			nodes.push(id);
	    		});

	    		var url = "/share/proxy/alfresco/slingshot/zipContents?nodes="+nodes.join(",")+"&filename=TranscriptsDownload&noaccent=false";
	    		window.location.assign(url);
	    		break;
	    	}
	    }
	};

	//  Add a "click" event listener for the Button's Menu
	oSelectMenuButton.getMenu().subscribe("click", onSelectMenuClick);
}

$(function(){
	setupSelectMenu();
});