import { useMemo, useState } from 'react'
import { useModal } from '../../store/modalStore'
import { ModalTypeAntiparasiticInput } from '../modal/ModalType/ModalTypeAntiparasitic'
import { AccordionProps } from './accordion'

interface AccordionListAddProps {
  type: AccordionProps['type']
}

export default function NewAccordionListAdd({ type }: AccordionListAddProps) {
  const [isModify, setModify] = useState(true)
  const isToggle = useModal(state => state.isToggle)
  const offToState = useModal(state => state.offToState)

  const inputCompo = useMemo(() => {
    switch (type) {
      case 'antiparasitic':
        return (
          <ModalTypeAntiparasiticInput
            isModify={false}
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
    }
  }, [type])

  // return inputCompo
}
