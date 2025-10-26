import type { Dispatch, SetStateAction } from 'react'
import type { OtherActivities } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import NotificationToggle from '../../calendar/NotificationToggle'
import { NOTIFICATION_TYPE_MAP } from '../../calendar/types'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import { minTohour, removeSecond } from '../timeHandler'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeOtherActivitesProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: OtherActivities
  selectedPetId?: string
}

export default function ModalTypeOtherActivites({
  isModify,
  setModify,
  onClose,
  restProps: { date, id, notes, start_time, duration_time, title },
  selectedPetId,
}: ModalTypeOtherActivitesProps) {
  if (isModify) {
    return (
      <div className="flex flex-col gap-2">
        {/* 알림 설정 */}
        {selectedPetId && (
          <NotificationToggle
            scheduleId={id}
            scheduleType={NOTIFICATION_TYPE_MAP['vaccine']}
            petId={selectedPetId}
            isShowToggle={true}
          />
        )}

        <ModalDetailIsModify
          key={id}
          id={id}
          type={'other activities'}
          title={title}
          fields={[
            {
              key: 'date',
              label: '활동 날짜',
              type: 'date',
              tableValue: date,
              defaultValue: date,
              requiredSet: '활동 날짜를 입력해주세요.',
            },
            {
              key: 'start_time',
              label: '활동 시작 시간',
              type: 'time',
              tableValue: removeSecond(start_time),
              defaultValue: start_time,
              inputProps: { step: 60 },
              requiredSet: '활동 시작 시간을 입력해주세요.',
            },
            {
              key: 'duration_time',
              label: '활동 시간 (min)',
              type: 'number',
              tableValue: minTohour(duration_time),
              defaultValue: duration_time,
              inputProps: { step: 10 },
              requiredSet: '총 활동 시간을 입력해주세요.',
            },
          ]}
          noteLabel="특이 사항"
          defaultNote={notes ?? '-'}
          noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
          setModify={setModify}
          isModify={isModify}
          onClose={onClose}
        />
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      {/* 알림 설정 여부*/}
      {selectedPetId && (
        <NotificationToggle
          scheduleId={id}
          scheduleType={NOTIFICATION_TYPE_MAP['vaccine']}
          petId={selectedPetId}
          isShowToggle={false}
        />
      )}

      <ModalDetailNonModify
        key={id}
        type="other activities"
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
            label: '활동 시간 (min)',
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
    </div>
  )
}

interface ModalTypeOtherActivitesInputProps {
  type: AccordionProps['type']
  onClose: () => void
  onSaveSuccess?: () => void
  restProps: OtherActivities
}

export function ModalTypeOtherActivitesInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { date, notes, start_time, duration_time, title },
}: ModalTypeOtherActivitesInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
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
