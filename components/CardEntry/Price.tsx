import styled from 'styled-components'
import { device } from '../../theme'

export default styled.span`
  color: ${(props) => props.theme.darkGrayAccent};
  font-size: 1.1em;
  position: absolute;
  bottom: 10%;
  width: auto;
  opacity: 0;
  display: flex;
  background-color: rgba(247, 246, 225, 0.7);
  padding: 0.5em 0.8em;
  border-radius: ${(props) => props.theme.detailBorderRadius};
  transition: opacity 200ms linear;
  text-shadow: 0px 0px 0.3em rgba(247, 246, 225, 1);
  overflow: hidden;
  letter-spacing: 0.06em;
  z-index: 4;

  a:focus & {
    opacity: 1;
  }

  &:before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.25em;
    opacity: 0.8;
    background-image: url('/assets/images/bells.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media ${device.tablet} {
    left: 10%;
    font-size: 0.8em;
  }
`
