import type { AccordionProps } from '../../components/accordion/accordion'
import { createClient } from '../supabase/client'
import type { Database } from '../supabase/database.types'

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
  type: T
): Promise<TableRow<T>[]> {
  const supabase = createClient() // 이미 SupabaseClient<Database>
  const { data, error } = await supabase
    .from(type) // T는 AllowedTableNames → 안전
    .select('*')
    .returns<TableRow<T>[]>()

  if (error) throw error
  return data ?? []
}
