import React from 'react'
import styled from 'styled-components'
import { device } from '../theme'

const StyledShadow = styled.span`
  &:before, &:after {
    position: absolute;
    width: 30%;
    content: ' ';
    left: 10%;
    transform-origin: top right;
    transform: skew(-4deg) rotate(-8deg);
    box-shadow: 0 1.6em 5px 10px rgba(173, 165, 118, 0.5);
  }
  &:after {
    left: auto;
    right: 10%;
    transform-origin: left top;
    transform: skew(4deg) rotate(8deg);
  }
`

const StyledCardLabel = styled.label`
    position: absolute;
    transition: opacity 200ms linear, transform 300ms linear 30ms;
    transform: rotate(1deg) translateY(-10%);
    min-height: 0.7em;
    min-width: 2.5em;
    top: -37%;
    color: #3D392D;
    font-style: italic;
    font-size: 1.6em;
    z-index: 10;
    white-space: nowrap;
    display: block;
    padding: 1.3em 2.2em;
    transform: rotate(-3deg) translateY(-10%);
    z-index: 5;
    opacity: 1;

    @media ${device.tablet} {
      font-size: 1.4em;
    }

    &:before {
      content: '';
      display: block;
      height: 65%;
      width: calc(90% - 10px);
      border: 1px solid #D2CFBE;
      outline: 3px solid #ECEAD3;
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow:
        0 0 0 4px #D2CFBE;
    }
    &:after {
      content: attr(data-name);
      display: flex;
      border: 1px solid #d6d2a0;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ECEAD3;
      width: calc(100% - 5px);
      height: 100%;
      z-index: 2;
    }
`

function CardLabel(props) {

  return (
    <StyledCardLabel data-name={props.title}>
      {props.children}
      <StyledShadow />
    </StyledCardLabel>
  )
}

export default CardLabel