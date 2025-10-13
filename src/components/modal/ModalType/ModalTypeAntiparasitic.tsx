import { Antiparasitic } from '../../../libs/supabase'
import { toISODate } from '../../../utils/client/toISODate'
import ModalDetail from '../ModalDetail'

type Props = {
  isModify: boolean
  restProps: Antiparasitic
}

export default function ModalTypeAntiparasitic({
  isModify,
  restProps: { id, intake_date, next_date, notes, pet_id, title },
}: Props) {
  const returnToNull = data => {}
  if (data === null) return '-'
  return toISODate(data)
  return (
    <ModalDetail
      isModify={isModify}
      fields={[
        {
          key: 'intake_date',
          label: '복용 날짜',
          type: 'date',
          tableValue: intake_date,
          defaultValue: intake_date,
        },
        {
          key: 'next_date',
          label: '다음 복용',
          type: 'date',
          tableValue: next_date,
          defaultValue: next_date,
        },
      ]}
    />
  )
}
