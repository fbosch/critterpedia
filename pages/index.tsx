import { useEffect } from 'react'
import { useRouter } from 'next/router'

function HomePage() {
  const router = useRouter()
  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/insects')
    }
  }, [router])
  return null
}

export default HomePage
