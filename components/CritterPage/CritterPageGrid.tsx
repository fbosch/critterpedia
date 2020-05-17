import React from 'react'
import styled from 'styled-components'
import { device } from '../../theme'

const CritterSection = styled.section`
  display: block;
  /* background: red; */
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  font-size: 1.5vh;
  margin-top: 5vh;
  padding: 0 15vw;
  grid-column-gap: 5vw;
  grid-row-gap: 2vh;
  grid-template-rows: 5vh 15vh 20vh 15vh;
  grid-template-areas:
    'header header'
    'picture picture'
    'season season'
    'time time'
    'location location';

  @media ${device.laptop} {
    grid-template-rows: 1vh 2vh 28vh 20vh;
    grid-template-areas:
      'nav nav'
      'header header'
      'picture picture'
      'season time'
      'location donation';
    &.vertical {
      grid-row-gap: 0vh;
      grid-template-rows: 1vh 25vh 25vh 7vh 5vh;
      grid-template-areas:
        'nav nav'
        'picture season'
        'picture time'
        'header location'
        '. donation';

      picture,
      > header {
        border: none;
        border-right: 2px solid ${(props) => props.theme.borderColor};
      }
      picture img {
        /* width: 50%; */
      }
    }
  }

  picture {
    user-select: none;
    grid-area: picture;
    image-rendering: smooth;
    border: 2px solid ${(props) => props.theme.borderColor};
    border-top: none;
    img {
      left: 50%;
      top: 50%;
      max-width: 90%;
      width: auto;
      /* width: 100%; */
      position: relative;
      transform: translate(-50%, -50%);
      object-position: center;
      filter: url(#drop-shadow);
      -webkit-filter: drop-shadow(0 0.5em 0.2em #c6bd94);
    }
  }

  > header {
    border: 2px solid ${(props) => props.theme.borderColor};
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 12vh;
    font-size: 0.8em;
    grid-area: header;
    h1 span {
      position: static;
    }
  }
`

function CritterPageGrid({ vertical, children }) {
  return (
    <>
      <CritterSection className={vertical && 'vertical'}>{children}</CritterSection>
      <svg height='0' xmlns='http://www.w3.org/2000/svg' style={{ position: 'absolute' }}>
        <filter id='drop-shadow'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='5' />
          <feOffset dx='0' dy='10' result='offsetblur' />
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
