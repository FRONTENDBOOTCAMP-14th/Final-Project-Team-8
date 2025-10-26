import type { Dispatch, SetStateAction } from 'react'
import type { Vaccines } from '@/libs/supabase'
import type { AccordionProps } from '../../accordion/accordion'
import NotificationToggle from '../../calendar/NotificationToggle'
import { NOTIFICATION_TYPE_MAP } from '../../calendar/types'
import { ModalDetailNonModify } from '../modal-detail/ModalDetail'
import { ModalDetailInput } from '../modal-detail/ModalDetailinput'
import { ModalDetailIsModify } from '../modal-detail/ModalDetailIsModify'
import type { ModalTypeProps } from './ModalType'

interface ModalTypeVaccinationProps extends ModalTypeProps {
  isModify: boolean
  setModify: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  restProps: Vaccines
  selectedPetId?: string
}

export default function ModalTypeVaccination({
  isModify,
  setModify,
  onClose,
  restProps: { expiry_date, id, lot, notes, vaccinated_date, title },
  selectedPetId,
}: ModalTypeVaccinationProps) {
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
          type={'vaccines'}
          title={title}
          fields={[
            {
              key: 'lot',
              label: 'Lot(제조번호)',
              type: 'text',
              tableValue: lot,
              defaultValue: lot,
              inputProps: { placeholder: 'Lot(제조 번호)를 입력해주세요' },
              requiredSet: 'Lot(제조번호)를 작성해주세요.',
            },
            {
              key: 'vaccinated_date',
              label: '접종 날짜',
              type: 'date',
              tableValue: vaccinated_date,
              defaultValue: vaccinated_date,
              requiredSet: '접종 날짜를 입력해주세요.',
            },
            {
              key: 'expiry_date',
              label: '유효 기간',
              type: 'date',
              tableValue: expiry_date,
              defaultValue: expiry_date,
              requiredSet: '백신의 유효 기간을 입력해주세요.',
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
        type="vaccines"
        title={title}
        isModify={isModify}
        fields={[
          {
            key: 'lot',
            label: 'Lot(제조번호)',
            type: 'text',
            tableValue: lot,
            defaultValue: lot,
            inputProps: { placeholder: 'Lot(제조 번호)를 입력해주세요' },
          },
          {
            key: 'vaccinated_date',
            label: '접종 날짜',
            type: 'date',
            tableValue: vaccinated_date,
            defaultValue: vaccinated_date,
          },
          {
            key: 'expiry_date',
            label: '유효 기간',
            type: 'date',
            tableValue: expiry_date,
            defaultValue: expiry_date,
          },
        ]}
        noteLabel="특이 사항"
        defaultNote={notes ?? '-'}
        noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
      />
    </div>
  )
}

interface ModalTypeVaccinationInputProps {
  type: AccordionProps['type']
  onClose: () => void
  onSaveSuccess?: () => void
  restProps: Vaccines
}

export function ModalTypeVaccinationInput({
  type,
  onClose,
  onSaveSuccess,
  restProps: { expiry_date, id, lot, notes, vaccinated_date, title },
}: ModalTypeVaccinationInputProps) {
  return (
    <ModalDetailInput
      type={type}
      onClose={onClose}
      {...(onSaveSuccess && { onSaveSuccess })}
      key={id}
      title={title}
      fields={[
        {
          key: 'lot',
          label: 'Lot(제조번호)',
          type: 'text',
          defaultValue: lot,
          inputProps: { placeholder: 'Lot(제조 번호)를 입력해주세요' },
          requiredSet: 'Lot(제조번호)를 작성해주세요.',
        },
        {
          key: 'vaccinated_date',
          label: '접종 날짜',
          type: 'date',
          defaultValue: vaccinated_date,
          requiredSet: '접종 날짜를 입력해주세요.',
        },
        {
          key: 'expiry_date',
          label: '유효 기간',
          type: 'date',
          defaultValue: expiry_date,
          requiredSet: '백신의 유효 기간을 입력해주세요.',
        },
      ]}
      noteLabel="특이 사항"
      defaultNote={notes ?? '-'}
      noteTextareaProps={{ placeholder: '특이사항을 입력해주세요' }}
    />
  )
}
