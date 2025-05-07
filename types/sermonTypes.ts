import { Tables, TablesInsert, TablesUpdate } from './database.types'

export type Sermon = Tables<'MsSermon'>
export type SermonInsert = TablesInsert<'MsSermon'>
export type SermonUpdate = TablesUpdate<'MsSermon'>
