import { toast } from 'sonner'
import type { ScheduleEvent } from '@/components/calendar/types'
import { createClient } from '../supabase/client'

/**
 * Supabase에서 반려동물의 전체 스케줄 데이터를 가져오는 함수
 * 생일, 입양일, 예방접종, 구충 치료, 의료 처치, 기타 치료, 산책, 기타 활동 기록을 통합합니다.
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

    // 2. 예방접종 스케줄
    const vaccineSchedules = await getVaccineSchedules(supabase, petId)
    schedules.push(...vaccineSchedules)

    // 3. 구충 치료 스케줄
    const antiparasiticSchedules = await getAntiparasiticSchedules(
      supabase,
      petId
    )
    schedules.push(...antiparasiticSchedules)

    // 4. 의료 처치 스케줄
    const medicalSchedules = await getMedicalSchedules(supabase, petId)
    schedules.push(...medicalSchedules)

    // 5. 기타 치료 스케줄
    const otherTreatmentSchedules = await getOtherTreatmentSchedules(
      supabase,
      petId
    )
    schedules.push(...otherTreatmentSchedules)

    // 6. 산책 스케줄
    const walkSchedules = await getWalkSchedules(supabase, petId)
    schedules.push(...walkSchedules)

    // 7. 기타 활동 스케줄
    const otherActivitiesSchedules = await getOtherActivitiesSchedules(
      supabase,
      petId
    )
    schedules.push(...otherActivitiesSchedules)

    return schedules
  } catch (error) {
    toast.error(`Failed to fetch schedules: ${error}`)
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
    toast.error(`Pets fetch error: ${error}`)
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
 * 예방접종 스케줄 가져오기
 */
async function getVaccineSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: vaccines, error } = await supabase
    .from('vaccines')
    .select('id, vaccinated_date, title')
    .eq('pet_id', petId)

  if (error) {
    toast.error(`Vaccines fetch error: ${error}`)
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
 * 구충 치료 스케줄 가져오기
 */
async function getAntiparasiticSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: antiparasitics, error } = await supabase
    .from('antiparasitic')
    .select('id, intake_date, next_date, title')
    .eq('pet_id', petId)

  if (error) {
    toast.error(`Antiparasitics fetch error: ${error}`)
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
 * 의료 처치 스케줄 가져오기
 */
async function getMedicalSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: medicalTreatments, error } = await supabase
    .from('medical treatment')
    .select('id, visit_date, next_date, title, category')
    .eq('pet_id', petId)

  if (error) {
    toast.error(`Medical treatments fetch error: ${error}`)
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
 * 기타 치료 스케줄 가져오기
 */
async function getOtherTreatmentSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: otherTreatments, error } = await supabase
    .from('other treatment')
    .select('id, visit_date, next_date, title, category')
    .eq('pet_id', petId)

  if (error) {
    toast.error(`Other treatments fetch error: ${error}`)
    return schedules
  }

  if (otherTreatments) {
    otherTreatments.forEach((m: any) => {
      schedules.push({
        id: `${m.id}-visit`,
        date: m.visit_date,
        title: m.title,
        category: 'other treatments' as const,
      })

      if (m.next_date) {
        schedules.push({
          id: `${m.id}-next`,
          date: m.next_date,
          title: m.title,
          category: 'other treatments' as const,
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
    toast.error(`Walks fetch error: ${error}`)
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

/**
 * 기타 활동 스케줄 가져오기
 */
async function getOtherActivitiesSchedules(supabase: any, petId: string) {
  const schedules: ScheduleEvent[] = []

  const { data: otherActivities, error } = await supabase
    .from('other activities')
    .select('id, visit_date, next_date, title, category')
    .eq('pet_id', petId)

  if (error) {
    toast.error(`Other activities fetch error: ${error}`)
    return schedules
  }

  if (otherActivities) {
    otherActivities.forEach((m: any) => {
      schedules.push({
        id: `${m.id}-visit`,
        date: m.visit_date,
        title: m.title,
        category: 'other activities' as const,
      })

      if (m.next_date) {
        schedules.push({
          id: `${m.id}-next`,
          date: m.next_date,
          title: m.title,
          category: 'other activities' as const,
        })
      }
    })
  }

  return schedules
}

// --------------------------------------------------------------------------
// CREATE 함수들 - 일정 추가
// --------------------------------------------------------------------------

/**
 * 예방접종 일정 추가 타입
 */
export interface CreateVaccineData {
  pet_id: string
  vaccinated_date: string
  title: string
  expiry_date: string
  lot: string
  notes?: string
}

/**
 * 구충 치료 일정 추가 타입
 */
export interface CreateAntiparasiticData {
  pet_id: string
  intake_date: string
  next_date: string
  title: string
  notes?: string
}

/**
 * 의료 처치 일정 추가 타입
 */
export interface CreateMedicalData {
  pet_id: string
  visit_date: string
  next_date?: string
  title: string
  category?: string
  notes?: string
}

/**
 * 기타 치료 일정 추가 타입
 */
export interface CreateOtherTreatmentsData {
  pet_id: string
  date: string
  detail?: string
  title: string
  notes?: string
}

/**
 * 산책 일정 추가 타입
 */
export interface CreateWalkData {
  pet_id: string
  date: string
  start_time: string
  title: string
  total_time?: number
  distance?: number
}

/**
 * 기타 활동 일정 추가 타입
 */
export interface CreateOtherActivitiesData {
  pet_id: string
  date: string
  start_time: string
  duration_time: number
  title: string
  notes?: string
}

/**
 * 예방접종 일정 추가
 *
 * @param data - 예방접종 데이터
 * @returns 생성된 예방접종 ID
 * @throws 데이터 추가 실패 시
 */
export async function createVaccine(data: CreateVaccineData): Promise<string> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('vaccines')
    .insert([
      {
        pet_id: data.pet_id,
        vaccinated_date: data.vaccinated_date,
        title: data.title,
        expiry_date: data.expiry_date,
        lot: data.lot,
        notes: data.notes ?? null,
      },
    ])
    .select('id')
    .single()

  if (error) {
    toast.error(`Failed to create vaccine: ${error}`)
    throw new Error(`예방접종 일정 추가 실패: ${error.message}`)
  }

  return result.id
}

/**
 * 구충 치료 일정 추가
 *
 * @param data - 구충 치료 데이터
 * @returns 생성된 구충 치료 ID
 * @throws 데이터 추가 실패 시
 */
export async function createAntiparasitic(
  data: CreateAntiparasiticData
): Promise<string> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('antiparasitic')
    .insert([
      {
        pet_id: data.pet_id,
        intake_date: data.intake_date,
        next_date: data.next_date ?? null,
        title: data.title,
        notes: data.notes ?? null,
      },
    ])
    .select('id')
    .single()

  if (error) {
    toast.error(`Failed to create antiparasitic: ${error}`)
    throw new Error(`구충 치료 일정 추가 실패: ${error.message}`)
  }

  return result.id
}

/**
 * 의료 처치 일정 추가
 *
 * @param data - 의료 처치 데이터
 * @returns 생성된 의료 처치 ID
 * @throws 데이터 추가 실패 시
 */
export async function createMedical(data: CreateMedicalData): Promise<string> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('medical treatment')
    .insert([
      {
        pet_id: data.pet_id,
        visit_date: data.visit_date,
        next_date: data.next_date ?? null,
        title: data.title,
        category: data.category ?? null,
        notes: data.notes ?? null,
      },
    ])
    .select('id')
    .single()

  if (error) {
    toast.error(`Failed to create medical: ${error}`)
    throw new Error(`의료 처치 일정 추가 실패: ${error.message}`)
  }

  return result.id
}

/**
 * 기타 치료 일정 추가
 *
 * @param data - 기타 치료 데이터
 * @returns 생성된 기타 치료 ID
 * @throws 데이터 추가 실패 시
 */
export async function createOtherTreatments(
  data: CreateOtherTreatmentsData
): Promise<string> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('other treatments')
    .insert([
      {
        pet_id: data.pet_id,
        date: data.date,
        detail: data.detail ?? null,
        title: data.title,
        notes: data.notes ?? null,
      },
    ])
    .select('id')
    .single()

  if (error) {
    toast.error(`Failed to create other treatments: ${error}`)
    throw new Error(`기타 치료 일정 추가 실패: ${error.message}`)
  }

  return result.id
}

/**
 * 산책 일정 추가
 *
 * @param data - 산책 데이터
 * @returns 생성된 산책 ID
 * @throws 데이터 추가 실패 시
 */
export async function createWalk(data: CreateWalkData): Promise<string> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('walks')
    .insert([
      {
        pet_id: data.pet_id,
        date: data.date,
        start_time: data.start_time,
        title: data.title,
        total_time: data.total_time ?? null,
        distance: data.distance ?? null,
      },
    ])
    .select('id')
    .single()

  if (error) {
    toast.error(`Failed to create walk: ${error}`)
    throw new Error(`산책 일정 추가 실패: ${error.message}`)
  }

  return result.id
}

/**
 * 기타 활동 일정 추가
 *
 * @param data - 기타 활동 데이터
 * @returns 생성된 기타 활동 ID
 * @throws 데이터 추가 실패 시
 */
export async function createOtherActivities(
  data: CreateOtherActivitiesData
): Promise<string> {
  const supabase = createClient()

  const { data: result, error } = await supabase
    .from('other activities')
    .insert([
      {
        pet_id: data.pet_id,
        date: data.date,
        start_time: data.start_time,
        duration_time: data.duration_time,
        title: data.title,
        notes: data.notes ?? null,
      },
    ])
    .select('id')
    .single()

  if (error) {
    toast.error(`Failed to create other activities: ${error}`)
    throw new Error(`기타 활동 일정 추가 실패: ${error.message}`)
  }

  return result.id
}
