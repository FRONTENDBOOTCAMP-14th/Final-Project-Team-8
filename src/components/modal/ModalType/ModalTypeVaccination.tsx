import { Vaccines } from '@/libs/supabase'
import ModalDetail from '../ModalDetail'

type Props = {
  isModify: boolean
  restProps: Vaccines
}

export default function ModalTypeVaccination({
  isModify,
  restProps: { expiry_date, id, lot, notes, vaccinated_date },
}: Props) {
  return (
    <ModalDetail
      key={id}
      isModify={isModify}
      fields={[
        {
          key: 'lot',
          label: 'Lot(제조번호)',
          type: 'text',
          tableValue: lot,
          defaultValue: lot,
          inputProps: { placeholder: 'Lot(제조 번호)를 입력해주세요' },
        },
        {
          key: 'vaccinated_date',
          label: '접종 날짜',
          type: 'date',
          tableValue: vaccinated_date,
          defaultValue: vaccinated_date,
        },
        {
          key: 'expiry_date',
          label: '유효 기간',
          type: 'date',
          tableValue: expiry_date,
          defaultValue: expiry_date,
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
