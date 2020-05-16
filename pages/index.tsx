import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

function HomePage() {
  const router = useRouter()
  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/insects')
    }
  }, [router])
  return (
    <>
      <Head>
        <title>Critterpedia</title>
        <meta name='description' content='An overview of all fish and bugs in Animal Crossing: New Horizons' />
      </Head>
    </>
  )
}

export default HomePage
