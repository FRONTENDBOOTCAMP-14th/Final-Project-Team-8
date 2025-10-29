import { useQuery } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'
import { getPetTableData } from '@/libs/api/activity.api'
import { usePetStore } from '../../store/petStore'
import type { AccordionProps } from '../accordion/accordion'
import ListLoading from '../accordion/ListLoading'
import ModalTypeAntiparasitic from '../modal/ModalType/ModalTypeAntiparasitic'
import ModalTypeBirthdayAdoption from '../modal/ModalType/ModalTypeBirthdayAdoption'
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
  const { petList } = usePetStore()

  if (!selectedSchedule || !selectedPetId) return null

  if (
    selectedSchedule.category === 'birthday' ||
    selectedSchedule.category === 'adoption'
  ) {
    const selectedPet = petList.find(p => p.id === selectedPetId)
    if (!selectedPet) return null

    return (
      <ModalTypeBirthdayAdoption
        scheduleId={selectedSchedule.id}
        category={selectedSchedule.category}
        petName={selectedPet.name}
        date={selectedSchedule.date}
        selectedPetId={selectedPetId}
        onClose={onClose}
      />
    )
  }

  const apiType = API_TYPE_MAP[
    selectedSchedule.category
  ] as AccordionProps['type']

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
    selectedPetId,
  }

  // itemData는 getPetTableData의 반환 타입으로 union 타입이므로
  // 각 케이스에서 해당 테이블 타입으로 타입 단언이 필요합니다
  switch (apiType) {
    case 'vaccines':
      return (
        <ModalTypeVaccination
          {...commonProps}
          // @ts-expect-error - itemData는 런타임에 vaccines 타입이 보장됨
          restProps={itemData}
          selectedPetId={selectedPetId}
        />
      )

    case 'antiparasitic':
      return (
        // @ts-expect-error - itemData는 런타임에 antiparasitic 타입이 보장됨
        <ModalTypeAntiparasitic {...commonProps} restProps={itemData} />
      )

    case 'medical treatment':
      return (
        <ModalTypeMedicalTreatment
          {...commonProps}
          // @ts-expect-error - itemData는 런타임에 medical treatment 타입이 보장됨
          restProps={itemData}
        />
      )

    case 'other treatments':
      return (
        // @ts-expect-error - itemData는 런타임에 other treatments 타입이 보장됨
        <ModalTypeOtherTreatment {...commonProps} restProps={itemData} />
      )

    case 'walks':
      // @ts-expect-error - itemData는 런타임에 walks 타입이 보장됨
      return <ModalTypeWalks {...commonProps} restProps={itemData} />

    case 'other activities':
      return (
        // @ts-expect-error - itemData는 런타임에 other activities 타입이 보장됨
        <ModalTypeOtherActivites {...commonProps} restProps={itemData} />
      )

    default:
      return null
  }
}
