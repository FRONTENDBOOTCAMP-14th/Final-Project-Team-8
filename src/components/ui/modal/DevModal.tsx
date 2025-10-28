import { XButton } from '../button/IconButton'

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
          onClick={onClose}
          className="absolute top-4 right-4 rounded text-gray-400 transition-colors hover:text-gray-600 focus:ring-2 focus:ring-[#FF6000] focus:ring-offset-2 focus:outline-none"
          aria-label="닫기"
        ></button>
        <XButton onClick={onClose} aria-label="닫기" />

        <div className="text-center">
          {/* 아이콘 그대로 유지 */}
          <h3 id="modal-title" className="mb-2 text-xl font-bold text-gray-800">
            {title ?? '제작 중입니다'}
          </h3>
          <p className="mb-6 text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}
