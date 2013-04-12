 /* 
 * Call:
 * <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                KeyFunctionSidebar();
                KlickFunctionSidebar();
            });
        });
   </script>
 * --------------------------------------------------------------
 */

function KeyFunctionSidebar() {
    $('body').keydown(function(e){
        if ((e.keyCode || e.which) == 37) {
            if ($("#Sidebar").is(":hidden")) {
                $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
                $('#Sidebar').animate({width:'toggle'},350, function() {
                    $('#SidebarContent').fadeIn(100);
                }).css('zIndex',30);
            } else {
                if ($("#SidebarBottom").is(":hidden")) {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',3);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',3);
                } else {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
                    $('#SidebarSmall').css('zIndex',3);
                }
            }
        } else if ((e.keyCode || e.which) == 39) {
            if ($("#Sidebar").is(":hidden")) {
                $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
                $('#Sidebar').animate({width:'toggle'},350, function() {
                    $('#SidebarContent').fadeIn(100);
                }).css('zIndex',30);
            } else {
                if ($("#SidebarBottom").is(":hidden")) {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',3);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',3);
                } else {
                    $('#SidebarContent').fadeOut(100);
                    $('#Sidebar').animate({width:'toggle'},350).css('zIndex',30);
                    $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',30);
                    $('#SidebarSmall').css('zIndex',3);
                }
            }
        } else if ((e.keyCode || e.which) == 38) {
            if ($("#SidebarBottom").is(":hidden")) {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomSmall').animate({marginBottom: "750px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                } else {
                    $('#SidebarBottomSmall').animate({marginBottom: "750px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                }
            } else {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',35);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',35);
                    $('#SidebarBottomSmall').css('zIndex',2);
                } else {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',2);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',2);
                    $('#SidebarBottomSmall').css('zIndex',2);
                }
            }
        } else if ((e.keyCode || e.which) == 40) {
            if ($("#SidebarBottom").is(":hidden")) {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomSmall').animate({marginBottom: "750px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                } else {
                    $('#SidebarBottomSmall').animate({marginBottom: "750px"},350).css('zIndex',25);
                    $('#SidebarBottom').animate({height:'toggle'},350, function() {
                        $('#SidebarBottomContent').fadeIn(100);
                    }).css('zIndex',25);
                }
            } else {
                if ($("#Sidebar").is(":hidden")) {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',35);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',35);
                    $('#SidebarBottomSmall').css('zIndex',2);
                } else {
                    $('#SidebarBottomContent').fadeOut(100);
                    $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',2);
                    $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',2);
                    $('#SidebarBottomSmall').css('zIndex',2);
                }
            }
        }   
    });
}

function KlickFunctionSidebar() {
    $('#SidebarSmall').click(function() {
        if ($("#Sidebar").is(":hidden")) {
            $('#SidebarSmall').animate({marginRight: "400px"},350).css('zIndex',30);
            $('#Sidebar').animate({width:'toggle'},350, function() {
                $('#SidebarContent').fadeIn(100);
            }).css('zIndex',30);
        } else {
            $('#SidebarContent').fadeOut(100);
            $('#Sidebar').animate({width:'toggle'},350).css('zIndex',3);
            $('#SidebarSmall').animate({marginRight: "0px"},350).css('zIndex',3);
        }
    });
    $('#SidebarBottomSmall').click(function() {
        if ($("#SidebarBottom").is(":hidden")) {
            $('#SidebarBottomSmall').animate({marginBottom: "750px"},350).css('zIndex',25);
            $('#SidebarBottom').animate({height:'toggle'},350, function() {
                $('#SidebarBottomContent').fadeIn(100);
            }).css('zIndex',25);
        } else {
            $('#SidebarBottomContent').fadeOut(100);
            $('#SidebarBottom').animate({height:'toggle'},350).css('zIndex',2);
            $('#SidebarBottomSmall').animate({marginBottom: "0px"},350).css('zIndex',2);
        }
    });
}

function StyleSidebar() {
    /**/
}

function Configuration() {
    $('#Configuration').append('<div id="ConfigurationDialog" title="Konfiguration"><p><span class="ui-icon ui-icon-circle-close" style="float: left; margin: 0 7px 50px 0;"></span>Basic:</p>');
    $('#ConfigurationDialog').dialog({
	autoOpen: true,
	height: 500,
	width: 800,
	draggable: false,
	resizable: false,
	modal: true,
	buttons: { 
            OK: function() { 
		$(this).dialog('close');
		$('#ConfigurationDialog').remove();
            },
            ABBRECHEN: function() {
                $(this).dialog('close');
		$('#ConfigurationDialog').remove();
            }
	}
    });
}

function AddLink() {
    $('#AddLink').append('<div id="AddLinkDialog" title="F&uuml;ge weiteren Men&uuml;punkt hinzu!"><p><span class="ui-icon ui-icon-circle-close" style="float: left; margin: 0 7px 50px 0;"></span>Basic:</p>');
    $('#AddLinkDialog').dialog({
	autoOpen: true,
	height: 500,
	width: 800,
	draggable: false,
	resizable: false,
	modal: true,
	buttons: { 
            OK: function() { 
		$(this).dialog('close');
		$('#AddLinkDialog').remove();
            },
            ABBRECHEN: function() {
                $(this).dialog('close');
		$('#AddLinkDialog').remove();
            }
	}
    });
}