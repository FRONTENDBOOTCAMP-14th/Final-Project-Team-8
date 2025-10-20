import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Walks } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import { tw } from '../../../utils/shared'
import Modal from '../../modal/Modal'
import ModalTypeWalks from '../../modal/ModalType/ModalTypeWalks'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * WalksItem 컴포넌트
 * - 산책 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function WalksItem({
  date,
  distance,
  id,
  pet_id,
  start_time,
  title,
  total_time,
}: Walks) {
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
      className="m-5 flex h-[84px] items-center gap-4 rounded-xl border border-gray-300 px-4 py-[23px]"
    >
      <div className="flex grow flex-col gap-1">
        <h3
          id={headingId}
          title={title}
          className="order-1 grow text-base font-bold text-gray-800"
        >
          <button
            onClick={openModal}
            type="button"
            className="line-clamp-1 flex w-full grow origin-left cursor-pointer gap-2 transition active:scale-[0.95]"
          >
            <img
              aria-hidden="true"
              src="/components/accordion/walk-title-icon.svg"
              alt=""
            />
            {title}
          </button>
        </h3>
        <div className="flex items-center justify-start gap-2">
          <time dateTime={toISODate(date)} className="text-base text-gray-500">
            {date}
          </time>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-base text-gray-500">{start_time}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="text-gray-500">
          <span className="font-bold text-gray-800">{distance}</span> km
        </span>
        <div className="h-4 w-px bg-gray-300" />
        <span className="text-gray-500">
          <span className="font-bold text-gray-800">{total_time}</span> min
        </span>
      </div>

      {/* 편집/삭제 버튼 */}
      <div className={buttonVisibility}>
        <ItemEditButtonCompo
          onClick={openModal}
          setModify={setIsModify}
          id={id}
          type="walks"
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
        <ModalTypeWalks
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{
            date,
            distance,
            id,
            pet_id,
            start_time,
            title,
            total_time,
          }}
        />
      </Modal>
    </li>
  )
}
