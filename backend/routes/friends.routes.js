import {Router} from "express"
import { getFriendsList } from "../controllers/auth/getAllUsers.js"

const router = Router()

router.route("/friends-list/:id").get(getFriendsList)

export default router