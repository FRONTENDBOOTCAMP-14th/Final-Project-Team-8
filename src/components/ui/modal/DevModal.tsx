import { X } from 'lucide-react'

interface DevModalProps {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
}

export function DevModal({ open, onClose, title, message }: DevModalProps) {
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
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-5 right-5 size-8 cursor-pointer rounded-full border-0 bg-white p-1 text-[#80809A] hover:text-[#3A394F] focus:outline-[#FF6000]"
          onClick={onClose}
          aria-label="닫기"
          title="닫기"
        >
          <X />
        </button>

        <div className="my-4 text-center">
          {/* 아이콘 그대로 유지 */}
          <h2 id="modal-title" className="mb-2 text-xl font-bold text-gray-800">
            {title ?? '제작 중입니다'}
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}
