'use client'

import { AllowedTableNames } from '@/libs/api/accordion'
import { useModal } from '@/store/modalStore'
import { Suspense, useEffect, useState } from 'react'
import QueryErrorBoundary from '../common/QueryErrorBoundary'
import ModalHost from '../modal/ModalHost'
import Button from '../ui/button/Button'
import AccordionContent from './accordionContent'
import { selectTypeButtonTitle, toModalKind } from './accordionFun'
import ListLoading from './ListLoading'
type Props<T extends AllowedTableNames> = { type: T; isOpen: boolean }

export default function AccordionItemBox<T extends AllowedTableNames>({
  type,
  isOpen,
}: Props<T>) {
  // 최초로 한 번이라도 열리면 콘텐츠를 마운트 해 유지
  const [oneceOpened, setOnceOpened] = useState(isOpen)
  useEffect(() => {
    if (isOpen) setOnceOpened(true)
  }, [isOpen])

  const openModal = useModal(s => s.openModal)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${
        isOpen ? 'mb-3 max-h-[400px] overflow-y-auto' : 'max-h-0'
      }`}
    >
      <div className="relative ml-5 before:absolute before:left-0 before:h-px before:w-[590px] before:rounded-2xl before:bg-gray-300"></div>

      {/* 새 리스트 추가 버튼 */}
      <Button
        variant="white"
        className="m-5 max-w-[calc(100%-40px)] gap-1 p-[13px] font-bold"
        onClick={() => {
          openModal({ kind: toModalKind(type) })
          setModalOpen(true)
          console.log('새 리스트 버튼 누름!')
        }}
      >
        <img src="/components/accordion/plus-button-icon.svg" alt="플러스" />
        <p>{selectTypeButtonTitle(type)}</p>
      </Button>

      {/* 아코디언이 열렸을 때만 쿼리 파트를 마운트 (v5: enabled 옵션 없음) */}
      {oneceOpened && (
        <QueryErrorBoundary>
          <Suspense fallback={<ListLoading />}>
            {/* List to Read */}
            <AccordionContent type={type} />
            {/* <NewListitemAdd type={type} /> */}
            <ModalHost open={isModalOpen}></ModalHost>
          </Suspense>
        </QueryErrorBoundary>
      )}
    </div>
  )
}
