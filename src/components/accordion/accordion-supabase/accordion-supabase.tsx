import { useEffect } from 'react'
import { createClient } from '../../../libs/supabase/client'

export async function AccordionItemBoxServer() {
  useEffect(() => {
    async function fetchTable() {
      const supabase = createClient()
      const { data, error } = supabase.from('article').select('*')
      console.log(data)
      return { data, error }
    }

    const { data, error } = await fetchTable()
  })
  return <div>서버 컴포넌트</div>
}
