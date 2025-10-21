import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Diet } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import { ModalTypeDiet } from '../../modal/ModalType/ModalTypeDiet'
import { setHarfTime } from '../../modal/timeHandler'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * DietItem 컴포넌트
 * - 식단 기록 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function DietItem({
  date,
  id,
  pet_id,
  time,
  title,
  snack_type,
  notes,
}: Diet) {
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
      className="relative m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 px-4 py-[23px] shadow-sm transition hover:scale-[1.005] hover:border-gray-400 hover:shadow-md"
      id={id}
    >
      {/* 제목 */}
      <h3
        id={headingId}
        className="line-clamp-1 grow text-start text-lg font-bold text-gray-800"
      >
        <button
          onClick={openModal}
          type="button"
          className="absolute top-0 left-0 z-1 h-full w-full cursor-pointer rounded-xl p-3 text-start transition hover:text-orange-400 active:origin-left active:scale-[0.95]"
        >
          {title}
        </button>
      </h3>

      {/* 시간 */}
      <span className="ml-2 font-bold text-gray-400">{setHarfTime(time)}</span>

      {/* 구분선 */}
      <div className="relative mx-3 h-4 w-px bg-gray-300" />

      {/* 날짜 */}
      <time
        dateTime={toISODate(date)}
        className="ml-2 flex items-center gap-1 font-bold text-gray-500"
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

      {/* 스낵 타입 (스크린 리더용) */}
      <span aria-label={`스낵 타입: ${snack_type}`} className="sr-only">
        {snack_type}
      </span>

      {/* 편집/삭제 버튼 */}
      {/* <div className={buttonVisibility}> */}
      <ItemEditButtonCompo id={id} type="diet" pet_id={pet_id} title={title} />
      {/* </div> */}

      {/* 모달 */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        isModify={isModify}
        setModify={setIsModify}
      >
        <ModalTypeDiet
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{ date, id, pet_id, time, title, snack_type, notes }}
        />
      </Modal>
    </li>
  )
}
