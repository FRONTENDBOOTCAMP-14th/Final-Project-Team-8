'use client'

import { X } from 'lucide-react'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import Button from '../ui/button/Button'

type Props = PropsWithChildren<{
  open?: boolean
  onClose?: () => void
  title?: string
  describe?: string
}>

export default function Modal({
  open = false,
  onClose,
  title,
  describe,
  children,
}: Props) {
  // createPortal에 전달되는 루트 요소
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)

  // 수정 상태 변경 저장
  const [isModify, setModify] = useState<boolean>(false)

  //
  const opennerRef = useRef<HTMLElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const describeId = `${dialogId}-describe`

  const close = useCallback(() => {
    opennerRef.current?.focus()
    onClose?.()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }

    // 모달 다이얼로그의 오버레이 영역 클릭 시 닫기 기능 구현
    const handleCloseByBackdrop = (e: globalThis.MouseEvent) => {
      if (e.target === dialog) onClose?.()
    }
    dialog.addEventListener('click', handleCloseByBackdrop)

    return () => {
      dialog.removeEventListener('click', handleCloseByBackdrop)
    }
  }, [open, onClose])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPortalEl(document.getElementById('modal-dialog-portal'))
    }
  }, [])

  if (!open || !portalEl) return null

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={describe ? describeId : undefined}
      className="m-auto rounded-3xl border-0 bg-white shadow-xl backdrop:backdrop-blur-[3px]"
    >
      <div className="felx flex min-h-55 w-170 flex-col p-[30px]">
        <div className="flex gap-6">
          {!isModify ? (
            <h1
              id={titleId}
              className="grow text-[28px] font-bold text-gray-800"
            >
              {title ?? '다이얼로그 제목'}
            </h1>
          ) : (
            <input
              type="text"
              defaultValue={title}
              className="grow rounded-md border-2 border-amber-500 p-2 focus:border-2 focus:border-orange-500 focus:outline-none"
            />
          )}
          <button
            type="button"
            aria-label="다이얼로그 닫기"
            title="다이얼로그 닫기"
            disabled={isModify}
            onClick={close}
            className="cursor-pointer rounded-full text-gray-600 transition active:scale-[0.95] disabled:cursor-not-allowed disabled:text-gray-300"
          >
            <X width={20} height={20} />
          </button>
        </div>
        {describe && <div id={describeId}>{describe}</div>}
        {children}

        <Button
          className="!m-0 !p-0"
          onClick={() => {
            setModify(prev => !prev)
          }}
        >
          수정
        </Button>
      </div>
    </dialog>,
    portalEl
  )
}
