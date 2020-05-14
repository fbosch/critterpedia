import React from 'react'
import styled from 'styled-components'

const StyledShadow = styled.span`
  &:before,
  &:after {
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
  min-height: 0.7em;
  min-width: 2.5em;
  color: #3d392d;
  font-style: italic;
  z-index: 10;
  white-space: nowrap;
  display: block;
  padding: 1.3em 2.2em;
  transform: rotate(-3deg) translateY(-10%);
  z-index: 5;
  opacity: 1;

  &:before {
    content: '';
    display: block;
    height: 65%;
    width: calc(90% - 10px);
    border: 1px solid #d2cfbe;
    outline: 3px solid #ecead3;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 4px #d2cfbe;
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
    background: #ecead3;
    width: calc(100% - 5px);
    height: 100%;
    z-index: 2;
  }
`

function CardLabel(props) {
  if (!props.title) return null
  return (
    <StyledCardLabel data-name={props.title}>
      {props.title}
      <StyledShadow />
    </StyledCardLabel>
  )
}

export default CardLabel
