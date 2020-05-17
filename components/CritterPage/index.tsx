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
        <Link href={`/${group}/${neighbours.prev}`}>
          <a>Previous</a>
        </Link>
      ) : (
        <span />
      )}
      {neighbours.next ? (
        <Link href={`/${group}/${neighbours.next}`}>
          <a>Next</a>
        </Link>
      ) : (
        <span />
      )}
    </StyledNavigation>
  )
}

export default function CreaturePage(props) {
  const { id, name, group, northern, time, location, neighbours, vertical } = props
  const season = northern
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
        <Seasonality season={season} />
        <Time time={time} />
        <Location location={location} />
      </CritterPageGrid>
    </>
  )
}
