'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Toaster } from 'sonner'

export default function ToasterPortal() {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    // 모달 상태를 감지하는 MutationObserver
    const modalPortal = document.getElementById('modal-dialog-portal')
    if (modalPortal) {
      const observer = new MutationObserver(() => {
        setIsModalOpen(modalPortal.children.length > 0)
      })
      observer.observe(modalPortal, { childList: true })

      return () => observer.disconnect()
    }
    return undefined
  }, [])

  if (!mounted) return null

  // 모달이 열려있으면 토스트를 숨김
  if (isModalOpen) return null

  return createPortal(
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        style: {
          zIndex: 9999,
          backgroundColor: '#ffe6eb',
          color: '#c81e4b',
          border: '1px solid #f9b6c2',
          fontWeight: 600,
          borderRadius: '10px',
          padding: '12px 18px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          fontSize: '16px',
        },
      }}
    />,
    document.body
  )
}
