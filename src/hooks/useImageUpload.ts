import { useRef, useState, type ChangeEvent } from 'react'

interface useImageUploadProps {
  initialUrl: string | null
  onChange?: (imgRef: string | null) => void
}

export default function useImageUpload({
  initialUrl,
  onChange,
}: useImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialUrl)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const open = () => inputRef.current?.click()

  const removeImage = () => {
    setImagePreview(null)
    onChange?.(null)
  }

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    // 이미지 파일 체크
    if (!file.type.startsWith('image/'))
      return alert('이미지 파일만 업로드 가능합니다')
    if (file.size > 5 * 1024 * 1024) return alert('5MB 이하만 가능')
    setSelectedFile(file)

    // 미리보기 처리
    const reader = new FileReader()
    reader.onloadend = () => {
      const imgRef = reader.result as string
      setImagePreview(imgRef)
      onChange?.(imgRef)
    }
    reader.readAsDataURL(file)
  }

  return {
    imagePreview,
    inputRef,
    open,
    removeImage,
    uploadImage,
    selectedFile,
  }
}
