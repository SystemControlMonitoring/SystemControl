/* 
 * kSCdatabase.js
 */

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href="../">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a href="../hosts.jsp">Hosts</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>' + $.base64.decode( urlPara('c') ) + '</td></tr></table>');
}

function Reload(uid) {
    $('#theme-roller').append('<img id="AjaxLoader" src="../layout/images/ajax-loader.gif">');
    SysInfo(uid);
    SrvInfo(uid);
    HostInformations(uid);
}

function SysInfo(uid) {
    var b64uid = $.base64.encode( uid );
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=U1lTSU5GTw==Jkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(point) {
            $('section','#SubCenter').html('<a href="sysinfo.jsp?h=' + node + '&c=' + client + '&t=' + $.base64.encode( point.TYPE ) + '" class="ticker" title=""><span class="hname"></span><br></br><font class="os"></font><br></br><font class="subcontent" id="cpu"></font><br><font class="subcontent" id="ram"></font><br><font class="subcontent" id="startup"></font></a>');
            $.each(point, function(name,data) {
		if (name == "HOSTNAME") {
                    $('.hname').append('H: ' + data + '');
                } else if (name == "OS") {
                    $('.os').append('' + data + '');
		} else if (name == "CPU") {
                    $('#cpu').append('CPU: ' + data + '');
                } else if (name == "RAM") {
                    $('#ram').append('RAM: ' + data + '');
                } else if (name == "STARTUP") {
                    $('#startup').append('Startup: ' + data + '');
                }
            });
            DbInfo(b64uid);
        },
        dataType: 'json',
        cache: false
    });
}

function DbInfo(uid) {
    //var b64uid = $.base64.encode( uid );
    var b64uid = uid;
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=REJJTkZPJkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(json) {     
            var i=0;
            $.each(json, function() {
                $('section','#SubCenter').append('<a href="http://172.23.13.123:6555/console/?module=DB&db=ORCL2" class="ticker" title=""><span class="dbname' + i + '"></span><br></br><font class="dbversion' + i + '"></font><br></br><font class="subcontent" id="dbarchiver' + i + '"></font><br><font class="subcontent" id="dbstat' + i + '"></font><br><font class="subcontent" id="dbblocked' + i + '"></font><br><font class="subcontent" id="dbstartup' + i + '"></font><br><font class="subcontent" id="dbdbstatus' + i + '"></font><br><font class="subcontent" id="dbactive_status' + i + '"></font><br><font class="subcontent" id="dblogins' + i + '"></font><br><font class="subcontent" id="dbrole' + i + '"></font><br></a>');
                $('.dbname' + i).append('DB: ' + this.DBNAME);
                $('.dbversion' + i).append(this.VERSION);
                $('#dbarchiver' + i).append('Archiver: ' + this.ARCHIVER);
                $('#dbstat' + i).append('Status: ' + this.STATUS);
                $('#dbblocked' + i).append('Blocked: ' + this.BLOCKED);
                $('#dbstartup' + i).append('Startup: ' + this.STARTUP);
                $('#dbdbstatus' + i).append('DB Status: ' + this.DBSTATUS);
                $('#dbactive_status' + i).append('Active Status: ' + this.ACTIVE_STATUS);
                $('#dblogins' + i).append('Logins: ' + this.LOGINS);
                $('#dbrole' + i).append('Role: ' + this.ROLE);
                i++;
            });
            $('#AjaxLoader').remove();
        },
        dataType: 'json',
        cache: false
    });
}

function SrvInfo(uid) {
    var b64uid = $.base64.encode( uid );
    //var b64uid = uid;
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=U2VydmljZUhvc3RMaXN0KhdU8Z&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(json) {     
            var i=0;
            $('#HostServices').html('<div id="HeadHostSrvList"><span>Service Name</span><span>Output</span></div><div id="HostSrvList"></div><div id="FooterHostSrvList"></div>');
            $.each(json, function() {
                //var hostname = this.HOST_NAME;
                //var shorthostname;
                var cssclass;
                //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                if (this.SERVICE_STATUS == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "taovcr"; } else if (this.SERVICE_STATUS == "3") { cssclass = "taovun"; } else { cssclass = "taovok"; }
                if (this.SERVICE_NAME == "") { cssclass = "taovcr"; this.SERVICE_NAME = "HOST"; }
                $('#HostSrvList').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img id="ImgServiceStatusHl" src="../' + this.SERVICE_STATUS_ICON + '" /></td><td>' + this.SERVICE_NAME + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                i++;
            });
            $('#FooterHostSrvList').html(i + ' Services');
        },
        dataType: 'json',
        cache: false
    });
}

function HostInformations(uid) {
    var b64uid = $.base64.encode( uid );
    //var b64uid = uid;
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=SG9zdFN1bW1hcnk=KhdU8Z&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(json) {     
            $('#HostSummary').html('<div id="DivHostSummary"></div>');
            $('#HostStatus').html('<div id="DivHostStatus"></div>');
            /**/
            $('#DivHostStatus').append('<img id="HostTypeIcon" src="../' + json.ICON + '" /><span id="HostTypeDesc">' + json.DESC + '</span>');
            if (json.STATE == "0") { $('#DivHostStatus').append('<span id="HostTypeState">ONLINE</span>'); } else { $('#DivHostStatus').append('<span id="HostTypeState">OFFLINE</span>'); }
            $('#DivHostStatus').append('<span id="HostTypeAgent">Agent Version ' + json.AGENT_VERSION + '</span>');
            $('#DivHostStatus').append('<span id="HostTypeAgentEt">Ausf&uuml;hrungszeit ' + json.EXEC_TIME + '</span>');
            $('#DivHostStatus').append('<span id="HostTypeStartup">Gestartet: ' + json.STARTUP + '</span>');
            $('#DivHostStatus').append('<span id="HostTypeUptime">Aktiv seit: ' + json.UPTIME + '</span>');
            /**/
            $('#DivHostSummary').append('<span id="HostSumName"><font>Konfigurierter Host-Name:</font> ' + json.NAME + '</span>');
            $('#DivHostSummary').append('<span id="HostSumNode"><font>Monitoringnode:</font> ' + $.base64.decode( node ) + '</span>');
            $('#DivHostSummary').append('<span id="HostSumIP"><font>IPv4:</font> ' + json.ADDRESS + '</span>');
            $('#DivHostSummary').append('<span id="HostSumLSt"><font>Zuletzt gepr&uuml;ft:</font><br>' + json.LAST_CHECK_ISO + '</span>');
            $('#DivHostSummary').append('<span id="HostSumNSt"><font>N&auml;chste Pr&uuml;fung:</font><br>' + json.NEXT_CHECK_ISO + '</span>');
            $('#DivHostSummary').append('<span id="HostSumHgp"><font>Mitglied folgender Hostgruppen:</font><br>' + json.HOSTGROUPS + '</span>');
            $('#DivHostSummary').append('<div id="HostSumLocalAccess"><span style="float: left;">Konsolen Zug&auml;nge</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-e"></span></div>');
            var socolor="default"; var sccolor="default"; var swcolor="default"; var sucolor="default"; var spcolor="default"; 
            
            if (json.SRV_OK != 0) { socolor = " ok"; }
            if (json.SRV_CR != 0) { sccolor = " cr"; }
            if (json.SRV_UN != 0) { sucolor = " un"; }
            if (json.SRV_WA != 0) { swcolor = " wa"; }
            if (json.SRV_PE != 0) { spcolor = " pe"; }
            
            $('#DivHostStatus').append('<div id="HostSumServices"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Services</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td class="' + socolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + json.SRV_OK + '</a></b> Ok</td><td class="' + swcolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + json.SRV_WA + '</a></b> Warnung</td><td class="' + sccolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + json.SRV_CR + '</a></b> Kritisch</td><td class="' + sucolor + '"><b><a href="/monitoring.chtml?view=3&status=8">' + json.SRV_UN + '</a></b> Unbekannt</td><td class="' + spcolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + json.SRV_PE + '</a></b> Ausstehend</td></tr></table></div>');
            
        },
        dataType: 'json',
        cache: false
    });
}