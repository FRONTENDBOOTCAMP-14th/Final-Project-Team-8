import { Sidebar } from '../components'
import Accordion from '../components/accordion/accordion'

export default function HomePage() {
  return (
    <div>
      <section className="m-0 flex w-screen p-0">
        <Sidebar></Sidebar>

        <div className="w-full">
          <Accordion type="antiparasitic" title="구충치료" />
          <Accordion type="diet" title="식단 일지" />
          <Accordion type="medical treatment" title="의료 처치" />
          <Accordion type="other activities" title="기타 활동" />
          <Accordion type="other treatments" title="기타 치료" />
          <Accordion type="vaccines" title="예방접종" />
          <Accordion type="walks" title="산책" />
        </div>
      </section>

      <section id="modal-dialog-portal"></section>
    </div>
  )
}
