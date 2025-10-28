'use client'

import { UserRoundX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import useToggleState from '../../hooks/useToggleState'
import type { TableType } from '../../libs/api/activity.api'
import { usePetStore } from '../../store/petStore'
import { useUserStore } from '../../store/userStore'
import QueryErrorBoundary from '../common/QueryErrorBoundary'
import ModalHost from '../modal/ModalHost'
import Button from '../ui/button/Button'
import AccordionContent from './accordionContent'
import { selectTypeButtonTitle } from './accordionFun'
import EmptyState from './EmptyState'
import ListLoading from './ListLoading'

interface Props<T extends TableType> {
  type: T
  isOpen: boolean
}

export default function AccordionItemBox<T extends TableType>({
  type,
  isOpen,
}: Props<T>) {
  // 최초로 한 번이라도 열리면 콘텐츠를 마운트 해 유지
  const [oneceOpened, setOnceOpened] = useState(isOpen)
  useEffect(() => {
    if (isOpen) setOnceOpened(true)
  }, [isOpen])

  const pet_id = usePetStore(s => s.selectedPetId)
  const user = useUserStore(s => s.user)
  const router = useRouter()
  const [isOepn, { on, off }] = useToggleState(false)
  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${
        isOpen ? 'mb-3 max-h-[400px] overflow-y-auto' : 'max-h-0'
      }`}
    >
      <div className="relative ml-5 before:absolute before:left-0 before:h-px before:w-[calc(100%-20px)] before:rounded-2xl before:bg-gray-300"></div>

      {/* 새 리스트 추가 버튼 */}
      <Button
        variant="white"
        className="m-5 max-w-[calc(100%-40px)] gap-1 p-[13px] font-bold transition hover:shadow-md active:scale-[0.99]"
        onClick={on}
      >
        <img src="/components/accordion/plus-button-icon.svg" alt="" />
        {selectTypeButtonTitle(type)}
      </Button>

      {/* 아코디언이 열렸을 때만 쿼리 파트를 마운트 (v5: enabled 옵션 없음) */}
      {oneceOpened && (
        <QueryErrorBoundary>
          <Suspense fallback={<ListLoading />}>
            {/* List to Read */}
            {!user ? (
              <EmptyState
                title="사용자의 계정을 찾을 수 없습니다"
                message="로그인을 먼저 해주세요"
                actionLabel="로그인"
                icon="custom"
                customIcon={<UserRoundX />}
                onAction={() => {
                  router.push('/login')
                }}
              />
            ) : !pet_id ? (
              <EmptyState
                title="기록이 없습니다"
                message="첫 기록을 추가해 보세요"
                actionLabel="새 항목 추가"
              />
            ) : (
              <>
                <AccordionContent type={type} pet_id={pet_id} />
                <ModalHost
                  open={isOepn}
                  onClose={off}
                  type={type}
                  selectedPetId={pet_id}
                />
              </>
            )}
          </Suspense>
        </QueryErrorBoundary>
      )}
    </div>
  )
}
