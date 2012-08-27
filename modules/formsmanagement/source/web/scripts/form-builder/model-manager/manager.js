function validateInternalForm(form){
	var valid = true;
	form.find('.errBox').hide();
	$(".error").removeClass("error");

	form.find(".required").each(function(){
		if( $(this).val() == "" ){
			valid = false;
			$(this).addClass("error");
		}
	});

	if(!valid)  form.find('.errBox').fadeIn(1000);
	return valid;
}
function cleanString(node){
  string =  node.val().replace(/[^a-zA-Z]+/g,'');
  node.val(string);

  return string;
}
function aspectTemplate(aspect){
  var temp = '<div id="aspect_'+ aspect.name +'" class="fm-aspect"><div class="ico-aspect"></div><span>'+aspect.title+'</span><a class="ico-del fmDeleteAspect">&nbsp;</a></div>'
  return temp;
}
function modelTemplate(model){
	var temp = '<div class="fm-model-wrapper "><div class="fm-tools"><div class="jfk-button-standard jfk-button addAspect"><span>Add Aspect</span></div><div class="jfk-button-standard jfk-button editModelProps"><span>Edit Properties</span></div><div class="jfk-button-standard jfk-button deleteModel"><span>Delete Model</span></div><div class="clear-open"></div></div><div class="fm-model"><div class="ico-model"></div><input type="text" value="'+model+ '" class="fm-filename"><div class="clear-open"></div> </div> <div class="clear-open"></div><div class="fm-model-content"><div class="clear-open"></div></div></div>';
	return temp;
}
function prefixUriTemplate(prefix, uri){
  tRow = '<tr><td><input type="text" value="'+prefix+'" class="fm-small"></td><td><input type="text" value="'+uri+'" class="fm-large"></td><td><a href="#" class="ico-del fmDeleteRow"></a></td></tr>';
  return tRow;
}

function loadTableArray(table, array){
  var len= array.length;
  table.find('tbody').html();

  for(var i=0; i<len; i++) {
    table.find('tbody').append( prefixUriTemplate(array[i]["@prefix"], array[i]["@uri"] ) );
  }
}
$(function(){
  $('#aspect-dialog').dialog({
    modal:true,
    width:400,
    autoOpen:false,
    height:'auto',
    draggable: false
  });

  $('#model-dialog').dialog({
    modal:true,
    width:500,
    position:['center', 30],
	autoOpen:false,
    height:'auto',
    draggable: false
  });

  $('.ui-dialog').draggable({ handle: "h2", cursor: "move" });

  $('.fm-close-dialog').click(function(){
    var dialogName = $(this).parents('.ui-dialog-content:eq(0)').attr("id");
    $('#' + dialogName).dialog("close");
    return false;
  });

  $('.fm-filename').livequery("focus", function(){
    $(this).addClass("input-active-focus");
  });
  $('.fm-filename').livequery("blur", function(){
    $(this).removeClass("input-active-focus");
  });

  $('.ico-aspect').live("click", function(){
    var aspectName = $(this).parents(".fm-aspect:eq(0)").attr("id").replace("aspect_", "");
    var jsonNode = $(this).parents(".fm-model-wrapper:eq(0)").attr("id").replace("json_", "");

    window.location = "/alfresco/wcs/form-builder/builder?jsonNode=" + jsonNode + "&aspect=" + aspectName;
  });

  $('.ico-model').live("click", function(){

    var wrapper = $(this).parents(".fm-model-wrapper:eq(0)");

    var modelName = $(this).parent().find('.fm-filename').val();
    if(wrapper.hasClass('open')){
      wrapper.removeClass('open');
      $(".fm-model-wrapper").show();
    }else{
       if(wrapper.attr("id") == ""){
         var url = "/alfresco/wcs/form-builder/get-json-model";

        $.get(url, { modelName: modelName }, function(response){
          var arr = response.split("~");
          var r = eval("("+arr[0]+")");

		  //Set options
		  $('.fm-aspect-prefix').html("");
		  $('.fm-aspect-prefix').append('<option value="">- Select -</option>');

		  for(x in r.namespaces){
			 $('.fm-aspect-prefix ').append('<option value="'+r.namespaces[x]["@prefix"]+'">'+r.namespaces[x]["@prefix"]+'</option>');
		  }
          wrapper.attr("id", "json_" + arr[1]);

          if(r.aspects){
            for (var i=0; i < r.aspects.length; i++) {
              var aspect = r.aspects[i];
              if(aspect){
                var aspectNode = aspectTemplate(aspect);
                wrapper.find('.fm-model-content').append(aspectNode);
              }
            }
          }
          $('.open').removeClass('open');
          wrapper.addClass('open');
          $(".fm-model-wrapper:not('.open')").hide();
        }, "html");
      }else{
        $('.open').removeClass('open');
        wrapper.addClass('open');
        $(".fm-model-wrapper:not('.open')").hide();
      }
    }
  });

  /* Model Properties/ Aspect properties DATA */
  $('.addAspect').live("mouseup", function(){
    $('#aspect-dialog').dialog("open");
  });

  //Delete Model
  $('.deleteModel').live("click", function(){
		var conf = confirm("Are you sure you want to delete this model?");
		if (conf){
			$('.infoMessage span').html("Please wait...");
    		$('.infoMessage').fadeIn(300);
    		$('.infoMessage').center();

			var filename = $('.open').find('.fm-filename').val().replace(".xml", "");
			$.ajax({
		        type: "POST",
		        url: "/alfresco/wcs/form-builder/model-create",
		        dataType:"json",
		        data:{
		          filename:filename, action: "destroy"
		        },
		        success:function(r){
					if(r.status == 0){
					$('.infoMessage span').html("There was a problem deleting that model, one or more aspects maybe in use.");
					   $('.infoMessage').addClass("bad").center();
					   setTimeout("$('.infoMessage').fadeOut(1000, function(){ $('.infoMessage').removeClass('bad'); });", 3000);
					}else{
						 $('.open').remove();
						 $(".fm-model-wrapper").show();
						 $('.infoMessage span').html("Success, model was deleted.");
					     $('.infoMessage').addClass("good").center();
					     setTimeout("$('.infoMessage').fadeOut(1000, function(){ $('.infoMessage').removeClass('good'); });", 1000);
					}
		        },
		        error:function (xhr, ajaxOptions, thrownError){
		            alert(xhr.status);
		            alert(thrownError);
		        }
		    });
		}
  });

  //Edit Details
  $('.editModelProps').live("click", function(){
 		$('#model-dialog').addClass('editMode');
		$('.multiRow').find('tbody').html("");

 		var url = "/alfresco/wcs/form-builder/get-json-model";
		var modelName = $('.open').find('.fm-filename').val();

        $.get(url, { modelName: modelName }, function(response){
          var arr = response.split("~");
          var r = eval("("+arr[0]+")");

 			$('.fm-model-name').val( r.name);
 			$('.fm-model-prefix').val( r.namespaces[0]['@prefix']);

			loadTableArray($('.fm-imports'), r.imports);
			loadTableArray($('.fm-namespaces'), r.namespaces);

        });

        $('#model-dialog').dialog("open");
  });

  $('.frmCreateModel').live("mouseup", function(){
  	resetCreateForm();
    $('#model-dialog').removeClass('editMode');

    //Preload defaults
    var defaultImport = [
      { "@uri" : "http://www.alfresco.org/model/dictionary/1.0",  "@prefix" : "d" },
      { "@uri" : "http://www.alfresco.org/model/content/1.0",  "@prefix" : "cm" }
    ];
    loadTableArray($('.fm-imports'), defaultImport);

    var defaultNamespaces = [
      { "@uri" : "",  "@prefix" : "" }
    ];
    loadTableArray($('.fm-namespaces'), defaultNamespaces);

    $('#model-dialog').dialog("open");
  });

  $('.fm-model-prefix').keyup( function(){
    $('.fm-namespaces').find('tbody tr:eq(0)').find('td:eq(0) input').val( $(this).val() );
    $('.fm-namespaces').find('tbody tr:eq(0)').find('td:eq(1) input').val( "" + $(this).val() + ".model" );
  });


  /* Model Event Actions */
  $('.fmCreateModel').live("mouseup", function(){

  		var valid = validateModelSubmission();
  		if(valid){
	  		var json = "";
	  		var jObj = {};

	  		jObj.name = $(".fm-model-name").val();
	  		jObj.author = $(".username").val();
	  		jObj.description = "Alfresco Form Builder Project";
	  		jObj.version = "1.0";

			jObj.imports = [];
			jObj.namespaces = [];
			if(!$('#model-dialog').hasClass('editMode')) jObj.aspects = [];

			$('.fm-imports tbody tr').each(function(){
				 var row = {};
				 row['@uri'] = $(this).find("input:eq(1)").val();
				 row['@prefix'] = $(this).find("input:eq(0)").val();

				 jObj.imports.push(row);
			});

			$('.fm-namespaces tbody tr').each(function(){
				 var row = {};
				 row['@uri'] = $(this).find("input:eq(1)").val();
				 row['@prefix'] = $(this).find("input:eq(0)").val();

				 jObj.namespaces.push(row);
			});

			json = JSON.stringify(jObj);

			var action = "create";
			var jsonid = "";
			var url = "/alfresco/wcs/form-builder/model-create";

			if($('#model-dialog').hasClass('editMode')){
				 action = "update";
				 url = "/alfresco/wcs/form-builder/model-update";
				 jsonid = $('.open').attr('id').replace("json_", "");
			}

			$('.infoMessage span').html("Please wait...");
    		$('.infoMessage').fadeIn(300);
    		$('.infoMessage').center();
	  		$.ajax({
	            type: "POST",
	            url: url,
	            dataType: "json",
	            data:{
	            	jsonid:jsonid, json:json, fliename: jObj.name, action: action
	            },
	            success:function(r){
					if(r.status == 0){


					}else{
						 location.reload(true);
					}
	            },
	            error:function (xhr, ajaxOptions, thrownError){
	                alert(xhr.status);
	                alert(thrownError);
	            }
	        });
		}
  });

  $('.fmCreateAspect').live("click", function(){

	var valid = validateInternalForm( $(".fmCreateAspectForm"));
	if(valid){
		var jsonid = $('.open').attr('id').replace("json_", "");
		var prefix = cleanString( $('.fm-aspect-prefix') );
		var aspect = cleanString( $('.fm-aspect-name') );

		$('#aspect-dialog').dialog("close");

		$('.infoMessage span').html("Creating Aspect...");
		$('.infoMessage').fadeIn(300);
		$('.infoMessage').center();

		$.ajax({
				type: "POST",
				url: "/alfresco/wcs/form-builder/model-update",
				dataType:"json",
				data:{
				  jsonid: jsonid, prefix:prefix, aspect:aspect, action : "add"
				},
				success:function(r){
					if(r.status == 1){
					  var aObj = {};
					  aObj.title = aspect;
					  aObj.name = aspect;

			  $('.open').find('.fm-model-content').append( aspectTemplate(aObj) );

			  $('.infoMessage span').html("Saved Successfully");
			  $('.infoMessage').addClass("good").center().fadeOut(1000, function(){
				$('.infoMessage').removeClass("good");
			  });

					}else{
					  $('.infoMessage span').html(r.msg);
					  $('.infoMessage').addClass("bad").center().fadeOut(3000, function(){
					  $('.infoMessage').removeClass("bad");
			  });
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
				}
			});
	}
  });

  $('.fmDeleteAspect').live("click", function(){
    var conf = confirm("Are you sure you want to delete this aspect?");
    if (conf){

      var jsonid = $('.open').attr('id').replace("json_", "");
      var node = $(this).parents('.fm-aspect:eq(0)');
      var aspect = node.attr("id").replace("aspect_", "");

      $('.infoMessage span').html("Deleting Aspect...");
      $('.infoMessage').fadeIn(300);
      $('.infoMessage').center();

      $.ajax({
          type: "POST",
          url: "/alfresco/wcs/form-builder/model-update",
          dataType:"json",
          data:{
            jsonid: jsonid, aspect:aspect, action : "delete"
          },
          success:function(r){
              if(r.status == 1){

        node.remove();

        $('.infoMessage span').html("Saved Successfully");
        $('.infoMessage').addClass("good").center().fadeOut(1000, function(){
          $('.infoMessage').removeClass("good");
        });

              }else{
                $('.infoMessage span').html(r.msg);
	            $('.infoMessage').addClass("bad").center().fadeOut(3000, function(){
	              $('.infoMessage').removeClass("bad");
	            });
              }
          },
          error:function (xhr, ajaxOptions, thrownError){
               $('.infoMessage span').html("There was a problem deleting that aspect, one or more nodes may be using it");
	           $('.infoMessage').addClass("bad").center();
			   setTimeout("$('.infoMessage').fadeOut(1000, function(){ $('.infoMessage').removeClass('bad'); });", 3000);

          }
      });
    }

  });

  $('.fmAddRow').live("click", function(){
    $(this).parents('.multiRow:eq(0)').find('tbody').append( prefixUriTemplate("", "") );
  });
   $('.fmDeleteRow').live("click", function(){
    $(this).parents('tr').remove();
  });

});

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", 200);
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}
$(function(){
	$('.jfk-button').mouseenter(function(){
	   $(this).addClass('jfk-button-hover');
	});
	$('.jfk-button').mouseleave(function(){
	   $(this).removeClass('jfk-button-hover');
	});
});

