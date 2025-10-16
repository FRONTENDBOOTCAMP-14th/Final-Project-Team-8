import { cookies } from 'next/headers'
import { Tables, TablesInsert, TablesUpdate } from './database.types'
import { createClient } from './server'

const cookieStore = await cookies()
const supabase = createClient(cookieStore)

export default supabase

// Database 타입 내보내기

// ========== Antiparasitic ==========
export type Antiparasitic = Tables<'antiparasitic'>
export type AntiparasiticPartial = Partial<Antiparasitic>
export type AntiparasiticInsert = TablesInsert<'antiparasitic'>
export type AntiparasiticUpdate = TablesUpdate<'antiparasitic'>

// ========== Vaccines ==========
export type Vaccines = Tables<'vaccines'>
export type VaccinesPartial = Partial<Vaccines>
export type VaccinesInsert = TablesInsert<'vaccines'>
export type VaccinesUpdate = TablesUpdate<'vaccines'>

// ========== Medical Treatment ==========
export type MedicalTreatment = Tables<'medical treatment'>
export type MedicalTreatmentPartial = Partial<MedicalTreatment>
export type MedicalTreatmentInsert = TablesInsert<'medical treatment'>
export type MedicalTreatmentUpdate = TablesUpdate<'medical treatment'>

// ========== Other Treatments ==========
export type OtherTreatment = Tables<'other treatments'>
export type OtherTreatmentPartial = Partial<OtherTreatment>
export type OtherTreatmentInsert = TablesInsert<'other treatments'>
export type OtherTreatmentUpdate = TablesUpdate<'other treatments'>

// ========== Scheduled Meals ==========
export type ScheduledMeals = Tables<'scheduled meals'>
export type ScheduledMealsPartial = Partial<ScheduledMeals>
export type ScheduledMealsInsert = TablesInsert<'scheduled meals'>
export type ScheduledMealsUpdate = TablesUpdate<'scheduled meals'>

// ========== Diet ==========
export type Diet = Tables<'diet'>
export type DietPartial = Partial<Diet>
export type DietInsert = TablesInsert<'diet'>
export type DietUpdate = TablesUpdate<'diet'>

// ========== Other Activities ==========
export type OtherActivities = Tables<'other activities'>
export type OtherActivitiesPartial = Partial<OtherActivities>
export type OtherActivitiesInsert = TablesInsert<'other activities'>
export type OtherActivitiesUpdate = TablesUpdate<'other activities'>

// ========== Walks ==========
export type Walks = Tables<'walks'>
export type WalksPartial = Partial<Walks>
export type WalksInsert = TablesInsert<'walks'>
export type WalksUpdate = TablesUpdate<'walks'>

// ========== Pets ==========
export type Pets = Tables<'pets'>
export type PetsPartial = Partial<Pets>
export type PetsInsert = TablesInsert<'pets'>
export type PetsUpdate = TablesUpdate<'pets'>

// ========== Users ==========
export type Users = Tables<'users'>
export type UsersPartial = Partial<Users>
export type UsersInsert = TablesInsert<'users'>
export type UsersUpdate = TablesUpdate<'users'>
