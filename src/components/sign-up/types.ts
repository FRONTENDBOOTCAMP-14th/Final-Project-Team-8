export interface SignupProps {
  onSignup?: (
    email: string,
    password: string,
    name: string
  ) => Promise<void> | void
  onLogin?: () => void
  signupError?: string
  onErrorChange?: (error: string) => void
}

export interface TouchedFields {
  name: boolean
  email: boolean
  password: boolean
  passwordConfirm: boolean
}

export interface PasswordValidation {
  length: boolean
  hasLetters: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}
;``
