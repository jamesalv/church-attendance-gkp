import supabase from '../config/supabase';
import { Attendance, AttendanceInsert } from '../types/attendanceTypes';
import { UserUpdate } from '../types/userTypes'
import { getUserById, updateLastAttendance } from './userService'

export const checkInAttendance = async (attendance: AttendanceInsert): Promise<Attendance> => {
    // Check if user exists
    const userData = await getUserById(attendance.user_id!)
    if (!userData) {
        console.error('User not found')
        throw new Error('User not found')
    }

    const { data, error } = await supabase
        .from('AttendanceRecord')
        .insert(attendance)
        .select('*')
        .single();

    if (error) {
        console.error(`Error checking in attendance: ${error.message}`);
        throw new Error(`Error checking in attendance: ${error.message}`);
    }

    // Update user last attendance
    const user: UserUpdate = {
        id: attendance.user_id,
        last_attendance: data.checkin_time
    }
    await updateLastAttendance(user)

    return data
}
