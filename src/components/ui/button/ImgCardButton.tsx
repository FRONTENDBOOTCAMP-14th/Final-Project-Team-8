import { ComponentProps } from 'react'

type ImgCardButtonVariant =
  | 'dog'
  | 'cat'
  | 'fish'
  | 'bird'
  | 'hamster'
  | 'rabbit'
  | 'reptile'
  | 'other'

/**
 * ImgCardButton 컴포넌트의 props 타입
 *
 *    버튼에 표시될 동물 종 (기본값: 'other')
 */
interface ImgCardButtonProps extends ComponentProps<'button'> {
  species?: ImgCardButtonVariant
}

const baseStyle = `
flex flex-col items-center position-relative
w-[220px] h-[225px] m-[30px] pt-[20px] py-4
rounded-[18px] text-[#3A394F]  bg-white
focus:outline-0 focus:ring-2 focus:ring-offset-0 focus:ring-[#FF6000]
`

const variant: Record<ImgCardButtonVariant, { title: string; imgSrc: string }> =
  {
    dog: { title: '강아지', imgSrc: '/assets/button-img/dog.png' },
    cat: { title: '고양이', imgSrc: '/assets/button-img/cat.png' },
    fish: { title: '물고기', imgSrc: '/assets/button-img/fish.png' },
    bird: { title: '새', imgSrc: '/assets/button-img/bird.png' },
    hamster: {
      title: '햄스터',
      imgSrc: 'assets/button-img/hamster.png',
    },
    rabbit: { title: '토끼', imgSrc: '/assets/button-img/rabbit.png' },
    reptile: {
      title: '파충류',
      imgSrc: '/assets/button-img/reptile.png',
    },
    other: { title: '기타', imgSrc: '/assets/button-img/other.png' },
  }

/**
 * ImgCardButton 컴포넌트
 *
 * 동물 종을 시각적으로 선택할 수 있는 카드 버튼 컴포넌트입니다.
 * 내부에는 종 이름(title)과 이미지(imgSrc)가 표시됩니다.
 *
 * - 사용할 수 있는 동물 옵션
 * 강아지, 고양이, 물고기, 새, 햄스터, 토끼, 파충류, 기타
 *
 * - 사용예시
 * ```tsx
 * <ImgCardButton species="dog" onClick={() => alert("강아지 선택")}/>
 * ```
 */
export default function ImgCardButton({
  children,
  species = 'other',
  className,
  ...restProps
}: ImgCardButtonProps) {
  const { title, imgSrc } = variant[species]

  return (
    <button
      type="button"
      className={`${baseStyle} group ${className} overflow-hidden`}
      {...restProps}
    >
      <span className="mt-3.5 text-[20px] font-bold text-gray-800 group-focus:text-[#FF6000]">
        {title}
      </span>
      <img src={imgSrc} alt={title} />
    </button>
  )
}
