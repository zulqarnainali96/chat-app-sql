import { Connection } from "../../database/db.js";
import { APIError } from "../../utility/api-error.js";
import { asyncHandler } from "../../utility/asyncHandler.js";

const getNotifications = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new APIError("User id is required", 400);
  }

  const [result] = await Connection.execute(
    "SELECT * FROM Notifications WHERE user_id = ?",
    [id]
  );

  if (result.length === 0) {
    throw new APIError("No notifications found", 404);
  }

  let notifications_list = result[0].notifications_list;
  if (typeof notifications_list === "string") {
    notifications_list = JSON.parse(notifications_list);
    return res.status(200).send({
      success: true,
      message: "notifications found",
      data: notifications_list?.reverse(),
    });
  }
  if (notifications_list === null) {
    return res.status(200).send({
      success: false,
      message: "No notifications found",
      data: [],
    });
  }
});

const accetpFriendRequest = asyncHandler(async (req, res) => {
  const { id : from, user } = req.params;
  if (!from || user) {
    throw new APIError("User id is required", 400);
  }
  const friends_list = [from]
  const [result] = await Connection.execute(
    "UPDATE My_Friends SET friends_list = ? WHERE user_id = ?",
    [JSON.stringify(friends_list),id]
  );

  if (result.length === 0) {
    throw new APIError("No notifications found", 404);
  }
});

export { getNotifications, accetpFriendRequest };
