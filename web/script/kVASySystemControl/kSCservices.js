/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var t;

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Services<span id="servicecount"></span></td></tr></table>');    
}

function Reload(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllServices(uid);
}

function AutoReloadStart(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllServices(uid);
    $('#AutoReload').html('<span id="AutoReloadDate"></span>Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStop(\'' + uid + '\');">Aktiviert (Alle 90s)</span><span id="AutoReloadTimer"></span>');
    t=setTimeout('AutoReloadStart("' + uid + '")', 90000);
    $('#AutoReloadDate').html(PrintTS() + ' Uhr');
}

function AutoReloadStop(uid) {
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    clearTimeout(t);
}

function AllServices(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div id="AutoReload"></div>');
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    $.Shortcuts.add({
        type: 'down',
        mask: 'a',
        handler: AutoReloadStart(uid)
    }).start();
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0TW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=c2VydmljZXM=JkHu77',
        crossDomain: true,
        success: function (json) {
            if (json.MODVIEW == "ListAllServices") {
                ListAllServices(uid);
            } else {
                GridAllServices(uid);
            }
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#AllServices#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function GridAllServices(uid) {
    var b64uid = $.base64.encode( uid );
    $('img#ListHosts').removeClass('Border2px82abcc');
    $('img#ListHosts').addClass('Border2px004279');
    $('img#GridHosts').removeClass('Border2px004279');
    $('img#GridHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'none');
    $('#SrvCenter').html('');
    $('#center').html('');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdEZ1bGxJbmZvHd78h3&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $('#center').html('<section></section>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HFI, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            $.each(this.SERVICELIST, function() {
                                if ( this.SERVICE_NAME.length > 25 ) { this.SERVICE_NAME = this.SERVICE_NAME.substr(0,22) + '...'; }
                                if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                                $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATUS_ICON + '" /></div><div id="SrvTitleGrid">' + this.SERVICE_NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                                servicecount++;
                            });
                            hostcount++;
                        });
                    });
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    UpdateModView(uid,"GridAllServices");
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#AllHosts#ERROR: " + textStatus + " MESSAGE: " + error);
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#GridAllServices#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ListAllServices(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#center').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#SrvCenter').html('<div id="ServicePane"><div id="ServiceListSelect"></div><div id="ServiceListSearch"></div><div id="HeadDivTableServicesListView"><span>Host Name</span><span>Service Name</span><span>Output</span></div></div><div id="ListDivShowServices"></div>');
    $('#ServicePane').append('<div id="VLOne"></div><div id="VLTwo"></div><div id="VLThree"></div>');
    if (state.length > 0) {
        ListSpecialServices(uid,state);
    } else {
        if (searchstring.length > 0) {
            ListSearchServices(uid,searchstring);
        } else {
            ListServices(uid);
        }
    }
}

function ListServices(uid) {
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdEZ1bGxJbmZvHd78h3&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HFI, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var hosticon = this.ICON;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + hostcount + 'Services"></table>');
                            var srvcount = 0;
                            $.each(this.SERVICELIST, function() {
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
                                if (srvcount == 0) {
                                    $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img src="' + hosticon + '" /></td><td>' + shorthostname + '</td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                } else if (srvcount == 1) {
                                    $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td><i>auf ' + mnode + '</i></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                } else {
                                    $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                }
                                servicecount++;
                                srvcount++;
                            });
                            hostcount++;
                        });
                    });
                    
                    if (servicecount == 0) {
                        $('#ListDivShowServices').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"ListAllServices");
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#AllHosts#ERROR: " + textStatus + " MESSAGE: " + error);
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#ListAllServices#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function UpdateModView(uid,val1) {
    var b64uid = $.base64.encode( uid );
    var b64val1 = $.base64.encode( val1 );
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=VXBkYXRlTW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=c2VydmljZXM=JkHu77&v1=' + b64val1 + 'HjKi88',
        crossDomain: true,
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#UpdateModView#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ShowSelect(state) {
    $('#ServiceListSelect').append('\n\
        <select id="ServiceViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option value="">Alle Services</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Alle Services mit Status: OK</option>\n\
            <option value="' + $.base64.encode("aw") + 'KdhU7Z">Alle Services mit Status: Warnung</option>\n\
            <option value="' + $.base64.encode("ac") + 'KdhU7Z">Alle Services mit Status: Kritisch</option>\n\
            <option value="' + $.base64.encode("au") + 'KdhU7Z">Alle Services mit Status: Unbekannt</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Alle Probleme auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Alle Probleme, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Alle Probleme auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("woh") + 'KdhU7Z">Services Warnung auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wfh") + 'KdhU7Z">Services Warnung auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnaoh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("waoh") + 'KdhU7Z">Services Warnung, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnafh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wafh") + 'KdhU7Z">Services Warnung, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("coh") + 'KdhU7Z">Services Kritisch auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cfh") + 'KdhU7Z">Services Kritisch auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnaoh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("caoh") + 'KdhU7Z">Services Kritisch, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnafh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cafh") + 'KdhU7Z">Services Kritisch, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uoh") + 'KdhU7Z">Services Unbekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("ufh") + 'KdhU7Z">Services Unbekannt auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unaoh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uaoh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unafh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uafh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').val( state ).attr('selected',true);
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ShowSelectSearch() {
    $('#ServiceListSelect').append('\n\
        <select id="ServiceViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option selected value="">Suche ...</option>\n\
            <option value="">Alle Services</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Alle Services mit Status: OK</option>\n\
            <option value="' + $.base64.encode("aw") + 'KdhU7Z">Alle Services mit Status: Warnung</option>\n\
            <option value="' + $.base64.encode("ac") + 'KdhU7Z">Alle Services mit Status: Kritisch</option>\n\
            <option value="' + $.base64.encode("au") + 'KdhU7Z">Alle Services mit Status: Unbekannt</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Alle Probleme auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Alle Probleme, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Alle Probleme auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("woh") + 'KdhU7Z">Services Warnung auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wfh") + 'KdhU7Z">Services Warnung auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnaoh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("waoh") + 'KdhU7Z">Services Warnung, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnafh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wafh") + 'KdhU7Z">Services Warnung, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("coh") + 'KdhU7Z">Services Kritisch auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cfh") + 'KdhU7Z">Services Kritisch auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnaoh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("caoh") + 'KdhU7Z">Services Kritisch, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnafh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cafh") + 'KdhU7Z">Services Kritisch, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uoh") + 'KdhU7Z">Services Unbekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("ufh") + 'KdhU7Z">Services Unbekannt auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unaoh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uaoh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unafh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uafh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ListSpecialServices(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    //$('#SrvCenter').html('');
    $('#center').html('');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SRVSTATSEL, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var hosticon = this.ICON;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            if (this.SERVICELIST.length > 0) {
                                $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + hostcount + 'Services"></table>');
                                var srvcount = 0;
                                $.each(this.SERVICELIST, function() {
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
                                    if (srvcount == 0) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else if (srvcount == 1) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    }
                                    servicecount++;
                                    srvcount++;
                                });
                                hostcount++;
                            }
                        });
                    });
                    
                    if (servicecount == 0) {
                        $('#ListDivShowServices').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"ListAllServices");
                    //setTimeout('AllServices("' + uid + '")', 30000);
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#ListSpecialServices#ERROR: " + textStatus + " MESSAGE: " + error);
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#ListAllServices#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ListSearchServices(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    //$('#SrvCenter').html('');
    $('#center').html('');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVNlYXJjaExpc3Q=Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SRVSEARCH, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var hosticon = this.ICON;
                            var shorthostname;
                            $('#ServiceListSearch').html('<div style="margin-top: 7px; margin-left: 7px;"><font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '</div>');
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            if (this.SERVICELIST.length > 0) {
                                $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + hostcount + 'Services"></table>');
                                var srvcount = 0;
                                $.each(this.SERVICELIST, function() {
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
                                    if (srvcount == 0) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else if (srvcount == 1) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    }
                                    servicecount++;
                                    srvcount++;
                                });
                                hostcount++;
                            }
                        });
                    });
                    
                    if (servicecount == 0) {
                        $('#ListDivShowServices').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#FooterDivTableHostsListView').html(servicecount + ' Services');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarService(uid,searchstring);
                    UpdateModView(uid,"ListAllServices");
                    //setTimeout('AllServices("' + uid + '")', 30000);
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#ListSpecialServices#ERROR: " + textStatus + " MESSAGE: " + error);
                },
                dataType: 'json',
                cache: false
            }); 
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#ListAllServices#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function KlickFunctionSidebarService(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    $('#ServiceListSearch').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchServicesSearch( b64uid + 'Jhdu8K',searchstring);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',10);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',10);
        }
    });
}