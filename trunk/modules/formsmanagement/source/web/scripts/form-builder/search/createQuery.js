/**
 * This function loops through the fields in the form and builds out
 * a query string to pass to the search service.
 * @author mike priest
 * @returns {}
 */
function collectQuery(){
	var qString = "";

	$('#formFormat .group .frm-fld').each(function(){
		var node = $(this);
		var hasVal = false;

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

		}else if(node.attr('name').indexOf('_toDate') > 0){
			//ignore replication
		}else if(node.hasClass("date")){

			var toVal = $("input[name='" + node.attr('name') + "_toDate']").val();
			qString += node.attr('name') + "=" + encodeURIComponent( node.val()) + "-TO-"+toVal+"&";

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