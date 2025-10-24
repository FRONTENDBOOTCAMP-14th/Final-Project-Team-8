import type { Dispatch, SetStateAction } from 'react'
import type { Antiparasitic } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeAntiparasiticProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: Antiparasitic
}

export default function ModalTypeAntiparasitic({
  isModify,
  setModify,
  onClose,
  restProps: { id, intake_date, next_date, notes, title },
}: ModalTypeAntiparasiticProps) {
  if (isModify) {
    return (
      <ModalDetailIsModify
        key={id}
        id={id}
        type={'antiparasitic'}
        title={title}
        fields={[
          {
            key: 'intake_date',
            label: '복용 날짜',
            type: 'date',
            tableValue: intake_date,
            defaultValue: intake_date,
            requiredSet: '복용 날짜를 입력해주세요.',
          },
          {
            key: 'next_date',
            label: '다음 복용',
            type: 'date',
            tableValue: next_date,
            defaultValue: next_date,
            requiredSet: '다음 복용일을 입력해주세요.',
          },
        ]}
        noteLabel="특이 사항"
        defaultNote={notes ?? '-'}
        noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
        // 모달 버튼 기능 연결
        setModify={setModify}
        isModify={isModify}
        onClose={onClose}
      />
    )
  }

  return (
    <ModalDetailNonModify
      key={id}
      type="antiparasitic"
      title={title}
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

export interface ModalTypeAntiparasiticInputProps {
  type: AccordionProps['type']
  onClose: () => void
  onSaveSuccess?: () => void
  restProps: Antiparasitic
}

export function ModalTypeAntiparasiticInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { intake_date, next_date, notes, title },
}: ModalTypeAntiparasiticInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
      title={title}
      fields={[
        {
          key: 'intake_date',
          label: '복용 날짜',
          type: 'date',
          defaultValue: intake_date,
          // 필수 항목 지정
          requiredSet: '복용 날짜를 입력해주세요',
        },
        {
          key: 'next_date',
          label: '다음 복용',
          type: 'date',
          defaultValue: next_date,
          requiredSet: '다음 복용 날짜를 입력해주세요.',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
