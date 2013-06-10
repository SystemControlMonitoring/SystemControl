<%-- 
    Document   : sysinfo
    Created on : 03.05.2013, 14:56:48
    Author     : sbaresel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="ldap.search" %>
<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="../layout/images/favicon.ico" type="image/vnd.microsoft.icon" />
        <meta name="author" content="Steffen Baresel">
	<meta name="description" content="kVASy(R) System Control.">
	<meta name="keywords" content="kVASy, System Control, kVASy System Control">
	<title>Loading ...</title>
	<meta name="language" content="it">
	<meta name="charset" content="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<script type="text/javascript" src="../script/jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="../script/jquery-ui-1.9.0.custom.min.js"></script>
    	<script type="text/javascript" src="../script/jquery.metro.js"></script>
    	<script type="text/javascript" src="../script/jquery.cookie.js"></script>
	<script type="text/javascript" src="../script/metro.js"></script>
	<script type="text/javascript" src="../script/main.js"></script>
        <script type="text/javascript" src="../script/highcharts.js"></script>
	<script type="text/javascript" src="../script/prototype-adapter.js"></script>	
	<script type="text/javascript" src="../script/exporting.js"></script>
	<script type="text/javascript" src="../script/data.js"></script>
	<script type="text/javascript" src="../script/highcharts-more.js"></script>
	<script type="text/javascript" src="../script/grid.locale-de.js"></script>
	<script type="text/javascript" src="../script/jquery.jqGrid.min.js"></script>
	<script type="text/javascript" src="../script/jquery.searchFilter.js"></script>
	<script type="text/javascript" src="../script/jquery.tablednd.js"></script>
	<script type="text/javascript" src="../script/grid.postext.js"></script>
	<script type="text/javascript" src="../script/grid.setcolumns.js"></script>
	<script type="text/javascript" src="../script/jquery.contextmenu.js"></script>
	<script type="text/javascript" src="../script/grid.addons.js"></script>
	<script type="text/javascript" src="../script/MetroJs.a.js"></script>
	<script type="text/javascript" src="../script/timepicker.js"></script>	
        
        <!-- KSC Basicfunctions -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCbasic.js"></script>
        <!-- Liveticker -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCbase64.js"></script>
        <script type="text/javascript" src="../script/kVASySystemControl/kSCliveticker.js"></script>
        <!-- KSC Database Modul -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCsysinfo.js"></script>
        <!-- KSC Tactical Overview -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCtaov.js"></script>
        
	<!--[if lt IE 9]>
		<script src="../script/html5.js"></script>
	<![endif]-->
        
        <!-- Liveticker -->
        <link rel='stylesheet' href='../layout/kSCliveticker.css' />
        <link rel='stylesheet' href='../layout/kSCsidebar.css' />
        <link rel='stylesheet' href='../layout/kSCtaov.css' />
        <link rel='stylesheet' href='../layout/kSCbasic.css' />
        <link rel='stylesheet' href='../layout/ui.jqgrid.css' />
	<link rel='stylesheet' href='../layout/searchFilter.css' />
	<link rel='stylesheet' href='../layout/ui.multiselect.css' />
	<link rel='stylesheet' href='../layout/MetroJs.a.css' />
        
        <!-- Handhelds -->
        <link rel='stylesheet' media='handheld' href='../layout/metro.smart.css' />
        <link rel='stylesheet' media='handheld' href='../layout/jquery-ui-1.9.0.custom.css' />
        <!-- Smartphone -->
        <link rel='stylesheet' media='screen and (max-width: 768px) and (max-device-width: 768px)' href='../layout/metro.smart.css' />
        <link rel='stylesheet' media='screen and (max-width: 768px) and (max-device-width: 768px)' href='../layout/jquery-ui-1.9.0.custom.css' />
        <!-- Tablet -->
        <link rel='stylesheet' media='screen and (min-width: 769px) and (max-device-width: 1280px)' href='../layout/metro.smart.1024.css' />
        <link rel='stylesheet' media='screen and (min-width: 769px) and (max-device-width: 1280px)' href='../layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1024x768 -->
        <link rel='stylesheet' media='screen and (max-width: 1214px) and (min-device-width: 1281px)' href='../layout/metro.1024.css' />
        <link rel='stylesheet' media='screen and (max-width: 1214px) and (min-device-width: 1281px)' href='../layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1280x1024 -->
        <link rel='stylesheet' media='screen and (min-width: 1215px) and (max-width: 1529px) and (min-device-width: 1281px)' href='../layout/metro.1280.css' />
        <link rel='stylesheet' media='screen and (min-width: 1215px) and (max-width: 1529px) and (min-device-width: 1281px)' href='../layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1650x1050 -->
        <link rel='stylesheet' media='screen and (min-width: 1530px) and (max-width: 1849px) and (min-device-width: 1281px)' href='../layout/metro.css' />
        <link rel='stylesheet' media='screen and (min-width: 1530px) and (max-width: 1849px) and (min-device-width: 1281px)' href='../layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1920x1080 -->
        <link rel='stylesheet' media='screen and (min-width: 1850px) and (min-device-width: 1281px)' href='../layout/metro.1920.css' />
        <link rel='stylesheet' media='screen and (min-width: 1850px) and (min-device-width: 1281px)' href='../layout/jquery-ui-1.9.0.custom.css' />
        
        <script type="text/javascript">
        $(function() {
            $(document).ready(function() {
                jQuery.support.cors = true;
                SubGetBackend();
                SubLoader();
                Top();
                SubLiveticker(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KlickFunctionSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KeyFunctionSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SubBase();
                ChangeTitle();
                SysInfo(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                $("div.metro-pivot").metroPivot();
                Storage(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SlimTaov(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                ModShowCritical(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SubStyleSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
            });
        });
        </script>
        
	</head>
    <body theme="dark">
        
        <div id="TopMenu"></div>
        
        <span id="top">
                <p class="title"><font class="kvasy">kVASy&reg;</font> System Control</p><div id="logo-div"><img class='logo' src='../layout/images/logo_backgroundblue_whitetext.png' title='SIV.AG'/></div>
		<p class="subtitle">Monitoring quite simple!</p></span>


		<% out.println( "<span id='top'><p class='login_username'>" + search.getDisplayName(request.getRemoteUser()) + "</p></span>" ); %>

		<span id="top"><div id="ShortMenu"><img id="ListHosts" style='opacity: 0.5;-moz-opacity: 0.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);-webkit-opacity: 0.5; -ms-opacity: 0.5;-o-opacity: 0.5;' class="Border2px004279" src="../layout/images/list.png" title="Listen Ansicht"/><img id="GridHosts" class="Border2px004279" style='opacity: 0.5;-moz-opacity: 0.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);-webkit-opacity: 0.5; -ms-opacity: 0.5;-o-opacity: 0.5;' src="../layout/images/grid.png" title="Tabs Ansicht" /><img class="Border2px004279" style='opacity: 0.5;-moz-opacity: 0.5;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";filter:alpha(opacity=50);-webkit-opacity: 0.5; -ms-opacity: 0.5;-o-opacity: 0.5;' src="../layout/images/update.png" title="Neu laden"/></div></span>

		<p class="login_shortname"><a href="../logout.jsp">Abmelden</a><p>
                    
                <div id="back-div"></div>
                
                <div id="ExtSysInfo"></div>
                
                <!-- Detail Start -->
                
                <div class='metro-pivot'>
		<div class='pivot-item'><h3>storage</h3>
			<div class='metro-right-content'>
				<div id='tdevcont'><table id='devcont'></table><div id='pagerdc'></div></div>
				<div id='tstorage'><table id='storage'></table><div id='pagersto'></div></div>
				<div id='tdma'><table id='dma'></table><div id='pagerdma'></div></div>
			</div>
		</div>
		<div class='pivot-item'><h3>performance</h3>
			<div class='metro-right-content'>
				<div id='cpu'></div>
				<div id='io'></div>
			</div>
		</div>
		<div class='pivot-item'><h3>network & memory</h3>
			<div class='metro-right-content'>
				<div id='nwio'></div>
				<div id='memio'></div>
			</div>
		</div>
		<div class='pivot-item'><h3>processes</h3>
			<div class='metro-right-content'>
				<div id='tprocesses'><table id='processes'></table><div id='pagerproc'></div></div>
			</div>
		</div>
		<div class='pivot-item'><h3>bios</h3>
			<div class='metro-right-content'>
				<div id='tbios'><table id='bios'></table><div id='pagerbios'></div></div>
				<div id='tonboard'><table id='onboard'></table><div id='pageronb'></div></div>
			</div>
		</div>
		<div class='pivot-item'><h3>log messages</h3>
			<div class='metro-right-content'>
				<div id='tlog'><table id='log'></table><div id='pagerlog'></div></div>
			</div>
		</div>
                </div>
                
                <!-- Detail Ende -->
                
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
                
                <!-- Liveticker Start -->
                
                <div id="Liveticker"></div> 
                
                <!-- Liveticker Ende -->
                
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
                                    <div id="FooterComments">22 Kommentare</div>
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
