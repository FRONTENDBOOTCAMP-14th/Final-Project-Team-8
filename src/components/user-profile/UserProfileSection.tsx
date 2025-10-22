import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/button/Button'
import { CameraButton } from '@/components/ui/button/IconButton'
import type { UserData } from '@/hooks/useUserData'

export default function UserProfileSection(userData: Partial<UserData>) {
  return (
    <section className="flex w-full items-center gap-8">
      {/* Main profile circle */}
      <div className="relative z-10">
        <div className="aspect-square w-30 overflow-hidden rounded-full bg-gray-100 outline-10 outline-gray-100">
          {userData?.profile_img ? (
            <Image
              src={userData.profile_img}
              alt="Pet profile preview"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <svg
                className="h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Camera button */}
        <CameraButton />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">{userData?.nickname}</div>
          <Button
            variant="white"
            className="max-w-fit min-w-fit rounded-[19px] p-0.5"
          >
            <SquarePen className="w-[20px]" />
          </Button>
        </div>
      </div>
    </section>
  )
}
