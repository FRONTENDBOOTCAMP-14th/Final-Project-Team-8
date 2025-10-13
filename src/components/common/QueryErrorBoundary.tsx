'use client'

import { Component, ReactNode } from 'react'
import { toast } from 'sonner'

/**
 * 🔒 QueryErrorBoundary
 *
 * React의 공식 Error Boundary는 2025년 현재까지 **클래스 컴포넌트**에서만 지원됩니다.
 * (함수형 컴포넌트에서는 try/catch로 렌더링 에러를 잡을 수 없음)
 *
 * React Query + Suspense 환경에서는 데이터 패칭 중 발생한 에러가 throw되며,
 * 이 컴포넌트가 그것을 catch하여 UI를 안전하게 대체합니다.
 *
 * ⚙️ 동작 개요
 *  - 내부에서 getDerivedStateFromError / componentDidCatch 메서드로 렌더 중 발생한 에러를 잡습니다.
 *  - 에러 발생 시 toast로 사용자에게 안내하고, fallback UI를 출력합니다.
 *  - 자식에서 다시 시도 시에는 부모에서 QueryClient가 자동으로 재시도하게 됩니다.
 *
 * 🧩 함수형 대체 방안 (참고)
 *  - React 19 이후에는 함수형 ErrorBoundary 지원 예정.
 *  - React Query만 다룰 경우 `react-error-boundary` + `useQueryErrorResetBoundary()` 조합으로
 *    함수형 버전을 대체 구현할 수 있습니다.
 *  - 단, 그 방식은 "React 전체 렌더 에러"는 잡지 못하고, "React Query 내부 fetch 에러"에만 동작합니다.
 */

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { error: Error | null }

export default class QueryErrorBoundary extends Component<Props, State> {
  // 현재 발생한 에러를 저장할 state
  state: State = { error: null }

  /**
   * React Error Boundary의 필수 static 메서드
   * - 렌더 중 에러가 발생하면 호출되어 state를 업데이트합니다.
   */
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  /**
   * 실제 에러 발생 시 호출되는 메서드
   * - side effect (toast 노출 등)를 수행할 수 있습니다.
   */
  componentDidCatch(error: Error) {
    toast.error('데이터를 불러오지 못하였습니다. : ' + error.message)
  }

  /**
   * 렌더링
   * - 에러가 있다면 fallback UI 또는 기본 문구를 표시합니다.
   * - 에러가 없으면 자식 컴포넌트를 그대로 렌더합니다.
   */
  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="p-4 text-sm text-red-600">불러오기 실패</div>
        )
      )
    }
    return this.props.children
  }
}
