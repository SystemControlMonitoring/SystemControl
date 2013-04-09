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

function KlickLiveticker() {
    $('#KlickLiveticker').click(function() {
        if ($("#Liveticker").is(":hidden")) {
            $('#tb').fadeIn(100);
            $('#Liveticker').animate({width:'toggle'},350);
            $('#KlickLiveticker').removeClass('KlickLivetickerA').addClass('KlickLivetickerB');
        } else {
            $('#Liveticker').animate({width:'toggle'},350);
            $('#tb').fadeOut(100);
            $('#KlickLiveticker').removeClass('KlickLivetickerB').addClass('KlickLivetickerA');
        }
    });
}

function Liveticker(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://172.23.10.249:6565/lda/json/?e=1&m=RmlsbExpdmV0aWNrZXI=RpY2Fs&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function() {
                $.ajax({
                    url: 'http://172.23.10.249:6565/lda/json/?e=1&m=U2VsZWN0TGl2ZXRpY2tlcg==RpKlFs&u=' + b64uid + 'LKHld3',
                    crossDomain: true,
                    success: function(json) {
                        var cc=0;
                        /* Format Output */
                        $('#SelectLiveticker').html('<div>');
                        $.each(json, function() {
                            $('#SelectLiveticker').append('<div class="lt_element">');
                            $('#SelectLiveticker').append('<span class="">' + this.DISPLAY_NAME + '</span>');
                            $('#SelectLiveticker').append('<span class="">' + this.TIMESTAMP_ISO + '</span>');
                            $('#SelectLiveticker').append('<span class="">' + this.HOST_NAME + '</span>');
                            $('#SelectLiveticker').append('</div>');
                            cc++;
                        });
                        $('#KlickLiveticker').html('<div style="color:#CB6565;font-weight:bold">' + cc + '</div><div id="KlickLivetickerText">LIVETICKER</div>').addClass('KlickLivetickerA');
                        /* Check Problems */
                        if ( cc == 0 ) {
                            $('#CountLiveticker').html('<span>Keine aktuellen Probleme.</span>');
                            $('#KlickLiveticker').html('<div style="font-weight:bold">' + cc + '</div><div id="KlickLivetickerText">LIVETICKER</div>').addClass('KlickLivetickerA');
                        } else if ( cc == 1) {
                            $('#CountLiveticker').html('<span>' + cc + ' aktuelles Problem.</span>');
                            $('#KlickLiveticker').html('<div style="color:#CB6565;font-weight:bold">' + cc + '</div><div id="KlickLivetickerText">LIVETICKER</div>').addClass('KlickLivetickerA');
                        } else {
                            $('#CountLiveticker').html('<span>' + cc + ' aktuelle Probleme.</span>');
                            $('#KlickLiveticker').html('<div style="color:#CB6565;font-weight:bold">' + cc + '</div><div id="KlickLivetickerText">LIVETICKER</div>').addClass('KlickLivetickerA');
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
}