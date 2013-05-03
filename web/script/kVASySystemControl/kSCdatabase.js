/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function SysInfo(uid) {
    var b64uid = $.base64.encode( uid );
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://172.23.10.249:6560/clientdirect/json/?e=1&m=U1lTSU5GTw==Jkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(point) {
            $('section','#center').append('<a href="" class="ticker" title=""><span class="hname"></span><br></br><font class="os"></font><br></br><font class="subcontent" id="cpu"></font><br><font class="subcontent" id="ram"></font><br><font class="subcontent" id="startup"></font></a>');
            $.each(point, function(name,data) {
		if (name == "HOSTNAME") {
                    $('.hname').append('' + data + '');
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
            DbInfo(b64uid);
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}

function DbInfo(uid) {
    //var b64uid = $.base64.encode( uid );
    var b64uid = uid;
    var node = urlPara('h');
    var client = urlPara('c');
    $.ajax({
        url: 'http://172.23.10.249:6560/clientdirect/json/?e=1&m=REJJTkZPJkd873&h=' + node + 'Hqu8zd&c=' + client + 'Jjd723&u=' + b64uid + 'KjdUE8',
        crossDomain: true,
        success:function(json) {     
            var i=0;
            $.each(json, function() {
                $('section','#center').append('<a href="" class="ticker" title=""><span class="dbname' + i + '"></span><br></br><font class="dbversion' + i + '"></font><br></br><font class="subcontent" id="dbarchiver' + i + '"></font><br><font class="subcontent" id="dbstat' + i + '"></font><br><font class="subcontent" id="dbblocked' + i + '"></font><br><font class="subcontent" id="dbstartup' + i + '"></font><br><font class="subcontent" id="dbdbstatus' + i + '"></font><br><font class="subcontent" id="dbactive_status' + i + '"></font><br><font class="subcontent" id="dblogins' + i + '"></font><br><font class="subcontent" id="dbrole' + i + '"></font><br></a>');
                $('.dbname' + i).append(this.DBNAME);
                $('.dbversion' + i).append(this.VERSION);
                $('#dbarchiver' + i).append('Archiver: ' + this.ARCHIVER);
                $('#dbstat' + i).append('Status: ' + this.STATUS);
                $('#dbblocked' + i).append('Blocked: ' + this.BLOCKED);
                $('#dbstartup' + i).append('Startup: ' + this.STARTUP);
                $('#dbdbstatus' + i).append('DB Status: ' + this.DBSTATUS);
                $('#dbactive_status' + i).append('Active Status: ' + this.ACTIVE_STATUS);
                $('#dblogins' + i).append('Logins: ' + this.LOGINS);
                $('#dbrole' + i).append('Role: ' + this.ROLE);
                i++;
            });
            $('#AjaxLoader').remove();
        },
        error: function(jqXhr, textStatus, error) {
            alert("ERROR#DelDomainSuffix#ERROR: " + textStatus + " MESSAGE: " + error);
        },
        dataType: 'json',
        cache: false
    });
}
