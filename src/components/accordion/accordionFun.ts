import { Database } from '../../libs/supabase/database.types'
import { AccordionProps } from './accordion'

export type TableName = keyof Database['public']['Tables']
export type RowByTable<T extends TableName> =
  Database['public']['Tables'][T]['Row']

// type에 따라 아이콘 선택
export const selectTypeIcon = (type: AccordionProps['type']): string => {
  switch (type) {
    case 'vaccines':
      return 'vaccination-icon'
    case 'antiparasitic':
      return 'anthelmintic-icon'
    case 'medical treatment':
      return 'medical-icon'
    case 'other treatments':
      return 'other-treatments-icon'
    case 'diet':
      return 'food-journals-icon'
    case 'walks':
      return 'walk-icon'
    case 'other activities':
      return 'other-journals-icon'
  }
}

// -----------------------
// type에 따른 버튼 title 반환
export const selectTypeButtonTitle = (type: AccordionProps['type']): string => {
  switch (type) {
    case 'vaccines':
      return '새 예방접종 기록 추가'
    case 'antiparasitic':
      return '새 구충 치료 기록 추가'
    case 'medical treatment':
      return '새 의료 처치 기록 추가'
    case 'other treatments':
      return '새 기타 치료 기록 추가'
    case 'diet':
      return '새 식단 일지 추가'
    case 'walks':
      return '새 산책 기록 추가'
    case 'other activities':
      return '기타 활동 일지 추가'
    default:
      return 'null'
  }
}
