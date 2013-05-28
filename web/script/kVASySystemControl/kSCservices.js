/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Services<span id="servicecount"></span></td></tr></table>');
}

function AllServices(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        crossDomain: true,
        success: function(json) {
            var dds;
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    dds = value.ACTION;
                }
            });
            $.ajax({
                url: 'http://172.23.10.249:6560/proxy/json/?e=1&m=SG9zdEZ1bGxJbmZvHd78h3&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $('#DivShowServices').html('<div id="SubDivShowServices"></div>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HFI, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            //$('#SubDivShowServices').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td rowspan=2><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><b>' + shorthostname + '</b> <i>auf ' + this.NODE + '</i></td><td>' + this.HOST_STATUS + '</td><td>Zuletzt gepr&uuml;ft ' + this.TIMESTAMP + '</td></tr><tr><td>Servicename: ' + this.SERVICE_NAME + '</td><td colspan=2>' + this.OUTPUT + '</td></tr></table>');
                            $('#SubDivShowServices').append('<h3><img id="HostIcon" src=' + this.ICON + ' /><span id="HostText"><b>' + shorthostname + '</b> <i>auf ' + mnode + '</i></span><img id="HostStatusIcon" src="' + this.HOST_STATUS_ICON + '" /></h3><div id="' + hostcount + 'Services"></div>');
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
                                $('#' + hostcount + 'Services').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td>' + this.SERVICE_NAME + '</td><td colspan=2>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
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
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}