import styled from 'styled-components'
import { useRef, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
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
    padding: calc(var(--vh, 1vh) * 5) calc(5vw + env(safe-area-inset-right)) calc(var(--vh, 1vh) * 3.5) calc(6vw + env(safe-area-inset-left));
  }
`

function CardGrid(props) {
  const containerRef = useRef()

  const handleHorizontalScroll = useCallback(e => {
    const container: HTMLElement = containerRef.current
    if (container) {
      document.body.addEventListener('wheel', e => {
        const target = e.target as HTMLElement
        if (e.deltaX) return
        if (container.contains(target)) {
           window.requestAnimationFrame(() => container.scrollTo({
            top: 0,
            left: container.scrollLeft + (e.deltaY * 3.5),
            behavior: 'smooth'
          }))
        } else {
          return
        }
      })
    }
  }, [containerRef])

  const debouncedScrollHandler = useRef(debounce(handleHorizontalScroll, 500, { leading: true }))

  useEffect(() => {
    const container: HTMLElement = containerRef.current
    const handler = debouncedScrollHandler.current
    document.addEventListener('mousewheel', handler, true)
    if (container) {
      const targets = container.querySelectorAll('img[data-src]')
      const imageObservers = Array.from(targets).map(lazyLoad)
      return () => {
        imageObservers.forEach(io => io.disconnect())
        document.removeEventListener('mousewheel', handler)
      }
    }
    return () => {
      document.removeEventListener('mousewheel', handler)
    }
  }, [containerRef])

  return (
    <StyledContainer>
      <ol {...props} ref={containerRef} />
    </StyledContainer>
  )
}

export default CardGrid