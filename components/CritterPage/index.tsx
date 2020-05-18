import React from 'react'
import Location from './Location'
import CardLabel from '../CardLabel'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import CritterPageGrid from './CritterPageGrid'
import Seasonality from './Seasonality'
import Time from './Time'

const StyledNavigation = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: flex-end;
  width: 100%;
  a {
    color: ${(props) => props.theme.grayAccent};
    text-decoration: none;
  }
`

function Navigation({ neighbours, group }) {
  return (
    <StyledNavigation>
      {neighbours.prev ? (
        <Link href={`/${group}/[id]`} as={`/${group}/${neighbours.prev}`}>
          <a>Previous</a>
        </Link>
      ) : (
        <span />
      )}
      {neighbours.next ? (
        <Link href={`/${group}/[id]`} as={`/${group}/${neighbours.next}`}>
          <a>Next</a>
        </Link>
      ) : (
        <span />
      )}
    </StyledNavigation>
  )
}

const months = {
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

export default function CreaturePage(props) {
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
          <img src={`/assets/images/${group}/photos/${id}.png`} loading='lazy' />
        </picture>
        <Seasonality months={months} activeMonths={activeMonths} currentMonth={currentMonth} />
        <Time time={time} disabled={isCurrentlyActive === false} />
        <Location location={location} />
      </CritterPageGrid>
    </>
  )
}
