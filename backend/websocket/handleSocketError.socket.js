import { WebSocket } from "ws";

const socketError = (user_id, connectedUser, message) => {
  const error = JSON.stringify({
    type: "error-msg",
    message,
  });
  const recipent = connectedUser.get(user_id);
  if (recipent && recipent.readyState === WebSocket.OPEN) {
    recipent.send(error);
  }
};

export { socketError };
