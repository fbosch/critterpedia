import { useRouter } from 'next/router'
import CritterPage from '../../components/CritterPage'

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
  const index = bugs.indexOf(info)
  const neighbours = { prev: bugs[index - 1]?.id ?? null, next: bugs[index + 1]?.id ?? null }
  return { props: { info, neighbours } }
}

const Fish = ({ info, neighbours }) => {
  const router = useRouter()
  const { id } = router.query
  return <CritterPage {...info} key={id} group='insects' neighbours={neighbours} vertical />
}

export default Fish
