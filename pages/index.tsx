import React, { useEffect } from 'react'
import { useRouter } from '../hooks/useRouter'

function HomePage() {
  const router = useRouter()
  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/insects')
    }
  }, [router])
  return null
}

export default HomePage