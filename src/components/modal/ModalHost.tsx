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
  onClose: () => void
  type: AccordionProps['type']
  petId?: string
}

export default function ModalHost({
  open,
  onClose,
  type,
  petId = '',
}: ModalHostProps) {
  const selectTypeInputModal = () => {
    switch (type) {
      case 'antiparasitic':
        return (
          <ModalTypeAntiparasiticInput
            type={type}
            onClose={onClose}
            restProps={{
              id: '',
              intake_date: '',
              next_date: null,
              notes: null,
              pet_id: petId,
              title: '',
            }}
          />
        )
      case 'diet':
        return (
          <ModalTypeDietInput
            type={type}
            onClose={onClose}
            restProps={{
              date: '',
              id: '',
              notes: null,
              pet_id: petId,
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
            restProps={{
              category: null,
              id: '',
              next_date: null,
              notes: null,
              pet_id: petId,
              title: '',
              visit_date: '',
            }}
          />
        )
      case 'other activities':
        return (
          <ModalTypeOtherActivitesInput
            type={type}
            onClose={onClose}
            restProps={{
              date: '',
              duration_time: 0,
              id: '',
              notes: null,
              pet_id: petId,
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
            restProps={{
              date: '',
              detail: null,
              id: '',
              notes: null,
              pet_id: petId,
              title: '',
            }}
          />
        )
      case 'vaccines':
        return (
          <ModalTypeVaccinationInput
            type={type}
            onClose={onClose}
            restProps={{
              expiry_date: '',
              id: '',
              lot: '',
              notes: null,
              pet_id: petId,
              title: '',
              vaccinated_date: '',
            }}
          />
        )
      case 'walks':
        return (
          <ModalTypeWalksInput
            type={type}
            onClose={onClose}
            restProps={{
              date: '',
              distance: null,
              id: '',
              pet_id: petId,
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
