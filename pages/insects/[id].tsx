import { useRouter } from 'next/router'
import CreaturePage from '../../components/CreaturePage'

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
  return <CreaturePage {...info} key={id} group='insects' />
}

export default Fish
