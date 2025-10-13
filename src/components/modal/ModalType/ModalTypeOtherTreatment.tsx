import { OtherTreatment } from '../../../libs/supabase'
import ModalDetail from '../ModalDetail'

type Props = {
  isModify: boolean
  restProps: OtherTreatment
}

export default function ModalTypeOtherTreatment({
  isModify,
  restProps: { date, detail, id, notes },
}: Props) {
  return (
    <ModalDetail
      key={id}
      isModify={isModify}
      fields={[
        {
          key: 'detail',
          label: '처치 내용',
          type: 'text',
          tableValue: detail,
          defaultValue: detail,
          inputProps: { placeholder: '처치 내용을 입력해주세요' },
        },
        {
          key: 'date',
          label: '처치 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주요' }}
    />
  )
}
