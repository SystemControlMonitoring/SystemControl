/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Services<span id="servicecount"></span></td></tr></table>');
}

function Reload(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllServices(uid);
}

function AllServices(uid) {
    var b64uid = $.base64.encode( uid );
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
    $('#SrvCenter').html('');
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
                    $('#center').html('<div id="DivShowServices"><div id="SubDivShowServices"></div></div>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HFI, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            //$('#SubDivShowServices').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td rowspan=2><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><b>' + shorthostname + '</b> <i>auf ' + this.NODE + '</i></td><td>' + this.HOST_STATUS + '</td><td>Zuletzt gepr&uuml;ft ' + this.TIMESTAMP + '</td></tr><tr><td>Servicename: ' + this.SERVICE_NAME + '</td><td colspan=2>' + this.OUTPUT + '</td></tr></table>');
                            $('#SubDivShowServices').append('<h3><img id="HostIcon" src=' + this.ICON + ' /><span id="HostText"><b>' + shorthostname + '</b> <i>auf ' + mnode + '</i></span><img id="HostStatusIcon" src="' + this.HOST_STATUS_ICON + '" /></h3><div id="ServiceLst" class="' + hostcount + 'Services"></div>');
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
                                $('.' + hostcount + 'Services').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.SERVICE_NAME + '</td><td colspan=2>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                                servicecount++;
                            });
                            hostcount++;
                        });
                    });
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    $('#SubDivShowServices').accordion({
                        icons: null,
                        heightStyle: "content"
                    });
                    UpdateModView(uid,"GridAllServices");
                    //setTimeout('AllServices("' + uid + '")', 30000);
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
    if (state.length > 0) {
        ListSpecialServices(uid,state);
    } else {
        ListServices(uid);
    }
}

function ListServices(uid) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
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
                    $('#SrvCenter').html('<div id="ServiceListSelect"></div><div id="HeadDivTableServicesListView"><span>Host Name</span><span>Service Name</span><span>Output</span></div><div id="ListDivShowServices"></div><div id="FooterDivTableHostsListView"></div>');
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
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#FooterDivTableHostsListView').html(servicecount + ' Services');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"ListAllServices");
                    //setTimeout('AllServices("' + uid + '")', 30000);
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
            <option value="' + $.base64.encode("aw") + 'KdhU7Z">Alle Services mit Status: WARNING</option>\n\
            <option value="' + $.base64.encode("ac") + 'KdhU7Z">Alle Services mit Status: CRITICAL</option>\n\
            <option value="' + $.base64.encode("au") + 'KdhU7Z">Alle Services mit Status: UNKNOWN</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Alle Probleme auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Alle Probleme, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Alle Probleme auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("woh") + 'KdhU7Z">Services WARNING auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wfh") + 'KdhU7Z">Services WARNING auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnaoh") + 'KdhU7Z">Services WARNING, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("waoh") + 'KdhU7Z">Services WARNING, bekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnafh") + 'KdhU7Z">Services WARNING, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wafh") + 'KdhU7Z">Services WARNING, bekannt auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("coh") + 'KdhU7Z">Services CRITICAL auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cfh") + 'KdhU7Z">Services CRITICAL auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnaoh") + 'KdhU7Z">Services CRITICAL, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("caoh") + 'KdhU7Z">Services CRITICAL, bekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnafh") + 'KdhU7Z">Services CRITICAL, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cafh") + 'KdhU7Z">Services CRITICAL, bekannt auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uoh") + 'KdhU7Z">Services UNKNOWN auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("ufh") + 'KdhU7Z">Services UNKNOWN auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unaoh") + 'KdhU7Z">Services UNKNOWN, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uaoh") + 'KdhU7Z">Services UNKNOWN, bekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unafh") + 'KdhU7Z">Services UNKNOWN, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uafh") + 'KdhU7Z">Services UNKNOWN, bekannt auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').val( state ).attr('selected',true);
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ListSpecialServices(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $('#SrvCenter').html('<div id="ServiceListSelect"></div><div id="HeadDivTableServicesListView"><span>Host Name</span><span>Service Name</span><span>Output</span></div><div id="ListDivShowServices"></div><div id="FooterDivTableHostsListView"></div>');
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
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#FooterDivTableHostsListView').html(servicecount + ' Services');
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
