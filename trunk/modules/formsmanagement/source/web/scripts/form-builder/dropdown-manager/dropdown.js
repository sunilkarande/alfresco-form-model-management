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

function rowTemplate(key, val) {
    var tmp = '<li class=""><span class="fld-lbl"><input type="text" value="' + val + '"></span><span class="fld-val"><input type="text" value="' + key + '"></span><a class="ico-del delRow" href="#">&nbsp;</a></li>'
    return tmp;
}

function buildDropdownExample(){
	$('.fm-dd-demo').html('');

	$('.fld-manager li').each(function () {
        var val = $(this).find('.fld-lbl input').val();
        var key = $(this).find('.fld-val input').val();

		$('.fm-dd-demo').append('<option value="'+key+'">'+val+'</option>');
    });
}
function createFile(filename){
	$('.infoMessage span').html("Please wait...");
	$('.infoMessage').fadeIn(300);
	$('.infoMessage').center();
	$('.warningBox').hide();

	var url = "/alfresco/wcs/utils/create-file";
	var postFilename = filename.replace(".json", "") + ".json";

    $.getJSON(url, {
        path : "constraints",
        filename: postFilename,
        content: "[]"
    }, function (r) {

		if(r.status == 0){
			$('.infoMessage').hide();
			$('.warningBox').show();

		}else{
			var fileTemp = '<li><a class="ico-del delFile" href="#">&nbsp;</a><a class="docList" href="/alfresco/d/d/workspace/SpacesStore/'+r.msg+'/'+postFilename+'" id="'+r.msg+'"><span>'+filename+'</span></a><p class="clear"></p></li>';
			$('.fm-sidebar ul').append(fileTemp);
			$("#dd-dialog").dialog("close");

			$('.infoMessage span').html("A new list was created!");
          	$('.infoMessage').addClass("good").center().fadeOut(1000, function(){
            	$('.infoMessage').removeClass("good");
          	});
		}
    });

}
function deleteFile(node){
	var conf = confirm("Are you sure you want to remove this list? Any profiles associated with the list will also be removed.");
	if(conf){
		var uid = node.find('.docList:eq(0)').attr('id');
		var url = "/alfresco/wcs/utils/delete-file";

	    $.get(url, {
	       uid: uid
	    }, function (r) {
			if(r.status == 0){
				$('.infoMessage span').html(r.msg);
	          	$('.infoMessage').addClass("bad").center().fadeOut(5000, function(){
	            	$('.infoMessage').removeClass("bad");
	          	});
			}
	    });
	    node.remove();
    }
}

function saveList() {
    var uid = $('.file-uid').val();
    var url = "/alfresco/wcs/constraint/update-list";
    var jString = "[";
    $('.fld-manager li').each(function () {
        var label = $(this).find('.fld-lbl input').val();
        var key = $(this).find('.fld-val input').val();
        if (key != "") {
            jString += '{ "key" : "'+key+'", "label":"'+label+'"},';
        }
    });
    jString = jString.slice(0, -1);
    jString += "]";

    $('.infoMessage span').html("Please wait...");
	$('.infoMessage').fadeIn(300);
	$('.infoMessage').center();

    $.post(url, {
        uid: $('.doc-list-active').attr("id"),
        json: jString
    }, function (r) {
		if(r.status == 0){
			$('.infoMessage span').html(r.msg);
          	$('.infoMessage').addClass("bad").center().fadeOut(5000, function(){
            	$('.infoMessage').removeClass("bad");
          	});

		}else{
			$('.infoMessage span').html("Saved Successfully");
          	$('.infoMessage').addClass("good").center().fadeOut(1000, function(){
            	$('.infoMessage').removeClass("good");
          	});
		}
    });
}
$(function () { /* Setup */
    $('#dd-dialog').dialog({
        modal: true,
        width: 400,
        autoOpen: false,
        height: 'auto',
        draggable: false
    });

    $('.addRow').live("click", function () {
        var row = rowTemplate("", "");
        $('.fld-manager').append(row);
        $('.fld-manager .last').removeClass('last');
        $('.fld-manager li:last').addClass('last');
    });

    $('ul.fld-manager').sortable({
        update: function (event, ui) {
            $('.fld-manager .last').removeClass('last');
            $('.fld-manager li:last').addClass('last');
            buildDropdownExample();
        }
    });

    $('.delRow').live("click", function () {
        $(this).parents('li').remove();
        $('.fld-manager .last').removeClass('last');
        $('.fld-manager li:last').addClass('last');
    });

    /* Events */
    $('.fmDdSave').mouseup(function () {
         saveList();
    });

    $('.fmDdCreate').mouseup(function () {
        var valid = validateInternalForm( $(".fmCreateDropdownForm"));
		if(valid) createFile( $('.fm-dd-filename').val() );
    });
    $('.delFile').live("mouseup", function () {
         deleteFile( $(this).parents('li:eq(0)') );
    });

    $('.fld-lbl input, .fld-val input').live("keyup", function () {
    	buildDropdownExample();
	});

    $('.fm-close-dialog').click(function () {
        var dialogName = $(this).parents('.ui-dialog-content:eq(0)').attr("id");
        $('#' + dialogName).dialog("close");
        return false;
    });

    $('.frmCreateModel').click(function () {
        $('#dd-dialog').dialog("open");
    });

    $('.docList').live("click", function () {
        $('.fm-aspect-manager').html("");
        $('.fld-manager').html("");
        $('.doc-list-active').removeClass('doc-list-active').removeClass('fm-menu-active');

        $(this).addClass('doc-list-active').addClass("fm-menu-active");

		$('.fm-dialog-body h2:eq(0)').html("Managing Dropdown: <span>" + $(this).find('span').html() + "</span>");
		var cache = new Date().getTime();
        var url = $(this).attr("href") + "?c=" + cache ;
		$('.fileLink').attr("href", url);

        $.getJSON(url, {}, function (r) {
            var len = r.length;

            $('.fm-dd-manager').show();
            $('.fm-info').hide();

			var len = r.length;

			for(var i=0; i<len; i++) {
				var a = r[i];
			  	$('.fld-manager').append( rowTemplate(a.key, a.label) );
			}

			buildDropdownExample();

        });
        return false;
    });
});


jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", 200);
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}
$(function () {
    $('.jfk-button').mouseenter(function () {
        $(this).addClass('jfk-button-hover');
    });
    $('.jfk-button').mouseleave(function () {
        $(this).removeClass('jfk-button-hover');
    });
});