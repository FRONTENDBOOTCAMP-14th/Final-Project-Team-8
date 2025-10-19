// ---------------------------------------------------------------
// ✅ Supabase의 Activities 테이블용 클라이언트 API(함수)
// ---------------------------------------------------------------

import type { AccordionProps } from '../../components/accordion/accordion'
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
import type { Database } from '../supabase/database.types'

// ---------------------------------------------------------------
// 생성(Create)
// libs/types/activity.ts

type TableType = AccordionProps['type']

// 테이블명 → Insert 타입 매핑
interface InsertMap {
  antiparasitic: AntiparasiticInsert
  diet: DietInsert
  'medical treatment': MedicalTreatmentInsert
  'other treatments': OtherTreatmentInsert
  'other activities': OtherActivitiesInsert
  walks: WalksInsert
  vaccines: VaccinesInsert
}

// 새 리스트 추가 API
export default async function createActivity<T extends TableType>(params: {
  setData: InsertMap[T]
  type: T
  pet_id: string
}) {
  // const pet = await
  const { setData, type, pet_id } = params
  const supabase = createClient()

  const row = { ...setData, pet_id } as any
  // const row = Object.assign({}, setData, { pet_id }) as any // any 임시방편... 원인을 모르겠다.

  const { data, error } = await supabase
    .from(type)
    .insert([row])
    .select('*')
    .single()

  if (error) {
    const errorMessage = '새 리스트 추가 실패'

    throw new Error(errorMessage + error.message)
  }

  return data as unknown as InsertMap[T]
}

// 아코디언에서 사용하는 테이블명 유니언
export type AllowedTableNames = AccordionProps['type']
// Row 유틸
export type TableRow<T extends AllowedTableNames> =
  Database['public']['Tables'][T]['Row']

// 각 컴포넌트 prop에 맞춘 테이블별 Row 맵(캐스팅에 사용)
export interface RowMap {
  antiparasitic: Database['public']['Tables']['antiparasitic']['Row']
  diet: Database['public']['Tables']['diet']['Row']
  'medical treatment': Database['public']['Tables']['medical treatment']['Row']
  'other activities': Database['public']['Tables']['other activities']['Row']
  'other treatments': Database['public']['Tables']['other treatments']['Row']
  vaccines: Database['public']['Tables']['vaccines']['Row']
  walks: Database['public']['Tables']['walks']['Row']
}

/**
 * 테이블별 리스트 조회 (배열 반환 보장)
 * - 클라이언트는 SupabaseClient<Database>로 타입이 이미 지정됨
 * - type은 AllowedTableNames로 제한되어 있어 from()의 키도 안전
 */

export async function getPetTableData<T extends AllowedTableNames>(
  type: T,
  pet_id: string
): Promise<TableRow<T>[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(type)
    .select('*')
    .eq('pet_id', pet_id as any)
    .returns<TableRow<T>[]>()

  if (error) throw error
  return data ?? []
}
