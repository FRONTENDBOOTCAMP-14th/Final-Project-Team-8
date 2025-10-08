'use client'

import { createClient } from '@/libs/supabase/client'
import { Suspense, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { MedicalTreatment } from '../../libs/supabase'
import Button from '../ui/button/Button'
import { selectTypeButtonTitle, TableName } from './accordionFun'
import { AccordionListItemTreatment } from './accordionListItem'

// type ItemPropsByType = {
//   vaccines: Vaccines
//   antiparasitic: Antiparasitic
//   diet: Diet
//   'medical treatment': MedicalTreatment
//   'other activities': OtherActivities
//   'other treatments': OtherTreatment
//   walks: Walks
// }

type AccordionItemProps<T extends TableName> = {
  type: T
  isOpen: boolean
}

export default function AccordionItemBox<T extends TableName>({
  type,
  isOpen,
}: AccordionItemProps<T>) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function fetchRows() {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from(type).select('*')

      if (!mounted) return
      if (error) setError(error.message)
      else if (data.length === 0) toast.info('해당 기록이 없습니다.')
      else setRows(data)
      setLoading(false)
    }

    fetchRows()
    return () => {
      mounted = false
    }
  }, [type])

  console.log(rows)

  return (
    <div
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.79,0.14,0.15,0.86)] ${isOpen ? 'mb-3 max-h-[400px] overflow-y-auto' : 'max-h-0'}`}
    >
      <div className="relative ml-5 before:absolute before:left-0 before:h-px before:w-[590px] before:rounded-2xl before:bg-gray-300"></div>

      <Button
        variant="white"
        className="!m-5 !w-[calc(100%-40px)] gap-1 !p-[13px] font-bold !text-orange-500"
      >
        <img src="/components/accordion/plus-button-icon.svg" alt="플러스" />
        <p>{selectTypeButtonTitle(type)}</p>
      </Button>
      <Suspense fallback={<ListLoading></ListLoading>}>
        <MedicalTreatment dataList={rows}></MedicalTreatment>
      </Suspense>
      {/* <JSONDataSpreed type={type} /> */}
    </div>
  )
}

type MedicalTreatmentProps = {
  dataList: MedicalTreatment[]
}

function MedicalTreatment({ dataList }: MedicalTreatmentProps) {
  return (
    <div>
      {dataList.map(
        ({ category, id, next_date, notes, pet_id, title, visit_date }) => {
          return (
            <AccordionListItemTreatment
              category={category}
              title={title}
              id={id}
              key={id}
              next_date={next_date}
              notes={notes}
              visit_date={visit_date}
              pet_id={pet_id}
            ></AccordionListItemTreatment>
          )
        }
      )}
    </div>
  )
}

function ListLoading() {
  return (
    <div>
      <h2>로딩 중..</h2>
      <p>잠시만 기다려 요세요.</p>
    </div>
  )
}

// function JSONDataSpreed({ type }) {
//   const conf = ACCORDION_CONFIG[type] // 여기서부터 T로 고정
//   const sections = conf.select(dummyData as unknown as DummyRoot) ?? []
//   return (
//     <>
//       {sections.map((section, si) => {
//         const { year, records } = section
//         const Item = conf.Item as ComponentType<ItemPropsByType[T]>

//         return (
//           <div key={`year-${si}`}>
//             <h2 tabIndex={-1} className="m-5 font-bold text-gray-800">
//               {year}
//             </h2>
//             <ul tabIndex={-1}>
//               {records.map((rec: any, ri: number) => {
//                 const props = conf.toProps(rec) as ItemPropsByType[T]
//                 return <Item key={`item-${si}-${ri}`} {...props} />
//               })}
//             </ul>
//           </div>
//         )
//       })}
//     </>
//   )
// }
