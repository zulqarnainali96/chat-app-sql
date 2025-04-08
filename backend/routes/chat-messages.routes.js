import { Router } from 'express';
import { getChatMessages } from '../controllers/chat-messages/chat-messages.js';


const router = Router()

router.route("/chat-messages/:user_id/:receipent_id").get(getChatMessages)

export default router