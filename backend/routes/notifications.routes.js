import { Router} from "express"
import { getNotifications } from "../controllers/Notifications/notifications.controller.js"


const router = Router()

router.route("/notifications-list/:id").get(getNotifications)

export default router