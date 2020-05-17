import { useRouter } from 'next/router'
import CritterPage from '../../components/CritterPage'

async function fetchFishes() {
  const fishes = await require('../../public/data/fishes.json')
  return fishes
}

export async function getStaticPaths() {
  const fishes = await fetchFishes()
  const paths = fishes.map(({ id }) => ({ params: { id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const fishes = await fetchFishes()
  const info = fishes.find(({ id }) => id === params.id)
  return { props: { info } }
}

const Fish = ({ info }) => {
  const router = useRouter()
  const { id } = router.query
  return <CritterPage {...info} key={id} group='fish' />
}

export default Fish
