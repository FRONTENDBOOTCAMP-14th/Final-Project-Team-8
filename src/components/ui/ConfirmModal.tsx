import { X } from 'lucide-react'
import Button from './button/Button'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  onConfirm?: () => void
}

export default function ConfirmModal({
  open,
  onClose,
  title,
  children,
  onConfirm,
}: ConfirmModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-md min-w-fit rounded-2xl bg-white p-8 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
          aria-label="닫기"
        >
          <X />
        </button>
        {title && (
          <p id="modal-title" className="mb-4 text-xl font-bold">
            {title}
          </p>
        )}
        <div className="flex min-h-50 flex-col items-center justify-center gap-2 text-2xl font-bold whitespace-nowrap">
          {children}
        </div>
        <div className="flex gap-5">
          <Button variant="orange" onClick={onConfirm}>
            확인
          </Button>
          <Button variant="white" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>
  )
}
