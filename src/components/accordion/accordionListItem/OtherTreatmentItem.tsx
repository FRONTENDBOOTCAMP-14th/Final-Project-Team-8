import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { OtherTreatment } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
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
      className="relative m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 px-4 py-[23px] transition hover:scale-[1.005] hover:border-gray-400"
      id={id}
    >
      {/* 제목 */}
      <h4
        id={headingId}
        className="line-clamp-1 grow text-start text-lg font-bold text-gray-800"
      >
        <button
          onClick={openModal}
          type="button"
          className="absolute top-0 left-0 z-1 h-full w-full cursor-pointer rounded-xl p-3 text-start transition hover:text-orange-400 active:origin-left"
        >
          <span className="line-clamp-2 w-[calc(100%-200px)] overflow-hidden text-ellipsis whitespace-nowrap transition">
            {title}
          </span>
        </button>
      </h4>

      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      <div className="ml-2 flex items-center gap-1 font-bold text-gray-500">
        <CalendarIcon aria-hidden="true" size={20} className="text-gray-400" />
        <time dateTime={toISODate(date)}>{date}</time>
      </div>

      {/* 편집/삭제 버튼 */}
      <ItemEditButtonCompo
        id={id}
        type="other treatments"
        pet_id={pet_id}
        title={title}
      />

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
          selectedPetId={pet_id}
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
