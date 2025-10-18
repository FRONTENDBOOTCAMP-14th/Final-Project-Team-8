import type { ScheduleEvent } from '@/components/calendar/types'
import { createClient } from '../supabase/client'

/**
 * Supabase에서 반려동물의 전체 스케줄 데이터를 가져오는 함수
 * 생일, 입양일, 백신, 구충제, 진료, 산책 기록을 통합합니다.
 *
 * @param petId - 반려동물 ID
 * @returns ScheduleEvent 배열
 * @throws petId가 없거나 데이터 조회 실패 시
 */
export async function getScheduleData(
  petId?: string
): Promise<ScheduleEvent[]> {
  if (!petId) {
    throw new Error('petId가 필요합니다.')
  }

  const supabase = createClient()
  const schedules: ScheduleEvent[] = []

  try {
    // 1. 반려동물 정보(생일, 입양일)
    const petSchedules = await getPetSchedules(supabase, petId)
    schedules.push(...petSchedules)

    // 2. 백신 스케줄
    const vaccineSchedules = await getVaccineSchedules(supabase, petId)
    schedules.push(...vaccineSchedules)

    // 3. 구충제 스케줄
    const antiparasiticSchedules = await getAntiparasiticSchedules(
      supabase,
      petId
    )
    schedules.push(...antiparasiticSchedules)

    // 4. 진료 스케줄
    const medicalSchedules = await getMedicalSchedules(supabase, petId)
    schedules.push(...medicalSchedules)

    // 5. 산책 스케줄
    const walkSchedules = await getWalkSchedules(supabase, petId)
    schedules.push(...walkSchedules)

    return schedules
  } catch (error) {
    console.error('Failed to fetch schedules:', error)
    throw error
  }
}

/**
 * 반려동물의 생일과 입양일 스케줄 가져오기
 */
async function getPetSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: pets, error } = await supabase
    .from('pets')
    .select('id, name, birthdate, adoption_date')
    .eq('id', petId)
    .single()

  if (error) {
    console.error('Pets fetch error:', error)
    throw new Error(`반려동물 정보 조회 실패: ${error.message}`)
  }

  if (pets) {
    // 생일(매년 반복)
    if (pets.birthdate) {
      schedules.push({
        id: `${pets.id}-birthday`,
        date: pets.birthdate,
        title: `${pets.name}의 생일`,
        category: 'birthday',
        isRecurring: true,
      })
    }

    // 입양일(매년 반복)
    if (pets.adoption_date) {
      schedules.push({
        id: `${pets.id}-adoption`,
        date: pets.adoption_date,
        title: `${pets.name}의 입양일`,
        category: 'adoption',
        isRecurring: true,
      })
    }
  }

  return schedules
}

/**
 * 백신 스케줄 가져오기
 */
async function getVaccineSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: vaccines, error } = await supabase
    .from('vaccines')
    .select('id, vaccinated_date, title')
    .eq('pet_id', petId)

  if (error) {
    console.error('Vaccines fetch error:', error)
    return schedules
  }

  if (vaccines) {
    schedules.push(
      ...vaccines.map((v: any) => ({
        id: v.id,
        date: v.vaccinated_date,
        title: v.title,
        category: 'vaccine' as const,
      }))
    )
  }

  return schedules
}

/**
 * 구충제 스케줄 가져오기
 */
async function getAntiparasiticSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: antiparasitics, error } = await supabase
    .from('antiparasitic')
    .select('id, intake_date, next_date, title')
    .eq('pet_id', petId)

  if (error) {
    console.error('Antiparasitics fetch error:', error)
    return schedules
  }

  if (antiparasitics) {
    antiparasitics.forEach((a: any) => {
      schedules.push({
        id: `${a.id}-intake`,
        date: a.intake_date,
        title: a.title,
        category: 'antiparasitic' as const,
      })
      if (a.next_date) {
        schedules.push({
          id: `${a.id}-next`,
          date: a.next_date,
          title: a.title,
          category: 'antiparasitic' as const,
        })
      }
    })
  }

  return schedules
}

/**
 * 진료 스케줄 가져오기
 */
async function getMedicalSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: medicalTreatments, error } = await supabase
    .from('medical treatment')
    .select('id, visit_date, next_date, title, category')
    .eq('pet_id', petId)

  if (error) {
    console.error('Medical treatments fetch error:', error)
    return schedules
  }

  if (medicalTreatments) {
    medicalTreatments.forEach((m: any) => {
      schedules.push({
        id: `${m.id}-visit`,
        date: m.visit_date,
        title: m.title,
        category: 'medical' as const,
      })

      if (m.next_date) {
        schedules.push({
          id: `${m.id}-next`,
          date: m.next_date,
          title: m.title,
          category: 'medical' as const,
        })
      }
    })
  }

  return schedules
}

/**
 * 산책 스케줄 가져오기
 */
async function getWalkSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: walks, error } = await supabase
    .from('walks')
    .select('id, date, title')
    .eq('pet_id', petId)

  if (error) {
    console.error('Walks fetch error:', error)
    return schedules
  }

  if (walks) {
    schedules.push(
      ...walks.map((w: any) => ({
        id: w.id,
        date: w.date,
        title: w.title,
        category: 'walk' as const,
      }))
    )
  }

  return schedules
}
