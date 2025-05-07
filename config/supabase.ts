import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'
import dotenv from 'dotenv';
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Key is not defined in the environment variables')
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase