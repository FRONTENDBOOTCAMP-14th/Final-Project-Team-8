import type { AccordionProps } from '@/components/accordion/accordion'
import type {
  ScheduledMeals,
  ScheduledMealsInsert,
  ScheduledMealsUpdate,
} from '../supabase'
import { createClient } from '../supabase/client'
import type { Database } from '../supabase/database.types'
import { deleteNotification } from './notification.api'

// ============================================================================
// Types
// ============================================================================

export type TableType = AccordionProps['type']

/**
 * Supabase 네이티브 Insert 타입 매핑
 */
type DbInsert<T extends TableType> = Database['public']['Tables'][T]['Insert']

/**
 * Supabase 네이티브 Update 타입 매핑
 */
type DbUpdate<T extends TableType> = Database['public']['Tables'][T]['Update']

/** 테이블별 Row 타입 유틸 */
export type TableRow<T extends TableType> =
  Database['public']['Tables'][T]['Row']

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
 * @returns 생성된 레코드 데이터
 */
export default async function createActivity<T extends TableType>(params: {
  setData: DbInsert<T>
  type: T
}): Promise<TableRow<T>> {
  const { setData, type } = params

  const { data, error } = await supabase
    .from(type)
    .insert(setData as never)
    .select('*')
    .single()

  if (error) {
    throw new Error(`[Create ${type}] ${error.message}`)
  }

  return data as unknown as TableRow<T>
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
  pet_id: string
): Promise<TableRow<T>[]> {
  const orderColumn = dateColumnMap[type] ?? 'created_at'

  const { data, error } = await supabase
    .from(type)
    .select('*')
    .eq('pet_id' as never, pet_id as never)
    .order(orderColumn as never, { ascending: false, nullsFirst: true })

  if (error) {
    throw new Error(`[Read ${type}] ${error.message}`)
  }

  return (data ?? []) as unknown as TableRow<T>[]
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
  dataList: DbUpdate<T>
): Promise<TableRow<T>> {
  const { data, error } = await supabase
    .from(type)
    .update(dataList as never)
    .eq('id' as never, table_id as never)
    .eq('pet_id' as never, pet_id as never)
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
    .eq('id' as never, table_id as never)
    .eq('pet_id' as never, pet_id as never)

  if (error) {
    throw new Error(`[Delete ${type}] ${error.message}`)
  }

  try {
    const notificationType = getNotificationTypeFromTableType(type)
    if (notificationType) {
      await deleteNotification(notificationType, table_id)
    }
  } catch (error) {
    alert(`알림 삭제 실패(무시됨): ${error}`)
  }
}

function getNotificationTypeFromTableType(tableType: TableType): string | null {
  const typeMap: Record<TableType, string | null> = {
    vaccines: 'vaccine',
    antiparasitic: 'antiparasitic',
    'medical treatment': 'medical',
    'other treatments': 'other treatments',
    walks: 'walk',
    'other activities': 'other activities',
    diet: null,
  }

  return typeMap[tableType] ?? null
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
  pet_id: string
): Promise<ScheduledMeals[]> {
  const supabase = await createClient()

  const { error, data } = await supabase
    .from('scheduled meals')
    .select('*')
    .eq('pet_id', pet_id)
    .order('id', { ascending: true })

  if (error) {
    throw new Error(`[Read scheduled meals] ${error.message}`)
  }

  return data
}

export async function insertScheduledMeal(
  formData: ScheduledMealsInsert
): Promise<ScheduledMeals[]> {
  const { error, data } = await supabase
    .from('scheduled meals')
    .insert(formData)
    .select()

  if (error) throw new Error(error.message)
  return data
}

export async function updateScheduledMeal(
  formData: ScheduledMealsUpdate,
  id: string
): Promise<ScheduledMeals> {
  const { error, data } = await supabase
    .from('scheduled meals')
    .update(formData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`[Update scheduled meal] ${error.message}`)
  }

  return data
}
