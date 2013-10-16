/*
 * Variablen Definition
 */

var t;

/*
 * Funktionen
 */

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href="../">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Datenbanken<span id="dbcount"></span></td></tr></table>');
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'a',
        handler: function() {
            AutoReloadStart(uid);
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'q',
        handler: function() {
            AutoReloadStop(uid);
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 's',
        handler: function() {
            if ($("#Sidebar").is(":hidden")) {
                $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
                $('#Sidebar').animate({width:'toggle'},350, function() {
                    $('#SidebarContent').fadeIn(100);
                }).css('zIndex',30);
                SearchDatabases( b64uid + 'Jhdu8K');
            } else {
                $('#SidebarContent').fadeOut(100);
                $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
                $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
            }
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'l',
        handler: function() {
            ListAllDBs(uid);
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'g',
        handler: function() {
            GridAllDBs(uid);
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'r',
        handler: function() {
            Reload(uid);
        }
    }).start();
}

function Reload(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="../layout/images/ajax-loader.gif">');
    AllDBs(uid);
}

function AutoReloadStart(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="../layout/images/ajax-loader.gif">');
    AllDBs(uid);
    $('#AutoReload').html('<span id="AutoReloadDate"></span>Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStop(\'' + uid + '\');">Aktiviert (Alle 90s)</span><span id="AutoReloadTimer"></span>');
    t=setTimeout('AutoReloadStart("' + uid + '")', 90000);
    $('#AutoReloadDate').html(PrintTS() + ' Uhr');
}

function AutoReloadStop(uid) {
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    clearTimeout(t);
}

function AllDBs(uid) {
    $('#StatusListHead').html('<div id="CheckBoxAll"><input type="checkbox" id="CheckAllCheckboxes" onclick="CheckAll(\'' + uid + '\');"/></div><div id="HeadDivTableHostsListView"><span>Datenbank Name</span><span>Klasse</span><span>Cr</span><span>Wa</span><span>Un</span><span>Ok</span><span>Pe</span><span>Output</span></div>');
    $('#StatusListTable').html(''); $('#HostStatusSummaryContent').html(''); $('#ServiceStatusSummaryContent').html('');
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    if (state.length > 0) {
        ListDBsByStatus(uid,state);
    } else {
        if (searchstring.length > 0) {
            ListDBsBySearch(uid,searchstring);
        } else {
            ListDBs(uid);
        }
    }
}

function ShowSelect(state) {
    $('#HostGridSelect').html('\n\
        <select id="HostsViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option value="">Alle Datenbanken</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Datenbanken ONLINE</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Datenbanken OFFLINE</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Datenbanken OFFLINE auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apaoh") + 'KdhU7Z">Datenbanken OFFLINE, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Datenbanken OFFLINE, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Datenbanken OFFLINE auf OFFLINE Hosts</option>\n\
        </select>');
    $('#HostsViewSelect').val( state ).attr('selected',true);
    $('#HostsViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ShowSelectSearch() {
    $('#HostGridSelect').html('\n\
        <select id="HostsViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option selected value="">Suche ...</option>\n\
            <option value="">Alle Datenbanken</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Datenbanken ONLINE</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Datenbanken OFFLINE</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Datenbanken OFFLINE auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apaoh") + 'KdhU7Z">Datenbanken OFFLINE, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Datenbanken OFFLINE, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Datenbanken OFFLINE auf OFFLINE Hosts</option>\n\
        </select>');
    $('#HostsViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function SummaryView(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdEZ1bGxJbmZvHd78h3&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var hostcount = 0;
            $.each(json, function() {
                var mnode = this.NODE;
                $.each(this.HFI, function() {
                    var shorthostname;
                    if ( DeleteDomainSuffix == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                    var csscl;
                    if (this.STATUS == "1") { csscl = "cr"; } else if (this.STATUS == "2") { csscl = "un"; } else { csscl = "ok"; }
                    $('#HostStatusSummaryContent').append('<span id="SummaryBox" class="' + csscl + '" title="' + mnode + ': ' + shorthostname + '">&nbsp;</span>');
                    $.each(this.SERVICELIST, function() {
                        var cssclass;
                        if (this.SERVICE_STATUS == "1") { cssclass = "hwa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "hcr"; } else if (this.SERVICE_STATUS == "3") { cssclass = "hun"; } else { cssclass = "hok"; }
                        if (this.ACK == "1") { cssclass = "hack"; }
                        $('#ServiceStatusSummaryContent').append('<span id="SummaryBox" class="' + cssclass + '" title="' + mnode + ': ' + this.SERVICE_NAME + '@' + shorthostname + '">&nbsp;</span>');
                    });
                    hostcount++;
                });
            });
        },
        dataType: 'json',
        cache: false
    }); 
}

/*
 * List Databases
 */

function ListDBs(uid) {
    SummaryView(uid);
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VGdWxsSW5mbw==Hu78h3&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var hostcount = 0;
            $.each(json, function() {
                var mnode = this.NODE;
                $.each(this.DBFI, function() {
                    var shorthostname; var srvok; var srvwa; var srvcr; var srvun; var srvpe; var cssclass; var hcssclass;
                    if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                    if (this.SERVICE_STATE == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATE == "2") { cssclass = "taovcr"; } else if (this.SERVICE_STATE == "3") { cssclass = "taovun"; } else { cssclass = "taovok"; }
                    if (this.HOST_STATUS == "1") { hcssclass = "fcr"; } else if (this.HOST_STATUS == "2") { hcssclass = "fun"; } else { hcssclass = "fok"; }
                    if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                    if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                    if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                    if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                    if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                    $('#StatusListTable').append('<tr><td ondblclick="OpenWindow(\'../modules/oracle_database.jsp?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( this.HOST_NAME ) + '&db=' + $.base64.encode( this.DB_NAME ) + '\',\'_blank\');"><div id="StatusListEntry"><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="../' + this.ICON + '" /></td><td>' + this.DB_TYPE + ': ' + this.DB_NAME + '<div id="HostNotifications" class="Host' + hostcount + '"></div></td><td rowspan=2>' + this.HOST_CUSTOM_VAR + '</td><td rowspan=2><div id="CheckBoxHost"><input type="checkbox" name="' + this.HOST_NAME + '@' + mnode + '" value="HOST" /></div></td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '<div id="ServicesHost" class="ServicesHost' + hostcount + '"></div></td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td style="color: #82abcc;">auf <font class="' + hcssclass + '">' + shorthostname + '</font> (' + mnode + ')</td></tr></table></div></td></tr>');
                    if (this.SERVICE_STATE != "0") { $('.Host' + hostcount).append('<img id="ImgHostStatus" src="../layout/images/icons/server--exclamation.png" />'); };
                    if (this.ACK == "1") { $('.Host' + hostcount).append('<img id="ImgHostAck" src="../layout/images/icons/eye.png" title="Host Problem ist bearbeitet." />'); }
                    if (this.CMT == "") { /**/ } else { $('.Host' + hostcount).append('<img id="ImgHostCmt" src="../layout/images/icons/balloon-left.png" title="Host wurde kommentiert." />'); }
                    $.each(this.SERVICELIST, function() {
                        var cssclass;
                        if (this.SERVICE_STATUS == "1") { cssclass = "wa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "cr"; } else if (this.SERVICE_STATUS == "3") { cssclass = "un"; } else { cssclass = "ok"; }
                        if (this.ACK == "1") { cssclass = "hack"; }
                        $('.ServicesHost' + hostcount).append('<span id="SummaryBox" class="' + cssclass + '" title="' + this.SERVICE_NAME + '">&nbsp;</span>');
                    });
                    hostcount++;
                });
            });
            if (hostcount == 0) { $('#StatusListTable').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>'); }
            $('#dbcount').html(' (' + hostcount + ')');
            $('#AjaxLoader').remove();
            ShowSelect($.base64.encode("a") + 'KdhU7Z');
        },
        dataType: 'json',
        cache: false
    }); 
}

function ListDBsByStatus(uid,state) {
    SummaryView(uid);
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VGdWxsSW5mb1N0YXR1c0RhdGFiYXNlKi88uU&u=' + b64uid + 'LKHld3&s=' + state,
        crossDomain: true,
        success: function(json) {
            var hostcount = 0;
            $.each(json, function() {
                var mnode = this.NODE;
                $.each(this.DBFI, function() {
                    var shorthostname; var srvok; var srvwa; var srvcr; var srvun; var srvpe; var cssclass; var hcssclass;
                    if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                    if (this.SERVICE_STATE == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATE == "2") { cssclass = "taovcr"; } else if (this.SERVICE_STATE == "3") { cssclass = "taovun"; } else { cssclass = "taovok"; }
                    if (this.HOST_STATUS == "1") { hcssclass = "fcr"; } else if (this.HOST_STATUS == "2") { hcssclass = "fun"; } else { hcssclass = "fok"; }
                    if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                    if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                    if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                    if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                    if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                    $('#StatusListTable').append('<tr><td ondblclick="OpenWindow(\'../modules/oracle_database.jsp?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( this.HOST_NAME ) + '&db=' + $.base64.encode( this.DB_NAME ) + '\',\'_blank\');"><div id="StatusListEntry"><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="../' + this.ICON + '" /></td><td>' + this.DB_TYPE + ': ' + this.DB_NAME + '<div id="HostNotifications" class="Host' + hostcount + '"></div></td><td rowspan=2>' + this.HOST_CUSTOM_VAR + '</td><td rowspan=2><div id="CheckBoxHost"><input type="checkbox" name="' + this.HOST_NAME + '@' + mnode + '" value="HOST" /></div></td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '<div id="ServicesHost" class="ServicesHost' + hostcount + '"></div></td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td style="color: #82abcc;">auf <font class="' + hcssclass + '">' + shorthostname + '</font> (' + mnode + ')</td></tr></table></div></td></tr>');
                    if (this.SERVICE_STATE != "0") { $('.Host' + hostcount).append('<img id="ImgHostStatus" src="../layout/images/icons/server--exclamation.png" />'); };
                    if (this.ACK == "1") { $('.Host' + hostcount).append('<img id="ImgHostAck" src="../layout/images/icons/eye.png" title="Host Problem ist bearbeitet." />'); }
                    if (this.CMT == "") { /**/ } else { $('.Host' + hostcount).append('<img id="ImgHostCmt" src="../layout/images/icons/balloon-left.png" title="Host wurde kommentiert." />'); }
                    $.each(this.SERVICELIST, function() {
                        var cssclass;
                        if (this.SERVICE_STATUS == "1") { cssclass = "wa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "cr"; } else if (this.SERVICE_STATUS == "3") { cssclass = "un"; } else { cssclass = "ok"; }
                        if (this.ACK == "1") { cssclass = "hack"; }
                        $('.ServicesHost' + hostcount).append('<span id="SummaryBox" class="' + cssclass + '" title="' + this.SERVICE_NAME + '">&nbsp;</span>');
                    });
                    hostcount++;
                });
            });
            if (hostcount == 0) { $('#StatusListTable').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>'); }
            $('#dbcount').html(' (' + hostcount + ')');
            $('#AjaxLoader').remove();
            ShowSelect(state);
        },
        dataType: 'json',
        cache: false
    }); 
}

function ListDBsBySearch(uid,searchstring) {
    SummaryView(uid);
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VGdWxsSW5mb1NlYXJjaERhdGFiYXNlKi88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
        crossDomain: true,
        success: function(json) {
            $('#ShowGridSearchBar').remove();
            $('#StatusSummaryHead').append('<div id="ShowGridSearchBar">Gesucht nach: ' + searchstring + '</div>');
            var hostcount = 0;
            $.each(json, function() {
                var mnode = this.NODE;
                $.each(this.DBFI, function() {
                    var shorthostname; var srvok; var srvwa; var srvcr; var srvun; var srvpe; var cssclass; var hcssclass;
                    if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                    if (this.SERVICE_STATE == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATE == "2") { cssclass = "taovcr"; } else if (this.SERVICE_STATE == "3") { cssclass = "taovun"; } else { cssclass = "taovok"; }
                    if (this.HOST_STATUS == "1") { hcssclass = "fcr"; } else if (this.HOST_STATUS == "2") { hcssclass = "fun"; } else { hcssclass = "fok"; }
                    if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                    if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                    if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                    if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                    if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                    $('#StatusListTable').append('<tr><td ondblclick="OpenWindow(\'../modules/oracle_database.jsp?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( this.HOST_NAME ) + '&db=' + $.base64.encode( this.DB_NAME ) + '\',\'_blank\');"><div id="StatusListEntry"><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="../' + this.ICON + '" /></td><td>' + this.DB_TYPE + ': ' + this.DB_NAME + '<div id="HostNotifications" class="Host' + hostcount + '"></div></td><td rowspan=2>' + this.HOST_CUSTOM_VAR + '</td><td rowspan=2><div id="CheckBoxHost"><input type="checkbox" name="' + this.HOST_NAME + '@' + mnode + '" value="HOST" /></div></td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '<div id="ServicesHost" class="ServicesHost' + hostcount + '"></div></td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td style="color: #82abcc;">auf <font class="' + hcssclass + '">' + shorthostname + '</font> (' + mnode + ')</td></tr></table></div></td></tr>');
                    if (this.SERVICE_STATE != "0") { $('.Host' + hostcount).append('<img id="ImgHostStatus" src="../layout/images/icons/server--exclamation.png" />'); };
                    if (this.ACK == "1") { $('.Host' + hostcount).append('<img id="ImgHostAck" src="../layout/images/icons/eye.png" title="Host Problem ist bearbeitet." />'); }
                    if (this.CMT == "") { /**/ } else { $('.Host' + hostcount).append('<img id="ImgHostCmt" src="../layout/images/icons/balloon-left.png" title="Host wurde kommentiert." />'); }
                    $.each(this.SERVICELIST, function() {
                        var cssclass;
                        if (this.SERVICE_STATUS == "1") { cssclass = "wa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "cr"; } else if (this.SERVICE_STATUS == "3") { cssclass = "un"; } else { cssclass = "ok"; }
                        if (this.ACK == "1") { cssclass = "hack"; }
                        $('.ServicesHost' + hostcount).append('<span id="SummaryBox" class="' + cssclass + '" title="' + this.SERVICE_NAME + '">&nbsp;</span>');
                    });
                    hostcount++;
                });
            });
            if (hostcount == 0) { $('#StatusListTable').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>'); }
            $('#dbcount').html(' (' + hostcount + ')');
            $('#AjaxLoader').remove();
            ShowSelectSearch();
            KlickFunctionSidebarDBs(uid,searchstring);
        },
        dataType: 'json',
        cache: false
    }); 
}

function KlickFunctionSidebarDBs(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    $('#ShowGridSearchBar').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchDatabasesSearch( b64uid + 'Jhdu8K',searchstring);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',10);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',10);
        }
    });
}