import { Router } from 'express';
import { createOrUpdateUser, getUserByEmail } from '../controller/user.controller';

const router = Router();

// Public routes for user management
router.post('/create-or-update', createOrUpdateUser);
router.get('/email/:email', getUserByEmail);

export default router;

