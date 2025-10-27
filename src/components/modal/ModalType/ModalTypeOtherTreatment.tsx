import type { Dispatch, SetStateAction } from 'react'
import type { OtherTreatment } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import NotificationToggle from '../../calendar/NotificationToggle'
import { NOTIFICATION_TYPE_MAP } from '../../calendar/types'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeOtherTreatmentProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: OtherTreatment
  selectedPetId?: string
}

export default function ModalTypeOtherTreatment({
  isModify,
  setModify,
  onClose,
  restProps: { date, detail, id, notes, title },
  selectedPetId,
}: ModalTypeOtherTreatmentProps) {
  if (isModify) {
    return (
      <div className="flex flex-col gap-2">
        {/* 알림 설정 */}
        {selectedPetId && (
          <NotificationToggle
            scheduleId={id}
            scheduleType={NOTIFICATION_TYPE_MAP['other treatments']}
            petId={selectedPetId}
            isShowToggle={true}
          />
        )}

        <ModalDetailIsModify
          key={id}
          id={id}
          type={'other treatments'}
          title={title}
          fields={[
            {
              key: 'date',
              label: '처치 날짜',
              type: 'date',
              tableValue: date,
              defaultValue: date,
              requiredSet: '처치 날짜를 입력해주세요.',
            },
            {
              key: 'detail',
              label: '처치 내용',
              type: 'text',
              tableValue: detail,
              defaultValue: detail,
              inputProps: { placeholder: '처치 내용을 입력해주세요' },
              requiredSet: 'null',
            },
          ]}
          noteLabel="특이 사항"
          defaultNote={notes ?? '-'}
          noteTextareaProps={{ placeholder: '특이사항을 입력해주요' }}
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
          scheduleType={NOTIFICATION_TYPE_MAP['other treatments']}
          petId={selectedPetId}
          isShowToggle={false}
        />
      )}

      <ModalDetailNonModify
        key={id}
        type="other treatments"
        title={title}
        isModify={isModify}
        fields={[
          {
            key: 'date',
            label: '처치 날짜',
            type: 'date',
            tableValue: date,
            defaultValue: date,
          },
          {
            key: 'detail',
            label: '처치 내용',
            type: 'text',
            tableValue: detail,
            defaultValue: detail,
            inputProps: { placeholder: '처치 내용을 입력해주세요' },
          },
        ]}
        noteLabel="특이 사항"
        defaultNote={notes ?? '-'}
        noteTextareaProps={{ placeholder: '특이사항을 입력해주요' }}
      />
    </div>
  )
}

interface ModalTypeOtherTreatmentInputProps {
  type: AccordionProps['type']
  onClose: () => void
  onSaveSuccess?: () => void
  restProps: OtherTreatment
}

export function ModalTypeOtherTreatmentInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { date, detail, notes, title },
}: ModalTypeOtherTreatmentInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
      title={title}
      scheduleType="other treatment"
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
