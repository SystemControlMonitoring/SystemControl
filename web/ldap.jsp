<%-- 
    Document   : ldap
    Created on : 01.02.2013, 13:59:01
    Author     : sbaresel
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="ldap.search" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>Ldap Abfrage</p>
        <%
            out.println( "<p>" + search.main("sbaresel") + "</p>" );
        %>
    </body>
</html>
