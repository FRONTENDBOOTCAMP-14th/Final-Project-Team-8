import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Antiparasitic } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeAntiparasitic from '../../modal/ModalType/ModalTypeAntiparasitic'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * AntiparasiticTreatmentItem 컴포넌트
 * - 구충 치료 기록 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function AntiparasiticTreatmentItem({
  id,
  intake_date,
  next_date,
  notes,
  pet_id,
  title,
}: Antiparasitic) {
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
      className="relative m-5 flex max-h-[70px] items-center rounded-xl border border-gray-300 px-4 py-[23px]"
      id={id}
    >
      {/* 제목 */}
      <h3
        id={headingId}
        className="line-clamp-1 grow text-start text-base font-bold text-gray-800"
      >
        <button
          onClick={openModal}
          type="button"
          className="w-full cursor-pointer text-start transition hover:text-orange-400 active:origin-left active:scale-[0.95]"
        >
          {title}
        </button>
      </h3>

      {/* 구분선 */}
      <div className="relative mx-3 h-4 w-px bg-gray-300" />

      {/* 섭취 날짜 */}
      <time
        dateTime={toISODate(intake_date)}
        className="ml-2 flex items-center gap-1 font-bold text-gray-500"
      >
        <CalendarIcon
          aria-hidden="true"
          focusable="false"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {intake_date}
      </time>

      {/* 다음 예정일 (스크린 리더용) */}
      <time
        aria-label="다음 예정일"
        dateTime={toISODate(next_date ?? null)}
        className="sr-only"
      >
        {next_date ?? '다음 예정일이 없습니다.'}
      </time>

      {/* 편집/삭제 버튼 */}
      <ItemEditButtonCompo
        id={id}
        type="antiparasitic"
        pet_id={pet_id}
        title={title}
      />

      {/* 모달 */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        isModify={isModify}
        setModify={setIsModify}
      >
        <ModalTypeAntiparasitic
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{ id, intake_date, next_date, notes, pet_id, title }}
        />
      </Modal>
    </li>
  )
}
