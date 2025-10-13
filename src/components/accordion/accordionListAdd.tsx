import { useState } from 'react'
import { useModal } from '../../store/modalStore'
import Modal from '../modal/Modal'
import ModalTypeAntiparasitic from '../modal/ModalType/ModalTypeAntiparasitic'

export default function AccordionListAdd() {
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
        <ModalTypeAntiparasitic
          isModify={isModify}
          restProps={{
            id: '',
            intake_date: '',
            next_date: null,
            notes: null,
            pet_id: '',
            title: '',
          }}
        ></ModalTypeAntiparasitic>
      </Modal>
    </div>
  )
}
