import styled from 'styled-components'
import { useRef, useCallback, useEffect, useMemo } from 'react'
import { ios, standalone } from '../theme'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import lazyLoad from '../utils/lazyLoad'

const StyledContainer = styled.section`
  font-size: 3rem;
  height: auto;
  margin-top: 3vh;
  overflow-x: hidden;
  position: relative;

  ol {
    margin: 0;
    display: grid;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    scroll-snap-align: center;
    /* scroll-behavior: smooth; */
    &.is-dragging {
      cursor: move;
      scroll-snap-type: none;
    }
    grid-auto-flow: column;
    grid-template-rows: repeat(5, 12vh);
    grid-template-columns: repeat(auto-fill, 15vh);
    padding: 5vh 0 3.5vh calc(6vw + env(safe-area-inset-left));

    .no-js & {
      grid-template-rows: repeat(6, 12vh);
    }
    ${ios} {
      grid-template-rows: repeat(5, 10.5vh);
      ${standalone} {
        grid-template-rows: repeat(5, 12vh);
      }
    }
  }
`
const isFirefox = process.browser && /^((?!chrome|android).)*firefox/i.test(navigator.userAgent)
const isSafari = process.browser && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

function CardGrid(props) {
  const listRef = useRef<HTMLElement>()
  const mouseDownRef = useRef<Boolean>(false)
  const dragMovingRef = useRef<Boolean>(false)
  const clientPositionRef = useRef<any>({ clientX: 0, startX: 0 })

  const handleMouseDown = useCallback((event) => {
    console.log('mouse down')
    const list = listRef.current
    mouseDownRef.current = true
    clientPositionRef.current = {
      startX: event.pageX - list.offsetLeft,
      clientX: list.scrollLeft,
    }
  }, [])

  const handleMouseUp = useCallback((event) => {
    if (mouseDownRef.current) {
      event.preventDefault()
      mouseDownRef.current = false
      dragMovingRef.current = false
      const list = listRef.current
      window.requestAnimationFrame(() => {
        list.classList.remove('is-dragging')
      })
    }
  }, [])

  const handleMouseMove = useCallback((event) => {
    if (mouseDownRef.current) {
      event.preventDefault()
      const list = listRef.current
      if (dragMovingRef.current === false) {
        list.classList.add('is-dragging')
      }
      dragMovingRef.current = true
      const previousPosition = clientPositionRef.current
      const clientX = event.pageX - list.offsetLeft
      const walk = (clientX - previousPosition.startX) * 1.2

      list.scrollLeft = previousPosition.clientX - walk
      clientPositionRef.current = {
        startX: event.pageX - list.offsetLeft,
        clientX: list.scrollLeft,
      }
    }
  }, [])

  const handleHorizontalScroll = useCallback((event) => {
    const list: HTMLElement = listRef.current
    const target = event.target as HTMLElement
    if (event.deltaX) return
    const modifier = isFirefox ? 60 : isSafari ? 0.8 : 5
    if (list && list.contains(target)) {
      window.requestAnimationFrame(() =>
        list.scrollTo({
          top: 0,
          left: list.scrollLeft + event.deltaY * modifier,
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
    <StyledContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <ol {...props} ref={listRef}>
        {props.children}
      </ol>
    </StyledContainer>
  )
}

export default CardGrid
