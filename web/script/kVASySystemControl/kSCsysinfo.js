/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var startts = (new Date()).getTime();
var chartcpu;
var chartio;
var chartnwio;
var chartmemio;

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div><span style="float: left;"><table cellpadding=0 cellspacing=0 border=0 id="TopMenuTable"><tr><td><a href="../">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a href="../hosts/">Hosts</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a class="Onclick" onclick="history.back ();">' + $.base64.decode( urlPara('c') ) + '</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>System Information</td></tr></table></span><span id="TopMenuIconGear" class="ui-icon ui-icon-info" style="float: left;" title="Weitere Host Informationen."></span><span id="HostStatusSlim" style="float: left;"></span></div>');
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
    
    $('#SidebarSubmenu').append('<div id="OracleDBA"><div id="AdminTitle">Administration</div>\n\
        <div id="AdminDivs"></div>\n\
        <div id="AdminButtons">\n\
            <span id="LogfileButtons"></span><br>\n\
            <button id="ra_button" style="margin-left: 2px; margin-top: 15px;">Reports Archiv</button>\n\
            <button id="dv_button" style="margin-left: 2px; margin-top: 15px;">Diagnose Verzeichnis</button>\n\
        </div>\n\
    </div>');


    $('#ra_button').button().css('border','1px solid #004279').click(function() {
	window.open('http://' + $.base64.decode( urlPara('c') ) + ':6555/reports/', '_blank');
    });
    $('#dv_button').button().css('border','1px solid #004279').click(function() {
	window.open('http://' + $.base64.decode( urlPara('c') ) + ':6555/diag/', '_blank');
    });
}

function SysInfo(uid) {
    var b64uid = $.base64.encode( uid );
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=U1lTSU5GTw==Jkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success: function(point) {
            $('#HostStatusSlim').html('<font class="ON">ONLINE</font>');
            $('#ExtSysInfo').html('<h3>Weitere Host Informationen:</h3><table id="ExtSysInfoTable"></table>');
            $.each(point, function(name,data) {
		$('#ExtSysInfoTable').append('<tr><td>'+ name +'</td><td><span id="ExtSysInfoTableIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>'+ data +'</td></tr>');
            });
            $('#AjaxLoader').remove();
            setTimeout('SysInfo("' + uid + '")', 10000);
        },
        error: function(jqXhr, textStatus, error) {
            $('#HostStatusSlim').html('<font class="OFF">OFFLINE</font>');
        },
        dataType: 'json',
        cache: false
    });
}

function LogfilesDiv(uid) {
    var b64uid = $.base64.encode( uid );
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=TG9nQWRtaW4=KhdU8Z&h=' + node + 'Hjd876&c=' + client + 'Jjd723&log=1&u=' + b64uid + 'U7g7ZZ&cm=TE9HRklMRVM=IZK88i',
	success: function(point) {
            $('#AdminDivs').html('<span id="ButtonListTextDiv"></span>');
            $('#LogfileButtons').html('<span id="ButtonListDiv"></span>');
            $.each(point, function() {
                var shortname = this.SC;
		var longname = this.DESC;
		$('#ButtonListTextDiv').append('<div id="' + shortname + '_dial" title="Leeren des Logfiles: ' + longname + ' - 1 von 2"><p>Sie f&uuml;hren das Leeren des Logfiles: ' + longname + ' durch.</p></div>');
		$('#ButtonListDiv').append('<button id="' + shortname + '_button" style="margin-left: 2px; margin-top: 5px;">' + longname + '</button>');
		$('#' + shortname + '_dial').dialog({
                    autoOpen: false,
                    height: 150,
                    width: 400,
                    draggable: false,
                    resizable: false,
                    modal: true,
                    buttons: {
			OK: function() {
                            $('body').append('<img id="ajax-loader" title="Leeren des Logfiles: ' + longname + '" wird ausgef&uuml;hrt." src="../layout/images/ajax-loader.gif" /><div id="ajax-loader-div">Leeren des Logfiles: ' + longname + '</div>');
                            $(this).dialog('close');
                            $.ajax({
                                url: 'http://' + Backend + '/clientdirect/json/?e=1&m=TG9nQWRtaW4=KhdU8Z&h=' + node + 'Hjd876&c=' + client + 'Jjd723&log=' + longname + '&u=' + b64uid + 'U7g7ZZ&cm=REVMT0c=IZK88i',
				timeout: 3600000,
                                success: function() {
                                    $('#ajax-loader').remove();
                                    $('#ajax-loader-div').remove();
                                    $( 'body' ).append('<div id="success" title="Leeren des Logfiles: ' + longname + '" - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Das Leeren des Logfiles ' + longname + ' wurde <b>erfolgreich</b> durchgef&uuml;hrt.</p>');
                                    $( '#success' ).dialog({
                                        autoOpen: true,
                                        height: 150,
                                        width: 400,
                                        draggable: false,
                                        resizable: false,
                                        modal: true,
                                        buttons: { 
                                            OK: function() { 
                                                $( this ).dialog( 'close' );
                                                $('#success').remove();
                                            }
                                        }
                                    });
                                },
                                error: function() {
                                    $('#ajax-loader').remove();
                                    $('#ajax-loader-div').remove();
                                    alert('FEHLER BEI AUSF&Uuml;HRUNG: Leeren des Logfiles: ' + longname );
                                },
                                dataType: 'json',
                                cache: false
                            });
                        },
                        Abbrechen: function() {
                            $(this).dialog('close');
                        }
                    }
                });
                $('#' + shortname + '_button').button().css('border','1px solid #004279').click(function() {
                    $('#' + shortname + '_dial').dialog('open');
                });
            });
        },
        dataType: 'json',
        cache: false
    });
}

function Storage(uid) {
    var b64uid = $.base64.encode( uid );
    var node = urlPara('h');
    var client = urlPara('c');
    
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    ChartNwIo(node,client,b64uid);
    ChartMemIo(node,client,b64uid);
    
    // OS Dependent
    
    if ( $.base64.decode( urlPara('t') ) == "WIN" ) {

    ChartWinCpu(node,client,b64uid);
    ChartWinIo(node,client,b64uid);

    $('#bios').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=QklPUw==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Caption', 'ReleaseDate', 'SerialNumber', 'SMBIOSBIOSVersion', 'Status', 'Version'],
	colModel:[
            {name:'capt', width: 325, align:'left', sortable: false, resizable:true},
            {name:'reda', width: 150, align:'center', sortable: false, resizable:true},
            {name:'senu', width: 100, align:'center', sortable: false, resizable:true},
            {name:'smbi', width: 100, align:'left', sortable: false, resizable:true},
            {name:'stat', width: 100, align:'center', sortable: false, resizable:true},
            {name:'vers', width: 275, align:'left', sortable: false, resizable:true}
	],
	rowNum:1,
	pager: '#pagerbios',
	viewrecords: false,
	sortname: 'name',
	sortorder: 'asc',
	caption: 'Zusammenfassung',
	height: 25,
	width: '1040',
	shrinkToFit: false,
	autowidth: true,
	pgbuttons: false,
	hidegrid: false,
	pgtext: null
    });
    $('#bios').jqGrid('navGrid','#pagerbios',{edit:false,add:false,del:false,search:false});

    $('#onboard').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=T05CT0FSRA==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:[ 'Description', 'DeviceType', 'Enabled'],
	colModel:[ 
            {name:'desc', width: 352, align:'left', sortable: false, resizable:true},
            {name:'dtyp', width: 200, align:'left', sortable: false, resizable:true},
            {name:'enab', width: 100, align:'center', sortable: false, resizable:true}
	],
	rowNum:10,
	rowList:[3,6,10,20,30],
	pager: '#pageronb',
        sortname: 'name',
	sortorder: 'asc',
	viewrecords: true,
	caption: 'Onboard Device',
	height: 251,
	width: '520',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#onboard').jqGrid('navGrid','#pageronb',{edit:false,add:false,del:false,search:false});

    $('#storage').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=RlM=JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Typ', 'Name', 'Gr&ouml;&szlig;e (GB)', 'Nutzung (GB)', 'Frei (GB)', 'Beschreibung', 'Serial Nr.'],
	colModel:[ 
            {name:'type', width: 50, align:'center', sortable: false, resizable:true},
            {name:'name', width: 50, align:'center', sortable: false, resizable:true},
            {name:'size', width: 100, align:'center', sortable: false, resizable:true},
            {name:'usage', width: 100, align:'center', sortable: false, resizable:true},
            {name:'free', width: 100, align:'center', sortable: false, resizable:true},
            {name:'desc', width: 150, align:'center', sortable: false, resizable:true},
            {name:'serial', width: 100, align:'center', sortable: false, resizable:true}
	],
	rowNum:10,
	rowList:[3,6,10,20,30],
	pager: '#pagersto',
        sortname: 'name',
	sortorder: 'asc',
	viewrecords: true,
	caption: 'Mountpoints',
	height: 252,
	width: '520',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#storage').jqGrid('navGrid','#pagersto',{edit:false,add:false,del:false,search:false});

    $('#devcont').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=REVWQ09OVA==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Beschreibung', 'Hersteller', 'Protokoll', 'Status', 'Status Information'],
	colModel:[ 
            {name:'desc', width: 600, align:'left', sortable: false, resizable:true},
            {name:'vend', width: 113, align:'left', sortable: false, resizable:true},
            {name:'prot', width: 80, align:'center', sortable: false, resizable:true},
            {name:'stat', width: 80, align:'center', sortable: false, resizable:true},
            {name:'stai', width: 200, align:'left', sortable: false, resizable:true}
	],
	rowNum:6,
	rowList:[3,6,10,20],
	pager: '#pagerdc',
        sortname: 'name',
	sortorder: 'asc',
	viewrecords: true,
	caption: 'Device Controller',
	height: 152,
	width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#devcont').jqGrid('navGrid','#pagerdc',{edit:false,add:false,del:false,search:false});	
    
    $('#dma').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=RE1BJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Kanal', 'Status'],
	colModel:[ 
            {name:'chan', width: 265, align:'left', sortable: false, resizable:true},
            {name:'stat', width: 112, align:'center', sortable: false, resizable:true}
	],
	rowNum:10,
	rowList:[3,6,10,20,30],
	pager: '#pagerdma',
        sortname: 'name',
	sortorder: 'asc',
	viewrecords: false,
	caption: 'RAM Channel',
	height: 251,
	width: '200',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#dma').jqGrid('navGrid','#pagerdma',{edit:false,add:false,del:false,search:false});
    
    $('#processes').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=UFJPQ0VTU0VTLKH0OI&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Progress', 'Command Line', 'Date', 'Handle', 'Name', 'PFU', 'PPId', 'PId', 'ROC', 'TC', 'VS', 'WSS'],
	colModel:[
            {name:'capt', width: 125, align:'left', sortable: false, resizable:true},
            {name:'cmdl', width: 255, align:'left', sortable: false, resizable:true},
            {name:'crda', width: 125, align:'center', sortable: false, resizable:true},
            {name:'haco', width: 50, align:'center', sortable: false, resizable:true},
            {name:'name', width: 115, align:'left', sortable: false, resizable:true},
            {name:'pfus', width: 50, align:'center', sortable: false, resizable:true},
            {name:'ppid', width: 50, align:'center', sortable: false, resizable:true},
            {name:'prid', width: 50, align:'center', sortable: false, resizable:true},
            {name:'ropc', width: 50, align:'center', sortable: false, resizable:true},
            {name:'thco', width: 50, align:'center', sortable: false, resizable:true},
            {name:'visi', width: 50, align:'center', sortable: false, resizable:true},
            {name:'woss', width: 50, align:'center', sortable: false, resizable:true}
	],
	rowNum:24,
	rowList:[18,24,30,40,50],
	pager: '#pagerproc',
	viewrecords: true,
	sortname: 'name',
	sortorder: 'asc',
	caption: 'Laufende Prozesse auf dem System',
	height: 578,
	width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#processes').jqGrid('navGrid','#pagerproc',{edit:false,add:false,del:false,search:false});
    
    $('#log').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=TE9HJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Event Typ', 'Logfile', 'Meldung', 'Quelle', 'Erstellt', 'Nutzer'],
	colModel:[
            {name:'evt', width: 60, align:'center', sortable: false, resizable:true},
            {name:'lgf', width: 75, align:'left', sortable: false, resizable:true},
            {name:'mes', width: 375, align:'left', sortable: false, resizable:true},
            {name:'sor', width: 275, align:'left', sortable: false, resizable:true},
            {name:'cre', width: 125, align:'center', sortable: false, resizable:true},
            {name:'use', width: 140, align:'center', sortable: false, resizable:true}
	],
	rowNum:24,
	rowList:[18,24,30,40,50],
	pager: '#pagerlog',
	viewrecords: true,
	sortname: 'crtd',
	sortorder: 'desc',
	caption: 'Critical und Warning Messages des Systems der letzten 48h',
	height: 578,
	width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#log').jqGrid('navGrid','#pagerlog',{edit:false,add:false,del:false,search:false});
    
    } else {

    ChartLinuxCpu(node,client,b64uid);
    ChartLinuxIo(node,client,b64uid);

    $('#bios').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=QklPUw==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Hersteller', 'Version', 'Release Date', 'Firmware', 'Revision'],
	colModel:[
            {name:'capt', width: 325, align:'left', sortable: false, resizable:true},
            {name:'reda', width: 200, align:'center', sortable: false, resizable:true},
            {name:'senu', width: 200, align:'center', sortable: false, resizable:true},
            {name:'smbi', width: 165, align:'left', sortable: false, resizable:true},
            {name:'stat', width: 165, align:'center', sortable: false, resizable:true}
	],
	rowNum:1,
	pager: '#pagerbios',
	viewrecords: false,
	sortname: 'name',
	sortorder: 'asc',
	caption: 'Zusammenfassung',
	height: 25,
	width: '1040',
	shrinkToFit: false,
	autowidth: true,
	pgbuttons: false,
	hidegrid: false,
	pgtext: null
    });
    $('#bios').jqGrid('navGrid','#pagerbios',{edit:false,add:false,del:false,search:false});

    $('#onboard').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=T05CT0FSRA==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:[ 'Beschreibung', 'Enabled'],
	colModel:[
            {name:'desc', width: 457, align:'left', sortable: false, resizable:true},
            {name:'dtyp', width: 200, align:'center', sortable: false, resizable:true}
        ],
	rowNum:10,
	rowList:[3,6,10,20,30],
	pager: '#pageronb',
        sortname: 'name',
	sortorder: 'asc',
	viewrecords: true,
	caption: 'Onboard Device',
	height: 251,
	width: '520',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#onboard').jqGrid('navGrid','#pageronb',{edit:false,add:false,del:false,search:false});

    $('#storage').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=RlM=JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
        colNames:['Typ', 'Mount Point', 'Gr&ouml;&szlig;e', 'Nutzung', 'Frei', 'Pfad'],
	colModel:[
            {name:'type', width: 50, align:'center', sortable: false, resizable:true},
            {name:'name', width: 100, align:'left', sortable: false, resizable:true},
            {name:'size', width: 75, align:'center', sortable: false, resizable:true},
            {name:'usage', width: 75, align:'center', sortable: false, resizable:true},
            {name:'free', width: 75, align:'center', sortable: false, resizable:true},
            {name:'desc', width: 280, align:'left', sortable: false, resizable:true}
        ],
	rowNum:10,
	rowList:[3,6,10,20,30],
        sortname: 'name',
        sortorder: 'asc',
	pager: '#pagersto',
	viewrecords: true,
	caption: 'Mountpoints',
	height: 252,
	width: '520',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#storage').jqGrid('navGrid','#pagersto',{edit:false,add:false,del:false,search:false});
 
    $('#devcont').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=REVWQ09OVA==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Beschreibung', 'Hersteller', 'Protokoll', 'Status', 'Status Information'],
	colModel:[
            {name:'desc', width: 600, align:'left', sortable: false, resizable:true},
            {name:'vend', width: 113, align:'left', sortable: false, resizable:true},
            {name:'prot', width: 80, align:'center', sortable: false, resizable:true},
            {name:'stat', width: 80, align:'center', sortable: false, resizable:true},
            {name:'stai', width: 200, align:'left', sortable: false, resizable:true}
	],
	rowNum:6,
	rowList:[3,6,10,20],
        sortname: 'name',
        sortorder: 'asc',
	pager: '#pagerdc',
	viewrecords: true,
	caption: 'Device Controller',
	height: 152,
	width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#devcont').jqGrid('navGrid','#pagerdc',{edit:false,add:false,del:false,search:false});	
    
    $('#dma').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=RE1BJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Kanal', 'Gr&ouml;&szlig;e'],
	colModel:[
            {name:'chan', width: 265, align:'left', sortable: false, resizable:true},
            {name:'stat', width: 112, align:'center', sortable: false, resizable:true}
	],
	rowNum:10,
	rowList:[3,6,10,20,30],
        sortname: 'name',
        sortorder: 'asc',
	pager: '#pagerdma',
	viewrecords: false,
	caption: 'RAM Channel',
	height: 251,
	width: '200',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#dma').jqGrid('navGrid','#pagerdma',{edit:false,add:false,del:false,search:false});
    
    $('#processes').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=UFJPQ0VTU0VTLKH0OI&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['User', 'PId', 'CPU%', 'MEM%', 'VSZ', 'RSS', 'TTY', 'STAT', 'Start Datum', 'Start Zeit', 'Command Line'],
	colModel:[
            {name:'name', width: 100, align:'center', sortable: false, resizable:true},
            {name:'cmdl', width: 50, align:'center', sortable: false, resizable:true},
            {name:'date', width: 50, align:'center', sortable: false, resizable:true},
            {name:'hndl', width: 50, align:'center', sortable: false, resizable:true},
            {name:'dscr', width: 75, align:'center', sortable: false, resizable:true},
            {name:'pfus', width: 75, align:'center', sortable: false, resizable:true},
            {name:'ppid', width: 50, align:'center', sortable: false, resizable:true},
            {name:'apid', width: 50, align:'center', sortable: false, resizable:true},
            {name:'ropc', width: 60, align:'center', sortable: false, resizable:true},
            {name:'thco', width: 60, align:'center', sortable: false, resizable:true},
            {name:'visi', width: 405, align:'left', sortable: false, resizable:true},
	],
	rowNum:24,
	rowList:[18,24,30,40,50],
        sortname: 'name',
        sortorder: 'asc',
	pager: '#pagerproc',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Laufende Prozesse auf dem System',
	height: 578,
	width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#processes').jqGrid('navGrid','#pagerproc',{edit:false,add:false,del:false,search:false});
    
    $('#log').jqGrid({ 
	url:'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=TE9HJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	datatype: 'json',
	colNames:['Event Typ', 'Logfile', 'Meldung', 'Quelle', 'Erstellt', 'Nutzer'],
	colModel:[
            {name:'evt', width: 60, align:'center', sortable: false, resizable:true},
            {name:'lgf', width: 75, align:'left', sortable: false, resizable:true},
            {name:'mes', width: 375, align:'left', sortable: false, resizable:true},
            {name:'sor', width: 275, align:'left', sortable: false, resizable:true},
            {name:'cre', width: 125, align:'center', sortable: false, resizable:true},
            {name:'use', width: 140, align:'center', sortable: false, resizable:true}
	],
	rowNum:24,
	rowList:[18,24,30,40,50],
        sortname: 'crtd',
        sortorder: 'desc',
	pager: '#pagerlog',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Critical und Warning Messages des Systems der letzten 48h',
	height: 578,
	width: '1040',
	shrinkToFit: false,
	hidegrid: false,
	autowidth: true
    });
    $('#log').jqGrid('navGrid','#pagerlog',{edit:false,add:false,del:false,search:false});    
        
    }
}

/**
 * Request Functions
 **/

function requestLinuxCpu(node,client,b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=Q1BVJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
        success: function(point) {
            var ts = (new Date()).getTime();
		
            var USER = parseFloat(point.USER);
            var series_USER = chartcpu.series[0];
            var shift_USER = series_USER.data.length > 240; 
            series_USER.addPoint([ts ,USER], true, shift_USER);
		
            var NICE = parseFloat(point.NICE);
            var series_NICE = chartcpu.series[1];
            var shift_NICE = series_NICE.data.length > 240; 
            series_NICE.addPoint([ts ,NICE], true, shift_NICE);
			
            var SYSTEM = parseFloat(point.SYSTEM);
            var series_SYSTEM = chartcpu.series[2];
            var shift_SYSTEM = series_SYSTEM.data.length > 240; 
            series_SYSTEM.addPoint([ts ,SYSTEM], true, shift_SYSTEM);
			
            var IOWAIT = parseFloat(point.IOWAIT);
            var series_IOWAIT = chartcpu.series[3];
            var shift_IOWAIT = series_IOWAIT.data.length > 240; 
            series_IOWAIT.addPoint([ts ,IOWAIT], true, shift_IOWAIT);
			
            var STEAL = parseFloat(point.STEAL);
            var series_STEAL = chartcpu.series[4];
            var shift_STEAL = series_STEAL.data.length > 240; 
            series_STEAL.addPoint([ts ,STEAL], true, shift_STEAL);
			
            setTimeout('requestLinuxCpu("' + node + '","' + client + '","' + b64uid + '")', 10000);    
        },
        dataType: 'json',
        cache: false
    });
}

function requestWinCpu(node,client,b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=Q1BVJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
        success: function(point) {
            var ts = (new Date()).getTime();
            
            var PDPCT = parseFloat(point.PDPCT);
            var series_PDPCT = chartcpu.series[0];
            var shift_PDPCT = series_PDPCT.data.length > 240; 
            series_PDPCT.addPoint([ts ,PDPCT], true, shift_PDPCT);
			
            var PInterT = parseFloat(point.PInterT);
            var series_PInterT = chartcpu.series[1];
            var shift_PInterT = series_PInterT.data.length > 240; 
            series_PInterT.addPoint([ts ,PInterT], true, shift_PInterT);
			
            var PPrivT = parseFloat(point.PPrivT);
            var series_PPrivT = chartcpu.series[2];
            var shift_PPrivT = series_PPrivT.data.length > 240; 
            series_PPrivT.addPoint([ts ,PPrivT], true, shift_PPrivT);
			
            var PProcT = parseFloat(point.PProcT);
            var series_PProcT = chartcpu.series[3];
            var shift_PProcT = series_PProcT.data.length > 240; 
            series_PProcT.addPoint([ts ,PProcT], true, shift_PProcT);
			
            var PUserT = parseFloat(point.PUserT);
            var series_PUserT = chartcpu.series[4];
            var shift_PUserT = series_PUserT.data.length > 240; 
            series_PUserT.addPoint([ts ,PUserT], true, shift_PUserT);
			
            setTimeout('requestWinCpu("' + node + '","' + client + '","' + b64uid + '")', 10000);    
	},
	dataType: 'json',
	cache: false
    });
}

function requestLinuxIo(node,client,b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=SU8=JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
        success: function(point) {
            var ts = (new Date()).getTime();
		
            var DRBPS = parseFloat(point.DRBPS);
            var series_DRBPS = chartio.series[0];
            var shift_DRBPS = series_DRBPS.data.length > 240; 
            series_DRBPS.addPoint([ts ,DRBPS], true, shift_DRBPS);
			
            var DRPS = parseFloat(point.DRPS);
            var series_DRPS = chartio.series[1];
            var shift_DRPS = series_DRPS.data.length > 240; 
            series_DRPS.addPoint([ts ,DRPS], true, shift_DRPS);
	
            var DWBPS = parseFloat(point.DWBPS);
            var series_DWBPS = chartio.series[2];
            var shift_DWBPS = series_DWBPS.data.length > 240; 
            series_DWBPS.addPoint([ts ,DWBPS], true, shift_DWBPS);
			
            var DWPS = parseFloat(point.DWPS);
            var series_DWPS = chartio.series[3];
            var shift_DWPS = series_DWPS.data.length > 240; 
            series_DWPS.addPoint([ts ,DWPS], true, shift_DWPS);
			
            setTimeout('requestLinuxIo("' + node + '","' + client + '","' + b64uid + '")', 10000);    
	},
	dataType: 'json',
	cache: false
    });
}

function requestWinIo(node,client,b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=SU8=JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
        success: function(point) {
            var ts = (new Date()).getTime();
	
            var DRBPS = parseFloat(point.DRBPS);
            var series_DRBPS = chartio.series[0];
            var shift_DRBPS = series_DRBPS.data.length > 240; 
            series_DRBPS.addPoint([ts ,DRBPS], true, shift_DRBPS);
			
            var DRPS = parseFloat(point.DRPS);
            var series_DRPS = chartio.series[1];
            var shift_DRPS = series_DRPS.data.length > 240; 
            series_DRPS.addPoint([ts ,DRPS], true, shift_DRPS);
		
            var DWBPS = parseFloat(point.DWBPS);
            var series_DWBPS = chartio.series[2];
            var shift_DWBPS = series_DWBPS.data.length > 240; 
            series_DWBPS.addPoint([ts ,DWBPS], true, shift_DWBPS);
		
            var DWPS = parseFloat(point.DWPS);
            var series_DWPS = chartio.series[3];
            var shift_DWPS = series_DWPS.data.length > 240; 
            series_DWPS.addPoint([ts ,DWPS], true, shift_DWPS);
            
            var SIOPS = parseFloat(point.SIOPS);
            var series_SIOPS = chartio.series[4];
            var shift_SIOPS = series_SIOPS.data.length > 240; 
            series_SIOPS.addPoint([ts ,SIOPS], true, shift_SIOPS);
			
            setTimeout('requestWinIo("' + node + '","' + client + '","' + b64uid + '")', 10000);    
	},
	dataType: 'json',
	cache: false
    });
}

function requestNwIo(node,client,b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=TldJTw==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	success: function(point) {
            var ts = (new Date()).getTime();
	
            var BRPS = parseFloat(point.BRPS);
            var series_BRPS = chartnwio.series[0];
            var shift_BRPS = series_BRPS.data.length > 240; 
            series_BRPS.addPoint([ts ,BRPS], true, shift_BRPS);
	
            var BSPS = parseFloat(point.BSPS);
            var series_BSPS = chartnwio.series[1];
            var shift_BSPS = series_BSPS.data.length > 240; 
            series_BSPS.addPoint([ts ,BSPS], true, shift_BSPS);
			
            setTimeout('requestNwIo("' + node + '","' + client + '","' + b64uid + '")', 10000);    
	},
	dataType: 'json',
	cache: false
    });
}
	
function requestMemIo(node,client,b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgrid/json/?e=1&m=U3lzSnFHcmlkJkd873&cm=TUVNSU8=JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&u=' + b64uid + 'U7g7ZZ',
	success: function(point) {
            var ts = (new Date()).getTime();
		
            var R_SIZE = parseFloat(point.R_SIZE);
            var series_R_SIZE = chartmemio.series[0];
            var shift_R_SIZE = series_R_SIZE.data.length > 240; 
            series_R_SIZE.addPoint([ts ,R_SIZE], true, shift_R_SIZE);
			
            var R_AMB = parseFloat(point.R_AMB);
            var series_R_AMB = chartmemio.series[1];
            var shift_R_AMB = series_R_AMB.data.length > 240; 
            series_R_AMB.addPoint([ts ,R_AMB], true, shift_R_AMB);
			
            var S_ABS = parseFloat(point.S_ABS);
            var series_S_ABS = chartmemio.series[2];
            var shift_S_ABS = series_S_ABS.data.length > 240; 
            series_S_ABS.addPoint([ts ,S_ABS], true, shift_S_ABS);
			
            var S_CU = parseFloat(point.S_CU);
            var series_S_CU = chartmemio.series[3];
            var shift_S_CU = series_S_CU.data.length > 240; 
            series_S_CU.addPoint([ts ,S_CU], true, shift_S_CU);
			
            setTimeout('requestMemIo("' + node + '","' + client + '","' + b64uid + '")', 10000);    
	},
	dataType: 'json',
	cache: false
    });
}

/**
 * Charting Functions
 */

function ChartLinuxCpu(node,client,b64uid) {
    chartcpu = new Highcharts.Chart({
        chart: {
            renderTo: 'cpu',
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
                load: requestLinuxCpu(node,client,b64uid)
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
                    text: 'CPU Usage in %',
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
                    name: 'User',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 1,
                    name: 'Nice',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 2,
                    name: 'System',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 3,
                    name: 'IOWait',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 4,
                    name: 'Steal',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
                }
            ]
        });
}

function ChartWinCpu(node,client,b64uid) {
    chartcpu = new Highcharts.Chart({
        chart: {
            renderTo: 'cpu',
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
                load: requestWinCpu(node,client,b64uid)
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
                    text: 'CPU Usage in %',
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
                    name: 'DPC Time',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 1,
                    name: 'Interrupt Time',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 2,
                    name: 'Privileged Time',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 3,
                    name: 'Processor Time',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 4,
                    name: 'User Time',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
                }
            ]
        });
}

function ChartWinIo(node,client,b64uid) {
    chartio = new Highcharts.Chart({
        chart: {
            renderTo: 'io',
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
                load: requestWinIo(node,client,b64uid)
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
                text: 'Bytes pro Sekunde',
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
	},{
            gridLineWidth: 1,    
            lineColor: '#82abcc',
            lineWidth: 1,
            gridLineColor: '#004c8a',
            title: {
                text: 'Requests pro Sekunde',
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
            min: 0,
            opposite: true
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
            name: 'Read Bytes',
            type: 'spline',
            yAxis: 0,
            data: [ [startts,0] ]
	},{
            id: 1,
            name: 'IO Reads',
            type: 'spline',
            yAxis: 1,
            data: [ [startts,0] ]
	},{
            id: 2,
            name: 'Write Bytes',
            type: 'spline',
            yAxis: 0,
            data: [ [startts,0] ]
	},{
            id: 3,
            name: 'IO Writes',
            type: 'spline',
            yAxis: 1,
            data: [ [startts,0] ]
	},{
            id: 4,
            name: 'Split IO',
            type: 'spline',
            yAxis: 1,
            data: [ [startts,0] ]
        }]
    });
}

function ChartLinuxIo(node,client,b64uid) {
    chartio = new Highcharts.Chart({
        chart: {
            renderTo: 'io',
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
                load: requestLinuxIo(node,client,b64uid)
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
                text: 'Bytes pro Sekunde',
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
	},{
            gridLineWidth: 1,    
            lineColor: '#82abcc',
            lineWidth: 1,
            gridLineColor: '#004c8a',
            title: {
                text: 'Requests pro Sekunde',
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
            min: 0,
            opposite: true
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
        series: [{
            id: 0,
            name: 'Read Bytes',
            type: 'spline',
            yAxis: 0,
            data: [ [startts,0] ]
        },{
            id: 1,
            name: 'IO Reads',
            type: 'spline',
            yAxis: 1,
            data: [ [startts,0] ]
        },{
            id: 2,
            name: 'Write Bytes',
            type: 'spline',
            yAxis: 0,
            data: [ [startts,0] ]
        },{
            id: 3,
            name: 'IO Writes',
            type: 'spline',
            yAxis: 1,
            data: [ [startts,0] ]
        }]
    });
}

function ChartNwIo(node,client,b64uid) {
    chartnwio = new Highcharts.Chart({
        chart: {
            renderTo: 'nwio',
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
                load: requestNwIo(node,client,b64uid)
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
                text: 'Bytes pro Sekunde',
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
		name: 'Network Recieve',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 1,
		name: 'Network Send',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            }]
    });
}
		
function ChartMemIo(node,client,b64uid) {		
    chartmemio = new Highcharts.Chart({
        chart: {
            renderTo: 'memio',
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
                load: requestMemIo(node,client,b64uid)
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
                text: 'Bytes pro Sekunde',
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
		name: 'RAM Size',
		type: 'area',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 1,
		name: 'RAM Usage',
		type: 'area',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 2,
		name: 'Swap/Pagefile Size',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 3,
		name: 'Swap/Pagefile Usage',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            }]
    });
}