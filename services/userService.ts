import supabase from '../config/supabase';
import { User, UserInsert, UserUpdate } from '../types/userTypes';

// Create a new user in the database
export const createUser = async (user: UserInsert): Promise<User> => {
    const { data, error } = await supabase
        .from('MsUser')
        .insert([user])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Get a user by ID from the database (for qrcode scanning)
export const getUserById = async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('MsUser')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) throw error;
    return data;
}

// Get all inactive users from the database (for follow-up)
export const getInactiveUsers = async (timeThreshold: Date): Promise<User[] | null> => {
    const { data, error } = await supabase
        .from('MsUser')
        .select('*')
        .lte('last_attendance', timeThreshold.toISOString())
        .order('last_attendance', { ascending: false });

    if (error) throw error;
    return data;
}

// Update last attendance for a single user
export const updateLastAttendance = async (user: UserUpdate): Promise<User> => {
    const {data, error} = await supabase
        .from('MsUser')
        .update({last_attendance: user.last_attendance})
        .eq('id', user.id!)
        .select()
        .single()

    if (error) throw error
    return data
}