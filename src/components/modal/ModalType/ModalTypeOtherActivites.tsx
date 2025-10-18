import type { OtherActivities } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import ModalDetail from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { minTohour, removeSecond } from '../timeHandler'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeOtherActivitesProps extends ModalTypeProps {
  restProps: OtherActivities
}

export default function ModalTypeOtherActivites({
  isModify,
  restProps: { date, id, notes, start_time, duration_time, title },
}: ModalTypeOtherActivitesProps) {
  return (
    <ModalDetail
      key={id}
      title={title}
      isModify={isModify}
      fields={[
        {
          key: 'date',
          label: '활동 날짜',
          type: 'date',
          tableValue: date,
          defaultValue: date,
        },
        {
          key: 'start_time',
          label: '활동 시작 시간',
          type: 'time',
          tableValue: removeSecond(start_time),
          defaultValue: start_time,
          inputProps: { step: 60 },
        },
        {
          key: 'duration_time',
          label: '활동 시간',
          type: 'number',
          tableValue: minTohour(duration_time),
          defaultValue: duration_time,
          inputProps: { step: 10 },
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}

interface ModalTypeOtherActivitesInputProps {
  type: AccordionProps['type']
  onClose: () => void
  restProps: OtherActivities
}

export function ModalTypeOtherActivitesInput({
  type,
  onClose,
  restProps: { date, notes, start_time, duration_time, title },
}: ModalTypeOtherActivitesInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      title={title}
      fields={[
        {
          key: 'date',
          label: '활동 날짜',
          type: 'date',
          defaultValue: date,
          requiredSet: '활동 날짜를 입력해주세요.',
        },
        {
          key: 'start_time',
          label: '활동 시작 시간',
          type: 'time',
          defaultValue: start_time,
          inputProps: { step: 60 },
          requiredSet: '활동 시작 시간을 입력해주세요.',
        },
        {
          key: 'duration_time',
          label: '활동 시간',
          type: 'number',
          defaultValue: duration_time,
          inputProps: { step: 10 },
          requiredSet: '총 활동 시간을 입력해주세요.',
          min: 0,
          max: 360,
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
