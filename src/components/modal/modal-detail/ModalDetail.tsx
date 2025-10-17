// components/modal/ModalDetail.tsx
import { CalendarDays, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FieldType, ModalDetailProps } from './ModalDetailType'

export default function ModalDetail({
  title,
  isModify,
  sectionTitle = '상세',
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
      {!isModify ? (
        <h1
          id="title"
          className="mt-5 mb-10 grow text-[28px] font-bold text-gray-800"
        >
          {title ?? '다이얼로그 제목'}
        </h1>
      ) : (
        <input
          id="title"
          type="text"
          defaultValue={title}
          placeholder="제목을 입력해주세요"
          className="mt-3 mb-8 w-full grow rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
        />
      )}

      {/* 섹션 타이틀 */}
      <h2 className="text-[18px] font-bold text-gray-800">{sectionTitle}</h2>

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

      <div className="relative mt-3 mb-5 flex w-full">
        {/* 왼쪽 세로 구분선 */}
        <span className="absolute left-0 inline-block h-full w-[1px] bg-gray-300" />

        <div className="ml-4 flex min-h-10 w-full items-center">
          {!isModify ? (
            <p className="font-bold">{defaultNote}</p>
          ) : (
            <>
              <label htmlFor="detail-note" className="sr-only">
                {noteLabel} 입력
              </label>
              <textarea
                id="notes"
                defaultValue={defaultNote === '-' ? '' : defaultNote}
                className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-amber-400 focus:outline-none"
                rows={2}
                {...noteTextareaProps}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
