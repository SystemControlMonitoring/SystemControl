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
                SelectLiveticker(" RemoteUser ");
                FillLiveticker(" RemoteUser ");
            });
        });
   </script>
 * --------------------------------------------------------------
 */

function SelectLiveticker(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://172.23.10.249:6565/lda/json/?e=1&m=U2VsZWN0TGl2ZXRpY2tlcg==RpKlFs&u=' + b64uid + 'LKHld3',
        success: function(json) {
            $('#SelectLiveticker').html('<div>');
            $.each(json, function() {
                 $('#SelectLiveticker').append('<div class="lt_element">');
                 $('#SelectLiveticker').append('<span class="">' + this.DISPLAY_NAME + '</span>');
                 $('#SelectLiveticker').append('<span class="">' + this.TIMESTAMP_ISO + '</span>');
                 $('#SelectLiveticker').append('<span class="">' + this.HOST_NAME + '</span>');
                 $('#SelectLiveticker').append('</div>');
            });
        setTimeout('SelectLiveticker("' + uid + '")', 30000);
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#SelectLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function FillLiveticker(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://172.23.10.249:6565/lda/json/?e=1&m=RmlsbExpdmV0aWNrZXI=RpY2Fs&u=' + b64uid + 'LKHld3',
        success: function() {
            setTimeout('FillLiveticker("' + uid + '")', 30000);
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#FillLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}
