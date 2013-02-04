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
        <meta name="author" content="Steffen Baresel">
	<meta name="description" content="kVASy(R) System Control.">
	<meta name="keywords" content="kVASy, System Control, kVASy System Control">
	<title>Startseite - kVASy&reg; System Control</title>
	<meta name="language" content="it">
	<meta name="charset" content="utf-8">
	<script type="text/javascript" src="script/jquery-1.8.2.min.js"></script>
    	<script type="text/javascript" src="script/jquery.metro.js"></script>
    	<script type="text/javascript" src="script/jquery.cookie.js"></script>
	<script type="text/javascript" src="script/metro.js"></script>
	<script type="text/javascript" src="script/main.js"></script>	

	<!--[if lt IE 9]>
		<script src="script/html5.js"></script>
	<![endif]-->

        <!-- #### Mobile Phones Portrait #### -->
        <link rel='stylesheet' media='screen and (max-device-width: 480px) and (orientation: portrait)' href='layout/metro.smart.css' />
        <link rel='stylesheet' media='screen and (max-device-width: 480px) and (orientation: portrait)' href='layout/jquery-ui-1.9.0.custom.smart.css' />
        <!-- #### Mobile Phones Landscape #### -->
        <link rel='stylesheet' media='screen and (max-device-width: 640px) and (orientation: landscape)' href='layout/metro.smart.css' />
        <link rel='stylesheet' media='screen and (max-device-width: 640px) and (orientation: landscape)' href='layout/jquery-ui-1.9.0.custom.smart.css' />
        <!-- #### Mobile Phones Portrait or Landscape #### -->
        <link rel='stylesheet' media='screen and (max-device-width: 640px)' href='layout/metro.smart.css' />
        <link rel='stylesheet' media='screen and (max-device-width: 640px)' href='layout/jquery-ui-1.9.0.custom.smart.css' />
        <!-- #### iPhone 4+ Portrait or Landscape #### -->
        <link rel='stylesheet' media='screen and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)' href='layout/metro.smart.css' />
        <link rel='stylesheet' media='screen and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)' href='layout/jquery-ui-1.9.0.custom.smart.css' />
        <!-- #### Tablets Portrait or Landscape #### -->
        <link rel='stylesheet' media='screen and (min-device-width: 768px) and (max-device-width: 1024px)' href='layout/metro.1024.css' />
        <link rel='stylesheet' media='screen and (min-device-width: 768px) and (max-device-width: 1024px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1024x768 -->
        <link rel='stylesheet' media='screen and (max-width: 1214px)' href='layout/metro.1024.css' />
        <link rel='stylesheet' media='screen and (max-width: 1214px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1280x1024 -->
        <link rel='stylesheet' media='screen and (min-width: 1215px) and (max-width: 1529px)' href='layout/metro.1280.css' />
        <link rel='stylesheet' media='screen and (min-width: 1215px) and (max-width: 1529px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1650x1050 -->
        <link rel='stylesheet' media='screen and (min-width: 1530px) and (max-width: 1849px)' href='layout/metro.css' />
        <link rel='stylesheet' media='screen and (min-width: 1530px) and (max-width: 1849px)' href='layout/jquery-ui-1.9.0.custom.css' />
        <!-- Personal Computer -> 1920x1080 -->
        <link rel='stylesheet' media='screen and (min-width: 1850px)' href='layout/metro.1920.css' />
        <link rel='stylesheet' media='screen and (min-width: 1850px)' href='layout/jquery-ui-1.9.0.custom.css' />
        

	</head>
    <body theme="dark">

		<p class="title"><font class="kvasy">kVASy&reg;</font> System Control</p><div id="logo-div"></div>
		<p class="subtitle">Designed to make monitoring easier!</p>

		<% out.println( "<p class='login_username'>" + search.getDisplayName(request.getRemoteUser()) + "</p>" ); %>

		<div id="theme-roller"></div>

    <script type="text/javascript">
        function theme_Changed() {
            	var theme = $(this).attr("theme");
            	$(document.body).attr("theme", theme);
            	$.cookie("jquery.metro.theme", theme);
		location.reload();
        }

        function setDefault() {
            	var theme = "dark";
            	$.cookie("jquery.metro.theme", theme);
		$("#theme-roller").append("<span class='theme-box' theme='light'  title='light' ></span>");
		$("span.theme-box").click(theme_Changed);
		$("#logo-div").append("<img class='logo' src='layout/images/logo_backgroundblue_whitetext.png' title='SIV.AG'/>");
		$(".AddNext").append("<img src='layout/images/white/add.png' alt='AddNext' title='F&uuml;ge weiteren Men&uuml;punkt hinzu!' width='50' height='50'>");
        }

        $(function () {
            	// restore state
            	if($.cookie("jquery.metro.theme") != null) {
			$(document.body).attr("theme", $.cookie("jquery.metro.theme"));
			if($.cookie("jquery.metro.theme") == "dark") {
				setDefault();
			} else {
				$("#theme-roller").append("<span class='theme-box' theme='dark'  title='dark' ></span>");
				$("span.theme-box").click(theme_Changed);
				$("#logo-div").append("<img class='logo' src='layout/images/logo_backgroundwhite_bluetext.png' title='SIV.AG'/>");
				$(".AddNext").append("<img src='layout/images/black/add.png' alt='AddNext' title='F&uuml;ge weiteren Men&uuml;punkt hinzu!' width='50' height='50'>");
			}
		} else {
			setDefault();
		}
        });
    </script>

		<p class="login_shortname"><%= request.getRemoteUser() %><p>

		<div id="center">
			<section>
				<a href="hosts.html" class="fulltext">
					<span>Hosts</span><br></br>
					Eine &Uuml;bersicht &uuml;ber alle eingerichteten Server.
				</a>
				<a href="#" class="fulltext">
					<span>Services</span><br></br>
					Eine &Uuml;bersicht &uuml;ber alle eingerichteten Services.
				</a>
				<a href="#" class="search">
					<img src="layout/images/searchIcon.png" alt="explorer" width="148" height="148">
				</a>
				<a href="postgresql.jsp" class="fulltext">
					<span>Datenbanken</span><br></br>
					Eine &Uuml;bersicht &uuml;ber alle eingerichteten Oracle Datenbanken.
				</a>
				<a href="ldap.jsp" class="fulltext">
					<span>Ldap Abfrage</span><br></br>
					Eine &Uuml;bersicht &uuml;ber alle eingerichteten Hostgruppen.
				</a>
				<a href="#" class="icon">
					<img src="layout/images/gear_icon.png" alt="games" width="148" height="148">
				</a>
				<a href="" class="AddNext">
				</a>
			</section>
		</div>
	</body>
</html>
