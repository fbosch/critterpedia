import React from 'react'
import styled from 'styled-components'
import CardLabel from '../CardLabel'
import Head from 'next/head'
import CreatePageGrid from './CreaturePageGrid'
import Seasonality from './Seasonality'
import Time from './Time'

export default function CreaturePage(props) {
  const { id, name, group, northern, time } = props
  const season = northern
  return (
    <>
      <Head>
        <title>
          {name} • {group.charAt(0).toUpperCase() + group.slice(1)} • Critterpedia
        </title>
      </Head>
      <CreatePageGrid>
        <header>
          <h1>
            <CardLabel title={name} />
          </h1>
        </header>
        <picture>
          <img src={`/assets/images/${group}/photos/${id}.png`} loading='lazy' />
        </picture>
        <Seasonality season={season} />
        <Time time={time} />
      </CreatePageGrid>
    </>
  )
}
