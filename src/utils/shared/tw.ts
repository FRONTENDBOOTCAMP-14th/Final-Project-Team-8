import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function tw(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}
