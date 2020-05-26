import React, { useRef, useCallback, useMemo, FormEvent } from 'react'
import { timingFunction, device } from '../theme'
import throttle from 'lodash.throttle'
import serialize from 'form-serialize'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const StyledForm = styled.form`
  width: auto;
  height: auto;
  position: absolute;

  &:not(:hover) input:not(:valid) + button {
    pointer-events: none;
  }

  label {
    position: absolute;
    top: 50%;
    left: 3.2vh;
    font-size: 1.2em;
    opacity: 0;
    transform: translateY(-50%);
    will-change: opacity;
    transition: opacity 250ms linear 100ms;
    color: ${(props) => props.theme.darkGrayAccent};
  }

  input:valid,
  input:focus,
  &:hover input {
    width: 70vw;
    padding: 3vh 6vh 3vh 3vh;
    border-color: ${(props) => props.theme.lightYellow};
    transition-delay: 150ms;

    &:not(:valid):not(:focus) ~ label {
      opacity: 0.4;
      transition: opacity 250ms linear 200ms;
    }
    &:valid ~ label {
      transition: opacity 100ms linear;
    }

    & ~ button {
      color: white;
      background-color: ${(props) => props.theme.orangeAccent};
      transform: translate(calc(1.3vh - 50%), -50%);
      right: 0%;
      top: 50%;
      transition-delay: 150ms;
      svg {
        transform: scale(0.8) translate(-50%, -50%);
      }
    }
  }
`

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.grayAccent};
  border-style: none;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  height: 5vh;
  width: 5vh;
  max-width: 60px;
  max-height: 60px;
  min-height: 35px;
  min-width: 35px;
  border-radius: 100%;
  outline: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  will-change: transform, background-color, color, right;
  transition: transform 250ms ${timingFunction}, background-color 150ms ${timingFunction}, color 250ms ${timingFunction},
    right 200ms ${timingFunction};
  transition-delay: 400ms;
  @media ${device.laptop} {
    svg {
      max-height: inherit;
      max-width: inherit;
      min-height: 50px;
      min-width: 50px;
    }
  }
  svg {
    padding: 10px;
    height: inherit;
    width: inherit;
    min-height: 40px;
    min-width: 40px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform-origin: 0 0;
    transform: scale(1) translate(-50%, -50%);
    transition: transform 200ms ${timingFunction} 50ms;
    transition-delay: inherit;
  }
`

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.lightYellow};
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
  letter-spacing: 0.05em;
  outline: none;
  color: ${(props) => props.theme.darkGrayAccent};
  border: 2px solid transparent;
  transition: border 250ms ${timingFunction}, width 250ms ${timingFunction}, padding 300ms ${timingFunction};
  transition-delay: 400ms;
  box-shadow: 0px 11px 20px -20px rgba(185, 177, 127, 0.5), 0 6px 6px rgba(237, 227, 179, 0.6);
  @media ${device.desktop} {
    min-height: unset;
    min-width: unset;
  }

  &::-ms-clear,
  &::-webkit-clear-button {
    display: none;
  }
`

function SearchBar(): JSX.Element {
  const searchRef = useRef<HTMLInputElement>()
  const router = useRouter()

  const handleClickForm = useCallback(() => {
    const input: HTMLInputElement = searchRef.current
    if (document.activeElement !== input) window.requestAnimationFrame(() => input.focus())
  }, [])

  const handleSearch = useCallback(
    (event: FormEvent) => {
      const form: HTMLFormElement = event.target as HTMLFormElement
      const query = serialize(form, { hash: true })
      event.preventDefault()
      router.push({
        pathname: router.pathname,
        query,
      })
    },
    [router]
  )

  const handleSearchRouting = useCallback(
    (value) => {
      const pathname = '/' + router.pathname.split('/')[1]
      if (value === '') {
        router.push({ pathname })
      } else {
        router.push({ pathname, query: { search: value } })
      }
    },
    [router.pathname]
  )

  const throttledSearch = useMemo(() => throttle(handleSearchRouting, 350), [handleSearchRouting])
  const handleInputChange = useCallback(
    (event) => {
      if (event.target.value === '' || event.target.value === undefined) {
        handleSearchRouting('')
      } else {
        throttledSearch(event.target?.value ?? '')
      }
    },
    [router, handleSearchRouting]
  )

  return (
    <StyledForm
      action={`/${router.pathname?.split('/')[1]}`}
      noValidate
      onSubmit={handleSearch}
      onClick={handleClickForm}
    >
      <StyledInput
        type='search'
        id='search'
        name='search'
        onInput={handleInputChange}
        defaultValue={router.query?.search}
        ref={searchRef}
        minLength={1}
        required
        autoComplete='off'
        onReset={() => router.push({ pathname: router.pathname })}
        tabIndex={0}
      />
      <label htmlFor='search'>Search</label>
      <StyledButton type='submit' aria-label='search'>
        <svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 71 71'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M30 60a30 30 0 100-60 30 30 0 000 60zm0-7a23 23 0 100-46 23 23 0 000 46z'
            fill='currentColor'
          />
          <path
            d='M51 44l20 16-11 11-17-19 8-8zM23 43c-2 2-3 2-7 1-2-2-2-4-1-7 2-2 4-2 7 1 2 2 3 3 1 5zM21 24c0 5 0 9-4 10-4 0-5-4-5-10 0-5 7-12 12-10 6 3-3 5-3 10z'
            fill='currentColor'
          />
        </svg>{' '}
      </StyledButton>
    </StyledForm>
  )
}

export default SearchBar
