import { Tables, TablesInsert, TablesUpdate } from './database.types'

export type Attendance = Tables<'AttendanceRecord'>
export type AttendanceInsert = TablesInsert<'AttendanceRecord'>
export type AttendanceUpdate = TablesUpdate<'AttendanceRecord'>
