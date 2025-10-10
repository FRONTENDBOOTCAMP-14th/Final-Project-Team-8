import { Plus } from 'lucide-react'
import Link from 'next/link'

interface IconButtonProps {
  selected?: boolean
  onClick?: (id: string) => void
}

export default function IconButton({ onClick, selected }: IconButtonProps) {
  return (
    <Link
      href="#"
      id="add"
      className="inline-flex flex-col items-center gap-2"
      aria-label="Add pet"
    >
      <div
        className={`flex aspect-square w-[60px] items-center justify-center rounded-full bg-gray-900 outline-[1.5px] outline-[#A3A0C0] ${selected ? 'outline-[3px] outline-orange-500' : ''}`}
        onClick={() => onClick?.('add')}
      >
        <Plus className="text-[#A3A0C0]"></Plus>
      </div>

      <p
        className={`${selected ? 'font-bold text-[#FF6000]' : 'text-gray-500'}`}
      >
        추가
      </p>
    </Link>
  )
}
