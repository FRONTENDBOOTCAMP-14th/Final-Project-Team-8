import { LearnSection } from '../components'
import RandomCountUp from '../demo'

export default function HomePage() {
  return (
    <div>
      <section>
        <LearnSection title="랜덤 카운트 업">
          <RandomCountUp />
        </LearnSection>
      </section>

      <section id="modal-dialog-portal"></section>
    </div>
  )
}
