import styled from 'styled-components'
import SectionHeader from './SectionHeader'

const TimeContainer = styled.section`
  grid-area: time;
  display: flex;
  justify-content: start;
  flex-flow: column;
  align-items: start;
  font-size: 1.5vh;
  position: relative;
`

const ActiveHourMarker = styled.div`
  width: 100%;
  height: 25%;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  z-index: 0;
  transform: translateY(calc(100% - 0.3em));
  background: ${(props) => props.theme.yellowGreen};
`

const TimeRangeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30%;
  display: flex;
  align-items: start;
`

const StyledTimeList = styled.ol`
  list-style-type: none;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 5% 1vw 0 1vw 0;
  font-family: 'Helvetica Neue';
  font-weight: 500;
  border-bottom: 2px solid ${(props) => props.theme.grayText};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 4;

  li {
    height: 30%;
    color: ${(props) => props.theme.grayText};
    /* border-left: 1px solid currentColor; */
    position: relative;
    text-align: center;
    line-height: 1em;
    width: 4.4%;

    &:after {
      content: '';
      display: block;
      height: 0.5em;
      width: 2px;
      background-color: currentColor;
      left: 50%;
      bottom: 40%;
      transform: translateX(-50%);
      position: absolute;
    }

    &:before {
      top: 0;
      left: 50%;
      position: absolute;
      transform: translate(-40%, -110%);
    }

    &:nth-of-type(6n) {
      height: 50%;
      &:after {
        bottom: 0;
        height: 100%;
        border-radius: 0;
        transform: translateX(0);
      }
      &:before {
        content: '6';
      }
    }
    &:nth-of-type(12) {
      &:before {
        content: 'PM 12';
        transform: translate(-20%, -120%);
      }
    }

    &:last-of-type {
      padding-right: 5%;
      border-right: 2px solid currentColor;
      height: 50%;
      &:before {
        content: '';
      }
      &:after {
        bottom: 25%;
        height: 0.5em;
        top: auto;
        transform: translateX(-100%);
      }
    }

    &:first-of-type {
      height: 50%;
      padding-left: 5%;
      border-left: 2px solid currentColor;
      &:after {
        bottom: 25%;
        top: auto;
      }
      &:before {
        content: 'AM 12';
        transform: translate(-60%, -120%);
      }
    }
  }
`

const hours = Array.from(Array(24)).map((_, index) => index)

function getHourLabel(hour) {
  switch (hour) {
    case 0:
      return '12 AM'
    case 12:
      return '12 PM'
    default:
      return hour <= 12 ? hour + ' AM' : hour - 12 + ' PM'
  }
}

function getMilitaryHours(hours) {
  console.log(hours)
  const parsedHours = hours
    .map((hour) => hour.toLowerCase())
    .map((hour) => {
      if (hour.endsWith('am')) {
        return Number(hour.replace('am', '').trim())
      } else {
        return Number(hour.replace('pm', '').trim()) + 12
      }
    })
  console.log(parsedHours)
  return parsedHours
}

export default function Time(props) {
  const currentTime = null
  const { time } = props

  const parsedTime = time
    .split('&')
    .map((value) => value.split('-').map((value) => value.trim()))
    .map(getMilitaryHours)

  return (
    <TimeContainer>
      <SectionHeader>
        <h2>Current Active Hours</h2>
      </SectionHeader>
      <TimeRangeContainer>
        {parsedTime.map((time) => (
          <ActiveHourMarker key={time.join()} />
        ))}
        <StyledTimeList>
          {hours.map((hour) => (
            <li key={hour} data-hour={getHourLabel(hour)}></li>
          ))}
        </StyledTimeList>
      </TimeRangeContainer>
    </TimeContainer>
  )
}
