import Fuse from 'fuse.js'
import memoize from 'fast-memoize'

const config: Fuse.IFuseOptions<Object> = {
  keys: ['id', 'name', 'price', 'location'],
  shouldSort: true,
  includeMatches: true,
  threshold: 0.2,
  distance: 100,
}

function search(collection: Array<Object>, query: string) {
  const fuse = new Fuse(collection, config)
  return fuse.search(query).map((result) => result.item)
}

export default memoize(search)
