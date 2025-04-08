import { socketError } from "../handleSocketError.socket.js";
import { v4 as uuid } from "uuid";
import { socketSuccess } from "../handleSuccess.socket.js";
import { Connection } from "../../database/db.js";

const sendFriendRequest = async (messageData, connectedUser) => {
  const { user_id, from } = messageData;

  // Recipient Found
  const [results] = await Connection.execute(
    "SELECT * FROM Notifications WHERE user_id = ?",
    [from]
  );
  const [results1] = await Connection.execute(
    "SELECT * FROM Users WHERE id = ?",
    [user_id]
  );
  if (results.length === 0 || results1.length === 0) {
    socketError(user_id, connectedUser, "Failed to Send Request :(");
    return;
  }
  
  let notifications_list = results[0].notifications_list;
  
  if (notifications_list === null) {
    notifications_list = [];
    notifications_list.push({
      id: uuid(), 
      username: results1[0].username,
      from: results1[0].id,
      avatar: results1[0].avatar,
      message: "Friend Request",
      date: new Date(),
    });
    const [results2] = await Connection.execute(
      "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",
      [JSON.stringify(notifications_list), from]
    );
    if (results2.affectedRows > 0) {
      socketSuccess(user_id, connectedUser, "Friend Request Sent :) ");
      socketSuccess(from, connectedUser, "You have received a friend request :) ");
      return;
    }
  } else if (typeof notifications_list == "string") {
    notifications_list = JSON.parse(notifications_list);
    notifications_list.push({
      id: uuid(),
      username: results1[0].username,
      from: results1[0].id,
      avatar: results1[0].avatar,
      message: "Friend Request",
      date: new Date(),
    });
    const [results2] = await Connection.execute(
      "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",
      [JSON.stringify(notifications_list), from]
    );
    if (results2.affectedRows > 0) {
      socketSuccess(user_id, connectedUser, "Friend Request Sent :) ");
      socketSuccess(from, connectedUser, "You received a friend request :) ");
      return;
    }
  }
};

export { sendFriendRequest };
