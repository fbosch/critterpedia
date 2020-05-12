import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import { ThemeType } from '../theme'
import CardLabel from './CardLabel'

type GridCardProps = {
  fallback?: Function;
  theme?: ThemeType,
  image?: string,
  title?: string,
  id?: string,
  showSpacer?: boolean
}

const getFallback = (props: GridCardProps) => props.fallback(props.theme.borderColor)

const StyledSpacer = styled.span`
  display: none;
  height: 100%;
  left: 100%;
  width: calc(70% + env(safe-area-inset-left));
  position: absolute;
  scroll-snap-align: start;
  z-index: -1;
  pointer-events: none;
`

const StyledCard = styled.li`
  touch-action: manipulation;
  font-size: 1.2vh;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(var(--vh, 1vh) * 15);
  position: relative;
  background-image: url("data:image/svg+xml;base64,${getFallback}");
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: center;
  scroll-snap-align: end;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;

 

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: calc(var(--vh, 1vh));

    &:after {
      content: '';
      position: absolute;
      height: 92%;
      width: 92%;
      border: 2px solid ${props => props.theme.darkGrayAccent};
      display: block;
      top: 50%;
      left: 50%;
      opacity: 0;
      transition: opacity 200ms linear;
      transform: translate(-50%, -50%);
    }

    &:before {
      content: '';
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border: 2px solid ${props => props.theme.borderColor};
      position: absolute;
    }

  }

  &:last-of-type img+span {
    display: block;
  }

  label {
    opacity: 0;
    z-index: -1;
    transform: rotate(1deg) translateY(-5%);
    transition: opacity 150ms linear, transform 200ms linear 30ms, z-index 0ms linear 400ms;
  }

  a:focus {
    img {
      transform: scale(1.1);
    }
    label {
      opacity: 1;
      z-index: 3;
      transform: rotate(-2deg) translateY(0%);
      transition: opacity 250ms linear, transform 300ms linear 0ms, z-index 0ms linear 0ms;
    }
  }

  img {
    user-select: none;
    z-index: 2;
    width: 6vmax;
    max-width: 60%;
    will-change: opacity;
    image-rendering: optimizeQuality;
    image-rendering: smooth;
    opacity: 0;
    transition: transform 250ms cubic-bezier(0,.5,.5,1), background 300ms linear;
    background: radial-gradient(rgba(233, 227, 169, 1) 30%,rgba(233, 227, 169, 0) 70%);
    &[src]:not([data-src]) {
      animation: fadeIn 200ms linear;
      animation-fill-mode: forwards;
    }
    &:not([src]) {
      width: 20%;
      content: url("data:image/svg+xml;base64,${getFallback}");
    }
  }

  a:focus {
    outline: none;
    &:hover:after {
      opacity: 0.6;
    }
    :after {
      opacity: 0.4;
    }
  }
`

function handleFocus(event) {
  const target: HTMLElement = event.currentTarget as HTMLElement
  if (target) {
    window.requestAnimationFrame(() => {
      const id = target.getAttribute('href')
      if (window.location.hash !== id) window.location.hash = id
    })
  }
}

function CardEntry(props: GridCardProps) {
  const { id, title, image, showSpacer, ...rest } = props
  return (
    <StyledCard {...rest}>
      <a href={'#' + id} draggable={false} id={id} tabIndex={0} onClick={e => e.preventDefault()} onFocus={handleFocus}>
        <CardLabel title={props.title} />
        {image && <img data-src={image} loading='eager' draggable="false" alt={title} />}
        {showSpacer && <StyledSpacer />}
      </a>
    </StyledCard>
  )

}

export default CardEntry