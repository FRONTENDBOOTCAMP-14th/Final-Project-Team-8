// ModalHost.tsx (새 파일로 분리 추천)
'use client'

import { useModal } from '@/store/modalStore'
import { useState } from 'react'
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
}

export default function ModalHost({ open }: ModalHostProps) {
  const [isAntiparasitic, setAntiparasitic] = useState<boolean>(false)
  const [isWalks, setWalks] = useState<boolean>(false)
  const [isMedical, setMedical] = useState<boolean>(false)
  const [isOtherTreatment, setOtherTreatMent] = useState<boolean>(false)
  const closeModal = useModal(s => s.closeModal)
  const active = useModal(s => s.active)
  if (!active) return null
  return (
    <Modal
      open={open}
      onClose={closeModal}
      isModify
      setModify={() => {}}
      buttonNone
    >
      <RenderModalByKind />
    </Modal>
  )
}

export function RenderModalByKind() {
  const active = useModal(s => s.active)
  if (!active) return
  const { kind } = active
  switch (kind) {
    case 'add:antiparasitic':
      return (
        <ModalTypeAntiparasiticInput
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
    case 'add:diet':
      return (
        <ModalTypeDietInput
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
    case 'add:medical':
      return (
        <ModalTypeMedicalTreatmentInput
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
    case 'add:otherActivities':
      return (
        <ModalTypeOtherActivitesInput
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
    case 'add:otherTreatment':
      return (
        <ModalTypeOtherTreatmentInput
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
    case 'add:vaccines':
      return (
        <ModalTypeVaccinationInput
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
    case 'add:walks':
      return (
        <ModalTypeWalksInput
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
