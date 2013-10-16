 /* 
 * Call:
 * <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                KeyFunctionSidebar();
                KlickFunctionSidebar();
            });
        });
   </script>
 * --------------------------------------------------------------
 */

var Backend;
var DeleteDomainSuffix;
var state = urlPara('s').replace(/%3D/g,'=');
var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
var suburl = window.location.pathname.split("/")[1];

function GetBackend() {
    $.ajax({
        url: 'backend.jsp',
        dataType: 'json',
        cache: false,
        async: false,
        success: function(json) {
            $.each(json, function(key,value) {
                Backend = value;
            });
        }
    });
}

function SubGetBackend() {
    $.ajax({
        url: '../backend.jsp',
        dataType: 'json',
        cache: false,
        async: false,
        success: function(json) {
            $.each(json, function(key,value) {
                Backend = value;
            });
        }
    });
}

function Loader() {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
}

function SubLoader() {
    $('#TopMenu').append('<img id="AjaxLoader" src="../layout/images/ajax-loader.gif">');
}

function Base() {
    $("#back-div").append("<a class='back-a' href='./'><img class='back-img' src='layout/images/white/back.png' title='Zur&uuml;ck'/></a>");
}

function SubBase() {
    $("#back-div").append("<a class='back-a' onclick=\"history.back ();\"><img class='back-img' src='../layout/images/white/back.png' title='Zur&uuml;ck'/></a>");
}

function urlParam(name) {
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if(typeof(results) !== 'undefined' && results != null) { return results[1]; } else { return 0; }
}

function urlPara(name){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );  
    var results = regex.exec( window.location.href ); 
    if( results == null )
        return "";  
    else
        return results[1];
}

function ChangeTitle() {
    document.title = $.base64.decode( urlPara('c') ) + '@' + $.base64.decode( urlPara('h') ) + ' - kVASy' + decodeURI('%C2%AE') + ' System Control';
}

function KeyFunctionSidebar(uid) {
    var b64uid = $.base64.encode( uid );
    $.Shortcuts.add({
        type: 'down',
        mask: 'b',
        handler: function() {
            if ($("#SidebarBottom").is(":hidden")) {
                $('#SidebarBottomSmall').animate({marginBottom: "870px"},350).css('zIndex',25);
                $('#SidebarBottom').animate({height:'toggle'},350, function() {
                    $('#SidebarBottomContent').fadeIn(100);
                }).css('zIndex',25);
            } else {
                $('#SidebarBottomContent').fadeOut(100);
                $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',10);
                $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',10);
            }
        }
    }).start();
}

function KlickFunctionSidebar(uid) {
    var b64uid = $.base64.encode( uid );
    $('#SidebarSmall').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchHosts( b64uid + 'Jhdu8K');
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
        }
    });
    $('#SidebarBottomSmall').dblclick(function() {
        if ($("#SidebarBottom").is(":hidden")) {
            $('#SidebarBottomSmall').animate({marginBottom: "870px"},350).css('zIndex',25);
            $('#SidebarBottom').animate({height:'toggle'},350, function() {
                $('#SidebarBottomContent').fadeIn(100);
            }).css('zIndex',25);
        } else {
            $('#SidebarBottomContent').fadeOut(100);
            $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',10);
            $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',10);
        }
    });
}

function StyleSidebar(uid) {
    var b64uid = $.base64.encode( uid );
    $('#SidebarSearch').append('<div id="Title">Suchen</div><div id="SubTitle">Nichts ausgew&auml;hlt!</div><form id="SearchForm" method="GET"><input id="SearchInput" name="searchstring" type="text" onclick="DeleteVal();"><img onclick="FormSubmit();" id="SearchImgInput" src="layout/images/search.png" /></form>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFHost" onclick="SearchHosts(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="layout/images/server.png"><span>Hosts</span></div>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFService" onclick="SearchServices(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="layout/images/services.png"><span>Services</span></div>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFDatabase" onclick="SearchDatabases(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="layout/images/database.png"><span>Datenbanken</span></div>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFMiddleware" onclick="SearchMiddleware(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="layout/images/layers.png"><span>Middleware</span></div>');
}

function SubStyleSidebar(uid) {
    var b64uid = $.base64.encode( uid );
    $('#SidebarSearch').append('<div id="Title">Suchen</div><div id="SubTitle">Nichts ausgew&auml;hlt!</div><form id="SearchForm" method="GET"><input id="SearchInput" name="searchstring" type="text" onclick="DeleteVal();"><img onclick="FormSubmit();" id="SearchImgInput" src="../layout/images/search.png" /></form>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFHost" onclick="SearchHosts(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="../layout/images/server.png"><span>Hosts</span></div>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFService" onclick="SearchServices(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="../layout/images/services.png"><span>Services</span></div>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFDatabase" onclick="SearchDatabases(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="../layout/images/database.png"><span>Datenbanken</span></div>');
    $('#SidebarSearchFilter').append('<div class="DivSearchFilter" id="SFMiddleware" onclick="SearchMiddleware(\'' + b64uid + 'Ljd84K\');"><img id="SearchImg" src="../layout/images/layers.png"><span>Middleware</span></div>');
}

function DeleteVal() {
    $('input#SearchInput').val('');
}

function FormSubmit() {
    $('form#SearchForm').submit();
}

function SearchHosts(uid) {
    $('form#SearchForm').attr('action', '/' + suburl + '/hosts/');
    $('#SubTitle').html('.. nach Hosts');
    $('input#SearchInput').val('Hostname');
    $('#SFService').removeClass('BgBlue');
    $('#SFHost').addClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SFMiddleware').removeClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdEhvc3RzHj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.hosts, function( item ) {
                        return {
                            label: item.NAME + ' (' + item.CUST_VAL + ') auf ' + item.NODE,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchServices(uid) {
    $('form#SearchForm').attr('action', '/' + suburl + '/services/');
    $('#SubTitle').html('.. nach Services');
    $('input#SearchInput').val('Servicename');
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').addClass('BgBlue');
    $('#SFMiddleware').removeClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdFNlcnZpY2VzHj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.services, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchDatabases(uid) {
    $('form#SearchForm').attr('action', '/' + suburl + '/database/');
    $('#SubTitle').html('.. nach Datenbanken');
    $('input#SearchInput').val('SID');
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').removeClass('BgBlue');
    $('#SFMiddleware').removeClass('BgBlue');
    $('#SFDatabase').addClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdERhdGFiYXNlcw==Hj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.databases, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchMiddleware(uid) {
    $('form#SearchForm').attr('action', '/' + suburl + '/middleware/');
    $('#SubTitle').html('.. nach Middleware Instanzen');
    $('input#SearchInput').val('Type/Port');
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').removeClass('BgBlue');
    $('#SFMiddleware').addClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdE1pZGRsZXdhcmU=Hj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.middleware, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchHostgroups(uid) {
    $('form#SearchForm').attr('action', 'services4.jsp');
    $('#SubTitle').html('.. nach Hostgruppen');
    $('input#SearchInput').val('Name');
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').removeClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SFMiddleware').addClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdEhvc3Rncm91cHM=Hj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.databases, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchServicesSearch(uid,content) {
    $('form#SearchForm').attr('action', '/' + suburl + '/services/');
    $('#SubTitle').html('.. nach Services');
    $('input#SearchInput').val(content);
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').addClass('BgBlue');
    $('#SFMiddleware').removeClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdFNlcnZpY2VzHj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.services, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchHostsSearch(uid,content) {
    $('form#SearchForm').attr('action', '/' + suburl + '/hosts/');
    $('#SubTitle').html('.. nach Hosts');
    $('input#SearchInput').val(content);
    $('#SFService').removeClass('BgBlue');
    $('#SFHost').addClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SFMiddleware').removeClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdEhvc3RzHj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.hosts, function( item ) {
                        return {
                            label: item.NAME + ' (' + item.CUST_VAL + ') auf ' + item.NODE,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchDatabasesSearch(uid,content) {
    $('form#SearchForm').attr('action', '/' + suburl + '/database/');
    $('#SubTitle').html('.. nach Datenbanken');
    $('input#SearchInput').val(content);
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').removeClass('BgBlue');
    $('#SFMiddleware').removeClass('BgBlue');
    $('#SFDatabase').addClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdERhdGFiYXNlcw==Hj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.databases, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function SearchMiddlewareSearch(uid,content) {
    $('form#SearchForm').attr('action', '/' + suburl + '/middleware/');
    $('#SubTitle').html('.. nach Middleware Instanzen');
    $('input#SearchInput').val(content);
    $('#SFHost').removeClass('BgBlue');
    $('#SFService').removeClass('BgBlue');
    $('#SFMiddleware').addClass('BgBlue');
    $('#SFDatabase').removeClass('BgBlue');
    $('#SearchInput').autocomplete({
        source: function( request, response ) {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=TGlzdE1pZGRsZXdhcmU=Hj86Hz&u=' + uid,
                dataType: 'json',
                cache: false,
                data: {                    
                    searchstring: request.term
                },
                success: function( data ) {
                    response( $.map( data.middleware, function( item ) {
                        return {
                            label: item.HOST +  ' (' + item.NODE + ') - ' + item.NAME,
                            value: item.NAME
                        }
                    }));
                }
            });
        },
        minLength: 1
    });
}

function Configuration(uid) {
    var b64uid = $.base64.encode( uid );
    /* Dialog format start */
    $('#Configuration').append('<div id="ConfigurationDialog" title="Einstellungen">\n\
        <div id="ConfigurationTabs">\n\
            <ul>\n\
                <li><a href="#ConfigurationTabs1">Web-Konfiguration</a></li>\n\
                <!--li><a href="#ConfigurationTabs2">Proxy-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs3">Core-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs4">System-Information</a></li-->\n\
            </ul>\n\
            <div id="ConfigurationTabs1">\n\
                <div id="ConfigurationSection">\n\
                    <div id="ConfigurationSectionTitle">Dashboard</div>\n\
                    <button id="1" class="ConfigurationSectionPoint" onclick="LoadBasic(\'' + b64uid + 'Ljd84K\');">Setze Basis Einstellungen</button>\n\
                    <button id="2" class="ConfigurationSectionPoint" onclick="DeleteBasic(\'' + b64uid + 'Ljd84K\');">Zur&uuml;cksetzen auf Standard</button>\n\
                </div>\n\
                <div id="ConfigurationSection">\n\
                    <div id="ConfigurationSectionTitle">Einstellungen</div>\n\
                    <div class="Config"></div>\n\
                </div>\n\
                <div id="ConfigurationSection">\n\
                    <div id="ConfigurationSectionTitle">Reset</div>\n\
                    <button id="3" class="ConfigurationSectionPoint" onclick="DeleteBasicConfig(\'' + b64uid + 'Ljd84K\');">Alle Einstellungen zur&uuml;cksetzen</button>\n\
                </div>\n\
            </div>\n\
            <!--div id="ConfigurationTabs2">\n\
                <p></p>\n\
            </div>\n\
            <div id="ConfigurationTabs3">\n\
                <p></p>\n\
            </div>\n\
            <div id="ConfigurationTabs4">\n\
                <div id="ConfigurationSection">\n\
                    <div id="ConfigurationSectionTitle">Modulversionen</div>\n\
                    <div id="Modulversionen"></div>\n\
                    <div id="ConfigurationSectionTitle">Komponenten Status</div>\n\
                    <div id="Components"></div>\n\
                </div>\n\
            </div-->\n\
       </div>\n\
   </div>');
    
    $('#ConfigurationTabs').tabs();
    $('#1').button();
    $('#2').button();
    $('#3').button();

    /* Dialog open */
    $('#ConfigurationDialog').dialog({
	autoOpen: true,
	height: 600,
	width: 800,
	draggable: false,
	resizable: false,
	modal: true,
        open: function() {
            /* Tabbbing of Configurationmenu */
            $.ajax({
                url: 'http://' + Backend + '/?mv=g',
                crossDomain: true,
                success: function(json) {
                    $('#Modulversionen').append('<table id="TableModulversionen" cellpadding=0 cellspacing=5 border=0></table>');
                    $.each(json, function(key,value) {
                        $('table','#Modulversionen').append('<tr><td>' + key + '</td><td> >> </td><td>' + value + '</td></tr>');
                    });
                },
                dataType: 'json',
                cache: false
            });
            $.ajax({
                url: 'http://' + Backend + '/chkcmp/json/?e=1&m=Q2hlY2tQcm9jZXNzLk76Zh',
                crossDomain: true,
                success: function(json) {
                    $.each(json, function(key,value) {
                        if ( key == 'ICINGA' ) {
                            $('#Components').append('<table id="TableIcinga" cellpadding=0 cellspacing=5 border=0><tr><td colspan=2>' + key + ' Backend</td></tr></table>');
                            $.each(value, function(index, obj) {
                                var pstat;
                                if ( obj.PORT_ON == 1) { pstat = "offen"; } else { pstat = "geschlossen"; }
                                $('table#TableIcinga').append('<tr><td>' + obj.NAME + ' (' + obj.IP + '):</td><td>Aktive ICINGA Prozesse: ' + obj.ICINGA_PRC + ', Aktive XINETD Prozesse: ' + obj.XINETD_PRC + ', Port: ' + obj.PORT_NO + ' ist ' + pstat + '.</td></tr>');
                            });
                        } else {
                            $('#Components').append('<table id="TablePostgre" cellpadding=0 cellspacing=5 border=0><tr><td colspan=2>' + key + ' Backend</td></tr></table>');
                            $.each(value, function(index, obj) {
                                var pstat;
                                if ( obj.PORT_ON == 1) { pstat = "offen"; } else { pstat = "geschlossen"; }
                                $('table#TablePostgre').append('<tr><td>' + obj.NAME + ' (' + obj.IP + '):</td><td>Aktive Prozesse: ' + obj.POSTGRE_PRC + ', Port: ' + obj.PORT_NO + ' ist ' + pstat + '.</td></tr>');
                            });
                        }
                    });
                },
                dataType: 'json',
                cache: false
            });
            $.ajax({
                url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'KjHu8s&m2=Q29uZmlnJq0OpP',
                crossDomain: true,
                success: function(json) {
                    $('div.Config').append('<table id="TableConfig" cellpadding=0 cellspacing=5 border=0></table>');
                    $.each(json, function(key,value) {
                        if ( value.ACTION == 0 ) {
                            $('table#TableConfig').append('<tr><td>' + value.DESC + '</td><td></td><td><div id="radio' + value.KEY + '" class="RadioBorder"><input type="radio" id="radio1' + value.KEY + '" name="radio' + value.KEY + '" onclick="AddConfig(\'' + b64uid + 'Ljd84K\',\'Config\',\'' + value.KEY + '\',\'1\',\'' + value.DESC + '\',\'\');" /><label for="radio1' + value.KEY + '">ON</label><input type="radio" id="radio2' + value.KEY + '" name="radio' + value.KEY + '" checked="checked" onclick="AddConfig(\'' + b64uid + 'Ljd84K\',\'Config\',\'' + value.KEY + '\',\'0\',\'' + value.DESC + '\',\'\');" /><label for="radio2' + value.KEY + '">OFF</label></div></td></tr>');
                        } else {
                            $('table#TableConfig').append('<tr><td>' + value.DESC + '</td><td></td><td><div id="radio' + value.KEY + '" class="RadioBorder"><input type="radio" id="radio1' + value.KEY + '" name="radio' + value.KEY + '" onclick="AddConfig(\'' + b64uid + 'Ljd84K\',\'Config\',\'' + value.KEY + '\',\'1\',\'' + value.DESC + '\',\'\');" checked="checked" /><label for="radio1' + value.KEY + '">ON</label><input type="radio" id="radio2' + value.KEY + '" name="radio' + value.KEY + '" onclick="AddConfig(\'' + b64uid + 'Ljd84K\',\'Config\',\'' + value.KEY + '\',\'0\',\'' + value.DESC + '\',\'\');" /><label for="radio2' + value.KEY + '">OFF</label></div></td></tr>');
                        }
                        $('#radio' + value.KEY ).buttonset();
                    });
                },
                dataType: 'json',
                cache: false
            });
        },
        buttons: { 
            BEENDEN: function() {
                $(this).dialog('close');
		$('#ConfigurationDialog').remove();
                location.reload();
            }
	}
    });
}

function AddLink() {
    $('#AddLink').append('<div id="AddLinkDialog" title="F&uuml;ge weiteren Men&uuml;punkt hinzu!"><p><span class="ui-icon ui-icon-circle-close" style="float: left; margin: 0 7px 50px 0;"></span>Basic:</p>');
    $('#AddLinkDialog').dialog({
	autoOpen: true,
	height: 300,
	width: 600,
	draggable: false,
	resizable: false,
	modal: true,
	buttons: { 
            OK: function() { 
		$(this).dialog('close');
		$('#AddLinkDialog').remove();
            },
            ABBRECHEN: function() {
                $(this).dialog('close');
		$('#AddLinkDialog').remove();
            }
	}
    });
}

function LoadBasic(uid) {
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=SW5zZXJ0RGFzaGJvYXJkQWxsKd8Hfg&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#1","Die Basiseinstellungen für das Dashboard wurden erfolgreich gesetzt."),
        dataType: 'json',
        cache: false
    });
}

function DialogSuccess(id,message) {
    $(id).append('<div id="SuccessDialog" title="Aktion Erfolgreich durchgef&uuml;hrt."><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 50px 0;"></span>' + message + '</p></div>');
    $('#SuccessDialog').dialog({
        autoOpen: true,
        height: 200,
        width: 600,
        draggable: false,
        resizable: false,
        modal: false,
        buttons: { 
            OK: function() {
                $(this).dialog('close');
                $('#SuccessDialog').remove();
            }
        }
    });
}

function DashboardLinks(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0RGFzaGJvYXJkQWxsUhdjK8&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            $.each(json, function() {
                $('#DashboardLinks').append('<a href="' + this.TARGET + '" class="twitter"><span>' + this.TITLE + '</span><br></br><span class="sub-grid">' + this.DESC + '</span></a>');
            });
            $('#AjaxLoader').remove();
        },
        dataType: 'json',
        cache: false
    });
}

function DeleteBasic(uid) {
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=RGVsZXRlRGFzaGJvYXJkQWxsJkl8Hd&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#2","Die Standardeinstellungen für das Dashboard wurden erfolgreich gesetzt."),
        dataType: 'json',
        cache: false
    });
}

function DeleteBasicConfig(uid) {
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=RGVsZXRlUmVwb0FsbA==Jhdu8d&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#3","Alle Einstellungen wurden erfolgreich zur&uuml;ckgesetzt!"),
        dataType: 'json',
        cache: false
    });
}

function AddConfig(uid,mdl,key,val1,val2,val3) {
    var b64mdl = $.base64.encode( mdl );
    var b64key = $.base64.encode( key );
    var b64val1 = $.base64.encode( val1 );
    var b64val2 = $.base64.encode( val2 );
    var b64val3 = $.base64.encode( val3 );
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=SW5zZXJ0VXBkYXRlQ29uZmlnHkl8Ui&u=' + uid + '&m2=' + b64mdl + 'Jkl8Hd&k=' + b64key + 'Jkl8Hd&v1=' + b64val1 + 'Jkl8Hd&v2=' + b64val2 + 'Jkl8Hd&v3=' + b64val3 + 'Jkl8Hd',
        crossDomain: true,
        success: DialogSuccess(".Config","Konfiguration wurde ge&auml;ndert."),
        dataType: 'json',
        cache: false
    });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function PrintTS() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (seconds < 10){
        seconds = "0" + seconds
    }
    return(hours + ":" + minutes + ":" + seconds)
}

function DeDoSu(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        dataType: 'json',
        cache: false,
        async: false,
        success: function(json) {
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    DeleteDomainSuffix = value;
                }
            });
        }
    });
}

function OpenWindow(target,mode) {
    window.open(target,mode);
}