import { asyncHandler } from "../../utility/asyncHandler.js";
import { APIError } from "../../utility/api-error.js";
import { emailValidate } from "../../utility/validationSchema.js";
import { Connection } from "../../database/db.js";

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = emailValidate.validate({ email, password });
  if (error) {
    throw new APIError(error.details[0].message, 400);
  }
  const [ results ] = await Connection.execute("SELECT * FROM Users")
  const user = results.find((user) => user.email === email);
  if(!user) {
    throw new APIError("User not found", 404);
  }
  res.status(200).send({
    success: true,
    message: "User logged in successfully",
    data: {
      id : user.id, 
      email : user.email,
      username : user.username,
      created_at : user.created_at,
      avatar : user.avatar,
      is_active : user.is_active === 'true' ? true : false,
    },
  });
});

export { Login };
