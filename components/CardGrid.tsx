import styled from 'styled-components'
import { useRef, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'

const StyledContainer = styled.div`
  font-size: 3rem;
  height: calc(var(--vh, 1vh) * 60);
  top: calc(var(--vh, 1vh) * 5);
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;
  padding-bottom: calc(var(--vh, 1vh) * 7);

`

const CardWrapper = styled.ol`
  margin: 0;
  display: grid;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  grid-auto-flow: column;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(2000, calc(var(--vh, 1vh) * 17));
  padding: calc(var(--vh, 1vh) * 5) 0 5px 4vw;
  &:focus {
    outline: none;
  }

`

function lazyLoad(target) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.getAttribute('data-src')
        img.removeAttribute('data-src')
        observer.disconnect()
        const imageInBackground = new Image()
        imageInBackground.src = src
        imageInBackground.onload = () => {
          window.requestAnimationFrame(() => {
            img.setAttribute('src', src)
          })
        }
      }
    })
  })
  io.observe(target)
  return io
}

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
      const firstChild = Array.from(container.childNodes)[0] as HTMLElement
      if (firstChild) window.requestAnimationFrame(() => firstChild.focus())
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
      <CardWrapper {...props} ref={containerRef} tabIndex={0} />
    </StyledContainer>
  )
}

export default CardGrid