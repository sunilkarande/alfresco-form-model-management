function validateModelSubmission(){
	var valid = true;
	var msg = $('.error-model ul');
	$('.error').removeClass('error');
	$('.errBox').hide();

	msg.html("");

	$('.fmCreateModelForm .required').each(function(){
		if( $(this).val().replace(/ /g, "" ).length <= 0){
			valid = false;
			$(this).addClass('error');
		}
	});
	if(!valid){ msg.append("<li>Please check all required fields</li>"); }

	var nRow = $('.fm-namespaces tbody tr:eq(0)');
	if(nRow.find('input:eq(0)').val() == "" || nRow.find('input:eq(1)').val() == ""){
		valid = false;
		nRow.find('input:eq(0)').addClass('error');
		nRow.find('input:eq(1)').addClass('error');
		msg.append("<li>At least one namespace must be valid</li>");
	}

	if(!valid){
		$('.error-model').show();
	}
	return valid;
}

function resetCreateForm(){
	$('.error').removeClass('error');
	$('.errBox').hide();
	$('.multiRow').find('tbody').html("");
	$('.required').val("");

}