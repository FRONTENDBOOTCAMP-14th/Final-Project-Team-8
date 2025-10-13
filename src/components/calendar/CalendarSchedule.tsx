import { getScheduleData } from '@/libs/api/schedules'
import CalendarScheduleClient from './CalendarScheduleClient'

interface Props {
  petId?: string
}

export default async function CalendarSchedule({ petId }: Props) {
  const schedules = await getScheduleData(petId)

  return <CalendarScheduleClient schedules={schedules} />
}
