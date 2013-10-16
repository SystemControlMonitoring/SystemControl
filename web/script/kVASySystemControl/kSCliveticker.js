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
        url: 'http://' + Backend + '/proxy/json/?e=1&m=RmlsbExpdmV0aWNrZXI=RpY2Fs&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function() {
            $.ajax({
                url: 'http://' + Backend + '/proxy/json/?e=1&m=U2VsZWN0TGl2ZXRpY2tlcg==RpKlFs&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    var cc=0;
                    /* Format Output */
                    $('#Liveticker').html('<table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span class="LtDesc" style="float: left;">Liveticker</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td><div id="LtHeader"></div></td></tr></table><div id="SubLiveticker"></div>');
                    $.each(json, function() {
                        var count = cc;
                        if (count < "16") {
                            var output;
                            var shorthostname;
                            if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }                            
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
                    if (cc > "0") {
                        $('#LtHeader').append('<font style="color: red;">' + cc + '</font> Meldungen');
                    } else {
                        $('#LtHeader').append('<font style="color: #fff;">' + cc + '</font> Meldungen');
                        $('#SubLiveticker').remove();
                    }
                    
                    if (cc > "16") {
                        $('#SubLiveticker').append('<div id="LtFooter"><a href="#">.. weitere</a></div>');
                    }
                    /* Reload Function */
                    KlickFunctionLt();
                    setTimeout('Liveticker("' + uid + '")', 30000);
                },
                dataType: 'json',
                cache: false
            });
        },
        dataType: 'json',
        cache: false
    });
}

function SubLiveticker(uid) {
    var b64uid = $.base64.encode( uid );
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
                    $('#Liveticker').html('<table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span class="LtDesc" style="float: left;">Liveticker</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td><div id="LtHeader"></div></td></tr></table><div id="SubLiveticker"></div>');
                    $.each(json, function() {
                        var count = cc;
                        if (count < "16") {
                            var output;
                            var shorthostname;
                            if ( DeleteDomainSuffix == "0" ) { shorthostname = this.HOST_NAME; } else { var tmp = this.HOST_NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }                            
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
                    if (cc > "0") {
                        $('#LtHeader').append('<font style="color: red;">' + cc + '</font> Meldungen');
                    } else {
                        $('#LtHeader').append('<font style="color: #fff;">' + cc + '</font> Meldungen');
                        $('#SubLiveticker').remove();
                    }
                            
                    if (cc > "16") {
                        $('#SubLiveticker').append('<div id="LtFooter"><a href="#">.. weitere</a></div>');
                    }
                    /* Reload Function */
                    KlickFunctionLt();
                    setTimeout('SubLiveticker("' + uid + '")', 30000);
                },
                dataType: 'json',
                cache: false
            });
        },
        dataType: 'json',
        cache: false
    });
}

function KlickFunctionLt() {
    $('#LtHeader').click(function() {
        if ($("#SubLiveticker").is(":hidden")) {
            $("#SubLiveticker").show();
        } else {
            $("#SubLiveticker").hide();
        }
    });
}