export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const NAME_REGEX = /^[가-힣a-zA-Z]+$/
export const MIN_PASSWORD_LENGTH = 6
export const PASSWORD_RULES = {
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
}

export const validationEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

export const validationName = (name: string): boolean => {
  return name.trim().length > 0 && NAME_REGEX.test(name)
}

export const validatePassword = (password: string) => {
  return {
    length: password.length >= MIN_PASSWORD_LENGTH,
    hasLetters:
      PASSWORD_RULES.hasUpperCase.test(password) &&
      PASSWORD_RULES.hasLowerCase.test(password),
    hasNumber: PASSWORD_RULES.hasNumber.test(password),
    hasSpecialChar: PASSWORD_RULES.hasSpecialChar.test(password),
  }
}

export const isPasswordValid = (password: string): boolean => {
  const validation = validatePassword(password)
  return validation.length && validation.hasLetters
}

export const getPasswordErrorMessage = (password: string): string => {
  if (!password) return ''

  const validation = validatePassword(password)

  if (!validation.length) {
    return '비밀번호는 6자 이상이어야 합니다'
  }

  if (!validation.hasLetters) {
    return '비밀번호는 영문 대소문자를 포함해야 합니다'
  }

  return ''
}

export const getNameErrorMessage = (name: string, touched: boolean): string => {
  if (!touched) return ''

  if (name.trim().length === 0) {
    return '이름을 입력해주세요'
  }

  if (!NAME_REGEX.test(name)) {
    return '한글, 영문 대/소문자를 사용해주세요 (특수기호, 공백, 숫자 사용 불가)'
  }

  return ''
}

export const getEmailErrorMessage = (
  email: string,
  touched: boolean
): string => {
  if (!touched) return ''

  if (email.length === 0) {
    return '이메일을 입력해주세요'
  }

  if (!EMAIL_REGEX.test(email)) {
    return '올바른 이메일 형식을 입력해주세요 (예: example@email.com)'
  }

  return ''
}
