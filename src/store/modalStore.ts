import { create } from 'zustand'

type State = {
  isToggle: boolean
  isSubmit: boolean
  formData: object
}

type Action = {
  onToState: (state: keyof State) => void
  offToState: (state: keyof State) => void
  toggleToState: () => void
}

export const useModal = create<State & Action>(set => ({
  // 모달 On/Off
  isToggle: false,

  // 모달의 수정 상태 On/Off
  isSubmit: true,

  // 폼 데이터 저장 객체
  formData: {},

  // 위 State 전달시 => True 변환
  onToState: state => {
    set({ [state]: true })
  },
  // 위 State 전달시 => False 변환
  offToState: () => set({ isToggle: false }),

  // 위 State 전달시 => boolean 역변환
  toggleToState: () => set(state => ({ isToggle: !state.isToggle })),
}))
