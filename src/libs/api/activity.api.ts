// ---------------------------------------------------------------
// ✅ Supabase의 Activities 테이블용 클라이언트 API(함수)
// ---------------------------------------------------------------

import { toast } from 'sonner'
import { AccordionProps } from '../../components/accordion/accordion'
import type {
  AntiparasiticInsert,
  DietInsert,
  MedicalTreatmentInsert,
  OtherActivitiesInsert,
  OtherTreatmentInsert,
  VaccinesInsert,
  WalksInsert,
} from '../supabase'
import { createClient } from '../supabase/client'

// ---------------------------------------------------------------
// 생성(Create)
// libs/types/activity.ts

interface createactivityProps {
  setData:
    | AntiparasiticInsert
    | DietInsert
    | MedicalTreatmentInsert
    | OtherTreatmentInsert
    | OtherActivitiesInsert
    | WalksInsert
    | VaccinesInsert
  type: AccordionProps['type']
  pet_id: string
}

export default async function createActivity({
  setData,
  type,
  pet_id,
}: createactivityProps) {
  // const pet = await
  const supabase = createClient()

  const { error, data: insertData } = await supabase
    .from(type)
    .insert([{ ...setData, pet_id: pet_id }])
    .select('*')
    .single()

  if (error) {
    const errorMessage = '새 리스트 추가 실패'
    toast.error(`${errorMessage} ${error.message}`)
    throw new Error(errorMessage + error.message)
  }

  return insertData
}
