import ModalBox from '../components/modal/ModalBox'

export default function HomePage() {
  return (
    <div>
      <section>
        {/* <LearnSection title="랜덤 카운트 업">
          <RandomCountUp />
        </LearnSection> */}
        <ModalBox title="모달" modalDetail={false}></ModalBox>
      </section>

      <section id="modal-dialog-portal"></section>
    </div>
  )
}
