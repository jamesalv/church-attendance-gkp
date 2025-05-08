import supabase from '../config/supabase';
import { Sermon, SermonInsert, SermonUpdate } from '../types/sermonTypes';

export const createSermon = async (sermon: SermonInsert): Promise<Sermon> => {
    const { data, error } = await supabase
        .from('MsSermon')
        .insert([sermon])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export const getSermons = async (): Promise<Sermon[]> => {
    const { data, error } = await supabase
        .from('MsSermon')
        .select('*');

    if (error) throw error;
    return data;
}
