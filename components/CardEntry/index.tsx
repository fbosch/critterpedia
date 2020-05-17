import React, { useCallback } from 'react'
import Link from 'next/link'
import CardLabel from '../CardLabel'
import Card from './Card'
import Spacer from './Spacer'
import Price from './Price'
import { useRouter } from 'next/router'

export type CardEntryProps = {
  fallback?: Function
  image?: string
  title?: string
  id?: string
  price?: number
  showSpacer?: boolean
  group?: 'insects' | 'fish'
}

function CardEntry(props: CardEntryProps) {
  const router = useRouter()
  const { id, title, image, showSpacer, price, group, ...rest } = props

  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      event.preventDefault()
      if (window.location.hash !== id) {
        const target = event.currentTarget
        target.removeAttribute('id')
        window.requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          })
          const defferedHashChange = window.setInterval(() => {
            window.clearInterval(defferedHashChange)
            window.location.hash = id
            target.setAttribute('id', id)
          }, 250)
        })
      }
    },
    [id]
  )

  // const handleClick = useCallback(
  //   (event: React.MouseEvent) => {
  //     if (window.location.hash?.replace('#', '') === id) return
  //     event.preventDefault()
  //   },
  //   [id]
  // )

  const handleDoubleClick = useCallback(() => {
    event.preventDefault()
    router.push({ pathname: `/${group}/${id}` })
    return
  }, [id, group])

  return (
    <Card {...rest}>
      <Link href={`/${group}/[id]`} as={`/${group}/${id}`}>
        <a
          draggable={false}
          id={id}
          tabIndex={0}
          onDoubleClick={handleDoubleClick}
          onFocus={handleFocus}
          aria-label={title}
          title={title}
        >
          <CardLabel title={props.title} />
          {image && (
            <>
              <noscript>
                <img src={image} loading='lazy' draggable='false' alt={title} />
              </noscript>
              <img data-src={image} loading='eager' draggable='false' alt={title} />
            </>
          )}
          {price && <Price aria-label='price'>{price}</Price>}
          {showSpacer && <Spacer />}
        </a>
      </Link>
    </Card>
  )
}

export default CardEntry
