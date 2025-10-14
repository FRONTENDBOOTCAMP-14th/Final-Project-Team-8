import { useModal } from '@/store/modalStore'
import Modal from '../modal/Modal'
import { ModalTypeAntiparasiticInput } from '../modal/ModalType/ModalTypeAntiparasitic'

export default function NewListitemAdd() {
  const offToState = useModal(state => state.offToState)
  const isToggle = useModal(state => state.isToggle)

  return (
    <div>
      <Modal
        open={isToggle}
        onClose={() => offToState('isToggle')}
        isModify={true}
        setModify={() => {}}
        buttonNone={true}
      >
        <ModalTypeAntiparasiticInput
          restProps={{
            title: '',
            intake_date: '',
            next_date: '',
            notes: '',
          }}
        />
      </Modal>
    </div>
  )
}
