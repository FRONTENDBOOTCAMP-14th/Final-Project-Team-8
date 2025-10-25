import { SquarePen } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/button/Button'
import type { Pet } from '@/store/petStore'
import PetProDetailEditSection from './edit-form/PetDetailEditSection'
import PetDetailSection from './PetDetailSection'

interface PetProfileSectionProps {
  selectedPet: Pet
}

export default function PetProfileSection({
  selectedPet,
}: PetProfileSectionProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [localPetData, setLocalPetData] = useState<Partial<Pet>>(
    selectedPet ?? {}
  )

  function onCancel() {
    setIsEditMode(false)
  }

  useEffect(() => {
    if (selectedPet) {
      setLocalPetData(selectedPet)
    }
  }, [selectedPet])
  return (
    <>
      {/* 프로필 사진 부분 */}
      <section className="flex w-full items-center gap-8">
        <img
          src={selectedPet.profile_img ?? '/assets/img/default-profile.png'}
          alt={selectedPet.name}
          className="aspect-square w-30 rounded-full outline-10 outline-gray-100"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">{selectedPet.name}</div>
            <Button
              variant="white"
              className="max-w-fit min-w-fit rounded-[19px] p-0.5"
            >
              <SquarePen className="w-[20px]" />
            </Button>
          </div>
          <p className="text-gray-500">
            {selectedPet.species} | {selectedPet.breed}
          </p>
        </div>
      </section>

      {/* 상세정보 */}
      <div className="h-full w-full">
        {isEditMode ? (
          <PetProDetailEditSection
            petId={selectedPet.id}
            petData={localPetData}
            onCancel={() => onCancel()}
            onSaveSuccess={(updatedData: Partial<Pet>) => {
              setLocalPetData(updatedData)
              onCancel()
            }}
          />
        ) : (
          <PetDetailSection selectedPet={localPetData} />
        )}
        {!isEditMode && (
          <Button
            variant="white"
            onClick={() => {
              setIsEditMode(true)
            }}
            className="absolute bottom-0"
          >
            계정 정보 수정하기
          </Button>
        )}
      </div>
    </>
  )
}
