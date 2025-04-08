import { Connection } from "../../database/db.js";
import { APIError } from "../../utility/api-error.js";
import { asyncHandler } from "../../utility/asyncHandler.js";

const addUsersFriend = asyncHandler(async (req, res) => {
  const { user_id, id } = req.params;
  if (!id) {
    throw new APIError("User id is required", 400);
  }
  const [results] = await Connection.execute("SELECT * FROM Users WHERE id = ?", [id]);
  if(results.length === 0) {
    throw new APIError("User not found", 404);
  }
  const { name, email } = results[0];

  res.status(200).send({
    success: true,
    message: "User added successfully",
    data: results,
  });
});

export { addUsersFriend };
