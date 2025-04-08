import { WebSocket } from "ws";

const sendMessage = async (connectedUser, messageData) => {
  const reciepent = connectedUser.get(messageData.to);
  console.log(connectedUser)
  console.log(reciepent)
  if (reciepent && reciepent.readyState === WebSocket.OPEN) {
    reciepent.send(JSON.stringify(messageData));
  }
};
export { sendMessage };
