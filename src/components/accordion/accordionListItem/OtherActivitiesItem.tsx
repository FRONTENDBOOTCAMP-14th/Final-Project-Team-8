import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { OtherActivities } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import { tw } from '../../../utils/shared'
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

  const [isHovered, setIsHovered] = useState(false)
  const [isModify, setIsModify] = useState(false)
  const [isModalOpen, { on: openModal, off: closeModal }] =
    useToggleState(false)
  const headingId = useId()

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    // 모달이 열려있지 않으면 버튼 숨김 (300ms 후)
    if (!isModalOpen) {
      setTimeout(() => setIsHovered(false), 300)
    }
  }

  const handleCloseModal = () => {
    closeModal()
    setIsHovered(false)
  }

  // ========================================================================
  // Styles
  // ========================================================================

  const buttonVisibility = tw(
    'transition-opacity duration-300 right-4 flex',
    isHovered ? 'opacity-100' : 'absolute opacity-0 pointer-events-none'
  )

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-labelledby={headingId}
      className="relative m-5 max-h-34 min-h-25 w-[calc(100%-40px)] list-none rounded-xl border border-gray-300 px-4 py-[16px]"
    >
      <div className="mb-1 flex">
        <button
          onClick={openModal}
          type="button"
          className="grow-1 origin-left cursor-pointer transition hover:text-orange-400 active:scale-[0.95]"
        >
          {/* 제목은 너무 길면 줄 넘어감 */}
          <h3
            id={headingId}
            className="line-clamp-1 rounded-2xl text-start text-base font-bold text-gray-800"
          >
            {title}
          </h3>
        </button>
        <time
          dateTime={toISODate(date)}
          className="flex min-w-26 items-center justify-center gap-1 text-sm font-bold text-gray-500"
        >
          <CalendarIcon
            focusable="false"
            aria-hidden="true"
            width={20}
            height={20}
            className="text-gray-400"
          />
          {date}
        </time>
      </div>
      <div className="flex">
        <p className="line-clamp-4 grow text-start text-sm whitespace-pre-line text-gray-500">
          {notes}
        </p>
        {/* 편집/삭제 버튼 */}
        <div className={buttonVisibility}>
          <ItemEditButtonCompo
            onClick={openModal}
            setModify={setIsModify}
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
