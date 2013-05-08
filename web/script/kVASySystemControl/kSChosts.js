/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Top() {
    $('#TopMenu').append('<table cellpadding=0 cellspacing=0 border=0 id="TopMEnuTable"><tr><td><a href=".">Home</a></td><td><span id="TopMenuIcon" class="ui-icon ui-icon-triangle-1-e"></span></td><td>Hosts</td></tr></table>');
}

function AllHosts(uid) {
    var b64uid = $.base64.encode( uid );
    $.ajax({
        url: 'http://172.23.10.249:6560/repo/json/?e=1&m=U2VsZWN0Q29uZmlnJk8Uhg&u=' + b64uid + 'Lkjdu7&m2=Q29uZmlnJq0OpP',
        crossDomain: true,
        success: function(json) {
            var dds;
            $.each(json, function(key,value) {
                if ( value.KEY == "DeleteDomainSuffix") {
                    dds = value.ACTION;
                }
            });
            $.ajax({
                url: 'http://172.23.10.249:6560/proxy/json/?e=1&m=QWxsSG9zdHM=Uhd739&u=' + b64uid + 'LKHld3',
                crossDomain: true,
                success: function(json) {
                    $('#center').html('<section></section>');
                    $.each(json, function() {
                        $.each(this.HOSTS, function() {
                            var hostname = this.NAME;
                            var shorthostname;
                            if ( dds == "0" ) { shorthostname = this.NAME; } else { var tmp = this.NAME; shorthostname = tmp.substr(0, tmp.indexOf('.')); }
                            if ( shorthostname.length > 13 ) { shorthostname = shorthostname.substr(0,10) + '...'; }
                            $('section','#center').append('<a href="modules/' + this.URL + '?h=' + $.base64.encode( this.NODE ) + '&c=' + $.base64.encode( hostname ) + '" class="fulltext" title="' + hostname + '"><img class="Type" src="' + this.ICON + '"><span>' + shorthostname + '</span><br></br><span class="host-sub-grid">Zuletzt gepr&uuml;ft ' + this.LAST_CHECK_ISO + '<br>CR: ' + this.SRV_CR + ' | WA: ' + this.SRV_WA + ' | UN: ' + this.SRV_UN + ' | OK: ' + this.SRV_OK + ' | PE: ' + this.SRV_PE + '</span></a>');
                        });    
                    });
                    $('#AjaxLoader').remove();
                },
                error: function(jqXhr, textStatus, error) {
                    alert("ERROR#AllHosts#ERROR: " + textStatus + " MESSAGE: " + error);
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