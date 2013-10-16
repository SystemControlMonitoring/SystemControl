/* 
 * kSCweblogic.js
 */

var node = urlPara('h');
var client = urlPara('c');

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href="../">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td><a href="../hosts/">Hosts</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>' + $.base64.decode( urlPara('c') ) + '</td></tr></table>');
    
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
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'r',
        handler: function() {
            Reload(uid);
        }
    }).start();
    
    /**
     * Administration
     **/
    
    $('#SidebarSubmenu').append('<div id="OracleDBA"><div id="AdminTitle">Administration</div><div id="AdminDivs"></div>\n\
    <div id="AdminButtons">\n\
        <button id="ra_button" style="margin-left: 2px; margin-top: 15px;">Reports Archiv</button>\n\
        <button id="dv_button" style="margin-left: 2px; margin-top: 15px;">Diagnose Verzeichnis</button>\n\
    </div>\n\
    </div>');
    
    
    /**
     * Administration
     **/
    
    $('#SidebarSubmenu').append('<div id="OracleDBA" style="margin-top: 15px;"><div id="AdminTitle" style="margin-bottom: -15px;">Check Kommandos</div>\n\
        <div id="AdminDivs">\n\
            <div id="DivReCheck" title="Erneutes Ausf&uuml;hren von Service Checks - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivReCheckObjects"></div>\n\
            </div>\n\
            <div id="DivAcknldge" title="Bearbeiten des Service Problems - 1 von 2">\n\
                <h3>Bitte tragen Sie die zus&auml;tzlichen Informationen ein!</h3>\n\
                <div id="Author">\n\
                    <font>Author:</font>\n\
                    <input type="text" name="author" id="auth1" value="' + uid + '" readonly />\n\
                </div>\n\
                <div id="Comment">\n\
                    <font>Kommentar:</font>\n\
                    <textarea name="comment" id="comm1"></textarea>\n\
                </div>\n\
                <!--h3>Soll der Eintrag per Mail an den Kunden verschickt werden? (Mail1,Mail2,Mailn)</h3>\n\
                <div id="Senden">\n\
                    <input name="mailingto" type="checkbox" id="send" value="1" onclick="EnableInput(\'#mailaddr\');" />\n\
                    <input name="mailaddr" id="mailaddr" type="text" value=""/>\n\
                </div>\n\
                <h3>Soll der Eintrag f&uuml;r die Servicereports in die Datenbank geschrieben werden?</h3>\n\
                <div id="Insertto">\n\
                    <input name="insertto" type="checkbox" id="insertto1" value="1" onclick="EnableInput(\'#insertto2\');" />\n\
                    <span id="insertto2">Ja!</font>\n\
                </div-->\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivAcknldgeObjects"></div>\n\
            </div>\n\
            <div id="DivComment" title="Kommentieren des Service Problems - 1 von 2">\n\
                <h3>Bitte tragen Sie die zus&auml;tzlichen Informationen ein!</h3>\n\
                <div id="CAuthor">\n\
                    <font>Author:</font>\n\
                    <input type="text" name="author" id="Cauth" value="' + uid + '" readonly />\n\
                </div>\n\
                <div id="CComment">\n\
                    <font>Kommentar:</font>\n\
                    <textarea name="comment" id="Ccomm"></textarea>\n\
                </div>\n\
                <!--h3>Soll der Eintrag per Mail an den Kunden verschickt werden? (Mail1,Mail2,Mailn)</h3>\n\
                <div id="CSenden">\n\
                    <input name="mailingto" type="checkbox" id="Csend" value="1" onclick="EnableInput(\'#Cmailaddr\');" />\n\
                    <input name="mailaddr" id="Cmailaddr" type="text" value=""/>\n\
                </div>\n\
                <h3>Soll der Eintrag f&uuml;r die Servicereports in die Datenbank geschrieben werden?</h3>\n\
                <div id="CInsertto">\n\
                    <input name="insertto" type="checkbox" id="Cinsertto1" value="1" onclick="EnableInput(\'#Cinsertto2\');" />\n\
                    <span id="Cinsertto2">Ja!</font>\n\
                </div-->\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivCommentObjects"></div>\n\
            </div>\n\\n\
            <div id="DivDowntime" title="Downtime eines Service definieren - 1 von 2">\n\
                <h3>Bitte tragen Sie die zus&auml;tzlichen Informationen ein!</h3>\n\
                <div id="DAuthor">\n\
                    <font>Author:</font>\n\
                    <input type="text" name="author" id="Dauth" value="' + uid + '" readonly />\n\
                </div>\n\
                <div id="DComment">\n\
                    <font>Kommentar:</font>\n\
                    <textarea name="comment" id="Dcomm"></textarea>\n\
                </div>\n\
                <div id="DStart">\n\
                    <font>Beginn:</font>\n\
                    <input type="text" name="start" id="Dstartts" />\n\
                </div>\n\
                <div id="DEnd">\n\
                    <font>Ende:</font>\n\
                    <input type="text" name="end" id="Dendts" />\n\
                </div>\n\
                <!--h3>Soll der Eintrag per Mail an den Kunden verschickt werden? (Mail1,Mail2,Mailn)</h3>\n\
                <div id="DSenden">\n\
                    <input name="mailingto" type="checkbox" id="Dsend" value="1" onclick="EnableInput(\'#Dmailaddr\');" />\n\
                    <input name="mailaddr" id="Dmailaddr" type="text" value=""/>\n\
                </div>\n\
                <h3>Soll der Eintrag f&uuml;r die Servicereports in die Datenbank geschrieben werden?</h3>\n\
                <div id="DInsertto">\n\
                    <input name="insertto" type="checkbox" id="Dinsertto1" value="1" onclick="EnableInput(\'#Dinsertto2\');" />\n\
                    <span id="Dinsertto2">Ja!</font>\n\
                </div-->\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivDowntimeObjects"></div>\n\
            </div>\n\
            <div id="DivNotify" title="Benachrichtigung der Service Checks deaktivieren - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivNotifyObjects"></div>\n\
            </div>\n\
            <div id="DivEnNotify" title="Benachrichtigung der Service Checks aktivieren - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivEnNotifyObjects"></div>\n\
            </div>\n\
            <div id="DivRemAck" title="Service Problem wieder freigeben - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivRemAckObjects"></div>\n\
            </div>\n\
            <div id="DivRemDwntm" title="Downtime eines Service l&ouml;schen - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivRemDwntmObjects"></div>\n\
            </div>\n\
            <div id="DivDelLog" title="Leeren eines Logfiles - 1 von 2">\n\
                <h3>Sie f&uuml;hren das Leeren des Logfiles durch.</h3>\n\
                <div id="DivDelLogObjects"></div>\n\
            </div>\n\
        </div>\n\
        <div id="AdminButtons">\n\
            <span id="LogfileButtons"></span><br>\n\
            <button id="ba_button" style="margin-left: 2px; margin-top: 10px;" title="Problem bearbeiten.">Pr. Bearbeiten</button>\n\
            <button id="fr_button" style="margin-left: 2px; margin-top: 10px;" title="Problem freigeben.">Pr. Freigeben</button>\n\
            <button id="ne_button" style="margin-left: 2px; margin-top: 10px;" title="Benachrichtigungen aktivieren.">Ben. +</button>\n\
            <button id="ny_button" style="margin-left: 2px; margin-top: 10px;" title="Benachrichtigungen deaktivieren.">Ben. -</button>\n\
            <button id="rc_button" style="margin-left: 2px; margin-top: 10px;">Re-Check</button>\n\
            <button id="ko_button" style="margin-left: 2px; margin-top: 10px;">Kommentieren</button>\n\
            <button id="dd_button" style="margin-left: 2px; margin-top: 10px;" title="Downtime l&ouml;schen.">Downtime -</button>\n\
            <button id="do_button" style="margin-left: 2px; margin-top: 10px;" title="Downtime festlegen.">Downtime +</button>\n\
            <button id="dl_button" style="margin-left: 2px; margin-top: 10px;" title="Logfile leeren.">Del. Log</button>\n\
        </div>\n\
    </div>');
    
    /**
    * Date Time Picker
    **/

    $.datepicker.regional['de'] = {
	closeText: 'Schlie&szlig;en',
	prevText: 'Zur&uuml;ck',
	nextText: 'Weiter',
	currentText: 'Jetzt',
	monthNames: ['Januar','Februar','M&auml;rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
	monthNamesShort: ['Jan','Feb','M&auml;r','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
	dayNames: ['Sonntag','Montag','Diensag','Mittwoch','Donnerstag','Freitag','Samstag'],
	dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
	dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
	weekHeader: 'Wo',
	dateFormat: 'yy-mm-dd',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['de']);

    $.timepicker.regional['de'] = {
	timeOnlyTitle: 'Uhrzeit ausw&auml;hlen',
	timeText: 'Zeit',
	hourText: 'Stunde',
	minuteText: 'Minute',
	secondText: 'Sekunde',
	currentText: 'Jetzt',
	timeFormat: 'HH:mm:ss',
	closeText: 'Ausw&auml;hlen',
	ampm: false
    };
    $.timepicker.setDefaults($.timepicker.regional['de']);
    
    $('#Dstartts').datetimepicker();
    $('#Dendts').datetimepicker();

    $('#dl_button').button().css('border','1px solid #004279').click(function() {
        var unc = "";
        var usrv = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivDelLogObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                unc += this.name + ";";
                usrv += this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivDelLog').dialog({
            autoOpen: true,
            height: 300,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    $( 'body' ).append('<img id="ajax-loader" title="Leeren des Logfiles." src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Leeren des Logfiles.</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=U3J2TG9nQWRtaW4=KhdU8Z&c=' + $.base64.encode( unc ) + 'KjHu8U&log=' + usrv + '&u=' + b64uid + 'U7g7ZZ&cm=REVMT0c=IZK88i',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Leeren des Logfiles - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Logfiles wurden <b>erfolgreich</b> geleert.</p>');
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 200,
                                width: 500,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivReCheckObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Leeren von Logfiles');
                            $('#DivReCheckObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivReCheckObjects').html('');
                }
            }
        });
    }); 

    $('#rc_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivReCheckObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivReCheck').dialog({
            autoOpen: true,
            height: 300,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    $( 'body' ).append('<img id="ajax-loader" title="Erneutes Ausf&uuml;hren von Service Checks" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Erneutes Ausf&uuml;hren von Service Checks</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=UmVDaGVjaw==KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Erneutes Ausf&uuml;hren von Service Checks - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Service Checks wurden <b>erfolgreich</b> ausgeführt.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 300,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivReCheckObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Erneutes Ausführen von Service Checks');
                            $('#DivReCheckObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivReCheckObjects').html('');
                }
            }
        });
    });
    
    $('#ba_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivAcknldgeObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivAcknldge').dialog({
            autoOpen: true,
            height: 700,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    var author = $('#auth1').attr('value');
                    var comment = $('#comm1').attr('value');
                    $( 'body' ).append('<img id="ajax-loader" title="Bearbeiten des Service Problems" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Bearbeiten des Service Problems</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=QWNrU3ZjKlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ&ar=' + $.base64.encode( author ) + 'U7g7ZZ&cm=' + $.base64.encode( comment ) + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Bearbeiten des Service Problems - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Service Probleme wurden <b>erfolgreich</b> bearbeitet.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 300,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivAcknldgeObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Bearbeiten des Service Problems');
                            $('#DivAcknldgeObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivAcknldgeObjects').html('');
                }
            }
        });
    });

    $('#fr_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivRemAckObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivRemAck').dialog({
            autoOpen: true,
            height: 300,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    var author = $('#auth1').attr('value');
                    var comment = $('#comm1').attr('value');
                    $( 'body' ).append('<img id="ajax-loader" title="Service Problem wieder freigeben" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Service Problem wieder freigeben</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=UmVtQWNrU3ZjKlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Service Problem wieder freigeben - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Service Probleme wurden <b>erfolgreich</b> freigegeben.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 300,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivRemAckObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Service Problem wieder freigeben.');
                            $('#DivRemAckObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivRemAckObjects').html('');
                }
            }
        });
    });

    $('#ko_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivCommentObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivComment').dialog({
            autoOpen: true,
            height: 700,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    var author = $('#Cauth').attr('value');
                    var comment = $('#Ccomm').attr('value');
                    $( 'body' ).append('<img id="ajax-loader" title="Kommentieren des Service" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Kommentieren des Service</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=Q29tU3ZjKlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ&ar=' + $.base64.encode( author ) + 'U7g7ZZ&cm=' + $.base64.encode( comment ) + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Kommentieren des Service - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Services wurden <b>erfolgreich</b> kommentiert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 500,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivCommentObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Kommentieren des Service.');
                            $('#DivCommentObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivCommentObjects').html('');
                }
            }
        });
    });
    
    $('#do_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivDowntimeObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivDowntime').dialog({
            autoOpen: true,
            height: 700,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    var author = $('#Dauth').attr('value');
                    var comment = $('#Dcomm').attr('value');
                    var datestart = $('#Dstartts').attr('value');
                    var dateend = $('#Dendts').attr('value');
                    $( 'body' ).append('<img id="ajax-loader" title="Downtime eines Service definieren" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Downtime eines Service definieren</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=RHdudG1TdmM=KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ&ar=' + $.base64.encode( author ) + 'U7g7ZZ&cm=' + $.base64.encode( comment ) + 'U7g7ZZ&ds=' + datestart + '&de=' + dateend,
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Downtime eines Service definieren - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Downtime der Services wurden <b>erfolgreich</b> definiert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 500,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivDowntimeObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Kommentieren des Service.');
                            $('#DivDowntimeObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivDowntimeObjects').html('');
                }
            }
        });	
    });

    $('#dd_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivRemDwntmObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivRemDwntm').dialog({
            autoOpen: true,
            height: 300,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    var author = $('#Dauth').attr('value');
                    var comment = $('#Dcomm').attr('value');
                    var datestart = $('#Dstartts').attr('value');
                    var dateend = $('#Dendts').attr('value');
                    $( 'body' ).append('<img id="ajax-loader" title="Downtime eines Service l&ouml;schen" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Downtime eines Service l&ouml;schen</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=UmVtRHdudG1TdmM=KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Downtime eines Service l&ouml;schen - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Downtime der Services wurden <b>erfolgreich</b> gel&ouml;scht.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 300,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivRemDwntmObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Downtime eines Service l&ouml;schen.');
                            $('#DivRemDwntmObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivRemDwntmObjects').html('');
                }
            }
        });	
    });

    $('#ny_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivNotifyObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivNotify').dialog({
            autoOpen: true,
            height: 300,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    $( 'body' ).append('<img id="ajax-loader" title="Benachrichtigung der Service Checks deaktivieren" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Benachrichtigung der Service Checks deaktivieren</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=RGVhY05vdFN2Yw==KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Benachrichtigung der Service Checks deaktivieren - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Benachrichtgungen der Service Checks wurden <b>erfolgreich</b> deaktiviert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 300,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivNotifyObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Erneutes Ausführen von Service Checks');
                            $('#DivNotifyObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivNotifyObjects').html('');
                }
            }
        });	
    });

    $('#ne_button').button().css('border','1px solid #004279').click(function() {
        var u = "";
        var array = $('form#SearchService').serializeArray();
        $('#DivEnNotifyObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + "@" + this.value + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td><td>' + this.value + '</td></tr>');
            }
        });
        $('#DivEnNotify').dialog({
            autoOpen: true,
            height: 300,
            width: 750,
            draggable: false,
            resizable: false,
            modal: true,
            buttons: {
                Ausführen: function() {
                    $( 'body' ).append('<img id="ajax-loader" title="Benachrichtigung der Service Checks aktivieren" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Benachrichtigung der Service Checks aktivieren</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=QWNOb3RTdmM=KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Benachrichtigung der Service Checks aktivieren - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Benachrichtgungen der Service Checks wurden <b>erfolgreich</b> aktiviert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Check Name</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.SERVICE_NAME + '</td><td>' + this.TS + '</td></tr>');
                            });
                            $( '#success' ).dialog({
                                autoOpen: true,
                                height: 300,
                                width: 750,
                                draggable: false,
                                resizable: false,
                                modal: true,
                                buttons: { 
                                    OK: function() { 
                                        $( this ).dialog( 'close' );
                                        $('#success').remove();
                                        $('#DivEnNotifyObjects').html('');
                                    }
                                }
                            });
                        },
                        error: function() {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            alert('FEHLER BEI AUSFÜHRUNG: Benachrichtigung der Service Checks aktivieren');
                            $('#DivEnNotifyObjects').html('');
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                Abbrechen: function() {
                    $(this).dialog('close');
                    $('#DivEnNotifyObjects').html('');
                }
            }
        });	
    });
    
    $('#ra_button').button().css('border','1px solid #004279').click(function() {
	window.open('http://' + $.base64.decode( urlPara('c') ) + ':6555/reports/', '_blank');
    });
    $('#dv_button').button().css('border','1px solid #004279').click(function() {
	window.open('http://' + $.base64.decode( urlPara('c') ) + ':6555/diag/', '_blank');
    });
}

function Reload(uid) {
    $('#theme-roller').append('<img id="AjaxLoader" src="../layout/images/ajax-loader.gif">');
    SysInfo(uid);
    SrvInfo(uid);
    DbInfo(uid);
    HostInformations(uid);
}

function SysInfo(uid) {
    var b64uid = $.base64.encode( uid );
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
            WlsInfo(b64uid);
        },
        dataType: 'json',
        cache: false
    });
}

function WlsInfo(uid) {
    //var b64uid = $.base64.encode( uid );
    var b64uid = uid;
    $.ajax({
        url: 'http://' + Backend + '/clientdirect/json/?e=1&m=R0VUV0xTJkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(json) {     
            var i=0;
            $.each(json, function() {
                $('section','#SubCenter').append('<a href="CslWeblogic.jsp?h=' + node + '&c=' + client + '&port=' + $.base64.encode( this.PORT ) + '&desc=' + $.base64.encode( this.TYPE ) + '" class="ticker" title=""><span class="dbname' + i + '"></span><br></br><font class="dbversion' + i + '"></font><br></br><font class="subcontent" id="dbarchiver' + i + '"></font><br><font class="subcontent" id="dbstat' + i + '"></font><br><font class="subcontent" id="dbblocked' + i + '"></font><br><font class="subcontent" id="dbstartup' + i + '"></font>');
                $('.dbname' + i).append('WLS: ' + this.TYPE);
		var tmp = this.VERSION;
		var shorttype;
		if (tmp.length > 100) { shorttype = tmp.substr(tmp.indexOf('>')+1); shorttype = shorttype.substr(0, shorttype.indexOf('<')); } else { shorttype = tmp; }
                $('.dbversion' + i).append(shorttype);
		$('#dbarchiver' + i).append('Port Number: ' + this.PORT);
		$('#dbstat' + i).append('Java Version: ' + this.JAVA);
		$('#dbblocked' + i).append('Status: ' + this.STATUS);
		$('#dbstartup' + i).append('Health: ' + this.HEALTH);
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
        success: function(json) {     
            var i=0;
            $('#HostServices').html('<div id="CheckBoxAll"><input type="checkbox" id="CheckAllCheckboxes" onclick="CheckAll(\'' + uid + '\');"/></div><div id="HeadHostSrvList"><span>Service Name</span><span>Output</span></div><div id="HostSrvList"></div>');
            $.each(json, function() {
                //var hostname = this.HOST_NAME;
                //var shorthostname;
                var cssclass;
                //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                if (this.SERVICE_STATUS == "1") { cssclass = "taovwa"; } else if (this.SERVICE_STATUS == "2") { cssclass = "taovcr"; } else if (this.SERVICE_STATUS == "3") { cssclass = "taovun"; } else { cssclass = "taovok"; }
                if (this.SERVICE_NAME == "") { cssclass = "taovcr"; this.SERVICE_NAME = "HOST"; }
                $('#HostSrvList').append('<div id="' + i + 'ServiceStatus"></div><div id="CheckBoxTable"><input type="checkbox" name="' + $.base64.decode( client ) + '@' + $.base64.decode( node ) + '" value="' + this.SERVICE_NAME + '" id="" /></div><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img id="ImgServiceStatusHl" src="../' + this.SERVICE_STATUS_ICON + '" /></td><td>' + this.SERVICE_NAME + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                if (this.ACK == "1") { $('#' + i + 'ServiceStatus').append('<img id="ImgServiceAck" src="../layout/images/icons/eye.png" title="Service Problem ist bearbeitet." />'); }
                if (this.CMT == "") { /**/ } else { $('#' + i + 'ServiceStatus').append('<img id="ImgServiceCmt" src="../layout/images/icons/balloon-left.png" title="Service wurde kommentiert." />'); }
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

function CheckAll(uid) {
    var b64uid = $.base64.encode( uid );
    if($('#CheckAllCheckboxes').is(':checked')) {
        $('form#SearchService').find(':checkbox').attr('checked', 'checked');
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchHosts( b64uid + 'Jhdu8K');
        }
    } else {
        if ($("#Sidebar").is(":hidden")) {
            $('form#SearchService').find(':checkbox').removeAttr('checked');
        } else {
            $('form#SearchService').find(':checkbox').removeAttr('checked');
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
        }
    }
}