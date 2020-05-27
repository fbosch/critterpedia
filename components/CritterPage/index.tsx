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

export default function CreaturePage(props: Props): React.ReactElement {
  const { id, name, group, northern, time, location, neighbours, vertical } = props
  const season = northern
  const activeMonths = season
    ?.toLowerCase()
    ?.split(',')
    .map((month: string) => month.trim())

  const currentMonth = months[new Date().getMonth() + 1]
  const isCurrentlyActive = activeMonths.includes(currentMonth)
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
          <img src={`../../assets/images/${group}/photos/${id}.png`} loading='eager' />
        </picture>
        <Seasonality months={months} activeMonths={activeMonths} currentMonth={currentMonth} />
        <Time time={time} disabled={isCurrentlyActive === false} />
        <Location location={location} />
      </CritterPageGrid>
    </>
  )
}
