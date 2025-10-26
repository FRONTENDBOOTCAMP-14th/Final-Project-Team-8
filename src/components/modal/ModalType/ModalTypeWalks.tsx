import type { Dispatch, SetStateAction } from 'react'
import type { Walks } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import NotificationToggle from '../../calendar/NotificationToggle'
import { NOTIFICATION_TYPE_MAP } from '../../calendar/types'
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
  selectedPetId?: string
}

export default function ModalTypeWalks({
  isModify,
  setModify,
  onClose,
  restProps: { date, distance, id, start_time, total_time, title },
  selectedPetId,
}: ModalTypeWalksProps) {
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
          type={'walks'}
          title={title}
          fields={[
            {
              key: 'start_time',
              label: '시작 시간',
              type: 'time',
              tableValue: start_time,
              defaultValue: start_time,
              requiredSet: '시작 시간을 입력해주세요.',
            },
            {
              key: 'date',
              label: '산책 날짜',
              type: 'date',
              tableValue: date,
              defaultValue: date,
              requiredSet: '산책 날짜를 지정해주세요.',
            },
            {
              key: 'distance',
              label: '산책 거리 (km)',
              type: 'number',
              tableValue: distance,
              defaultValue: distance,
              requiredSet: null,
              min: 0,
            },
            {
              key: 'total_time',
              label: '산책 시간 (min)',
              type: 'number',
              tableValue: minTohour(total_time),
              defaultValue: total_time,
              requiredSet: null,
              inputProps: { step: 10 },
              min: 0,
            },
          ]}
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
        type="walks"
        title={title}
        isModify={isModify}
        fields={[
          {
            key: 'start_time',
            label: '시작 시간',
            type: 'time',
            tableValue: start_time,
            defaultValue: start_time,
          },
          {
            key: 'date',
            label: '산책 날짜',
            type: 'date',
            tableValue: date,
            defaultValue: date,
          },
          {
            key: 'distance',
            label: '산책 거리 (km)',
            type: 'number',
            tableValue: distance,
            defaultValue: distance,
          },
          {
            key: 'total_time',
            label: '산책 시간 (min)',
            type: 'number',
            tableValue: minTohour(total_time),
            defaultValue: total_time,
          },
        ]}
      />
    </div>
  )
}

interface ModalTypeWalksInputProps {
  type: AccordionProps['type']
  onClose: () => void
  onSaveSuccess?: () => void
  restProps: Walks
}

// Input(Insert)
export function ModalTypeWalksInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { date, distance, start_time, total_time, title },
}: ModalTypeWalksInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
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
          min: 0,
        },
        {
          key: 'total_time',
          label: '산책 시간  (min)',
          type: 'number',
          defaultValue: total_time,
          requiredSet: null,
          inputProps: { step: 10 },
          min: 0,
        },
      ]}
    />
  )
}
