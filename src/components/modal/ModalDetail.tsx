// components/modal/ModalDetail.tsx
import { CalendarDays, Clock } from 'lucide-react'
import {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react'
import { useModal } from '../../store/modalStore'

type FieldType = 'text' | 'date' | 'time' | 'number'

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

type ModalDetailProps = {
  /** 수정 여부 (true = 입력 모드) */
  isModify: boolean
  /** 상단 섹션 타이틀 (ex. '상세') */
  title?: string
  /** 라인으로 구분된 필드들 */
  fields: BaseField[]
  /** 특이 사항 라벨 */
  noteLabel?: string
  /** 특이 사항 기본값 */
  defaultNote?: string
  /** 특이 사항 textarea 커스텀 props */
  noteTextareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

export default function ModalDetail({
  isModify,
  title = '상세',
  fields,
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
  noteTextareaProps,
}: ModalDetailProps) {
  const selectIconType = (type: FieldType): ReactNode => {
    if (type === 'text') return null
    else if (type === 'date')
      return <CalendarDays size={20} className="text-gray-600" />
    else if (type === 'time' || type === 'number')
      return <Clock size={20} className="text-gray-600" />
    return null
  }

  return (
    <div>
      {/* 섹션 타이틀 */}
      <h2 className="text-[18px] font-bold text-gray-800">{title}</h2>

      {/* 필드 리스트 */}
      <ul className="flex flex-wrap items-start gap-4">
        {fields.map(f => (
          <li key={f.key} className="mt-3 flex min-w-[220px] flex-1 basis-0">
            {/* 각 컬럼 좌측 세로 구분선 */}
            <div className="mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
            <div className="mt-1 flex w-full flex-col">
              <div className="text-base text-gray-700">{f.label}</div>

              {/* 모드별 렌더링 */}
              {!isModify ? (
                <div className="mt-1 flex items-center gap-2 text-base font-bold text-gray-800">
                  {/* 시간/날짜/텍스트 모두 tableValue로 표현 */}
                  {selectIconType(f.type)}
                  {f.tableValue ?? f.defaultValue ?? '-'}
                </div>
              ) : (
                <div className="mt-1">
                  {/* 입력 컨트롤 */}
                  <label htmlFor={`field-${f.key}`} className="sr-only">
                    {f.label} 입력
                  </label>
                  <input
                    id={`field-${f.key}`}
                    type={f.type}
                    defaultValue={f.defaultValue ?? ''}
                    className="w-full rounded-md border-2 border-gray-300 p-1 focus:border-amber-400 focus:outline-none"
                    {...f.inputProps}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 특이 사항 섹션 */}
      <h2 className="mt-4 text-[18px] font-bold text-gray-800">{noteLabel}</h2>

      <div className="relative mt-3 mb-3 flex w-full">
        {/* 왼쪽 세로 구분선 */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

        <div className="ml-4 w-full">
          {!isModify ? (
            <p className="font-bold">{defaultNote}</p>
          ) : (
            <>
              <label htmlFor="detail-note" className="sr-only">
                {noteLabel} 입력
              </label>
              <textarea
                id="detail-note"
                defaultValue={defaultNote === '-' ? '' : defaultNote}
                className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
                rows={3}
                {...noteTextareaProps}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function ModalDetailInput({
  title = '상세',
  fields,
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
  noteTextareaProps,
}: ModalDetailProps) {
  const [inputData, setInputData] = useState<Object>({})
  const isSubmit = useModal(state => state.isSubmit)
  const handleSubmit = useCallback(() => {}, [])

  return (
    <form onSubmit={handleSubmit}>
      {/* 섹션 타이틀 */}
      <h2 className="text-[18px] font-bold text-gray-800">{title}</h2>

      {/* 필드 리스트 */}
      <ul className="flex flex-wrap items-start gap-4">
        {fields.map(f => (
          <li key={f.key} className="mt-3 flex min-w-[220px] flex-1 basis-0">
            {/* 각 컬럼 좌측 세로 구분선 */}
            <div className="mr-3 h-[70px] w-[1px] flex-shrink-0 bg-gray-300" />
            <div className="mt-1 flex w-full flex-col">
              <div className="text-base text-gray-700">{f.label}</div>

              {/* 모드별 렌더링 */}

              <div className="mt-1">
                {/* 입력 컨트롤 */}
                <label htmlFor={`field-${f.key}`} className="sr-only">
                  {f.label} 입력
                </label>
                <input
                  id={`field-${f.key}`}
                  type={f.type}
                  defaultValue={f.defaultValue ?? ''}
                  className="w-full rounded-md border-2 border-gray-300 p-1 focus:border-amber-400 focus:outline-none"
                  {...f.inputProps}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 특이 사항 섹션 */}
      <h2 className="mt-4 text-[18px] font-bold text-gray-800">{noteLabel}</h2>

      <div className="relative mt-3 mb-3 flex w-full">
        {/* 왼쪽 세로 구분선 */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

        <div className="ml-4 w-full">
          <label htmlFor="detail-note" className="sr-only">
            {noteLabel} 입력
          </label>
          <textarea
            id="detail-note"
            defaultValue={defaultNote === '-' ? '' : defaultNote}
            className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
            rows={3}
            {...noteTextareaProps}
          />
        </div>
      </div>
    </form>
  )
}
