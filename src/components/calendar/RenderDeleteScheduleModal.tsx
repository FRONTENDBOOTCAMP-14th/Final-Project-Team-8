import { useQuery } from '@tanstack/react-query'
import { getPetTableData } from '@/libs/api/activity.api'
import type { AccordionProps } from '../accordion/accordion'
import DeleteConfirmModal from '../accordion/accordionListItem/EditButton/DeleteConfirmModal'
import ListLoading from '../accordion/ListLoading'
import { API_TYPE_MAP } from './types'
import type { ScheduleEvent } from './types'

interface RenderDeleteScheduleModalProps {
  selectedSchedule: ScheduleEvent | null
  selectedPetId: string | null
  onClose: () => void
}

/**
 * 일정 삭제 모달 컨텐츠 렌더링 함수
 */
export default function RenderDeleteScheduleModal({
  selectedSchedule,
  selectedPetId,
  onClose,
}: RenderDeleteScheduleModalProps) {
  if (!selectedSchedule || !selectedPetId) return null

  if (
    selectedSchedule.category === 'birthday' ||
    selectedSchedule.category === 'adoption'
  )
    return null
  const apiType = API_TYPE_MAP[selectedSchedule.category]

  return (
    <DeleteScheduleModalContent
      title={selectedSchedule.title}
      scheduleId={selectedSchedule.id}
      apiType={apiType}
      selectedPetId={selectedPetId}
      onClose={onClose}
    />
  )
}

interface DeleteScheduleModalContentProps {
  title: string
  scheduleId: string
  apiType: AccordionProps['type']
  selectedPetId: string
  onClose: () => void
}

function DeleteScheduleModalContent({
  title,
  scheduleId,
  apiType,
  selectedPetId,
  onClose,
}: DeleteScheduleModalContentProps) {
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

  return (
    <DeleteConfirmModal
      title={title}
      type={apiType}
      id={scheduleId}
      pet_id={selectedPetId}
      onCancel={onClose}
    />
  )
}
