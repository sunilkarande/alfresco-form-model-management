/* End of jQuery Plugin */
var aspectIndex = null;
var jsonObjModel = null;

function formToJson(){
	$(".fm-connect-container").html("");
	$(".fm-dynamic-dropdown").removeClass("fm-dynamic-dropdown");
	$(".dontPopulateMe").removeClass("dontPopulateMe");
	$(".fmAspectCollection").remove();
	$(".fm-profile-data").remove();
	
	//Start JSON Form Object
	var jObj = {};
		jObj.title = $('.frm_formName').text();
		jObj.visible = true;
		jObj.namespace = $('.prg-aspectprefix').val();
		jObj.name = $('.prg-aspectname').val();
		jObj.description = $('.prg-desc').val();
		jObj.formStyle = $('#formFormat').attr("class");
	var properties = new Array();
	var frmHTML = $('#formBuilderObj').html();

	$('.group').each(function(){
		 
		var fieldObj = {};
		//Cache input
		var input = $(this).find('.frm-fld:eq(0)');
		var propFullname = input.attr('name').split("_");
		var typeFullname = input.attr('title');
		 
		fieldObj.title = $(this).find('label').text().replace("*", "");
		if($(this).find('.fld-tip').length > 0)  fieldObj.tooltip = $(this).find('.fld-tip').html();
		fieldObj.regex = input.attr('regex');
		fieldObj.minlength = parseInt(input.attr('minlength'));
		fieldObj.maxlength = parseInt(input.attr('maxlength'));
		fieldObj.className =  input.attr('class').replace(/frm-fld/g, "").replace(/undefined/g, "").replace(/hasDatepicker/g, "");
		fieldObj.mandatory = false;
		if(input.hasClass('required')) fieldObj.mandatory = true;
		if(input.hasClass('frm-hidden')) fieldObj.hidden = true;
		
		fieldObj.name = propFullname[1];
		fieldObj.namespace = propFullname[0];

		fieldObj.type= typeFullname;
		fieldObj.fieldType = input.attr('type');
		fieldObj.id = input.attr('id');

		//Get collections for checkboxes, radio and select
		if(input.hasClass('select') || input.attr('type') == "radio" || input.attr('type') == "checkbox" ){
			fieldObj.options = {};
			fieldObj.options.service = false;

			if(input.hasClass('hasPopScript')){
				fieldObj.options.service = true;
				fieldObj.options.value = [  ];
			}
		}

		if(input.hasClass('select')){
			fieldObj.fieldType = "select";
			fieldObj.options.value = new Array();

			$('option', input).each(function() {
				var ob = {};
				ob[$(this).val()] =  $(this).text();
				fieldObj.options.value.push(ob) ;
			});
		}
		if(input.attr('type') == "radio"){
			var par = input.parents("div:eq(0)");
			fieldObj.fieldType = "radio";
			fieldObj.options.value = new Array();

			$('.frm-fld', par).each(function() {
				var ob = {};
				ob[$(this).val()] =  $(this).val();
				fieldObj.options.value.push(ob) ;
			});
		}
		if(input.attr('type') == "checkbox"){
			var par = input.parents("div:eq(0)");
			fieldObj.fieldType = "checkbox";
			fieldObj.options.value = new Array();

			$('.frm-fld', par).each(function() {
				var ob = {};
				ob[$(this).val()] =  $(this).val();
				fieldObj.options.value.push(ob) ;
			});
		}

		//fieldObj.alfType = input.attr('type');
		//fieldObj.alfPropertyName = input.attr('id');
		properties.push(fieldObj);
	});
	jObj.properties = properties;
	return jObj;
}

/* Pulls an aspect object out of a model */
function getAspect(model, aspect){
	var index = 0;
	for (var i=0; i < model.aspects.length; i++) {
		if(model.aspects[i].name == aspect){
			index = i;
		}
	}
	aspectIndex = index;

	return model.aspects[index];
}


/* NOT FOR jQuery PLUGIN */
/* Replaces an aspect with new aspect */
function updateAspect(model, aspectObj){
	var aspect = aspectObj.name;
	var index = 0;
	for (var i=0; i < model.aspects.length; i++) {
		if(model.aspects[i].name == aspect){
			index = i;
		}
	}
	model.aspects[index] = aspectObj;
	return model;
}
/* NOT FOR jQuery PLUGIN */
/* Saves aspect back to model and stores XML and JSON */
function saveAspectToObj(obj, aspect){

	fmModelObj = updateAspect(obj, aspect);
	var jsonString = JSON.stringify(fmModelObj);
	$('.json').html(jsonString);

	var xmlString = "";

	var uidJson = $('.uid-json').val();
	var uidModel = $('.uid-model').val();

	$('.infoMessage span').html("Please wait...");
	$('.infoMessage').fadeIn(300);
	$('.infoMessage').center();
 
    $.ajax({
		  url: "/alfresco/wcs/form-builder/saveJsonForm",
		  type: "POST",
		  dataType:"html",
		  data: { uidModel:uidModel, jsonString:jsonString, uidJson: uidJson },
		  success: function(d){
				$('.infoMessage span').html("Saved Successfully");
				$('.infoMessage').addClass("good").center().fadeOut(1000, function(){
					$('.infoMessage').removeClass("good");
				});
				//location.reload(true);
		  },
		  error:function (xhr, ajaxOptions, thrownError){
				$('.infoMessage span').html("There was a problem validating the model, one or more properties maybe in use.");
			    $('.infoMessage').addClass("bad").center();
				setTimeout("$('.infoMessage').fadeOut(1000, function(){ $('.infoMessage').removeClass('bad');  });", 3000);
		  }
	  });   
}
 
/* NOT FOR jQuery PLUGIN */
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", 200);
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}
