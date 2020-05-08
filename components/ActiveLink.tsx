import React, { Children } from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

const ActiveLink = ({ router, children, ...props }) => {
	const child = Children.only(children)
	const { href, activeClassName, ...rest } = props

  let className= child.props.className || ''
  if (router.pathname===props.href&&props.activeClassName) {
     className=`${className}${props.activeClassName}`.trim()
  }

  return <Link href={href} {...rest}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)