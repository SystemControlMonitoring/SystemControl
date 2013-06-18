/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var t;

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Hosts<span id="hostcount"></span></td></tr></table>');
}

function Reload(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllHosts(uid);
}

function AutoReloadStart(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllHosts(uid);
    $('#AutoReload').html('<span id="AutoReloadDate"></span>Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStop(\'' + uid + '\');">Aktiviert (Alle 90s)</span><span id="AutoReloadTimer"></span>');
    t=setTimeout('AutoReloadStart("' + uid + '")', 90000);
    $('#AutoReloadDate').html(PrintTS() + ' Uhr');
}

function AutoReloadStop(uid) {
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    clearTimeout(t);
}

function AllHosts(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div id="AutoReload"></div>');
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    $.Shortcuts.add({
        type: 'down',
        mask: 'a',
        handler: AutoReloadStart(uid)
    }).start();
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0TW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=aG9zdHM=JkHu77',
        crossDomain: true,
        success: function (json) {
            if (json.MODVIEW == "ListAllHosts") {
                ListAllHosts(uid);
            } else {
                GridAllHosts(uid);
            }
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#LoadBasic#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function GridAllHosts(uid) {
    var b64uid = $.base64.encode( uid );
    $('img#ListHosts').removeClass('Border2px82abcc');
    $('img#ListHosts').addClass('Border2px004279');
    $('img#GridHosts').removeClass('Border2px004279');
    $('img#GridHosts').addClass('Border2px82abcc');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#ListCenter').html('');
    $('#center').html('');
    $('#AutoReload').css('display', 'none');
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        crossDomain: true,
        success: function(json) {
            var dds;
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    dds = value.ACTION;
                }
            });
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsSG9zdHM=Uhd739&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $('#center').html('<section></section>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('section','#center').append('<a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" class="fulltext" title="' + hostname + '"><img class="Type" src="' + this.ICON + '"><span>' + shorthostname + '</span><br></br><span id="DivHostStatus" class="Host' + hostcount + '"></span><span class="host-sub-grid">Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '<br>CR: ' + this.SRV_CR + ' | WA: ' + this.SRV_WA + ' | UN: ' + this.SRV_UN + ' | OK: ' + this.SRV_OK + ' | PE: ' + this.SRV_PE + '</span></a>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    UpdateModView(uid,"GridAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ListAllHosts(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#center').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#ListCenter').html('<div id="HostsPane"><div id="HostsListSelect"></div><div id="HostsListSearch"></div><div id="HeadDivTableHostsListView"><span>Host Name</span><span>Klasse</span><span>Cr</span><span>Wa</span><span>Un</span><span>Ok</span><span>Pe</span><span>Output</span></div></div><div id="DivTableHostsListView"></div>');
    $('#HostsPane').append('<div id="VLOne"></div><div id="VLTwo"></div><div id="VLThree"></div><div id="VLFour"></div><div id="VLFive"></div><div id="VLSix"></div><div id="VLSeven"></div>');
    if (state.length > 0) {
        ListSpecialHosts(uid,state);
    } else {
        if (searchstring.length > 0) {
            ListSearchHosts(uid,searchstring);
        } else {
            ListHosts(uid);
        }
    }
}

function ListHosts(uid) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        crossDomain: true,
        success: function(json) {
            var dds;
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    dds = value.ACTION;
                }
            });
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsSG9zdHM=Uhd739&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            var cssclass;
                            if (this.STATE == "1") { 
                                cssclass = "taovcr"; 
                            } else if (this.STATE == "2") { 
                                cssclass = "taovun"; 
                            } else { 
                                cssclass = "taovok"; 
                            }
                            var srvok; var srvwa; var srvcr; var srvun; var srvpe;
                            if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                            if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                            if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                            if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                            if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                            $('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="' + this.ICON + '" /></td><td>' + shorthostname + '</td><td rowspan=2>' + this.CUSTOM_VAR + '</td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '</td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td><i>auf ' + mnode + '</i></td></tr></table>');
                            //$('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#DivTableHostsListView').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#FooterDivTableHostsListView').html(hostcount + ' Hosts');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"ListAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function UpdateModView(uid,val1) {
    var b64uid = $.base64.encode( uid );
    var b64val1 = $.base64.encode( val1 );
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=VXBkYXRlTW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=aG9zdHM=JkHu77&v1=' + b64val1 + 'HjKi88',
        crossDomain: true,
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#UpdateModView#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ShowSelect(state) {
    $('#HostsListSelect').append('\n\
        <select id="HostsViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option value="">Alle Hosts</option>\n\
            <option value="' + $.base64.encode("up") + 'KdhU7Z">Alle Hosts ONLINE</option>\n\
            <option value="' + $.base64.encode("do") + 'KdhU7Z">Alle Hosts OFFLINE</option>\n\
            <option value="' + $.base64.encode("un") + 'KdhU7Z">Alle Hosts nicht erreichbar</option>\n\
            <option value="' + $.base64.encode("nok") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("noknodt") + 'KdhU7Z">Alle Probleme nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("nokdt") + 'KdhU7Z">Alle Probleme in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoack") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("doack") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet</option>\n\
            <option value="' + $.base64.encode("donoacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoackdt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doackdt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoack") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("unack") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet</option>\n\
            <option value="' + $.base64.encode("unnoacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, in einer DOWNTIME</option>\n\
        </select>');
    $('#HostsViewSelect').val( state ).attr('selected',true);
    $('#HostsViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ShowSelectSearch() {
    $('#HostsListSelect').append('\n\
        <select id="HostsViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\\n\
            <option selected value="">Suche ...</option>\n\
            <option value="">Alle Hosts</option>\n\
            <option value="' + $.base64.encode("up") + 'KdhU7Z">Alle Hosts ONLINE</option>\n\
            <option value="' + $.base64.encode("do") + 'KdhU7Z">Alle Hosts OFFLINE</option>\n\
            <option value="' + $.base64.encode("un") + 'KdhU7Z">Alle Hosts nicht erreichbar</option>\n\
            <option value="' + $.base64.encode("nok") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("noknodt") + 'KdhU7Z">Alle Probleme nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("nokdt") + 'KdhU7Z">Alle Probleme in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoack") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("doack") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet</option>\n\
            <option value="' + $.base64.encode("donoacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoackdt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doackdt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoack") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("unack") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet</option>\n\
            <option value="' + $.base64.encode("unnoacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, in einer DOWNTIME</option>\n\
        </select>');
    $('#HostsViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ListSpecialHosts(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        crossDomain: true,
        success: function(json) {
            var dds;
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    dds = value.ACTION;
                }
            });
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdFN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            var cssclass;
                            if (this.SERVICE_STATUS == "1") { 
                                cssclass = "taovwa"; 
                            } else if (this.SERVICE_STATUS == "2") { 
                                cssclass = "taovcr"; 
                            } else if (this.SERVICE_STATUS == "3") { 
                                cssclass = "taovun"; 
                            } else { 
                                cssclass = "taovok"; 
                            }
                            var srvok; var srvwa; var srvcr; var srvun; var srvpe;
                            if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                            if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                            if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                            if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                            if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                            $('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="' + this.ICON + '" /></td><td>' + shorthostname + '</td><td rowspan=2>' + this.CUSTOM_VAR + '</td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '</td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td><i>auf ' + mnode + '</i></td></tr></table>');
                            //$('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#DivTableHostsListView').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"ListAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ListSearchHosts(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        crossDomain: true,
        success: function(json) {
            var dds;
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    dds = value.ACTION;
                }
            });
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdFNlYXJjaExpc3Q=Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $('#HostsListSearch').html('<div style="margin-top: 7px; margin-left: 7px;"><font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '</div>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            var cssclass;
                            if (this.SERVICE_STATUS == "1") { 
                                cssclass = "taovwa"; 
                            } else if (this.SERVICE_STATUS == "2") { 
                                cssclass = "taovcr"; 
                            } else if (this.SERVICE_STATUS == "3") { 
                                cssclass = "taovun"; 
                            } else { 
                                cssclass = "taovok"; 
                            }
                            var srvok; var srvwa; var srvcr; var srvun; var srvpe;
                            if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                            if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                            if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                            if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                            if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                            $('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="' + this.ICON + '" /></td><td>' + shorthostname + '</td><td rowspan=2>' + this.CUSTOM_VAR + '</td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '</td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td><i>auf ' + mnode + '</i></td></tr></table>');
                            //$('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    
                    if (hostcount == 0) {
                        $('#DivTableHostsListView').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarHosts(uid,searchstring);
                    UpdateModView(uid,"ListAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function KlickFunctionSidebarHosts(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    $('#HostsListSearch').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchHostsSearch( b64uid + 'Jhdu8K',searchstring);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',10);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',10);
        }
    });
}