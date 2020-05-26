import * as React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import CritterPage from '../../components/CritterPage'

async function fetchFishes(): Promise<Critter[]> {
  const fishes = await require('../../public/data/fishes.json')
  return fishes
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fishes = await fetchFishes()
  const paths = fishes.map(({ id }) => ({ params: { id } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fishes = await fetchFishes()
  const info = fishes.find(({ id }) => id === params.id)
  const index = fishes.indexOf(info)
  const neighbours = { prev: fishes[index - 1]?.id ?? null, next: fishes[index + 1]?.id ?? null }
  return { props: { info, neighbours } }
}

type Props = {
  info: Critter
  neighbours: { prev: Critter; next: Critter }
}

const Fish = ({ info, neighbours }: Props): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  return <CritterPage {...info} key={id.toString()} group='fish' neighbours={neighbours} />
}

export default Fish
