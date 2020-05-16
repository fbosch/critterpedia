import { useRouter } from 'next/router'
import Head from 'next/head'

async function fetchBugs() {
  const bugs = await require('../../public/data/bugs.json')
  return bugs
}

export async function getStaticPaths() {
  const bugs = await fetchBugs()
  const paths = bugs.map(({ id }) => ({ params: { id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const bugs = await fetchBugs()
  const info = bugs.find(({ id }) => id === params.id)
  return { props: { info } }
}

const Fish = ({ info }) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{info.name} • Insects • Critterpedia </title>
      </Head>
      <p>
        {id} {JSON.stringify(info)}{' '}
      </p>
    </>
  )
}

export default Fish
