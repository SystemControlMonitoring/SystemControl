<%-- 
    Document   : livestatus
    Created on : 08.02.2013, 13:05:57
    Author     : sbaresel
--%>

<%@page import="livestatus.search" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <% out.println( "<span id='top'><p class='login_username'>" + search.getHosts() + "</p></span>" ); %>
    </body>
</html>
