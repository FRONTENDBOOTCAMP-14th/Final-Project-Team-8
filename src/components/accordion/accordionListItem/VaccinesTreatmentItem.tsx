import { CalendarIcon } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Vaccines } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeVaccination from '../../modal/ModalType/ModalTypeVaccination'
import ItemEditButtonCompo from './EditButton/ItemEditButtonCompo'

// ============================================================================
// Component
// ============================================================================

/**
 * VaccinesTreatmentItem 컴포넌트
 * - 예방접종 기록 항목 렌더링
 * - 마우스 호버 시 편집/삭제 버튼 표시 (fadeIn 애니메이션)
 * - 모달 열림 중에는 버튼 계속 표시 (작업 중단 방지)
 */
export default function VaccinesTreatmentItem({
  expiry_date,
  id,
  lot,
  notes,
  pet_id,
  title,
  vaccinated_date,
}: Vaccines) {
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
          <span className="line-clamp-2 w-130 overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </span>
        </button>
      </h3>

      {/* 구분선 */}
      <div className="relative mr-3 ml-3 flex items-center before:absolute before:left-0 before:h-4 before:w-px before:bg-gray-300"></div>

      <time
        dateTime={toISODate(vaccinated_date)}
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
        {vaccinated_date}
      </time>
      <time
        aria-label="만료 날짜"
        dateTime={toISODate(expiry_date ?? null)}
        className="sr-only"
      >
        {expiry_date ?? '다음 예정일이 없습니다.'}
      </time>

      {/* 편집/삭제 버튼 */}
      <ItemEditButtonCompo
        id={id}
        type="antiparasitic"
        pet_id={pet_id}
        title={title}
      />

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        isModify={isModify}
        setModify={setIsModify}
      >
        <ModalTypeVaccination
          isModify={isModify}
          setModify={setIsModify}
          onClose={handleCloseModal}
          restProps={{
            expiry_date,
            id,
            lot,
            notes,
            pet_id,
            title,
            vaccinated_date,
          }}
        />
      </Modal>
    </li>
  )
}
