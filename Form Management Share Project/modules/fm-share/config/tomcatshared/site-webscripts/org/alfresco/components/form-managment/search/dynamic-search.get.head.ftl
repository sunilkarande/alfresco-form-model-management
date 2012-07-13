<link rel="stylesheet" type="text/css" href="/share/css/form-management/search/search.css" />
<script type="text/javascript">
	var defaultLbl ="Search";
</script>
<script type="text/javascript" src="/share/js/form-management/common/js-utils.js"></script>
<script type="text/javascript" src="/share/js/form-management/search/jquery.paginate.js"></script>
<script type="text/javascript" src="/share/js/form-management/search/search.js"></script>

<script type="text/javascript">
	var alf_ticket = "";
	$(function()
	{
		$('.fm-profile').form({
			'customFormStyle': 'left',
			'aspects': advsearchAspects,
			'isSearch': true,
			'postUrl' : "/share/service/components/form-management/ajax/save",

			'onComplete': function(){
				 injectAlfrescoDefaults();
			}
		});
	});
</script>
