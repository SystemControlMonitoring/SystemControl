/* 
 * kVASy(R) System Control Liveticker Functions 03.2013 S.Baresel
 * 
 * --------------------------------------------------------------
 * Define Div Element:
 * <div id="SlimTaov"></div>
 * 
 * Call:
 * <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                jQuery.support.cors = true;
                SlimTaov" RemoteUser ");
            });
        });
   </script>
 * --------------------------------------------------------------
 */

var chartserviceper;
var charthostper;
var servicepie;
var hostpie;

function SlimTaov(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=U2xpbVRhb3Y=Hkd83k&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var dbocolor = " default"; var dbccolor = " default"; var DB_OK_ALL = 0; var DB_OK = 0; var DB_CR_ALL = 0; var DB_CR_A = 0; var DB_CR_NA = 0; var DB_CR_NA_OFF = 0; var cnodet; var cnode = 0; var ocolor = " default"; var ccolor = " default"; var ucolor = " default"; var socolor = " default"; var sccolor = " default"; var sucolor = " default"; var swcolor = " default"; var spcolor = " default";var HOST_OK = 0; var HOST_CR = 0; var HOST_CR_NA = 0; var HOST_CR_A = 0; var HOST_UN = 0; var HOST_UN_NA = 0; var HOST_UN_A = 0; var SERVICE_OK_ALL = 0; var SERVICE_OK = 0; var SERVICE_WA_ALL = 0; var SERVICE_WA = 0; var SERVICE_WA_NA = 0; var SERVICE_WA_A = 0; var SERVICE_WA_NA_OFF = 0; var SERVICE_CR_ALL = 0; var SERVICE_CR = 0; var SERVICE_CR_NA = 0; var SERVICE_CR_A = 0; var SERVICE_CR_NA_OFF = 0; var SERVICE_UN_ALL = 0; var SERVICE_UN = 0; var SERVICE_UN_NA = 0; var SERVICE_UN_A = 0; var SERVICE_UN_NA_OFF = 0; var SERVICE_PE = 0;
            var mwocolor = " default"; var mwccolor = " default"; var MW_OK_ALL = 0; var MW_OK = 0; var MW_CR_ALL = 0; var MW_CR_A = 0; var MW_CR_NA = 0; var MW_CR_NA_OFF = 0;
            $('#SlimTaov').html('<div id="Nodes"></div>');
            $.each(json, function() {
                HOST_OK = parseInt(this.HOST.OK.COUNT, 10) + HOST_OK; 
                HOST_CR = parseInt(this.HOST.CRITICAL.COUNT, 10) + HOST_CR; 
                HOST_CR_NA = parseInt(this.HOST.CRITICAL.NACK, 10) + HOST_CR_NA; 
                HOST_CR_A = parseInt(this.HOST.CRITICAL.ACK, 10) + HOST_CR_A; 
                HOST_UN = parseInt(this.HOST.UNREACHABLE.COUNT, 10) + HOST_UN; 
                HOST_UN_NA = parseInt(this.HOST.UNREACHABLE.NACK, 10) + HOST_UN_NA; 
                HOST_UN_A = parseInt(this.HOST.UNREACHABLE.ACK, 10) + HOST_UN_A; 
                
                SERVICE_OK_ALL = parseInt(this.SERVICE.OK.COUNT_ALL, 10) + SERVICE_OK_ALL;
                SERVICE_OK = parseInt(this.SERVICE.OK.COUNT_ON, 10) + SERVICE_OK; 
                
                SERVICE_WA_ALL = parseInt(this.SERVICE.WARNING.COUNT_ALL, 10) + SERVICE_WA_ALL;
                SERVICE_WA = parseInt(this.SERVICE.WARNING.COUNT_ON, 10) + SERVICE_WA; 
                SERVICE_WA_NA = parseInt(this.SERVICE.WARNING.NACK_ON, 10) + SERVICE_WA_NA; 
                SERVICE_WA_A = parseInt(this.SERVICE.WARNING.ACK_ON, 10) + SERVICE_WA_A; 
                SERVICE_WA_NA_OFF = parseInt(this.SERVICE.WARNING.NACK_OFF, 10) + SERVICE_WA_NA_OFF; 
                
                SERVICE_CR_ALL = parseInt(this.SERVICE.CRITICAL.COUNT_ALL, 10) + SERVICE_CR_ALL;
                SERVICE_CR = parseInt(this.SERVICE.CRITICAL.COUNT_ON, 10) + SERVICE_CR; 
                SERVICE_CR_NA = parseInt(this.SERVICE.CRITICAL.NACK_ON, 10) + SERVICE_CR_NA; 
                SERVICE_CR_A = parseInt(this.SERVICE.CRITICAL.ACK_ON, 10) + SERVICE_CR_A; 
                SERVICE_CR_NA_OFF = parseInt(this.SERVICE.CRITICAL.NACK_OFF, 10) + SERVICE_CR_NA_OFF; 
                
                SERVICE_UN_ALL = parseInt(this.SERVICE.UNKNOWN.COUNT_ALL, 10) + SERVICE_UN_ALL;
                SERVICE_UN = parseInt(this.SERVICE.UNKNOWN.COUNT_ON, 10) + SERVICE_UN; 
                SERVICE_UN_NA = parseInt(this.SERVICE.UNKNOWN.NACK_ON, 10) + SERVICE_UN_NA; 
                SERVICE_UN_A = parseInt(this.SERVICE.UNKNOWN.ACK_ON, 10) + SERVICE_UN_A; 
                SERVICE_UN_NA_OFF = parseInt(this.SERVICE.UNKNOWN.NACK_OFF, 10) + SERVICE_UN_NA_OFF; 
                
                SERVICE_PE = parseInt(this.SERVICE.PENDING.COUNT_ON, 10) + SERVICE_PE;
                
                DB_OK_ALL = parseInt(this.DATABASE.ONLINE.COUNT_ALL, 10) + DB_OK_ALL;
                DB_OK = parseInt(this.DATABASE.ONLINE.COUNT_ON, 10) + DB_OK; 
                DB_CR_ALL = parseInt(this.DATABASE.OFFLINE.COUNT_ALL, 10) + DB_CR_ALL;
                DB_CR_A = parseInt(this.DATABASE.OFFLINE.ACK_ON, 10) + DB_CR_A; 
                DB_CR_NA = parseInt(this.DATABASE.OFFLINE.NACK_ON, 10) + DB_CR_NA; 
                DB_CR_NA_OFF = parseInt(this.DATABASE.OFFLINE.NACK_OFF, 10) + DB_CR_NA_OFF;
                
                MW_OK_ALL = parseInt(this.MIDDLEWARE.ONLINE.COUNT_ALL, 10) + MW_OK_ALL;
                MW_OK = parseInt(this.MIDDLEWARE.ONLINE.COUNT_ON, 10) + MW_OK; 
                MW_CR_ALL = parseInt(this.MIDDLEWARE.OFFLINE.COUNT_ALL, 10) + MW_CR_ALL;
                MW_CR_A = parseInt(this.MIDDLEWARE.OFFLINE.ACK_ON, 10) + MW_CR_A; 
                MW_CR_NA = parseInt(this.MIDDLEWARE.OFFLINE.NACK_ON, 10) + MW_CR_NA; 
                MW_CR_NA_OFF = parseInt(this.MIDDLEWARE.OFFLINE.NACK_OFF, 10) + MW_CR_NA_OFF;
                
                cnode++;
            });
            /* BG Color */
            if (HOST_OK != 0) { ocolor = " ok"; }
            if (HOST_CR_NA != 0) { ccolor = " cr"; }
            if (HOST_UN_NA != 0) { ucolor = " un"; }
            if (SERVICE_OK != 0) { socolor = " ok"; }
            if (SERVICE_CR_NA != 0) { sccolor = " cr"; }
            if (SERVICE_UN_NA != 0) { sucolor = " un"; }
            if (SERVICE_WA_NA != 0) { swcolor = " wa"; }
            if (SERVICE_PE != 0) { spcolor = " pe"; }
            if (DB_OK != 0) { dbocolor = " ok"; }
            if (DB_CR_NA != 0) { dbccolor = " cr"; }
            if (MW_OK != 0) { mwocolor = " ok"; }
            if (MW_CR_NA != 0) { mwccolor = " cr"; }
            if (cnode == 1) { cnodet = "1 Monitoringnode"; } else { cnodet = cnode + " Monitoringnodes"; }
            
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Hosts</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span><span class="Notice" style="float: right;">' + cnodet + '</span></td></tr><tr valign=middle><td class="' + ocolor + '"><b><a href="/' + suburl + '/hosts/?s=dXA=KdhU7Z">' + HOST_OK + '</a></b> Ok</td><td class="' + ccolor + '"><b><a href="/' + suburl + '/hosts/?s=ZG9ub2Fjaw==KdhU7Z">' + HOST_CR_NA + '</a></b> | <b><a href="/' + suburl + '/hosts/?s=ZG9hY2s=KdhU7Z">' + HOST_CR_A + '</a></b> Offline</td><td class="' + ucolor + '"><b><a href="/' + suburl + '/hosts/?s=dW5ub2Fjaw==KdhU7Z">' + HOST_UN_NA + '</a></b> | <b><a href="/' + suburl + '/hosts/?s=dW5hY2s=KdhU7Z">' + HOST_UN_A + '</a></b> Nicht Erreichbar</td></tr></table></span>');
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Services</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td class="default" title="Gesamt Ok.">' + SERVICE_OK_ALL + '</td><td class="' + socolor + '" title="Auf ONLINE Hosts."><b><a href="/' + suburl + '/services/?s=YW8=KdhU7Z">' + SERVICE_OK + '</a></b> Ok</td><td class="default" title="Gesamt Warnung.">' + SERVICE_WA_ALL + '</td><td class="' + swcolor + '"><b><a href="/' + suburl + '/services/?s=d25hb2g=KdhU7Z">' + SERVICE_WA_NA + '</a></b> | <b><a href="/' + suburl + '/services/?s=d2FvaA==KdhU7Z">' + SERVICE_WA_A + '</a></b> | <b><a href="/' + suburl + '/services/?s=d25hZmg=KdhU7Z">' + SERVICE_WA_NA_OFF + '</a></b> Warnung</td><td class="default" title="Gesamt Kritisch.">' + SERVICE_CR_ALL + '</td><td class="' + sccolor + '"><b><a href="/' + suburl + '/services/?s=Y25hb2g=KdhU7Z">' + SERVICE_CR_NA + '</a></b> | <b><a href="/' + suburl + '/services/?s=Y2FvaA==KdhU7Z">' + SERVICE_CR_A + '</a></b> | <b><a href="/' + suburl + '/services/?s=Y25hZmg=KdhU7Z">' + SERVICE_CR_NA_OFF + '</a></b> Kritisch</td><td class="default" title="Gesamt Unbekannt.">' + SERVICE_UN_ALL + '</td><td class="' + sucolor + '"><b><a href="/' + suburl + '/services/?s=dW5hb2g=KdhU7Z">' + SERVICE_UN_NA + '</a></b> | <b><a href="/' + suburl + '/services/?s=dWFvaA==KdhU7Z">' + SERVICE_UN_A + '</a></b> | <b><a href="/' + suburl + '/services/?s=dW5hZmg=KdhU7Z">' + SERVICE_UN_NA_OFF + '</a></b> Unbekannt</td><td class="' + spcolor + '"><b><a href="">' + SERVICE_PE + '</a></b> Ausstehend</td></tr></table></span>');
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Datenbanken</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td class="default" title="Gesamt Online.">' + DB_OK_ALL + '</td><td class="' + dbocolor + '" title="Auf ONLINE Hosts."><b><a href="/' + suburl + '/database/?s=YW8=KdhU7Z">' + DB_OK + '</a></b> Online</td><td class="default" title="Gesamt Offline.">' + DB_CR_ALL + '</td><td class="' + dbccolor + '"><b><a href="/' + suburl + '/database/?s=YXBuYW9oKdhU7Z">' + DB_CR_NA + '</a></b> | <b><a href="/' + suburl + '/database/?s=YXBhb2g=KdhU7Z">' + DB_CR_A + '</a></b> | <b><a href="/' + suburl + '/database/?s=YXBkaA==KdhU7Z">' + DB_CR_NA_OFF + '</a></b> Offline</td></tr></table></span>');
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Middleware</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td class="default" title="Gesamt Online.">' + MW_OK_ALL + '</td><td class="' + mwocolor + '" title="Auf ONLINE Hosts."><b><a href="/' + suburl + '/middleware/?s=YW8=KdhU7Z">' + MW_OK + '</a></b> Online</td><td class="default" title="Gesamt Offline.">' + MW_CR_ALL + '</td><td class="' + mwccolor + '"><b><a href="/' + suburl + '/middleware/?s=YXBuYW9oKdhU7Z">' + MW_CR_NA + '</a></b> | <b><a href="/' + suburl + '/middleware/?s=YXBhb2g=KdhU7Z">' + MW_CR_A + '</a></b> | <b><a href="/' + suburl + '/middleware/?s=YXBkaA==KdhU7Z">' + MW_CR_NA_OFF + '</a></b> Offline</td></tr></table></span>');
            
            /*
             * Hosts
             */
            
            var hge = HOST_OK + HOST_CR + HOST_UN;
            
            ShowHostPie();
            ShowHostPer();
            
            charthostper.addSeries({
                name: "OK",
                data: [ ((HOST_OK*100)/hge) ]
            });
            charthostper.addSeries({
                name: "CR",
                data: [ ((HOST_CR*100)/hge) ]
            });
            charthostper.addSeries({
                name: "UN",
                data: [ ((HOST_UN*100)/hge) ]
            });
            
            hostpie.addSeries({
               type: "pie",
               name: "",
               data: [ ['Online',HOST_OK], ['Offline',HOST_CR], ['Nicht Erreichbar',HOST_UN] ]
            });
            
            /*
             * Services
             */
            
            var sok = SERVICE_OK;
            var swa = SERVICE_WA;
            var scr = SERVICE_CR;
            var sun = SERVICE_UN;
            var sge = sok + swa + scr + sun;
            
            ShowServicePie();
            ShowServicePer();
            
            chartserviceper.addSeries({
                name: "OK",
                data: [ ((SERVICE_OK*100)/sge) ]
            });
            
            chartserviceper.addSeries({
                name: "WA",
                //data: [ (((SERVICE_WA - SERVICE_WA_NA_OFF)*100)/sge) ]
                data: [ (((SERVICE_WA)*100)/sge) ]
            });
            
            chartserviceper.addSeries({
                name: "CR",
                //data: [ (((SERVICE_CR - SERVICE_CR_NA_OFF)*100)/sge) ]
                data: [ (((SERVICE_CR)*100)/sge) ]
            });
            
            chartserviceper.addSeries({
                name: "UN",
                //data: [ (((SERVICE_UN - SERVICE_UN_NA_OFF)*100)/sge) ]
                data: [ (((SERVICE_UN)*100)/sge) ]
            });

            servicepie.addSeries({
               type: "pie",
               name: "",
               //data: [ ['Ok',SERVICE_OK], ['Warnung',(SERVICE_WA - SERVICE_WA_NA_OFF)], ['Kritisch',(SERVICE_CR - SERVICE_CR_NA_OFF)], ['Unbekannt',(SERVICE_UN - SERVICE_UN_NA_OFF)] ]
               data: [ ['Ok',SERVICE_OK], ['Warnung',(SERVICE_WA)], ['Kritisch',(SERVICE_CR)], ['Unbekannt',(SERVICE_UN)] ]
            });
            
            
            setTimeout('SlimTaov("' + uid + '")', 30000);
        },
        dataType: 'json',
        cache: false
    });
}

function SubSlimTaov(uid) {
    SlimTaov(uid);
}

function ShowCritical(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=U2hvd0NyaXRpY2FsHjdz6d&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var srvcount = 0;
            $('#DivShowCritical').html('<div id="SubDivShowCritical"></div>');
            $.each(json, function() {                        
                var hostname = this.HOST_NAME;
                var shorthostname;
                var cssclass;
                if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                if (this.SERVICE_STATUS == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "taovcr"; } else { cssclass = "taovun"; }
                if (this.SERVICE_NAME == "") { cssclass = "taovcr"; this.SERVICE_NAME = "HOST"; }
                $('#SubDivShowCritical').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td rowspan=2><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><b>' + shorthostname + '</b> <i>auf ' + this.NODE + '</i></td><td id="' + srvcount + 'SrvStatus">' + this.HOST_STATUS + '</td><td>Zuletzt gepr&uuml;ft ' + this.TIMESTAMP + '</td></tr><tr><td>Servicename: ' + this.SERVICE_NAME + '</td><td colspan=2>' + this.OUTPUT + '</td></tr></table>');
                if (this.ACK == "1") { $('#' + srvcount + 'SrvStatus').append('<div id="TaovImgServiceAck"><img src="layout/images/icons/eye.png" title="Service Problem ist bearbeitet." /></div>'); }
                if (this.CMT == "") { /**/ } else { $('#' + srvcount + 'SrvStatus').append('<div id="TaovImgServiceCmt"><img src="layout/images/icons/balloon-left.png" title="Service wurde kommentiert." /></div>'); }
                srvcount++;
            });
            if (srvcount == 0) {
                $('#SubDivShowCritical').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
            }
            $('#FooterDivShowCritical').html('' + srvcount + ' Probleme');
            setTimeout('ShowCritical("' + uid + '")', 30000);
        },
        dataType: 'json',
        cache: false
    }); 
}

function ShowAllComments(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=U2hvd0FsbENvbW1lbnRzKi88uU&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var srvcount = 0;
            $('#Comments').html('<div id="SubComments"><table id="SubCommentsTable" cellpadding=0 cellspacing=0></table></div>');
            $.each(json, function() {                        
                var hostname = this.HOST_NAME;
                var shorthostname;
                var cssclass;
                if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                $('#SubComments').append('<tr><td><table id="TableComments"><tr><td class="TextHeader"><i>' + this.AUTHOR + '</i> am ' + this.TIMESTAMP_ISO + '</td></tr><tr><td class="TextSrvHst">F&uuml;r Service: <b>' + this.SERVICE_NAME + '</b> auf <b>' + shorthostname + '</b>(<i>' + this.NODE + '</i>)</td></tr><tr><td class="TextComment">' + this.COMMENT + '</td></tr></table></td></tr>');
                srvcount++;
            });
            if (srvcount == 0) {
                $('#SubComments').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
            }
            $('#FooterComments').html('' + srvcount + ' Kommentare');
            setTimeout('ShowAllComments("' + uid + '")', 30000);
        },
        dataType: 'json',
        cache: false
    }); 
}

function ModShowCritical(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/proxy/json/?e=1&m=U2hvd0NyaXRpY2FsHjdz6d&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var srvcount = 0;
            $('#DivShowCritical').html('<div id="SubDivShowCritical"></div>');
            $.each(json, function() {                        
                var hostname = this.HOST_NAME;
                var shorthostname;
                var cssclass;
                if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                if (this.SERVICE_STATUS == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "taovcr"; } else { cssclass = "taovun"; }
                $('#SubDivShowCritical').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td rowspan=2><img id="ImgServiceStatus" src="../' + this.SERVICE_STATUS_ICON + '"></img></td><td><b>' + shorthostname + '</b> <i>auf ' + this.NODE + '</i></td><td id="' + srvcount + 'SrvStatus">' + this.HOST_STATUS + '</td><td>Zuletzt gepr&uuml;ft ' + this.TIMESTAMP + '</td></tr><tr><td>Servicename: ' + this.SERVICE_NAME + '</td><td colspan=2>' + this.OUTPUT + '</td></tr></table>');
                if (this.ACK == "1") { $('#' + srvcount + 'SrvStatus').append('<div id="TaovImgServiceAck"><img src="../layout/images/icons/eye.png" title="Service Problem ist bearbeitet." /></div>'); }
                if (this.CMT == "") { /**/ } else { $('#' + srvcount + 'SrvStatus').append('<div id="TaovImgServiceCmt"><img src="../layout/images/icons/balloon-left.png" title="Service wurde kommentiert." /></div>'); }
                srvcount++;
            });
            $('#FooterDivShowCritical').html('' + srvcount + ' Probleme');
            setTimeout('ModShowCritical("' + uid + '")', 30000);
        },
        dataType: 'json',
        cache: false
    }); 
}

/*
 * Service Tactical Overview
 */

function ShowServicePie() {
    Highcharts.setOptions({
        colors: ['#088A08', 'orange', '#ff3333', '#C800C8']
    });
    servicepie = new Highcharts.Chart({
	chart: {
	    renderTo: 'ServicePie',
	    type: 'pie',
	    borderRadius: 0,
            borderWidth: 0,
            borderColor: '#82abcc',
            width: 350,
            height: 300,
            backgroundColor: null,
            animation: false
        },
        credits: {
            enabled: false
	},
        exporting: {
            enabled: false
	},
	title: {
            text: ' ',
            style: {
		color: '#ffffff',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            }
	},
	yAxis: {
            enabled: false
	},
        plotOptions: {
            pie: {
                borderWidth: 0,
                shadow: false,
		animation: false,
		dataLabels: {
                    enabled: true,
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px',
                    connectorWidth: 0,
                    distance: -13,
                    formatter: function() {
			// display only if larger than 1
                        return this.y > 0 ? ''+ this.y +''  : null;
                    }
                },
                showInLegend: true
            }
	},
	tooltip: {
            enabled: false
	},
	legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            itemStyle: {
		cursor: 'pointer',
		color: '#ffffff',
                fontFamily: 'SansProLight',
                fontSize: '14px'
            },
            itemHoverStyle: {
		color: '#ffffff',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            }
	}
    });
}

function ShowServicePer() {
    Highcharts.setOptions({
        colors: ['#088A08', 'orange', '#ff3333', '#C800C8']
    });
    chartserviceper = new Highcharts.Chart({
        chart: {
            renderTo: 'ServicePer',
            type: 'column',
            width: 150,
            height: 300,
            borderRadius: 0,
            borderWidth: 0,
            plotBackgroundColor: null,
            backgroundColor: null,
            animation: false
        },
	credits: {
            enabled: false
	},
	legend: {
            enabled: false
	},
	exporting: {
            enabled: false
	},
	title: {
            text: ' ',
            style: {
		color: '#ffffff',
		fontSize: '14px',
                fontFamily: 'SansProLight'
            }
	},
	xAxis: {
            gridLineWidth: 0,
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: false
            }
	},
	yAxis: {
            gridLineWidth: 1,
            gridLineColor: '#004c8a',
            offset: 15,
            lineColor: '#82abcc',
            lineWidth: 1,
            tickColor: '#82abcc',
            tickWidth: 1,
            tickLength: 4,
            tickPosition: 'inside',
            labels: {
                enabled: true,
                style: {
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px'
                },
                formatter: function() {
                    return this.value + "%";
                }
            },
            min: 0,
            max: 100,
            title: {
                text: ' '
            },
            stackLabels: {
		enabled: false,
		style: {
                    fontWeight: 'bold',
                    color: '#82abcc',
                    fontFamily: 'SansProLight',
                    fontSize: '14px'
		},
		formatter: function() {
                    return this.total + " MB";
                }
            }
	},
	tooltip: {
            enabled: false
	},
	plotOptions: {
            column: {
                borderWidth: 0,
                shadow: false,
		animation: false,                        
		stacking: 'normal',
		dataLabels: {
                    enabled: true,
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px',
                    connectorWidth: 0,
                    distance: -15,
                    formatter: function() {
			// display only if larger than 1
                        return this.y > 0 ? ''+ Math.round(this.y) +'%'  : null;
                    }
                }
            }
	}
    });
}

/*
 * Host Tacticalo Overview
 */

function ShowHostPie() {
    Highcharts.setOptions({
        colors: ['#088A08', '#ff3333', '#C800C8']
    });
    hostpie = new Highcharts.Chart({
	chart: {
	    renderTo: 'HostPie',
	    type: 'pie',
	    borderRadius: 0,
            borderWidth: 0,
            borderColor: '#82abcc',
            width: 350,
            height: 300,
            backgroundColor: null,
            animation: false
        },
        credits: {
            enabled: false
	},
        exporting: {
            enabled: false
	},
	title: {
            text: ' ',
            style: {
		color: '#ffffff',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            }
	},
	yAxis: {
            enabled: false
	},
        plotOptions: {
            pie: {
                borderWidth: 0,
                shadow: false,
		animation: false,
		dataLabels: {
                    enabled: true,
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px',
                    connectorWidth: 0,
                    distance: -15,
                    formatter: function() {
			// display only if larger than 1
                        return this.y > 0 ? ''+ this.y +''  : null;
                    }
                },
                showInLegend: true
            }
	},
	tooltip: {
            enabled: false
	},
	legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            itemStyle: {
		cursor: 'pointer',
		color: '#ffffff',
                fontFamily: 'SansProLight',
                fontSize: '14px'
            },
            itemHoverStyle: {
		color: '#ffffff',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            }
	}
    });
}

function ShowHostPer(uid) {
    Highcharts.setOptions({
        colors: ['#088A08', '#ff3333', '#C800C8']
    });
    charthostper = new Highcharts.Chart({
        chart: {
            renderTo: 'HostPer',
            type: 'column',
            width: 150,
            height: 300,
            borderRadius: 0,
            borderWidth: 0,
            plotBackgroundColor: null,
            backgroundColor: null,
            animation: false
        },
	credits: {
            enabled: false
	},
	legend: {
            enabled: false
	},
	exporting: {
            enabled: false
	},
	title: {
            text: ' ',
            style: {
		color: '#ffffff',
		fontSize: '14px',
                fontFamily: 'SansProLight'
            }
	},
	xAxis: {
            gridLineWidth: 0,
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: false
            }
	},
	yAxis: {
            gridLineWidth: 1,
            gridLineColor: '#004c8a',
            offset: 15,
            lineColor: '#82abcc',
            lineWidth: 1,
            tickColor: '#82abcc',
            tickWidth: 1,
            tickLength: 4,
            tickPosition: 'inside',
            labels: {
                enabled: true,
                style: {
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px'
                },
                formatter: function() {
                    return this.value + "%";
                }
            },
            min: 0,
            max: 100,
            title: {
                text: ' '
            },
            stackLabels: {
		enabled: false,
		style: {
                    fontWeight: 'bold',
                    color: '#82abcc',
                    fontFamily: 'SansProLight',
                    fontSize: '14px'
		},
		formatter: function() {
                    return this.total + " MB";
                }
            }
	},
	tooltip: {
            enabled: false
	},
	plotOptions: {
            column: {
                borderWidth: 0,
                shadow: false,
		animation: false,                        
		stacking: 'normal',
		dataLabels: {
                    enabled: true,
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px',
                    connectorWidth: 0,
                    distance: -15,
                    formatter: function() {
			// display only if larger than 1
                        return this.y > 0 ? ''+ Math.round(this.y) +'%'  : null;
                    }
                }
            }
	}
    });
}