'use client'

import { PropsWithChildren, useState } from 'react'
import useToggleState from '../../hooks/useToggleState'
import Modal from './Modal'

type Props = PropsWithChildren<{
  title: string
}>

export default function ModalBox({ title, children }: Props) {
  const [isOpen, toggleHandler] = useToggleState(false)
  const [isModify, setModify] = useState<boolean>(false)

  const { on, off } = toggleHandler

  return (
    <div>
      <button
        type="button"
        onClick={on}
        className="m-3 cursor-pointer rounded-md bg-indigo-200 p-3 text-xl font-bold text-indigo-600 transition hover:bg-indigo-300 active:scale-[0.95]"
      >
        모달 {isOpen ? '닫기' : '열기'}
      </button>
      <Modal open={isOpen} onClose={off} title={title}>
        <div>{children}</div>
      </Modal>
    </div>
  )
}
