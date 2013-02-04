/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ldap;

import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import java.io.FileInputStream;
import java.io.BufferedInputStream;
import java.util.Properties;
/**
 *
 * @author sbaresel
 */
public class search {
  public static String getDisplayName(String queryname) throws Exception {
    Properties props = new Properties();
    BufferedInputStream in = new BufferedInputStream(new FileInputStream("E:\\kVASy5Jars\\nb_ldap.properties"));
    props.load(in);
    in.close();
    
    String HOST = props.getProperty("HOST");
    String PORT = props.getProperty("PORT");
    String USERNAME = props.getProperty("USERNAME");
    String PASSWORD = props.getProperty("PASSWORD");
    String BASEDN = props.getProperty("BASEDN");
    String ATTRIBUTE = props.getProperty("ATTRIBUTE");
    String OU = props.getProperty("OU");
    
    @SuppressWarnings("UseOfObsoleteCollectionType")
    Hashtable env = new Hashtable();
    
    env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
    env.put(Context.PROVIDER_URL, "ldap://" + HOST + ":" + PORT + "/" + BASEDN );
    env.put(Context.SECURITY_AUTHENTICATION, "simple");
    env.put(Context.SECURITY_PRINCIPAL, USERNAME );
    env.put(Context.SECURITY_CREDENTIALS, PASSWORD );
	
    DirContext dctx = new InitialDirContext(env);

    String base = "ou=" + OU;

    SearchControls sc = new SearchControls();
    String[] attributeFilter = { ATTRIBUTE };
    sc.setReturningAttributes(attributeFilter);
    sc.setSearchScope(SearchControls.SUBTREE_SCOPE);

    String filter = "(&(objectCategory=user)(sAMAccountName=" + queryname + "))";

    NamingEnumeration results = dctx.search(base, filter, sc);
    while (results.hasMore()) {
      SearchResult sr = (SearchResult) results.next();
      Attributes attrs = sr.getAttributes();
      Attribute attr = attrs.get(ATTRIBUTE);
      return(attr.get().toString());
    }
    dctx.close();
    return("OK");
  }
}