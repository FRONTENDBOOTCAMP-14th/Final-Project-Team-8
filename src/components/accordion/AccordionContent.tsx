import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef } from 'react'
import type { TableRow, TableType } from '@/libs/api/activity.api'
import { getPetTableData } from '@/libs/api/activity.api'
import {
  AntiparasiticCompo,
  DietCompo,
  MedicalTreatmentCompo,
  OtherActivitiesCompo,
  OtherTreatmentsCompo,
  VaccinesCompo,
  WalksCompo,
} from './AccordionList'
import EmptyState from './EmptyState'

/** 실제 데이터 로딩/렌더 파트 (useSuspenseQuery 사용) */
export default function AccordionContent<T extends TableType>({
  type,
  pet_id,
}: {
  type: T
  pet_id: string
}) {
  const emptyToastRef = useRef(false)

  // v5 규약: enabled/onError 옵션 없음 → ErrorBoundary/Suspense로 처리
  const { data: rows } = useSuspenseQuery<
    TableRow<T>[], // TQueryFnData
    Error, // TError
    TableRow<T>[] // TData (selector 미사용 시 동일)
  >({
    queryKey: ['petTable', type, pet_id],
    queryFn: () => getPetTableData(type, pet_id),
    retry: 2,
  })

  // 빈 배열 알림 (중복 방지)
  useEffect(() => {
    if (rows.length === 0 && !emptyToastRef.current) {
      emptyToastRef.current = true
    }
    if (rows.length > 0) emptyToastRef.current = false
  }, [rows])

  // 각 리스트 컴포넌트가 기대하는 정확한 타입으로 캐스팅
  const list = useMemo(() => {
    switch (type) {
      case 'antiparasitic':
        return rows.length !== 0 ? (
          <AntiparasiticCompo dataList={rows as TableRow<'antiparasitic'>[]} />
        ) : (
          <EmptyState
            title="기록이 없습니다"
            message="첫 기록을 추가해 보세요"
          />
        )
      case 'diet':
        return rows.length !== 0 ? (
          <DietCompo dataList={rows as TableRow<'diet'>[]} />
        ) : (
          <EmptyState
            title="기록이 없습니다"
            message="첫 기록을 추가해 보세요"
          />
        )
      case 'medical treatment':
        return rows.length !== 0 ? (
          <MedicalTreatmentCompo
            dataList={rows as TableRow<'medical treatment'>[]}
          />
        ) : (
          <EmptyState
            title="기록이 없습니다"
            message="첫 기록을 추가해 보세요"
          />
        )
      case 'other activities':
        return rows.length !== 0 ? (
          <OtherActivitiesCompo
            dataList={rows as TableRow<'other activities'>[]}
          />
        ) : (
          <EmptyState
            title="기록이 없습니다"
            message="첫 기록을 추가해 보세요"
          />
        )
      case 'other treatments':
        return rows.length !== 0 ? (
          <OtherTreatmentsCompo
            dataList={rows as TableRow<'other treatments'>[]}
          />
        ) : (
          <EmptyState
            title="기록이 없습니다."
            message="첫 기록을 추가해 보세요"
          />
        )
      case 'vaccines':
        return rows.length !== 0 ? (
          <VaccinesCompo dataList={rows as TableRow<'vaccines'>[]} />
        ) : (
          <EmptyState
            title="기록이 없습니다"
            message="첫 기록을 추가해 보세요"
          />
        )
      case 'walks':
        return rows.length !== 0 ? (
          <WalksCompo dataList={rows as TableRow<'walks'>[]} />
        ) : (
          <EmptyState
            title="기록이 없습니다"
            message="첫 기록을 추가해 보세요"
          />
        )
      default:
        return null
    }
  }, [type, rows])

  return list
}
