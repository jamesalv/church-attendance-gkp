import { Request, Response } from 'express';
import * as attendanceService from '../services/attendanceService';
import { AttendanceInsert } from '../types/attendanceTypes';

export const checkInAttendance = async (req: Request, res: Response) => {
    try {
        const { user_id, checkin_time, checkout_time } = req.body;

        // Validate required fields
        if (!user_id || !checkin_time) {
            return res.status(400).json({
                success: false,
                message: 'User ID and check-in time are required fields',
            });
        }

        const attendanceData: AttendanceInsert = {
            user_id,
            checkin_time,
        };

        const newAttendance = await attendanceService.checkInAttendance(attendanceData);

        return res.status(201).json({
            success: true,
            message: 'Attendance checked in successfully',
            payload: newAttendance
        });
    } catch (error: any) {
        console.error('Error checking in attendance:', error);
        return res.status(500).json({
            success: false,
            message: 'Error checking in attendance',
            error: error.message
        });
    }
}