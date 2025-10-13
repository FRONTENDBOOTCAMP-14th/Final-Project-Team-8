import { create } from 'zustand'

type State = {
  isToggle: boolean
  isModify: boolean
}

type Action = {
  onToState: (state: keyof State) => void
  offToState: (state: keyof State) => void
  toggleToState: () => void
}

export const useModal = create<State & Action>(set => ({
  isToggle: false,
  isModify: true,
  onToState: state => {
    set({ [state]: true })
  },
  offToState: () => set({ isToggle: false }),
  toggleToState: () => set(state => ({ isToggle: !state.isToggle })),
}))
