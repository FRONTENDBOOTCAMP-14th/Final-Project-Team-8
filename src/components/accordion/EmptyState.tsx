// components/common/EmptyState.tsx
'use client'

import { AlertCircle, Inbox } from 'lucide-react'
import type { ReactNode } from 'react'
import Button from '@/components/ui/button/Button'
import { getUserData } from '../../libs/api/user'
import { createClient } from '../../libs/supabase/client'
import { tw } from '../../utils/shared'

type IconType = 'inbox' | 'alert' | 'custom'

export interface EmptyStateProps {
  /** 큰 제목 */
  title?: string
  /** 보조 설명 문구 */
  message?: string
  /** 아이콘: 기본 프리셋 또는 custom(직접 JSX 전달) */
  icon?: IconType
  /** icon === 'custom'일 때 사용할 JSX */
  customIcon?: ReactNode
  /** 메인 액션 버튼 라벨 */
  actionLabel?: string
  /** 메인 액션 클릭 핸들러 */
  onAction?: () => void
  /** 서브 액션(여러 개 가능): 링크/버튼 등 JSX를 직접 주입 */
  secondaryActions?: ReactNode
  /** children을 넣으면 message 아래에 커스텀 UI 렌더 */
  children?: ReactNode
  /** 크기: 컴팩트/기본/라지 */
  size?: 'sm' | 'md' | 'lg'
  /** 외곽선 카드 스타일 여부 */
  outlined?: boolean
  /** 추가 className */
  className?: string
}

export default function EmptyState({
  title = '데이터가 없습니다',
  message = '조건을 바꾸거나 새 항목을 추가해 보세요.',
  icon = 'inbox',
  customIcon,
  actionLabel,
  onAction,
  secondaryActions,
  children,
  size = 'md',
  outlined = false,
  className,
}: EmptyStateProps) {
  const Icon = icon === 'inbox' ? Inbox : icon === 'alert' ? AlertCircle : null

  const sizeClasses =
    size === 'sm'
      ? {
          icon: 'h-10 w-10',
          title: 'text-lg',
          msg: 'text-sm',
          gap: 'gap-2',
          pad: 'p-6',
        }
      : size === 'lg'
        ? {
            icon: 'h-16 w-16',
            title: 'text-2xl',
            msg: 'text-base',
            gap: 'gap-4',
            pad: 'p-10',
          }
        : {
            icon: 'h-12 w-12',
            title: 'text-xl',
            msg: 'text-sm',
            gap: 'gap-3',
            pad: 'p-8',
          }

  return (
    <div
      className={tw(
        'flex w-full items-center justify-center',
        outlined ? 'rounded-2xl border border-gray-200 bg-white' : '',
        sizeClasses.pad,
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={tw(
          'flex flex-col items-center text-center',
          sizeClasses.gap
        )}
      >
        <div className="flex items-center justify-center rounded-full bg-gray-100 p-3">
          {icon === 'custom' && customIcon}
          {Icon && (
            <Icon
              className={tw('text-gray-400', sizeClasses.icon)}
              aria-hidden
            />
          )}
        </div>

        {title && (
          <h3 className={tw('font-semibold text-gray-800', sizeClasses.title)}>
            {title}
          </h3>
        )}
        {message && (
          <p className={tw('max-w-md text-gray-500', sizeClasses.msg)}>
            {message}
          </p>
        )}

        {children}

        {(actionLabel ?? secondaryActions) && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {actionLabel && <Button onClick={onAction}>{actionLabel}</Button>}
            {secondaryActions}
          </div>
        )}
      </div>
    </div>
  )
}
