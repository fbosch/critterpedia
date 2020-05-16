import React from 'react'
import styled from 'styled-components'

const StyledDetail = styled.div`
  display: block;
  /* background: red; */
  top: 0;
  left: 0;
  height: 80%;
  width: 90%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  color: rgba(236, 234, 211, 0.85);
  z-index: 3;
  background: radial-gradient(circle at top left, currentColor 0.7em, transparent 0) top left,
    radial-gradient(circle at top right, currentColor 0.7em, transparent 0) top right,
    radial-gradient(circle at bottom right, currentColor 0.7em, transparent 0) bottom right,
    radial-gradient(circle at bottom left, currentColor 0.7em, transparent 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
`

const StyledShadow = styled.span`
  &:before,
  &:after {
    position: absolute;
    width: 30%;
    content: ' ';
    left: 10%;
    z-index: -2;
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

const StyledCardLabel = styled.span`
  position: absolute;
  min-height: 0.7em;
  min-width: 2em;
  color: #3d392d;
  font-style: italic;
  white-space: nowrap;
  display: block;
  z-index: 2;
  padding: 1.3em 2.2em;
  transform: rotate(-3deg) translateY(-10%);
  opacity: 1;

  strong {
    z-index: 5;
    position: relative;
  }

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
    content: '';
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
    z-index: -2;
  }
`

function CardLabel(props) {
  if (!props.title) return null
  return (
    <StyledCardLabel data-name={props.title}>
      <StyledDetail />
      <strong>{props.title}</strong>
      <StyledShadow />
    </StyledCardLabel>
  )
}

export default CardLabel
