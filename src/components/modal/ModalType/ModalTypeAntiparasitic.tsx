import { Antiparasitic } from '@/libs/supabase'
import ModalDetail from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalTypeProps } from './ModalType'

interface ModalTypeAntiparasiticProps extends ModalTypeProps {
  restProps: Antiparasitic
}

export default function ModalTypeAntiparasitic({
  isModify,
  restProps: { id, intake_date, next_date, notes, title },
}: ModalTypeAntiparasiticProps) {
  return (
    <ModalDetail
      key={id}
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

interface ModalTypeAntiparasiticInputProps {
  restProps: {
    title: string
    intake_date: string
    next_date: string
    notes: string
  }
}

export function ModalTypeAntiparasiticInput({
  restProps: { intake_date, next_date, notes, title },
}: ModalTypeAntiparasiticInputProps) {
  return (
    <ModalDetailInput
      title={title}
      isModify={false}
      fields={[
        {
          key: 'intake_date',
          label: '복용 날짜',
          type: 'date',
          // tableValue: intake_date,
          defaultValue: intake_date,
        },
        {
          key: 'next_date',
          label: '다음 복용',
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
