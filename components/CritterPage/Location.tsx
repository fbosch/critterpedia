import * as React from 'react'
import styled from 'styled-components'
import SectionHeader from './SectionHeader'

const StyledLocation = styled.div`
  grid-area: location;
  display: flex;
  font-style: italic;
  line-height: 1.7em;
  align-items: center;
  span {
    left: 5%;
    position: relative;
    font-size: 1.2em;
    color: ${(props) => props.theme.grayAccent};
  }
`

type Props = {
  location?: string
}

export default function Location({ location }: Props): JSX.Element {
  return (
    <StyledLocation>
      <SectionHeader>
        <h2>Location</h2>
      </SectionHeader>
      <span>{location}</span>
    </StyledLocation>
  )
}
