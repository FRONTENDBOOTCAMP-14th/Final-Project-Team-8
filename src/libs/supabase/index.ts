import { cookies } from 'next/headers'
import { Tables } from './database.types'
import { createClient } from './server'

const cookieStore = await cookies()
const supabase = createClient(cookieStore)

export default supabase

// Database 타입 내보내기
export type Antiparasitic = Tables<'antiparasitic'>
export type Vaccines = Tables<'vaccines'>
export type MedicalTreatment = Tables<'medical treatment'>
export type OtherTreatment = Tables<'other treatments'>
export type scheduledMeals = Tables<'scheduled meals'>
export type Diet = Tables<'diet'>
export type OtherActivities = Tables<'other activities'>
export type Walks = Tables<'walks'>
export type Pets = Tables<'pets'>
export type Users = Tables<'users'>
