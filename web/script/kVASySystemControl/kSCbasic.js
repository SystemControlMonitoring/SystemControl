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

function Loader() {
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
}

function Base() {
    $("#back-div").append("<a class='back-a' href='/kVASySystemControl'><img class='back-img' src='layout/images/white/back.png' title='Zur&uuml;ck'/></a>");
}

function urlParam(name) {
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    if(typeof(results) !== 'undefined' && results != null) { return results[1]; } else { return 0; }
}

function KeyFunctionSidebar() {
    $('body').keydown(function(e){
        if ((e.keyCode || e.which) == 37) {
            if ($("#Sidebar").is(":hidden")) {
                $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
                $('#Sidebar').animate({width:'toggle'},350, function() {
                    $('#SidebarContent').fadeIn(100);
                }).css('zIndex',30);
            } else {
                if ($("#SidebarBottom").is(":hidden")) {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',3);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',3);
                } else {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
                    $('#SidebarSmall').css('zIndex',3);
                }
            }
        } else if ((e.keyCode || e.which) == 39) {
            if ($("#Sidebar").is(":hidden")) {
                $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
                $('#Sidebar').animate({width:'toggle'},350, function() {
                    $('#SidebarContent').fadeIn(100);
                }).css('zIndex',30);
            } else {
                if ($("#SidebarBottom").is(":hidden")) {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',3);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',3);
                } else {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
                    $('#SidebarSmall').css('zIndex',3);
                }
            }
        } else if ((e.keyCode || e.which) == 38) {
            if ($("#SidebarBottom").is(":hidden")) {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomSmall').animate({marginBottom: "850px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                } else {
                    $('#SidebarBottomSmall').animate({marginBottom: "850px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                }
            } else {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',35);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',35);
                    $('#SidebarBottomSmall').css('zIndex',2);
                } else {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',2);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',2);
                    $('#SidebarBottomSmall').css('zIndex',2);
                }
            }
        } else if ((e.keyCode || e.which) == 40) {
            if ($("#SidebarBottom").is(":hidden")) {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomSmall').animate({marginBottom: "850px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                } else {
                    $('#SidebarBottomSmall').animate({marginBottom: "850px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                }
            } else {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',35);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',35);
                    $('#SidebarBottomSmall').css('zIndex',2);
                } else {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',2);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',2);
                    $('#SidebarBottomSmall').css('zIndex',2);
                }
            }
        }   
    });
}

function KlickFunctionSidebar() {
    $('#SidebarSmall').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',3);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',3);
        }
    });
    $('#SidebarBottomSmall').click(function() {
        if ($("#SidebarBottom").is(":hidden")) {
            $('#SidebarBottomSmall').animate({marginBottom: "850px"},350).css('zIndex',25);
            $('#SidebarBottom').animate({height:'toggle'},350, function() {
                $('#SidebarBottomContent').fadeIn(100);
            }).css('zIndex',25);
        } else {
            $('#SidebarBottomContent').fadeOut(100);
            $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',2);
            $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',2);
        }
    });
}

function StyleSidebar() {
    /**/
}

function Configuration(uid) {
    var b64uid = $.base64.encode( uid );
    /* Dialog format start */
    $('#Configuration').append('<div id="ConfigurationDialog" title="Einstellungen">\n\
        <div id="ConfigurationTabs">\n\
            <ul>\n\
                <li><a href="#ConfigurationTabs1">Web-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs2">Core-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs3">User-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs4">System-Information</a></li>\n\
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
            <div id="ConfigurationTabs2">\n\
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
            </div>\n\
       </div>\n\
   </div>');
            
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
            $('#ConfigurationTabs').tabs();
            $('#1').button();
            $('#2').button();
            $('#3').button();
            $.ajax({
                url: 'http://172.23.10.249:6560/?mv=g',
                crossDomain: true,
                success: function(json) {
                    $('#Modulversionen').append('<table id="TableModulversionen" cellpadding=0 cellspacing=5 border=0></table>');
                    $.each(json, function(key,value) {
                        $('table','#Modulversionen').append('<tr><td>' + key + '</td><td> >> </td><td>' + value + '</td></tr>');
                    });
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#Modulversionen#ERROR: " + textStatus + " MESSAGE: " + error);
                },
                dataType: 'json',
                cache: false
            });
            $.ajax({
                url: 'http://172.23.10.249:6560/chkcmp/json/?e=1&m=Q2hlY2tQcm9jZXNzLk76Zh',
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
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#Components#ERROR: " + textStatus + " MESSAGE: " + error);
                },
                dataType: 'json',
                cache: false
            });
            $.ajax({
                url: 'http://172.23.10.249:6560/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'KjHu8s&m2=Q29uZmlnJq0OpP',
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
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#SelectConfig#ERROR: " + textStatus + " MESSAGE: " + error);
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
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=SW5zZXJ0RGFzaGJvYXJkQWxsKd8Hfg&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#1","Die Basiseinstellungen für das Dashboard wurden erfolgreich gesetzt."),
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#LoadBasic#ERROR: " + textStatus + " MESSAGE: " + error);
        },
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
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=U2VsZWN0RGFzaGJvYXJkQWxsUhdjK8&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            $.each(json, function() {
                $('#DashboardLinks').append('<a href="' + this.TARGET + '" class="fulltext"><span>' + this.TITLE + '</span><br></br><span class="sub-grid">' + this.DESC + '</span></a>');
            });
            $('#AjaxLoader').remove();
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DashboardLinks#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function DeleteBasic(uid) {
    $.ajax({
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=RGVsZXRlRGFzaGJvYXJkQWxsJkl8Hd&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#2","Die Standardeinstellungen für das Dashboard wurden erfolgreich gesetzt."),
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DeleteBasic#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function DeleteBasicConfig(uid) {
    $.ajax({
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=RGVsZXRlUmVwb0FsbA==Jhdu8d&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#3","Alle Einstellungen wurden erfolgreich zur&uuml;ckgesetzt!"),
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DeleteBasicConfig#ERROR: " + textStatus + " MESSAGE: " + error);
        },
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
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=SW5zZXJ0VXBkYXRlQ29uZmlnHkl8Ui&u=' + uid + '&m2=' + b64mdl + 'Jkl8Hd&k=' + b64key + 'Jkl8Hd&v1=' + b64val1 + 'Jkl8Hd&v2=' + b64val2 + 'Jkl8Hd&v3=' + b64val3 + 'Jkl8Hd',
        crossDomain: true,
        success: DialogSuccess(".Config","Konfiguration wurde ge&auml;ndert."),
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#InsertConfig#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}