export default function lazyLoad(target: HTMLImageElement): IntersectionObserver {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
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
