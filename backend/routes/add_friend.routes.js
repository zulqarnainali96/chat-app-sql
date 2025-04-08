import { Router } from 'express';
import { addUsersFriend } from '../controllers/add_friend/add_users_friend.js';

const router = Router();

router.route('/:user_id/:id').get(addUsersFriend);


export default router;