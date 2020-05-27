import React, { Children } from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

type Props = {
  href: string
  activeClassName?: string
}

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)
  const { href, activeClassName, ...rest } = props as Props

  let className = child.props.className || ''
  if (router.pathname.startsWith(props.href) && props.activeClassName) {
    className = `${className}${props.activeClassName}`.trim()
  }

  return (
    <Link href={href} {...rest}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default withRouter(ActiveLink)
