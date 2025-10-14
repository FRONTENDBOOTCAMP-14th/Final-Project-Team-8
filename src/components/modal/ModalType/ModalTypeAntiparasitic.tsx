import { Antiparasitic } from '../../../libs/supabase'
import ModalDetail, { ModalDetailInput } from '../ModalDetail'

type Props = {
  isModify: boolean
  restProps: Antiparasitic
}

export default function ModalTypeAntiparasitic({
  isModify,
  restProps: { id, intake_date, next_date, notes },
}: Props) {
  return (
    <ModalDetail
      key={id}
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
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}

export function ModalTypeAntiparasiticInput({
  isModify,
  restProps: { id, intake_date, next_date, notes },
}: Props) {
  return (
    <ModalDetailInput
      key={id}
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
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
