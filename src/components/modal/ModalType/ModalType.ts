import type {
  AntiparasiticInsert,
  DietInsert,
  MedicalTreatmentInsert,
  OtherActivitiesInsert,
  OtherTreatmentInsert,
  VaccinesInsert,
  WalksInsert,
} from '@/libs/supabase'

export interface ModalTypeProps {
  isModify: boolean
}

export type ModalInputDataType =
  | AntiparasiticInsert
  | DietInsert
  | MedicalTreatmentInsert
  | OtherTreatmentInsert
  | OtherActivitiesInsert
  | WalksInsert
  | VaccinesInsert
