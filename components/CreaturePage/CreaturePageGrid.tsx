import React from 'react'
import styled from 'styled-components'
import { device } from '../../theme'

const CreatureSection = styled.section`
  display: block;
  /* background: red; */
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 10vh 30vh 20vh 10vh;
  height: 100%;
  font-size: 1.5vh;
  margin-top: 5vh;
  padding: 0 15vw;
  grid-template-areas:
    'header header'
    'picture picture'
    'season season'
    'time time'
    'location donation';

  @media ${device.tablet} {
    grid-template-areas:
      'header header'
      'picture picture'
      'season time'
      'location donation';
  }

  picture {
    user-select: none;
    grid-area: picture;
    image-rendering: smooth;
    img {
      height: 50%;
      left: 50%;
      top: 50%;
      position: relative;
      transform: translate(-50%, -50%);
      object-position: center;
      object-fit: contain;
      filter: url(#drop-shadow);
      -webkit-filter: drop-shadow(0 0.5em 0.2em #c6bd94);
    }
  }

  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 10vh;
    font-size: 0.8em;
    grid-area: header;
    h1 span {
      position: static;
    }
  }
`

export default (props) => (
  <>
    <CreatureSection>{props.children}</CreatureSection>
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
