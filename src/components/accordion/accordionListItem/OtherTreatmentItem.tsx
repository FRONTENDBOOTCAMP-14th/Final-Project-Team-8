import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { OtherTreatment } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import { tw } from '../../../utils/shared'
import Modal from '../../modal/Modal'
import ModalTypeOtherTreatment from '../../modal/ModalType/ModalTypeOtherTreatment'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * OtherTreatmentItem 컴포넌트
 * - 기타 치료 기록 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function OtherTreatmentItem({
  date,
  detail,
  id,
  notes,
  pet_id,
  title,
}: OtherTreatment) {
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
      className="m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 pt-[23px] pr-4 pb-[23px] pl-4"
      id={id}
    >
      <h3
        id={headingId}
        className="line-clamp-1 grow text-start text-base font-bold text-gray-800"
      >
        <button
          onClick={openModal}
          type="button"
          className="w-full origin-left cursor-pointer text-start transition active:scale-[0.95]"
        >
          {/* 백신 이름 */}
          {title}
        </button>
      </h3>
      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      <time
        dateTime={toISODate(date)}
        className="ml-2 flex items-center gap-1 font-bold text-gray-500"
      >
        {/* 날짜 아이콘 및 표시 */}
        <CalendarIcon
          aria-hidden="true"
          focusable="false"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {date}
      </time>

      {/* 편집/삭제 버튼 */}
      <div className={buttonVisibility}>
        <ItemEditButtonCompo
          onClick={openModal}
          setModify={setIsModify}
          id={id}
          type="other treatments"
          pet_id={pet_id}
          title={title}
        />
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        isModify={isModify}
        setModify={setIsModify}
      >
        <ModalTypeOtherTreatment
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{
            date,
            detail,
            id,
            notes,
            pet_id,
            title,
          }}
        />
      </Modal>
    </li>
  )
}
