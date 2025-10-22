import { useQuery } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'
import { getPetTableData } from '@/libs/api/activity.api'
import type { AccordionProps } from '../accordion/accordion'
import ListLoading from '../accordion/ListLoading'
import ModalTypeAntiparasitic from '../modal/ModalType/ModalTypeAntiparasitic'
import ModalTypeMedicalTreatment from '../modal/ModalType/ModalTypeMedical'
import ModalTypeOtherActivites from '../modal/ModalType/ModalTypeOtherActivites'
import ModalTypeOtherTreatment from '../modal/ModalType/ModalTypeOtherTreatment'
import ModalTypeVaccination from '../modal/ModalType/ModalTypeVaccination'
import ModalTypeWalks from '../modal/ModalType/ModalTypeWalks'
import { API_TYPE_MAP } from './types'
import type { ScheduleEvent } from './types'

interface RenderEditScheduleModalProps {
  selectedSchedule: ScheduleEvent | null
  selectedPetId: string | null
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
}

/**
 * 일정 수정 모달 컨텐츠 렌더링 함수
 * - 실제 Supabase 데이터를 조회해서 정확한 타입으로 모달에 전달
 */
export default function RenderEditScheduleModal({
  selectedSchedule,
  selectedPetId,
  isModify,
  setModify,
  onClose,
}: RenderEditScheduleModalProps) {
  if (!selectedSchedule || !selectedPetId) return null

  if (
    selectedSchedule.category === 'birthday' ||
    selectedSchedule.category === 'adoption'
  )
    return null
  const apiType = API_TYPE_MAP[selectedSchedule.category]

  return (
    <EditScheduleModalContent
      scheduleId={selectedSchedule.id}
      apiType={apiType}
      selectedPetId={selectedPetId}
      isModify={isModify}
      setModify={setModify}
      onClose={onClose}
    />
  )
}

interface EditScheduleModalContentProps {
  scheduleId: string
  apiType: AccordionProps['type']
  selectedPetId: string
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
}

function EditScheduleModalContent({
  scheduleId,
  apiType,
  selectedPetId,
  isModify,
  setModify,
  onClose,
}: EditScheduleModalContentProps) {
  const { data: tableData, isLoading } = useQuery({
    queryKey: ['petTable', apiType, selectedPetId],
    queryFn: () => getPetTableData(apiType, selectedPetId),
  })

  // 로딩 중
  if (isLoading) {
    return <ListLoading />
  }

  const itemData = tableData?.find(item => item.id === scheduleId)

  if (!itemData) {
    return (
      <p className="p-8 text-center text-[#FC5A5A]">
        일정 데이터를 찾을 수 없습니다
      </p>
    )
  }

  const commonProps = {
    isModify,
    setModify,
    onClose,
  }

  switch (apiType) {
    case 'vaccines':
      return (
        <ModalTypeVaccination {...commonProps} restProps={itemData as any} />
      )

    case 'antiparasitic':
      return (
        <ModalTypeAntiparasitic {...commonProps} restProps={itemData as any} />
      )

    case 'medical treatment':
      return (
        <ModalTypeMedicalTreatment
          {...commonProps}
          restProps={itemData as any}
        />
      )

    case 'other treatments':
      return (
        <ModalTypeOtherTreatment {...commonProps} restProps={itemData as any} />
      )

    case 'walks':
      return <ModalTypeWalks {...commonProps} restProps={itemData as any} />

    case 'other activities':
      return (
        <ModalTypeOtherActivites {...commonProps} restProps={itemData as any} />
      )

    default:
      return null
  }
}
