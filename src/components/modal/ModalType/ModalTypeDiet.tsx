import { Diet } from '@/libs/supabase'
import ModalDetail from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { removeSecond } from '../timeHandler'
import { ModalTypeProps } from './ModalType'

interface ModalTypeDietProps extends ModalTypeProps {
  restProps: Diet
}

export function ModalTypeDiet({
  isModify,
  restProps: { date, id, time, snack_type, notes, title },
}: ModalTypeDietProps) {
  console.log(removeSecond(time))

  return (
    <ModalDetail
      key={id}
      title={title}
      isModify={isModify}
      fields={[
        {
          key: 'snack_type',
          label: '간식 종류',
          type: 'text',
          tableValue: snack_type,
          defaultValue: snack_type,
          inputProps: { placeholder: '간식 이름을 작성해주세요' },
        },
        {
          key: 'date',
          label: '배급 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
        {
          key: 'time',
          label: '배급 시간',
          type: 'time',
          tableValue: removeSecond(time),
          defaultValue: time,
          inputProps: { step: 60 },
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이 사항을 입력해주세요' }}
    />
  )
}

export interface ModalTypeDietInputProps {
  restProps: Diet
  onClose: () => void
}

export function ModalTypeDietInput({
  onClose,
  restProps: { date, time, snack_type, notes, title },
}: ModalTypeDietInputProps) {
  return (
    <ModalDetailInput
      onClose={onClose}
      title={title}
      fields={[
        {
          key: 'snack_type',
          label: '간식 종류',
          type: 'text',
          defaultValue: snack_type,
          inputProps: { placeholder: '간식 이름을 작성해주세요' },
          requiredSet: '간식 이름이 작성되지 않았습니다.',
        },
        {
          key: 'date',
          label: '배급 날짜',
          type: 'date',
          defaultValue: date,
          requiredSet: '배급 날짜를 지정해주세요.',
        },
        {
          key: 'time',
          label: '배급 시간',
          type: 'time',
          defaultValue: time,
          inputProps: { step: 60 },
          requiredSet: '배급 시간을 지정해주세요',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이 사항을 입력해주세요' }}
    />
  )
}
