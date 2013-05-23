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
        url: 'http://172.23.10.249:6560/proxy/json/?e=1&m=U2xpbVRhb3Y=Hkd83k&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var cnodet; var cnode = 0; var ocolor = " default"; var ccolor = " default"; var ucolor = " default"; var socolor = " default"; var sccolor = " default"; var sucolor = " default"; var swcolor = " default"; var spcolor = " default";var HOST_OK = 0; var HOST_CR = 0; var HOST_CR_NA = 0; var HOST_CR_A = 0; var HOST_UN = 0; var HOST_UN_NA = 0; var HOST_UN_A = 0; var SERVICE_OK = 0; var SERVICE_WA = 0; var SERVICE_WA_NA = 0; var SERVICE_WA_A = 0; var SERVICE_WA_NA_OFF = 0; var SERVICE_CR = 0; var SERVICE_CR_NA = 0; var SERVICE_CR_A = 0; var SERVICE_CR_NA_OFF = 0; var SERVICE_UN = 0; var SERVICE_UN_NA = 0; var SERVICE_UN_A = 0; var SERVICE_UN_NA_OFF = 0; var SERVICE_PE = 0;
            $('#SlimTaov').html('<div id="Nodes"></div>');
            $.each(json, function() {
                HOST_OK = parseInt(this.HOST.OK.COUNT, 10) + HOST_OK; 
                HOST_CR = parseInt(this.HOST.CRITICAL.COUNT, 10) + HOST_CR; 
                HOST_CR_NA = parseInt(this.HOST.CRITICAL.NACK, 10) + HOST_CR_NA; 
                HOST_CR_A = parseInt(this.HOST.CRITICAL.ACK, 10) + HOST_CR_A; 
                HOST_UN = parseInt(this.HOST.UNREACHABLE.COUNT, 10) + HOST_UN; 
                HOST_UN_NA = parseInt(this.HOST.UNREACHABLE.NACK, 10) + HOST_UN_NA; 
                HOST_UN_A = parseInt(this.HOST.UNREACHABLE.ACK, 10) + HOST_UN_A; 
                SERVICE_OK = parseInt(this.SERVICE.OK.COUNT_ON, 10) + SERVICE_OK; 
                SERVICE_WA = parseInt(this.SERVICE.WARNING.COUNT_ON, 10) + SERVICE_WA; 
                SERVICE_WA_NA = parseInt(this.SERVICE.WARNING.NACK_ON, 10) + SERVICE_WA_NA; 
                SERVICE_WA_A = parseInt(this.SERVICE.WARNING.ACK_ON, 10) + SERVICE_WA_A; 
                SERVICE_WA_NA_OFF = parseInt(this.SERVICE.WARNING.NACK_OFF, 10) + SERVICE_WA_NA_OFF; 
                SERVICE_CR = parseInt(this.SERVICE.CRITICAL.COUNT_ON, 10) + SERVICE_CR; 
                SERVICE_CR_NA = parseInt(this.SERVICE.CRITICAL.NACK_ON, 10) + SERVICE_CR_NA; 
                SERVICE_CR_A = parseInt(this.SERVICE.CRITICAL.ACK_ON, 10) + SERVICE_CR_A; 
                SERVICE_CR_NA_OFF = parseInt(this.SERVICE.CRITICAL.NACK_OFF, 10) + SERVICE_CR_NA_OFF; 
                SERVICE_UN = parseInt(this.SERVICE.UNKNOWN.COUNT_ON, 10) + SERVICE_UN; 
                SERVICE_UN_NA = parseInt(this.SERVICE.UNKNOWN.NACK_ON, 10) + SERVICE_UN_NA; 
                SERVICE_UN_A = parseInt(this.SERVICE.UNKNOWN.ACK_ON, 10) + SERVICE_UN_A; 
                SERVICE_UN_NA_OFF = parseInt(this.SERVICE.UNKNOWN.NACK_OFF, 10) + SERVICE_UN_NA_OFF; 
                SERVICE_PE = parseInt(this.SERVICE.PENDING.COUNT_ON, 10) + SERVICE_PE;
                cnode++;
            });
            /* BG Color */
            if (HOST_OK != 0) { ocolor = " ok"; }
            if (HOST_CR != 0) { ccolor = " cr"; }
            if (HOST_UN != 0) { ucolor = " un"; }
            if (SERVICE_OK != 0) { socolor = " ok"; }
            if (SERVICE_CR != 0) { sccolor = " cr"; }
            if (SERVICE_UN != 0) { sucolor = " un"; }
            if (SERVICE_WA != 0) { swcolor = " wa"; }
            if (SERVICE_PE != 0) { spcolor = " pe"; }
            if (cnode == 1) { cnodet = "1 Monitoringnode"; } else { cnodet = cnode + " Monitoringnodes"; }
            
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Hosts</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span><span class="Notice" style="float: right;">' + cnodet + '</span></td></tr><tr valign=middle><td class="' + ocolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + HOST_OK + '</a></b> Ok</td><td class="' + ccolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + HOST_CR_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=7">' + HOST_CR_A + '</a></b> Kritisch</td><td class="' + ucolor + '"><b><a href="/monitoring.chtml?view=3&status=8">' + HOST_UN_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=9">' + HOST_UN_A + '</a></b> Nicht Erreichbar</td></tr></table></span>');
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Services</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td class="' + socolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + SERVICE_OK + '</a></b> Ok</td><td class="' + swcolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_WA_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=7">' + SERVICE_WA_A + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_WA_NA_OFF + '</a></b> Warnung</td><td class="' + sccolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_CR_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=7">' + SERVICE_CR_A + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_CR_NA_OFF + '</a></b> Kritisch</td><td class="' + sucolor + '"><b><a href="/monitoring.chtml?view=3&status=8">' + SERVICE_UN_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=9">' + SERVICE_UN_A + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=8">' + SERVICE_UN_NA_OFF + '</a></b> Unbekannt</td><td class="' + spcolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + SERVICE_PE + '</a></b> Ausstehend</td></tr></table></span>');
            
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
            var swa = SERVICE_WA - SERVICE_WA_NA_OFF;
            var scr = SERVICE_CR - SERVICE_CR_NA_OFF;
            var sun = SERVICE_UN - SERVICE_UN_NA_OFF;
            var sge = sok + swa + scr + sun;
            
            ShowServicePie();
            ShowServicePer();
            
            chartserviceper.addSeries({
                name: "OK",
                data: [ ((SERVICE_OK*100)/sge) ]
            });
            
            chartserviceper.addSeries({
                name: "WA",
                data: [ (((SERVICE_WA - SERVICE_WA_NA_OFF)*100)/sge) ]
            });
            
            chartserviceper.addSeries({
                name: "CR",
                data: [ (((SERVICE_CR - SERVICE_CR_NA_OFF)*100)/sge) ]
            });
            
            chartserviceper.addSeries({
                name: "UN",
                data: [ (((SERVICE_UN - SERVICE_UN_NA_OFF)*100)/sge) ]
            });

            servicepie.addSeries({
               type: "pie",
               name: "",
               data: [ ['Ok',SERVICE_OK], ['Warnung',(SERVICE_WA - SERVICE_WA_NA_OFF)], ['Kritisch',(SERVICE_CR - SERVICE_CR_NA_OFF)], ['Unbekannt',(SERVICE_UN - SERVICE_UN_NA_OFF)] ]
            });
            
            
            setTimeout('SlimTaov("' + uid + '")', 30000);
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#FillLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function ShowCritical2(uid) {
    var b64uid = $.base64.encode( uid );
    $('#showcritical').jqGrid({ 
	url:'http://172.23.10.249:6560/proxy/json/?e=1&m=U2hvd0NyaXRpY2FsHjdz6d&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:[' ', 'Zeitstempel', 'Service Name', 'Host Name', 'Host Status', 'Ausgabe', 'Monitoringnode'],
	colModel:[
            {name:'icon', width: 22, align:'center', sortable: false, resizable:true},
            {name:'ts', width: 125, align:'left', sortable: false, resizable:true},
            {name:'sn', width: 150, align:'left', sortable: false, resizable:true},
            {name:'hn', width: 150, align:'left', sortable: false, resizable:true},
            {name:'hs', width: 100, align:'center', sortable: false, resizable:true},
            {name:'out', width: 335, align:'left', sortable: false, resizable:true},
            {name:'mn', width: 140, align:'center', sortable: false, resizable:true},
	],
        rowNum:25,
	rowList:[25,40,75,100],
	pager: '#pagershowcritical',
	viewrecords: true,
	caption: 'Alle Probleme',
        height: '425',
        width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true,
        multiselect: true
    });
    $('#showcritical').jqGrid('navGrid','#pagershowcritical',{edit:false,add:false,del:false,search:false});
    $("#showcritical").jqGrid('navButtonAdd','#pagershowcritical',{
        caption: "",
        onClickButton: function() {
            var gsr = jQuery("#showcritical").jqGrid('getGridParam','selrow');
            if(gsr){
                alert("Row selected.");
            } else {
                alert("Please select Row");
            }
        }
    });
}


function ShowCritical(uid) {
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
                url: 'http://172.23.10.249:6560/proxy/json/?e=1&m=U2hvd0NyaXRpY2FsHjdz6d&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var srvcount = 0;
                    $('#DivShowCritical').html('<table id="TableShowCritical"></table>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SERVICES, function() {
                            var hostname = this.HOST_NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('table','#DivShowCritical').append('<tr><td><table cellpadding=0 cellspacing=0 border=0><tr valign="middle"><td rowspan=2 width=30 align="center" class="BorderBottom"><img id="ImgShowCritical" src="' + this.SERVICE_STATUS + '"></img></td><td><span class="DefFontBigShowCritical">' + shorthostname + '</span></td><td>' + this.HOST_STATUS + '</td><td width="250"><span class="FontSmallShowCritical">Service zuletzt gepr&uuml;ft ' + this.TIMESTAMP + '</span></td></tr><tr><td width="350" class="BorderBottom">Servicename: ' + this.SERVICE_NAME + '</td><td colspan=2 class="BorderBottom">' + this.OUTPUT + '</td></tr></table></td></tr>');
                            srvcount++;
                        });
                    });
                    $('table','#DivShowCritical').append('<tr height=10></tr>');
                    $('#AjaxLoader').remove();
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