import styled from 'styled-components'

export default styled.span`
  height: 100%;
  left: 100%;
  width: calc(50% + env(safe-area-inset-left));
  position: absolute;
  scroll-snap-align: start;
  z-index: -1;
  pointer-events: none;
`
