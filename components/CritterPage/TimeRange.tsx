import styled from 'styled-components'
import { useMemo } from 'react'

const hoursInADay = Array.from(Array(24)).map((_, index) => index)

function getHourLabel(hour) {
  switch (hour) {
    case 0:
      return '12AM'
    case 12:
      return '12PM'
    default:
      return hour <= 12 ? hour + 'AM' : hour - 12 + 'PM'
  }
}

const ActiveHourMarker = styled.div`
  width: 100%;
  height: 1.3em;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  z-index: 0;
  transform: translateY(-22%);
  background: ${(props) => props.theme.yellowGreen};
`

const TimeRangeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
`

const StyledTimeList = styled.ol`
  list-style-type: none;
  width: 100%;
  height: 100%;
  max-height: 65px;
  padding: 0;
  margin: 0;
  bottom: 0;
  font-family: 'Helvetica Neue';
  font-weight: 500;
  border-bottom: 2px solid ${(props) => props.theme.grayText};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  z-index: 4;
  opacity: 1;

  &.disabled {
    opacity: 0.3;
  }

  li {
    height: 30%;
    color: ${(props) => props.theme.grayText};
    /* border-left: 1px solid currentColor; */
    position: relative;
    text-align: center;
    width: 4.16%;

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
      opacity: 0.6;
    }

    &:not(:first-of-type):not(:last-of-type) {
      transform: translateX(50%);
    }

    &:before {
      top: 0;
      left: 50%;
      position: absolute;
      transform: translate(-40%, -110%);
      font-size: 1.3em;
      line-height: 1.1em;
      text-align: left;
    }

    &:nth-of-type(3n) {
      height: 30%;
      &:after {
        bottom: 12%;
        height: 100%;
        border-radius: 0;
        opacity: 0.8;
        transform: translateX(0);
      }
    }

    &:nth-of-type(6n) {
      height: 50%;
      &:after {
        bottom: 0;
        height: 100%;
        border-radius: 0;
        transform: translateX(0);
        opacity: 1;
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
      border-right: 2px solid currentColor;
      height: 50%;
      &:before {
        content: '';
      }
      &:after {
        bottom: 25%;
        height: 0.5em;
        top: auto;
        opacity: 0.7;
        display: none;
        transform: translateX(-100%);
      }
    }

    &:first-of-type {
      height: 50%;
      border-left: 2px solid currentColor;
      &:after {
        bottom: 25%;
        top: auto;
        right: 0%;
        transform: translateX(0.25em);
      }
      &:before {
        content: 'AM 12';
        transform: translate(-60%, -120%);
      }
    }
  }
`

const CurrentTimeIndicator = styled.div`
  display: block;
  height: 2em;
  color: ${(props) => props.theme.redHighlight};
  background: currentColor;
  width: 4px;
  bottom: 0;
  z-index: 6;
  position: absolute;
  transition: left 100ms linear;
  box-shadow: 0px 0px 7px -1px ${(props) => props.theme.redHighlight};
  &:before,
  &:after {
    display: block;
    content: '';
    left: 50%;
    position: absolute;
  }
  &:before {
    top: 0%;
    transform: translate(-50%, -50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid currentColor;
  }
  &:after {
    bottom: 0%;
    transform: translate(-50%, 50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid currentColor;
  }
`

function getMilitaryHours(hours: Array<string>): Array<number> {
  const parsedHours = hours
    .map((hour: string) => hour.toLowerCase())
    .map((hour: string) => {
      if (hour.endsWith('am')) {
        return Number(hour.replace('am', '').trim())
      } else {
        return Number(hour.replace('pm', '').trim()) + 12
      }
    })
  return parsedHours
}

export default function TimeRange({ time, currentTime, disabled = false }) {
  const parsedTime: Array<Array<Number>> = useMemo(
    () =>
      time
        .split('&')
        .map((hours: string) => hours.split('-').map((hour: string) => hour.trim()))
        .map(getMilitaryHours),
    [time]
  )
  return (
    <TimeRangeContainer>
      {currentTime && <CurrentTimeIndicator style={{ left: `calc(4.16% * ${currentTime})` }} />}
      {disabled === false &&
        parsedTime.map((time: Array<any>) => {
          if (time[1] < time[0]) {
            return [
              <ActiveHourMarker key={time.join() + '1'} style={{ width: `calc(4.16% * ${time[1]})` }} />,
              <ActiveHourMarker
                key={time.join() + '2'}
                style={{
                  width: `calc(4.16% * ${24 - time[0]})`,
                  left: `calc(4.16% * ${time[0]})`,
                }}
              />,
            ]
          }
          return [
            <ActiveHourMarker
              key={time.join()}
              style={{ width: `calc(4.16% * ${time[1] - time[0]})`, left: `calc(4.16% * ${time[0]})` }}
            />,
          ]
        })}
      <StyledTimeList className={disabled && 'disabled'}>
        {hoursInADay.map((hour) => (
          <li key={hour} title={getHourLabel(hour + 1)}></li>
        ))}
      </StyledTimeList>
    </TimeRangeContainer>
  )
}
