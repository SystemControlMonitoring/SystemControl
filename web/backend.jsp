<%-- 
    Document   : backend
    Created on : 31.05.2013, 11:01:06
    Author     : sbaresel
--%>
<%@page contentType="application/json" pageEncoding="UTF-8"%>
<%@page import="ldap.search" %>
<% out.println( "{\"LOCAL_BACKEND\":\"" + search.getBackend() + "\"}" ); %>