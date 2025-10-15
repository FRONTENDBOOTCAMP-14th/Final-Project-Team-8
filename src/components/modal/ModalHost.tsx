// ModalHost.tsx (새 파일로 분리 추천)
'use client'

import { AccordionProps } from '../accordion/accordion'
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
}

export default function ModalHost({ open, onClose, type }: ModalHostProps) {
  const selectTypeInputModal = () => {
    switch (type) {
      case 'antiparasitic':
        return (
          <ModalTypeAntiparasiticInput
            onClose={onClose}
            restProps={{
              id: '',
              intake_date: '',
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
            onClose={onClose}
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
            onClose={onClose}
            restProps={{
              category: null,
              id: '',
              next_date: null,
              notes: null,
              pet_id: '',
              title: '',
              visit_date: '',
            }}
          />
        )
      case 'other activities':
        return (
          <ModalTypeOtherActivitesInput
            onClose={onClose}
            restProps={{
              date: '',
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
            onClose={onClose}
            restProps={{
              date: '',
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
            onClose={onClose}
            restProps={{
              expiry_date: '',
              id: '',
              lot: '',
              notes: null,
              pet_id: '',
              title: '',
              vaccinated_date: '',
            }}
          />
        )
      case 'walks':
        return (
          <ModalTypeWalksInput
            onClose={onClose}
            restProps={{
              date: '',
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
