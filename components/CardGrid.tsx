import styled from 'styled-components'
import { useRef, useCallback, useEffect } from 'react'
import { ios, standalone } from '../theme'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import lazyLoad from '../utils/lazyLoad'

const StyledContainer = styled.div`
  font-size: 3rem;
  height: auto;
  margin-top: 3vh;
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
      grid-template-rows: repeat(5, calc(var(--vh, 1vh) * 10.5));
      ${standalone} {
        grid-template-rows: repeat(5, calc(var(--vh, 1vh) * 12));
      }
    }
  }
`
const isFirefox = process.browser && /^((?!chrome|android).)*firefox/i.test(navigator.userAgent)
const isSafari = process.browser && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
const isSmoothScrollSupported = process.browser && 'scrollBehavior' in document.documentElement.style

function CardGrid(props) {
  const listRef = useRef<HTMLElement>()

  const focusCard = useCallback((event) => {
    const target: HTMLElement = event.target as HTMLElement
    if (target) {
      event.preventDefault()
      const id = target.getAttribute('id')
      target.removeAttribute('id')
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
        })
        window.requestAnimationFrame(() => target.setAttribute('id', id))
      })
    }
  }, [])

  const debouncedCardFocus = useRef(debounce(focusCard, 100))
  const handleCardFocus = useCallback((event) => {
    event.persist()
    debouncedCardFocus.current(event)
  }, [])

  const handleHorizontalScroll = useCallback((event) => {
    const container: HTMLElement = listRef.current
    const target = event.target as HTMLElement
    if (event.deltaX) return
    const modifier = isFirefox ? 60 : isSafari ? 0.8 : 5
    event.preventDefault()
    if (container && container.contains(target)) {
      window.requestAnimationFrame(() =>
        container.scrollTo({
          top: 0,
          left: container.scrollLeft + event.deltaY * modifier,
          behavior: 'smooth',
        })
      )
    }
  }, [])

  const throttleScrollHandler = useRef(throttle(handleHorizontalScroll, 33, { leading: true, maxWait: 100 }))

  // TODO: Improve router integration with grid
  useEffect(() => {
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ inline: 'center' })
        target.focus()
      }
    }
  }, [])

  useEffect(() => {
    const container: HTMLElement = listRef.current
    const handler = throttleScrollHandler.current
    document.body.addEventListener('wheel', handler, true)
    if (container) {
      const targets = container.querySelectorAll('img[data-src]')
      const imageObservers = Array.from(targets).map(lazyLoad)
      return () => {
        imageObservers.forEach((io) => io.disconnect())
        document.body.removeEventListener('wheel', handler)
      }
    }
    return () => {
      document.body.removeEventListener('wheel', handler)
    }
  }, [handleHorizontalScroll])

  return (
    <StyledContainer onFocus={isSmoothScrollSupported ? handleCardFocus : null}>
      <ol {...props} ref={listRef} />
    </StyledContainer>
  )
}

export default CardGrid
