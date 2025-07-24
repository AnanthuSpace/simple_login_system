import { Router } from 'express';
import { getWelcomeUser, loginHandler, signupHandler } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', loginHandler);
router.post('/signup', signupHandler);
router.get('/welcome', verifyToken, getWelcomeUser);

export default router;
