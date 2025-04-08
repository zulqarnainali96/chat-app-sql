import { WebSocket } from "ws";

const socketSuccess = (user_id, connectedUser, message, type) => {
  const successMsg = JSON.stringify({
    type: type ? type : "notifications-msg",
    message,
  });
  const recipent = connectedUser.get(user_id);
  if (recipent && recipent.readyState === WebSocket.OPEN) {
    console.log("id =>", user_id);
    recipent.send(successMsg);
  }
};

export { socketSuccess };
