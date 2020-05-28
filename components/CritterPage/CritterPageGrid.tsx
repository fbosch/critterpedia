import React from 'react'
import styled from 'styled-components'
import { device } from '../../theme'

const CritterSection = styled.section`
  display: block;
  /* background: red; */
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  font-size: 1.1vh;
  padding-top: 3vh;
  width: 70%;
  margin: 0 auto;
  max-width: 300px;
  grid-row-gap: 1.6vh;
  grid-template-rows: 5vh 20vh 15vh 12vh 5vh 2vh;
  grid-template-areas:
    'header header'
    'picture picture'
    'season season'
    'time time'
    'location location'
    'nav nav';

  /* @media ${device.tablet} {
    font-size: 1.3vmin;
  } */

  @media ${device.tablet} {
    font-size: 1.1vmin;
    max-width: 800px;
    grid-template-rows: 2vh 2vh 28vh 20vh;
    grid-column-gap: 5vw;
    grid-template-areas:
      'nav nav'
      'header header'
      'picture picture'
      'season time'
      'location donation';

    picture img {
      max-height: 100%;
      top: 50%;
    }

    &.vertical {
      grid-row-gap: 0vh;
      grid-template-rows: 5vh 25vh 20vh 5vh 5vh;
      grid-template-areas:
        'nav nav'
        'picture season'
        'picture time'
        'picture location'
        'header donation';

      picture img {
        top: 50%;
      }

      picture,
      > header {
        border: none;
        border-right: 2px solid ${(props) => props.theme.borderColor};
      }
    }
  }

  picture {
    user-select: none;
    grid-area: picture;
    image-rendering: smooth;
    border-top: none;
    position: relative;
    img {
      left: 50%;
      top: 50%;
      max-height: 130%;
      max-width: 90%;
      width: auto;
      position: absolute;
      transform: translate(-50%, -50%);
      object-position: center;
      &:last-of-type {
        filter: url(#drop-shadow);
        -webkit-filter: drop-shadow(0 0.7em 0.3em #c6bd94);
      }
    }
  }

  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 12vh;
    font-size: 1em;
    grid-area: header;
    z-index: 5;
    h1 span {
      position: static;
    }
  }
`

type Props = {
  children: React.ReactChildren | JSX.Element | JSX.Element[]
  vertical?: boolean
}

function CritterPageGrid({ vertical, children }: Props): JSX.Element {
  return (
    <>
      <CritterSection className={vertical && 'vertical'}>{children}</CritterSection>
      <svg height='0' xmlns='http://www.w3.org/2000/svg' style={{ position: 'absolute' }}>
        <filter id='drop-shadow'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='1' />
          <feOffset dx='0' dy='5' result='offsetblur' />
          <feFlood floodColor='#c6bd94' />
          <feComposite in2='offsetblur' operator='in' />
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </svg>
    </>
  )
}

export default CritterPageGrid
