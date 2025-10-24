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
} from 'lucide-react'
import ItemEditButtonCompo from '../accordion/accordionListItem/EditButton/ItemEditButtonCompo'
import { DAYS_OF_WEEK } from './CalendarBase'
import { API_TYPE_MAP, type ScheduleEvent } from './types'

interface Props {
  schedule: ScheduleEvent
  selectedDate: Date | null
  isClickable: boolean
  petId: string
  onClick?: () => void
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
  selectedDate,
  isClickable,
  petId,
  onClick,
}: Props) {
  const Icon = CATEGORY_ICONS[schedule.category]
  const iconColor = CATEGORY_COLORS[schedule.category]
  const ariaLabelDate =
    selectedDate &&
    `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${DAYS_OF_WEEK[selectedDate.getDay()]}요일`

  const formattedDate = `${schedule.date.replace(/-/g, '.')}.${DAYS_OF_WEEK[new Date(schedule.date).getDay()]}`

  let apiType
  if (schedule.category !== 'birthday' && schedule.category !== 'adoption')
    apiType = API_TYPE_MAP[schedule.category]

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={!isClickable}
        aria-disabled={!isClickable}
        aria-label={`${ariaLabelDate} 일정`}
        className={`flex w-full flex-col gap-2 rounded-2xl border border-[#DAD9E6] bg-white p-4 text-left ${isClickable ? 'hover:bg-[#ECECF2] focus:outline-2 focus:outline-[#FF6000]' : 'cursor-not-allowed opacity-60 focus:outline-2 focus:outline-[#80809A]'}`}
      >
        <span className="overflow-hidden text-ellipsis text-[#80809A]">
          {formattedDate}
        </span>
        <span className="flex gap-2">
          {Icon && (
            <Icon width={24} height={24} className={`${iconColor} min-w-6`} />
          )}
          <span className="mr-11 grow overflow-hidden font-semibold text-ellipsis whitespace-nowrap text-[#3A394F]">
            {schedule.title}
          </span>
        </span>
      </button>
      {/* 삭제 버튼 */}
      {apiType && (
        <div className="absolute right-4 bottom-4">
          <ItemEditButtonCompo
            title={schedule.title}
            id={schedule.id}
            type={apiType}
            pet_id={petId}
          />
        </div>
      )}
    </>
  )
}
