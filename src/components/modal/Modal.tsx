'use client'

/**
 * ✅ Modal 컴포넌트
 * ----------------------------------------------------------
 * - HTMLDialogElement 기반의 접근성(A11y) 완전 대응 모달
 * - createPortal로 #modal-dialog-portal 요소 아래 렌더링됨
 * - focus-trap, ESC 닫기, 배경 클릭 닫기, blur backdrop 등 지원
 * - 수정 모드(isModify)가 활성화되어 있으면 닫기 방지 및 안내 토스트 출력
 *
 * 💡 사용 예시:
 *
 * <Modal
 *   open={isOpen}
 *   onClose={handleClose}
 *   title="백신 접종 정보"
 *   isModify={isModify}
 *   setModify={setModify}
 * >
 *   <p>모달 본문 내용</p>
 * </Modal>
 *
 * ⚙️ props
 * - open: 모달 열림 여부(boolean)
 * - onClose: 모달 닫기 함수
 * - title: 모달 상단 제목
 * - describe: 보조 설명 텍스트
 * - isModify: 수정 모드 상태
 * - setModify: 수정 모드 상태 변경 setter
 * - children: 모달 내부에 삽입할 콘텐츠
 */

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'
import { tabbableSelector } from '../../utils/client'
import { DialogInner } from './DialogInner'

type Props = PropsWithChildren<{
  /** 모달 제목 */
  title?: string
  /** 모달 열림 여부 */
  open: boolean
  /** 모달 닫기 콜백 */
  onClose: () => void
  /** 모달 설명 (aria-describedby에 사용됨) */
  describe?: string
  /** 수정 모드 여부 */
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
}>

export default function Modal({
  open = false,
  onClose,
  title,
  describe,
  isModify,
  setModify,
  children,
}: Props) {
  /** 🔹 Portal 루트 요소 (layout.tsx 안의 <div id="modal-dialog-portal" />) */
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)

  /** 🔹 모달을 열었던 버튼(포커스 복귀용) */
  const opennerRef = useRef<HTMLElement>(null)
  /** 🔹 dialog 요소 참조 */
  const dialogRef = useRef<HTMLDialogElement>(null)

  /** 🔹 접근성용 고유 ID */
  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const describeId = `${dialogId}-describe`

  /** 🔹 모달 닫기 함수 */
  const close = useCallback(() => {
    // 닫힐 때, 열기 버튼으로 포커스 복귀
    opennerRef.current?.focus()
    onClose?.()
  }, [onClose])

  // ------------------------------------------------------------
  // 🟢 모달 오픈/클로즈 및 배경 클릭 닫기 처리
  // ------------------------------------------------------------
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) dialog.showModal()
    else dialog.close()

    // 🔸 배경(backdrop) 클릭 시 닫기 처리
    const handleCloseByBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) {
        if (isModify) toast.error('완료 버튼을 먼저 눌러주세요.')
        else onClose?.()
      }
    }

    dialog.addEventListener('click', handleCloseByBackdrop)
    return () => dialog.removeEventListener('click', handleCloseByBackdrop)
  }, [open, onClose, isModify])

  // ------------------------------------------------------------
  // 🟢 포커스 트랩 및 키보드 접근성
  // ------------------------------------------------------------
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    // 🔸 모달 열릴 때, 이전 포커스 요소 기억
    opennerRef.current = document.activeElement as HTMLElement

    // 🔸 포커스 가능한 모든 요소 수집
    const tabbables = Array.from(
      dialog.querySelectorAll<HTMLElement>(tabbableSelector)
    )

    // 🔸 닫기 버튼 외 첫 번째 포커스 가능한 요소로 이동
    const focusFirst = () => {
      const firstFocusable = tabbables.find(el => el.tagName !== 'BUTTON')
      firstFocusable?.focus()
    }
    focusFirst()

    // 🔸 키보드 탐색 제어 (Tab, Shift+Tab, ESC)
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (tabbables.length === 0) return
      const { key, shiftKey } = e
      const { activeElement } = document
      const first = tabbables[0] as HTMLElement
      const last = tabbables[tabbables.length - 1] as HTMLElement

      if (key === 'Escape') return close()

      if (key === 'Tab') {
        if (shiftKey && activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!shiftKey && activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    dialog.addEventListener('keydown', handleFocusTrap)

    // 🔸 스크롤 잠금
    document.body.style.overflowY = 'hidden'

    return () => {
      dialog.removeEventListener('keydown', handleFocusTrap)
      document.body.style.overflowY = 'visible'
    }
  }, [open, close, isModify])

  // ------------------------------------------------------------
  // 🟢 포털 엘리먼트 초기화 (#modal-dialog-portal)
  // ------------------------------------------------------------
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPortalEl(document.getElementById('modal-dialog-portal'))
    }
  }, [])

  // ------------------------------------------------------------
  // 🚫 포털 루트가 없거나, open이 false면 렌더링하지 않음
  // ------------------------------------------------------------
  if (!open || !portalEl) return null

  // ------------------------------------------------------------
  // 🟢 실제 모달 UI 렌더링
  // ------------------------------------------------------------
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={describe ? describeId : undefined}
      className="m-auto rounded-3xl border-0 bg-white shadow-xl backdrop:backdrop-blur-[3px]"
    >
      <DialogInner
        isModify={isModify}
        setModify={setModify}
        title={title}
        titleId={titleId}
        close={close}
        describe={describe}
        describeId={describeId}
      >
        {children}
      </DialogInner>
    </dialog>,
    portalEl
  )
}
