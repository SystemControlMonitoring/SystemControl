/* 
 * kVASy(R) System Control Liveticker Functions 03.2013 S.Baresel
 * 
 * --------------------------------------------------------------
 * Define Div Element:
 * <div id="SlimTaov"></div>
 * 
 * Call:
 * <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                jQuery.support.cors = true;
                SlimTaov" RemoteUser ");
            });
        });
   </script>
 * --------------------------------------------------------------
 */

function SlimTaov(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://172.23.10.249:6560/proxy/json/?e=1&m=U2xpbVRhb3Y=Hkd83k&u=' + b64uid + 'LKHld3',
        crossDomain: true,
        success: function(json) {
            var cnodet; var cnode = 0; var ocolor = " default"; var ccolor = " default"; var ucolor = " default"; var socolor = " default"; var sccolor = " default"; var sucolor = " default"; var swcolor = " default"; var spcolor = " default";var HOST_OK = 0; var HOST_CR = 0; var HOST_CR_NA = 0; var HOST_CR_A = 0; var HOST_UN = 0; var HOST_UN_NA = 0; var HOST_UN_A = 0; var SERVICE_OK = 0; var SERVICE_WA = 0; var SERVICE_WA_NA = 0; var SERVICE_WA_A = 0; var SERVICE_WA_NA_OFF = 0; var SERVICE_CR = 0; var SERVICE_CR_NA = 0; var SERVICE_CR_A = 0; var SERVICE_CR_NA_OFF = 0; var SERVICE_UN = 0; var SERVICE_UN_NA = 0; var SERVICE_UN_A = 0; var SERVICE_UN_NA_OFF = 0; var SERVICE_PE = 0;
            $('#SlimTaov').html('<div id="Nodes"></div>');
            $.each(json, function() {
                HOST_OK = parseInt(this.HOST.OK.COUNT, 10) + HOST_OK; 
                HOST_CR = parseInt(this.HOST.CRITICAL.COUNT, 10) + HOST_CR; 
                HOST_CR_NA = parseInt(this.HOST.CRITICAL.NACK, 10) + HOST_CR_NA; 
                HOST_CR_A = parseInt(this.HOST.CRITICAL.ACK, 10) + HOST_CR_A; 
                HOST_UN = parseInt(this.HOST.UNREACHABLE.COUNT, 10) + HOST_UN; 
                HOST_UN_NA = parseInt(this.HOST.UNREACHABLE.NACK, 10) + HOST_UN_NA; 
                HOST_UN_A = parseInt(this.HOST.UNREACHABLE.ACK, 10) + HOST_UN_A; 
                SERVICE_OK = parseInt(this.SERVICE.OK.COUNT_ON, 10) + SERVICE_OK; 
                SERVICE_WA = parseInt(this.SERVICE.WARNING.COUNT_ON, 10) + SERVICE_WA; 
                SERVICE_WA_NA = parseInt(this.SERVICE.WARNING.NACK_ON, 10) + SERVICE_WA_NA; 
                SERVICE_WA_A = parseInt(this.SERVICE.WARNING.ACK_ON, 10) + SERVICE_WA_A; 
                SERVICE_WA_NA_OFF = parseInt(this.SERVICE.WARNING.NACK_OFF, 10) + SERVICE_WA_NA_OFF; 
                SERVICE_CR = parseInt(this.SERVICE.CRITICAL.COUNT_ON, 10) + SERVICE_CR; 
                SERVICE_CR_NA = parseInt(this.SERVICE.CRITICAL.NACK_ON, 10) + SERVICE_CR_NA; 
                SERVICE_CR_A = parseInt(this.SERVICE.CRITICAL.ACK_ON, 10) + SERVICE_CR_A; 
                SERVICE_CR_NA_OFF = parseInt(this.SERVICE.CRITICAL.NACK_OFF, 10) + SERVICE_CR_NA_OFF; 
                SERVICE_UN = parseInt(this.SERVICE.UNKNOWN.COUNT_ON, 10) + SERVICE_UN; 
                SERVICE_UN_NA = parseInt(this.SERVICE.UNKNOWN.NACK_ON, 10) + SERVICE_UN_NA; 
                SERVICE_UN_A = parseInt(this.SERVICE.UNKNOWN.ACK_ON, 10) + SERVICE_UN_A; 
                SERVICE_UN_NA_OFF = parseInt(this.SERVICE.UNKNOWN.NACK_OFF, 10) + SERVICE_UN_NA_OFF; 
                SERVICE_PE = parseInt(this.SERVICE.PENDING.COUNT_ON, 10) + SERVICE_PE;
                cnode++;
            });
            /* BG Color */
            if (HOST_OK != 0) { ocolor = " ok"; }
            if (HOST_CR != 0) { ocolor = " cr"; }
            if (HOST_UN != 0) { ocolor = " un"; }
            if (SERVICE_OK != 0) { socolor = " ok"; }
            if (SERVICE_CR != 0) { sccolor = " cr"; }
            if (SERVICE_UN != 0) { sucolor = " un"; }
            if (SERVICE_WA != 0) { swcolor = " wa"; }
            if (SERVICE_PE != 0) { spcolor = " pe"; }
            if (cnode == 1) { cnodet = "1 Monitoringnode"; } else { cnodet = cnode + " Monitoringnodes"; }
            
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Hosts</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span><span class="Notice" style="float: right;">' + cnodet + '</span></td></tr><tr valign=middle><td class="' + ocolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + HOST_OK + '</a></b> Ok</td><td class="' + ccolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + HOST_CR_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=7">' + HOST_CR_A + '</a></b> Kritisch</td><td class="' + ucolor + '"><b><a href="/monitoring.chtml?view=3&status=8">' + HOST_UN_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=9">' + HOST_UN_A + '</a></b> Nicht Erreichbar</td></tr></table></span>');
            $('#Nodes').append('<span style="float: left;"><table cellpadding=0 cellspacing=0 border=0><tr><td colspan=3><span style="float: left;">Services</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td class="' + socolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + SERVICE_OK + '</a></b> Ok</td><td class="' + swcolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_WA_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=7">' + SERVICE_WA_A + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_WA_NA_OFF + '</a></b> Warnung</td><td class="' + sccolor + '"><b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_CR_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=7">' + SERVICE_CR_A + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=6">' + SERVICE_CR_NA_OFF + '</a></b> Kritisch</td><td class="' + sucolor + '"><b><a href="/monitoring.chtml?view=3&status=8">' + SERVICE_UN_NA + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=9">' + SERVICE_UN_A + '</a></b> | <b><a href="/monitoring.chtml?view=3&status=8">' + SERVICE_UN_NA_OFF + '</a></b> Unbekannt</td><td class="' + spcolor + '"><b><a href="/monitoring.chtml?view=3&status=0">' + SERVICE_PE + '</a></b> Ausstehend</td></tr></table></span>');
            setTimeout('SlimTaov("' + uid + '")', 30000);
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#FillLiveticker#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}