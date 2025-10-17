import type { ComponentProps } from 'react'

/**
 * ButtonVariant 타입
 * - white: 흰색 배경, 주황 아웃라인, 주황 텍스트
 * - orange: 주황 배경, 흰색 텍스트 (기본값)
 * - transparent: 투명 배경, 주황 텍스트
 */

type ButtonVariant = 'white' | 'orange' | 'transparent'

/**
 * Button 컴포넌트 props
 * React 기본 <button> 속성을 상속받으며,
 * `variant`를 통해 버튼 색상을 선택할 수 있습니다.
 *
 * - white: 흰색 배경, 주황 아웃라인, 주황 텍스트
 * - orange: 주황 배경, 흰색 텍스트 (기본값)
 * - transparent: 투명 배경, 주황 텍스트
 * 기본값: orange
 */

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
}

const baseStyle = `
cursor-pointer
flex flex-row items-center justify-center
min-w-40 w-full h-[54px] p-[17px]
text-[14px]
rounded-[14px]
focus:outline-none focus:ring-2 focus:ring-offset-0
`

const variantStyle: Record<ButtonVariant, string> = {
  orange: [
    'bg-[#FF6000] text-white',
    'hover:bg-[#C85712]',
    'focus:ring-[#803C0C] ',
    'active:bg-[#803C0C]',
    'disabled:bg-[#FFD8C0] disabled:text-[#80809A]',
  ].join(' '),
  white: [
    'bg-white outline-1 outline-[#FF6000] text-[#FF6000]',
    'hover:text-[#C85712] hover:bg-[#ECECF2]',
    'focus:ring-[#FFA873] focus:text-[#C85712]',
    'active:text-[#803C0C]',
    'disabled:text-[#FFA873],  outline-[#FFA873]',
  ].join(' '),
  transparent: [
    'bg-transparent text-[#FF6000]',
    'hover:text-[#C85712]',
    'focus:ring-[#FFA873] focus:text-[#C85712]',
    'active:text-[#803C0C]',
    'disabled:text-[#FFA873]',
  ].join(' '),
}

/**
 *  * Button 컴포넌트 props
 * React 기본 <button> 속성을 상속받으며,
 * `variant`를 통해 버튼 색상을 선택할 수 있습니다.
 *
 * - white: 흰색 배경, 주황 아웃라인, 주황 텍스트
 * - orange: 주황 배경, 흰색 텍스트 (기본값)
 * - transparent: 투명 배경, 주황 텍스트
 * 기본값: orange
 *
 * 공통 Button 컴포넌트 사용 예시
 *
 * ```tsx
 * <Button variant="white" onClick={() => console.log('clicked')}>
 *   확인
 * </Button>
 * ```
 */

export default function Button({
  children,
  variant = 'orange',
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle[variant]} ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
}
