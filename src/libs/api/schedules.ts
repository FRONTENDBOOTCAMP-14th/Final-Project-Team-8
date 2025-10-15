import { createClient } from '../supabase/client'

// 스케줄 데이터 타입 정의
export type ScheduleEvent = {
  id: string
  date: string
  title: string
  category:
    | 'birthday'
    | 'adoption'
    | 'vaccine'
    | 'antiparasitic'
    | 'medical'
    | 'walk'
  isRecurring?: boolean // 매년 반복되는 이벤트인지 여부
}

// 크ㄹ라이언트 컴포넌트에서 스케줄 데이터 가져오기
export async function getScheduleData(
  petId?: string
): Promise<ScheduleEvent[]> {
  const supabase = createClient()
  const schedules: ScheduleEvent[] = []

  if (!petId) {
    throw new Error('petId가 필요합니다.')
  }

  // 반려동물 정보 가져오기(생일, 입양일)
  const { data: pets, error: petsError } = await supabase
    .from('pets')
    .select('id, name, birthdate, adoption_date')
    .eq('id', petId)
    .single()

  if (petsError) {
    console.error('Pets fetch error:', petsError)
    throw new Error(`반려동물 정보 조회 실패: ${petsError.message}`)
  }

  if (pets) {
    // 생일 추가(매년 반복)
    if (pets.birthdate) {
      schedules.push({
        id: `${pets.id}-birthday`,
        date: pets.birthdate,
        title: `${pets.name}의 생일`,
        category: 'birthday',
        isRecurring: true,
      })
    }

    // 입양일 추가(매년 반복)
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

  // 백신 스케줄
  const { data: vaccines, error: vaccinesError } = await supabase
    .from('vaccines')
    .select('id, vaccinated_date, title')
    .eq('pet_id', petId)

  if (vaccinesError) {
    console.error('Vaccines fetch error:', vaccinesError)
  } else if (vaccines) {
    schedules.push(
      ...vaccines.map(v => ({
        id: v.id,
        date: v.vaccinated_date,
        title: v.title,
        category: 'vaccine' as const,
      }))
    )
  }

  // 구충제 스케줄
  const { data: antiparasitics, error: antiparasiticsError } = await supabase
    .from('antiparasitic')
    .select('id, intake_date, next_date, title')
    .eq('pet_id', petId)

  if (antiparasiticsError) {
    console.error('Antiparasitics fetch error:', antiparasiticsError)
  } else if (antiparasitics) {
    antiparasitics.forEach(a => {
      schedules.push({
        id: `${a.id}-intake`,
        date: a.intake_date,
        title: a.title,
        category: 'antiparasitic',
      })
      if (a.next_date) {
        schedules.push({
          id: `${a.id}-next`,
          date: a.next_date,
          title: a.title,
          category: 'antiparasitic',
        })
      }
    })
  }

  // 진료 스케줄
  const { data: medicalTreatments, error: medicalError } = await supabase
    .from('medical treatment')
    .select('id, visit_date, next_date, title, category')
    .eq('pet_id', petId)

  if (medicalError) {
    console.error('Medical treatments fetch error:', medicalError)
  } else if (medicalTreatments) {
    medicalTreatments.forEach(m => {
      schedules.push({
        id: `${m.id}-visit`,
        date: m.visit_date,
        title: m.title,
        category: 'medical',
      })

      if (m.next_date) {
        schedules.push({
          id: `${m.id}-next`,
          date: m.next_date,
          title: m.title,
          category: 'medical',
        })
      }
    })
  }

  // 산책 기록
  const { data: walks, error: walksError } = await supabase
    .from('walks')
    .select('id, date, title')
    .eq('pet_id', petId)

  if (walksError) {
    console.error('Walks fetch error:', walksError)
  } else if (walks) {
    schedules.push(
      ...walks.map(w => ({
        id: w.id,
        date: w.date,
        title: w.title,
        category: 'walk' as const,
      }))
    )
  }

  return schedules
}
