var t;

function Top(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Hosts<span id="hostcount"></span></td></tr></table>');
    
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
        mask: 'l',
        handler: function() {
            ListAllHosts(uid);
        }
    }).start();
    
    $.Shortcuts.add({
        type: 'down',
        mask: 'g',
        handler: function() {
            GridAllHosts(uid);
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
            <div id="DivReCheck" title="Erneutes Ausf&uuml;hren von Host Checks - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivReCheckObjects"></div>\n\
            </div>\n\
            <div id="DivAcknldge" title="Bearbeiten des Host Problems - 1 von 2">\n\
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
                <h3>Soll der Eintrag f&uuml;r die Hostreports in die Datenbank geschrieben werden?</h3>\n\
                <div id="Insertto">\n\
                    <input name="insertto" type="checkbox" id="insertto1" value="1" onclick="EnableInput(\'#insertto2\');" />\n\
                    <span id="insertto2">Ja!</font>\n\
                </div-->\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivAcknldgeObjects"></div>\n\
            </div>\n\
            <div id="DivComment" title="Kommentieren des Host Problems - 1 von 2">\n\
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
                <h3>Soll der Eintrag f&uuml;r die Hostreports in die Datenbank geschrieben werden?</h3>\n\
                <div id="CInsertto">\n\
                    <input name="insertto" type="checkbox" id="Cinsertto1" value="1" onclick="EnableInput(\'#Cinsertto2\');" />\n\
                    <span id="Cinsertto2">Ja!</font>\n\
                </div-->\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivCommentObjects"></div>\n\
            </div>\n\\n\
            <div id="DivDowntime" title="Downtime eines Host definieren - 1 von 2">\n\
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
                <h3>Soll der Eintrag f&uuml;r die Hostreports in die Datenbank geschrieben werden?</h3>\n\
                <div id="DInsertto">\n\
                    <input name="insertto" type="checkbox" id="Dinsertto1" value="1" onclick="EnableInput(\'#Dinsertto2\');" />\n\
                    <span id="Dinsertto2">Ja!</font>\n\
                </div-->\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivDowntimeObjects"></div>\n\
            </div>\n\
            <div id="DivNotify" title="Benachrichtigung der Host Checks deaktivieren - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivNotifyObjects"></div>\n\
            </div>\n\
            <div id="DivEnNotify" title="Benachrichtigung der Host Checks aktivieren - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivEnNotifyObjects"></div>\n\
            </div>\n\
            <div id="DivRemAck" title="Host Problem wieder freigeben - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivRemAckObjects"></div>\n\
            </div>\n\
            <div id="DivRemDwntm" title="Downtime eines Host l&ouml;schen - 1 von 2">\n\
                <h3>Es betrifft folgende konfigurierte Checks:</h3>\n\
                <div id="DivRemDwntmObjects"></div>\n\
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
        $('#DivReCheckObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Erneutes Ausf&uuml;hren von Host Checks" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Erneutes Ausf&uuml;hren von Host Checks</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=UmVDaGVja0hvc3Q=KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Erneutes Ausf&uuml;hren von Host Checks - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Host Checks wurden <b>erfolgreich</b> ausgeführt.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Erneutes Ausführen von Host Checks');
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
        $('#DivAcknldgeObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Bearbeiten des Host Problems" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Bearbeiten des Host Problems</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=QWNrSG9zdA==KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ&ar=' + $.base64.encode( author ) + 'U7g7ZZ&cm=' + $.base64.encode( comment ) + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Bearbeiten des Host Problems - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Host Probleme wurden <b>erfolgreich</b> bearbeitet.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Bearbeiten des Host Problems');
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
        $('#DivRemAckObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Host Problem wieder freigeben" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Host Problem wieder freigeben</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=UmVtQWNrSG9zdA==KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Host Problem wieder freigeben - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Host Probleme wurden <b>erfolgreich</b> freigegeben.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Host Problem wieder freigeben.');
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
        $('#DivCommentObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Kommentieren des Host" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Kommentieren des Host</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=Q29tSG9zdA==KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ&ar=' + $.base64.encode( author ) + 'U7g7ZZ&cm=' + $.base64.encode( comment ) + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Kommentieren des Host - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Hosts wurden <b>erfolgreich</b> kommentiert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Kommentieren des Host.');
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
        $('#DivDowntimeObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Downtime eines Host definieren" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Downtime eines Host definieren</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=RHdudG1Ib3N0KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ&ar=' + $.base64.encode( author ) + 'U7g7ZZ&cm=' + $.base64.encode( comment ) + 'U7g7ZZ&ds=' + datestart + '&de=' + dateend,
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Downtime eines Host definieren - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Downtime der Hosts wurden <b>erfolgreich</b> definiert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Kommentieren des Host.');
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
        $('#DivRemDwntmObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Downtime eines Host l&ouml;schen" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Downtime eines Host l&ouml;schen</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=UmVtRHdudG1Ib3N0KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Downtime eines Host l&ouml;schen - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Downtime der Hosts wurden <b>erfolgreich</b> gel&ouml;scht.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Downtime eines Host l&ouml;schen.');
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
        $('#DivNotifyObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Benachrichtigung der Host Checks deaktivieren" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Benachrichtigung der Host Checks deaktivieren</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=RGVhY05vdEhvc3Q=KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Benachrichtigung der Host Checks deaktivieren - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Benachrichtgungen der Host Checks wurden <b>erfolgreich</b> deaktiviert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Erneutes Ausführen von Host Checks');
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
        $('#DivEnNotifyObjects').html('<table id="DivReCheckTable"><thead><tr><th>Host @ Monitoringnode</th></tr></thead></table>');
        $.each(array, function() {
            if (this.name == "s") { /**/ } else { 
                u += this.name + ";";
                $('#DivReCheckTable').append('<tr><td>' + this.name + '</td></tr>');
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
                    $( 'body' ).append('<img id="ajax-loader" title="Benachrichtigung der Host Checks aktivieren" src="layout/images/ajax-loader.gif"><div id="ajax-loader-div">Benachrichtigung der Host Checks aktivieren</div>');
                    $(this).dialog('close');
                    $.ajax({
                        url: 'http://' + Backend + '/commands/json/?e=1&m=QWNOb3RIb3N0KlU76T&c=' + $.base64.encode( u ) + 'KjHu8U&u=' + b64uid + 'U7g7ZZ',
                        timeout: 3600000,
                        success: function(point) {
                            $('#ajax-loader').remove();
                            $('#ajax-loader-div').remove();
                            $( 'body' ).append('<div id="success" title="Benachrichtigung der Host Checks aktivieren - 2 von 2"><p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px;"></span>Benachrichtgungen der Host Checks wurden <b>erfolgreich</b> aktiviert.</p><br><table id="DivReCheckTablePost"><thead><tr><th>Host @ Monitoringnode</th><th>Timestamp</th></tr></thead></table>');
                            $.each(point, function() {
                                $('#DivReCheckTablePost').append('<tr><td>' + this.HOST_NAME + '@' + this.NODE + '</td><td>' + this.TS + '</td></tr>');
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
                            alert('FEHLER BEI AUSFÜHRUNG: Benachrichtigung der Host Checks aktivieren');
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
    AllHosts(uid);
}

function AutoReloadStart(uid) {
    $('#TopMenu').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    AllHosts(uid);
    $('#AutoReload').html('<span id="AutoReloadDate"></span>Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStop(\'' + uid + '\');">Aktiviert (Alle 90s)</span><span id="AutoReloadTimer"></span>');
    t=setTimeout('AutoReloadStart("' + uid + '")', 90000);
    $('#AutoReloadDate').html(PrintTS() + ' Uhr');
}

function AutoReloadStop(uid) {
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');
    clearTimeout(t);
}

function AllHosts(uid) {
    var b64uid = $.base64.encode( uid );
    $('#TopMenu').append('<div id="AutoReload"></div>');
    $('#AutoReload').html('Automatischer Reload: <span id="AutoReloadStat" onclick="AutoReloadStart(\'' + uid + '\');">Deaktiviert</span>');  
    
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
        dataType: 'json',
        cache: false
    });
}

function GridAllHosts(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#ListCenter').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#center').html('<section></section>');
    
    if (state.length > 0) {
        GridSpecialHosts(uid,state);
    } else {
        if (searchstring.length > 0) {
            GridSearchHosts(uid,searchstring);
        } else {
            GridHosts(uid);
        }
    }
}

function GridHosts(uid) {
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsSG9zdHM=Uhd739&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('section','#center').append('<a class="fulltext" title="' + hostname + '"><div id="HostType"><img src="' + this.ICON + '" /></div><div id="HostTitle">' + shorthostname + '</div><div id="DivHostStatus" class="Host' + hostcount + '"></div><div id="HostSumy">Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '<br>CR: ' + this.SRV_CR + ' | WA: ' + this.SRV_WA + ' | UN: ' + this.SRV_UN + ' | OK: ' + this.SRV_OK + ' | PE: ' + this.SRV_PE + '</div><div id="HostLinkHover" onclick="OpenWindow(\'modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '\',\'_self\');"></div><div id="HostLinkMenu"><input type="checkbox" name="' + hostname + '@' + mnode + '" value="HOST" id="Checkbox' + hostcount + '" /><label for="Checkbox' + hostcount + '" title="Diesen Host Check f&uuml;r ein Kommando markieren.">x</label></div></a>');
                            $('.Host' + hostcount).append('<img id="HstImg" src="' + this.HOST_STATUS_ICON + '" />');
                            $('#Checkbox' + hostcount).button();
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"GridAllHosts");
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
    $('#HostGridSelect').html('\n\
        <select id="HostsViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\
            <option value="">Alle Hosts</option>\n\
            <option value="' + $.base64.encode("up") + 'KdhU7Z">Alle Hosts ONLINE</option>\n\
            <option value="' + $.base64.encode("do") + 'KdhU7Z">Alle Hosts OFFLINE</option>\n\
            <option value="' + $.base64.encode("un") + 'KdhU7Z">Alle Hosts nicht erreichbar</option>\n\
            <option value="' + $.base64.encode("nok") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("noknodt") + 'KdhU7Z">Alle Probleme nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("nokdt") + 'KdhU7Z">Alle Probleme in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoack") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("doack") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet</option>\n\
            <option value="' + $.base64.encode("donoacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoackdt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doackdt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoack") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("unack") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet</option>\n\
            <option value="' + $.base64.encode("unnoacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, in einer DOWNTIME</option>\n\
        </select>');
    $('#HostsViewSelect').val( state ).attr('selected',true);
    $('#HostsViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function ShowSelectSearch() {
    $('#HostGridSelect').html('\n\
        <select id="HostsViewSelect" onchange="this.form.submit();" name="s" style="display: none;">\n\\n\
            <option selected value="">Suche ...</option>\n\
            <option value="">Alle Hosts</option>\n\
            <option value="' + $.base64.encode("up") + 'KdhU7Z">Alle Hosts ONLINE</option>\n\
            <option value="' + $.base64.encode("do") + 'KdhU7Z">Alle Hosts OFFLINE</option>\n\
            <option value="' + $.base64.encode("un") + 'KdhU7Z">Alle Hosts nicht erreichbar</option>\n\
            <option value="' + $.base64.encode("nok") + 'KdhU7Z">Alle Probleme</option>\n\
            <option value="' + $.base64.encode("noknodt") + 'KdhU7Z">Alle Probleme nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("nokdt") + 'KdhU7Z">Alle Probleme in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoack") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("doack") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet</option>\n\
            <option value="' + $.base64.encode("donoacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doacknodt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("donoackdt") + 'KdhU7Z">Alle Hosts OFFLINE, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("doackdt") + 'KdhU7Z">Alle Hosts OFFLINE, bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoack") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet</option>\n\
            <option value="' + $.base64.encode("unack") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet</option>\n\
            <option value="' + $.base64.encode("unnoacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unacknodt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, nicht in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unnoackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, nicht bearbeitet, in einer DOWNTIME</option>\n\
            <option value="' + $.base64.encode("unackdt") + 'KdhU7Z">Alle Hosts nicht erreichbar, bearbeitet, in einer DOWNTIME</option>\n\
        </select>');
    $('#HostsViewSelect').selectmenu({width: 450,menuWidth:450,style:'dropdown',maxHeight:500});
}

function GridSpecialHosts(uid,state) {
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdFN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('section','#center').append('<a class="fulltext" title="' + hostname + '"><div id="HostType"><img src="' + this.ICON + '" /></div><div id="HostTitle">' + shorthostname + '</div><div id="DivHostStatus" class="Host' + hostcount + '"></div><div id="HostSumy">Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '<br>CR: ' + this.SRV_CR + ' | WA: ' + this.SRV_WA + ' | UN: ' + this.SRV_UN + ' | OK: ' + this.SRV_OK + ' | PE: ' + this.SRV_PE + '</div><div id="HostLinkHover" onclick="OpenWindow(\'modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '\',\'_self\');"></div><div id="HostLinkMenu"><input type="checkbox" name="' + hostname + '@' + mnode + '" value="HOST" id="Checkbox' + hostcount + '" /><label for="Checkbox' + hostcount + '" title="Diesen Host Check f&uuml;r ein Kommando markieren.">x</label></div></a>');
                            $('.Host' + hostcount).append('<img id="HstImg" src="' + this.HOST_STATUS_ICON + '" />');
                            $('#Checkbox' + hostcount).button();
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"GridAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function GridSearchHosts(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdFNlYXJjaExpc3Q=Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $('body').append('<div id="ShowGridSearchBar" style="margin-top: 7px; margin-left: 7px;"><font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '</div>');
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('section','#center').append('<a class="fulltext" title="' + hostname + '"><div id="HostType"><img src="' + this.ICON + '" /></div><div id="HostTitle">' + shorthostname + '</div><div id="DivHostStatus" class="Host' + hostcount + '"></div><div id="HostSumy">Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '<br>CR: ' + this.SRV_CR + ' | WA: ' + this.SRV_WA + ' | UN: ' + this.SRV_UN + ' | OK: ' + this.SRV_OK + ' | PE: ' + this.SRV_PE + '</div><div id="HostLinkHover" onclick="OpenWindow(\'modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '\',\'_self\');"></div><div id="HostLinkMenu"><input type="checkbox" name="' + hostname + '@' + mnode + '" value="HOST" id="Checkbox' + hostcount + '" /><label for="Checkbox' + hostcount + '" title="Diesen Host Check f&uuml;r ein Kommando markieren.">x</label></div></a>');
                            $('.Host' + hostcount).append('<img id="HstImg" src="' + this.HOST_STATUS_ICON + '" />');
                            $('#Checkbox' + hostcount).button();
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#center').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarHosts(uid,searchstring);
                    UpdateModView(uid,"GridAllHosts");
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
 * List Hosts
 */

function ListAllHosts(uid) {
    var state = urlPara('s').replace(/%3D/g,'=');
    var searchstring = urlPara('searchstring').replace(/%3D/g,'=').replace(/%20/g,' ').replace(/%22/g,'"').replace(/%25/g,'%').replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%5B/g,'[').replace(/%5C/g,'\\').replace(/%5D/g,']').replace(/%5E/g,'^').replace(/%60/g,'`').replace(/%7B/g,'{').replace(/%7C/g,'|').replace(/%7D/g,'}').replace(/%7E/g,'~').replace(/%7F/g,'').replace(/%28/g,'(').replace(/%29/g,')').replace(/%2B/g,'+');
    $('#center').html('');
    $('#HostGridSelect').html('');
    $('#theme-roller').append('<img id="AjaxLoader" src="layout/images/ajax-loader.gif">');
    $('#ListCenter').html('<div id="HostsPane"><div id="HostsListSearch"></div><div id="HeadDivTableHostsListView"><span>Host Name</span><span>Klasse</span><span>Cr</span><span>Wa</span><span>Un</span><span>Ok</span><span>Pe</span><span>Output</span></div></div><div id="DivTableHostsListView"></div>');
    $('#HostsPane').append('<div id="CheckBoxAll"><input type="checkbox" id="CheckAllCheckboxes" onclick="CheckAll(\'' + uid + '\');"/></div><div id="VLOne"></div><div id="VLTwo"></div><div id="VLThree"></div><div id="VLFour"></div><div id="VLFive"></div><div id="VLSix"></div><div id="VLSeven"></div>');
    if (state.length > 0) {
        ListSpecialHosts(uid,state);
    } else {
        if (searchstring.length > 0) {
            ListSearchHosts(uid,searchstring);
        } else {
            ListHosts(uid);
        }
    }
}

function ListHosts(uid) {
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=QWxsSG9zdHM=Uhd739&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $.each(json, function() {
                        var mnode = this.NODE;
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            //if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            var cssclass;
                            if (this.STATE == "1") { 
                                cssclass = "taovcr"; 
                            } else if (this.STATE == "2") { 
                                cssclass = "taovun"; 
                            } else { 
                                cssclass = "taovok"; 
                            }
                            var srvok; var srvwa; var srvcr; var srvun; var srvpe;
                            if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                            if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                            if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                            if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                            if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                            $('#DivTableHostsListView').append('<input type="checkbox" name="' + hostname + '@' + mnode + '" value="HOST" id="CheckBoxHost" /><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '"><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="' + this.ICON + '" /></td><td>' + shorthostname + '</td><td rowspan=2>' + this.CUSTOM_VAR + '</td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '</td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td><i>auf ' + mnode + '</i></td></tr></table></a>');
                            //$('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#DivTableHostsListView').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#FooterDivTableHostsListView').html(hostcount + ' Hosts');
                    $('#AjaxLoader').remove();
                    ShowSelect($.base64.encode("a") + 'KdhU7Z');
                    UpdateModView(uid,"ListAllHosts");
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
        url: 'http://' + Backend + '/repo/json/?e=1&m=VXBkYXRlTW9kVmlldw==Jhdu8d&u=' + b64uid + 'Adhfg3&k=aG9zdHM=JkHu77&v1=' + b64val1 + 'HjKi88',
        crossDomain: true,
        dataType: 'json',
        cache: false
    });
}

function ListSpecialHosts(uid,state) {
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdFN0YXR1c1NlbGVjdA==Ki88uU&u=' + b64uid + 'LKHld3&s=' + state,
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
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
                            var srvok; var srvwa; var srvcr; var srvun; var srvpe;
                            if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                            if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                            if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                            if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                            if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                            $('#DivTableHostsListView').append('<input type="checkbox" name="' + hostname + '@' + mnode + '" value="HOST" id="CheckBoxHost" /><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '"><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="' + this.ICON + '" /></td><td>' + shorthostname + '</td><td rowspan=2>' + this.CUSTOM_VAR + '</td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '</td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td><i>auf ' + mnode + '</i></td></tr></table></a>');
                            //$('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    if (hostcount == 0) {
                        $('#DivTableHostsListView').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelect(state);
                    UpdateModView(uid,"ListAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function ListSearchHosts(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    var b64searchstring = $.base64.encode( searchstring );
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=SG9zdFNlYXJjaExpc3Q=Ki88uU&u=' + b64uid + 'LKHld3&searchstring=' + b64searchstring + 'KlUu87',
                crossDomain: true,
                success: function(json) {
                    var hostcount = 0;
                    $('body').append('<div id="ShowGridSearchBar" style="margin-top: 7px; margin-left: 7px;"><font size=2 color=#82abcc>Gesucht nach:</font>  ' + searchstring + '</div>');
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
                            var srvok; var srvwa; var srvcr; var srvun; var srvpe;
                            if (this.SRV_CR != "0") { srvcr = "hcr"; } else { srvcr = ""; }
                            if (this.SRV_WA != "0") { srvwa = "hwa"; } else { srvwa = ""; }
                            if (this.SRV_UN != "0") { srvun = "hun"; } else { srvun = ""; }
                            if (this.SRV_OK != "0") { srvok = "hok"; } else { srvok = ""; }
                            if (this.SRV_PE != "0") { srvpe = "hpe"; } else { srvpe = ""; }
                            $('#DivTableHostsListView').append('<input type="checkbox" name="' + hostname + '@' + mnode + '" value="HOST" id="CheckBoxHost" /><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '"><table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr class="' + cssclass + '"><td rowspan=2><img src="' + this.ICON + '" /></td><td>' + shorthostname + '</td><td rowspan=2>' + this.CUSTOM_VAR + '</td><td class="' + srvcr + '" rowspan=2>' + this.SRV_CR + '</td><td class="' + srvwa + '" rowspan=2>' + this.SRV_WA + '</td><td class="' + srvun + '" rowspan=2>' + this.SRV_UN + '</td><td class="' + srvok + '" rowspan=2>' + this.SRV_OK + '</td><td class="' + srvpe + '" rowspan=2>' + this.SRV_PE + '</td><td rowspan=2>' + this.OUTPUT + '</td><td rowspan=2>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr><tr><td><i>auf ' + mnode + '</i></td></tr></table></a>');
                            //$('#DivTableHostsListView').append('<table class="' + cssclass + '" cellpadding=0 cellspacing=0><tr><td><img class="Type" src="' + this.ICON + '"></td><td><a href="modules/' + this.URL + '?h=' + $.base64.encode( mnode ) + '&c=' + $.base64.encode( hostname ) + '" title="' + hostname + '">' + shorthostname + '</a></td><td>' + mnode + '</td><td>' + this.CUSTOM_VAR + '</td><td>' + this.SRV_CR + '</td><td>' + this.SRV_WA + '</td><td>' + this.SRV_UN + '</td><td>' + this.SRV_OK + '</td><td>' + this.SRV_PE + '</td><td>' + this.OUTPUT + '</td><td>Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '</td></tr></table>');
                            if ( this.STATE != "0") { $('.Host' + hostcount).append('<img id="HstImg" src="layout/images/icons/server--exclamation.png" />'); };
                            hostcount++;
                        });
                    });
                    
                    if (hostcount == 0) {
                        $('#DivTableHostsListView').append('<div id="NoContent">Die Abfrage ergab kein Ergebnis.</div>');
                        $('#VLOne').remove();
                        $('#VLTwo').remove();
                        $('#VLThree').remove();
                        $('#VLFour').remove();
                        $('#VLFive').remove();
                        $('#VLSix').remove();
                        $('#VLSeven').remove();
                    }
                    
                    $('#hostcount').html(' (' + hostcount + ')');
                    $('#AjaxLoader').remove();
                    ShowSelectSearch();
                    KlickFunctionSidebarHosts(uid,searchstring);
                    UpdateModView(uid,"ListAllHosts");
                },
                dataType: 'json',
                cache: false
            }); 
        },
        dataType: 'json',
        cache: false
    });
}

function KlickFunctionSidebarHosts(uid,searchstring) {
    var b64uid = $.base64.encode( uid );
    $('#ShowGridSearchBar').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
            SearchHostsSearch( b64uid + 'Jhdu8K',searchstring);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',10);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',10);
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

function EnableInput(sub) {
    if ($(sub).is(":hidden")) {
        $(sub).show();
    } else {
        $(sub).hide();
    }
}

function OpenWindow(target,mode) {
    window.open(target,mode);
}