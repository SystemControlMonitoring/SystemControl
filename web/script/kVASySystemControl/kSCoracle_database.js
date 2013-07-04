var node = urlPara('h');
var client = urlPara('c');
var db = urlPara('db');
var startts = (new Date()).getTime();
var chartcpu;
var chartsysstat;
var chartwaitevents;
var chartsga;

function Top() {
    $('#TopMenu').append('<div><span style="float: left;"><table cellpadding=0 cellspacing=0 border=0 id="TopMenuTable"><tr><td><a href="../">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a href="../hosts.jsp">Hosts</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a class="Onclick" onclick="history.back ();">' + $.base64.decode( urlPara('c') ) + '</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>' + $.base64.decode( db ) + '</td></tr></table></span><span id="TopMenuIconGear" class="ui-icon ui-icon-info" style="float: left;" title="Weitere Datenbank Informationen."></span><span id="HostStatusSlim" style="float: left;"></span></div>');
    $('#TopMenuIconGear').click( function() {
            if ($("#ExtSysInfo").is(":hidden")) {
                $('#ExtSysInfo').fadeIn(100).css('zIndex',30);
            } else {
                $('#ExtSysInfo').fadeOut(100).css('zIndex',0);
            }
        }
    );
}

function DbInfo(uid) {
    var b64uid = $.base64.encode( uid );
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=REJJTkZPJkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&db=' + db + 'KlUh88&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success: function(point) {
            $('#HostStatusSlim').html('<font class="ON">ONLINE</font>');
            $('#ExtSysInfo').html('<h3>Weitere DB Informationen:</h3><table id="ExtSysInfoTable"></table>');
            $.each(point, function(key,value) {
                $.each(value, function(name,data) {
                    $('#ExtSysInfoTable').append('<tr><td>'+ name +'</td><td><span id="ExtSysInfoTableIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>'+ data +'</td></tr>');
                });
            });
            $('#AjaxLoader').remove();
            setTimeout('DbInfo("' + uid + '")', 10000);
        },
        error: function(jqXhr, textStatus, error) {
            $('#HostStatusSlim').html('<font class="OFF">OFFLINE</font>');
        },
        dataType: 'json',
        cache: false
    });
}

function Storage(uid) {
    var b64uid = $.base64.encode( uid );
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    // Charts
    ChartCpu(b64uid);
    ChartSysstat(b64uid);
    requestDatawaitevents(b64uid);
    ChartSGA(b64uid);
    // Tablespace
    $('#list2').jqGrid({         
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=VFNJTkZPKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Status', 'Gesamt (MB)', 'Genutzt (MB)', 'Verf&uuml;gbar (MB)', 'Max. Gr&ouml;&szlig;e (MB)', 'Max. Verf&uuml;gbar (MB)', '%'],
	colModel:[ 
		{name:'tsname', width: 130, align:'left', sortable: true, resizable:true},
		{name:'status', width: 130, align:'center', sortable: true, resizable:true},
		{name:'gesamtMB', width: 130, align:'center', sortable: true, resizable:true},
		{name:'usedMB', width: 130, align:'center', sortable: true, resizable:true},
		{name:'freeMB', width: 130, align:'center', sortable: true, resizable:true},
		{name:'gesamtMaxMB', width: 130, align:'center', sortable: true, resizable:true},
		{name:'gesamtFreeMB', width: 130, align:'center', sortable: true, resizable:true},
		{name:'pct_used', width: 130, align:'center', sortable: true, resizable:true}
	],
	rowNum:5,
	rowList:[3,5,7,10,15,20],
	pager: '#pager2',
	sortname: 'tsname',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Tablespaces',
	height: 125,
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list2').jqGrid('navGrid','#pager2',{edit:false,add:false,del:false,search:false});
    // Datenfile
    $('#list3').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=REZJTkZPKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['TS Name', 'DF Name', 'Status', 'Gr&ouml;&szlig;e (MB)', 'Genutzt (MB)', 'Max. Gr&ouml;&szlig;e (MB)', 'AUTOEXTEND'],
	colModel:[
		{name:'tsname', width: 100, align:'left', sortable: true, resizable:true},
		{name:'name',  width: 495, align:'left', sortable: true, resizable:true},
		{name:'status', width: 90, align:'center', sortable: true, resizable:true},
		{name:'sizeBytes', width: 90, align:'center', sortable: true, resizable:true},
		{name:'usageBytes', width: 90, align:'center', sortable: true, resizable:true},
		{name:'maxBytes', width: 90, align:'center', sortable: true, resizable:true},
		{name:'auto', width: 90, align:'center', sortable: true, resizable:true}
	],
	rowNum:13,
	rowList:[10,13,17,20,30,40],
	pager: '#pager3',
	sortname: 'name',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Datafiles',
	width: '1045',
	height: 326,
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list3').jqGrid('navGrid','#pager3',{edit:false,add:false,del:false,search:false});
    
    $('#list4').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=QUxFUlRMT0c=KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Logfile'],
	colModel:[ 
			{name:'zeile', width: '1030', align:'left', sortable: false, resizable:true}
	],
	rowNum:23,
	rowList:[18,23,30,40,50],
	pager: '#pager4',
	sortname: 'zeile',
	viewrecords: true,
	sortorder: 'desc',
	rownumbers: true,
	rownumWidth: 40,
	caption: 'Die letzten 500 Zeilen der Alert Log',
	width: '1040',
	height: '576',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list4').jqGrid('navGrid','#pager4',{edit:false,add:false,del:false,search:false});
	
    $('#list5').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=VE9QU1FMKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['ID', 'SQL-Text', 'Child', 'Reads', 'Execs', 'First Load', 'Last Load', 'Min'],
	colModel:[
		{name:'sql_id', width: 100, align:'center', sortable: false, resizable:true},
		{name:'sql_fulltext', width: 430, align:'left', sortable: false, resizable:true},
		{name:'child_number', width: 50, align:'center', sortable: true, resizable:true},
		{name:'disk_reads', width: 70, align:'center', sortable: true, resizable:true},
		{name:'executions', width: 70, align:'center', sortable: true, resizable:true},
		{name:'first_load_time', width: 125, align:'center', sortable: true, resizable:true},
		{name:'last_load_time', width: 125, align:'center', sortable: true, resizable:true},
		{name:'elapsed_time', width: 70, align:'center', sortable: true, resizable:true}
	],
	rowNum:24,
	rowList:[18,24,30,40,50],
	pager: '#pager5',
	sortname: 'elapsed_time',
	viewrecords: true,
	sortorder: 'desc',
	caption: 'Statements',
	height: 577,
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list5').jqGrid('navGrid','#pager5',{edit:false,add:false,del:false,search:false});

    $('#list6').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=U0VTU0lPTg==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Status', 'SID', 'PID', 'Serial#', 'Username', 'OS User', 'Programm', 'Login Time', 'Last Call'],
	colModel:[ 
		{name:'s.status', width: 90, align:'center', sortable: true, resizable:true},
		{name:'s.sid', width: 50, align:'center', sortable: true, resizable:true},
		{name:'p.spid', width: 50, align:'center', sortable: true, resizable:true},
		{name:'s.serial#', width: 50, align:'center', sortable: true, resizable:true},
		{name:'s.username', width: 125, align:'left', sortable: true, resizable:true},
		{name:'s.osuser', width: 205, align:'left', sortable: true, resizable:true},
		{name:'s.program', width: 250, align:'left', sortable: true, resizable:true},
		{name:'s.logon_time', width: 125, align:'center', sortable: false, resizable:true},
		{name:'s.last_call_et', width: 90, align:'center', sortable: false, resizable:true}
	],
	rowNum:24,
	rowList:[18,24,30,40,50],
	pager: '#pager6',
	sortname: 's.sid',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Sessions',
	height: 578,
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list6').jqGrid('navGrid','#pager6',{edit:false,add:false,del:false,search:false});

    $('#list7').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=UEFSQU1FVEVSKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Beschreibung', 'Wert', 'Standard'],
	colModel:[ 
		{name:'NAME', width: 250, align:'left', sortable: true, resizable:true},
		{name:'DESCRIPTION', width: 400, align:'left', sortable: false, resizable:true},
		{name:'DISPLAY_VALUE', width: 359, align:'left', sortable: false, resizable:true},
		{name:'ISDEFAULT', width: 50, align:'center', sortable: true, resizable:true}
	],
	rowNum:10,
	rowList:[10,15,20,30,40],
	pager: '#pager7',
	sortname: 'NAME',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Instanz Parameter',
	height: 251,
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list7').jqGrid('navGrid','#pager7',{edit:false,add:false,del:false,search:false});

    $('#list8').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=TkxTKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Wert'],
	colModel:[ 
		{name:'PARAMETER', width: 250, align:'left', sortable: true, resizable:true},
		{name:'VALUE', width: 220, align:'left', sortable: false, resizable:true}
	],
	rowNum:8,
	rowList:[10,15,20,30,40],
	pager: '#pager8',
	sortname: 'NAME',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'NLS Parameter',
	height: 201,
	width: '520',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list8').jqGrid('navGrid','#pager8',{edit:false,add:false,del:false,search:false});

    $('#list9').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=REJVU0VSKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Status', 'Erstellt', 'Default TS', 'TEMP TS'],
	colModel:[
		{name:'username', width: 400, align:'left', sortable: true, resizable:true},
		{name:'account_status', width: 175, align:'left', sortable: true, resizable:true},
		{name:'created', width: 125, align:'center', sortable: true, resizable:true},
		{name:'default_tablespace', width: 180, align:'left', sortable: true, resizable:true},
		{name:'temporary_tablespace', width: 180, align:'left', sortable: true, resizable:true}
	],
	rowNum:24,
	rowList:[20,24,30,40,50],
	pager: '#pager9',
	sortname: 'USERNAME',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'User Liste',
	height: 578,
	width: '520',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list9').jqGrid('navGrid','#pager9',{edit:false,add:false,del:false,search:false});

    $('#list10').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=TE9DS0VEKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['SID', 'SQL ID', 'User', 'Machine', 'Blocker', 'Geblockter'],
	colModel:[
		{name:'S.SID', width: 100, align:'left', sortable: true, resizable:true},
		{name:'S.SQL_ID', width: 200, align:'left', sortable: true, resizable:true},
		{name:'S.USERNAME', width: 300, align:'center', sortable: true, resizable:true},
		{name:'S.MACHINE', width: 250, align:'left', sortable: true, resizable:true},
		{name:'a.sid', width: 100, align:'left', sortable: true, resizable:true},
		{name:'b.sid', width: 100, align:'left', sortable: true, resizable:true}
	],
	rowNum:4,
	rowList:[4,9,10,15],
	pager: '#pager10',
	sortname: 'S.SID',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Locked Sessions',
	height: '100',
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list10').jqGrid('navGrid','#pager10',{edit:false,add:false,del:false,search:false});

    $('#list11').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=SU5WQUxJRA==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Type', 'Name', 'SubObj Name', 'TimeStamp', 'Temp'],
	colModel:[
		{name:'object_type', width: 205, align:'left', sortable: true, resizable:true},
		{name:'object_name', width: 200, align:'left', sortable: true, resizable:true},
		{name:'subobject_name', width: 300, align:'center', sortable: true, resizable:true},
		{name:'timestamp', width: 250, align:'left', sortable: true, resizable:true},
		{name:'temporary', width: 100, align:'left', sortable: true, resizable:true}
	],
	rowNum:4,
	rowList:[4,9,10,15],
	pager: '#pager11',
	sortname: 'object_type',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Invalide Objekte',
	height: '100',
	width: '1040',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list11').jqGrid('navGrid','#pager11',{edit:false,add:false,del:false,search:false});

    $('#list12').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=SU5WX1BBUlQ=KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Owner', 'Name', 'Partition Name', 'Status'],
	colModel:[
		{name:'INDEX_OWNER', width: 150, align:'left', sortable: true, resizable:true},
		{name:'INDEX_NAME', width: 150, align:'left', sortable: true, resizable:true},
		{name:'PARTITION_NAME', width: 150, align:'center', sortable: true, resizable:true},
		{name:'STATUS', width: 50, align:'left', sortable: true, resizable:true}
	],
	rowNum:4,
	rowList:[4,9,10,15],
	pager: '#pager12',
	sortname: 'INDEX_NAME',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Invalide Index Partitions',
	height: '102',
	width: '500',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list12').jqGrid('navGrid','#pager12',{edit:false,add:false,del:false,search:false});

    $('#list13').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=SU5WX0lORA==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Owner', 'Name', 'Status'],
	colModel:[
		{name:'OWNER', width: 200, align:'left', sortable: true, resizable:true},
		{name:'INDEX_NAME', width: 205, align:'left', sortable: true, resizable:true},
		{name:'STATUS', width: 100, align:'center', sortable: true, resizable:true}
	],
	rowNum:4,
	rowList:[4,9,10,15],
	pager: '#pager13',
	sortname: 'INDEX_NAME',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Invalide Indexe',
	height: '101',
	width: '500',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list13').jqGrid('navGrid','#pager13',{edit:false,add:false,del:false,search:false});

    $('#list14').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=Uk1BTkxPRw==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Logfile'],
	colModel:[ 
		{name:'zeile', width: '1030', align:'left', sortable: false, resizable:true}
	],
	rowNum:9,
	rowList:[9,20,30,40,50,100],
	pager: '#pager14',
	sortname: 'zeile',
	viewrecords: true,
	sortorder: 'desc',
	rownumbers: true,
	rownumWidth: 40,
	caption: 'Die letzten 500 Zeilen des RMAN Log',
	width: '1040',
	height: '226',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list14').jqGrid('navGrid','#pager14',{edit:false,add:false,del:false,search:false});

    $('#list15').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=Q1VSQVJDSA==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Seq.#', 'SCN', 'Zeit', 'Archiviert'],
	colModel:[
		{name:'name', width: 200, align:'left', sortable: true, resizable:true},
		{name:'sequence#', width: 55, align:'left', sortable: true, resizable:true},
		{name:'first_change#', width: 80, align:'left', sortable: true, resizable:true},
		{name:'first_time', width: 80, align:'left', sortable: true, resizable:true},
		{name:'completion_time', width: 80, align:'center', sortable: true, resizable:true}
	],
	rowNum:9,
	rowList:[9,20,30,40,50],
	pager: '#pager15',
	sortname: 'name',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Nicht archivierte Archivelogs',
	height: '227',
	width: '500',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list15').jqGrid('navGrid','#pager15',{edit:false,add:false,del:false,search:false});

    $('#list16').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=TElTVEJBQ0tVUA==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Datum', 'Typ', 'Device', 'Stempel'],
	colModel:[
		{name:'p.handle', width: 100, align:'left', sortable: true, resizable:true},
		{name:'p.completion_time', width: 95, align:'left', sortable: true, resizable:true},
		{name:'s.backup_type', width: 100, align:'left', sortable: true, resizable:true},
		{name:'p.device_type', width: 100, align:'left', sortable: true, resizable:true},
		{name:'s.set_stamp', width: 100, align:'center', sortable: true, resizable:true}
	],
	rowNum:9,
	rowList:[9,20,30,40,50],
	pager: '#pager16',
	sortname: 'p.completion_time',
	viewrecords: true,
	sortorder: 'asc',
	caption: 'Liste aller Backupsets',
	height: '226',
	width: '500',
	hidegrid: false,
	shrinkToFit: false,
	autowidth: true
    });
    $('#list16').jqGrid('navGrid','#pager16',{edit:false,add:false,del:false,search:false});

    $('#list17').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=RkxSQQ==KLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Name', 'Limit (MB)', 'Genutzt (MB)', 'Wiederverwendbar (MB)', 'Anzahl der Files'],
	colModel:[
		{name:'name', width: 495, align:'left', sortable: false, resizable:true},
		{name:'space_limit', width: 150, align:'center', sortable: false, resizable:true},
		{name:'space_used', width: 150, align:'center', sortable: false, resizable:true},
		{name:'space_reclaimable', width: 150, align:'center', sortable: false, resizable:true},
		{name:'number_of_files', width: 110, align:'center', sortable: false, resizable:true}
	],
	rowNum:1,
	pager: '#pager17',
	sortname: 'name',
	viewrecords: false,
	sortorder: 'asc',
	caption: '&Uuml;bersicht',
	height: '25',
	width: '1040',
	shrinkToFit: false,
	autowidth: true,
	hidegrid: false,
	pgbuttons: false,
	pgtext: null
    });
    $('#list17').jqGrid('navGrid','#pager17',{edit:false,add:false,del:false,search:false});
    
    $('#list18').jqGrid({ 
	url:'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=KjHu88&h=' + node + 'KjUU89&c=' + client + 'WzzU76&cm=RkxSQVVTQUdFKLMUHp&db=' + db + 'K4KuuZ&u=' + b64uid + 'LKHld3',
	datatype: 'json',
	colNames:['Typ', 'Genutzt (%)', 'Wiederverwendbar (%)', 'Anzahl Files'],
	colModel:[
		{name:'FILE_TYPE', width: 280, align:'left', sortable: false, resizable:true},
		{name:'PERCENT_SPACE_USED', width: 260, align:'center', sortable: false, resizable:true},
		{name:'PERCENT_SPACE_RECLAIMABLE', width: 260, align:'center', sortable: false, resizable:true},
		{name:'NUMBER_OF_FILES', width: 260, align:'center', sortable: false, resizable:true}
	],
	rowNum:7,
	pager: '#pager18',
	sortname: 'FILE_TYPE',
	viewrecords: false,
	sortorder: 'asc',
	caption: 'Liste der Filetypes',
	height: '175',
	width: '1040',
	shrinkToFit: false,
	autowidth: true,
	hidegrid: false,
	pgbuttons: false,
	pgtext: null
    });
    $('#list18').jqGrid('navGrid','#pager18',{edit:false,add:false,del:false,search:false});
}

/**
 * Request Functions
 **/

function requestDatacpu(b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=Jkd873&cm=Q1BVJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&db=' + db + 'Klu8Uz&u=' + b64uid + 'U7g7ZZ',
        success: function(point) {
            var ts = (new Date()).getTime();

            var CPU_TOTAL = parseFloat(point.CPU_TOTAL);
            var series_CPU_TOTAL = chartcpu.series[0];
            var shift_CPU_TOTAL = series_CPU_TOTAL.data.length > 240; 
            series_CPU_TOTAL.addPoint([ts ,CPU_TOTAL], true, shift_CPU_TOTAL);

            var CPU_OS = parseFloat(point.CPU_OS);
            var series_CPU_OS = chartcpu.series[1];
            var shift_CPU_OS = series_CPU_OS.data.length > 240; 
            series_CPU_OS.addPoint([ts ,CPU_OS], true, shift_CPU_OS);

            var CPU_ORA = parseFloat(point.CPU_ORA);
            var series_CPU_ORA = chartcpu.series[2];
            var shift_CPU_ORA = series_CPU_ORA.data.length > 240; 
            series_CPU_ORA.addPoint([ts ,CPU_ORA], true, shift_CPU_ORA);

            var CPU_ORA_WAIT = parseFloat(point.CPU_ORA_WAIT);
            var series_CPU_ORA_WAIT = chartcpu.series[3];
            var shift_CPU_ORA_WAIT = series_CPU_ORA_WAIT.data.length > 240; 
            series_CPU_ORA_WAIT.addPoint([ts ,CPU_ORA_WAIT], true, shift_CPU_ORA_WAIT);

            var COMMIT = parseFloat(point.COMMIT);
            var series_COMMIT = chartcpu.series[4];
            var shift_COMMIT = series_COMMIT.data.length > 240; 
            series_COMMIT.addPoint([ts ,COMMIT], true, shift_COMMIT);

            var READIO = parseFloat(point.READIO);
            var series_READIO = chartcpu.series[5];
            var shift_READIO = series_READIO.data.length > 240; 
            series_READIO.addPoint([ts ,READIO], true, shift_READIO);

            var WAIT = parseFloat(point.WAIT);
            var series_WAIT = chartcpu.series[6];
            var shift_WAIT = series_WAIT.data.length > 240; 
            series_WAIT.addPoint([ts ,WAIT], true, shift_WAIT);

            setTimeout('requestDatacpu("' + b64uid + '")', 10000);
	},
	dataType: 'json',
	cache: false
    });
}

function requestDatasysstat(b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=Jkd873&cm=U1lTU1RBVA==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&db=' + db + 'Klu8Uz&u=' + b64uid + 'U7g7ZZ',
	success: function(point) {
            var ts = (new Date()).getTime();
		
            var PRTBPS = parseFloat(point.PRTBPS);
            var series_PRTBPS = chartsysstat.series[0];
            var shift_PRTBPS = series_PRTBPS.data.length > 240; 
            series_PRTBPS.addPoint([ts ,PRTBPS], true, shift_PRTBPS);
			
            var PWTBPS = parseFloat(point.PWTBPS);
            var series_PWTBPS = chartsysstat.series[1];
            var shift_PWTBPS = series_PWTBPS.data.length > 240; 
            series_PWTBPS.addPoint([ts ,PWTBPS], true, shift_PWTBPS);
			
            var PRTIOR = parseFloat(point.PRTIOR);
            var series_PRTIOR = chartsysstat.series[2];
            var shift_PRTIOR = series_PRTIOR.data.length > 240; 
            series_PRTIOR.addPoint([ts ,PRTIOR], true, shift_PRTIOR);
			
            var PWTIOR = parseFloat(point.PWTIOR);
            var series_PWTIOR = chartsysstat.series[3];
            var shift_PWTIOR = series_PWTIOR.data.length > 240; 
            series_PWTIOR.addPoint([ts ,PWTIOR], true, shift_PWTIOR);
			
            var DBC = parseFloat(point.DBC);
            var series_DBC = chartsysstat.series[4];
            var shift_DBC = series_DBC.data.length > 240; 
            series_DBC.addPoint([ts ,DBC], true, shift_DBC);
			
            var DBG = parseFloat(point.DBG);
            var series_DBG = chartsysstat.series[5];
            var shift_DBG = series_DBG.data.length > 240; 
            series_DBG.addPoint([ts ,DBG], true, shift_DBG);
			
            var OCC = parseFloat(point.OCC);
            var series_OCC = chartsysstat.series[6];
            var shift_OCC = series_OCC.data.length > 240; 
            series_OCC.addPoint([ts ,OCC], true, shift_OCC);
	
            setTimeout('requestDatasysstat("' + b64uid + '")', 10000);  
	},
	dataType: 'json',
        cache: false
    });
}

function requestDatasga(b64uid) {
    $.ajax({
        url: '/api/OracleDB.cpl?module=SGA&db=ORCL2',
        url: 'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=Jkd873&cm=U0dBJhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&db=' + db + 'Klu8Uz&u=' + b64uid + 'U7g7ZZ',
        success: function(point) {
            $.each(point, function(series_name,series_data) {
		chartsga.addSeries({
                    name: series_name,
                    data: [ parseFloat(series_data) ]
                });
            });   
	},
	dataType: 'json',
        cache: false
    });
}

/**
 * Charting Functions
 */

function ChartCpu(b64uid) {
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
                load: requestDatacpu(b64uid)
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
                text: 'CPU OS Usage in %',
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
                text: 'CPU Oracle Usage in %',
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
		name: 'CPU Total',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 1,
		name: 'CPU OS',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 2,
		name: 'CPU Oracle',
		type: 'spline',
		yAxis: 0,
		data: [ [startts,0] ]
            },{
		id: 3,
		name: 'CPU Oracle Wait',
		type: 'spline',
		yAxis: 1,
		data: [ [startts,0] ]
            },{
		id: 4,
		name: 'CPU Commit',
		type: 'spline',
		yAxis: 1,
		data: [ [startts,0] ]
            },{
		id: 5,
		name: 'CPU Read IO',
		type: 'spline',
		yAxis: 1,
		data: [ [startts,0] ]
            },{
		id: 6,
		name: 'CPU Wait',
		type: 'spline',
		yAxis: 1,
		data: [ [startts,0] ]
            }
        ]
    });
}

function ChartSysstat(b64uid) {
    chartsysstat = new Highcharts.Chart({
        chart: {
            renderTo: 'sysstat',
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
                load: requestDatasysstat(b64uid)
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
                    text: 'Bytes',
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
                    text: 'Requests',
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
                    name: 'Write Bytes',
                    type: 'spline',
                    yAxis: 0,
                    data: [ [startts,0] ]
		},{
                    id: 2,
                    name: 'Read IO',
                    type: 'spline',
                    yAxis: 1,
                    data: [ [startts,0] ]
		},{
                    id: 3,
                    name: 'Write IO',
                    type: 'spline',
                    yAxis: 1,
                    data: [ [startts,0] ]
                },{
                    id: 4,
                    name: 'Block Changes',
                    type: 'spline',
                    yAxis: 1,
                    data: [ [startts,0] ]
		},{
                    id: 5,
                    name: 'Block Gets',
                    type: 'spline',
                    yAxis: 1,
                    data: [ [startts,0] ]
                },{
                    id: 6,
                    name: 'Open Cursors',
                    type: 'spline',
                    yAxis: 1,
                    data: [ [startts,0] ]
		}
            ]
    });
}

function requestDatawaitevents(b64uid) {
    $.ajax({
        url: 'http://' + Backend + '/jqgridc/json/?e=1&m=T3JhY2xlREI=Jkd873&cm=V0FJVEVWRU5UUw==JhDQ83&h=' + node + 'Hjd876&c=' + client + 'Jjd723&db=' + db + 'Klu8Uz&u=' + b64uid + 'U7g7ZZ',
	success: function(point) {
            // Define function variables
            var data = [];
            var categories = [];
            var browserData = [];
            var versionsData = [];
            var name = 'Browser brands';
            var colors = Highcharts.getOptions().colors;
            var chartwaitevents;
            // Execution
            var m = 0;
            $.each(point, function(wait_class, event) {
                var sum;
		var subcat = [];
		var subdata = [];
		$.each(event, function(key, option) {
                    var l = 0;
                    $.each(option, function(event_name, value) {
                        if (l == 0) {
                            // Get Summary Element
                            sum = parseInt(value/100);
			} else {
                            // Else fill data Array
                            if (value/100 > 1) {
                                subcat.push(event_name);
				subdata.push(parseInt(value/100));
                            }
			}
			l++;
                    });
		});
		// Push Categories
		categories.push(wait_class);
		// Push Data
		data.push({
                    y: sum,
                    color: colors[m],
                    drilldown: {
                        name: wait_class + " versions",
			categories: subcat,
			data: subdata,
			color: colors[m]
                    }
		});
		//
		m++;
            });
            //alert(browserData);
				
            for (var i = 0; i < data.length; i++) {
                // add browser data
		browserData.push({
                    name: categories[i],
                    y: data[i].y,
                    color: data[i].color
		});
    
                // add version data
		for (var j = 0; j < data[i].drilldown.data.length; j++) {
                    var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
                    versionsData.push({
                        name: data[i].drilldown.categories[j],
			y: data[i].drilldown.data[j],
			color: Highcharts.Color(data[i].color).brighten(brightness).get()
                    });
		}
            }
				
            // Create the chart
            chartwaitevents = new Highcharts.Chart({
		chart: {
                    renderTo: 'waitevents',
                    type: 'pie',
                    borderRadius: 0,
                    borderWidth: 0,
                    borderColor: '#82abcc',
                    width: 1100,
                    height: 675,
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
			shadow: false,
			animation: false,
			dataLabels: {
                            style: {
				color: '#82abcc',
				fontFamily: 'SansProLight',
                                fontSize: '14px'
                            }
                        }
                    }
		},
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
                    valueSuffix: ' Sec'
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
		series: [{
                    name: 'Wait Class',
                    data: browserData,
                    size: '60%',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
		}, {
                    name: 'Wait Event',
                    data: versionsData,
                    innerSize: '60%',
                    dataLabels: {
			formatter: function() {
                            // display only if larger than 1
                            return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +' Sec'  : null;
			}
                    },
                    showInLegend: false
                }]
            });

            setTimeout('requestDatawaitevents("' + b64uid + '")', 600000);
	},
	dataType: 'json',
	cache: false
    });
}

function ChartSGA(b64uid) {
    chartsga = new Highcharts.Chart({
	chart: {
            renderTo: 'sga',
            type: 'column',
            width: 330,
            height: 300,
            borderRadius: 0,
            borderWidth: 0,
            plotBackgroundColor: null,
            backgroundColor: null,
            events: {
                load: requestDatasga(b64uid)
            }
	},
	credits: {
            enabled: false
	},
	legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -30,
            y: 40,
            borderWidth: 0,
            itemStyle: {
		cursor: 'pointer',
		color: '#82abcc',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            },
            itemHoverStyle: {
		color: '#ffffff',
		cursor: 'pointer',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            }
	},
	exporting: {
            enabled: false
	},
	title: {
            text: 'MEMORY',
            margin: 50,
            style: {
		color: '#ffffff',
		fontSize: '24px',
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
                    return this.value + "MB";
                }
            },
            min: 0,
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
            backgroundColor: '#004c8a',
            borderColor: '#82abcc',
            borderRadius: 0,
            borderWidth: 1,
            style: {
		color: '#ffffff',
		fontFamily: 'SansProLight',
                fontSize: '14px'
            },
            formatter: function() {
                return '<b>'+ this.y + ' MB</b>';
            }
	},
	plotOptions: {
            column: {
		shadow: false,
		animation: false,                        
		stacking: 'normal',
		dataLabels: {
                    enabled: false,
                    color: '#ffffff',
                    fontFamily: 'SansProLight',
                    fontSize: '12px'
                }
            }
        }
    });
}