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

// 서버 컴포넌트에서 스케줄 데이터 가져오기
export async function getScheduleData(
  petId?: string
): Promise<ScheduleEvent[]> {
  const supabase = await createClient()
  const schedules: ScheduleEvent[] = []

  // petId가 없으면 빈 배열 반환
  if (!petId) {
    return []
  }

  try {
    // 반려동물 정보 가져오기(생일, 입양일)
    const { data: pets } = await supabase
      .from('pets')
      .select('id, name, birthdate, adoption_date')
      .eq(petId ? 'id' : '1', petId || '1')

    if (pets) {
      pets.forEach(pet => {
        // 생일 추가(매년 반복)
        if (pet.birthdate) {
          schedules.push({
            id: `${pet.id}-birthday`,
            date: pet.birthdate,
            title: `${pet.name}의 생일`,
            category: 'birthday',
            isRecurring: true,
          })
        }

        // 입양일 추가(매년 반복)
        if (pet.adoption_date) {
          schedules.push({
            id: `${pet.id}-adoption`,
            date: pet.adoption_date,
            title: `${pet.name}의 입양일`,
            category: 'adoption',
            isRecurring: true,
          })
        }
      })
    }

    // 백신 스케줄
    const { data: vaccines } = await supabase
      .from('vaccines')
      .select('id, vaccinated_date, title')
      .eq(petId ? 'pet_id' : '1', petId || '1')

    if (vaccines) {
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
    const { data: antiparasitics } = await supabase
      .from('antiparasitic')
      .select('id, intake_date, next_date, title')
      .eq(petId ? 'pet_id' : '1', petId || '1')

    if (antiparasitics) {
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
    const { data: medicalTreatments } = await supabase
      .from('medical treatment')
      .select('id, visit_date, next_date, title, category')
      .eq(petId ? 'pet_id' : '1', petId || '1')

    if (medicalTreatments) {
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
    const { data: walks } = await supabase
      .from('walks')
      .select('id, date, title')
      .eq(petId ? 'pet_id' : '1', petId || '1')

    if (walks) {
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
  } catch (error) {
    console.error('Failed to fetch schedules:', error)
    return []
  }
}
