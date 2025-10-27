import { CalendarDays } from 'lucide-react'
import NotificationToggle from '../../calendar/NotificationToggle'
import { NOTIFICATION_TYPE_MAP } from '../../calendar/types'
import Button from '../../ui/button/Button'

interface Props {
  scheduleId: string
  category: 'birthday' | 'adoption'
  petName: string
  date: string
  selectedPetId: string
  onClose?: () => void
}

export default function ModalTypeBirthdayAdoption({
  scheduleId,
  category,
  petName,
  date,
  selectedPetId,
  onClose,
}: Props) {
  const isBirthday = category === 'birthday'
  const displayTitle = isBirthday ? '생일' : '입양일'

  return (
    <div className="flex flex-col gap-2">
      {/* 알림 설정 */}
      <NotificationToggle
        scheduleId={scheduleId}
        scheduleType={NOTIFICATION_TYPE_MAP[category]}
        petId={selectedPetId}
        isShowToggle={true}
      />

      {/* 제목 */}
      <h3 className="my-5 text-[28px] font-bold text-gray-800">
        {petName}의 {displayTitle}
      </h3>

      {/* 상세 정보 */}
      <p className="text-[18px] font-bold text-gray-800">상세</p>
      <ul className="mb-5 flex flex-wrap items-start gap-4">
        <li className="mt-3 flex min-w-[220px] flex-1 basis-0 items-center">
          {/* 컬럼 좌측 세로 구분선 */}
          <div className="mr-3 h-[60px] w-[2px] flex-shrink-0 rounded-xl bg-gray-200" />
          <div className="mt-1 flex w-full flex-col">
            <div className="text-base text-gray-700">{displayTitle} 날짜</div>

            {/* 날짜 */}
            <div className="mt-1 flex items-center gap-2 pt-2 text-base font-bold text-gray-800">
              <CalendarDays size={20} className="text-gray-600" />
              {date}
            </div>
          </div>
        </li>
      </ul>

      {/* 확인 버튼 */}
      {onClose && (
        <div className="mt-2 flex justify-end">
          <Button variant="orange" onClick={onClose}>
            확인
          </Button>
        </div>
      )}
    </div>
  )
}
