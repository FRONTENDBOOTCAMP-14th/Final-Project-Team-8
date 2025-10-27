import { useCallback, useMemo, useState } from 'react'
import type { TouchedFields } from '../types'
import {
  isPasswordValid as checkPasswordValid,
  validationEmail,
  validationName,
} from '../validation'

export const useSignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  })

  const isPasswordMatch = useMemo(() => {
    return password === passwordConfirm && passwordConfirm.length > 0
  }, [password, passwordConfirm])

  const isFormValid = useMemo(() => {
    return (
      validationName(name) &&
      validationEmail(email) &&
      checkPasswordValid(password) &&
      isPasswordMatch &&
      agreeToTerms
    )
  }, [name, email, password, isPasswordMatch, agreeToTerms])

  const setFieldTouched = useCallback(
    (field: keyof TouchedFields, value: boolean) => {
      setTouched(prev => ({ ...prev, [field]: value }))
    },
    []
  )

  const setAllTouched = useCallback(() => {
    setTouched({
      name: true,
      email: true,
      password: true,
      passwordConfirm: true,
    })
  }, [])

  return {
    // 상태
    name,
    email,
    password,
    passwordConfirm,
    agreeToTerms,
    touched,
    isPasswordMatch,
    isFormValid,

    // 상태 변경 함수
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setAgreeToTerms,
    setFieldTouched,
    setAllTouched,
  }
}
