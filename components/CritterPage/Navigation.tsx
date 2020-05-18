import styled from 'styled-components'
import Link from 'next/link'

const StyledNavigation = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: flex-end;
  width: 100%;
  a {
    color: ${(props) => props.theme.grayAccent};
    text-decoration: none;
  }
`

export default function Navigation({ neighbours, group }) {
  return (
    <StyledNavigation>
      {neighbours.prev ? (
        <Link href={`/${group}/[id]`} as={`/${group}/${neighbours.prev}`}>
          <a>Previous</a>
        </Link>
      ) : (
        <span />
      )}
      {neighbours.next ? (
        <Link href={`/${group}/[id]`} as={`/${group}/${neighbours.next}`}>
          <a>Next</a>
        </Link>
      ) : (
        <span />
      )}
    </StyledNavigation>
  )
}
