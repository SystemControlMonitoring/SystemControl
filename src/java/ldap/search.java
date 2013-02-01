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

/**
 *
 * @author sbaresel
 */
public class search {
  public static String getDisplayName() throws Exception {
    @SuppressWarnings("UseOfObsoleteCollectionType")
    Hashtable env = new Hashtable();

    env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
    env.put(Context.PROVIDER_URL, "ldap://ads02.siv.de:389/dc=siv,dc=de");
    env.put(Context.SECURITY_AUTHENTICATION, "simple");
    env.put(Context.SECURITY_PRINCIPAL, "siv\\sivtools");
    env.put(Context.SECURITY_CREDENTIALS, "sivtools9");
	
    DirContext dctx = new InitialDirContext(env);

    String base = "ou=People";

    SearchControls sc = new SearchControls();
    String[] attributeFilter = { "cn", "mail" };
    sc.setReturningAttributes(attributeFilter);
    sc.setSearchScope(SearchControls.SUBTREE_SCOPE);

    String filter = "(&(objectCategory=user)(sAMAccountName=sbaresel))";

    NamingEnumeration results = dctx.search(base, filter, sc);
    while (results.hasMore()) {
      SearchResult sr = (SearchResult) results.next();
      Attributes attrs = sr.getAttributes();

      Attribute attr = attrs.get("cn");
      System.out.print(attr.get() + ": ");
      attr = attrs.get("mail");
      System.out.println(attr.get());
      return(attr.get().toString());
    }
    dctx.close();
    return("OK");
  }
}