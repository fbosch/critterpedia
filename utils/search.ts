import Fuse from 'fuse.js'
import memoize from 'fast-memoize'

const config: Fuse.IFuseOptions<Critter> = {
  keys: ['id', 'name', 'price', 'location'],
  shouldSort: true,
  includeMatches: true,
  threshold: 0.2,
  distance: 100,
}

function searchCritter(collection: Array<Critter>, query: string) {
  const fuse = new Fuse(collection, config)
  return fuse.search(query).map((result) => result.item)
}

export default memoize(searchCritter)
