import type { UUID } from 'crypto'
import type { AccordionProps } from '../../components/accordion/accordion'
import type {
  Antiparasitic,
  AntiparasiticInsert,
  Diet,
  DietInsert,
  MedicalTreatment,
  MedicalTreatmentInsert,
  OtherActivities,
  OtherActivitiesInsert,
  OtherTreatment,
  OtherTreatmentInsert,
  Vaccines,
  VaccinesInsert,
  Walks,
  WalksInsert,
} from '../supabase'
import { createClient } from '../supabase/client'
import type { Database } from '../supabase/database.types'

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

const supabase = createClient()

// 새 리스트 추가 API
export default async function createActivity<T extends TableType>(params: {
  setData: InsertMap[T]
  type: T
  pet_id: string
}) {
  const { setData, type, pet_id } = params

  const row = { ...setData, pet_id } as any

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
  antiparasitic: Antiparasitic
  diet: Diet
  'medical treatment': MedicalTreatment
  'other activities': OtherActivities
  'other treatments': OtherTreatment
  vaccines: Vaccines
  walks: Walks
}

// 테이블별 날짜 컬럼명 매핑
const dateColumnMap: Record<AllowedTableNames, string> = {
  antiparasitic: 'intake_date',
  diet: 'date',
  'medical treatment': 'visit_date',
  'other activities': 'date',
  'other treatments': 'date',
  vaccines: 'vaccinated_date',
  walks: 'date',

  // 나머지 테이블도 필요에 따라 추가
} as const

// function handleByDate(data: []) {
//   data.mpa()
// }

/**
 * 테이블별 리스트 조회 (배열 반환 보장)
 */
export async function getPetTableData<T extends AllowedTableNames>(
  type: T,
  pet_id: string | UUID
): Promise<TableRow<T>[]> {
  const orderColumn = dateColumnMap[type] ?? 'create_at'

  const { data, error } = await supabase
    .from(type)
    .select('*')
    .eq('pet_id', pet_id as any)
    .order(orderColumn, { ascending: false, nullsFirst: true })
    .returns<TableRow<T>[]>()

  if (error) throw error

  return data ?? []
}

// Update API
export async function updateActivity<T extends AllowedTableNames>(
  type: T,
  table_id: string,
  pet_id: string,
  dataList: Record<string, any>
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from(type)
    .update(dataList as any)
    .eq('id', table_id as any)
    .eq('pet_id', pet_id as any)
    .select('*')
    .single()

  if (error) {
    throw new Error(`${type} 수정 실패: ${error.message}`)
  }

  return data
}
