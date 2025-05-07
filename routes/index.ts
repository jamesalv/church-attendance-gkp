// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './userRoutes';
import attendanceRoutes from './attendanceRoutes';
// Import other routes

const router = Router();

router.use('/users', userRoutes);
router.use('/attendance', attendanceRoutes);
// router.use('/sermons', sermonRoutes);
// router.use('/follow-up', followUpRoutes);

export default router;