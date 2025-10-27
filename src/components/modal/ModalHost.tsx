// ModalHost.tsx (새 파일로 분리 추천)
'use client'

import type { AccordionProps } from '../accordion/accordion'
import Modal from '../modal/Modal'
import { ModalTypeAntiparasiticInput } from './ModalType/ModalTypeAntiparasitic'
import { ModalTypeDietInput } from './ModalType/ModalTypeDiet'
import { ModalTypeMedicalTreatmentInput } from './ModalType/ModalTypeMedical'
import { ModalTypeOtherActivitesInput } from './ModalType/ModalTypeOtherActivites'
import { ModalTypeOtherTreatmentInput } from './ModalType/ModalTypeOtherTreatment'
import { ModalTypeVaccinationInput } from './ModalType/ModalTypeVaccination'
import { ModalTypeWalksInput } from './ModalType/ModalTypeWalks'

interface ModalHostProps {
  open: boolean
  selectedDate?: string | undefined
  onClose: () => void
  type: AccordionProps['type']
  onSaveSuccess?: () => void
  selectedPetId: string
}

export default function ModalHost({
  open,
  selectedDate,
  onClose,
  type,
  onSaveSuccess,
}: ModalHostProps) {
  const selectTypeInputModal = () => {
    switch (type) {
      case 'antiparasitic':
        return (
          <ModalTypeAntiparasiticInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              id: '',
              intake_date: selectedDate ?? '',
              next_date: null,
              notes: null,
              pet_id: '',
              title: '',
            }}
          />
        )
      case 'diet':
        return (
          <ModalTypeDietInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              date: '',
              id: '',
              notes: null,
              pet_id: '',
              snack_type: '',
              time: '',
              title: '',
            }}
          />
        )
      case 'medical treatment':
        return (
          <ModalTypeMedicalTreatmentInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              category: null,
              id: '',
              next_date: null,
              notes: null,
              pet_id: '',
              title: '',
              visit_date: selectedDate ?? '',
            }}
          />
        )
      case 'other activities':
        return (
          <ModalTypeOtherActivitesInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              date: selectedDate ?? '',
              duration_time: 0,
              id: '',
              notes: null,
              pet_id: '',
              start_time: '',
              title: '',
            }}
          />
        )
      case 'other treatments':
        return (
          <ModalTypeOtherTreatmentInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              date: selectedDate ?? '',
              detail: null,
              id: '',
              notes: null,
              pet_id: '',
              title: '',
            }}
          />
        )
      case 'vaccines':
        return (
          <ModalTypeVaccinationInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              expiry_date: '',
              id: '',
              lot: '',
              notes: null,
              pet_id: '',
              title: '',
              vaccinated_date: selectedDate ?? '',
            }}
          />
        )
      case 'walks':
        return (
          <ModalTypeWalksInput
            type={type}
            onClose={onClose}
            {...(onSaveSuccess && { onSaveSuccess })}
            restProps={{
              date: selectedDate ?? '',
              distance: null,
              id: '',
              pet_id: '',
              start_time: '',
              title: '',
              total_time: null,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => onClose}
      isModify
      setModify={() => {}}
      buttonNone
    >
      {selectTypeInputModal()}
    </Modal>
  )
}
