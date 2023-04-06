package com.example.webchatserver;


import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


/**
 * This class represents a web socket server, a new connection is created and it receives a roomID as a parameter
 * **/
@ServerEndpoint(value="/ws/{roomID}")
public class ChatServer {

    // contains a static List of ChatRoom used to control the existing rooms and their users
    static HashMap<String, ChatRoom> rooms = new HashMap<>(); // indexed by string and get Chatroom



    // you may add other attributes as you see fit



    @OnOpen
    public void open(@PathParam("roomID") String roomID, Session session) throws IOException, EncodeException {

        session.getBasicRemote().sendText("Welcome to chat room: " + roomID);
//        accessing the roomID parameter
        System.out.println(roomID);



    }

    @OnClose
    public void close(Session session) throws IOException, EncodeException {
        String userId = session.getId();
        // do things for when the connection closes
    }

    @OnMessage
    public void handleMessage(String comm, Session session) throws IOException, EncodeException {
//        example getting unique userID that sent this message
        String userId = session.getId();

//        Example conversion of json messages from the client
        //        JSONObject jsonmsg = new JSONObject(comm);
//        String val1 = (String) jsonmsg.get("attribute1");
//        String val2 = (String) jsonmsg.get("attribute2");

        // handle the messages


    }


}