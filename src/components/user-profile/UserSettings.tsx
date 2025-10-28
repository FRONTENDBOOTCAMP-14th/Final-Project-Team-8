import ToggleButton from '@/components/ui/button/toggleButton'

export default function UserSettings() {
  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl text-[18px] font-bold">환경 설정</h2>
        <ToggleButton title="라이트모드" />
      </section>
      <h3 className="text-xl text-[18px] font-bold">알림 설정</h3>
      <section className="flex flex-col gap-4">
        <ToggleButton title="푸시 알림" />
        <ToggleButton title="이메일 알림" />
      </section>
    </>
  )
}
