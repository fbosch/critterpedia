import * as React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import CritterPage from '../../components/CritterPage'

async function fetchBugs() {
  const bugs = await require('../../public/data/bugs.json')
  return bugs
}

export const getStaticPaths: GetStaticPaths = async () => {
  const bugs = await fetchBugs()
  const paths = bugs.map(({ id }) => ({ params: { id } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bugs = await fetchBugs()
  const info = bugs.find(({ id }) => id === params.id)
  const index = bugs.indexOf(info)
  const neighbours = { prev: bugs[index - 1]?.id ?? null, next: bugs[index + 1]?.id ?? null }
  return { props: { info, neighbours } }
}

type Props = {
  info: Critter
  neighbours: Critter[]
}

const Fish = ({ info, neighbours }: Props): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  return <CritterPage {...info} key={id} group='insects' neighbours={neighbours} vertical />
}

export default Fish
