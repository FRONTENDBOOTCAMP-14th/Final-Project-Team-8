import { Diet } from '@/libs/supabase'
import ModalDetail from '../ModalDetail'
import { removeSecond } from '../timeHandler'

type Props = {
  isModify: boolean
  restProps: Diet
}

export function ModalTypeDiet({
  isModify,
  restProps: { date, id, time, snack_type, notes },
}: Props) {
  console.log(removeSecond(time))

  return (
    <ModalDetail
      key={id}
      isModify={isModify}
      fields={[
        {
          key: 'snack_type',
          label: '간식 종류',
          type: 'text',
          tableValue: snack_type,
          defaultValue: snack_type,
          inputProps: { placeholder: '간식 이름을 작성해주세요' },
        },
        {
          key: 'date',
          label: '배급 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
        {
          key: 'time',
          label: '배급 시간',
          type: 'time',
          tableValue: removeSecond(time),
          defaultValue: time,
          inputProps: { step: 60 },
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이 사항을 입력해주세요' }}
    />
  )
}
