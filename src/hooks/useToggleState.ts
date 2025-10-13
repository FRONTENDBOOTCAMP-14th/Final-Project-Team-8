/**
 * 토클 상태 관리 커스텀 훅
 * @example
 *
 * // 기본 사용법
 * const [isToggle, {on, off, toggle, set: setIsToggle}]= useToggleState()
 *
 * // 상태 켜기
 * on()
 *
 * // 상태 끄기
 * off()
 *
 * // 상태 전환
 * toggle()
 *
 * 직접 값 설정
 * set(boolean)
 *
 * @example
 * // 초기값을 false로 설정
 * const [isToggle, controls] = useToggleState(false)
 */

import { useCallback, useEffect, useState } from 'react'

export default function useToggleState(initialValue: boolean) {
  const [isToggle, setIsToggle] = useState<boolean>(initialValue)

  const on = useCallback(() => setIsToggle(true), [])
  const off = useCallback(() => setIsToggle(false), [])
  const toggle = useCallback(() => setIsToggle(p => !p), [])

  useEffect(() => {
    setIsToggle(initialValue)
  }, [initialValue])

  return [isToggle, { on, off, toggle, set: setIsToggle }] as const
}
