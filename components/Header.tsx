import * as React from 'react'
import styled from 'styled-components'
import Link from './ActiveLink'

const overlap = '-20%'

const StyledHeader = styled.header`
  height: 10vh;
  width: 100%;
  position: relative;
  grid-area: header;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
`

const StyledNavItem = styled.li`
  font-size: 1.5vh;
  width: 6em;
  height: 6em;
  padding: 5px;
  border-radius: 100%;
  position: relative;
  z-index: 90;
  user-select: none;
  &:hover {
    svg {
      transform: scale(0.8);
    }
  }

  svg {
    width: 4em;
    color: ${(props) => props.theme.darkGrayAccent};
    transform: scale(0.7);
    transition: color 300ms ${(props) => props.theme.timingFunction},
      transform 300ms ${(props) => props.theme.timingFunction};
  }

  span {
    cursor: pointer;
    background: ${(props) => props.theme.orangeAccent};
    padding: 0.45em 0.9em;
    min-width: 3em;
    text-align: center;
    border-radius: ${(props) => props.theme.detailBorderRadius};
    letter-spacing: 0.02em;
    font-size: 1.1em;
    color: ${(props) => props.theme.grayAccent};
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translate(-50%, -100%) scale(0.5);
    opacity: 0;
    transition: opacity 100ms ${(props) => props.theme.timingFunction},
      transform 100ms ${(props) => props.theme.timingFunction} 30ms;
  }

  a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    &:after {
      content: '';
      position: absolute;
      display: block;
      border: 3px dotted ${(props) => props.theme.borderColor};
      border-radius: 100%;
      z-index: 5;
      height: 85%;
      width: 85%;
      opacity: 0;
      transition: opacity 200ms linear;
    }
    &:focus {
      outline: none;
      &:after {
        opacity: 0.3;
      }
      svg {
        transform: scale(0.65);
      }
    }
    &.active {
      svg {
        color: ${(props) => props.theme.orangeAccent};
        transform: scale(0.85);
      }
      span {
        z-index: 10;
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
      }
    }
  }
`

const StyledList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  position: absolute;
  z-index: 3;

  li {
    position: relative;
    &:not(:first-of-type) {
      transform: translateX(${overlap});
    }
  }
`

const StyledNavigation = styled.nav`
  position: relative;
  height: 100%;
  width: 100%;
  top: 45%;
  /* left: 4vw; */
  padding-left: 4vw;
`

const filterPadding = 15

const StyledBackground = styled.div`
  position: absolute;
  display: flex;
  left: 4vw;
  z-index: 2;
  padding: ${filterPadding}px;
  transform: translate(-${filterPadding}px, -${filterPadding}px);
  filter: url('#goo');

  > div {
    background: ${(props) => props.theme.lightYellow};
    font-size: calc(var(--vh, 1vh) * 1.5);
    width: 6em;
    height: 6em;
    padding: 5px;
    border-radius: 100%;
    + div {
      transform: translateX(${overlap});
    }
  }
`

function Header(props) {
  return (
    <>
      <StyledHeader>
        <StyledNavigation>
          <StyledList role='navigation'>
            <StyledNavItem>
              <Link href='/insects' activeClassName='active'>
                <a id='insects' draggable='false'>
                  <span>Insects</span>
                  <svg fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 51'>
                    <path
                      d='M29.5 18c5.865 7.217 5.406 19.168.258 23.613S11.304 39.806 5.439 32.59C-.426 25.372-2.06 12.995 3.087 8.55S23.635 10.783 29.5 18z'
                      fill='currentColor'
                    />
                    <path
                      d='M26.84 46.126c-3.806 3.908-12.531 6.648-15.564 3.509-3.034-3.139-.402-10.13 3.404-14.038 3.806-3.909 11.287-5.144 14.32-2.006 3.033 3.139 1.646 8.626-2.16 12.535zM22.352 3.51c0 1.66-3.309 2.005-5.726 2.005-2.418 0-3.891-.845-3.891-2.507 0-1.661 0-2.508 3.89-2.508 2.418 0 5.727 1.348 5.727 3.01z'
                      fill='currentColor'
                    />
                    <path
                      d='M25.38 5.014l-3.89-3.009-2.432-1.002V5.38L21.489 6l.863 2.022 1.083 2.507v3.51L29.5 18l-.5-6.5-.758-.971L26.84 7.52l-1.46-2.506z'
                      fill='currentColor'
                    />
                    <path
                      d='M28.242 18c-5.865 7.217-5.148 19.168 0 23.613s18.454-1.807 24.319-9.024c5.865-7.217 7.5-19.594 2.352-24.039S34.107 10.783 28.243 18z'
                      fill='currentColor'
                    />
                    <path
                      d='M31.16 46.126c3.806 3.908 12.531 6.648 15.564 3.509 3.034-3.139.402-10.13-3.404-14.038-3.806-3.909-11.287-5.144-14.32-2.006-3.033 3.139-1.646 8.626 2.16 12.535zM35.648 3.51c0 1.66 3.309 2.005 5.726 2.005 2.418 0 3.891-.845 3.891-2.507 0-1.661 0-2.508-3.89-2.508-2.418 0-5.727 1.348-5.727 3.01z'
                      fill='currentColor'
                    />
                    <path
                      d='M32.62 5.014l3.957-3.009 2.365-1.002V5.38L37 6l-1.462 2.022-.973 2.507v3.51L28.242 18 29 11.5l.758-.971L31.16 7.52l1.46-2.506z'
                      fill='currentColor'
                    />
                  </svg>
                </a>
              </Link>
            </StyledNavItem>
            <StyledNavItem>
              <Link href='/fish' activeClassName='active'>
                <a id='fish' draggable='false'>
                  <span>Fish</span>
                  <svg viewBox='0 0 79 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M31.5 46C48.897 46 63 33.203 63 20.5S48.897.5 31.5.5s-31 7.297-31 20S14.103 46 31.5 46zM12.43 24.213c3 .48 5.857-1.782 6.38-5.054.525-3.272-1.402-6.808-4.401-7.289-3-.48-5.935 2.276-6.46 5.548-.524 3.272 1.482 6.314 4.482 6.795z'
                      fill='currentColor'
                    />
                    <path
                      d='M73 23c0 10.493 10.68 19 3.5 19s-17-8.507-17-19 9.82-17 17-17S73 12.507 73 23z'
                      fill='currentColor'
                    />
                  </svg>
                </a>
              </Link>
            </StyledNavItem>
          </StyledList>
          <StyledBackground>
            <div />
            <div />
          </StyledBackground>
        </StyledNavigation>
      </StyledHeader>
      <svg xmlns='http://www.w3.org/2000/svg' version='1.1' style={{ position: 'absolute' }}>
        <defs>
          <filter id='goo'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='5' result='blur' />
            <feColorMatrix
              in='blur'
              type='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -10'
              result='goo'
            />
            <feComposite in='SourceGraphic' in2='goo' operator='atop' />
          </filter>
        </defs>
      </svg>
    </>
  )
}

export default Header
