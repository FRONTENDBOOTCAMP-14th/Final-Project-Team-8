import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export type FieldType = 'text' | 'date' | 'time' | 'number'

type BaseField = {
  /** 고유 키 (리스트 렌더링용) */
  key: string
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
interface InputBaseField extends BaseField {
  required?: string
}

export interface ModalDetailInpuProps extends ModalDetailProps {
  title: string
  /** 라인으로 구분된 필드들 */
  fields: InputBaseField[]
}
