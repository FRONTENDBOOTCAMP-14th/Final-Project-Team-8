import type { LucideIcon } from 'lucide-react'
import {
  Cake,
  Footprints,
  Home,
  Pill,
  Stethoscope,
  Syringe,
} from 'lucide-react'
import type { ScheduleEvent } from './types'

interface Props {
  schedule: ScheduleEvent
  onClick?: () => void
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  birthday: Cake,
  adoption: Home,
  vaccine: Syringe,
  antiparasitic: Pill,
  medical: Stethoscope,
  walk: Footprints,
}

const CATEGORY_COLORS: Record<string, string> = {
  birthday: 'text-[#FF8630]',
  adoption: 'text-[#6AA9F3]',
  vaccine: 'text-[#897EE6]',
  antiparasitic: 'text-[#FF9AD5]',
  medical: 'text-[#FFC542]',
  walk: 'text-[#82C43C]',
}

export default function ScheduleListItem({ schedule, onClick }: Props) {
  const Icon = CATEGORY_ICONS[schedule.category]
  const iconColor = CATEGORY_COLORS[schedule.category]
  const formattedDate = schedule.date.replace(/-/g, '.')

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-2 rounded-2xl border border-[#DAD9E6] bg-white p-4 text-left transition-colors hover:bg-[#ECECF2] focus:outline-2 focus:outline-[#FF6000]"
    >
      <span className="overflow-hidden text-ellipsis text-[#80809A]">
        {formattedDate}
      </span>
      <span className="flex gap-2">
        {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
        <span className="overflow-hidden font-semibold text-ellipsis text-[#3A394F]">
          {schedule.title}
        </span>
      </span>
    </button>
  )
}
