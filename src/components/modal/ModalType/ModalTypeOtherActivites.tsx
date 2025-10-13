import { OtherActivities } from '@/libs/supabase'
import ModalDetail from '../ModalDetail'
import { minTohour, removeSecond } from '../timeHandler'

type Props = {
  isModify: boolean
  restProps: OtherActivities
}

export default function ModalTypeOtherActivites({
  isModify,
  restProps: { date, id, notes, start_time, duration_time },
}: Props) {
  return (
    <ModalDetail
      key={id}
      isModify={isModify}
      fields={[
        {
          key: 'date',
          label: '활동 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
        {
          key: 'start_time',
          label: '활동 시작 시간',
          type: 'time',
          tableValue: removeSecond(start_time),
          defaultValue: start_time,
          inputProps: { step: 60 },
        },
        {
          key: 'duration_time',
          label: '활동 시간',
          type: 'number',
          tableValue: minTohour(duration_time),
          defaultValue: duration_time,
          inputProps: { step: 10 },
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
