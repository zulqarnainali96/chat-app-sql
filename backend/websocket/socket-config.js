import express from "express";
import http, { get } from "http";
import { WebSocket, WebSocketServer } from "ws"; // ✅ Import WebSocketServer
import { sendFriendRequest } from "./Accept-Friend/send-friend-request.js";
import { acceptFriendRequest } from "./Accept-Friend/accept-friendrequest-notification.socket.js";
import { sendMessage } from "./Accept-Friend/chat-message.js";

// Create HTTP Server
export const app = express();
export const server = http.createServer(app);

// Attach WebSocket server to the same HTTP server
export const socketServer = new WebSocketServer({ server }); // ✅ No separate port

const connectedUser = new Map();

// WebSocket connection handler
socketServer.on("connection", (socket) => {
  let clientID = "";

  socket.on("message", (message) => {
    const data = JSON.parse(message);
    // console.log(`Recieved from User ${Buffer.from(message).toString()}`);

    if (data.type === "user_online") {
      const { id } = data;
      connectedUser.set(id, socket);
    }

    const getAll = Array.from(connectedUser.keys());
    for (let key in getAll) {
      const receipent = connectedUser.get(getAll[key]);
      const d = {
        onlineUsersList: getAll,
        type: "connected-user",
      };
      receipent.send(JSON.stringify(d));
    }
    // console.log(getAll)

    if (data.type === "private-message") {
      sendMessage(connectedUser, data);
    }
    if (data.type === "add_friend") {
      sendFriendRequest(data.messageData, connectedUser);
    }
    if (data.type === "accept-request") {
      acceptFriendRequest(data.messageData, socket, connectedUser);
    }
  });

  socket.emit;

  socket.on("close", () => {
    // Find the user ID associated with this WebSocket connection
    for (const [userId, connection] of connectedUser.entries()) {
      if (connection === socket) {
        // Remove the user from the connected list
        // connectedUser.delete(userId);
        // console.log(
        //   `User ${userId} disconnected. Total users: ${connectedUser.size}`
        // );
        break;
      }
    }
  });
});
