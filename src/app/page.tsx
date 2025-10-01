import Accordion from '../components/accordion/accordion'

export default function HomePage() {
  return (
    <section className="overflow-hidden">
      <Accordion type="vaccination" title="예방접종"></Accordion>
      <Accordion type="anthelmintic" title="구충 치료"></Accordion>
      <Accordion type="medical" title="의료 처치"></Accordion>
      <Accordion type="other-treatments" title="기타 치료"></Accordion>
      <Accordion type="food-journal" title="식단 일지"></Accordion>
      <Accordion type="walk" title="산책"></Accordion>
      <Accordion type="other-journals" title="기타 활동 일지"></Accordion>
    </section>
  )
}
