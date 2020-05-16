import React from 'react'
import styled from 'styled-components'
import CardLabel from '../CardLabel'
import Head from 'next/head'
import CreatePageGrid from './CreaturePageGrid'

export default function CreaturePage({ id, name, group }) {
  return (
    <>
      <Head>
        <title>{name} • Fish • Critterpedia </title>
      </Head>
      <CreatePageGrid>
        <header>
          <h1>
            <CardLabel title={name} />
          </h1>
        </header>
        <picture>
          <img src={`/assets/images/${group}/photos/${id}.png`} />
        </picture>
      </CreatePageGrid>
    </>
  )
}
