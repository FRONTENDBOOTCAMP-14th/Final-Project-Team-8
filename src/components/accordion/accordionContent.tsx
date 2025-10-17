import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef } from 'react'
import { toast } from 'sonner'
import { getPetTableData } from '@/libs/api/accordion'
import type { AllowedTableNames, RowMap, TableRow } from '@/libs/api/accordion'
import {
  AntiparasiticCompo,
  DietCompo,
  MedicalTreatmentCompo,
  OtherActivitiesCompo,
  OtherTreatmentsCompo,
  VaccinesCompo,
  WalksCompo,
} from './accordionList'

/** 실제 데이터 로딩/렌더 파트 (useSuspenseQuery 사용) */
export default function AccordionContent<T extends AllowedTableNames>({
  type,
}: {
  type: T
}) {
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
