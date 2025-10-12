'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  AllowedTableNames,
  getPetTableData,
  RowMap,
  TableRow,
} from '../../libs/api/accordion'
import QueryErrorBoundary from '../common/QueryErrorBoundary'
import Button from '../ui/button/Button'
import { selectTypeButtonTitle } from './accordionFun'
import {
  AntiparasiticCompo,
  DietCompo,
  MedicalTreatmentCompo,
  OtherActivitiesCompo,
  OtherTreatmentsCompo,
  VaccinesCompo,
  WalksCompo,
} from './accordionList'
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

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${
        isOpen ? 'mb-3 max-h-[400px] overflow-y-auto' : 'max-h-0'
      }`}
    >
      <div className="relative ml-5 before:absolute before:left-0 before:h-px before:w-[590px] before:rounded-2xl before:bg-gray-300"></div>

      <Button
        variant="white"
        className="!m-5 !w-[calc(100%-40px)] gap-1 !p-[13px] font-bold !text-orange-500"
      >
        <img src="/components/accordion/plus-button-icon.svg" alt="플러스" />
        <p>{selectTypeButtonTitle(type)}</p>
      </Button>

      {/* 아코디언이 열렸을 때만 쿼리 파트를 마운트 (v5: enabled 옵션 없음) */}
      {oneceOpened && (
        <QueryErrorBoundary>
          <Suspense fallback={<ListLoading />}>
            <AccordionContent type={type} />
          </Suspense>
        </QueryErrorBoundary>
      )}
    </div>
  )
}

/** 실제 데이터 로딩/렌더 파트 (useSuspenseQuery 사용) */
function AccordionContent<T extends AllowedTableNames>({ type }: { type: T }) {
  const emptyToastRef = useRef(false)

  // v5 규약: enabled/onError 옵션 없음 → ErrorBoundary/Suspense로 처리
  const { data: rows } = useSuspenseQuery<
    TableRow<T>[], // TQueryFnData
    Error, // TError
    TableRow<T>[], // TData (selector 미사용 시 동일)
    readonly ['petTable', T] // TQueryKey
  >({
    queryKey: ['petTable', type] as const,
    queryFn: () => getPetTableData(type),
    retry: 1,
  })

  // 빈 배열 알림 (중복 방지)
  useEffect(() => {
    if (rows.length === 0 && !emptyToastRef.current) {
      toast.info('해당 기록이 없습니다.')
      emptyToastRef.current = true
    }
    if (rows.length > 0) emptyToastRef.current = false
  }, [rows])

  // 각 리스트 컴포넌트가 기대하는 정확한 타입으로 캐스팅
  const list = useMemo(() => {
    switch (type) {
      case 'antiparasitic':
        return (
          <AntiparasiticCompo dataList={rows as RowMap['antiparasitic'][]} />
        )
      case 'diet':
        return <DietCompo dataList={rows as RowMap['diet'][]} />
      case 'medical treatment':
        return (
          <MedicalTreatmentCompo
            dataList={rows as RowMap['medical treatment'][]}
          />
        )
      case 'other activities':
        return (
          <OtherActivitiesCompo
            dataList={rows as RowMap['other activities'][]}
          />
        )
      case 'other treatments':
        return (
          <OtherTreatmentsCompo
            dataList={rows as RowMap['other treatments'][]}
          />
        )
      case 'vaccines':
        return <VaccinesCompo dataList={rows as RowMap['vaccines'][]} />
      case 'walks':
        return <WalksCompo dataList={rows as RowMap['walks'][]} />
      default:
        return null
    }
  }, [type, rows])

  return list
}
