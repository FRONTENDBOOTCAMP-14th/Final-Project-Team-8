import ModalBox, { ModalBoxInput } from '../components/modal/ModalBox'

export default function HomePage() {
  return (
    <div>
      <section>
        {/* <LearnSection title="랜덤 카운트 업">
          <RandomCountUp />
        </LearnSection> */}
        <ModalBox title="모달" modalDetail={false}>
          <div>
            <h1>기본 타입이 없으면 아무것도 나오지 않아요!</h1>
            <div>
              <label htmlFor="input-A">아이디</label>
              <input type="text" id="input-A" />
            </div>
          </div>
        </ModalBox>
        <ModalBoxInput></ModalBoxInput>
      </section>

      <section id="modal-dialog-portal"></section>
    </div>
  )
}
