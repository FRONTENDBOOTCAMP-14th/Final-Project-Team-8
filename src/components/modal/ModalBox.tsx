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
import ModalDetail, { ModalDetailInput } from './Modal-detail'

type Props = PropsWithChildren<{
  /** 모달 상단 제목 */
  title: string
  modalDetail: boolean
}>

export default function ModalBox({
  title,
  modalDetail = true,
  children,
}: Props) {
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
        {/* ✅ 상세 및 특이사항 컴포넌트 */}
        {modalDetail && <ModalDetail isModify={isModify}></ModalDetail>}
        <ModalDetailInput isModify={isModify}></ModalDetailInput>
        {/* ✅ 하단 children 삽입영역 */}
        <div>{children}</div>
      </Modal>
    </div>
  )
}

type ModalBoxInputProps = PropsWithChildren<{
  /** 모달 상단 제목 */
  pleaceholder?: string
}>

export function ModalBoxInput({ pleaceholder, children }: ModalBoxInputProps) {
  const [isOpen, toggleHandler] = useToggleState(false)
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
        title={''}
        isModify={isModify}
        setModify={setModify}
      >
        <ModalDetailInput isModify={isModify}></ModalDetailInput>
        {/* ✅ 하단 children 삽입영역 */}
        <div>{children}</div>
      </Modal>
    </div>
  )
}
