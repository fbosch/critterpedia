import styled from 'styled-components'
import { useRef, useCallback, useEffect, useMemo } from 'react'
import { ios, standalone } from '../theme'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import lazyLoad from '../utils/lazyLoad'

const StyledContainer = styled.section`
  font-size: 3rem;
  height: auto;
  margin-top: 2.5vh;
  overflow-x: hidden;
  position: relative;

  ol {
    margin: 0;
    display: grid;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
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
  const holdDownRef = useRef<any>(false)
  const draggingRemoveRef = useRef<any>()
  const clientPositionRef = useRef<any>({ clientX: 0, startX: 0 })

  const handleMouseDown = useCallback((event) => {
    const list = listRef.current
    window.cancelAnimationFrame(draggingRemoveRef.current)
    if (dragMovingRef.current) return
    if (mouseDownRef.current === false) {
      clientPositionRef.current = {
        startX: event.pageX - list.offsetLeft,
        clientX: list.scrollLeft,
      }
      holdDownRef.current = window.setTimeout(() => {
        mouseDownRef.current = true
      }, 33)
    }
  }, [])

  const handleMouseUp = useCallback((event) => {
    window.clearTimeout(holdDownRef.current)
    if (mouseDownRef.current || dragMovingRef.current) {
      event.preventDefault()
      mouseDownRef.current = false
      const list = listRef.current
      draggingRemoveRef.current = window.requestAnimationFrame(() => {
        dragMovingRef.current = false
        list.classList.remove('is-dragging')

        // list.scrollBy({ left: 100, behavior: 'smooth' })
        // window.setTimeout(() => {
        // }, 700)
      })
    }
  }, [])

  const handleMouseMove = useCallback((event) => {
    if (mouseDownRef.current === true) {
      const list = listRef.current
      window.cancelAnimationFrame(draggingRemoveRef.current)
      if (dragMovingRef.current === false && mouseDownRef.current === true) {
        dragMovingRef.current = true
        list.classList.add('is-dragging')
      }
      const previousPosition = clientPositionRef.current
      const clientX = event.pageX - list.offsetLeft
      const walk = (clientX - previousPosition.startX) * 1

      list.scrollLeft = previousPosition.clientX - walk
      clientPositionRef.current = {
        startX: event.pageX - list.offsetLeft,
        clientX: list.scrollLeft,
      }
      event.preventDefault()
    }
  }, [])

  const handleHorizontalScroll = useCallback((event) => {
    if (dragMovingRef.current === true) {
      event.preventDefault()
      return
    }
    const list: HTMLElement = listRef.current
    const target = event.target as HTMLElement
    if (event.deltaX) return
    const modifier = isFirefox ? 60 : isSafari ? 0.8 : 5
    if (list && list.contains(target)) {
      list.scrollTo({
        top: 0,
        left: list.scrollLeft + event.deltaY * modifier,
        behavior: 'smooth',
      })
    }
  }, [])

  const throttleScrollHandler = useRef(throttle(handleHorizontalScroll, 100, { leading: true }))

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
    const list: HTMLElement = listRef.current
    const handler = throttleScrollHandler.current
    document.body.addEventListener('wheel', handler, true)
    if (list) {
      const targets = list.querySelectorAll('img[data-src]')
      const imageObservers = Array.from(targets).map(lazyLoad)
      // const intersectionObservers = Array.from(list.children).map((childNode) => {
      //   const io = new IntersectionObserver((entries, observer) => {
      //     const visibleEntries = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target)
      //     console.log(visibleEntries)
      //   })
      //   io.observe(childNode)
      //   return io
      // })
      return () => {
        imageObservers.forEach((io) => io.disconnect())
        // intersectionObservers.forEach((io) => io.disconnect())
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
