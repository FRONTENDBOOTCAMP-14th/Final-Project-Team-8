import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { OtherActivities } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeOtherActivites from '../../modal/ModalType/ModalTypeOtherActivites'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * OtherActivitiesItem 컴포넌트
 * - 기타 활동 기록 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function OtherActivitiesItem({
  date,
  id,
  notes,
  pet_id,
  start_time,
  duration_time,
  title,
}: OtherActivities) {
  // ========================================================================
  // States
  // ========================================================================

  const [isModify, setIsModify] = useState(false)
  const [isModalOpen, { on: openModal, off: closeModal }] =
    useToggleState(false)
  const headingId = useId()

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleCloseModal = () => {
    closeModal()
  }

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <li
      aria-labelledby={headingId}
      className="relative m-5 list-none rounded-xl border-1 border-gray-300 p-5 transition hover:scale-[1.005] hover:border-gray-400"
    >
      <div className="">
        <h3
          id={headingId}
          className="text-xl font-bold text-gray-800 transition hover:text-orange-400"
        >
          <button
            onClick={openModal}
            type="button"
            className="absolute top-0 left-0 h-full w-full cursor-pointer rounded-xl text-start"
          >
            {/* 제목은 너무 길면 줄 넘어감 */}
            <span className="absolute top-4.5 left-6 line-clamp-1 w-[calc(100%-200px)]">
              {title}
            </span>
          </button>
        </h3>
      </div>

      <div className="flex flex-col">
        <time
          dateTime={toISODate(date)}
          className="flex w-full min-w-26 items-center justify-end gap-1 pr-1 text-sm font-bold text-gray-500"
        >
          {/* 구분선 */}
          <div className="relative mx-3 h-4 w-px bg-gray-300" />
          <CalendarIcon
            focusable="false"
            aria-hidden="true"
            width={20}
            height={20}
            className="text-gray-400"
          />
          {date}
        </time>

        {/* 구분선(가로) */}
        <div className="mt-5 mr-1 border-t-1 border-gray-100" />

        {/* 본문 & 삭제 버튼 */}
        <div className="mt-3 mr-5 flex items-center gap-10 p-1">
          <p className="mr-5 line-clamp-2 max-w-200 grow rounded-xl border-gray-200 p-1 text-start text-sm whitespace-pre-line text-gray-500">
            {notes}
          </p>
          {/* 편집/삭제 버튼 */}

          <ItemEditButtonCompo
            id={id}
            type="other activities"
            pet_id={pet_id}
            title={title}
          />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        isModify={isModify}
        setModify={setIsModify}
      >
        <ModalTypeOtherActivites
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{
            date,
            id,
            notes,
            pet_id,
            start_time,
            duration_time,
            title,
          }}
        />
      </Modal>
    </li>
  )
}
