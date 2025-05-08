import supabase from '../config/supabase';
import { Sermon, SermonInsert, SermonUpdate } from '../types/sermonTypes';

export const createSermon = async (sermon: SermonInsert): Promise<Sermon> => {
    const { data, error } = await supabase
        .from('MsSermon')
        .insert([sermon])
        .select()
        .single();

    if (error) {
        console.error(`Error creating sermon: ${error.message}`);
        throw new Error(`Error creating sermon: ${error.message}`);
    }

    return data;
}

export const getSermons = async (): Promise<Sermon[]> => {
    const { data, error } = await supabase
        .from('MsSermon')
        .select('*');

    if (error) {
        console.error(`Error fetching sermons: ${error.message}`);
        throw new Error(`Error fetching sermons: ${error.message}`);
    }

    return data;
}
