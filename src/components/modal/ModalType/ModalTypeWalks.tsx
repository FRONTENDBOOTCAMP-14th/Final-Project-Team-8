import { Walks } from '@/libs/supabase'
import ModalDetail from '../modal-detail/ModalDetail'
import { minTohour } from '../timeHandler'
import { ModalTypeProps } from './ModalType'

interface ModalTypeWalksProps extends ModalTypeProps {
  restProps: Walks
}

export default function ModalTypeWalks({
  isModify,
  restProps: { date, distance, id, start_time, total_time, title },
}: ModalTypeWalksProps) {
  return (
    <ModalDetail
      key={id}
      title={title}
      isModify={isModify}
      fields={[
        {
          key: 'start_time',
          label: '다녀온 곳',
          type: 'time',
          tableValue: start_time,
          defaultValue: start_time,
        },
        {
          key: 'distance',
          label: '산책 거리',
          type: 'number',
          tableValue: distance,
          defaultValue: distance,
        },
        {
          key: 'duration',
          label: '산책 시간',
          type: 'number',
          tableValue: minTohour(total_time),
          defaultValue: total_time,
        },
        {
          key: 'date',
          label: '산책 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
      ]}
    />
  )
}
