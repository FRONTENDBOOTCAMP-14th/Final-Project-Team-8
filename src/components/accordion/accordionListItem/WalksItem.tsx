import { Footprints } from 'lucide-react'
import { useId, useState } from 'react'
import useToggleState from '@/hooks/useToggleState'
import type { Walks } from '@/libs/supabase'
import { toISODate } from '@/utils/client/toISODate'
import Modal from '../../modal/Modal'
import ModalTypeWalks from '../../modal/ModalType/ModalTypeWalks'
import { setHarfTime } from '../../modal/timeHandler'
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
      className="relative m-5 flex h-24 items-center gap-4 rounded-xl border border-gray-300 px-4 py-[23px] transition hover:scale-[1.005] hover:border-gray-400"
    >
      <div className="gap- flex h-full w-full grow flex-col">
        <h4
          id={headingId}
          title={title}
          className="order-1 grow text-base font-bold text-gray-800"
        >
          <button
            onClick={openModal}
            type="button"
            className="absolute top-0 left-0 h-full w-full cursor-pointer rounded-xl hover:text-orange-400"
          >
            <span className="absolute top-12 left-4 line-clamp-1 flex h-5 w-130 gap-1 text-start">
              <Footprints
                aria-hidden="true"
                size={20}
                className="text-[#82C43C]"
              />
              <span className="line-clamp-2 w-[calc(100%-100px)] overflow-hidden text-ellipsis whitespace-nowrap transition">
                {title}
              </span>
            </span>
          </button>
        </h4>
        <div className="flex h-full gap-2">
          <time dateTime={toISODate(date)} className="leading-4 text-gray-500">
            {date}
          </time>
          <div className="h-4 w-px bg-gray-300" />
          <span className="leading-4 text-gray-500">
            {setHarfTime(start_time)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="flex gap-1 text-gray-500">
          <span className="font-bold text-gray-800">{distance}</span> km
        </span>
        <div className="h-4 w-px bg-gray-300" />
        <span className="flex gap-1 text-gray-500">
          <span className="font-bold text-gray-800">{total_time}</span> min
        </span>
      </div>

      {/* 편집/삭제 버튼 */}
      <ItemEditButtonCompo id={id} type="walks" pet_id={pet_id} title={title} />

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
          selectedPetId={pet_id}
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
