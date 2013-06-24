var t;

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Datenbanken<span id="dbcount"></span></td></tr></table>');
    
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
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllDBs(uid);
}

function AutoReloadStart(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
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
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div id="AutoReload"></div>');
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');  
    
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0TW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=ZGJzJkHu77',
        crossDomain: true,
        success: function (json) {
            if (json.MODVIEW == "ListAllDBs") {
                ListAllDBs(uid);
            } else {
                GridAllDBs(uid);
            }
        },
        dataType: 'json',
        cache: false
    });
}

function GridAllDBs(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#ListCenter').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#center').html('<section></section>');
    
    if (state.length > 0) {
        GridSpecialDBs(uid,state);
    } else {
        if (searchstring.length > 0) {
            GridSearchDBs(uid,searchstring);
        } else {
            GridDBs(uid);
        }
    }
}

function GridDBs(uid) {
    var b64uid = $.base64.encode( uid );
    $('img#ListHosts').removeClass('Border2px82abcc');
    $('img#ListHosts').addClass('Border2px004279');
    $('img#GridHosts').removeClass('Border2px004279');
    $('img#GridHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsRGF0YWJhc2VzZhd873&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.DATABASES, function() {
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.HOST; } else { var tmp = this.HOST; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if ( this.NAME.length > 25 ) { this.NAME = this.NAME.substr(0,22) + '...'; }
                            if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                            $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATE_ICON + '" /></div><div id="SrvTitleGrid">' + this.NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                            servicecount++;
                        });
                    });
                    if (servicecount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#dbcount').html(' (' + servicecount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"GridAllDBs");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function ShowSelect(state) {
    $('#ServiceGridSelect').html('\n\
        <select id="ServiceViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option value="">Alle Datenbanken</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Datenbanken ONLINE</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Datenbanken OFFLINE</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Datenbanken OFFLINE auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Datenbanken OFFLINE, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Datenbanken OFFLINE auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').val( state ).attr('selected',true);
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ShowSelectSearch() {
    $('#ServiceGridSelect').html('\n\
        <select id="ServiceViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option selected value="">Suche ...</option>\n\
            <option value="">Alle Datenbanken</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Datenbanken ONLINE</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Datenbanken OFFLINE</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Datenbanken OFFLINE auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Datenbanken OFFLINE, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Datenbanken OFFLINE auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function GridSpecialDBs(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('img#ListHosts').removeClass('Border2px82abcc');
    $('img#ListHosts').addClass('Border2px004279');
    $('img#GridHosts').removeClass('Border2px004279');
    $('img#GridHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VTdGF0dXNTZWxlY3Q=Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.DBSTATSEL, function() {
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.HOST; } else { var tmp = this.HOST; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if ( this.NAME.length > 25 ) { this.NAME = this.NAME.substr(0,22) + '...'; }
                            if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                            $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATE_ICON + '" /></div><div id="SrvTitleGrid">' + this.NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                            servicecount++;
                        });
                    });
                    if (servicecount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#dbcount').html(' (' + servicecount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"GridAllDBs");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function GridSearchDBs(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $('img#ListHosts').removeClass('Border2px82abcc');
    $('img#ListHosts').addClass('Border2px004279');
    $('img#GridHosts').removeClass('Border2px004279');
    $('img#GridHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VTZWFyY2hMaXN0Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var servicecount = 0;
                    $('body').append('<div id="ShowGridSearchBar" style="margin-top: 7px; margin-left: 7px;"><font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '</div>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.DBSEARCH, function() {
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.HOST; } else { var tmp = this.HOST; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if ( this.NAME.length > 25 ) { this.NAME = this.NAME.substr(0,22) + '...'; }
                            if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                            $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATE_ICON + '" /></div><div id="SrvTitleGrid">' + this.NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                            servicecount++;
                        });
                    });
                    if (servicecount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#dbcount').html(' (' + servicecount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarDBs(uid,searchstring);
                    UpdateModView(uid,"GridAllDBs");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

/*
 * List Hosts
 */

function ListAllDBs(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#center').html('');
    $('#ServiceGridSelect').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#ListCenter').html('<div id="ServicePane"><div id="ServiceListSearch"></div><div id="HeadDivTableServicesListView"><span>Host Name</span><span>Datenbank Name</span><span>Output</span></div></div><div id="ListDivShowServices"></div>');
    $('#ServicePane').append('<div id="VLOne"></div><div id="VLTwo"></div><div id="VLThree"></div>');
    if (state.length > 0) {
        ListSpecialDBs(uid,state);
    } else {
        if (searchstring.length > 0) {
            ListSearchDBs(uid,searchstring);
        } else {
            ListDBs(uid);
        }
    }
}

function ListDBs(uid) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsRGF0YWJhc2VzZhd873&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.DATABASES, function() {
                            var hosticon = this.ICON;
                            $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + servicecount + 'Services"></table>');
                            var shorthostname;
                            var srvcount = 0;
                            var cssclass;
                            if ( dds == "0" ) { shorthostname = this.HOST; } else { var tmp = this.HOST; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if ( this.NAME.length > 25 ) { this.NAME = this.NAME.substr(0,22) + '...'; }
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
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            } else if (srvcount == 1) {
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            } else {
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            }
                            servicecount++;
                            srvcount++;
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
                    
                    $('#dbcount').html(' (' + servicecount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"ListAllDBs");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function UpdateModView(uid,val1) {
    var b64uid = $.base64.encode( uid );
    var b64val1 = $.base64.encode( val1 );
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=VXBkYXRlTW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=ZGJzJkHu77&v1=' + b64val1 + 'HjKi88',
        crossDomain: true,
        dataType: 'json',
        cache: false
    });
}

function ListSpecialDBs(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VTdGF0dXNTZWxlY3Q=Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.DBSTATSEL, function() {
                            var hosticon = this.ICON;
                            $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + servicecount + 'Services"></table>');
                            var shorthostname;
                            var srvcount = 0;
                            var cssclass;
                            if ( dds == "0" ) { shorthostname = this.HOST; } else { var tmp = this.HOST; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if ( this.NAME.length > 25 ) { this.NAME = this.NAME.substr(0,22) + '...'; }
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
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            } else if (srvcount == 1) {
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            } else {
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            }
                            servicecount++;
                            srvcount++;
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
                    
                    $('#dbcount').html(' (' + servicecount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"ListAllDBs");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function ListSearchDBs(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=RGF0YWJhc2VTZWFyY2hMaXN0Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var servicecount = 0;
                    $('body').append('<div id="ShowGridSearchBar" style="margin-top: 7px; margin-left: 7px;"><font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '</div>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.DBSEARCH, function() {
                            var hosticon = this.ICON;
                            $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + servicecount + 'Services"></table>');
                            var shorthostname;
                            var srvcount = 0;
                            var cssclass;
                            if ( dds == "0" ) { shorthostname = this.HOST; } else { var tmp = this.HOST; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if ( this.NAME.length > 25 ) { this.NAME = this.NAME.substr(0,22) + '...'; }
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
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            } else if (srvcount == 1) {
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            } else {
                                $('.' + servicecount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATE_ICON + '"></img></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                            }
                            servicecount++;
                            srvcount++;
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
                    
                    $('#dbcount').html(' (' + servicecount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarDBs(uid,searchstring);
                    UpdateModView(uid,"ListAllDBs");
                },
                dataType: 'json',
                cache: false
            }); 
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