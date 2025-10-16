import {
  Antiparasitic,
  Diet,
  MedicalTreatment,
  OtherActivities,
  OtherTreatment,
  Vaccines,
  Walks,
} from '@/libs/supabase'
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldPath } from 'react-hook-form'
import { AccordionProps } from '../../accordion/accordion'

export type FieldType = 'text' | 'date' | 'time' | 'number'

export type BaseField = {
  /** 고유 키 (리스트 렌더링용) */
  key: FieldPath<
    | Antiparasitic
    | Diet
    | MedicalTreatment
    | OtherTreatment
    | OtherActivities
    | Walks
    | Vaccines
  >
  /** 테이블/입력 공통 라벨 */
  label: string
  /** 입력 타입 */
  type: FieldType
  /** 읽기(테이블) 모드에서 노출할 값 (문자열) */
  tableValue?: string | number | null
  /** 입력 모드에서 기본값 */
  defaultValue?: string | number | null
  /** time 입력의 step 등 세부 속성이 필요할 때 */
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export type ModalDetailProps = {
  title: string
  /** 수정 여부 (true = 입력 모드) */
  isModify: boolean
  /** 상단 섹션 타이틀 (ex. '상세') */
  sectionTitle?: string
  /** 라인으로 구분된 필드들 */
  fields: BaseField[]
  /** 특이 사항 라벨 */
  noteLabel?: string
  /** 특이 사항 기본값 */
  defaultNote?: string
  /** 특이 사항 textarea 커스텀 props */
  noteTextareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

// ------------------------------------------------------------------

export interface InputBaseField extends BaseField {
  // 필수 여부 : "폼 제출 시 에러 알림 문자열"
  requiredSet?: string
  min?: number
  max?: number
}

type Replace<T, R> = Omit<T, keyof R> & R

export type ModalDetailInpuProps = Replace<
  Omit<ModalDetailProps, 'isModify'>,
  {
    type: AccordionProps['type']
    fields: InputBaseField[]
    onClose: () => void
  }
>
