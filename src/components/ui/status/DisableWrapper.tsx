import Image from 'next/image'

interface DisabledWrapperProps {
  disabled?: boolean
  children: React.ReactNode
}
export default function DisabledWrapper({
  disabled = false,
  children,
}: DisabledWrapperProps) {
  return (
    <div className="relative h-full w-full">
      {children}
      {disabled && (
        <div className="backdrop- absolute inset-0 z-10 cursor-not-allowed rounded-2xl bg-gray-300/50 saturate-50">
          <div className="absolute right-1 bottom-1 flex flex-col items-center p-10">
            <p className="text-xl font-bold text-[#2D2A40]">
              아직 개발중인 기능입니다!
            </p>
            <Image
              src="/assets/img/noPets2.svg"
              alt="개발중이에요"
              width={400}
              height={400}
            ></Image>
          </div>
        </div>
      )}
    </div>
  )
}
