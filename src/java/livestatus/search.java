/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package livestatus;

import java.io.*;
import java.net.*;

/**
 *
 * @author sbaresel
 */

public class search {
    public static String getHosts() throws IOException {
        search client = new search();
        try {
            client.test();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return("OK");
     }
     void test() throws IOException {
        String ip = "172.23.10.249"; // localhost
        int port = 6557;
        java.net.Socket socket = new java.net.Socket(ip,port); // verbindet sich mit Server
        String zuSendendeNachricht = "GET hosts";
        schreibeNachricht(socket, zuSendendeNachricht);
        String empfangeneNachricht = leseNachricht(socket);
        System.out.println(empfangeneNachricht);
     }
     void schreibeNachricht(java.net.Socket socket, String nachricht) throws IOException {
         PrintWriter printWriter =
            new PrintWriter(
                new OutputStreamWriter(
                    socket.getOutputStream()));
        printWriter.print(nachricht);
        printWriter.flush();
    }
    String leseNachricht(java.net.Socket socket) throws IOException {
        BufferedReader bufferedReader =
            new BufferedReader(
                new InputStreamReader(
                    socket.getInputStream()));
        char[] buffer = new char[2048];
        int anzahlZeichen = bufferedReader.read(buffer, 0, 200); // blockiert bis Nachricht empfangen
        String nachricht = new String(buffer, 0, anzahlZeichen);
        return nachricht;
    }
}