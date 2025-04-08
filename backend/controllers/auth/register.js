import { Connection } from "../../database/db.js";
import { APIError } from "../../utility/api-error.js";
import { asyncHandler } from "../../utility/asyncHandler.js";
import { emailValidateRegister } from "../../utility/validationSchema.js";
import { v4 as uuid } from "uuid";

const RegisterUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const { error } = emailValidateRegister.validate({
    email,
    password,
    username,
  });
  const id = uuid();
  const date = new Date();
  if (error) {
    throw new APIError(error.details[0].message, 400);
  }
  const [results] = await Connection.execute(
    "INSERT INTO Users (id, email, password, is_active, username, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, password, "true", username, date]
  );
  const [results2] = await Connection.execute(
    "INSERT INTO My_Friends (user_id) VALUES (?)",
    [id]
  );
  const [results3] = await Connection.execute(
    "INSERT INTO Notifications (user_id) VALUES (?)",
    [id]
  );
  const [results4] = await Connection.execute(
    "INSERT INTO User_Chat_Messages (user_id) VALUES (?)",
    [id]
  );

  if (results.affectedRows === 1 && results2.affectedRows === 1 && results3.affectedRows === 1 && results4.affectedRows === 1) {
    res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } else {
    throw new APIError("Failed to register user", 500);
  }
});

export { RegisterUser };
