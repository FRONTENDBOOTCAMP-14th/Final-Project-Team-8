import type { ComponentProps } from 'react'
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
  isSelected?: boolean
}

const baseStyle = `
cursor-pointer
flex flex-col items-center justify-center
min-w-[156px] min-h-[200px] p-[30px]
rounded-[18px] bg-white shadow-md outline-1 outline-gray-200
focus:outline-none focus:ring-2 focus:ring-offset-0 focus:text-[#FF6000]
`
const selectedStyle = `
min-w-[200px] min-h-[260px]
text-[#FF6000] outline-none ring-2 ring-offset-0 `

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
  dogSize = 'md',
  className,
  isSelected,
  ...restProps
}: CardButtonProps) {
  const { title, weight } = variantStyle[dogSize]

  return (
    <button
      type="button"
      className={`${baseStyle} ${isSelected ? selectedStyle : ''} group ${className}`}
      {...restProps}
    >
      <DogSizeIcon
        size={dogSize}
        data-selected={isSelected}
        className={`${isSelected ? 'text-[#FF6000]' : 'text-gray-600'}`}
        rectColor={`${
          isSelected ? 'text-[#FFD8C0]' : 'text-gray-100'
        } group-focus:text-[#FFD8C0]`}
      ></DogSizeIcon>
      <span
        className={`mt-3.5 text-[20px] font-bold ${isSelected ? 'text-[#FF6000]' : 'text-gray-800'}`}
      >
        {title}
      </span>
      <span
        className={`${isSelected ? 'text-[#FF6000]' : 'text-gray-600'} text-[18px]`}
      >
        {weight}
      </span>
    </button>
  )
}
