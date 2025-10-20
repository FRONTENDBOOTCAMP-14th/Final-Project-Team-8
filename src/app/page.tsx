import { Sidebar } from '../components'
import Accordion from '../components/accordion/accordion'

export default function HomePage() {
  return (
    <div>
      <section>
        <Sidebar></Sidebar>
        <Accordion type="antiparasitic" title="구충 치료"></Accordion>
        <Accordion type="diet" title="식단 일지"></Accordion>
        <Accordion type="medical treatment" title="의료 처치"></Accordion>
        <Accordion type="other activities" title="기타 활동"></Accordion>
        <Accordion type="other treatments" title="기타 치료"></Accordion>
        <Accordion type="vaccines" title="예방접종"></Accordion>
        <Accordion type="walks" title="산책"></Accordion>
      </section>

      <section id="modal-dialog-portal"></section>
    </div>
  )
}
