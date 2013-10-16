<%-- 
    Document   : index
    Created on : 29.01.2013, 10:21:16
    Author     : sbaresel
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="ldap.search" %>
<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="layout/images/favicon.ico" type="image/vnd.microsoft.icon" />
        <meta name="author" content="Steffen Baresel">
	<meta name="description" content="kVASy(R) System Control.">
	<meta name="keywords" content="kVASy, System Control, kVASy System Control">
	<title>Startseite - kVASy&reg; System Control</title>
	<meta name="language" content="it">
	<meta name="charset" content="utf-8">
        <script type="text/javascript" src="script/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="script/jquery-ui-1.9.0.custom.min.js"></script>
    	<script type="text/javascript" src="script/jquery.cookie.js"></script>
        <script type="text/javascript" src="script/highcharts.js"></script>
	<script type="text/javascript" src="script/exporting.js"></script>
	<script type="text/javascript" src="script/data.js"></script>
	<script type="text/javascript" src="script/jquery.searchFilter.js"></script>
        <script type="text/javascript" src="script/jquery.selectmenu.js"></script>
        <script type="text/javascript" src="script/timepicker.js"></script>
        <script type="text/javascript" src="script/jquery.shortcuts.min.js"></script>
        
        <!-- KSC Basicfunctions -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCbasic.js"></script>
        <!-- index -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCindex.js"></script>
        <!-- Liveticker -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCbase64.js"></script>
        <script type="text/javascript" src="script/kVASySystemControl/kSCliveticker.js"></script>
        <!-- KSC Tactical Overview -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCtaov.js"></script>
        
	<!--[if lt IE 9]>
		<script src="script/html5.js"></script>
	<![endif]-->
        
        <!-- Liveticker -->
        <link rel='stylesheet' href='layout/kSCbasic.css' />
        <link rel='stylesheet' href='layout/kSCliveticker.css' />
        <link rel='stylesheet' href='layout/kSCsidebar.css' />
        <link rel='stylesheet' href='layout/kSCtaov.css' />
	<link rel='stylesheet' href='layout/searchFilter.css' />
        
        
        <!-- Personal Computer -> 1024x768 -->
        <link rel='stylesheet' media='screen and (max-width: 1214px)' href='layout/metro.1024.css' />
        <link rel='stylesheet' media='screen and (max-width: 1214px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1280x1024 -->
        <link rel='stylesheet' media='screen and (min-width: 1215px) and (max-width: 1529px) and (min-device-width: 1281px)' href='layout/metro.1280.css' />
        <link rel='stylesheet' media='screen and (min-width: 1215px) and (max-width: 1529px) and (min-device-width: 1281px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1650x1050 -->
        <link rel='stylesheet' media='screen and (min-width: 1530px) and (max-width: 1849px) and (min-device-width: 1281px)' href='layout/metro.css' />
        <link rel='stylesheet' media='screen and (min-width: 1530px) and (max-width: 1849px) and (min-device-width: 1281px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1920x1080 -->
        <link rel='stylesheet' media='screen and (min-width: 1850px) and (min-device-width: 1281px)' href='layout/metro.1920.css' />
        <link rel='stylesheet' media='screen and (min-width: 1850px) and (min-device-width: 1281px)' href='layout/jquery-ui-1.9.0.custom.css' />
        
        <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                jQuery.support.cors = true;
                GetBackend();
                DeDoSu(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                Loader();
                Liveticker(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KlickFunctionSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KeyFunctionSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KeyFunctionSidebar2(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                DashboardLinks(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SlimTaov(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                ShowAllComments(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                ShowCritical(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                StyleSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
            });
        });
        </script>
        
	</head>
    <body theme="dark">

        <div id="TopMenu"></div>
        
        <span id="top">
                <p class="title"><font class="kvasy">kVASy&reg;</font> System Control</p><div id="logo-div"><img class='logo' src='layout/images/logo_backgroundblue_whitetext.png' title='SIV.AG'/></div>
		<p class="subtitle">Monitoring quite simple!</p></span>

                <div id="UserMenu"><table cellpadding=0 cellspacing=0 border=0><tr><td><span class="UserDesc" style="float: left;">User</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td><td width="10"></td><td colspan=3><span class="UserDesc" style="float: left;">Session</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td><% out.println( "<p class='login_username'>" + search.getDisplayName(request.getRemoteUser()) + "</p>" ); %></td><td width="10"></td><td><p class="login_shortname"><a href="logout.jsp">Abmelden</a><p></td></tr></table><div id="Liveticker"></div></div>

                <div id="center">
			<section>
                                <a href="#" class="icon" onclick="Configuration(<% out.println("'" + request.getRemoteUser() + "'"); %>);">
					<img src="layout/images/gear_icon.png" alt="games" width="148" height="148">
				</a>
				<a href="hosts/" class="twitter">
					<span>Hosts</span><br></br>
					<span class="sub-grid">Eine &Uuml;bersicht &uuml;ber alle eingerichteten Server.</span>
				</a>
				<a href="services/" class="twitter">
					<span>Services</span><br></br>
					<span class="sub-grid">Eine &Uuml;bersicht &uuml;ber alle eingerichteten Services.</span>
				</a>
                                <!--a href="hostgroups.jsp" class="">
					<span>Hostgruppen</span><br></br>
					<span class="sub-grid">Eine &Uuml;bersicht &uuml;ber alle eingerichteten Hostgruppen.</span>
				</a-->
				
                                <!-- DashboardLinks Start -->
                                <div id="DashboardLinks"></div>
                                <!-- DashboardLinks Stop -->
                                
				<!--a href="#" class="AddNext" onclick="AddLink();">
                                    <img src='layout/images/white/add.png' alt='AddNext' title='F&uuml;ge weiteren Men&uuml;punkt hinzu!' width='50' height='50'>
				</a-->
			</section>
		</div>
                
                <!-- Configuration Start -->
                
                <div id="Configuration"></div>
                
                <!-- Configuration Stop -->
                <!-- AddLink Start -->
                
                <div id="AddLink"></div>
                
                <!-- AddLink Stop -->
                <!-- Sidebar Start -->
                
                <div id="SidebarSmall">
                    <div id="LivetickerSidebar"></div>
                </div>
                <div id="Sidebar">
                    <div id="SidebarContent">
                        <section id="SidebarSearch"></section>
                        <section id="SidebarSearchFilter"></section>
                        <section id="SidebarLiveticker"></section>
                        <section id="SidebarSubmenu"></section>
                    </div>
                </div>
                
                <!-- Sidebar Ende -->
                
                
                <div id="SidebarBottomSmall">
                    <div id="SlimTaov"></div>
                </div>
                
                <div id="SidebarBottom">
                    <div id="SidebarBottomContent">
                        <table id="TPie" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td>
                                    <div id="HeaderHostPie">Host Status &Uuml;bersicht</div>
                                    <div id="HostPie"></div>
                                </td>
                                <td>
                                    <div id="HostPer"></div>
                                </td>
                                <td>
                                    <div id="HeadComments">Letzte Kommentare</div>
                                    <div id="Comments"></div>
                                    <div id="FooterComments"></div>
                                </td>
                                <td>
                                    <div id="HeaderServicePie">Service Status &Uuml;bersicht (ONLINE Hosts)</div>
                                    <div id='ServicePie'></div>
                                </td>
                                <td>
                                    <div id='ServicePer'></div>
                                </td>
                            </tr>
                        </table>
                        <br>
                        <div id="HeadDivShowCritical">Aktuelle Probleme</div>
                        <div id="DivShowCritical"></div>
                        <div id="FooterDivShowCritical"></div>
                    </div>
                </div>
	</body>
</html>
