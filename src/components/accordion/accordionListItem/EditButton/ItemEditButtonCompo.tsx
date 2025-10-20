import { SquarePen, X } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import useToggleState from '@/hooks/useToggleState'
import Modal from '../../../modal/Modal'
import type { AccordionProps } from '../../accordion'
import DeleteConfirmModal from './DeleteConfirmModal'

// ============================================================================
// Types
// ============================================================================

interface ItemEditButtonCompoProps {
  onClick: () => void
  setModify: Dispatch<SetStateAction<boolean>>
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
  onClick,
  setModify,
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
  // Mutations
  // ========================================================================

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleEditClick = () => {
    onClick()
    setModify(true)
  }

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <>
      {/* 편집 버튼 */}
      <button
        type="button"
        onClick={handleEditClick}
        aria-label={`${title} 편집`}
        // disabled={deleteMutation.isPending}
        className="mr-3 ml-3 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer hover:bg-orange-50 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SquarePen
          focusable="false"
          aria-hidden="true"
          width={20}
          height={20}
        />
        <span className="sr-only">편집</span>
      </button>

      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={openDeleteModal}
        aria-label={`${title} 삭제`}
        // disabled={deleteMutation.isPending}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer hover:bg-orange-50 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <X width={20} height={20} />
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
          // onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
          // isLoading={deleteMutation.isPending}
        />
      </Modal>
    </>
  )
}
