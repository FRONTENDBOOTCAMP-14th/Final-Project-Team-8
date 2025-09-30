import { ComponentProps } from 'react'
import DogSizeIcon from '../icons/DogSizeIcon'

/**
 * CardButtonVariant 타입
 * -sm: 소형견
 * -md: 중형견
 * -lg: 대형견
 *
 */
type CardButtonVariant = 'sm' | 'md' | 'lg'

interface CardButtonProps extends ComponentProps<'button'> {
  dogSize?: CardButtonVariant
}

const baseStyle = `
flex flex-col items-center justify-center
w-[156px] h-[200px] m-[30px] p-[30px]
rounded-[18px] text-[#FF6000] bg-white
focus:outline-none focus:ring-2 focus:ring-offset-0
`

const variantStyle: Record<
  CardButtonVariant,
  { title: string; weight: string; imgSrc: string }
> = {
  sm: {
    title: '소형견',
    weight: '14kg 미만',
    imgSrc: '/assets/button-icons/sizeSmall.svg',
  },
  md: {
    title: '중형견',
    weight: '14-25kg',
    imgSrc: '/assets/button-icons/sizeMedium.svg',
  },
  lg: {
    title: '대형견',
    weight: '25kg 이상',
    imgSrc: '/assets/button-icons/sizeLarge.svg',
  },
}

/**
 *  * Card Button 컴포넌트 props
 * React 기본 <button> 속성을 상속받으며,
 * `dogSize`를 통해 크기를 선택할 수 있습니다.
 *
 * -sm: 소형견
 * -md: 중형견
 * -lg: 대형견
 *
 * 기본값: md
 *
 * Card Button 컴포넌트 사용 예시
 *
 * ```tsx
 * <CardButton dogSize="sm" onClick={() => console.log('clicked')}>
 * </CardButton>
 * ```
 */
export default function CardButton({
  children,
  dogSize = 'md',
  className,
  ...restProps
}: CardButtonProps) {
  const { title, weight } = variantStyle[dogSize]

  return (
    <button
      type="button"
      className={`${baseStyle} group ${className}`}
      {...restProps}
    >
      <DogSizeIcon
        size={dogSize}
        className="text-gray-600 group-focus:text-[#FF6000]"
        rectColor="text-gray-100 group-focus:text-[#FFD8C0]"
      ></DogSizeIcon>
      <span className="mt-3.5 text-[20px] font-bold text-gray-800 group-focus:text-[#FF6000]">
        {title}
      </span>
      <span className="text-[18px] text-gray-600 group-focus:text-[#FF6000]">
        {weight}
      </span>
    </button>
  )
}
