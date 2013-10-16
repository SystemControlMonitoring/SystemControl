var node = urlPara('h');
var client = urlPara('c');
var port = urlPara('port');
var desc = urlPara('desc');
var startts = (new Date()).getTime();
var chartjvm;

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div><span style="float: left;"><table cellpadding=0 cellspacing=0 border=0 id="TopMenuTable"><tr><td><a href="../">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a href="../hosts/">Hosts</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a class="Onclick" onclick="history.back ();">' + $.base64.decode( urlPara('c') ) + '</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>WLS ' + $.base64.decode( desc ) + ':' + $.base64.decode( port ) + '</td></tr></table></span><span id="TopMenuIconGear" class="ui-icon ui-icon-info" style="float: left;" title="Weitere Weblogic Informationen."></span><span id="HostStatusSlim" style="float: left;"></span></div>');
    $('#TopMenuIconGear').click( function() {
            if ($("#ExtSysInfo").is(":hidden")) {
                $('#ExtSysInfo').fadeIn(100).css('zIndex',30);
            } else {
                $('#ExtSysInfo').fadeOut(100).css('zIndex',0);
            }
        }
    );
        
    $.Shortcuts.add({
        type: 'down',
        mask: 's',
        handler: function() {
            if ($("#Sidebar").is(":hidden")) {
                $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
                $('#Sidebar').animate({width:'toggle'},350, function() {
                    $('#SidebarContent').fadeIn(100);
                }).css('zIndex',30);
                SearchHosts( b64uid + 'Jhdu8K');
            } else {
                $('#SidebarContent').fadeOut(100);
                $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
                $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
            }
        }
    }).start();
    
    /**
     * Administration
     **/
    
    /**
    * Date Time Picker
    **/
}

function WlsInfo(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=V0xTSU5GTw==Jkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8&port=' + port + 'KjU8Zh',
        crossDomain: true,
        success: function(point) {
            $('#ExtSysInfo').html('<h3>Weitere Weblogic Informationen:</h3><table id="ExtSysInfoTable"></table>');
            $.each(point, function(name,data) {
                if (name == "VERSION") {
                    var tmp = data;
                    var shorttype;
                    if (tmp.length > 100) { shorttype = tmp.substr(tmp.indexOf('>')+1); shorttype = shorttype.substr(0, shorttype.indexOf('<')); } else { shorttype = tmp; }
                    $('#ExtSysInfoTable').append('<tr><td>'+ name +'</td><td><span id="ExtSysInfoTableIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>'+ shorttype +'</td></tr>');
                } else if (name == "STATUS") {
                    if (data != "RUNNING") {
                        $('#HostStatusSlim').html('<font class="OFF">ERROR</font>');
                        $('#HostStatusSlim').append('<div id="error" title="Weblogic Server Error"><p><span class="ui-icon ui-icon-circle-close" style="float: left; margin: 0 7px 50px 0;"></span>Der Weblogic Server scheint nicht zu funktionieren.</p><br><p>Bitte umgebehend prüfen und beheben und dann auf <b>OK</b>.</p>');
                        $('#error').dialog({
                            autoOpen: true,
                            height: 200,
                            width: 400,
                            draggable: false,
                            resizable: false,
                            modal: true,
                            buttons: { 
                                OK: function() { 
                                    $( this ).dialog( 'close' );
                                    $('#error').remove();
                                    location.reload();
                                    }
                                }
                            });
                    } else {
                        $('#HostStatusSlim').html('<font class="ON">ONLINE</font>');
                        $('#AjaxLoader').remove();
                        setTimeout('WlsInfo("' + uid + '")', 10000);
                    }
                } else {
                    $('#ExtSysInfoTable').append('<tr><td>'+ name +'</td><td><span id="ExtSysInfoTableIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>'+ data +'</td></tr>');
                }
            });
            },
            error: function() {
                $('#HostStatusSlim').remove();
                $('#HostStatusSlim').html('<font class="OFF">ERROR</font>');
                $('#HostStatusSlim').append('<div id="error" title="Weblogic Server Error"><p><span class="ui-icon ui-icon-circle-close" style="float: left; margin: 0 7px 50px 0;"></span>Der Weblogic Server scheint nicht zu funktionieren.</p><br><p>Bitte umgebehend prüfen und beheben und dann auf <b>OK</b>.</p>');
                $('#error').dialog({
                    autoOpen: true,
                    height: 200,
                    width: 400,
                    draggable: false,
                    resizable: false,
                    modal: true,
                    buttons: { 
                    OK: function() { 
                        $( this ).dialog( 'close' );
                        $('#error').remove();
                        location.reload();
                    }
                }
            });
        },
        dataType: 'json',
        cache: false
    });
}

function Summary(uid) {
    var b64uid = $.base64.encode( uid );
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    // Charts
    ChartJvm(uid);
    
    $('#list2').jqGrid({         
        url:'http://' + Backend + '/jqgridc/json/?e=1&m=V0xTKjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=U0VSVkVSUw==KLMUHp&port=' + port + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Port', 'Status', 'Health', '', 'Version', '', 'Heap Size(MB)', 'Usage(MB)', '', 'Max(MB)'],
	colModel:[ 
            {name:'name', width: 100, align:'left', sortable: true, resizable:true},
            {name:'port', width: 50, align:'center', sortable: true, resizable:true},
            {name:'stat', width: 100, align:'center', sortable: true, resizable:true},
            {name:'heal', width: 100, align:'center', sortable: true, resizable:true},
            {name:'curm', width: 100, align:'center', hidden: true},
            {name:'wlsv', width: 498, align:'left', sortable: true, resizable:true},
            {name:'oskt', width: 130, align:'center', hidden: true},
            {name:'hscr', width: 70, align:'center', sortable: true, resizable:true},
            {name:'usage', width: 70, align:'center', sortable: true, resizable:true},
            {name:'hfcr', width: 70, align:'center', hidden: true},
            {name:'hsmx', width: 70, align:'center', sortable: true, resizable:true}
	],
	rowNum:5,
	rowList:[3,5,7,10,15,20],
	pager: '#pager2',
	sortname: 'name',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Servers',
	height: 175,
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list2').jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false});
	
    $('#list3').jqGrid({         
        url:'http://' + Backend + '/jqgridc/json/?e=1&m=V0xTKjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=QVBQTElDQVRJT05TKLMUHp&port=' + port + 'K4KuuZ&u=' + b64uid + 'LKHld3',
        datatype: 'json',
	colNames:['Name', 'Port', 'Status', 'Health', 'Target', 'Target State'],
	colModel:[ 
            {name:'name', width: 318, align:'left', sortable: true, resizable:true},
            {name:'port', width: 150, align:'center', sortable: true, resizable:true},
            {name:'stat', width: 150, align:'center', sortable: true, resizable:true},
            {name:'heal', width: 150, align:'center', sortable: true, resizable:true},
            {name:'trgt', width: 150, align:'center', sortable: true, resizable:true},
            {name:'tsta', width: 150, align:'center', sortable: true, resizable:true}
	],  
	rowNum:5,
	rowList:[3,5,7,10,15,20],
	pager: '#pager3',
	sortname: 'name',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Applications',
	height: 75,
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list3').jqGrid('navGrid','#pager3',{edit:false,add:false,del:false,search:false});
}

/**
 * Request Functions
 **/

function requestHeapSize(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url:'http://' + Backend + '/jqgridc/json/?e=1&m=V0xTKjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=SlZNVVNBR0U=KLMUHp&port=' + port + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	success: function(point) {
            var ts = (new Date()).getTime();
	
            var HEAP_SIZE = parseFloat(point.HEAP_SIZE);
            var series_HEAP_SIZE = chartjvm.series[0];
            var shift_HEAP_SIZE = series_HEAP_SIZE.data.length > 240; 
            series_HEAP_SIZE.addPoint([ts ,HEAP_SIZE], true, shift_HEAP_SIZE);
		
            var HEAP_USAGE = parseFloat(point.HEAP_USAGE);
            var series_HEAP_USAGE = chartjvm.series[1];
            var shift_HEAP_USAGE = series_HEAP_USAGE.data.length > 240; 
            series_HEAP_USAGE.addPoint([ts ,HEAP_USAGE], true, shift_HEAP_USAGE);
		
            setTimeout('requestHeapSize("' + uid + '")', 10000);
	},
	dataType: 'json',
	cache: false
    });
}

/**
 * Charting Functions
 */

function ChartJvm(uid) {
    chartjvm = new Highcharts.Chart({
        chart: {
            renderTo: 'heapsize',
            borderRadius: 0,
            borderWidth: 0,
            borderColor: '#82abcc',
            height: 325,
            marginLeft: 125,
            marginRight: 125,
            plotBackgroundColor: null,
            backgroundColor: null,
            width: 1100,
            animation: false,
            zoomType: 'x',
            events: {
                load: requestHeapSize(uid)
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
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
                }
            }
        },
        title: {
            text: ' ',
            style: {
                color: '#ffffff',
		fontFamily: 'SansProLight',
		fontSize: '24px'
            }
        },
		subtitle: {
            text: ' ',
            style: {
                color: '#82abcc',
		fontFamily: 'SansProLight',
		fontSize: '12px'
            }
        },
		yAxis: [
        {
            gridLineWidth: 1,    
            lineColor: '#82abcc',
            lineWidth: 1,
            gridLineColor: '#004c8a',
            title: {
                text: 'Java Virtual Machine Heap Size',
                style: {
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px'
                }
            },
            offset: 15,
            tickColor: '#82abcc',
            tickWidth: 1,
            tickLength: 4,
            tickPosition: 'inside',
            labels: {
                style: {
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '14px'
                }
            },
            min: 0
        }],
		tooltip: {
            backgroundColor: '#004c8a',
            borderColor: '#82abcc',
            borderRadius: 0,
            borderWidth: 1,
            style: {
                color: '#ffffff',
		fontFamily: 'SansProLight',
		fontSize: '14px'
            },
            shared: true,
            crosshairs: {
                color: '#82abcc',
                width: 2,
		dashStyle: 'solid',
		zIndex: 200,
		fontFamily: 'SansProLight',
		fontSize: '14px'
            }
		},
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            itemStyle: {
		cursor: 'pointer',
		color: '#82abcc',
		fontFamily: 'SansProLight',
		fontSize: '14px'
            },
            itemHoverStyle: {
                color: '#ffffff',
		fontFamily: 'SansProLight',
		fontSize: '14px'
            }
        },
        exporting: {
            enabled: false
        },
		plotOptions: {
            area: {
                lineWidth: 1,
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 2
                        }
                    }
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 3,
                            zIndex: 55
                    }
                }
            },
            spline: {
                lineWidth: 2,
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 2
                        }
                    }
		},
		shadow: false,
                states: {
                    hover: {
                        lineWidth: 4,
			zIndex: 55
                    }
                }
            },
            pointInterval: 5000
        },
        series: [
            {
		id: 0,
		name: 'Heap Size',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 1,
		name: 'Heap Usage',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            }
        ]
    });
}