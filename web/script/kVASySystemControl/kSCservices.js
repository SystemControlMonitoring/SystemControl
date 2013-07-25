var t;

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Services<span id="servicecount"></span></td></tr></table>');    
    
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
                SearchServices( b64uid + 'Jhdu8K');
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
            ListAllServices(uid);
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'g',
        handler: function() {
            GridAllServices(uid);
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
    
    $('#SidebarSubmenu').append('<div id="OracleDBA"><div id="AdminTitle">Check Kommandos</div>\n\
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
        </div>\n\
        <div id="AdminButtons">\n\
            <span id="LogfileButtons"></span><br>\n\
            <button id="rc_button" style="margin-left: 2px; margin-top: 10px;">Re-Check</button>\n\
            <button id="ba_button" style="margin-left: 2px; margin-top: 10px;" title="Problem bearbeiten.">Pr. Bearbeiten</button>\n\
            <button id="fr_button" style="margin-left: 2px; margin-top: 10px;" title="Problem freigeben.">Pr. Freigeben</button>\n\
            <button id="ko_button" style="margin-left: 2px; margin-top: 10px;">Kommentieren</button>\n\
            <button id="dd_button" style="margin-left: 2px; margin-top: 10px;" title="Downtime l&ouml;schen.">Downtime -</button>\n\
            <button id="do_button" style="margin-left: 2px; margin-top: 10px;" title="Downtime festlegen.">Downtime +</button>\n\
            <button id="ny_button" style="margin-left: 2px; margin-top: 10px;" title="Benachrichtigungen deaktivieren.">Ben. -</button>\n\
            <button id="ne_button" style="margin-left: 2px; margin-top: 10px;" title="Benachrichtigungen aktivieren.">Ben. +</button>\n\
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
}

function Reload(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllServices(uid);
}

function AutoReloadStart(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllServices(uid);
    $('#AutoReload').html('<span id="AutoReloadDate"></span>Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStop(\'' + uid + '\');">Aktiviert (Alle 90s)</span><span id="AutoReloadTimer"></span>');
    t=setTimeout('AutoReloadStart("' + uid + '")', 90000);
    $('#AutoReloadDate').html(PrintTS() + ' Uhr');
}

function AutoReloadStop(uid) {
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    clearTimeout(t);
}

function AllServices(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div id="AutoReload"></div>');
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    
    $.ajax({
        url: 'http://' + Backend + '/repo/json/?e=1&m=U2VsZWN0TW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=c2VydmljZXM=JkHu77',
        crossDomain: true,
        success: function (json) {
            if (json.MODVIEW == "ListAllServices") {
                ListAllServices(uid);
            } else {
                GridAllServices(uid);
            }
        },
        dataType: 'json',
        cache: false
    });
}

function GridAllServices(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#SrvCenter').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#center').html('<section></section>');
    if (state.length > 0) {
        GridSpecialServices(uid,state);
    } else {
        if (searchstring.length > 0) {
            GridSearchServices(uid,searchstring);
        } else {
            GridServices(uid);
        }
    }
}

function GridServices(uid) {
    var b64uid = $.base64.encode( uid );
    $('span.UserList').removeClass('Fontffffff');
    $('span.UserList').addClass('Font82abcc');
    $('span.UserGrid').removeClass('Font82abcc');
    $('span.UserGrid').addClass('Fontffffff');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdEZ1bGxJbmZvHd78h3&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HFI, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            $.each(this.SERVICELIST, function() {
                                if ( this.SERVICE_NAME.length > 25 ) { this.SERVICE_NAME = this.SERVICE_NAME.substr(0,22) + '...'; }
                                if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                                $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATUS_ICON + '" /></div><div id="SrvTitleGrid">' + this.SERVICE_NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                                servicecount++;
                            });
                            hostcount++;
                        });
                    });
                    if (servicecount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"GridAllServices");
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
            <option value="">Alle Services</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Alle Services mit Status: OK</option>\n\
            <option value="' + $.base64.encode("aw") + 'KdhU7Z">Alle Services mit Status: Warnung</option>\n\
            <option value="' + $.base64.encode("ac") + 'KdhU7Z">Alle Services mit Status: Kritisch</option>\n\
            <option value="' + $.base64.encode("au") + 'KdhU7Z">Alle Services mit Status: Unbekannt</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Alle Probleme auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Alle Probleme, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Alle Probleme auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("woh") + 'KdhU7Z">Services Warnung auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wfh") + 'KdhU7Z">Services Warnung auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnaoh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("waoh") + 'KdhU7Z">Services Warnung, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnafh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wafh") + 'KdhU7Z">Services Warnung, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("coh") + 'KdhU7Z">Services Kritisch auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cfh") + 'KdhU7Z">Services Kritisch auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnaoh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("caoh") + 'KdhU7Z">Services Kritisch, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnafh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cafh") + 'KdhU7Z">Services Kritisch, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uoh") + 'KdhU7Z">Services Unbekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("ufh") + 'KdhU7Z">Services Unbekannt auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unaoh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uaoh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unafh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uafh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').val( state ).attr('selected',true);
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ShowSelectSearch() {
    $('#ServiceGridSelect').html('\n\
        <select id="ServiceViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option selected value="">Suche ...</option>\n\
            <option value="">Alle Services</option>\n\
            <option value="' + $.base64.encode("ao") + 'KdhU7Z">Alle Services mit Status: OK</option>\n\
            <option value="' + $.base64.encode("aw") + 'KdhU7Z">Alle Services mit Status: Warnung</option>\n\
            <option value="' + $.base64.encode("ac") + 'KdhU7Z">Alle Services mit Status: Kritisch</option>\n\
            <option value="' + $.base64.encode("au") + 'KdhU7Z">Alle Services mit Status: Unbekannt</option>\n\
            <option value="' + $.base64.encode("ap") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("apoh") + 'KdhU7Z">Alle Probleme auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apnaoh") + 'KdhU7Z">Alle Probleme, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("apdh") + 'KdhU7Z">Alle Probleme auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("woh") + 'KdhU7Z">Services Warnung auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wfh") + 'KdhU7Z">Services Warnung auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnaoh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("waoh") + 'KdhU7Z">Services Warnung, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wnafh") + 'KdhU7Z">Services Warnung, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("wafh") + 'KdhU7Z">Services Warnung, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("coh") + 'KdhU7Z">Services Kritisch auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cfh") + 'KdhU7Z">Services Kritisch auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnaoh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("caoh") + 'KdhU7Z">Services Kritisch, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cnafh") + 'KdhU7Z">Services Kritisch, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("cafh") + 'KdhU7Z">Services Kritisch, bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uoh") + 'KdhU7Z">Services Unbekannt auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("ufh") + 'KdhU7Z">Services Unbekannt auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unaoh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uaoh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf ONLINE Hosts</option>\n\
            <option value="' + $.base64.encode("unafh") + 'KdhU7Z">Services Unbekannt, nicht bearbeitet auf OFFLINE Hosts</option>\n\
            <option value="' + $.base64.encode("uafh") + 'KdhU7Z">Services Unbekannt, bearbeitet auf OFFLINE Hosts</option>\n\
        </select>');
    $('#ServiceViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function GridSpecialServices(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('span.UserList').removeClass('Fontffffff');
    $('span.UserList').addClass('Font82abcc');
    $('span.UserGrid').removeClass('Font82abcc');
    $('span.UserGrid').addClass('Fontffffff');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SRVSTATSEL, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if (this.SERVICELIST.length > 0) {
                                $.each(this.SERVICELIST, function() {
                                    if ( this.SERVICE_NAME.length > 25 ) { this.SERVICE_NAME = this.SERVICE_NAME.substr(0,22) + '...'; }
                                    if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                                    $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATUS_ICON + '" /></div><div id="SrvTitleGrid">' + this.SERVICE_NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                                    servicecount++;
                                });
                                hostcount++;
                            }
                        });
                    });
                    if (servicecount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"GridAllServices");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function GridSearchServices(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $('span.UserList').removeClass('Fontffffff');
    $('span.UserList').addClass('Font82abcc');
    $('span.UserGrid').removeClass('Font82abcc');
    $('span.UserGrid').addClass('Fontffffff');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
    $('body').append('<div id="ShowGridSearchBar" style="margin-top: 7px; margin-left: 7px;"></div>');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVNlYXJjaExpc3Q=Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $('#ShowGridSearchBar').html('<font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SRVSEARCH, function() {
                            //var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var shorthostname;
                            var hicon = this.ICON;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 25 ) { shorthostname = shorthostname.substr(0,22) + '...'; }
                            if (this.SERVICELIST.length > 0) {
                                $.each(this.SERVICELIST, function() {
                                    if ( this.SERVICE_NAME.length > 25 ) { this.SERVICE_NAME = this.SERVICE_NAME.substr(0,22) + '...'; }
                                    if ( this.OUTPUT.length > 38 ) { this.OUTPUT = this.OUTPUT.substr(0,35) + '...'; }
                                    $('section','#center').append('<a href="" class="service" title=""><img class="SrvImgGrid" src="' + hicon + '" /><div id="SrvImgStateGrid"><img src="' + this.SERVICE_STATUS_ICON + '" /></div><div id="SrvTitleGrid">' + this.SERVICE_NAME + '</div><div id="SrvHostNameGrid">' + shorthostname + ' <i>auf ' + mnode + '</i></div><div id="SrvOutputGrid">' + this.OUTPUT + '</div></a>');
                                    servicecount++;
                                });
                                hostcount++;
                            }
                        });
                    });
                    if (servicecount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarService(uid,searchstring);
                    UpdateModView(uid,"GridAllServices");
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
 * List View
 */

function ListAllServices(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#center').html('');
    $('#ServiceGridSelect').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#SrvCenter').html('<div id="ServicePane"><div id="ServiceListSearch"></div><div id="HeadDivTableServicesListView"><span>Host Name</span><span>Service Name</span><span>Output</span></div></div><div id="ListDivShowServices"></div>');
    $('#ServicePane').append('<div id="CheckBoxAll"><input type="checkbox" id="CheckAllCheckboxes" onclick="CheckAll(\'' + uid + '\');"/></div><div id="VLOne"></div><div id="VLTwo"></div><div id="VLThree"></div><div id="VLFour"></div>');
    if (state.length > 0) {
        ListSpecialServices(uid,state);
    } else {
        if (searchstring.length > 0) {
            ListSearchServices(uid,searchstring);
        } else {
            ListServices(uid);
        }
    }
}

function ListServices(uid) {
    var b64uid = $.base64.encode( uid );
    $('span.UserList').addClass('Fontffffff');
    $('span.UserList').removeClass('Font82abcc');
    $('span.UserGrid').addClass('Font82abcc');
    $('span.UserGrid').removeClass('Fontffffff');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdEZ1bGxJbmZvHd78h3&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HFI, function() {
                            var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var hosticon = this.ICON;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + hostcount + 'Services"></table>');
                            var srvcount = 0;
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
                                if (srvcount == 0) {
                                    $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img src="' + hosticon + '" /></td><td>' + shorthostname + '</td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                } else if (srvcount == 1) {
                                    $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td><i>auf ' + mnode + '</i></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                } else {
                                    $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                }
                                servicecount++;
                                srvcount++;
                            });
                            hostcount++;
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
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"ListAllServices");
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
        url: 'http://' + Backend + '/repo/json/?e=1&m=VXBkYXRlTW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=c2VydmljZXM=JkHu77&v1=' + b64val1 + 'HjKi88',
        crossDomain: true,
        dataType: 'json',
        cache: false
    });
}

function ListSpecialServices(uid,state) {
    var b64uid = $.base64.encode( uid );
    $('span.UserList').addClass('Fontffffff');
    $('span.UserList').removeClass('Font82abcc');
    $('span.UserGrid').addClass('Font82abcc');
    $('span.UserGrid').removeClass('Fontffffff');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
    //$('#SrvCenter').html('');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SRVSTATSEL, function() {
                            var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var hosticon = this.ICON;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            if (this.SERVICELIST.length > 0) {
                                $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + hostcount + 'Services"></table>');
                                var srvcount = 0;
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
                                    if (srvcount == 0) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else if (srvcount == 1) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    }
                                    servicecount++;
                                    srvcount++;
                                });
                                hostcount++;
                            }
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
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"ListAllServices");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function ListSearchServices(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
    $('span.UserList').addClass('Fontffffff');
    $('span.UserList').removeClass('Font82abcc');
    $('span.UserGrid').addClass('Font82abcc');
    $('span.UserGrid').removeClass('Fontffffff');
    $('#AutoReload').css('display', 'block');
    $('#ShowGridSearchBar').remove();
    $('body').append('<div id="ShowGridSearchBar" style="margin-top: 7px; margin-left: 7px;"></div>');
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VydmljZVNlYXJjaExpc3Q=Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    var servicecount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.SRVSEARCH, function() {
                            var hostname = this.NAME;
                            var hoststatus = this.STATUS;
                            var hosticon = this.ICON;
                            var shorthostname;
                            $('#ShowGridSearchBar').html('<font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '');
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            if (this.SERVICELIST.length > 0) {
                                $('#ListDivShowServices').append('<table id="ServiceLstTable" class="' + hostcount + 'Services"></table>');
                                var srvcount = 0;
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
                                    if (srvcount == 0) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td rowspan=2><img style="width:20px; margin-bottom: -5px;margin-left: 13px;" src="' + hosticon + '" /></td><td>' + shorthostname + ' <i>(' + mnode + ')</i></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else if (srvcount == 1) {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    } else {
                                        $('.' + hostcount + 'Services').append('<tr class="' + cssclass + '"><td colspan=2></td><td>' + this.SERVICE_NAME + '</td><td><img id="ImgServiceStatus" src="' + this.SERVICE_STATUS_ICON + '"></img></td><td><input type="checkbox" name="' + hostname + '@' + mnode + '" value="' + this.SERVICE_NAME + '" id="" /></td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr>');
                                    }
                                    servicecount++;
                                    srvcount++;
                                });
                                hostcount++;
                            }
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
                    
                    $('#servicecount').html(' (' + servicecount + ' auf ' + hostcount + ' Hosts)');
                    $('#FooterDivTableHostsListView').html(servicecount + ' Services');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarService(uid,searchstring);
                    UpdateModView(uid,"ListAllServices");
                    //setTimeout('AllServices("' + uid + '")', 30000);
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function KlickFunctionSidebarService(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    $('#ShowGridSearchBar').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchServicesSearch( b64uid + 'Jhdu8K',searchstring);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
        }
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
            SearchServices( b64uid + 'Jhdu8K');
        }
    } else {
        $('form#SearchService').find(':checkbox').removeAttr('checked');
        $('#SidebarContent').fadeOut(100);
        $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
        $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
    }
}

function EnableInput(sub) {
    if ($(sub).is(":hidden")) {
        $(sub).show();
    } else {
        $(sub).hide();
    }
}