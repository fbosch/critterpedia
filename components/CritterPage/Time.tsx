import styled from 'styled-components'
import SectionHeader from './SectionHeader'
import TimeRange from './TimeRange'
import { useState, useEffect, useCallback } from 'react'

const TimeContainer = styled.div`
  grid-area: time;
  display: flex;
  justify-content: start;
  flex-flow: column;
  align-items: start;
  font-size: 1em;
  position: relative;
`

export default function Time({ time, disabled }) {
  const [currentTime, setCurrentTime] = useState<number>()
  const getCurrentTime = useCallback(() => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes() / 60
    setCurrentTime(hours + minutes)
  }, [])

  useEffect(() => {
    getCurrentTime()
    const timeCheckInterval = window.setInterval(getCurrentTime, 1000)
    return () => {
      window.clearInterval(timeCheckInterval)
    }
  }, [])
  return (
    <TimeContainer title={disabled ? null : time.charAt(0).toUpperCase() + time.slice(1)}>
      <SectionHeader>
        <h2>Current Active Hours</h2>
      </SectionHeader>
      <TimeRange time={time} currentTime={currentTime} disabled={disabled} />
    </TimeContainer>
  )
}
