var Backend;function GetBackend(){$.ajax({url:"backend.jsp",dataType:"json",cache:false,async:false,success:function(a){$.each(a,function(b,a){Backend=a})}})}function SubGetBackend(){$.ajax({url:"../backend.jsp",dataType:"json",cache:false,async:false,success:function(a){$.each(a,function(b,a){Backend=a})}})}function Loader(){$("#TopMenu").append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">')}function SubLoader(){$("#TopMenu").append('<img id="AjaxLoader" src="../layout/images/ajax-loader.gif">')}function Base(){$("#back-div").append("<a class='back-a' href='./'><img class='back-img' src='layout/images/white/back.png' title='Zur&uuml;ck'/></a>")}function SubBase(){$("#back-div").append("<a class='back-a' onclick=\"history.back ();\"><img class='back-img' src='../layout/images/white/back.png' title='Zur&uuml;ck'/></a>")}function urlParam(b){var a=(new RegExp("[\\?&amp;]"+b+"=([^&amp;#]*)")).exec(window.location.href);return typeof a!=="undefined"&&a!=null?a[1]:0}function urlPara(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var c="[\\?&]"+a+"=([^&#]*)",d=new RegExp(c),b=d.exec(window.location.href);return b==null?"":b[1]}function ChangeTitle(){document.title=$.base64.decode(urlPara("c"))+"@"+$.base64.decode(urlPara("h"))+" - kVASy"+decodeURI("%C2%AE")+" System Control"}function KeyFunctionSidebar(a){var b=$.base64.encode(a);$.Shortcuts.add({type:"down",mask:"b",handler:function(){if($("#SidebarBottom").is(":hidden")){$("#SidebarBottomSmall").animate({marginBottom:"870px"},350).css("zIndex",25);$("#SidebarBottom").animate({height:"toggle"},350,function(){$("#SidebarBottomContent").fadeIn(100)}).css("zIndex",25)}else{$("#SidebarBottomContent").fadeOut(100);$("#SidebarBottom").animate({height:"toggle"},350).css("zIndex",10);$("#SidebarBottomSmall").animate({marginBottom:"0px"},350).css("zIndex",10)}}}).start()}function KlickFunctionSidebar(b){var a=$.base64.encode(b);$("#SidebarSmall").click(function(){if($("#Sidebar").is(":hidden")){$("#SidebarSmall").animate({marginRight:"400px"},350).css("zIndex",30);$("#Sidebar").animate({width:"toggle"},350,function(){$("#SidebarContent").fadeIn(100)}).css("zIndex",30);SearchHosts(a+"Jhdu8K")}else{$("#SidebarContent").fadeOut(100);$("#Sidebar").animate({width:"toggle"},350).css("zIndex",30);$("#SidebarSmall").animate({marginRight:"0px"},350).css("zIndex",30)}});$("#SidebarBottomSmall").dblclick(function(){if($("#SidebarBottom").is(":hidden")){$("#SidebarBottomSmall").animate({marginBottom:"870px"},350).css("zIndex",25);$("#SidebarBottom").animate({height:"toggle"},350,function(){$("#SidebarBottomContent").fadeIn(100)}).css("zIndex",25)}else{$("#SidebarBottomContent").fadeOut(100);$("#SidebarBottom").animate({height:"toggle"},350).css("zIndex",10);$("#SidebarBottomSmall").animate({marginBottom:"0px"},350).css("zIndex",10)}})}function StyleSidebar(b){var a=$.base64.encode(b);$("#SidebarSearch").append('<div id="Title">Suchen</div><div id="SubTitle">Nichts ausgew&auml;hlt!</div><form id="SearchForm" method="GET"><input id="SearchInput" name="searchstring" type="text" onclick="DeleteVal();"><img onclick="FormSubmit();" id="SearchImgInput" src="layout/images/search.png" /></form>');$("#SidebarSearchFilter").append('<div class="DivSearchFilter" id="SFHost" onclick="SearchHosts(\''+a+'Ljd84K\');"><img id="SearchImg" src="layout/images/server.png"><span>Hosts</span></div>');$("#SidebarSearchFilter").append('<div class="DivSearchFilter" id="SFService" onclick="SearchServices(\''+a+'Ljd84K\');"><img id="SearchImg" src="layout/images/services.png"><span>Services</span></div>');$("#SidebarSearchFilter").append('<div class="DivSearchFilter" id="SFDatabase" onclick="SearchDatabases(\''+a+'Ljd84K\');"><img id="SearchImg" src="layout/images/database.png"><span>Datenbanken</span></div>')}function SubStyleSidebar(b){var a=$.base64.encode(b);$("#SidebarSearch").append('<div id="Title">Suchen</div><div id="SubTitle">Nichts ausgew&auml;hlt!</div><form id="SearchForm" method="GET"><input id="SearchInput" name="searchstring" type="text" onclick="DeleteVal();"><img onclick="FormSubmit();" id="SearchImgInput" src="../layout/images/search.png" /></form>');$("#SidebarSearchFilter").append('<div class="DivSearchFilter" id="SFHost" onclick="SearchHosts(\''+a+'Ljd84K\');"><img id="SearchImg" src="../layout/images/server.png"><span>Hosts</span></div>');$("#SidebarSearchFilter").append('<div class="DivSearchFilter" id="SFService" onclick="SearchServices(\''+a+'Ljd84K\');"><img id="SearchImg" src="../layout/images/services.png"><span>Services</span></div>');$("#SidebarSearchFilter").append('<div class="DivSearchFilter" id="SFDatabase" onclick="SearchDatabases(\''+a+'Ljd84K\');"><img id="SearchImg" src="../layout/images/database.png"><span>Datenbanken</span></div>')}function DeleteVal(){$("input#SearchInput").val("")}function FormSubmit(){$("form#SearchForm").submit()}function SearchHosts(a){$("form#SearchForm").attr("action","hosts.jsp");$("#SubTitle").html(".. nach Hosts");$("input#SearchInput").val("Hostname");$("#SFService").removeClass("BgBlue");$("#SFHost").addClass("BgBlue");$("#SFDatabase").removeClass("BgBlue");$("#SFHostgroup").removeClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,b){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdEhvc3RzHj86Hz&u="+a,dataType:"json",cache:false,data:{searchstring:c.term},success:function(a){b($.map(a.hosts,function(a){return{label:a.NAME+" ("+a.CUST_VAL+") auf "+a.NODE,value:a.NAME}}))}})},minLength:1})}function SearchServices(a){$("form#SearchForm").attr("action","services.jsp");$("#SubTitle").html(".. nach Services");$("input#SearchInput").val("Servicename");$("#SFHost").removeClass("BgBlue");$("#SFService").addClass("BgBlue");$("#SFHostgroup").removeClass("BgBlue");$("#SFDatabase").removeClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,b){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdFNlcnZpY2VzHj86Hz&u="+a,dataType:"json",cache:false,data:{searchstring:c.term},success:function(a){b($.map(a.services,function(a){return{label:a.HOST+" ("+a.NODE+") - "+a.NAME,value:a.NAME}}))}})},minLength:1})}function SearchDatabases(a){$("form#SearchForm").attr("action","db.jsp");$("#SubTitle").html(".. nach Datenbanken");$("input#SearchInput").val("SID");$("#SFHost").removeClass("BgBlue");$("#SFService").removeClass("BgBlue");$("#SFHostgroup").removeClass("BgBlue");$("#SFDatabase").addClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,b){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdERhdGFiYXNlcw==Hj86Hz&u="+a,dataType:"json",cache:false,data:{searchstring:c.term},success:function(a){b($.map(a.databases,function(a){return{label:a.HOST+" ("+a.NODE+") - "+a.NAME,value:a.NAME}}))}})},minLength:1})}function SearchHostgroups(a){$("form#SearchForm").attr("action","services4.jsp");$("#SubTitle").html(".. nach Hostgruppen");$("input#SearchInput").val("Name");$("#SFHost").removeClass("BgBlue");$("#SFService").removeClass("BgBlue");$("#SFDatabase").removeClass("BgBlue");$("#SFHostgroup").addClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,b){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdEhvc3Rncm91cHM=Hj86Hz&u="+a,dataType:"json",cache:false,data:{searchstring:c.term},success:function(a){b($.map(a.databases,function(a){return{label:a.HOST+" ("+a.NODE+") - "+a.NAME,value:a.NAME}}))}})},minLength:1})}function SearchServicesSearch(b,a){$("form#SearchForm").attr("action","services.jsp");$("#SubTitle").html(".. nach Services");$("input#SearchInput").val(a);$("#SFHost").removeClass("BgBlue");$("#SFService").addClass("BgBlue");$("#SFHostgroup").removeClass("BgBlue");$("#SFDatabase").removeClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,a){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdFNlcnZpY2VzHj86Hz&u="+b,dataType:"json",cache:false,data:{searchstring:c.term},success:function(b){a($.map(b.services,function(a){return{label:a.HOST+" ("+a.NODE+") - "+a.NAME,value:a.NAME}}))}})},minLength:1})}function SearchHostsSearch(b,a){$("form#SearchForm").attr("action","hosts.jsp");$("#SubTitle").html(".. nach Hosts");$("input#SearchInput").val(a);$("#SFService").removeClass("BgBlue");$("#SFHost").addClass("BgBlue");$("#SFDatabase").removeClass("BgBlue");$("#SFHostgroup").removeClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,a){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdEhvc3RzHj86Hz&u="+b,dataType:"json",cache:false,data:{searchstring:c.term},success:function(b){a($.map(b.hosts,function(a){return{label:a.NAME+" ("+a.CUST_VAL+") auf "+a.NODE,value:a.NAME}}))}})},minLength:1})}function SearchDatabasesSearch(b,a){$("form#SearchForm").attr("action","db.jsp");$("#SubTitle").html(".. nach Datenbanken");$("input#SearchInput").val(a);$("#SFHost").removeClass("BgBlue");$("#SFService").removeClass("BgBlue");$("#SFHostgroup").removeClass("BgBlue");$("#SFDatabase").addClass("BgBlue");$("#SearchInput").autocomplete({source:function(c,a){$.ajax({url:"http://"+Backend+"/proxy/json/?e=1&m=TGlzdERhdGFiYXNlcw==Hj86Hz&u="+b,dataType:"json",cache:false,data:{searchstring:c.term},success:function(b){a($.map(b.databases,function(a){return{label:a.HOST+" ("+a.NODE+") - "+a.NAME,value:a.NAME}}))}})},minLength:1})}function Configuration(b){var a=$.base64.encode(b);$("#Configuration").append('<div id="ConfigurationDialog" title="Einstellungen">\n        <div id="ConfigurationTabs">\n            <ul>\n                <li><a href="#ConfigurationTabs1">Web-Konfiguration</a></li>\n                <!--li><a href="#ConfigurationTabs2">Proxy-Konfiguration</a></li>\n                <li><a href="#ConfigurationTabs3">Core-Konfiguration</a></li>\n                <li><a href="#ConfigurationTabs4">System-Information</a></li-->\n            </ul>\n            <div id="ConfigurationTabs1">\n                <div id="ConfigurationSection">\n                    <div id="ConfigurationSectionTitle">Dashboard</div>\n                    <button id="1" class="ConfigurationSectionPoint" onclick="LoadBasic(\''+a+'Ljd84K\');">Setze Basis Einstellungen</button>\n                    <button id="2" class="ConfigurationSectionPoint" onclick="DeleteBasic(\''+a+'Ljd84K\');">Zur&uuml;cksetzen auf Standard</button>\n                </div>\n                <div id="ConfigurationSection">\n                    <div id="ConfigurationSectionTitle">Einstellungen</div>\n                    <div class="Config"></div>\n                </div>\n                <div id="ConfigurationSection">\n                    <div id="ConfigurationSectionTitle">Reset</div>\n                    <button id="3" class="ConfigurationSectionPoint" onclick="DeleteBasicConfig(\''+a+'Ljd84K\');">Alle Einstellungen zur&uuml;cksetzen</button>\n                </div>\n            </div>\n            <!--div id="ConfigurationTabs2">\n                <p></p>\n            </div>\n            <div id="ConfigurationTabs3">\n                <p></p>\n            </div>\n            <div id="ConfigurationTabs4">\n                <div id="ConfigurationSection">\n                    <div id="ConfigurationSectionTitle">Modulversionen</div>\n                    <div id="Modulversionen"></div>\n                    <div id="ConfigurationSectionTitle">Komponenten Status</div>\n                    <div id="Components"></div>\n                </div>\n            </div-->\n       </div>\n   </div>');$("#ConfigurationTabs").tabs();$("#1").button();$("#2").button();$("#3").button();$("#ConfigurationDialog").dialog({autoOpen:true,height:600,width:800,draggable:false,resizable:false,modal:true,open:function(){$.ajax({url:"http://"+Backend+"/?mv=g",crossDomain:true,success:function(a){$("#Modulversionen").append('<table id="TableModulversionen" cellpadding=0 cellspacing=5 border=0></table>');$.each(a,function(b,a){$("table","#Modulversionen").append("<tr><td>"+b+"</td><td> >> </td><td>"+a+"</td></tr>")})},dataType:"json",cache:false});$.ajax({url:"http://"+Backend+"/chkcmp/json/?e=1&m=Q2hlY2tQcm9jZXNzLk76Zh",crossDomain:true,success:function(a){$.each(a,function(a,b){if(a=="ICINGA"){$("#Components").append('<table id="TableIcinga" cellpadding=0 cellspacing=5 border=0><tr><td colspan=2>'+a+" Backend</td></tr></table>");$.each(b,function(c,a){var b;if(a.PORT_ON==1)b="offen";else b="geschlossen";$("table#TableIcinga").append("<tr><td>"+a.NAME+" ("+a.IP+"):</td><td>Aktive ICINGA Prozesse: "+a.ICINGA_PRC+", Aktive XINETD Prozesse: "+a.XINETD_PRC+", Port: "+a.PORT_NO+" ist "+b+".</td></tr>")})}else{$("#Components").append('<table id="TablePostgre" cellpadding=0 cellspacing=5 border=0><tr><td colspan=2>'+a+" Backend</td></tr></table>");$.each(b,function(c,a){var b;if(a.PORT_ON==1)b="offen";else b="geschlossen";$("table#TablePostgre").append("<tr><td>"+a.NAME+" ("+a.IP+"):</td><td>Aktive Prozesse: "+a.POSTGRE_PRC+", Port: "+a.PORT_NO+" ist "+b+".</td></tr>")})}})},dataType:"json",cache:false});$.ajax({url:"http://"+Backend+"/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u="+a+"KjHu8s&m2=Q29uZmlnJq0OpP",crossDomain:true,success:function(b){$("div.Config").append('<table id="TableConfig" cellpadding=0 cellspacing=5 border=0></table>');$.each(b,function(c,b){if(b.ACTION==0)$("table#TableConfig").append("<tr><td>"+b.DESC+'</td><td></td><td><div id="radio'+b.KEY+'" class="RadioBorder"><input type="radio" id="radio1'+b.KEY+'" name="radio'+b.KEY+'" onclick="AddConfig(\''+a+"Ljd84K','Config','"+b.KEY+"','1','"+b.DESC+"','');\" /><label for=\"radio1"+b.KEY+'">ON</label><input type="radio" id="radio2'+b.KEY+'" name="radio'+b.KEY+'" checked="checked" onclick="AddConfig(\''+a+"Ljd84K','Config','"+b.KEY+"','0','"+b.DESC+"','');\" /><label for=\"radio2"+b.KEY+'">OFF</label></div></td></tr>');else $("table#TableConfig").append("<tr><td>"+b.DESC+'</td><td></td><td><div id="radio'+b.KEY+'" class="RadioBorder"><input type="radio" id="radio1'+b.KEY+'" name="radio'+b.KEY+'" onclick="AddConfig(\''+a+"Ljd84K','Config','"+b.KEY+"','1','"+b.DESC+'\',\'\');" checked="checked" /><label for="radio1'+b.KEY+'">ON</label><input type="radio" id="radio2'+b.KEY+'" name="radio'+b.KEY+'" onclick="AddConfig(\''+a+"Ljd84K','Config','"+b.KEY+"','0','"+b.DESC+"','');\" /><label for=\"radio2"+b.KEY+'">OFF</label></div></td></tr>');$("#radio"+b.KEY).buttonset()})},dataType:"json",cache:false})},buttons:{BEENDEN:function(){$(this).dialog("close");$("#ConfigurationDialog").remove();location.reload()}}})}function AddLink(){$("#AddLink").append('<div id="AddLinkDialog" title="F&uuml;ge weiteren Men&uuml;punkt hinzu!"><p><span class="ui-icon ui-icon-circle-close" style="float: left; margin: 0 7px 50px 0;"></span>Basic:</p>');$("#AddLinkDialog").dialog({autoOpen:true,height:300,width:600,draggable:false,resizable:false,modal:true,buttons:{OK:function(){$(this).dialog("close");$("#AddLinkDialog").remove()},ABBRECHEN:function(){$(this).dialog("close");$("#AddLinkDialog").remove()}}})}function LoadBasic(a){$.ajax({url:"http://"+Backend+"/repo/json/?e=1&m=SW5zZXJ0RGFzaGJvYXJkQWxsKd8Hfg&u="+a+"",crossDomain:true,success:DialogSuccess("#1","Die Basiseinstellungen f\u00fcr das Dashboard wurden erfolgreich gesetzt."),dataType:"json",cache:false})}function DialogSuccess(b,a){$(b).append('<div id="SuccessDialog" title="Aktion Erfolgreich durchgef&uuml;hrt."><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;"></span>'+a+"</p></div>");$("#SuccessDialog").dialog({autoOpen:true,height:200,width:600,draggable:false,resizable:false,modal:false,buttons:{OK:function(){$(this).dialog("close");$("#SuccessDialog").remove()}}})}function DashboardLinks(b){var a=$.base64.encode(b);$.ajax({url:"http://"+Backend+"/repo/json/?e=1&m=U2VsZWN0RGFzaGJvYXJkQWxsUhdjK8&u="+a+"LKHld3",crossDomain:true,success:function(a){$.each(a,function(){$("#DashboardLinks").append('<a href="'+this.TARGET+'" class="twitter"><span>'+this.TITLE+'</span><br></br><span class="sub-grid">'+this.DESC+"</span></a>")});$("#AjaxLoader").remove()},dataType:"json",cache:false})}function DeleteBasic(a){$.ajax({url:"http://"+Backend+"/repo/json/?e=1&m=RGVsZXRlRGFzaGJvYXJkQWxsJkl8Hd&u="+a+"",crossDomain:true,success:DialogSuccess("#2","Die Standardeinstellungen f\u00fcr das Dashboard wurden erfolgreich gesetzt."),dataType:"json",cache:false})}function DeleteBasicConfig(a){$.ajax({url:"http://"+Backend+"/repo/json/?e=1&m=RGVsZXRlUmVwb0FsbA==Jhdu8d&u="+a+"",crossDomain:true,success:DialogSuccess("#3","Alle Einstellungen wurden erfolgreich zur&uuml;ckgesetzt!"),dataType:"json",cache:false})}function AddConfig(k,j,i,f,g,h){var e=$.base64.encode(j),d=$.base64.encode(i),a=$.base64.encode(f),b=$.base64.encode(g),c=$.base64.encode(h);$.ajax({url:"http://"+Backend+"/repo/json/?e=1&m=SW5zZXJ0VXBkYXRlQ29uZmlnHkl8Ui&u="+k+"&m2="+e+"Jkl8Hd&k="+d+"Jkl8Hd&v1="+a+"Jkl8Hd&v2="+b+"Jkl8Hd&v3="+c+"Jkl8Hd",crossDomain:true,success:DialogSuccess(".Config","Konfiguration wurde ge&auml;ndert."),dataType:"json",cache:false})}function sleep(b){for(var c=(new Date).getTime(),a=0;a<1e7;a++)if((new Date).getTime()-c>b)break}function PrintTS(){var c=new Date,d=c.getHours(),a=c.getMinutes(),b=c.getSeconds();if(a<10)a="0"+a;if(b<10)b="0"+b;return d+":"+a+":"+b}