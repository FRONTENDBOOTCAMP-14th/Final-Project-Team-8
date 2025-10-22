import type { LucideIcon } from 'lucide-react'
import {
  Bandage,
  Cake,
  Footprints,
  Home,
  PawPrint,
  Pill,
  Stethoscope,
  Syringe,
  Trash2,
} from 'lucide-react'
import Button from '../ui/button/Button'
import type { ScheduleEvent } from './types'

interface Props {
  schedule: ScheduleEvent
  isClickable: boolean
  onClick?: () => void
  openDeleteModal?: () => void
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  birthday: Cake,
  adoption: Home,
  vaccine: Syringe,
  antiparasitic: Pill,
  medical: Stethoscope,
  'other treatments': Bandage,
  walk: Footprints,
  'other activities': PawPrint,
}

const CATEGORY_COLORS: Record<string, string> = {
  birthday: 'text-[#6AA9F3]',
  adoption: 'text-[#A461D8]',
  vaccine: 'text-[#31AA7A]',
  antiparasitic: 'text-[#FF9AD5]',
  medical: 'text-[#FFC44A]',
  'other treatments': 'text-[#FD8C8C]',
  walk: 'text-[#82C43C]',
  'other activities': 'text-[#FF6000]',
}

export default function ScheduleListItem({
  schedule,
  isClickable,
  onClick,
  openDeleteModal,
}: Props) {
  const Icon = CATEGORY_ICONS[schedule.category]
  const iconColor = CATEGORY_COLORS[schedule.category]
  const formattedDate = schedule.date.replace(/-/g, '.')

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={!isClickable}
        aria-disabled={!isClickable}
        className={`flex w-full flex-col gap-2 rounded-2xl border border-[#DAD9E6] bg-white p-4 text-left ${isClickable ? 'hover:bg-[#ECECF2] focus:outline-2 focus:outline-[#FF6000]' : 'cursor-not-allowed opacity-60 focus:outline-2 focus:outline-[#80809A]'}`}
      >
        <span className="overflow-hidden text-ellipsis text-[#80809A]">
          {formattedDate}
        </span>
        <span className="flex gap-2">
          {Icon && <Icon width={24} height={24} className={`${iconColor}`} />}
          <span className="overflow-hidden font-semibold text-ellipsis text-[#3A394F]">
            {schedule.title}
          </span>
        </span>
      </button>
      {/* 삭제 버튼 */}
      <Button
        variant="white"
        aria-label="일정 삭제"
        onClick={openDeleteModal}
        className="absolute right-4 bottom-4 aspect-square max-h-[38px] min-h-[38px] max-w-[38px] min-w-[38px] !p-[9px]"
      >
        <Trash2 width={20} height={20} className="text-[#FF6000]" />
      </Button>
    </>
  )
}
