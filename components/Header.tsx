import * as React from 'react'
import styled from 'styled-components'
import Link from './ActiveLink'
import border from '../public/assets/images/border.png'

const StyledHeader = styled.header`
  height: calc(var(--vh, 1vh) * 10);
  width: 100%;
  position: relative;
  grid-area: header;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    background-repeat: repeat-x;
    background-image: url(${border});
    background-size: 100% 7px;
    opacity: 0.8;
  }
`

const StyledNavItem = styled.li`
  background: ${props => props.theme.lightYellow};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: calc(var(--vh, 1vh) * 1.5);
  width: 6em;
  height: 6em;
  padding: 5px;
  border-radius: 100%;
  position: relative;
  z-index: 90;

  &:hover {
    svg {
      transform: scale(0.7);
    }
  }

  svg {
    width: 4em;
    color: ${props => props.theme.darkGrayAccent};
    transform: scale(0.6);
    transition: color 100ms linear, transform 200ms ease;
  }

  label {
    background: ${props => props.theme.orangeAccent};
    padding: .35em .75em;
    min-width: 3em;
    text-align: center;
    border-radius: 22% 22% 22% 22% / 40% 40% 40% 40%;
    font-weight: normal;
    letter-spacing: .05em;
    font-size: 1.2em;
    color: ${props => props.theme.grayAccent};
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translate(-50%, -100%) scale(0.5);
    opacity: 0;
    transition: opacity 100ms linear, transform 100ms linear 30ms;
  }

  a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:after {
      content: '';
        position: absolute;
        display: block;
        border: 3px dotted ${props => props.theme.grayAccent};
        border-radius: 100%;
        z-index: 5;
        height: 74%;
        width: 74%;
        opacity: 0;
        transition: opacity 200ms linear;
    }
    &:focus {
      outline: none;
      &:after {
        opacity: 0.3;
      }
      svg {
        transform: scale(0.7);
      }
    }
    &.active {
      svg {
        color: ${props => props.theme.orangeAccent};
        transform: scale(0.9);
      }
      label {
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
      }
    }
  }
`

const StyledNavigation = styled.nav`
  position: relative;
  height: 100%;
  width: 100%;

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    position: absolute;
    top: 45%;
    left: 3%;
  }
  li + li {
    transform: translateX(-10%);
  }
`

function Header(props) {

  return (
    <StyledHeader>
      <StyledNavigation>
        <ol role='navigation'>
          <StyledNavItem>
            <Link href='/' activeClassName='active'>
              <a>
                <label>
                  Insects
                </label>
                <svg viewBox="0 0 60 53" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M30 18.5c5.865 7.217 5.906 19.668.758 24.113S12.304 40.806 6.439 33.59C.574 26.372-1.06 13.995 4.087 9.55S24.135 11.283 30 18.5z" fill="currentColor"/><path d="M26.38 47.126c-3.805 3.908-11.071 6.648-14.104 3.509-3.034-3.139-.402-10.13 3.404-14.038 3.806-3.909 8.64-5.144 11.673-2.006 3.034 3.139 2.833 8.626-.973 12.535zM23.352 4.51c0 1.66-3.309 2.005-5.726 2.005-2.418 0-3.891-.845-3.891-2.507 0-1.661.862-3.008 4.753-3.008 2.418 0 4.864 1.848 4.864 3.51z" fill="currentColor"/><path d="M26.38 6.014l-3.89-3.009-2.432-1.002v4.01l1.945 2.006 1.349 1.003.11 2.507.973 3.51L30 18.5l-.5-3.462-1.66-3.51V8.52l-1.46-2.506zM30 19c-5.865 7.217-5.906 19.168-.758 23.613s18.454-1.807 24.319-9.024c5.865-7.217 7.5-19.594 2.352-24.039S35.865 11.783 30 19z" fill="currentColor"/><path d="M33.62 47.126c3.806 3.908 11.071 6.648 14.104 3.509 3.034-3.139.402-10.13-3.404-14.038-3.806-3.909-8.64-5.144-11.673-2.006-3.034 3.139-2.833 8.626.973 12.535zM36.648 4.51c0 1.66 3.309 2.005 5.726 2.005 2.418 0 3.891-.845 3.891-2.507 0-1.661-.862-3.008-4.753-3.008-2.418 0-4.864 1.848-4.864 3.51z" fill="currentColor"/><path d="M33.62 6.014l3.89-3.009 2.432-1.002v4.01L37.997 8.02l-1.349 1.003-.11 2.507-.973 3.51L30 19v-3.962l2.16-3.51V8.52l1.46-2.506z" fill="currentColor"/><path d="M30 18.5c5.865 7.217 5.906 19.668.758 24.113S12.304 40.806 6.439 33.59C.574 26.372-1.06 13.995 4.087 9.55S24.135 11.283 30 18.5zm0 0l-.5-3.462-1.66-3.51V8.52l-1.46-2.506-3.89-3.009-2.432-1.002v4.01l1.945 2.006 1.349 1.003.11 2.507.973 3.51L30 18.5zm0 .5c-5.865 7.217-5.906 19.168-.758 23.613s18.454-1.807 24.319-9.024c5.865-7.217 7.5-19.594 2.352-24.039S35.865 11.783 30 19zm0 0v-3.962l2.16-3.51V8.52l1.46-2.506 3.89-3.009 2.432-1.002v4.01L37.997 8.02l-1.349 1.003-.11 2.507-.973 3.51L30 19zm-3.62 28.126c-3.805 3.908-11.071 6.648-14.104 3.509-3.034-3.139-.402-10.13 3.404-14.038 3.806-3.909 8.64-5.144 11.673-2.006 3.034 3.139 2.833 8.626-.973 12.535zM23.353 4.51c0 1.66-3.309 2.005-5.726 2.005-2.418 0-3.891-.845-3.891-2.507 0-1.661.862-3.008 4.753-3.008 2.418 0 4.864 1.848 4.864 3.51zM33.62 47.126c3.806 3.908 11.071 6.648 14.104 3.509 3.034-3.139.402-10.13-3.404-14.038-3.806-3.909-8.64-5.144-11.673-2.006-3.034 3.139-2.833 8.626.973 12.535zM36.648 4.51c0 1.66 3.309 2.005 5.726 2.005 2.418 0 3.891-.845 3.891-2.507 0-1.661-.862-3.008-4.753-3.008-2.418 0-4.864 1.848-4.864 3.51z" stroke="currentColor"/></svg>
              </a>
            </Link>
          </StyledNavItem>
          <StyledNavItem>
            <Link href='/fish' activeClassName='active' >
              <a>
                <label>
                  Fish
                </label>
                <svg viewBox="0 0 79 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M31.5 46C48.897 46 63 33.203 63 20.5S48.897.5 31.5.5s-31 7.297-31 20S14.103 46 31.5 46zM12.43 24.213c3 .48 5.857-1.782 6.38-5.054.525-3.272-1.402-6.808-4.401-7.289-3-.48-5.935 2.276-6.46 5.548-.524 3.272 1.482 6.314 4.482 6.795z" fill="currentColor"/><path d="M73 23c0 10.493 10.68 19 3.5 19s-17-8.507-17-19 9.82-17 17-17S73 12.507 73 23z" fill="currentColor"/></svg>
              </a>
            </Link>
          </StyledNavItem>
        </ol>
      </StyledNavigation>
    </StyledHeader>
  )
}

export default Header