'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { toast } from 'sonner'
import PetProfileSection from '@/components/pet-profile/PetProfileSection'
import { DeleteButton } from '@/components/ui/button/IconButton'
import ConfirmModal from '@/components/ui/modal/ConfirmModal'
import {
  DeletedPet,
  EmptyPet,
  NotLogin,
  NotSelectedPet,
} from '@/components/ui/status/EmptyState'
import { LoadingPet } from '@/components/ui/status/Loading'
import { usePageStatus } from '@/hooks/usePageStatus'
import { deletePet } from '@/libs/api/pet'
import { petKeys } from '@/libs/qeury-key/petKey'
import { usePetStore } from '@/store/petStore'
import { useUserStore } from '@/store/userStore'

export default function PetProfileLayout({ children }: PropsWithChildren) {
  const { selectedPet, petList, fetchPetSummary } = usePetStore()
  const { user } = useUserStore()
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const deletePetMutation = useMutation<void, Error, string>({
    mutationFn: async (petId: string) => await deletePet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: petKeys.all })
      toast.success('삭제되었습니다.')
      if (user) {
        fetchPetSummary(user)
      }
      setIsDeleted(true)
      setIsDeleteModalOpen(false)
    },
    onError: () => {
      toast.error('삭제 실패')
    },
  })

  async function handleDelte(petId: string) {
    deletePetMutation.mutate(petId)
  }

  useEffect(() => {
    setIsDeleted(false)
  }, [selectedPet])

  const { isLoading } = usePageStatus()
  if (isLoading) return <LoadingPet />
  if (!user) return <NotLogin />
  if (petList.length === 0) return <EmptyPet />
  if (!selectedPet) return <NotSelectedPet />
  if (isDeleted) return <DeletedPet />

  return (
    <div className="flex h-full w-full gap-[30px] overflow-hidden">
      {/* 왼쪽 */}
      <div className="relative flex w-4/10 min-w-80 flex-col gap-8 overflow-y-auto pr-1">
        <h1 className="w-full text-[28px] font-bold">반려동물 프로필</h1>
        <PetProfileSection user={user} selectedPet={selectedPet} />
        {/* 삭제버튼 */}
        <DeleteButton
          className="absolute top-0.25 right-0.25"
          onClick={() => setIsDeleteModalOpen(true)}
        />
        {isDeleteModalOpen && (
          <ConfirmModal
            title="삭제확인"
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => handleDelte(selectedPet.id)}
          >
            <p>{selectedPet.name}의 정보를 삭제하시겠습니까?</p>
            <p className="text-[#FF6000]">삭제된 정보는 복구할 수 없습니다.</p>
          </ConfirmModal>
        )}
      </div>

      <div className="w-px bg-neutral-200"></div>
      {/* 오른쪽 */}
      {children}
    </div>
  )
}
