package com.example.webchatserver;


import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * This class represents a web socket server, a new connection is created and it receives a roomID as a parameter
 * **/
@ServerEndpoint(value="/ws/{roomID}")
public class ChatServer {

    // contains a static List of ChatRoom used to control the existing rooms and their users
//    static HashMap<String, ChatRoom> rooms = new HashMap<>(); // indexed by string and get Chatroom
//    static HashMap<ChatRoom, String> users = new HashMap<>();
    static HashMap<String,ChatRoom> rooms = new HashMap<>();
    // you may add other attributes as you see fit



    @OnOpen
    public void open(@PathParam("roomID") String roomID, Session session) throws IOException, EncodeException {
        if (!rooms.containsKey(roomID)) { // created
            ChatRoom chatRoom = new ChatRoom(roomID,session.getId());
            rooms.put(roomID,chatRoom);
        } else {
            rooms.get(roomID).setUserName(session.getId(), session.getId());
        }
        session.getBasicRemote().sendText("{\"room\": \"" + roomID + "\", \"type\": \"chat\", \"message\":\"(Server ): Welcome to the chat room (" + roomID + "). Please state your username to begin.\"}");
//        accessing the roomID parameter
        System.out.println(rooms.toString());
    }

    @OnClose
    public void close(Session session) throws IOException, EncodeException {
        //get user id through session
        String userId = session.getId();

        //
        for (Map.Entry<String, ChatRoom> room : rooms.entrySet()) {

            if (room.getValue().inRoom(userId)) {
                String roomID = room.getValue().getCode();
                room.getValue().removeUser(userId);

                if (room.getValue().isEmpty()) {
                    rooms.remove(room.getKey());
                } else {

                    for (Session peer : session.getOpenSessions()){ //broadcast this person left the server
                        if(rooms.get(roomID).inRoom(peer.getId())) { // broadcast only to those in the same room
                            peer.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server): "
                                    + room.getValue().getUsers().get(userId) + " left the chat room.\"}");

                        }
                    }
                }
            }

        }

    }

    @OnMessage
    public void handleMessage(String comm, Session session) throws IOException, EncodeException {
//        example getting unique userID that sent this message
//        String roomId = rooms.get().getCode();
        String userId = session.getId();
        JSONObject jsonMsg = new JSONObject(comm);
        // {"room": "123ABC", "type": "chat", "msg": "hi"}
        String room = jsonMsg.get("room").toString();
        String type = jsonMsg.get("type").toString();
        String message = jsonMsg.get("msg").toString();
       // session.getBasicRemote().sendText("Welcome to chat room: " + roomID);
//        if (type.equals("create")) {
//            ChatRoom chatRoom = new ChatRoom(room,session.getId());
//            rooms.put(room,chatRoom);
//        }
//        Example conversion of json messages from the client
        //        JSONObject jsonmsg = new JSONObject(comm);
//        String val1 = (String) jsonmsg.get("attribute1");
//        String val2 = (String) jsonmsg.get("attribute2");

        // handle the messages


    }


}