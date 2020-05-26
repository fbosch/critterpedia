import React, { useCallback } from 'react'
import Link from 'next/link'
import CardLabel from '../CardLabel'
import Card from './Card'
import Spacer from './Spacer'
import Price from './Price'

export type CardEntryProps = {
  fallback?: (color: string) => string
  image?: string
  title?: string
  id?: string
  price?: number
  showSpacer?: boolean
  group?: 'insects' | 'fish'
}

function CardEntry(props: CardEntryProps): JSX.Element {
  const { id, title, image, showSpacer, price, group, ...rest } = props
  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      event.preventDefault()
      if (window.location.hash !== id) window.location.hash = id
    },
    [id]
  )
  return (
    <Card {...rest}>
      <Link href={`/${group}/[id]`} as={`/${group}/${id}`}>
        <a draggable={false} id={id} tabIndex={0} aria-label={title} title={title} onFocus={handleFocus}>
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
