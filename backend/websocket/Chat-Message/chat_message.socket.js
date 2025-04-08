import { v4 as uuid } from "uuid";

const ChatMessage = async (messageData, connectedUser) => {
  const { message, online_id, recipient_id } = messageData;
  const recipient = connectedUser.get(online_id);
  if (recipient && recipient.readyState === WebSocket.OPEN) {
    const messageData = JSON.stringify({
      message,
      type: "chat-message",
      sender: online_id,
      recipient: recipient_id,
    });
    recipient.send(messageData);
    const [results] = await Connection.execute(
      "SELECT * FROM User_Chat_Messages WHERE id = ?",
      [recipient_id]
    );
    if (results.length > 0) {
      let chatMessages = results[0].chat_list ?? [];
      if (typeof chatMessages === "string") {
        chatMessages = JSON.parse(chatMessages);
      }
      chatMessages.push({
        id: uuid(),
        message,
        date: new Date(),
      });
    }
    // socketSuccess(online_id, connectedUser, "Message Sent Successfully");
  }
};

export { ChatMessage };
