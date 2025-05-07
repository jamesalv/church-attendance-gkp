import supabase from '../config/supabase';
import { Attendance, AttendanceInsert } from '../types/attendanceTypes';
import { UserUpdate } from '../types/userTypes'
import { updateLastAttendance } from './userService'

export const checkInAttendance = async (attendance: AttendanceInsert): Promise<Attendance> => {
    const { data, error } = await supabase
        .from('AttendanceRecord')
        .insert(attendance)
        .select('*')
        .single();

    if (error) throw error

    // Update user last attendance
    const user: UserUpdate = {
        id: attendance.user_id,
        last_attendance: data.checkin_time
    }
    updateLastAttendance(user)

    return data
}
