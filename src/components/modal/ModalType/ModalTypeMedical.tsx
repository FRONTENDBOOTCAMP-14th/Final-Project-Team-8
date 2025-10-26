import type { Dispatch, SetStateAction } from 'react'
import type { MedicalTreatment } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import NotificationToggle from '../../calendar/NotificationToggle'
import { NOTIFICATION_TYPE_MAP } from '../../calendar/types'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeMedicalTreatmentProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: MedicalTreatment
  selectedPetId?: string
}

export default function ModalTypeMedicalTreatment({
  isModify,
  setModify,
  onClose,
  restProps: { category, id, next_date, notes, visit_date, title },
  selectedPetId,
}: ModalTypeMedicalTreatmentProps) {
  if (isModify) {
    return (
      <div className="flex flex-col gap-2">
        {/* 알림 설정 */}
        {selectedPetId && (
          <NotificationToggle
            scheduleId={id}
            scheduleType={NOTIFICATION_TYPE_MAP['medical']}
            petId={selectedPetId}
            isShowToggle={true}
          />
        )}

        <ModalDetailIsModify
          key={id}
          id={id}
          type={'medical treatment'}
          title={title}
          fields={[
            {
              key: 'category',
              label: '항목',
              type: 'text',
              tableValue: category,
              defaultValue: category ?? '',
              inputProps: { placeholder: '항목을 입력해주세요' },
              requiredSet: '항목을 입력해주세요.',
            },
            {
              key: 'visit_date',
              label: '방문 날짜',
              type: 'date',
              tableValue: visit_date,
              defaultValue: visit_date,
              requiredSet: '방문 날짜를 입력해주세요.',
            },
            {
              key: 'next_date',
              label: '다음 진료',
              type: 'date',
              tableValue: next_date,
              defaultValue: next_date,
              requiredSet: null,
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
          scheduleType={NOTIFICATION_TYPE_MAP['medical']}
          petId={selectedPetId}
          isShowToggle={false}
        />
      )}

      <ModalDetailNonModify
        key={id}
        type="medical treatment"
        title={title}
        isModify={isModify}
        fields={[
          {
            key: 'category',
            label: '항목',
            type: 'text',
            tableValue: category,
            defaultValue: category ?? '',
            inputProps: { placeholder: '항목을 입력해주세요' },
          },
          {
            key: 'visit_date',
            label: '방문 날짜',
            type: 'date',
            tableValue: visit_date,
            defaultValue: visit_date,
          },
          {
            key: 'next_date',
            label: '다음 진료',
            type: 'date',
            tableValue: next_date,
            defaultValue: next_date,
          },
        ]}
        noteLabel="특이 사항"
        defaultNote={notes ?? '-'}
        noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
      />
    </div>
  )
}

export interface ModalTypeMedicalTreatmentInputProps {
  type: AccordionProps['type']
  onClose: () => void
  onSaveSuccess?: () => void
  restProps: MedicalTreatment
}

export function ModalTypeMedicalTreatmentInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { category, next_date, notes, visit_date, title },
}: ModalTypeMedicalTreatmentInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
      title={title}
      scheduleType="medical"
      fields={[
        {
          key: 'category',
          label: '항목',
          type: 'text',
          defaultValue: category ?? '',
          inputProps: { placeholder: '항목을 입력해주세요' },
          requiredSet: '항목을 입력해주세요.',
        },
        {
          key: 'visit_date',
          label: '방문 날짜',
          type: 'date',
          defaultValue: visit_date,
          requiredSet: '방문 날짜를 입력해주세요.',
        },
        {
          key: 'next_date',
          label: '다음 진료',
          type: 'date',
          defaultValue: next_date,
          requiredSet: null,
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
