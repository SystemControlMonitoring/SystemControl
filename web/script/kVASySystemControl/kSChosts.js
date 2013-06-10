/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Hosts<span id="hostcount"></span></td></tr></table>');
}

function Reload(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllHosts(uid);
}

function AllHosts(uid) {
    var b64uid = $.base64.encode( uid );
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
    var b64uid = $.base64.encode( uid );
    $('img#GridHosts').removeClass('Border2px82abcc');
    $('img#GridHosts').addClass('Border2px004279');
    $('img#ListHosts').removeClass('Border2px004279');
    $('img#ListHosts').addClass('Border2px82abcc');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsSG9zdHM=Uhd739&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $('#ListCenter').html('<div id="HeadDivTableHostsListView"><span>Host Name</span><span>Node</span><span>Klasse</span><span>Cr</span><span>Wa</span><span>Un</span><span>Ok</span><span>Pe</span><span>Output</span></div><div id="DivTableHostsListView"></div><div id="FooterDivTableHostsListView"></div>');
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
                            $('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#FooterDivTableHostsListView').html(hostcount + ' Hosts');
                    $('#AjaxLoader').remove();
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