import React from 'react'
import Location from './Location'
import CardLabel from '../CardLabel'
import Head from 'next/head'
import CritterPageGrid from './CritterPageGrid'
import Seasonality from './Seasonality'
import Time from './Time'

export default function CreaturePage(props) {
  const { id, name, group, northern, time, location, vertical } = props
  const season = northern
  return (
    <>
      <Head>
        <title>
          {name} • {group.charAt(0).toUpperCase() + group.slice(1)} • Critterpedia
        </title>
      </Head>
      <CritterPageGrid vertical={vertical}>
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
        <Location location={location} />
      </CritterPageGrid>
    </>
  )
}
