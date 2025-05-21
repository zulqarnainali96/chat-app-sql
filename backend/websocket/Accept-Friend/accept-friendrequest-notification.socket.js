import { Connection } from "../../database/db.js";
import { socketError } from "../handleSocketError.socket.js";
import { socketSuccess } from "../handleSuccess.socket.js";
import { v4 as uuid } from "uuid";

// const acceptFriendRequest = async (messageData, socket, connectedUser) => {
//   const { user_id, from } = messageData;

//   // Recipient Found
//   const [results2] = await Connection.execute(
//     "SELECT * FROM Users WHERE id = ?",
//     [user_id]
//   );

//   if (results2.length === 0) {
//     socketError(user_id, connectedUser, "Failed to Accept Request");
//     return;
//   }

//   const { username, avatar, id } = results2[0];

//   let message = `${username} accepted your friend request`;
//   let senderNotificationMsg = {
//     id: uuid(),
//     from: id,
//     avatar,
//     username,
//     message,
//     date: new Date(),
//   };

//   const [results3] = await Connection.execute(
//     "SELECT * FROM My_Friends WHERE user_id = ?",
//     [user_id]
//   );
//   if (results3.length === 0) {
//     socketError(user_id, "Failed to Accept Request");
//     return;
//   }
//   let friendList = results3[0].friends_list;

//   if (friendList === null) {
//     friendList = [from];
//     const [results4] = await Connection.execute(
//       "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
//       [JSON.stringify(friendList), user_id]
//     );
//     if (results4.affectedRows > 0) {
//       const notificationsData = {
//         type: "notifications-msg",
//         message: "Friends Request Accepted",
//       };
//       socket.send(JSON.stringify(notificationsData));

//       // Sending notifications to sender
//       const [fromNotifications] = await Connection.execute(
//         "SELECT * FROM My_Friends WHERE user_id = ?",
//         [from]
//       );

//       if (fromNotifications.length > 0) {
//         let saveData = fromNotifications[0].friends_list === null ? [] : "";
//         if (saveData.length > 0) {
//           saveData.push(user_id);
//           await Connection.execute(
//             "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
//             [JSON.stringify(saveData), from]
//           );
//         }
//         if (saveData === "") {
//           let g = JSON.parse(fromNotifications[0].friends_list);
//           await Connection.execute(
//             "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
//             [JSON.stringify([...g, user_id]), from]
//           );
//         }
//       }

//       const [results6] = await Connection.execute(
//         "SELECT * FROM Notifications WHERE user_id = ?",
//         [from]
//       );
//       if (results6.length > 0) {
//         let notificationsListFrom = results6[0].notifications_list;

//         if (notificationsListFrom === null) {
//           notificationsListFrom = [];
//           notificationsListFrom.push({
//             ...senderNotificationMsg,
//             status: "unread",
//             type: "friend-request",
//           });

//           await Connection.execute(
//             "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",
//             [JSON.stringify(notificationsListFrom), from]
//           );
//           socketSuccess(from, connectedUser, message);
//         } else if (typeof notificationsListFrom === "string") {
//           notificationsListFrom = JSON.parse(notificationsListFrom);
//           notificationsListFrom.push({
//             ...senderNotificationMsg,
//             status: "unread",
//             type: "friend-request",
//           });

//           await Connection.execute(
//             "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",
//             [JSON.stringify(notificationsListFrom), from]
//           );
//           socketSuccess(from, connectedUser, message);
//         }
//       }
//     }
//   }
//   if (typeof friendList === "string") {
//     friendList = JSON.parse(friendList);
//     friendList.push(from);
//     console.log("updated list ", friendList);
//     const [results5] = await Connection.execute(
//       "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
//       [JSON.stringify(friendList), user_id]
//     );
//     if (results5.affectedRows > 0) {
//       const notificationsData = {
//         type: "notifications-msg",
//         message: "Friends Request Accepted",
//       };
//       socket.send(JSON.stringify(notificationsData));

//       const [fromNotifications1] = await Connection.execute(
//         "SELECT * FROM My_Friends WHERE user_id = ?",
//         [from]
//       );

//       if (fromNotifications1) {
//         let saveData = fromNotifications1[0].friends_list === null ? [] : "";
//         if (saveData.length === null) {
//           saveData.push(user_id);
//           await Connection.execute(
//             "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
//             [JSON.stringify(saveData), from]
//           );
//         }
//         if (saveData === "") {
//           let g = JSON.parse(fromNotifications1[0].friends_list);
//           await Connection.execute(
//             "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
//             [JSON.stringify([...g, user_id]), from]
//           );
//         }
//       }

//       const [results6] = await Connection.execute(
//         "SELECT * FROM Notifications WHERE user_id = ?",
//         [from]
//       );

//       let notificationsListFrom = results6[0].notifications_list;
//       if (notificationsListFrom === null) {
//         notificationsListFrom = [];
//         notificationsListFrom.push({
//           ...senderNotificationMsg,
//           status: "unread",
//           type: "friend-request",
//         });

//         await Connection.execute(
//           "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",
//           [JSON.stringify(notificationsListFrom), from]
//         );
//         socketSuccess(from, connectedUser, message);
//       } else if (typeof notificationsListFrom === "string") {
//         notificationsListFrom = JSON.parse(notificationsListFrom);
//         notificationsListFrom.push({
//           ...senderNotificationMsg,
//           status: "unread",
//           type: "friend-request",
//         });

//         await Connection.execute(
//           "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",
//           [JSON.stringify(notificationsListFrom), from]
//         );
//         socketSuccess(from, connectedUser, message);
//       }
//     }
//   }
// };


const acceptFriendRequest = async (messageData, socket, connectedUser) => {
  const { user_id, from } = messageData;

  // Recipient Found
  const [results] = await Connection.execute(
    "SELECT * FROM My_Friends WHERE user_id = ?",
    [user_id]
  );
  if(results.length === 0) {
    socketError(user_id, "Failed to Accept Request");
    return;
  }

  let friendList = results[0].friends_list
  if(friendList === null){
    friendList = [from]
     await Connection.execute(
          "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",[JSON.stringify(friendList),user_id]
    )
  }
  else if(typeof friendList === 'string'){
    friendList = JSON.parse(friendList)
    friendList = [...friendList ,from]
     await Connection.execute(
          "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",[JSON.stringify(friendList),user_id]
    )
  }
  // Sender  
  const [results2] = await Connection.execute(
    "SELECT * FROM My_Friends WHERE user_id = ?",
    [from]
  );
  if(results2.length === 0) {
    socketError(from, "Failed to Accept Request");
    return;
  }

  let senderfriendList = results2[0].friends_list
  if(senderfriendList === null){
    senderfriendList = [user_id]
     await Connection.execute(
          "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",[JSON.stringify(senderfriendList),from]
    )
  }
  else if(typeof senderfriendList === 'string'){
    senderfriendList = JSON.parse(senderfriendList)
    senderfriendList = [...senderfriendList ,user_id]
     await Connection.execute(
          "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",[JSON.stringify(senderfriendList),from]
    )
  }
  sendNotification(user_id,from,connectedUser)
  socket.send(JSON.stringify({
    type: "notifications-msg",
    message: "Friends Request Accepted", 
  })) 
};

// send Notifications
const sendNotification = async (sender_ID,recieverID,connectedUser) => {

  const [findUser] = await Connection.execute(
    "SELECT * FROM Users WHERE id = ?",[sender_ID]
  );
  if(findUser.length > 0){
    const {username, avatar,} = findUser[0]
    let message = `${username} accepted you friend request`
    const messageObject = {
      id : uuid,
      from : sender_ID,
      avatar,
      username,
      message,
      date : new Date(),
      status : 'unread',
      type : 'friend-request'
    }

    const [notificationsLIST] = await Connection.execute(
      "SELECT * FROM Notifications WHERE user_id = ?",[recieverID]
    )
    if(notificationsLIST.length > 0){
      let notifications_list = notificationsLIST[0].notifications_list;

      if(notifications_list === null){
        notifications_list = [messageObject]
        await Connection.execute(
          "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",[JSON.stringify(notifications_list),recieverID]
        )
        socketSuccess(recieverID,connectedUser,message)
      }
      else if(typeof notifications_list === 'string'){
        notifications_list = JSON.parse(notifications_list)
        notifications_list = [...notifications_list,messageObject]
        await Connection.execute(
          "UPDATE Notifications SET notifications_list = ? WHERE user_id = ?",[JSON.stringify(notifications_list),recieverID]
        )
        socketSuccess(recieverID,connectedUser,message)
      }
    }

  }
  
}

export { acceptFriendRequest };