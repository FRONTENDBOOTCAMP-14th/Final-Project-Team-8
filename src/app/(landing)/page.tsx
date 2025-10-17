import ContentCard from '@/components/ui/ContentCard'

export default function LandingPage() {
  return (
    <div>
      <ContentCard title="우리 아이 맞춤 프로필">
        <p>사랑하는 반려동물의 특별한 프로필을 만들어보세요</p>
        <p>이름, 품종, 나이를 공유하고 다른 반려인들과 소통해보세요</p>
      </ContentCard>
    </div>
  )
}

export const metadata = {
  title: 'Paw Buddy - 랜딩페이지',
  description: '반려동물의 프로필을 만들고 통합 관리 사이트를 이용해보세요.',
  openGraph: {
    title: 'Paw Buddy',
    description: '반려동물 종합 관리 사이트',
    url: 'https://pawbuddy.example.com/landing',
    siteName: 'Paw Buddy',
    type: 'website',
    // 추후변경
    images: ['/assets/logo/Logo-Paw-Buddy-col.svg'],
  },
}
