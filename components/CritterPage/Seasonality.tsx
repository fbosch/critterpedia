import * as React from 'react'
import styled from 'styled-components'
import SectionHeader from './SectionHeader'

const SeasonContainer = styled.div`
  grid-area: season;
  display: flex;
  justify-content: start;
  flex-flow: column;
  align-items: start;
  font-style: italic;
  font-size: 1em;
`

const SeasonTable = styled.table`
  width: 100%;
  height: 70%;
  max-height: 15vh;
  font-size: 1em;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-collapse: collapse;
  display: block;
  tbody {
    display: grid;
    grid-template-rows: repeat(3, 33%);
    grid-template-columns: repeat(1, 100%);
    flex-flow: row;
    width: 100%;
    height: 100%;
  }
  tr {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    &:not(:last-of-type) {
      border-bottom: 2px solid ${(props) => props.theme.borderColor};
    }
  }
  td {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 200ms linear;
    opacity: 0.5;
    color: ${(props) => props.theme.grayText};
    font-size: 1.3em;
    position: relative;
    font-weight: 600;
    z-index: 1;
    &:not(:last-of-type) {
      border-right: 2px solid ${(props) => props.theme.borderColor};
    }

    &[data-current='true'] {
      &:after {
        content: '';
        border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
        box-shadow: 0px 1px 10px -8px ${(props) => props.theme.redHighlight};
        border: 3px solid #d25233;
        opacity: 0.7;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
      }
    }
    &[data-active='true'] {
      opacity: 1;
      &:before {
        content: '';
        top: 50%;
        left: 50%;
        display: block;
        background: ${(props) => props.theme.yellowGreen};
        height: calc(100% - 0.5em);
        width: calc(100% - 0.5em);
        transform: translate(-50%, -50%);
        position: absolute;
        z-index: -1;
        border-radius: 10% 10% 10% 10% / 20% 20% 20% 20%;
      }
    }
  }
`

type Props = {
  activeMonths: string[]
  currentMonth: string
  months: Months
}

// TODO: Convert data attributes to classNames
// type MonthAttributes = {
//   title: string
//   key: string
//   'aria-label'?: number
//   'data-active'?: boolean
//   'data-current'?: boolean
// }

export default function Seasonality(props: Props): JSX.Element {
  const { activeMonths, months, currentMonth } = props
  const isActive = (month: string) => activeMonths.includes(month)
  const getMonthAttributes = (month: number): any => ({
    ['aria-label']: month,
    ['data-active']: isActive(months[month]),
    ['data-current']: months[month] === currentMonth,
    key: months[month],
    title: months[month].charAt(0).toUpperCase() + months[month].slice(1),
  })
  return (
    <SeasonContainer>
      <SectionHeader>
        <h2>Seasonality</h2>
      </SectionHeader>
      <SeasonTable key={activeMonths.join()}>
        <tbody>
          <tr>
            <td {...getMonthAttributes(1)}>Jan.</td>
            <td {...getMonthAttributes(2)}>Feb.</td>
            <td {...getMonthAttributes(3)}>Mar.</td>
            <td {...getMonthAttributes(4)}>Apr.</td>
          </tr>
          <tr>
            <td {...getMonthAttributes(5)}>May.</td>
            <td {...getMonthAttributes(6)}>June</td>
            <td {...getMonthAttributes(7)}>July</td>
            <td {...getMonthAttributes(8)}>Aug.</td>
          </tr>
          <tr>
            <td {...getMonthAttributes(9)}>Sept.</td>
            <td {...getMonthAttributes(10)}>Oct.</td>
            <td {...getMonthAttributes(11)}>Nov.</td>
            <td {...getMonthAttributes(12)}>Dec.</td>
          </tr>
        </tbody>
      </SeasonTable>
    </SeasonContainer>
  )
}
