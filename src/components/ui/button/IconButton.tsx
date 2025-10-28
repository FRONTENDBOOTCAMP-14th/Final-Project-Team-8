import { Check, Plus } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'

interface IconButtonProps {
  selected?: boolean
  onClick?: (id: string) => void
}

interface ButtonProps {
  onClick?: () => void
}

export default function IconButton({ selected }: IconButtonProps) {
  return (
    <Link
      href="/add-profile/step1"
      className="inline-flex flex-col items-center gap-2"
      aria-label="반려동물 추가"
    >
      <div
        className={`flex aspect-square w-[60px] items-center justify-center rounded-full bg-gray-900 outline-[1.5px] outline-[#A3A0C0] ${selected ? 'outline-[3px] outline-[#FF6000]' : ''}`}
        aria-hidden="true"
      >
        <Plus className="text-[#A3A0C0]" />
      </div>

      <p
        className={`${selected ? 'font-bold text-[#FF6000]' : 'text-gray-500'}`}
        aria-hidden="true"
      >
        추가
      </p>
    </Link>
  )
}

export function CameraButton({ onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-0 left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-white shadow-lg transition-colors hover:bg-gray-50"
    >
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10.4997 4.08771H10.508M1.33301 9.92101L4.66634 6.58767C5.04639 6.22197 5.4775 6.02944 5.91634 6.02944C6.35518 6.02944 6.78629 6.22197 7.16634 6.58767L11.333 10.7543M9.66634 9.08767L10.4997 8.25434C10.8797 7.88864 11.3108 7.69611 11.7497 7.69611C12.1885 7.69611 12.6196 7.88864 12.9997 8.25434L14.6663 9.92101M3.83301 0.754379H12.1663C13.5471 0.754379 14.6663 1.87367 14.6663 3.25438V11.5877C14.6663 12.9684 13.5471 14.0877 12.1663 14.0877H3.83301C2.4523 14.0877 1.33301 12.9684 1.33301 11.5877V3.25438C1.33301 1.87367 2.4523 0.754379 3.83301 0.754379Z"
          stroke="#FF6000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">사진 선택</span>
    </button>
  )
}

export function CheckButton({ onClick }: ButtonProps) {
  return (
    <Button
      variant="white"
      onClick={onClick}
      className="absolute bottom-0 left-1/2 z-30 flex max-h-fit min-h-fit max-w-fit min-w-fit -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-xl bg-white !p-[7px] shadow-lg transition-colors hover:bg-gray-50"
    >
      <Check size={28} aria-hidden="true" />
      <span className="sr-only">확인</span>
    </Button>
  )
}

export function XButton({ onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -top-0.5 -right-0.5 z-30 flex h-9 w-9 -translate-x-1 translate-y-1 cursor-pointer items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-colors hover:bg-orange-600"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="sr-only">삭제</span>
    </button>
  )
}
