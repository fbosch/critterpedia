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
  const index = fishes.indexOf(info)
  const neighbours = { prev: fishes[index - 1]?.id ?? null, next: fishes[index + 1]?.id ?? null }
  return { props: { info, neighbours } }
}

const Fish = ({ info, neighbours }) => {
  const router = useRouter()
  const { id } = router.query
  return <CritterPage {...info} key={id} group='fish' neighbours={neighbours} />
}

export default Fish
