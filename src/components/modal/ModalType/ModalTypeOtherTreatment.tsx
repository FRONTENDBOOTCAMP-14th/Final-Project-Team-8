import type { Dispatch, SetStateAction } from 'react'
import type { OtherTreatment } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import {
  ModalDetailIsModify,
  ModalDetailNonModify,
} from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeOtherTreatmentProps extends ModalTypeProps {
  setModify: Dispatch<SetStateAction<boolean>>
  restProps: OtherTreatment
}

export default function ModalTypeOtherTreatment({
  isModify,
  setModify,
  restProps: { date, detail, id, notes, title },
}: ModalTypeOtherTreatmentProps) {
  if (isModify) {
    return (
      <ModalDetailIsModify
        key={id}
        title={title}
        isModify={isModify}
        setModify={setModify}
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
  return (
    <ModalDetailNonModify
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

interface ModalTypeOtherTreatmentInputProps {
  type: AccordionProps['type']
  onClose: () => void
  restProps: OtherTreatment
}

export function ModalTypeOtherTreatmentInput({
  type,
  onClose,
  restProps: { date, detail, notes, title },
}: ModalTypeOtherTreatmentInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      title={title}
      fields={[
        {
          key: 'date',
          label: '처치 날짜',
          type: 'date',
          defaultValue: date,
          requiredSet: '처치 날짜를 입력해주세요.',
        },
        {
          key: 'detail',
          label: '처치 내용',
          type: 'text',
          defaultValue: detail,
          inputProps: { placeholder: '처치 내용을 입력해주세요' },
          requiredSet: null,
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주요' }}
    />
  )
}
