import { useMemo } from 'react'
import { MIN_PASSWORD_LENGTH, PASSWORD_RULES } from '../validation'

export const usePasswordStrength = (password: string) => {
  const strength = useMemo(() => {
    if (!password) return 0

    let score = 0

    if (password.length >= MIN_PASSWORD_LENGTH) score++

    if (
      PASSWORD_RULES.hasUpperCase.test(password) &&
      PASSWORD_RULES.hasLowerCase.test(password)
    )
      score++

    if (PASSWORD_RULES.hasNumber.test(password)) score++
    if (PASSWORD_RULES.hasSpecialChar.test(password)) score++

    return Math.min(score, 3)
  }, [password])

  const getStrengthColour = (level: number) => {
    if (level === 0) return 'bg-gray-200'
    if (level === 1) return 'bg-red-500'
    if (level === 2) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (level: number) => {
    if (level === 0) return ''
    if (level === 1) return '약함'
    if (level === 2) return '보통'
    return '강함'
  }

  return { strength, getStrengthColour, getStrengthText }
}
