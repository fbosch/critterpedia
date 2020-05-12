import styled from 'styled-components'
import { useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { ios, standalone } from '../theme'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import lazyLoad from '../utils/lazyLoad'

const StyledContainer = styled.div`
  font-size: 3rem;
  height: 100%;
  top: calc(var(--vh, 1vh) * 5);
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;

  ol {
    margin: 0;
    display: grid;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    grid-auto-flow: column;
    grid-template-rows: repeat(5, calc(var(--vh, 1vh) * 12));
    grid-template-columns: auto;
    padding: calc(var(--vh, 1vh) * 5) 0 calc(var(--vh, 1vh) * 3.5) calc(6vw + env(safe-area-inset-left));
    ${ios} {
      grid-template-rows: repeat(5, calc(var(--vh, 1vh) * 10));
      ${standalone} {
        grid-template-rows: repeat(5, calc(var(--vh, 1vh) * 12));
      }
    }
  }
`
const isSmoothScrollSupported = process.browser && 'scrollBehavior' in document.documentElement.style;

function CardGrid(props) {
  const listRef = useRef<HTMLElement>()

  const focusCard = useCallback(event => {
    const target: HTMLElement = event.target as HTMLElement
    if (target) {
      event.preventDefault()
      const id = target.getAttribute('id')
      target.removeAttribute('id')
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "smooth",
          inline: "center"
        })
        target.focus()
        target.setAttribute('id', id)
      })
    }
  }, [])

  const debouncedCardFocus = useRef(debounce(focusCard, 250, { leading: true }))
  const handleCardFocus = useCallback(event => {
    event.persist()
    debouncedCardFocus.current(event)
  }, [])

  const handleHorizontalScroll = useCallback(event => {
    const container: HTMLElement = listRef.current
    const target = event.target as HTMLElement
    if (event.deltaX) return
    console.log(event)
    if (container.contains(target)) {
       window.requestAnimationFrame(() => container.scrollTo({
        top: 0,
        left: container.scrollLeft + (event.deltaY * 4),
        behavior: 'smooth'
      }))
    }
  }, [listRef])

  const throttleScrollHandler = useRef(throttle(handleHorizontalScroll, 100, { leading: true }))

  useLayoutEffect(() => {
    if (window.location.hash) {
      const focusInitial = window.setInterval(() => {
        const focusTarget = document.getElementById(window.location.hash.replace('#', ''))
        if (focusTarget) window.requestAnimationFrame(() => focusTarget.focus())
        window.clearInterval(focusInitial)
      }, 300)
    }
  }, [])

  useEffect(() => {
    const container: HTMLElement = listRef.current
    const handler = throttleScrollHandler.current
    document.addEventListener('mousewheel', handler, true)
    if (container) {
      const targets = container.querySelectorAll('img[data-src]')
      const imageObservers = Array.from(targets).map(lazyLoad)
      return () => {
        imageObservers.forEach(io => io.disconnect())
        document.removeEventListener('mousewheel', handler, true)
      }
    }
    return () => {
      document.removeEventListener('mousewheel', handler, true)
    }
  }, [listRef, handleHorizontalScroll])

  return (
    <StyledContainer onFocus={isSmoothScrollSupported ? handleCardFocus : null}>
      <ol {...props} ref={listRef} />
    </StyledContainer>
  )
}

export default CardGrid