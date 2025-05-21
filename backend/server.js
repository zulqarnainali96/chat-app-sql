import express from "express";
import databaseConnection from "./database/db.js";
import { inComingUrlRequest } from "./utility/incomingUrlRequest.js";
import { app, server } from "./websocket/socket-config.js";
import { corsOptions } from "./utility/allowd-origin.js";
import cors from "cors";

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ corsOptions }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(inComingUrlRequest);

// Routes
import authRoutes from "./routes/auth.routes.js";
import addFriend from "./routes/add_friend.routes.js";
import notifications from "./routes/notifications.routes.js";
import friends from "./routes/friends.routes.js";
import chatMessage from "./routes/chat-messages.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/add_friend", addFriend);
app.use("/api/v1/notifications", notifications);
app.use("/api/v1/friends", friends);
app.use("/api/v1/chats", chatMessage);

// Start the server
server.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
  databaseConnection();
});
