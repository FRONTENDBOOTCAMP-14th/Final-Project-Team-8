import { useState } from 'react'
import { useModal } from '../../store/modalStore'
import Modal from '../modal/Modal'
import { ModalTypeAntiparasiticInput } from '../modal/ModalType/ModalTypeAntiparasitic'
import { AccordionProps } from './accordion'

interface AccordionListAddProps {
  type: AccordionProps['type']
}

export default function NewAccordionListAdd({ type }: AccordionListAddProps) {
  const [isModify, setModify] = useState(true)
  const isToggle = useModal(state => state.isToggle)
  const offToState = useModal(state => state.offToState)
  return (
    <div>
      <Modal
        open={isToggle}
        onClose={() => {
          offToState('isToggle')
        }}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalTypeAntiparasiticInput
          isModify={isModify}
          restProps={{
            id: '',
            intake_date: '',
            next_date: null,
            notes: null,
            pet_id: '',
            title: '',
          }}
        />
      </Modal>
    </div>
  )
}
