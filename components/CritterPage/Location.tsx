import styled from 'styled-components'
import SectionHeader from './SectionHeader'

const StyledLocation = styled.div`
  grid-area: location;
  display: flex;
  font-style: italic;
  line-height: 1.5em;
  span {
    left: 5%;
    position: relative;
    color: ${(props) => props.theme.grayAccent};
  }
`

export default function Location({ location }) {
  return (
    <StyledLocation>
      <SectionHeader>
        <h2>Location</h2>
      </SectionHeader>
      <span>{location}</span>
    </StyledLocation>
  )
}
