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
                        $('#SelectLiveticker').html('<div>');
                        $.each(json, function() {
                            $('#SelectLiveticker').append('<div class="lt_element">');
                            $('#SelectLiveticker').append('<span class="">' + this.DISPLAY_NAME + '</span>');
                            $('#SelectLiveticker').append('<span class="">' + this.TIMESTAMP_ISO + '</span>');
                            $('#SelectLiveticker').append('<span class="">' + this.HOST_NAME + '</span>');
                            $('#SelectLiveticker').append('</div>');
                            cc++;
                        });
                        /* Check Problems */
                        if ( cc == 0 ) {
                            $('#CountLiveticker').html('<span>Keine aktuellen Probleme.</span>');
                            //$('#LivetickerSidebar').html('<div id="ok">' + cc + '</div><div id="KlickLivetickerText">SIDEBAR</div>');
                        } else if ( cc == 1) {
                            $('#CountLiveticker').html('<span>' + cc + ' aktuelles Problem.</span>');
                            //$('#LivetickerSidebar').html('<div id="crit">' + cc + '</div><div id="KlickLivetickerText">SIDEBAR</div>');
                        } else {
                            $('#CountLiveticker').html('<span>' + cc + ' aktuelle Probleme.</span>');
                            //$('#LivetickerSidebar').html('<div id="crit">' + cc + '</div><div id="KlickLivetickerText">SIDEBAR</div>');
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