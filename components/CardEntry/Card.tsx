import styled from 'styled-components'
import { device, isChrome, standalone, Theme } from '../../theme'

const getFallback = (props: { theme: Theme; fallback: (color: string) => string }) =>
  props.fallback(props.theme.borderColor)

export default styled.li`
  touch-action: manipulation;
  font-size: 1.2vh;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 15vh;
  position: relative;
  scroll-snap-align: center;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  noscript {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    .is-dragging & {
      cursor: move;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: calc(var(--vh, 1vh));
    background-image: url("data:image/svg+xml;base64,${getFallback}");
    background-repeat: no-repeat;
    background-size: 20%;
    background-position: center;

    .is-dragging & {
      pointer-events: none;
    }

    &:after {
      content: '';
      position: absolute;
      height: 92%;
      width: 92%;
      display: block;
      top: 50%;
      left: 50%;
      opacity: 0;
      transition: opacity 200ms linear;
      transform: translate(-50%, -50%);
      border: 2px solid ${(props: { theme: Theme }): string => props.theme.darkGrayAccent};
    }

    &:before {
      content: '';
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border: 2px solid ${(props: { theme: Theme }): string => props.theme.borderColor};
      position: absolute;
    }

  }

  &:last-of-type img+span {
    display: block;
  }

  span:first-of-type {
    will-change: opacity, transform;
    top: -42%;
    opacity: 0;
    z-index: -1;
    transform: rotate(1deg) translateY(-5%);
    transition: opacity 150ms linear, transform 200ms linear 30ms, z-index 0ms linear 400ms;
    font-size: 1.3em;
    &:after {
      z-index: 2;
    }
    @media ${device.tablet} {
      font-size: 1.1em;
    }
    @media ${device.tablet} {
      top: -30%;
    }
    > span {
      z-index: -2;
    }
  }

  a:hover:after {
    opacity: 0.6;
    border: 2px dashed ${(props: { theme: Theme }): string => props.theme.darkGrayAccent};
  }

   a:focus, a:hover, a:active {
    background-image: none;
    outline: none;
    &:after {
      opacity: 0.4;
    }
    img {
      transform: translateY(-18%) scale(1.1);
      @media ${device.tablet} {
        transform: translateY(-8%) scale(1.1);
      }
    }
     span:first-of-type {
      opacity: 1;
      z-index: 5;
      transform: rotate(-2deg) translateY(0%);
      transition: opacity 250ms linear, transform 300ms linear 0ms, z-index 0ms linear 0ms;
    }
  }

  img {
    transform-origin: center;
    user-select: none;
    z-index: 2;
    width: 6vmax;
    max-width: 55%;
    will-change: transform;
    opacity: 0;
    transition: transform 250ms cubic-bezier(0,.5,.5,1), background 300ms linear;
    background: radial-gradient(rgba(233, 227, 169, 1) 30%,rgba(233, 227, 169, 0) 70%);
    image-rendering: high-quality;
    image-rendering: smooth;
    will-change: transform, opacity, background;

    ${isChrome} {
      image-rendering: -webkit-optimize-contrast;
    }

    ${standalone} {
      width: 7vmax;
    }

    @media ${device.tablet} {
      width: 6vmax;
    }

    &[src]:not([data-src]) {
      animation: fadeIn 200ms linear;
      animation-fill-mode: forwards;
    }
    &:not([src]) {
      width: 20%;
      content: url("data:image/svg+xml;base64,${getFallback}");
    }
  }
`
