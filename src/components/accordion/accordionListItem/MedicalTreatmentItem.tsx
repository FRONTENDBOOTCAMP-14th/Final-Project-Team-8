import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { MedicalTreatment } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeMedicalTreatment from '../../modal/ModalType/ModalTypeMedical'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * MedicalTreatmentItem 컴포넌트
 * - 의료 처치 기록 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function MedicalTreatmentItem({
  category,
  id,
  next_date,
  notes,
  pet_id,
  title,
  visit_date,
}: MedicalTreatment) {
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
        className="line-clamp-1 grow text-start text-base font-bold text-gray-800"
      >
        <button
          onClick={openModal}
          type="button"
          className="absolute top-0 left-0 z-1 h-full w-full cursor-pointer rounded-xl p-3 text-start transition hover:text-orange-400 active:origin-left active:scale-[0.95]"
        >
          {title}
        </button>
      </h3>

      {/* 구분선 */}
      <div className="relative mx-3 h-4 w-px bg-gray-300" />

      {/* 방문 날짜 */}
      <time
        dateTime={toISODate(visit_date)}
        className="ml-2 flex items-center gap-1 font-bold text-gray-500"
      >
        <CalendarIcon
          aria-hidden="true"
          focusable="false"
          width={20}
          height={20}
          className="text-gray-400"
        />
        {visit_date}
      </time>

      {/* 다음 예정일 (스크린 리더용) */}
      <time
        aria-label="다음 예정일"
        dateTime={toISODate(next_date ?? null)}
        className="sr-only"
      >
        {next_date ?? '다음 예정일이 없습니다.'}
      </time>

      {/* 카테고리 (스크린 리더용) */}
      <span aria-label={`카테고리: ${category}`} className="sr-only">
        {category}
      </span>

      {/* 편집/삭제 버튼 */}
      <ItemEditButtonCompo
        id={id}
        type="medical treatment"
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
        <ModalTypeMedicalTreatment
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{
            category,
            id,
            next_date,
            notes,
            pet_id,
            title,
            visit_date,
          }}
        />
      </Modal>
    </li>
  )
}
