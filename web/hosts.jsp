<%-- 
    Document   : hosts.jsp
    Created on : 25.04.2013, 10:54:14
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
	<title>Hosts - kVASy&reg; System Control</title>
	<meta name="language" content="it">
	<meta name="charset" content="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<script type="text/javascript" src="script/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="script/jquery-ui-1.9.0.custom.min.js"></script>
    	<script type="text/javascript" src="script/jquery.metro.js"></script>
    	<script type="text/javascript" src="script/jquery.cookie.js"></script>
	<script type="text/javascript" src="script/metro.js"></script>
	<script type="text/javascript" src="script/main.js"></script>
        
        <!-- KSC Basicfunctions -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCbasic.js"></script>
        <!-- Liveticker -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCbase64.js"></script>
        <script type="text/javascript" src="script/kVASySystemControl/kSCliveticker.js"></script>
        <!-- AllHosts -->
        <script type="text/javascript" src="script/kVASySystemControl/kSChosts.js"></script>
        
	<!--[if lt IE 9]>
		<script src="script/html5.js"></script>
	<![endif]-->
        
        <!-- Liveticker -->
        <link rel='stylesheet' href='layout/kSCliveticker.css' />
        <link rel='stylesheet' href='layout/kSCsidebar.css' />
        <link rel='stylesheet' href='layout/kSCtaov.css' />
        <link rel='stylesheet' href='layout/kSCbasic.css' />
        
        <!-- Handhelds -->
        <link rel='stylesheet' media='handheld' href='layout/metro.smart.css' />
        <link rel='stylesheet' media='handheld' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Smartphone -->
        <link rel='stylesheet' media='screen and (max-width: 768px) and (max-device-width: 768px)' href='layout/metro.smart.css' />
        <link rel='stylesheet' media='screen and (max-width: 768px) and (max-device-width: 768px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Tablet -->
        <link rel='stylesheet' media='screen and (min-width: 769px) and (max-device-width: 1280px)' href='layout/metro.smart.1024.css' />
        <link rel='stylesheet' media='screen and (min-width: 769px) and (max-device-width: 1280px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1024x768 -->
        <link rel='stylesheet' media='screen and (max-width: 1214px) and (min-device-width: 1281px)' href='layout/metro.1024.css' />
        <link rel='stylesheet' media='screen and (max-width: 1214px) and (min-device-width: 1281px)' href='layout/jquery-ui-1.9.0.custom.css' />
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
                Loader();
                Liveticker(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KlickFunctionSidebar();
                KeyFunctionSidebar();
                AllHosts(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                Base();
            });
        });
        </script>
        
	</head>
    <body theme="dark">

        <span id="top">
                <p class="title"><font class="kvasy">kVASy&reg;</font> System Control</p><div id="logo-div"><img class='logo' src='layout/images/logo_backgroundblue_whitetext.png' title='SIV.AG'/></div>
		<p class="subtitle">Monitoring quite simple!</p></span>


		<% out.println( "<span id='top'><p class='login_username'>" + search.getDisplayName(request.getRemoteUser()) + "</p></span>" ); %>

		<span id="top"><div id="theme-roller"><span class='theme-box' theme='light'></span></div></span>

		<p class="login_shortname"><a href="logout.jsp">Abmelden</a><p>

                <div id="back-div"></div>
                    
                <!-- Hosts Start -->
                
                <div id="center"></div>
                
                <!-- Hosts Ende -->
                
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
                        <section id="SidebarSearch">
                            <input type="text" value="Suche">
                        </section>
                        <section id="SidebarLiveticker">
                            
                        </section>
                        <section id="SidebarSubmenu">
                            
                        </section>
                    </div>
                </div>
                
                <!-- Sidebar Ende -->
                
                <!-- Liveticker Start -->
                
                <!--div id="LivetickerBG"></div>
                <div id="KlickLiveticker"></div>
                <div id="Liveticker">
                    <div id="SubLiveticker">
                        <div id="CountLiveticker"></div>
                        <div id="SelectLiveticker"></div>
                    </div>
                </div-->
                
                <!-- Liveticker Ende -->
                
                <div id="SidebarBottomSmall">
                    
                </div>
                
                <div id="SidebarBottom">
                    <div id="SidebarBottomContent">
                        <p>Sidebar Bottom</p>
                    </div>
                </div>
	</body>
</html>