import type { Dispatch, SetStateAction } from 'react'
import type { Diet } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import { removeSecond } from '../timeHandler'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeDietProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: Diet
}

export function ModalTypeDiet({
  isModify,
  setModify,
  onClose,
  restProps: { date, id, time, snack_type, notes, title },
}: ModalTypeDietProps) {
  if (isModify) {
    return (
      <ModalDetailIsModify
        key={id}
        id={id}
        type={'diet'}
        title={title}
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
      type="diet"
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
  type: AccordionProps['type']
  restProps: Diet
  onClose: () => void
  onSaveSuccess?: () => void
}

export function ModalTypeDietInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { date, time, snack_type, notes, title },
}: ModalTypeDietInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
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
