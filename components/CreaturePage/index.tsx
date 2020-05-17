import React from 'react'
import styled from 'styled-components'
import CardLabel from '../CardLabel'
import Head from 'next/head'
import CreatePageGrid from './CreaturePageGrid'

const SeasonContainer = styled.div`
  grid-area: season;
  display: flex;
  justify-content: start;
  flex-flow: column;
  align-items: start;
  font-style: italic;

  h2 {
    padding: 0;
    margin: 0 0 0.5em 0;
    color: #484f00;
    z-index: 1;
    position: relative;
    &:after {
      content: '';
      background: #ddd992;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      display: block;
      z-index: -1;
      border-radius: 5% 22% 50% 15% / 50% 50% 20% 10%;
      transform: skew(-10deg);
    }
  }
`

const Season = styled.table`
  width: 30vw;
  border: 3px solid ${(props) => props.theme.borderColor};
  border-collapse: collapse;

  td {
    color: #525236;
    font-size: 1.2em;
    line-height: 2.1em;
    padding-left: 0.8em;
    border-right: 3px solid ${(props) => props.theme.borderColor};
    border-bottom: 3px solid ${(props) => props.theme.borderColor};
  }
`

const Time = styled.li`
  color: red;
  grid-area: time;
`

export default function CreaturePage({ id, name, group }) {
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
          <img src={`/assets/images/${group}/photos/${id}.png`} />
        </picture>
        <SeasonContainer>
          <h2>Seasonality</h2>
          <Season>
            <tr>
              <td>Jan.</td>
              <td>Feb.</td>
              <td>Mar.</td>
              <td>Apr.</td>
            </tr>
            <tr>
              <td>May.</td>
              <td>June</td>
              <td>July</td>
              <td>Aug.</td>
            </tr>
            <tr>
              <td>Sept.</td>
              <td>Oct.</td>
              <td>Nov.</td>
              <td>Dec.</td>
            </tr>
          </Season>
        </SeasonContainer>
      </CreatePageGrid>
    </>
  )
}
