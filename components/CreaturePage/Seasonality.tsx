import styled from 'styled-components'
import SectionHeader from './SectionHeader'

const SeasonContainer = styled.section`
  grid-area: season;
  display: flex;
  justify-content: start;
  flex-flow: column;
  align-items: start;
  font-style: italic;
  font-size: 1.5vh;
`

const SeasonTable = styled.table`
  width: 100%;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-collapse: collapse;

  td {
    color: ${(props) => props.theme.grayText};
    font-size: 1.2em;
    line-height: 2.5em;
    padding-left: 0.5em;
    border-right: 2px solid ${(props) => props.theme.borderColor};
    border-bottom: 2px solid ${(props) => props.theme.borderColor};
    position: relative;
    font-weight: 600;
    z-index: 1;

    &[data-current='true'] {
      /* border: 3px solid red; */
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

export default function Seasonality(props) {
  const { season } = props
  const activeMonths = season
    ?.toLowerCase()
    ?.split(',')
    .map((month: string) => month.trim())
  const currentMonth = new Date().getMonth() + 1
  const isActive = (month: string) => activeMonths.includes(month)
  const getMonthAttributes = (month, monthNumber) => ({
    ['aria-label']: month,
    ['data-active']: isActive(month),
    ['data-current']: monthNumber === currentMonth,
    title: month.charAt(0).toUpperCase() + month.slice(1),
  })
  return (
    <SeasonContainer>
      <SectionHeader>
        <h2>Seasonality</h2>
      </SectionHeader>
      <SeasonTable>
        <tbody>
          <tr>
            <td {...getMonthAttributes('january', 1)}>Jan.</td>
            <td {...getMonthAttributes('februrary', 2)}>Feb.</td>
            <td {...getMonthAttributes('march', 3)}>Mar.</td>
            <td {...getMonthAttributes('april', 4)}>Apr.</td>
          </tr>
          <tr>
            <td {...getMonthAttributes('may', 5)}>May.</td>
            <td {...getMonthAttributes('june', 6)}>June</td>
            <td {...getMonthAttributes('july', 7)}>July</td>
            <td {...getMonthAttributes('august', 8)}>Aug.</td>
          </tr>
          <tr>
            <td {...getMonthAttributes('september', 9)}>Sept.</td>
            <td {...getMonthAttributes('october', 10)}>Oct.</td>
            <td {...getMonthAttributes('november', 11)}>Nov.</td>
            <td {...getMonthAttributes('december', 12)}>Dec.</td>
          </tr>
        </tbody>
      </SeasonTable>
    </SeasonContainer>
  )
}
