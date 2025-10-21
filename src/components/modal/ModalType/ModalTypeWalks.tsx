import type { Dispatch, SetStateAction } from 'react'
import type { Walks } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import { minTohour } from '../timeHandler'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeWalksProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: Walks
}

export default function ModalTypeWalks({
  isModify,
  setModify,
  onClose,
  restProps: { date, distance, id, start_time, total_time, title },
}: ModalTypeWalksProps) {
  if (isModify) {
    return (
      <ModalDetailIsModify
        key={id}
        id={id}
        type={'walks'}
        title={title}
        fields={[
          {
            key: 'start_time',
            label: '다녀온 곳',
            type: 'time',
            tableValue: start_time,
            defaultValue: start_time,
          },
          {
            key: 'distance',
            label: '산책 거리',
            type: 'number',
            tableValue: distance,
            defaultValue: distance,
          },
          {
            key: 'total_time',
            label: '산책 시간',
            type: 'number',
            tableValue: minTohour(total_time),
            defaultValue: total_time,
          },
          {
            key: 'date',
            label: '산책 날짜',
            type: 'date',
            tableValue: date,
            defaultValue: date,
          },
        ]}
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
      type="walks"
      title={title}
      isModify={isModify}
      fields={[
        {
          key: 'start_time',
          label: '다녀온 곳',
          type: 'time',
          tableValue: start_time,
          defaultValue: start_time,
        },
        {
          key: 'distance',
          label: '산책 거리',
          type: 'number',
          tableValue: distance,
          defaultValue: distance,
        },
        {
          key: 'total_time',
          label: '산책 시간',
          type: 'number',
          tableValue: minTohour(total_time),
          defaultValue: total_time,
        },
        {
          key: 'date',
          label: '산책 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
      ]}
    />
  )
}

interface ModalTypeWalksInputProps {
  type: AccordionProps['type']
  onClose: () => void
  restProps: Walks
}

// Input(Insert)
export function ModalTypeWalksInput({
  type,
  onClose,
  restProps: { date, distance, start_time, total_time, title },
}: ModalTypeWalksInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      title={title}
      fields={[
        {
          key: 'start_time',
          label: '시작 시간',
          type: 'time',
          defaultValue: start_time,
          requiredSet: '시작 시간을 입력해주세요.',
        },
        {
          key: 'date',
          label: '산책 날짜',
          type: 'date',
          defaultValue: date,
          requiredSet: '산책 날짜를 입력해주세요.',
        },
        {
          key: 'distance',
          label: '산책 거리  (Km)',
          type: 'number',
          defaultValue: distance,
          requiredSet: null,
        },
        {
          key: 'total_time',
          label: '산책 시간  (min)',
          type: 'number',
          defaultValue: total_time,
          requiredSet: null,
        },
      ]}
    />
  )
}
