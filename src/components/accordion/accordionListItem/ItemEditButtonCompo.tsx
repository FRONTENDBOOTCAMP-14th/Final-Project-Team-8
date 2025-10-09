import { SquarePen, X } from 'lucide-react'

interface ItemEditButtonCompoProps {
  title: string | null
}

export default function ItemEditButtonCompo({
  title,
}: ItemEditButtonCompoProps) {
  return (
    <>
      <button
        type="button"
        aria-label={`${title} edit`}
        className="mr-3 ml-3 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
      >
        <SquarePen
          focusable="false"
          aria-hidden="true"
          width={20}
          height={20}
        />
        <span className="sr-only">편집</span>
      </button>
      <button
        type="button"
        aria-label={`${title} delete`}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-orange-500 p-[9px] text-orange-500 hover:cursor-pointer active:scale-[0.95]"
      >
        <X width={20} height={20} />
        <span className="sr-only">삭제</span>
      </button>
    </>
  )
}
