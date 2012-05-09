var isFmValid = true;
var fmErrLog = [];
function saveFmForm(){
	var aspectToSave = formToJson();
	//Are we still valid for properties
	$('.fm-errBox').hide();

	if(isFmValid){
		cleanupForSave();
		saveAspectToObj(fmModelObj, aspectToSave);
	}else{
		$('.fm-errBox ul').html("");
		for(i in fmErrLog){
			$('.fm-errBox ul').append("<li>" + fmErrLog[i] + "</li>");
		}
		$('.fm-errBox').show();
	}
}
function getFieldTemplate(fieldType, attr){
	if(!attr){
		attr = {}
		attr.label = "New Field";
		attr.name= "";
		attr.title="";
	}

	var fieldTmp = "";
	var fieldTypeArr = fieldType.split("_");

	if(fieldTypeArr[1] == "radio" || fieldTypeArr[1] == "text" || fieldTypeArr[1] == "checkbox"){
		fieldTmp = '<div class="group">';
		fieldTmp += '<label>'+attr.label+'</label><div><input title="'+attr.title+'" type="'+fieldTypeArr[1]+'" value="" class="frm-fld" name="'+attr.name+'"/></div>';
		fieldTmp += '</div>';

	}else if(fieldTypeArr[1] == "slider"){
		fieldTmp = '<div class="group">';
		fieldTmp += '<label>'+attr.label+'</label><div>';
		fieldTmp += '<div class="frm_slider"><label class="slider-start">Low</label><div class="sliderForm"></div><label class="slider-end">High</label><input type="text" value="" title="'+attr.title+'" class="frm-fld slider-value" name="'+attr.name+'" /><p class="clear"></p></div>';
		fieldTmp += '</div></div>';

	}else if(fieldTypeArr[1] == "phone"){
		fieldTmp = '<div class="group">';
		fieldTmp += '<label>'+attr.label+'</label><div><input type="text" name="'+attr.name+'" title="'+attr.title+'" class="frm-fld phone" value=""></div>';
		fieldTmp += '</div>';

	}else if(fieldTypeArr[1] == "name"){
		fieldTmp = '<div class="group">';
		fieldTmp += '<label>'+attr.label+'</label><div><input type="text" name="'+attr.name+'" title="'+attr.title+'" class="frm-fld" value=""><input type="text" name="" class="frm-fld" value=""></div>';
		fieldTmp += '</div>';

	}else if(fieldTypeArr[1] == "sliderval"){
		fieldTmp = '<div class="group slidervalCss">';
		fieldTmp += '<label>'+attr.label+'</label><div class="slider-wrapper"><select value="" title="'+attr.title+'" class="val_slider frm-fld select" name="'+attr.name+'"></select></div>';
		fieldTmp += '</div>';
	}else{
		fieldTmp = '<div class="group">';
		fieldTmp += '<label>'+attr.label+'</label><div><'+fieldTypeArr[1]+' value="" title="'+attr.title+'" class="frm-fld '+fieldTypeArr[1]+'" name="'+attr.name+'"></'+fieldTypeArr[1]+'></div>';
		fieldTmp += '</div>';
	}
	return fieldTmp;
}
function loadToggleValues(){
	$('.i-toggle').each(function(){
		var input = $(this).find('input');
		if(input.attr('checked')){
			$(this).find(".i-toggle-slider").css({  left: '0px' });
		}else{
			$(this).find(".i-toggle-slider").css({  left: '-21px' });
		}
	});
}
function pushOptionsToField(){
	var fieldNode = $('.ui-helper').find('.frm-fld:eq(0)');
	var fieldType = fieldNode.attr("type");
	var buildListOpt = "";

	if(fieldType == "radio" || fieldType == "checkbox"){
		$('.ui-helper').find('.frm-fld').remove();
		$('.ui-helper').find('.fld-lbl').remove();

		$('.optionSortable').children('li').each( function(){
			var fldValue = $(this).children('input').val();
			buildListOpt += '<input type="'+fieldType+'" class="frm-fld" name="'+$('.frm-alf-property-prefix').val()+'_'+$('.frm-alf-property-name').val()+'" value="'+fldValue+'" /><span class="fld-lbl">'+fldValue+ '</span>';
		});
		$('.ui-helper > div').append(buildListOpt);
	}else{
		//Must be a drop down
		$('.ui-helper').children('div').children('.frm-fld > options').remove();
		$('.optionSortable').children('li').each( function(){
			var fldValue = $(this).children('input').val();
			buildListOpt += '<option value="'+fldValue+'" >'+fldValue+'</option>';
		});
		$('.ui-helper > div > select') .find('option')
		.remove()
		.end()
		.append(buildListOpt)
		.val('');
	}
}
function addSentOption(classN){
		$('#my-frm').removeClass('message')
		.removeClass('redirect')
		.addClass(classN);
}
function indexForm(){
	var counter = 1;
	$('.f_b_root > .group').each(function() {
		$(this).children('div').children('.frm-fld').each(function() {
			$(this).attr("name", "frmIndex_"+counter);
		});
		counter++;
	});
	$('.indexCount').val(counter - 1);
}
function cleanupForSave(){
	$('.ui-helper').removeClass('ui-helper');
	$('.delField').remove();
	$('.changeField').remove();
	$('.outputMessage').hide();
	$('#my-frm').show();
	$(".frmErr").removeClass("frmErr");
	$(".errHandleBox").hide();
}
function indexMasks(type){
	$(".date").mask("99/99/9999");
	$(".phone").mask("(999) 999-9999");
	$(".sin").mask("999-999-999");
	$(".phoneext").mask("(999) 999-9999? x99999");
	$('.isOtherExp').each( function (){
		var thisId = $(this).attr('id');
		var thisMask = thisId.replace('reg-', '');
		$('#'+thisId).mask(thisMask);
	});
}
function flipClassnameSelected(className){
	var hasClass = false;

	if($(".ui-helper").find(".frm-fld").hasClass(className)){
		$(".ui-helper").find(".frm-fld").removeClass(className);
	}else{
		$(".ui-helper").find(".frm-fld").addClass(className);
		hasClass = true;
	}
	return hasClass;
}

$(function () {
	$("#formToolWrapper").tabs();

	//Load Available Namespaces
	 var availableNamespaces = "";
	for(x in fmModelObj.namespaces){
		availableNamespaces += ('<option value="'+fmModelObj.namespaces[x]["@prefix"]+'">'+fmModelObj.namespaces[x]["@prefix"]+'</option>');
	}
	$(".prg-aspectprefix, .frm-alf-property-prefix").html(availableNamespaces);

	$(".frm-alf-type-prefix").html("");
	for(x in fmModelObj.imports){
		$(".frm-alf-type-prefix").append('<option value="'+fmModelObj.imports[x]["@prefix"]+'">'+fmModelObj.imports[x]["@prefix"]+'</option>');
	}

	$(".optionSortable").sortable({ items: 'li', distance: 20, update: function(event, ui) {  pushOptionsToField(); } });
	$(".optionSortable").disableSelection();
	$("#accordion").accordion({ autoHeight: false, navigation: true });
	$("#accordion-tab1").accordion({ autoHeight: false, navigation: true });

	$('.frmSaveButton').mouseup(function(){
		saveFmForm();
	});

   $("#confirm_message").live('click', function() {
		 $('.messageRedirect').hide();
		 $('.messageFrmOpt').fadeIn("medium");
		 $('.prg-redirect').val("");
		 addSentOption('message');
    });

    $("#confirm_url").live('click', function() {
		 $('.messageFrmOpt').hide();
		 $('.messageRedirect').fadeIn("medium");
    });

	$(".inputMinLen").livequery('change', function() {
		if($(this).val() != ""){
			$('.ui-helper').find('.frm-fld').attr('minlength', $(this).val());
		}else{
			$('.ui-helper').find('.frm-fld').attr('minlength', "");
		}
	});
	$(".inputMaxLen").livequery('change', function() {
		if($(this).val() != ""){
			$('.ui-helper').find('.frm-fld').attr('maxlength', $(this).val());
		}else{
			$('.ui-helper').find('.frm-fld').attr('maxlength', "");
		}
    });

	$(".prg_pop_script").livequery('change', function() {
		var thisPop = $('.ui-helper').find('.frm-fld');
		var tVal = $(this).val();

		if(thisPop.hasClass("select")){
			if(tVal != ""){
				thisPop.attr('id', $(this).val() + "");
				if(!thisPop.hasClass("hasPopScript")){ thisPop.addClass('hasPopScript'); }

			}else{
				thisPop.removeClass('hasPopScript');
				thisPop.attr('id', "");
			}
		}
	});

    $(".frmAction").livequery('change', function() {

		$('#formBuilderObj form').removeClass('execFunction');
		$('#formBuilderObj form').removeClass('execEmail');
		$('#formBuilderObj form').removeClass('execStore');
		$('#formBuilderObj form').removeClass('execScript');

		$('.frmActionEmail').hide();
		$('.frmActionScript').hide();
		$('.frmActionFunction').hide();

		if($(this).val() == "email"){
			$('.frmActionEmail').fadeIn("medium");
			$('.frmActionScript').hide();

		}else if($(this).val() == "script"){
			$('.frmActionScript').fadeIn("medium");
		}else if($(this).val() == "function"){
			$('.frmActionFunction').fadeIn("medium");

		}else if($(this).val() == "table"){
			$('#formBuilderObj form').attr("action", "/admin/core/portlets/plugins/forms/php/store.php");
		    $('#formBuilderObj form').addClass('execStore');
		}
   });

   $(".actionEmail").livequery('change', function() {
		$('#formBuilderObj form').attr("action", "/admin/core/portlets/plugins/forms/php/email.php?e=" + $(this).val());
		$('#formBuilderObj form').addClass('execEmail');
   });

   $(".actionScript").livequery('change', function() {
		$('#formBuilderObj form').attr("action", $(this).val());
		$('#formBuilderObj form').addClass('execScript');
   });

   $(".actionFunction").livequery('change', function() {
		$('#formBuilderObj form').attr("action", $(this).val());
		$('#formBuilderObj form').addClass('execFunction');
   });

   $(".prg-opt-title").livequery('change', function() {
		$('.outputMessage h1').html($(this).val());
		addSentOption("message");
   });

   $(".prg-message").livequery('change', function() {
		$('.outputMessage p').html($(this).val());
   });

   /* Form options */
	$("#formName").live('keyup', function() {
		 $(".frm_formName").html($(this).val());
	});

	$('.prg-desc').live('keyup', function() {
		 $(".frm_desc").html($(this).val());
	});

	$('.prg-formclass').live('keyup', function() {
		 $("#formBuilderObj > form").attr("class", $(this).val());
	});

	$('.prg-redirect').livequery('change', function() {
		 $('.prg-frm-redirect').val($(this).val());
		 addSentOption("redirect");
	});

	/* Field options */
	$(".selectMask").livequery('change', function() {
		$(".ui-helper").find("input")
			.removeClass('isOtherExp')
			.removeClass('hasDatepicker')
			.attr('id', "");

		$('.selectMask > option').each(function() {
		    $(".ui-helper").find("input").removeClass($(this).val());
		});
		$('.regExpOther').hide();

		if($(this).val() == "other"){
			$('.regExpOther').show();
		}else{
			$(".ui-helper").find("input").addClass( $(this).val() );
			indexMasks($(this).val());
		}
	});
	$(".regExpOtherFld").livequery('blur', function() {
		if( $(this).val() == ""){
			$(".ui-helper").find("input")
				.removeClass("isOtherExp")
			 	.attr("regex", "");
		}else{
			$(".ui-helper").find("input")
				.addClass("isOtherExp")
				.attr("regex", ""+$(this).val());
			indexMasks($(this).val());
		}
	});
	$(".prg_fieldLabel").keyup(function() {
		 $(".ui-helper > label").html($(this).val());
	});

	$(".prg_tipLabel").keyup(function() {
		var tipObj = $(".ui-helper div").find('span.fld-tip');
		if(tipObj.length > 0){  }else{
			$(".ui-helper div").append('<span class="fld-tip"></span>');
		}
		$(".ui-helper").find(".fld-tip").html( $(this).val() );

	});

	$(".prg_fieldLabel").blur(function() {
		//ONLY USE THIS HELPER ONCE. DO NOT CHANGE AFTER IT MAY HAVE BEEN SAVED AND SOMEONE CHANGES THE LABEL
		//OTHER NODES MAYBE USING OLD PROPERTY NAME
		if( $('.frm-alf-property-name').val() == ""){
		 	var nme = $(this).val().replace(/ /g, "").toLowerCase();
				nme = nme.replace(/[^a-z]/g, '');
		 	$('.frm-alf-property-name').val( nme );

			 var a= $('.frm-alf-property-name').val();
			 var b= $('.frm-alf-property-prefix').val();
			$(".ui-helper").find(".frm-fld").attr("name", b + "_" + a);
		 }
	});

	$(".frm-alf-property-name").live('keyup', function() {
		  var a= $('.frm-alf-property-name').val();
		  var b= $('.frm-alf-property-prefix').val();
		 $(".ui-helper").find(".frm-fld").attr("name", b + "_" + a);
	});
	$('.frm-alf-property-prefix').change(function(){
		 var a= $('.frm-alf-property-name').val();
		  var b= $('.frm-alf-property-prefix').val();
		 $(".ui-helper").find(".frm-fld").attr("name", b + "_" + a);
	});

	$('.frm-alf-property-prefix-text').keyup(function(){
		 var a= $('.frm-alf-property-name').val();
		  var b= $('.frm-alf-property-prefix-text').val();
		 $(".ui-helper").find(".frm-fld").attr("name", b + "_" + a);
	});



	$(".frm-alf-type, .frm-alf-type-prefix").change(function() {
		  var a= $('.frm-alf-type').val();
		  var b= $('.frm-alf-type-prefix').val();
		 $(".ui-helper").find(".frm-fld").attr("title", b + "_" + a);
	});

	$(".prg_quiz_right").live('keyup', function() {
		 $(".ui-helper .slider-end").html($(this).val());
	});

	$(".prg_quiz_left").live('keyup', function() {
		 $(".ui-helper .slider-start").html($(this).val());
	});

	$('.prg_required').live('click', function() {
		if($(".ui-helper").find(".frm-fld").hasClass('required')){
			$(".ui-helper").find(".frm-fld").removeClass('required');
			$(".ui-helper").find('.lbRequired').remove();
			$(".ui-helper > label").html( $(".ui-helper > label").html().replace('*', '') );

		}else{
			$(".ui-helper").find(".frm-fld").addClass('required');
			$(".ui-helper > label").append('*');
		}
	});

	$('.prg_index').live('click', function() {
		$(".index-sub-cat").hide();
		var hasIndex = flipClassnameSelected('alf-index');
		if(hasIndex){
			$(".index-sub-cat").show();
		}else{
			$('.index-sub-cat').hide();
			$(".ui-helper").find(".frm-fld").removeClass('alf-inx-atomic alf-inx-tokenized alf-inx-stored');
		}
	});

	$('.prg_dummyfield').live('click', function() {

		var hasIndex = flipClassnameSelected('alf-dummyfield');
		if(hasIndex){
			$(".frm-alf-property-prefix-text").show();
			$(".frm-alf-property-prefix").hide();
		}else{
			$(".frm-alf-property-prefix-text").hide();
			$(".frm-alf-property-prefix").show();
		}
	});

	$('.prg_inx-atomic').live('click', function() {
		flipClassnameSelected('alf-inx-atomic');
	});
	$('.prg_inx-tokenized').live('click', function() {
		flipClassnameSelected('alf-inx-tokenized');
	});
	$('.prg_inx-stored').live('click', function() {
		flipClassnameSelected('alf-inx-stored');
	});

	$('.prg_verification').live('click', function() {
		flipClassnameSelected('verification');
	});
	$('.prg_numOnly').live('click', function() {
		flipClassnameSelected('numOnly');
	});
	$('.prg_alphanumOnly').live('click', function() {
		flipClassnameSelected('alphanumOnly');
	});

	$('.prg_hidden').live('click', function() {
		if($(".ui-helper").find(".frm-fld").hasClass('frm-hidden')){
			$(".ui-helper").find(".frm-fld").removeClass('frm-hidden');
			$(".ui-helper").find('.lbRequired').remove();
			$(".ui-helper > label").html( $(".ui-helper > label").html().replace('*', '') );

		}else{
			$(".ui-helper").find(".frm-fld").addClass('frm-hidden');
		}
	});

	$('.frmFormat').livequery('change', function() {
		$('#formFormat').attr('class', $(this).val() );
	});
	$('.fieldAddOptions a').live('click', function(){

		var thisNewField = getFieldTemplate( $(this).attr('id') );
		$('.f_b_root').append(thisNewField);
		$(".f_b_root").sortable("refresh");
		return false;
	});

	$(".delOption").live('click', function(){
		$(this).parents('li:eq(0)').remove();
		pushOptionsToField();
	});

	$(".addOption").live('click', function(){
		$('.optionSortable').append('<li><input style="width:150px!important" class="frm_opt_val" type="text" value="" /><a class="delOption" tabindex="-1" href="#"><span>Delete</span></a></li>');
	});
	$(".optionSortable li input").livequery('change', function(){
		pushOptionsToField();
	});
	/*	Start open props
	-------------------------------------------------------*/
	$(".f_b_root > .group").live('mouseover', function(){
		$(this).addClass("hover-state");
	});
	$(".f_b_root > .group").live('mouseout', function(){
		$(this).removeClass("hover-state");
	});

	$(".group").live('click', function(){
		$('.selectMask').val("");
		$('.ui-helper').removeClass('ui-helper');
		$('.delField').remove();
		$('.changeField').remove();
		$(".optionsMenu").hide();

		var fieldTitle = $(this).children('label').text();
		var fieldNode =  $(this).find('.frm-fld:eq(0)');
		var tooltip =  $(this).find('.fld-tip:eq(0)').html();

		//Populate Alfresco Properties
		var tmpName = $(this).find('.frm-fld:eq(0)').attr("name");
		if(tmpName == ""){
			$('.frm-alf-property-prefix-text').val( $('.prg-aspectprefix').val() );
			$('.frm-alf-property-prefix').val( $('.prg-aspectprefix').val() );
			$('.frm-alf-property-name').val("");

		}else{
			var propFullName = tmpName.split("_");

			if(propFullName[1].indexOf(":") >= 0){
				propFullName[1] = propFullName[1].split(":")[1];
				propFullName[0] = propFullName[0].split(":")[0];
			}
			$('.frm-alf-property-prefix-text').val( propFullName[0] );
			$('.frm-alf-property-prefix').val(propFullName[0]);
			$('.frm-alf-property-name').val(propFullName[1]);
		}

		var alfType = $(this).find('.frm-fld:eq(0)').attr("title");
		if(alfType != ""){
			var typeFullName = alfType.split("_");
			$('.frm-alf-type-prefix').val(typeFullName[0]);
			$('.frm-alf-type').val(typeFullName[1]);
		}else{
			//Use default
			$('.frm-alf-type-prefix').val(fmModelObj.imports[0]["@prefix"]);
			$('.frm-alf-type').val("text");

			$(this).find('.frm-fld:eq(0)').attr("title", fmModelObj.imports[0]["@prefix"] + "_" + "text");

		}

		//Custom Text
		if( fieldNode.hasClass('slider-value')){
			$('.prg_quiz_left').val( $(this).find('.slider-start').text() );
			$('.prg_quiz_right').val( $(this).find('.slider-end').text() );
			$('.quiz-labels').show();
		}else{
			$('.quiz-labels').hide();
		}

		if(fieldNode.attr("type") == "text"){
			$('.textOnly').show();
		}else{
			$('.textOnly').hide();
		}

		if(fieldNode.attr("type") == "radio" || fieldNode.attr("type") == "checkbox" ||  fieldNode.hasClass("select") ){
			if(fieldNode.hasClass(".hasPopScript")){
				 $(".optionSortable").html("");
				 $('.prg_pop_script').val(fieldNode.attr("id") );
				 $(".optionsMenu").show();
			}else{
				var thisOption = "";
				//Collect radio values
				if(fieldNode.attr("type") == "radio" || fieldNode.attr("type") == "checkbox"){
					$(this).find(".frm-fld").each(function(){
						thisOption += '<li><input style="width:150px!important" class="frm_opt_val" type="text" value="'+$(this).val()+'" /><a tabindex="-1" class="delOption" href="#"><span>Delete</span></a></li>';
					});
				}else{

					var selectBox = $(this).find("select");
					$('option', selectBox).each(function() {
						thisOption += '<li><input style="width:150px!important" class="frm_opt_val" type="text" value="'+$(this).val()+'" /><a tabindex="-1" class="delOption" href="#"><span>Delete</span></a></li>';
					});

				}

				$(".optionSortable").html(thisOption);
				$(".optionsMenu").show();
				$(".optionSortable").sortable("refresh");
			}
		}

		//Change tool props to show title
		$('.prg_fieldLabel').val(fieldTitle.replace("*", ""));
		$('.prg_tipLabel').val(tooltip);


		//Is it a required field?
		if(fieldNode.hasClass('required')){
			$('.prg_required').attr("checked", "checked");
		}else{
			$('.prg_required').attr("checked", "");
		}

		//Is it a multiple?
		if(fieldNode.hasClass('alf-multiple')){
			$('.prg_multiple').attr("checked", "checked");
		}else{
			$('.prg_multiple').attr("checked", "");
		}

		//Is it a dummy field?
		if(fieldNode.hasClass('alf-dummyfield')){
			$('.prg_dummyfield').attr("checked", "checked");
			$(".frm-alf-property-prefix-text").show();
			$(".frm-alf-property-prefix").hide();
		}else{
			$('.prg_dummyfield').attr("checked", "");
			$(".frm-alf-property-prefix-text").hide();
			$(".frm-alf-property-prefix").show();

		}

		//Is it a index?
		if(fieldNode.hasClass('alf-index')){
			$('.prg_index').attr("checked", "checked");
			$('.index-sub-cat').show();
			if( fieldNode.hasClass('alf-inx-atomic') ) $('.prg_inx-atomic').attr("checked", "checked");
			if( fieldNode.hasClass('alf-inx-stored') ) $('.prg_inx-stored').attr("checked", "checked");
			if( fieldNode.hasClass('alf-inx-tokenized') ) $('.prg_inx-tokenized').attr("checked", "checked");

		}else{
			$('.prg_index').attr("checked", "");
			$('.index-sub-cat').hide();
			$('.prg_inx-atomic').attr("checked", "");
			$('.prg_inx-stored').attr("checked", "");
			$('.prg_inx-tokenized').attr("checked", "");
		}

		//Is it a hidden field?
		if(fieldNode.hasClass('frm-hidden')){
			$('.prg_hidden').attr("checked", "checked");
		}else{
			$('.prg_hidden').attr("checked", "");
		}

		//Is it a verification field?
		if(fieldNode.hasClass('verification')){
			$('.prg_verification').attr("checked", "checked");
		}else{
			$('.prg_verification').attr("checked", "");
		}

		//Is it a numOnly field?
		if(fieldNode.hasClass('numOnly')){
			$('.prg_numOnly').attr("checked", "checked");
		}else{
			$('.prg_numOnly').attr("checked", "");
		}
		//Is it a numOnly field?
		if(fieldNode.hasClass('alphanumOnly')){
			$('.prg_alphanumOnly').attr("checked", "checked");
		}else{
			$('.prg_alphanumOnly').attr("checked", "");
		}

		//Pop Max min length
		$('.inputMinLen').val("");
		if(fieldNode.attr("minlength") != ""){
			$('.inputMinLen').val(fieldNode.attr("minlength"));
		}
		$('.inputMaxLen').val("");
		if(fieldNode.attr("maxlength") != ""){
			$('.inputMaxLen').val(fieldNode.attr("maxlength"));
		}

		//Pop Regex
		$('.selectMask > option').each(function() {
		    if(fieldNode.hasClass("isOtherExp") ){
		    	$('.regExpOther').show();
		    	$('.regExpOtherFld').val( fieldNode.attr("regex"));
		    	$('.selectMask').val("other");
		    }

		    if(fieldNode.hasClass( $(this).val() )){
				 $('.selectMask').val( $(this).val() );
		    }
		});

		$('#formToolWrapper').tabs( "select" , 1 );
		$("#accordion").accordion( "activate" , 0 );
		$(this).addClass('ui-helper');
		$(this).append('<a href="#" class="delField"><span>Delete</span></a><a href="#" class="changeField"><span>Type</span></a>');
		loadToggleValues();
	});

	$('.delField').live('click', function(){
		$(this).parents(".group:eq(0)").remove();
	});

	$('.changeField').live('click', function(){
		var oSet = $(this).offset();
		$(this).parents(".group").addClass("fm-change-field");
		$('.field-change-popup').css({ "top": oSet.top + 15, "left": oSet.left - 165 }).show();
	});
	$('.field-change-popup').mouseleave( function(){
		setTimeout('$(".field-change-popup").hide(); $(".fm-change-field").removeClass("fm-change-field");', 200);
	});
	$('.field-change-popup a').click(function(){
		var copyField = $('.fm-change-field').find('.frm-fld:eq(0)');
		//Remove Required
		$('.fm-change-field').find('label:eq(0) span').remove();

		var label = $('.fm-change-field').find('label:eq(0)').text();
		var attr = {};
			attr.title = copyField.attr("title");
			attr.name = copyField.attr("name");
			attr.label = label;

		var thisNewField = getFieldTemplate( $(this).attr('id'), attr);
		$('.fm-change-field').replaceWith(thisNewField);
		return false;
	});

	//Some validation stuff
	$('.numOnly').live('keydown', function(e){
	  //if the letter is not digit then display error and don't type anything
	  if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57))
	  {
		//display error message
		return false;
	  }
	});

	/* Builder only */

	$('.jfk-button').mouseenter(function(){
		$(this).addClass('jfk-button-hover');
	});
	$('.jfk-button').mouseleave(function(){
		$(this).removeClass('jfk-button-hover');
	});

	$('.prg-aspectname').keyup(function(){
		  var a= $('.prg-aspectname').val();
		  var b= $('.prg-aspectprefix').val();
		  $('.aspect-name-tip').html( b + ":" + a);
	});
	$('.prg-aspectprefix').change( function(){
		var a= $('.prg-aspectname').val();
	    var b= $('.prg-aspectprefix').val();
		$('.aspect-name-tip').html( b + ":" + a);
	});
});

$(function(){
	//LOAD Actions
	var action = $('#my-frm').attr('action');
	var form = $('#my-frm');
	if(form.hasClass('execEmail')){
		var emA = action.split("e=");
		$('.frmAction').val("email");
	    $('.frmActionEmail').fadeIn("medium");
		$('.actionEmail').val(emA[1]);

	}else if(form.hasClass('execStore')){
		$('.frmAction').val("table");

	}else if(form.hasClass('execScript')){
		$('.frmAction').val("script");
	    $('.frmActionScript').fadeIn("medium");
		$('.actionScript').val(action);
	}else if(form.hasClass('execFunction')){
		$('.frmAction').val("function");
	    $('.frmActionFunction').fadeIn("medium");
		$('.actionFunction').val(action);

	}
	/* iToggle Checkbox */
	$('.i-toggle').live("mouseup", function(){
		var iBox = $(this).find("input");
        iBox.trigger("click");
		if(iBox.attr('checked')){
			$(this).find(".i-toggle-slider").animate({  left: '+=21' }, 300, function() {   });
		}else{
			$(this).find(".i-toggle-slider").animate({  left: '-=21' }, 300, function() {  });
		}
	});
});