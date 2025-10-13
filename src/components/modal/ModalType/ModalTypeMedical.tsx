import { MedicalTreatment } from '@/libs/supabase'
import ModalDetail from '../ModalDetail'

type Props = {
  isModify: boolean
  restProps: MedicalTreatment
}

export default function ModalTypeMedicalTreatment({
  isModify,
  restProps: { category, id, next_date, notes, visit_date },
}: Props) {
  return (
    <ModalDetail
      key={id}
      isModify={isModify}
      fields={[
        {
          key: 'category',
          label: '항목',
          type: 'text',
          tableValue: category,
          defaultValue: category ?? '',
          inputProps: { placeholder: '항목을 입력해주세요' },
        },
        {
          key: 'visit_date',
          label: '방문 날짜',
          type: 'date',
          tableValue: visit_date,
          defaultValue: visit_date,
        },
        {
          key: 'next_date',
          label: '다음 진료',
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
