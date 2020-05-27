import * as React from 'react'
import CardEntry from '../../components/CardEntry'
import { useMemo } from 'react'
import btoa from '../../utils/btoa'
import CardGrid from '../../components/CardGrid'
import { useRouter, NextRouter } from 'next/router'
import Head from 'next/head'
import searchCritter from '../../utils/search'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const insects = await require('../../public/data/bugs.json')
  return { props: { insects } }
}

import(`../../public/assets/images/insects/icons/orchidmantis.png`)

const insectSVG = (color: string): string =>
  btoa(
    '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 51"><path d="M29 17.5c5.865 7.217 5.906 19.668.758 24.113S11.304 39.806 5.439 32.59C-.426 25.372-2.06 12.995 3.087 8.55S23.135 10.283 29 17.5z" fill="' +
      color +
      '"/><path d="M26.84 46.126c-3.806 3.908-12.531 6.648-15.564 3.509-3.034-3.139-.402-10.13 3.404-14.038 3.806-3.909 11.287-5.144 14.32-2.006 3.033 3.139 1.646 8.626-2.16 12.535zM22.352 3.51c0 1.66-3.309 2.005-5.726 2.005-2.418 0-3.891-.845-3.891-2.507 0-1.661 0-2.508 3.89-2.508 2.418 0 5.727 1.348 5.727 3.01z" fill="' +
      color +
      '"/><path d="M25.38 5.014l-3.89-3.009-2.432-1.002V5.38L21.489 6l.863 2.022 1.083 2.507v3.51L29 17.5V12l-.758-1.471L26.84 7.52l-1.46-2.506zM29 18c-5.865 7.217-5.906 19.168-.758 23.613s18.454-1.807 24.319-9.024c5.865-7.217 7.5-19.594 2.352-24.039S34.865 10.783 29 18z" fill="' +
      color +
      '"/><path d="M31.16 46.126c3.806 3.908 12.531 6.648 15.564 3.509 3.034-3.139.402-10.13-3.404-14.038-3.806-3.909-11.287-5.144-14.32-2.006-3.033 3.139-1.646 8.626 2.16 12.535zM35.648 3.51c0 1.66 3.309 2.005 5.726 2.005 2.418 0 3.891-.845 3.891-2.507 0-1.661 0-2.508-3.89-2.508-2.418 0-5.727 1.348-5.727 3.01z" fill="' +
      color +
      '"/><path d="M32.62 5.014l3.957-3.009 2.365-1.002V5.38L37 6l-1.462 2.022-.973 2.507v3.51L29 18v-6l.758-1.471L31.16 7.52l1.46-2.506z" fill="' +
      color +
      '"/></svg>'
  )

type Props = {
  insects: Critter[]
}

function InsectsPage({ insects }: Props): JSX.Element {
  const router: NextRouter = useRouter()

  const insectCollection: JSX.Element[] = useMemo(() => {
    let parsedInsects = insects
    if (router?.query?.search?.length > 2) {
      parsedInsects = searchCritter(insects, router.query.search as string)
    }
    parsedInsects = parsedInsects.map((insect) => ({ id: insect.id, name: insect.name, price: insect.price }))
    return parsedInsects.map((creature, index) => {
      return (
        <CardEntry
          fallback={insectSVG}
          group='insects'
          key={creature.id}
          id={creature.id}
          {...creature}
          title={creature.name}
          image={`/assets/images/insects/icons/${creature.id}.png`}
          showSpacer={index === insects.length - 1}
        />
      )
    })
  }, [insects, router.query])

  return (
    <>
      <Head>
        <title>Insects • Critterpedia</title>
        <meta name='description' content='An overview of all insects in Animal Crossing: New Horizons' />
      </Head>
      <CardGrid key={insectCollection.length}>{insectCollection}</CardGrid>
    </>
  )
}

export default InsectsPage
