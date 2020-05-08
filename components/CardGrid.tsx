import styled from 'styled-components'
import { useRef, useCallback, useLayoutEffect } from 'react'

const StyledContainer = styled.div`
  font-size: 3rem;
  height: calc(var(--vh, 1vh) * 60);
  padding: calc(var(--vh, 1vh) * 5) 0;
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;

`

const CardWrapper = styled.div`
  display: grid;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  grid-auto-flow: column;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(1000, calc(var(--vh, 1vh) * 17));
  padding: calc(var(--vh, 1vh) * 8) 0 calc(var(--vh, 1vh) * 2) 5vw;
  &:focus {
    outline: none;
  }
  :after {
    content: '';
    display: block;
    width: 5vw;
  }

`

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.getAttribute('data-src')
        img.removeAttribute('data-src')
        observer.disconnect()
        window.requestAnimationFrame(() => {
          const imageInBackground = new Image()
          imageInBackground.src = src
          imageInBackground.onload = () => {
            img.setAttribute('src', src)
          }
        })
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
            left: container.scrollLeft + (e.deltaY * 3),
            behavior: 'smooth'
          }))
        } else {
          return
        }
      })
    }
  }, [containerRef])

  useLayoutEffect(() => {
    const container: HTMLElement = containerRef.current
    document.addEventListener('mousewheel', handleHorizontalScroll, true)
    if (container) {
      container.focus()
      const targets = container.querySelectorAll('img[data-src]')
      const imageObservers = Array.from(targets).map(lazyLoad)
      console.log('lazyLoad!')
      return () => {
        imageObservers.forEach(io => io.disconnect())
        document.removeEventListener('mousewheel', handleHorizontalScroll, true)
      }
    }
    return () => {
      document.removeEventListener('mousewheel', handleHorizontalScroll, true)
    }
  }, [containerRef])

  return (
    <StyledContainer>
      <CardWrapper {...props} ref={containerRef} tabIndex={0} />
    </StyledContainer>
  )
}

export default CardGrid