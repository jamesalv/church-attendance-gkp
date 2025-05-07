import { Tables, TablesInsert, TablesUpdate } from './database.types'

export type User = Tables<'MsUser'>
export type UserInsert = TablesInsert<'MsUser'>
export type UserUpdate = TablesUpdate<'MsUser'>
