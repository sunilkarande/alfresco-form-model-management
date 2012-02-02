/*  Alfresco Form Creator
    Copyright (c) 2011 Mike Priest (Abstractive)
	Licensed under the MIT license
	Version: 1.0.3 (28/11/2011 16:01:37)

	Plugin: jQuery.form

	TODO: Make fm-connect-container instancable for multi dynamic dropdowns
	TODO: Cleanup global data
	TODO: Smoothen out UI on load values, remove the "pop" injection look
	TODO: Add loading indicator for usability when populating dynamic dropdowns
	TODO: CROSS BROWSER COMPATABILITY - BOOOOo
	TODO: Move to latest jQuery so were not dependant on jquery.live plugin (Used for the IE onchange bug for elements added to the DOM after page load)
	TODO: Add SpacesStore settings

  	TESTED: Firefox
			Chrome
			Internet Explorer 8

	NEW PARAMETER: useShareProxy<BOOLEAN> : If set to true (default), all of the AJAX calls used will use the share proxy to call alfresco webscripts
	NEW PARAMETER: Allow customProperties<Object>: Allows us to override title and description properties of the display form. Works good for search titles, ive used it for a replication of the Document Details
	NEW: Dynamic dropdowns are auto detected and profiles connected to profiles are auto generated based upon users choice. i.e. If your aspect has a dynamic dropdown all the functionality for parcing and deploying the correct form is done automatically.
	NEW: Cached JSON Node Properties for load values
	NEW: Caching added for profile (storing JSON profile relative to dynamic dropdown) Moving towards instancable dynamic profiles
    NEW: Store and retrieval of Node Properties using FM API
    NEW: Callbacks added to load, save and profile completed states
    NEW: Added Connect parameter so we can choose where to inject the profile forms on dynamic dropdown change
    NEW: Allow ARRAY of nodes to save (Giving a ~ separated list will save all node properties to the given nodes)
    NEW: Optional save parameter moveId<Alfresco Space UID> allows us to move a document to a location after it has been saved
	NEW: Readonly option
	NEW: Option of using own dropdown changing event by making "handler" element available before load and setting your profile at init. This will create the trigger to look for your profile setup and create the form based upon the choice. (If you choose not to just load the aspect with a dynamic dropdown)
	NEW: Cached Profile API Call to JS, therefore less calls are being made to the backend when re-selecting dependant values.
	NEW: Added Aspect title to fm-profile-aspect wrapper ID - Quick JS points to show/hide certains aspects when needed
    NOTE: PLUGIN WILL USE SHARE PROXY METHOD UNLESS YOU STATE OTHERWISE BY SETTING "useShareProxy" : false

*/
/* PLUGIN ADDED selectToUISlider */  
;(function ($) {
    var globalKey = ""; var cacheProfileAspect= {};
	var originalAspectCollection = ""; isConnect = false; var isDebug = false;
	var defaultSettings = {
        'isBulk': true,
        'nodeId': null,
        'aspects': [],
        'profile': null,
        'handler': '.handler',
        'isSearch': false,
        'postUrl': '/share/proxy/alfresco/form-management/formdata/save',
        'onComplete': null,
        'useShareProxy': true,
        'onSaveComplete': null,
        'customProperites': null,
        'connect': "",
        'readonly': false,
        'ownDropSource': false
    };
    var methods = {
        init: function (options) {
            return this.each(function () {
                 
				var $this = $(this);
                data = $this.data('form');
				
				// If the plugin hasn't been initialized yet (make sure we are not going through init after form already created				 	
				if($this.hasClass("fm-init-load")){ 
					  
				} else { 
					$this.data('test', {});
					$this.addClass("fm-init-load");
					 
					//Add defaultSettings to local variable so where not changing the global setting
					var mergedSettings = defaultSettings;
					if (options) {
						//Merge Plugin Options with Local Default settings
						$.extend( mergedSettings, options);
					}	
					 
					/* -----------
					PROBLEM HERE???????????????? KILLING PREVIOUS PLUGIN INIT WITH NEW VALUES TOO :S
					----------------*/
					$this.data('settings', { "postUrl": options.postUrl } );
					 
					//THIS WORKS 
					$this.data('test', JSON.stringify( mergedSettings)  );
					  
					//FIRST PLUGIN IS OVERWRITTEN WITH THE SETTINGS OF THE SECOND PLUGIN
					 
					if($('.fm-rm-form').data('settings')){
						var testA = eval("(" + $('.fm-rm-form').data('test')   + ")");
						//PRINT SETTINGS MERGED (NO EVAL)
						$('body').append('RM Type: ' + $('.fm-rm-form').data('settings').postUrl + " <br>")
								 //WITH EVAL
								 .append(testA.postUrl + "<hr>");
					}
					if($('.fm-doctypes').data('settings')){
						var testB = eval("(" + $('.fm-doctypes').data('test')   + ")");
						//PRINT SETTINGS MERGED (NO EVAL)
						$('body').append('Doc Type: ' + $('.fm-doctypes').data('settings').postUrl + " <br>")
								 //WITH EVAL
								 .append(testB.postUrl + "<hr>");
					}
				}
			});
        },
        destroy: function () {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data('form');
                // Namespacing FTW
                $(window).unbind('.form');
                data.form.remove();
				$this.removeData('settings');
                $this.removeData('form');
            })
        }
    };
    $.fn.form = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            if(isDebug) console.log('Method ' + method + ' does not exist on jQuery.form');
        }
    };
})(jQuery);