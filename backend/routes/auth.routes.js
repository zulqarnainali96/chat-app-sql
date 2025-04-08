import { Router } from "express";
import { Login } from "../controllers/auth/login.js";
import { RegisterUser } from "../controllers/auth/register.js";
import { getAllUsers, getNewFriendsList } from "../controllers/auth/getAllUsers.js";

const router = Router();

router.route("/login").post(Login);
router.route("/register").post(RegisterUser);
router.route("/get-all-users").get(getAllUsers);
router.route("/get-new-friends/:id").get(getNewFriendsList);

export default router;
