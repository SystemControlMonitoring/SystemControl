<%-- 
    Document   : loginError
    Created on : 29.01.2013, 12:38:39
    Author     : sbaresel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="layout/images/favicon.ico" type="image/vnd.microsoft.icon" />
        <meta name="author" content="Steffen Baresel">
	<meta name="description" content="kVASy(R) System Control.">
	<meta name="keywords" content="kVASy, System Control, kVASy System Control">
	<title>Login - kVASy&reg; System Control</title>
	<meta name="language" content="it">
	<meta name="charset" content="utf-8">
        <script type="text/javascript" src="script/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="script/jquery-ui-1.9.0.custom.min.js"></script>
        
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
        
        <script>
        $(function() {
            $(".login-button").button().css('border','1px solid #82abcc');
        });
        </script>
        
    </head>
    <body theme="dark">
    
        <div id="login-error">Der Anmeldeversuch schlug fehl. Bitte überprüfen Sie Benutzernamen und Kennwort.</div>    
        
    <p class="title"><font class="kvasy">kVASy&reg;</font> System Control</p><div id="logo-div"><img class='logo' src='layout/images/logo_backgroundblue_whitetext.png' title='SIV.AG'/></div>
    <p class="subtitle">Designed to make monitoring easier!</p>

    <div id="login-div">
        <section>
            <form method="post" action="j_security_check">
                <div id="login-head">Anmelden</div>
                <table cellpadding="0" cellspacing="5" border="0" id="login-table">
                    <tr>
                        <td width="115" align="right" class="login-small-error">Benutzername:</td>
                        <td><input type="text" name="j_username" class="login-input-error"/></td>
                    </tr>
                    <tr>
                        <td width="115" align="right" class="login-small-error">Kennwort:</td>
                        <td><input type="password" name="j_password" class="login-input-error"/></td>
                    </tr>
                </table>
                <div id="login-footer"><input type="submit" value="Anmeldung" class="login-button"/></div>
            </form>
         </section>        
    </div>
    
    <div class='login-desc'>
	<span class='login-left'><h3>Gute Basis, Flexible und modulare Architektur</h3><p>Das kVASy® System Control baut auf der beliebten Monitoring API Icinga und etablierten Erweiterungen auf und nutzt alle einhergehenden Add-Ons, Features und Funktionen. Statistische Informationen spezieller Performance Sensoren werden f&uuml;r das Trendreporting in einer PostgreSQL Datenbank ausgelagert.</p><br /><h3>System Monitoring: alles auf einen Blick!</h3><p>Die Web-Oberfl&auml;che der kVASy&reg; System Control zeigt &uuml;bersichtlich den aktuellen Zustand aller eingerichteten Systeme und Dienste der kVASy&reg;, kVASy&reg; BI und dazugeh&ouml;rigen IT-Infrastruktur. St&ouml;rungen oder Ausf&auml;lle von Diensten, Services, Servern oder Netzwerkkomponenten werden mit einem Blick erfasst. </p></span>
	<span class='login-center'><h3>Flexible Ereignissteuerung</h3><p>Je nach Ergebnis der Checks ordnet das System den richtigen Status zu (z. B. OK, WARNING, CRITICAL oder UNKNOWN). Individuelle Regeln entscheiden wann alarmiert und, sofern notwendig, eskaliert wird. Die Alarmierung erfolgt er-eignisgesteuert. Individuelle Konfigurationen definieren welche Personen in welchem Zeitfenster &uuml;ber welche Medien (E-Mail, SMS) benachrichtigt werden. Durch definierte Event Handler k&ouml;nnen erste Reaktionen auf das Problem initiiert werden.</p><br /><h3>Erweiterbarkeit</h3><p>Von einem bis tausenden von Hosts und Services – die Icinga Basis mit seinem modularen Aufbau bietet grenzenlose Erweiterbarkeit der Monitoring API, die dann Templatebasiert oder selbstkonfiguriert in der Web Applikation kVASy&reg; System Control dargestellt werden.</p></span>
	<span class='login-right'><h3>Nutzerverwaltung mit LDAP-Authentifizierung</h3><p>Die eingebaute Nutzerverwaltung erm&ouml;glicht die Anpassung der Benutzer Zugriffe und Benachrichtigungen auf Server-Gruppen, Servern und Diensten. Die Authen-tifizierung wird dabei vom AD- oder LDAP-Server &uuml;bernommen.</p><br /><h3>Trendreporting und historische Performance Daten</h3><p>Durch die Sammlung verschiedenster Performancedaten von speziell definierten Sensoren k&ouml;nnen wir langfristige Trends fr&uuml;hzeitig erkennen und zuverl&auml;ssige Prognosen f&uuml;r die Zukunft erstellen wie z.B. Festplatten Platz oder Load des Systems.</p></span>
    </div>
    
    </body>
</html>
