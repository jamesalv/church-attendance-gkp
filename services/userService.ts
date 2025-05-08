import supabase from '../config/supabase';
import { User, UserInsert, UserUpdate } from '../types/userTypes';

// Create a new user in the database
export const createUser = async (user: UserInsert): Promise<User> => {
    const { data, error } = await supabase
        .from('MsUser')
        .insert([user])
        .select()
        .single();

    if (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`);
    }
    return data;
}

// Get a user by ID from the database (for qrcode scanning)
export const getUserById = async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('MsUser')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error(`Error fetching user by ID: ${error.message}`);
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
    return data;
}

// Get all inactive users from the database (for follow-up)
export const getInactiveUsers = async (timeThreshold: Date): Promise<User[] | null> => {
    const { data, error } = await supabase
        .from('MsUser')
        .select('*')
        .lte('last_attendance', timeThreshold.toISOString())
        .order('last_attendance', { ascending: false });

    if (error) {
        console.error(`Error fetching inactive users: ${error.message}`);
        throw new Error(`Error fetching inactive users: ${error.message}`);
    }
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

    if (error) {
        console.error(`Error updating last attendance: ${error.message}`);
        throw new Error(`Error updating last attendance: ${error.message}`);
    }
    return data
}