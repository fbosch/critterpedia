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
  const { id, title, image, showSpacer, price, group, ...rest } = props

  return (
    <Card {...rest}>
      <Link href={`/${group}/[id]`} as={`/${group}/${id}`}>
        <a draggable={false} id={id} tabIndex={0} aria-label={title} title={title}>
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
