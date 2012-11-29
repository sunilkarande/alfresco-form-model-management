(function(){var Dom=YAHOO.util.Dom,Event=YAHOO.util.Event,Selector=YAHOO.util.Selector;var $html=Alfresco.util.encodeHTML,$siteURL=Alfresco.util.siteURL;Alfresco.component.Header=function(htmlId){return Alfresco.component.Header.superclass.constructor.call(this,"Alfresco.component.Header",htmlId,["button","menu","container"]);};YAHOO.extend(Alfresco.component.Header,Alfresco.component.Base,{options:{siteId:"",siteTitle:"",minSearchTermLength:1,tokens:{}},appItems:null,userItems:null,defaultSearchText:null,statusUpdateTime:null,onReady:function Header_onReady(){Dom.removeClass(this.id+"-appItems","hidden");this.replaceUriTokens();this.configureSearch();this.configureMyStatus();},setAppItems:function Header_setAppItems(items){this.appItems=items;},setUserItems:function Header_setUserItems(items){this.userItems=items;},showAboutShare:function Header_showAboutShare(){Alfresco.module.getAboutShareInstance().show();},replaceUriTokens:function Header_replaceUriTokens(){var tokens=YAHOO.lang.merge(Alfresco.constants.URI_TEMPLATES,Alfresco.constants.HELP_PAGES,this.options.tokens),links=Selector.query("a",this.id),link,attr;for(var i=0,ii=links.length;i<ii;i++){link=links[i];attr=Dom.getAttribute(link,"templateUri");if(attr!=null){link.href=Alfresco.util.renderUriTemplate(attr,tokens);}}},configureSearch:function Header_configureSearch(){this.widgets.searchBox=Dom.get(this.id+"-searchText");this.defaultSearchText=this.msg("header.search.default");Event.addListener(this.widgets.searchBox,"focus",this.onSearchFocus,null,this);Event.addListener(this.widgets.searchBox,"blur",this.onSearchBlur,null,this);this.setDefaultSearchText();var me=this;this.widgets.searchEnterListener=new YAHOO.util.KeyListener(this.widgets.searchBox,{keys:YAHOO.util.KeyListener.KEY.ENTER},{fn:me.submitSearch,scope:this,correctScope:true},"keydown").enable();this.widgets.searchMore=new YAHOO.widget.Button(this.id+"-search_more",{type:"menu",menu:this.id+"-searchmenu_more"});},onSearchFocus:function Header_onSearchFocus(){if(this.widgets.searchBox.value==this.defaultSearchText){Dom.removeClass(this.widgets.searchBox,"faded");this.widgets.searchBox.value="";}else{this.widgets.searchBox.select();}},onSearchBlur:function Header_onSearchBlur(){var searchText=YAHOO.lang.trim(this.widgets.searchBox.value);if(searchText.length===0){YAHOO.lang.later(100,this,this.setDefaultSearchText,[]);}},setDefaultSearchText:function Header_setDefaultSearchText(){Dom.addClass(this.widgets.searchBox,"faded");this.widgets.searchBox.value=this.defaultSearchText;},getSearchText:function Header_getSearchText(){return YAHOO.lang.trim(this.widgets.searchBox.value);},submitSearch:function Header_submitSearch(){var searchText=this.getSearchText();if(searchText.replace(/\*/g,"").length<this.options.minSearchTermLength){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.minimum-length",this.options.minSearchTermLength)});}else{var url="fmSearch?t="+encodeURIComponent(searchText);if(window.location.pathname.match("/repository$")=="/repository"||(window.location.pathname.match("/fmSearch$")=="/fmSearch"&&window.location.search.indexOf("r=true")!=-1)){url+="&r=true";}window.location=$siteURL(url);}},_currentStatus:"",_clickedStatusOnce:false,configureMyStatus:function Header_configureMyStatus(){this.widgets.statusBox=Dom.get(this.id+"-statusText");this.widgets.statusTime=Dom.get(this.id+"-statusTime");this._currentStatus=this.widgets.statusBox.value;this.widgets.userMenu=Dom.get(this.id+"-user_user");Event.addListener(this.widgets.userMenu,"click",function(){this.widgets.statusBox.value=this._currentStatus;},null,this);var statusISOTime=this.widgets.statusTime.attributes.title.value;if(statusISOTime!==""){this.statusUpdateTime=Alfresco.util.fromISO8601(statusISOTime);}this.setStatusRelativeTime();Alfresco.util.bind(function Header_configureMyStatus_fnDisableUserMenu(){var allItems=this.userItems.concat(this.appItems),item;for(var i=0,ii=allItems.length;i<ii;i++){item=allItems[i];if(item instanceof YAHOO.widget.Button&&YAHOO.lang.isFunction(item.getMenu)&&item.getMenu()!==null){var menuItems=item.getMenu().getItems(),menuItem;for(var j=0,jj=menuItems.length;j<jj;j++){menuItem=menuItems[j];if(Dom.hasClass(menuItem.element,"HEADER-MARKER")){menuItem.cfg.setProperty("disabled",true);return;}}}}},this)();Event.on(this.widgets.statusBox,"click",function(p_oEvent){Event.stopEvent(p_oEvent);});var _this=this;YAHOO.util.Event.addListener(this.id+"-statusText","click",function(e){if(_this._clickedStatusOnce){}else{_this._clickedStatusOnce=true;Dom.get(_this.id+"-statusText").value="";}});YAHOO.util.Event.addListener(this.id+"-statusText","blur",function(e){var textBox=Dom.get(_this.id+"-statusText");if(textBox.value.length==0){textBox.value=_this._currentStatus;}_this._clickedStatusOnce=false;});this.widgets.submitStatus=new YAHOO.widget.Button(this.id+"-submitStatus");this.widgets.submitStatus.on("click",this.submitStatus,this.widgets.submitStatus,this);},getStatusText:function Header_getStatusText(){return YAHOO.lang.trim(this.widgets.statusBox.value);},setStatusRelativeTime:function Header_setStatusRelativeTime(){var relativeTime=(this.statusUpdateTime===null)?this.msg("status.never-updated"):Alfresco.util.relativeTime(this.statusUpdateTime);this.widgets.statusTime.innerHTML=this.msg("status.updated",relativeTime);},submitStatus:function Header_submitStatus(){this._clickedStatusOnce=false;Alfresco.util.Ajax.jsonPost({url:Alfresco.constants.URL_SERVICECONTEXT+"/components/profile/userstatus",dataObj:{status:this.getStatusText()},successCallback:{fn:this.onStatusUpdated,scope:this},failureMessage:this.msg("message.status.failure")});},onStatusUpdated:function Header_onStatusUpdated(response){this.statusUpdateTime=Alfresco.util.fromISO8601(response.json.userStatusTime.iso8601);this.setStatusRelativeTime();this._currentStatus=this.getStatusText();Alfresco.util.PopupManager.displayMessage({text:this.msg("message.status.success")});}});})();