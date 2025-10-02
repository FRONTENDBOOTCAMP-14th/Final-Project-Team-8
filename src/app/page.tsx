import ModalBox from '../components/modal/ModalBox'

export default function HomePage() {
  return (
    <div>
      <section>
        {/* <LearnSection title="랜덤 카운트 업">
          <RandomCountUp />
        </LearnSection> */}
        <h1 className="m-5 text-center text-3xl font-bold">
          <span className="rounded-2xl bg-indigo-200 pt-2 pr-3 pb-2 pl-3 text-indigo-600">
            모달 제작
          </span>
        </h1>
        <div>
          <ModalBox title="다이얼로그 제목이지요~">
            <div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Delectus, doloremque. Eligendi dolorum obcaecati impedit sequi.
                Ea quia doloremque praesentium est iure? Corrupti nostrum libero
                eaque, aperiam debitis reiciendis facilis neque!
              </p>
              <input
                type="text"
                className="rounded-md border-2 border-indigo-300 p-2 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                className="m-3 rounded-lg bg-indigo-300 p-2 text-xl text-white transition hover:bg-indigo-500 active:scale-[0.95]"
              >
                aaa
              </button>
            </div>
          </ModalBox>

          <ul>
            <li></li>
          </ul>
        </div>
      </section>
      <section id="modal-dialog-portal" aria-live="assertive"></section>
    </div>
  )
}
