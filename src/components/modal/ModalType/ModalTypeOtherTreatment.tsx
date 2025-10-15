import { OtherTreatment } from '../../../libs/supabase'
import ModalDetail from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalTypeProps } from './ModalType'

interface ModalTypeOtherTreatmentProps extends ModalTypeProps {
  restProps: OtherTreatment
}

export default function ModalTypeOtherTreatment({
  isModify,
  restProps: { date, detail, id, notes, title },
}: ModalTypeOtherTreatmentProps) {
  return (
    <ModalDetail
      key={id}
      title={title}
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

interface ModalTypeOtherTreatmentInput {
  onClose: () => void
  restProps: OtherTreatment
}

export function ModalTypeOtherTreatmentInput({
  onClose,
  restProps: { date, detail, notes, title },
}: ModalTypeOtherTreatmentInput) {
  return (
    <ModalDetailInput
      onClose={onClose}
      title={title}
      fields={[
        {
          key: 'detail',
          label: '처치 내용',
          type: 'text',
          // tableValue: detail,
          defaultValue: detail,
          inputProps: { placeholder: '처치 내용을 입력해주세요' },
        },
        {
          key: 'date',
          label: '처치 날짜',
          type: 'date',
          // tableValue: date,
          defaultValue: date,
          requiredSet: '처치 날짜를 입력해주세요.',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주요' }}
    />
  )
}
