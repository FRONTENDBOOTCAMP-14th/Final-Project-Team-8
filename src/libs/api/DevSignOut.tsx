'use client'

import { createClient } from '../supabase/client'

export default function DevSignOut() {
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload() // 새로고침 -> 세션 반영
  }

  return (
    <button
      type="button"
      className="cursor-pointer rounded bg-gray-200 p-2"
      onClick={handleSignOut}
    >
      🔒 개발용 로그아웃
    </button>
  )
}
