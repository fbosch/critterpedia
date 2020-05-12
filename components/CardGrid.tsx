import styled from 'styled-components'
import { useRef, useCallback, useEffect } from 'react'
import { ios, standalone } from '../theme'
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
  const listRef = useRef()

  const handleCardFocus = useCallback(event => {
    const target: HTMLElement = event.target as HTMLElement
    if (!target) return
    const node = target.tagName === 'A' ? target.parentElement : target
    if (node.hasAttribute('id')) {
      const id = node.getAttribute('id')
      node.removeAttribute('id')
      window.location.hash = id
      window.requestAnimationFrame(() => {
        node.scrollIntoView({
          behavior: "smooth",
          inline: "center"
        })
      })
      node.focus()
      node.setAttribute('id', id)
    }
  }, [])

  const debouncedCardFocus = useRef(debounce(handleCardFocus, 300, { leading: true }))

  const handleHorizontalScroll = useCallback(e => {
    const container: HTMLElement = listRef.current
    if (container) {
      document.body.addEventListener('wheel', e => {
        const target = e.target as HTMLElement
        if (e.deltaX) return
        if (container.contains(target)) {
           window.requestAnimationFrame(() => container.scrollTo({
            top: 0,
            left: container.scrollLeft + (e.deltaY * 4),
            behavior: 'smooth'
          }))
        } else {
          return
        }
      })
    }
  }, [listRef])

  const debouncedScrollHandler = useRef(debounce(handleHorizontalScroll, 500, { leading: true }))

  useEffect(() => {
    const container: HTMLElement = listRef.current
    const handler = debouncedScrollHandler.current
    document.addEventListener('mousewheel', handler, true)
    if (window.location.hash) {
      const focusTarget = document.getElementById(window.location.hash.replace('#', ''))
      if (focusTarget) focusTarget.focus()
    }
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
  }, [listRef])

  return (
    <StyledContainer onFocus={debouncedCardFocus.current}>
      <ol {...props} ref={listRef} />
    </StyledContainer>
  )
}

export default CardGrid