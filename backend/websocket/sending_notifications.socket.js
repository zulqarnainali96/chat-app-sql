import { Connection } from "../database/db.js";
import { socketError } from "./handleSocketError.socket.js";
import { v4 as uuid } from "uuid";
import { socketSuccess } from "./handleSuccess.socket.js";

const sendNotification = async (notification, socket, connectedUser) => {
  const data = JSON.parse(notification);
  const { recipient_id, id, message, username, online_id } = data;
  const [results] = await Connection.execute(
    "SELECT * FROM Notifications WHERE id = ?",
    [id]
  );
  if (results.length === 0) {
    socketError(online_id, connectedUser, "Failed to Send Notifications");
  }
  let notificationsList = results[0]?.notifications_list ?? [];
  
  if(typeof notificationsList === "string") {
    notificationsList = JSON.parse(notificationsList);
  }
  notificationsList.push({
    id: uuid(),
    from: recipient_id,
    username,
    message,
    date: new Date(),
  });
  const [request1] = await Connection.execute(
    "UPDATE Notifications SET notifications_list = ? WHERE id = ?",
    [JSON.stringify(notificationsList), id]
  );
  if (request1.affectedRows === 0) {
    socketError(online_id, connectedUser, "Failed to Send Notifications");
  }
  socketSuccess(socket, online_id, connectedUser, "Notification sent successfully");
  
};

export { sendNotification };
