import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// User routes
router.post('/', userController.createUser);

export default router;