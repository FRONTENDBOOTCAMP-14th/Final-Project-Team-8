import { MedicalTreatment } from '@/libs/supabase'
import ModalDetail from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalTypeProps } from './ModalType'

interface ModalTypeMedicalTreatmentProps extends ModalTypeProps {
  restProps: MedicalTreatment
}

export default function ModalTypeMedicalTreatment({
  isModify,
  restProps: { category, id, next_date, notes, visit_date, title },
}: ModalTypeMedicalTreatmentProps) {
  return (
    <ModalDetail
      key={id}
      title={title}
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

export interface ModalTypeMedicalTreatmentInputProps {
  onClose: () => void
  restProps: MedicalTreatment
}

export function ModalTypeMedicalTreatmentInput({
  onClose,
  restProps: { category, next_date, notes, visit_date, title },
}: ModalTypeMedicalTreatmentInputProps) {
  return (
    <ModalDetailInput
      onClose={onClose}
      title={title}
      fields={[
        {
          key: 'category',
          label: '항목',
          type: 'text',
          // tableValue: category,
          defaultValue: category ?? '',
          inputProps: { placeholder: '항목을 입력해주세요' },
          requiredSet: '항목을 입력해주세요.',
        },
        {
          key: 'visit_date',
          label: '방문 날짜',
          type: 'date',
          // tableValue: visit_date,
          defaultValue: visit_date,
          requiredSet: '방문 날짜를 입력해주세요.',
        },
        {
          key: 'next_date',
          label: '다음 진료',
          type: 'date',
          // tableValue: next_date,
          defaultValue: next_date,
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
