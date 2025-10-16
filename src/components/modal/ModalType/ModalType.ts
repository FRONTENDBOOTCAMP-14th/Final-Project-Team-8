import {
  AntiparasiticInsert,
  DietInsert,
  MedicalTreatmentInsert,
  OtherActivitiesInsert,
  OtherTreatmentInsert,
  VaccinesInsert,
  WalksInsert,
} from '@/libs/supabase'

export type ModalTypeProps = {
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
