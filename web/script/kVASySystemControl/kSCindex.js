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

function KeyFunctionSidebar2(uid) {
    var b64uid = $.base64.encode( uid );
    
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
}