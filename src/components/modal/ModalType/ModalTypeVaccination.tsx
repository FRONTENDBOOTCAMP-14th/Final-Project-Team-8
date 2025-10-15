import { Vaccines } from '@/libs/supabase'
import ModalDetail from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalTypeProps } from './ModalType'

interface ModalTypeVaccinationProps extends ModalTypeProps {
  restProps: Vaccines
}

export default function ModalTypeVaccination({
  isModify,
  restProps: { expiry_date, id, lot, notes, vaccinated_date, title },
}: ModalTypeVaccinationProps) {
  return (
    <ModalDetail
      key={id}
      title={title}
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

interface ModalTypeVaccinationInputProps {
  onClose: () => void
  restProps: Vaccines
}

export function ModalTypeVaccinationInput({
  onClose,
  restProps: { expiry_date, id, lot, notes, vaccinated_date, title },
}: ModalTypeVaccinationInputProps) {
  return (
    <ModalDetailInput
      onClose={onClose}
      key={id}
      title={title}
      fields={[
        {
          key: 'lot',
          label: 'Lot(제조번호)',
          type: 'text',
          tableValue: lot,
          defaultValue: lot,
          inputProps: { placeholder: 'Lot(제조 번호)를 입력해주세요' },
          requiredSet: 'Lot(제조번호)를 작성해주세요.',
        },
        {
          key: 'vaccinated_date',
          label: '접종 날짜',
          type: 'date',
          tableValue: vaccinated_date,
          defaultValue: vaccinated_date,
          requiredSet: '접종 날짜를 입력해주세요.',
        },
        {
          key: 'expiry_date',
          label: '유효 기간',
          type: 'date',
          tableValue: expiry_date,
          defaultValue: expiry_date,
          requiredSet: '백신의 유효 기간을 입력해주세요.',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
