import React, { useRef, useCallback } from 'react'
import { timingFunction, device } from '../theme'
import styled from 'styled-components'

const StyledForm = styled.form`
  width: auto;
  height: auto;
  position: relative;
`

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.grayAccent};
  border-style: none;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  height: calc(var(--vh, 1vh) * 4);
  width: calc(var(--vh, 1vh) * 4);
  max-width: 55px;
  max-height: 55px;
  min-height: 35px;
  min-width: 35px;
  border-radius: 100%;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  transition: transform 250ms ${timingFunction} 50ms, background-color 150ms ${timingFunction} 30ms, color 250ms ${timingFunction}, right 200ms ${timingFunction};
  &:focus {
    outline: none;
  }
  @media ${device.laptop} {
    svg {
      max-height: 65px;
      max-width: 65px;
      min-height: 50px;
      min-width: 50px;
    }
  }
  svg {
    padding: 10px;
    height: 100%;
    width: 100%;
    min-height: 40px;
    min-width: 40px;
    top: 50%;
    left: 50%;
    position:absolute;
    transform-origin: 0 0;
    transform: scale(1) translate(-50%, -50%);
    transition: transform 200ms ${timingFunction} 50ms;
  }
`

const StyledInput = styled.input`
  background-color: ${props => props.theme.lightYellow};
  -webkit-appearance: none;
  border: none;
  width: 1.4vh;
  height: 1.4vh;
  min-height: 50px;
  min-width: 50px;
  max-width: 450px;
  padding: 3.5vh;
  border-radius: 10vh;
  font-size: 1.2em;
  letter-spacing: .05em;
  color: ${props => props.theme.darkGrayAccent};
  border: 2px solid transparent;
  transition: border 250ms ${timingFunction}, width 250ms ${timingFunction}, padding 300ms ${timingFunction} 50ms;
  box-shadow: 0px 11px 20px -20px rgba(185, 177, 127, 0.5), 0 6px 6px rgba(237, 227, 179, 0.6);
  @media ${device.desktop} {
    min-height: unset;
    min-width: unset;
  }

  &::-ms-clear, &::-webkit-clear-button {
    display: none;
  }

  &:focus, &:valid {
    width: 70vw;
    outline: none;
    padding: 3vh 6vh 3vh 3vh;
    border-color: ${props => props.theme.lightYellow};
    + button {
      color: white;
      background-color: ${props => props.theme.orangeAccent};
      transform: translate(-30%, -50%);
      right: 0%;
      top: 50%;

      svg {
        transform: scale(0.8) translate(-50%, -50%);
      }
    }
  }
`

function SearchBar(props) {
  const searchRef = useRef()

  const handleSubmit = useCallback(e => {
    console.log('submit')
    e.preventDefault()
  }, [searchRef])

  const handleSearchButtonClick = useCallback(e => {
    const searchInput = searchRef.current as HTMLElement
    e.preventDefault()
    if (document.activeElement !== searchInput) {
      searchInput.focus()
    }
  }, [])

  return (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <StyledInput type='search' id='search-critterpedia' name='search-critterpedia' ref={searchRef} minLength={1} required autoComplete="off" tabIndex={0} />
      <StyledButton onClick={handleSearchButtonClick} type='submit' onFocus={handleSearchButtonClick}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 71"><path fillRule="evenodd" clipRule="evenodd" d="M30 60c16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0 13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30zm0-7c12.703 0 23-10.297 23-23S42.703 7 30 7 7 17.297 7 30s10.297 23 23 23z" fill="currentColor"/><path d="M51 43.5l19.991 16.178L59.678 70.99 43 51.5l8-8zM23 43c-1.757 1.757-3.5 2-6.818.511C14.23 41.56 13.5 39.5 15 37c1.757-1.757 3.5-2 6.646.612C23.6 39.565 25 41 23 43zM20.5 24c0 5 0 8.5-4 10-3.866 0-5-4-4.5-10 0-4.694 7-12 11.5-10.5 6.5 3.5-3 5.806-3 10.5z" fill="currentColor"/></svg>
      </StyledButton>
    </StyledForm>
  )
}

export default SearchBar