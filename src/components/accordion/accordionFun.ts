import { AccordionProps } from './accordion'

// type에 따라 아이콘 선택
export const selectTypeIcon = (type: AccordionProps['type']): string => {
  switch (type) {
    case 'vaccination':
      return 'vaccination-icon'
    case 'anthelmintic':
      return 'anthelmintic-icon'
    case 'medical':
      return 'medical-icon'
    case 'other-treatments':
      return 'other-treatments-icon'
    case 'food-journal':
      return 'food-journal-icon'
    case 'walk':
      return 'walk-icon'
    case 'other-journals':
      return 'other-jurnals-icon'
  }
}

// -----------------------
// type에 따른 버튼 title 반환
export const selectTypeButtonTitle = (type: AccordionProps['type']): string => {
  switch (type) {
    case 'vaccination':
      return '새 예방접종 기록 추가'
    case 'anthelmintic':
      return '새 구충 치료 기록 추가'
    case 'medical':
      return '새 의료 처치 기록 추가'
    case 'other-treatments':
      return '새 기타 치료 기록 추가'
    case 'food-journal':
      return '새 식단 일지 추가'
    case 'walk':
      return '새 산책 기록 추가'
    case 'other-journals':
      return '기타 활동 일지 추가'
  }
}

// 아코디언 날짜 0000-00-00 형식 변환 함수
export function toISODate(display: string) {
  const isoLike = /^\d{4}-\d{2}-\d{2}/.test(display)
  if (isoLike) return display
  const d = new Date(display)
  return isNaN(d.getTime()) ? display : d.toISOString().slice(0, 10)
}
