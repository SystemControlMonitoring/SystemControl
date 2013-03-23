<%-- 
    Document   : index
    Created on : 29.01.2013, 10:21:16
    Author     : sbaresel
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql"%>
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<script type="text/javascript" src="script/jquery-1.8.2.min.js"></script>
    	<script type="text/javascript" src="script/jquery.metro.js"></script>
    	<script type="text/javascript" src="script/jquery.cookie.js"></script>
	<script type="text/javascript" src="script/metro.js"></script>
	<script type="text/javascript" src="script/main.js"></script>	
        <!-- kVASy(R) System Control -->
        <script type="text/javascript" src="script/kVASySystemControl/kSCbase64.js"></script>
        <script type="text/javascript" src="script/kVASySystemControl/kSCliveticker.js"></script>
        
	<!--[if lt IE 9]>
		<script src="script/html5.js"></script>
	<![endif]-->
        
        
        
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
                /* jQuery Cross Domain support */
                jQuery.support.cors = true;
                FillLiveticker(<% out.println("'" + request.getRemoteUser() + "'"); %>);
                SelectLiveticker(<% out.println("'" + request.getRemoteUser() + "'"); %>);
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

                <div id="center">
			<section>
                                <a href="#" class="icon">
					<img src="layout/images/gear_icon.png" alt="games" width="148" height="148">
				</a>
				<a href="livestatus.jsp" class="fulltext">
					<span>Hosts</span><br></br>
					<span class="sub-grid">Eine &Uuml;bersicht &uuml;ber alle eingerichteten Server.</span>
				</a>
				<a href="#" class="fulltext">
					<span>Services</span><br></br>
					<span class="sub-grid">Eine &Uuml;bersicht &uuml;ber alle eingerichteten Services.</span>
				</a>
				<a href="#" class="search">
					<img src="layout/images/searchIcon.png" alt="explorer" width="148" height="148">
				</a>
                                <sql:query var="starter" dataSource="kscdb">
                                    SELECT val1,val2,val3 FROM temp WHERE usr = '<%= request.getRemoteUser() %>' and modl = 'DASHBOARD' and key = 'STARTER'
                                </sql:query>
                                <c:forEach var="row" items="${starter.rowsByIndex}">
                                    <a href="<c:out value="${row[2]}" />" class="fulltext">
					<span><c:out value="${row[0]}" /></span><br></br>
					<span class="sub-grid"><c:out value="${row[1]}" /></span>
                                    </a>
                                </c:forEach>
				
				<a href="" class="AddNext">
                                    <img src='layout/images/white/add.png' alt='AddNext' title='F&uuml;ge weiteren Men&uuml;punkt hinzu!' width='50' height='50'>
				</a>
			</section>
		</div>
                
                <div id="SelectLiveticker"></div>
                
                <div id="taov-footer" style="position: fixed; bottom: 0; left: 0; right: 0; background-color: #004c8a; border-top: 1px solid #82abcc">
                    <table cellpadding=0 cellspacing=5 border=0>
                        <tr>
                            <td style="background-color: #080;padding: 5px">35 ONLINE</td>
                            <td style="background-color: firebrick;padding: 5px">1 | 0 OFFLINE</td>
                            <td style="background-color: indigo;padding: 5px">0 | 0 UNREACHABLE</td>
                        </tr>
                    </table>
                </div>
	</body>
</html>
