import React from 'react'
import Location from './Location'
import CardLabel from '../CardLabel'
import Head from 'next/head'
import Navigation from './Navigation'
import CritterPageGrid from './CritterPageGrid'
import Seasonality from './Seasonality'
import Time from './Time'

const months: Months = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december',
}

type Props = Critter & {
  vertical?: boolean
  group?: string
  neighbours: { prev: Critter; next: Critter }
  key?: string | number
}

function getTrace(group, id) {
  if (process.env.NODE_ENV === 'production') {
    try {
      const trace = require(`../../public/assets/images/${group}/photos/${id}.png?trace`)?.trace
      return trace
    } catch (e) {
      return null
    }
  }
}

export default function CreaturePage(props: Props): React.ReactElement {
  const { id, name, group, northern, time, location, neighbours, vertical } = props
  const season = northern
  const activeMonths = season
    ?.toLowerCase()
    ?.split(',')
    .map((month: string) => month.trim())

  const currentMonth = months[new Date().getMonth() + 1]
  const isCurrentlyActive = activeMonths.includes(currentMonth)
  const trace = getTrace(group, id)
  return (
    <>
      <Head>
        <title>
          {name} • {group.charAt(0).toUpperCase() + group.slice(1)} • Critterpedia
        </title>
      </Head>
      <CritterPageGrid vertical={vertical}>
        <Navigation neighbours={neighbours} group={group} />
        <header>
          <h1>
            <CardLabel title={name} />
          </h1>
        </header>
        <picture>
          {trace && <img src={trace} />}
          <img src={`../assets/images/${group}/photos/${id}.png`} loading='lazy' />
        </picture>
        <Seasonality months={months} activeMonths={activeMonths} currentMonth={currentMonth} />
        <Time time={time} disabled={isCurrentlyActive === false} />
        <Location location={location} />
      </CritterPageGrid>
    </>
  )
}
