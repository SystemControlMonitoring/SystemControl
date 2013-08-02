<%-- 
    Document   : oracle_database
    Created on : 27.06.2013, 08:32:33
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
        <script type="text/javascript" src="../script/jquery.shortcuts.min.js"></script>
        
        <!-- KSC Basicfunctions -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCbasic.js"></script>
        <!-- Liveticker -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCbase64.js"></script>
        <script type="text/javascript" src="../script/kVASySystemControl/kSCliveticker.js"></script>
        <!-- KSC Database Modul -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCoracle_database.js"></script>
        <!-- KSC Tactical Overview -->
        <script type="text/javascript" src="../script/kVASySystemControl/kSCtaov.js"></script>
        
	<!--[if lt IE 9]>
		<script src="../script/html5.js"></script>
	<![endif]-->
        
        <!-- Liveticker -->
        <link rel='stylesheet' href='../layout/kSCbasic.css' />
        <link rel='stylesheet' href='../layout/kSCliveticker.css' />
        <link rel='stylesheet' href='../layout/kSCsidebar.css' />
        <link rel='stylesheet' href='../layout/kSCtaov.css' />
        <link rel='stylesheet' href='../layout/ui.jqgrid.css' />
	<link rel='stylesheet' href='../layout/searchFilter.css' />
	<link rel='stylesheet' href='../layout/ui.multiselect.css' />
	<link rel='stylesheet' href='../layout/MetroJs.a.css' />
        <link rel='stylesheet' href='../layout/kSCoracle_database.css' />
        
        <!-- Personal Computer -> 1024x768 -->
        <link rel='stylesheet' media='screen and (max-width: 1214px)' href='../layout/metro.1024.css' />
        <link rel='stylesheet' media='screen and (max-width: 1214px)' href='../layout/jquery-ui-1.9.0.custom.css' />
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
                Top(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SubLiveticker(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SubSlimTaov(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KlickFunctionSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                KeyFunctionSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SubBase();
                ChangeTitle();
                DbInfo(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                $("div.metro-pivot").metroPivot();
                Storage(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                ModShowCritical(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SubStyleSidebar(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                REDOSWITCH(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                IOCALIBRATE(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                ASH(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                AWR(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                ADDM(<% out.println("'" + request.getRemoteUser() + "'"); %>);
            });
        });
        </script>
        
	</head>
    <body theme="dark">
        
        <div id="TopMenu"></div>
        
        <span id="top">
                <p class="title"><font class="kvasy">kVASy&reg;</font> System Control</p><div id="logo-div"><img class='logo' src='../layout/images/logo_backgroundblue_whitetext.png' title='SIV.AG'/></div>
		<p class="subtitle">Monitoring quite simple!</p></span>

		<div id="UserMenu"><table cellpadding=0 cellspacing=0 border=0><tr><td><span class="UserDesc" style="float: left;">User</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td><td width="10"></td><td colspan=3><span class="UserDesc" style="float: left;">Session</span><span style="float: left; margin-top: -1px;" class="ui-icon ui-icon-triangle-1-s"></span></td></tr><tr valign=middle><td><% out.println( "<p class='login_username'>" + search.getDisplayName(request.getRemoteUser()) + "</p>" ); %></td><td width="10"></td><td><p class="login_shortname"><a href="../logout.jsp">Abmelden</a><p></td></tr></table><div id="Liveticker"></div></div>

		<div id="back-div"></div>
                
                <div id="ExtSysInfo"></div>
                
                <!-- Detail Start -->
                
                <div class='metro-pivot'>
                    <div class='pivot-item'><h3>storage</h3>
			<div class='metro-right-content'>
				<div id='tlist2'><table id='list2'></table><div id='pager2'></div></div><br></br>
				<div id='tlist3'><table id='list3'></table><div id='pager3'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>performance</h3>
			<div class='metro-right-content'>
				<div id='cpu'></div>
				<div id='sysstat'></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>waits</h3>
			<div class='metro-right-content'>
				<div id='waitevents'></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>log</h3>
			<div class='metro-right-content'>
				<div id='tlist4'><table id='list4'></table><div id='pager4'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>sql</h3>
			<div class='metro-right-content'>
				<div id='tlist5'><table id='list5'></table><div id='pager5'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>sessions</h3>
			<div class='metro-right-content'>
				<div id='tlist6'><table id='list6'></table><div id='pager6'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>info</h3>
			<div class='metro-right-content'>
				<div id='tlist7'><table id='list7'></table><div id='pager7'></div></div>
				<div id='tlist8'><table id='list8'></table><div id='pager8'></div></div>
				<div id='sga'></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>user</h3>
			<div class='metro-right-content'>
				<div id='tlist9'><table id='list9'></table><div id='pager9'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>objects</h3>
			<div class='metro-right-content'>
				<div id='tlist10'><table id='list10'></table><div id='pager10'></div></div>
				<div id='tlist11'><table id='list11'></table><div id='pager11'></div></div>
				<div id='tlist12'><table id='list12'></table><div id='pager12'></div></div>
				<div id='tlist13'><table id='list13'></table><div id='pager13'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>rman</h3>
			<div class='metro-right-content'>
				<div id='tlist14'><table id='list14'></table><div id='pager14'></div></div>
				<div id='tlist15'><table id='list15'></table><div id='pager15'></div></div>
				<div id='tlist16'><table id='list16'></table><div id='pager16'></div></div>
			</div>
                    </div>
                    <div class='pivot-item'><h3>flra</h3>
			<div class='metro-right-content'>
				<div id='tlist17'><table id='list17'></table><div id='pager17'></div></div>
				<div id='tlist18'><table id='list18'></table><div id='pager18'></div></div>
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
