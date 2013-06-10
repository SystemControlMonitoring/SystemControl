/* 
 * kVASy(R) System Control Liveticker Functions 03.2013 S.Baresel
 * 
 * --------------------------------------------------------------
 * Define Div Element:
 * <div id="SelectLiveticker"></div>
 * 
 * Call:
 * <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                jQuery.support.cors = true;
                Liveticker(" RemoteUser ");
                KlickLiveticker();
            });
        });
   </script>
 * --------------------------------------------------------------
 */

function Liveticker(uid) {
    var b64uid = $.base64.encode( uid );
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=RmlsbExpdmV0aWNrZXI=RpY2Fs&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function() {
                    $.ajax({
                        url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VsZWN0TGl2ZXRpY2tlcg==RpKlFs&u=' + b64uid + 'LKHld3',
                        crossDomain: true,
                        success: function(json) {
                            var cc=0;
                            /* Format Output */
                            $('#Liveticker').html('<div id="SubLiveticker"><div id="LtHeader"></div></div>');
                            $.each(json, function() {
                                var count = cc;
                                if (count < "16") {
                                    var output;
                                    var shorthostname;
                                    if ( dds == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }                            
                                    if ( this.OUTPUT.length > 27 ) { output = this.OUTPUT.substr(0,24) + '...'; }
                                    $('#SubLiveticker').append('<div id="LtElement"><div id="LtImg"><img id="Img' + count + '" src="' + this.HOST_ICON + '" /></div><div id="LtInc">' + this.INCIDENT + '</div><img id="ImgStat" src="' + this.SERVICE_STATUS + '" /><div id="LtContent" class="Cnt' + count + '"><table cellpadding=0 cellspacing=0 border=0><tr><td><b>' + shorthostname + '</b> <i>auf ' + this.NODE + '</i></td><td>' + this.TIMESTAMP + '</td></tr><tr><td>' + this.SERVICE_NAME + '</td><td>' + output + '</td></tr></table></div></div>');
                                    $('#Img' + count).mouseover(function() {
                                        $('.Cnt' + count).show().css('zIndex',30);
                                    }).mouseout(function(){
                                        $('.Cnt' + count).hide().css('zIndex',0);
                                    });
                                    $('#Img' + count).click(function() {
                                        if ($('#Img' + count).is(":hidden")) {
                                            $('.Cnt' + count).show().css('zIndex',30);
                                        } else {
                                            $('.Cnt' + count).hide().css('zIndex',0);
                                        }
                                    });
                                }
                                cc++;
                            });
                            $('#LtHeader').append('<div id="LtText">' + cc + ' Meldungen</div>');
                            if (cc > "16") {
                                $('#SubLiveticker').append('<div id="LtFooter"><a href="#">.. weitere</a></div>');
                            }
                            /* Reload Function */
                            setTimeout('Liveticker("' + uid + '")', 30000);
                        },
                        error: function(jqXhr, textStatus, error) {
                            alert("ERROR#SelectLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#FillLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
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

function SubLiveticker(uid) {
    var b64uid = $.base64.encode( uid );
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
                url: 'http://' + Backend + '/proxy/json/?e=1&m=RmlsbExpdmV0aWNrZXI=RpY2Fs&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function() {
                    $.ajax({
                        url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VsZWN0TGl2ZXRpY2tlcg==RpKlFs&u=' + b64uid + 'LKHld3',
                        crossDomain: true,
                        success: function(json) {
                            var cc=0;
                            /* Format Output */
                            $('#Liveticker').html('<div id="SubLiveticker"><div id="LtHeader"></div></div>');
                            $.each(json, function() {
                                var count = cc;
                                if (count < "16") {
                                    var output;
                                    var shorthostname;
                                    if ( dds == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }                            
                                    if ( this.OUTPUT.length > 27 ) { output = this.OUTPUT.substr(0,24) + '...'; }
                                    $('#SubLiveticker').append('<div id="LtElement"><div id="LtImg"><img id="Img' + count + '" src="../' + this.HOST_ICON + '" /></div><div id="LtInc">' + this.INCIDENT + '</div><img id="ImgStat" src="../' + this.SERVICE_STATUS + '" /><div id="LtContent" class="Cnt' + count + '"><table cellpadding=0 cellspacing=0 border=0><tr><td><b>' + shorthostname + '</b> <i>auf ' + this.NODE + '</i></td><td>' + this.TIMESTAMP + '</td></tr><tr><td>' + this.SERVICE_NAME + '</td><td>' + output + '</td></tr></table></div></div>');
                                    $('#Img' + count).mouseover(function() {
                                        $('.Cnt' + count).show().css('zIndex',30);
                                    }).mouseout(function(){
                                        $('.Cnt' + count).hide().css('zIndex',0);
                                    });
                                    $('#Img' + count).click(function() {
                                        if ($('#Img' + count).is(":hidden")) {
                                            $('.Cnt' + count).show().css('zIndex',30);
                                        } else {
                                            $('.Cnt' + count).hide().css('zIndex',0);
                                        }
                                    });
                                }
                                cc++;
                            });
                            $('#LtHeader').append('<div id="LtText">' + cc + ' Meldungen</div>');
                            if (cc > "16") {
                                $('#SubLiveticker').append('<div id="LtFooter"><a href="#">.. weitere</a></div>');
                            }
                            /* Reload Function */
                            setTimeout('SubLiveticker("' + uid + '")', 30000);
                        },
                        error: function(jqXhr, textStatus, error) {
                            alert("ERROR#SelectLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
                        },
                        dataType: 'json',
                        cache: false
                    });
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#FillLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
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