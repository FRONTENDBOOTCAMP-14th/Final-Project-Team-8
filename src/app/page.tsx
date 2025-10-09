import Accordion from '../components/accordion/accordion'

export default function HomePage() {
  return (
    <section>
      {/* <LearnSection title="랜덤 카운트 업">
        <RandomCountUp />
      </LearnSection> */}

      <Accordion type="vaccines" title="예방접종"></Accordion>
      <Accordion type="antiparasitic" title="구충 치료"></Accordion>
      <Accordion type="medical treatment" title="의료 처치"></Accordion>
      <Accordion type="other treatments" title="기타 치료"></Accordion>
      <Accordion type="diet" title="식단 일지"></Accordion>
      <Accordion type="other activities" title="기타 활동"></Accordion>
      <Accordion type="walks" title="산책"></Accordion>
    </section>
  )
}
