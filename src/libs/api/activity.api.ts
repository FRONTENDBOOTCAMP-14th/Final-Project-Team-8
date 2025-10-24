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
  ScheduledMeals,
  ScheduledMealsInsert,
  ScheduledMealsPartial,
  ScheduledMealsUpdate,
  Vaccines,
  VaccinesInsert,
  Walks,
  WalksInsert,
} from '../supabase'
import { createClient } from '../supabase/client'
import type { Database } from '../supabase/database.types'

// ============================================================================
// Types
// ============================================================================

export type TableType = AccordionProps['type']

/**
 * 테이블명 → Insert 타입 매핑
 * 각 테이블의 데이터 생성 시 사용되는 타입
 */
interface InsertMap {
  antiparasitic: AntiparasiticInsert
  diet: DietInsert
  'medical treatment': MedicalTreatmentInsert
  'other treatments': OtherTreatmentInsert
  'other activities': OtherActivitiesInsert
  walks: WalksInsert
  vaccines: VaccinesInsert
}

/** 테이블별 Row 타입 유틸 */
export type TableRow<T extends TableType> =
  Database['public']['Tables'][T]['Row']

/**
 * 각 컴포넌트 prop에 맞춘 테이블별 Row 맵
 * 타입 캐스팅에 사용
 */
export interface RowMap {
  antiparasitic: Antiparasitic
  diet: Diet
  'medical treatment': MedicalTreatment
  'other activities': OtherActivities
  'other treatments': OtherTreatment
  vaccines: Vaccines
  walks: Walks
}

// ============================================================================
// Constants
// ============================================================================

const supabase = createClient()

/**
 * 테이블별 날짜 컬럼명 매핑
 * 데이터 조회 시 정렬에 사용됨 (최신순)
 */
const dateColumnMap: Record<TableType, string> = {
  antiparasitic: 'intake_date',
  diet: 'date',
  'medical treatment': 'visit_date',
  'other activities': 'date',
  'other treatments': 'date',
  vaccines: 'vaccinated_date',
  walks: 'date',
} as const

// ============================================================================
// CREATE
// ============================================================================

/**
 * 새로운 활동 기록 생성
 * @param params - 생성할 데이터
 * @param params.setData - 테이블별 Insert 타입 데이터
 * @param params.type - 테이블명 (vaccines, diet 등)
 * @param params.pet_id - 펫 ID
 * @returns 생성된 레코드 데이터
 */
export default async function createActivity<T extends TableType>(params: {
  setData: InsertMap[T]
  type: T
  pet_id: InsertMap[T]['pet_id']
}) {
  const { setData, type, pet_id } = params
  const row = { ...setData, pet_id } as InsertMap[T]

  const { data, error } = await supabase
    .from(type)
    .insert([row] as any)
    .select('*')
    .single()

  if (error) {
    throw new Error(`[Create ${type}] ${error.message}`)
  }

  return data
}

// ============================================================================
// READ
// ============================================================================

/**
 * 펫의 모든 활동 기록 조회
 * 날짜 컬럼 기준으로 최신순 정렬
 *
 * @param type - 테이블명
 * @param pet_id - 펫 ID
 * @returns 활동 기록 배열 (최신순)
 */
export async function getPetTableData<T extends TableType>(
  type: T,
  pet_id: string | UUID
): Promise<TableRow<T>[]> {
  const orderColumn = dateColumnMap[type] ?? 'created_at'

  const { data, error } = await supabase
    .from(type)
    .select('*')
    .eq('pet_id', pet_id as any)
    .order(orderColumn, { ascending: false, nullsFirst: true })
    .returns<TableRow<T>[]>()

  if (error) {
    throw new Error(`[Read ${type}] ${error.message}`)
  }

  return data ?? []
}

// ============================================================================
// UPDATE
// ============================================================================

/**
 * 활동 기록 수정
 * @param type - 테이블명
 * @param table_id - 수정할 레코드 ID
 * @param pet_id - 펫 ID (보안 검증용)
 * @param dataList - 수정할 필드 객체 (id, pet_id 제외)
 * @returns 수정된 레코드 데이터
 */
export async function updateActivity<T extends TableType>(
  type: T,
  table_id: string,
  pet_id: string,
  dataList: Partial<Omit<TableRow<T>, 'id' | 'pet_id'>>
): Promise<TableRow<T>> {
  const { data, error } = await supabase
    .from(type)
    .update(dataList as any)
    .eq('id', table_id as any)
    .eq('pet_id', pet_id as any)
    .select('*')
    .single()

  if (error) {
    throw new Error(`[Update ${type}] ${error.message}`)
  }

  return data as unknown as TableRow<T>
}

// ============================================================================
// DELETE
// ============================================================================

/**
 * 활동 기록 삭제
 * @param type - 테이블명
 * @param table_id - 삭제할 레코드 ID
 * @param pet_id - 펫 ID (보안 검증용)
 * @throws 삭제 실패 시 에러 발생
 */
export async function deleteActivity<T extends TableType>(
  type: T,
  table_id: string,
  pet_id: string
): Promise<void> {
  const { error } = await supabase
    .from(type)
    .delete()
    .eq('id', table_id as any)
    .eq('pet_id', pet_id as any)

  if (error) {
    throw new Error(`[Delete ${type}] ${error.message}`)
  }
}

// ============================================================================
// ScheduledMeals
// ============================================================================
/**
 * 식사 기록 불러오기
 * @param pet_id - 펫 ID (보안 검증용)
 * @throws 삭제 실패 시 에러 발생
 */
export async function getPetMealTime(
  pet_id: ScheduledMeals['pet_id'] | null
): Promise<ScheduledMeals[]> {
  const supabase = await createClient()

  if (!pet_id) {
    throw new Error('지정된 펫의 아이디가 없습니다.')
  }

  const { error, data } = await supabase
    .from('scheduled meals')
    .select('*')
    .eq('pet_id', pet_id)

  if (error) {
    throw new Error(`[Read ${pet_id}] ${error.message}`)
  }

  return data
}

export async function insertScheduledMeal(
  formData: ScheduledMealsInsert,
  pet_id: ScheduledMealsInsert['pet_id']
) {
  // Supabase에 식사 시간 데이터 저장
  const row = { ...formData, pet_id }

  const { error, data } = await supabase
    .from('scheduled meals')
    .insert(row)
    .eq('pet_id', pet_id)

  if (error) throw new Error(error.message)
  return data
}

export async function updateScheduledMeal(
  formData: ScheduledMealsUpdate,
  id: ScheduledMeals['id']
) {
  const { error, data } = await supabase
    .from('scheduled meals')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`업데이트 오류 ${error.message}`)
  }

  return data
}
