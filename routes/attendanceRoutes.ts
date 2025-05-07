import { Router } from 'express';
import * as attendanceController from '../controllers/attendanceController';

const router = Router();

// Attendance routes
router.post('/', attendanceController.checkInAttendance);

export default router;