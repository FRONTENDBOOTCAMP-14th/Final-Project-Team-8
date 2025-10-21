import { Trash2 } from 'lucide-react'
import useToggleState from '@/hooks/useToggleState'
import { tw } from '../../../../utils/shared'
import Modal from '../../../modal/Modal'
import type { AccordionProps } from '../../accordion'
import DeleteConfirmModal from './DeleteConfirmModal'

// ============================================================================
// Types
// ============================================================================

interface ItemEditButtonCompoProps {
  title: string | null
  id: string
  type: AccordionProps['type']
  pet_id: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * 아이템 편집/삭제 버튼 컴포넌트
 * - 편집 버튼: 모달 오픈
 * - 삭제 버튼: 비동기 삭제 + 캐시 무효화 + UI 자동 갱신
 */
export default function ItemEditButtonCompo({
  title,
  id,
  type,
  pet_id,
}: ItemEditButtonCompoProps) {
  // ========================================================================
  // Hooks
  // ========================================================================

  const [isDeleteModalOpen, { on: openDeleteModal, off: closeDeleteModal }] =
    useToggleState(false)

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <>
      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={openDeleteModal}
        aria-label={`${title} 삭제`}
        className={tw(
          'flex items-center justify-center' /* layout + alignment */,
          'z-2' /* stacking */,
          'ml-2 h-[38px] w-[38px] p-[9px]' /* box model */,
          'rounded-[14px] border border-orange-400' /* border */,
          'text-orange-500' /* text & color */,
          'hover:cursor-pointer hover:bg-orange-50' /* hover states */,
          'active:scale-[0.95]' /* active state */,
          'disabled:cursor-not-allowed disabled:opacity-50' /* disabled state */
        )}
      >
        <Trash2 width={20} height={20} className="text-orange-400" />
        <span className="sr-only">삭제</span>
      </button>
      <Modal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        isModify={false}
        setModify={() => {}}
        buttonNone={true}
      >
        <DeleteConfirmModal
          title={title}
          type={type}
          id={id}
          pet_id={pet_id}
          onCancel={closeDeleteModal}
        />
      </Modal>
    </>
  )
}
