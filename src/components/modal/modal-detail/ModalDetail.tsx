// components/modal/ModalDetail.tsx
import { CalendarDays, Clock, PawPrint } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FieldType, ModalDetailProps } from './ModalDetailType'

export function ModalDetailNonModify({
  type,
  title,
  sectionTitle = '상세',
  fields,
  noteLabel = '특이 사항',
  defaultNote = '특이 사항 없음',
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

      <h2
        id="title"
        className="mt-5 mb-5 w-150 grow overflow-auto text-[28px] font-bold text-gray-800"
      >
        {title ?? '다이얼로그 제목'}
      </h2>

      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-gray-800">{sectionTitle}</div>

      {/* 필드 리스트 */}
      <ul className="mb-5 flex flex-wrap items-start gap-4">
        {fields.map(f => (
          <li
            key={f.key}
            className="mt-3 flex min-w-[220px] flex-1 basis-0 items-center"
          >
            {/* 각 컬럼 좌측 세로 구분선 */}
            <div className="mr-3 h-[60px] w-[2px] flex-shrink-0 rounded-xl bg-gray-200" />
            <div className="mt-1 flex w-full flex-col">
              <div className="text-base text-gray-700">{f.label}</div>

              {/* 모드별 렌더링 */}
              <div className="mt-1 flex items-center gap-2 pt-2 text-base font-bold text-gray-800">
                {/* 시간/날짜/텍스트 모두 tableValue로 표현 */}
                {selectIconType(f.type)}
                {f.tableValue ?? f.defaultValue ?? '-'}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* 특이 사항 섹션 */}
      {type !== 'walks' && (
        <>
          <div className="mt-4 text-[18px] font-bold text-gray-800">
            {noteLabel}
          </div>

          <div className="relative mt-3 mb-5 flex w-full items-center">
            {/* 왼쪽 세로 구분선 */}
            <span className="absolute left-0 inline-block h-full w-[2px] rounded-xl bg-gray-200" />

            <div className="ml-4 flex min-h-10 w-full items-center">
              {!defaultNote ? (
                <p className="flex gap-2 text-gray-400">
                  비어있습니다.
                  <PawPrint />
                </p>
              ) : (
                <p className="font-bold">{defaultNote}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
