import { ComponentProps } from 'react'
/**
 * ImgCardButton에서 사용할 버튼 종류
 * - 'species': 동물 종 선택 버튼
 * - 'breeds': 동물 품종 선택 버튼
 */
type ImgCardButtonType = 'species' | 'breeds'

/**
 * 동물 종 선택 옵션
 */
type SpeciesVariants =
  | 'dog'
  | 'cat'
  | 'fish'
  | 'bird'
  | 'hamster'
  | 'rabbit'
  | 'reptile'
  | 'other'

/**
 * 동물 품종 선택 옵션
 */
type BreedVariants =
  | 'mixed'
  | 'afghan hound'
  | 'akita'
  | 'beagle '
  | 'maltese'
  | 'border collie'
  | 'boxer'
  | 'chow chow'
  | 'dalmatian'
  | 'dachshund'
  | 'golden retriever'
  | 'samoyed'

/**
 * ImgCardButton 컴포넌트의 props 타입
 *
 * 버튼에 표시될 type
 * kind: 종(species) /종류(breed)
 * variant : 세부 분류
 */
interface ImgCardButtonProps extends ComponentProps<'button'> {
  kind?: ImgCardButtonType
  variant?: SpeciesVariants | BreedVariants
}

const baseStyle = `
flex flex-col items-center position-relative
w-[220px] h-[225px] pt-[20px] py-4
rounded-[18px] text-[#3A394F]  bg-white
focus:outline-0 focus:ring-2 focus:ring-offset-0 focus:ring-[#FF6000]
`
/**
 * 버튼에 표시할 이미지와 타이틀 데이터
 */
export const imgcardButtonVariants: Record<
  ImgCardButtonType,
  Record<string, { title: string; imgSrc: string }>
> = {
  species: {
    dog: { title: '강아지', imgSrc: '/assets/button-img/dog.png' },
    cat: { title: '고양이', imgSrc: '/assets/button-img/cat.png' },
    fish: { title: '물고기', imgSrc: '/assets/button-img/fish.png' },
    bird: { title: '새', imgSrc: '/assets/button-img/bird.png' },
    hamster: { title: '햄스터', imgSrc: '/assets/button-img/hamster.png' },
    rabbit: { title: '토끼', imgSrc: '/assets/button-img/rabbit.png' },
    reptile: { title: '파충류', imgSrc: '/assets/button-img/reptile.png' },
    other: { title: '기타', imgSrc: '/assets/button-img/other.png' },
  },
  breeds: {
    mixed: { title: '믹스견', imgSrc: '/assets/button-img/breed/mixed.png' },
    'afghan hound': {
      title: '아프간 하운드',
      imgSrc: '/assets/button-img/breed/afghan-hound.png',
    },
    akita: { title: '아키타', imgSrc: '/assets/button-img/breed/akita.png' },
    beagle: { title: '비글', imgSrc: '/assets/button-img/breed/beagle.png' },
    maltese: {
      title: '말티즈',
      imgSrc: '/assets/button-img/breed/maltese.png',
    },
    'border collie': {
      title: '보더 콜리',
      imgSrc: '/assets/button-img/breed/border-collie.png',
    },
    boxer: { title: '복서', imgSrc: '/assets/button-img/breed/boxer.png' },
    'chow chow': {
      title: '차우차우',
      imgSrc: '/assets/button-img/breed/chow-chow.png',
    },
    dalmatian: {
      title: '달마시안',
      imgSrc: '/assets/button-img/breed/dalmatian.png',
    },
    dachshund: {
      title: '닥스훈트',
      imgSrc: '/assets/button-img/breed/dachshund.png',
    },
    'golden retriever': {
      title: '골든 리트리버',
      imgSrc: '/assets/button-img/breed/golden-retriever.png',
    },
    samoyed: {
      title: '사모예드',
      imgSrc: '/assets/button-img/breed/samoyed.png',
    },
  },
} as const

type VariantData = (typeof imgcardButtonVariants)['species']['other']
/**
 * ImgCardButton 컴포넌트
 * - 동물 종 또는 품종을 선택할 수 있는 카드 버튼
 *
 * - 사용예시
 * ```tsx
 * <ImgCardButton kind='species' variant='dog' onClick={() => alert("강아지 선택")} />
 * * <ImgCardButton kind='breeds' variant='mixed' onClick={() => alert("믹스견 선택")} />
 * ```
 */
export default function ImgCardButton({
  children,
  kind = 'species',
  variant = 'other',
  className,
  ...restProps
}: ImgCardButtonProps) {
  const { title, imgSrc } = (imgcardButtonVariants[kind][
    variant as keyof (typeof imgcardButtonVariants)[typeof kind]
  ] ?? imgcardButtonVariants.species.other) as VariantData

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
