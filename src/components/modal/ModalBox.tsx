'use client'

/**
 * ✅ ModalBox 컴포넌트
 * ---------------------------------------------
 * - 공통 모달 오픈/닫기 상태를 내부에서 관리.
 * - 수정 모드(isModify)까지 내부에서 제어.
 * - 페이지 컴포넌트에서 상태 관리 로직을 숨기고,
 *   <ModalBox>만 가져다 쓰면 바로 사용 가능.
 *
 * 💡 사용 예시:
 *
 * <ModalBox title="백신 접종 정보">
 *   <p>여기에 원하는 자식 컴포넌트를 넣을 수 있습니다.</p>
 * </ModalBox>
 *
 * - 버튼 "모달 열기" 클릭 시 모달 창이 열림.
 * - 모달 내부의 "수정" 버튼 클릭 시 입력 필드로 전환.
 * - "완료" 버튼 클릭 시 다시 읽기 모드로 복귀.
 *
 * ✨ 추가 팁:
 * - props.title: 모달 제목
 * - children: 모달 하단부에 삽입할 내용 (ex. 하단 버튼, 설명 등)
 */

import { PropsWithChildren, useState } from 'react'
import useToggleState from '../../hooks/useToggleState'
import Modal from './Modal'

type Props = PropsWithChildren<{
  /** 모달 상단 제목 */
  title: string
}>

export default function ModalBox({ title, children }: Props) {
  // ✅ 모달 열림/닫힘 상태 (토글 훅 사용)
  const [isOpen, toggleHandler] = useToggleState(false)

  // ✅ 수정 모드 여부
  const [isModify, setModify] = useState<boolean>(false)

  // ✅ 토글 함수 구조분해 (on = 열기, off = 닫기)
  const { on, off } = toggleHandler

  return (
    <div>
      {/* 모달 열기 버튼 */}
      <button
        type="button"
        onClick={on}
        className="m-3 cursor-pointer rounded-md bg-indigo-200 p-3 text-xl font-bold text-indigo-600 transition hover:bg-indigo-300 active:scale-[0.95]"
      >
        모달 {isOpen ? '닫기' : '열기'}
      </button>

      {/* Modal 컴포넌트 호출 */}
      <Modal
        open={isOpen}
        onClose={off}
        title={title}
        isModify={isModify}
        setModify={setModify}
      >
        {/* ✅ 주요 정보 섹션 */}
        <h2 className="text-[18px] font-bold text-gray-800">상세</h2>

        <dl className="gap flex items-center">
          {/* 구분선 */}
          <div className="inline-block h-[50px] w-[1px] bg-gray-300"></div>

          {/* Lot 정보 */}
          <div className="mt-3 mr-4 mb-3 ml-4 flex min-w-[50px] flex-col">
            <dt className="text-base text-gray-700">Lot</dt>
            {!isModify ? (
              <dd className="text-base font-bold text-gray-800">A583D01</dd>
            ) : (
              <input
                type="text"
                defaultValue="A583D01"
                className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
              />
            )}
          </div>

          {/* 구분선 */}
          <div className="ml-4 inline-block h-[50px] w-[1px] bg-gray-300"></div>

          {/* 접종 날짜 */}
          <div className="mt-3 mr-4 mb-3 ml-4 flex max-w-[210px] flex-col">
            <dt className="text-base text-gray-700">접종 날짜</dt>
            {!isModify ? (
              <dd className="text-base font-bold text-gray-800">
                <time dateTime="18.05.23">18.05.23</time>
              </dd>
            ) : (
              <input
                type="text"
                defaultValue="18.05.23"
                className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
              />
            )}
          </div>

          {/* 구분선 */}
          <div className="inline-block h-[50px] w-[1px] bg-gray-300"></div>

          {/* 유효기간 */}
          <div className="mt-3 mr-4 mb-3 ml-4 flex flex-col">
            <dt className="text-base text-gray-700">유효기간</dt>
            {!isModify ? (
              <dd className="text-base font-bold text-gray-800">18.09.2025</dd>
            ) : (
              <input
                type="text"
                defaultValue="18.09.2025"
                className="w-full rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
              />
            )}
          </div>
        </dl>

        {/* ✅ 특이사항 섹션 */}
        <h2 className="text-[18px] font-bold">특이 사항</h2>
        <div className="relative mt-3 mb-3 flex h-max w-full font-bold">
          {/* 세로 구분선 */}
          <span className="absolute inline-block h-full w-[1px] bg-gray-300"></span>

          {!isModify ? (
            <span className="ml-4">특이 사항 없음</span>
          ) : (
            <textarea
              defaultValue="특이 사항 없음"
              className="mr-4 ml-3 h-full grow rounded-md border-2 border-amber-400 p-1 focus:border-orange-500 focus:outline-none"
            ></textarea>
          )}
        </div>

        {/* ✅ 하단 children 삽입영역 */}
        <div>{children}</div>
      </Modal>
    </div>
  )
}
