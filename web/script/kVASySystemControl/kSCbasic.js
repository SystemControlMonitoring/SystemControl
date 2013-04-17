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
                <li><a href="#ConfigurationTabs1">Basis-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs2">System-Konfiguration</a></li>\n\
                <li><a href="#ConfigurationTabs3">Nutzer-Konfiguration</a></li>\n\
            </ul>\n\
            <div id="ConfigurationTabs1">\n\
                <div id="ConfigurationSection">\n\
                    <div id="ConfigurationSectionTitle">Dashboard</div>\n\
                    <button id="1" class="ConfigurationSectionPoint" onclick="LoadBasic(\'' + b64uid + 'Ljd84K\');">Setze Basis Einstellungen</button>\n\
                    <button id="2" class="ConfigurationSectionPoint" onclick="DeleteBasic(\'' + b64uid + 'Ljd84K\');">Zur&uuml;cksetzen auf Standard</button>\n\
                </div>\n\
            </div>\n\
            <div id="ConfigurationTabs2">\n\
                <p></p>\n\
            </div>\n\
            <div id="ConfigurationTabs3">\n\
                <p></p>\n\
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
        url: 'http://172.23.10.249:6565/repo/json/?e=1&m=SW5zZXJ0RGFzaGJvYXJkQWxsKd8Hfg&u=' + uid + '',
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
        url: 'http://172.23.10.249:6565/repo/json/?e=1&m=U2VsZWN0RGFzaGJvYXJkQWxsUhdjK8&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            $.each(json, function() {
                $('#DashboardLinks').append('<a href="' + this.TARGET + '" class="fulltext"><span>' + this.TITLE + '</span><br></br><span class="sub-grid">' + this.DESC + '</span></a>');
            });
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
        url: 'http://172.23.10.249:6565/repo/json/?e=1&m=RGVsZXRlRGFzaGJvYXJkQWxsJkl8Hd&u=' + uid + '',
        crossDomain: true,
        success: DialogSuccess("#2","Die Standardeinstellungen für das Dashboard wurden erfolgreich gesetzt."),
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#LoadBasic#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}