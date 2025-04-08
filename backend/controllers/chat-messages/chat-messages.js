import { Connection } from "../../database/db.js";
import { APIError } from "../../utility/api-error.js";
import { asyncHandler } from "../../utility/asyncHandler.js";

const getChatMessages = asyncHandler(async (req, res) => {
  const { user_id, reciepent_id } = req.params;

  if (!user_id || !reciepent_id) {
    throw new APIError("user id is required", 400);
  }

  const [results] = Connection.execute(
    "SELECT FROM User_Chat_Messages WHERE user_id = ? AND WHERE reciepent_id = ?",
    [user_id, reciepent_id]
  );
  if (results.length > 0 && results[0].reciepent_id !== null) {
    let chats_messages = results[0].chats_list;
    if (chats_messages === null) {
      res.status(200).send({
        message: "No chat messages found",
        data: [],
      });
    } else {
      chats_messages = JSON.parse(chats_messages);
      res.status(200).send({
        message: "Chat messages found",
        data: chats_messages,
      });
    }
  } else {
    res.status(201).send({
      message: "No chat messages found",
      data: [],
    });
  }
});

export { getChatMessages };
