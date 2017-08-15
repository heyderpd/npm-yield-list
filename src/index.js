import { createObject, isArray } from 'pytils'

const listItem = (state, remove) => {
  return createObject(
    state,
  { remove })
}

export default Arr => {

  const state = {
    lastKeys: 0,
    length: 0,
    first: {},
    last: {},
    links: {},
    position: 0
  }

  const createFromArray = Arr => {
    if (isArray(Arr)) {
      Arr.map(
        item => push(item))
    }
  }

  const chainItem = (itemA, itemB) => {
    itemA.next = itemB
    itemB.before = itemA
  }

  const getFirst = () => state.first.next

  const getLast = () => state.last.before

  const setFirst = item => {
    const first = getFirst()
    chainItem(state.first, item)
    chainItem(item, first)
  }

  const setLast = item => {
    const last = getLast()
    chainItem(last, item)
    chainItem(item, state.last)
  }

  const ifFirstSet = item => {
    if (state.length === 0) {
      chainItem(state.first, item)
      chainItem(item, state.last)
      return true
    }
  }

  const removeFromList = key => {
    const item = state.links[key]
    if (item) {
      chainItem(
        item.before,
        item.next)
      delete state.links[key]
      state.length -= 1
    }
  }
  const remove = state => () => removeFromList(state().key)

  const push = obj => {
    const item = listItem({
        obj,
        key: state.lastKeys
      },
      remove)

    if (!ifFirstSet(item)) {
      setLast(item)
    }

    state.lastKeys += 1
    state.length += 1
  }

  const mapFrom = (first, next) => (fx = x=>x, circular = false) => {
    if (circular) {
      return circularMap(first, next, fx)
    }

    let nextItem = first    
    let limit = state.length
    const result = []
    while (nextItem = next(nextItem)) {
      if (limit-- < 0) {
        throw 'infinit map! this is a Circular!'
      }

      const { obj } = nextItem
      if (obj) {
        result.push(fx(obj))
      }
    }
    return result
  }

  const circularMap = function* (nextItem, next, fx) {
    while (nextItem = next(nextItem)) {
      const { obj } = nextItem
      if (obj) {
        yield fx(obj)
      }
    }
  }
  
  const map = mapFrom(
    state.first,
    i => i.next)

  const mapReverse = mapFrom(
    state.last,
    i => i.before)

  const makeCircular = circular => {
    const first = getFirst()
    const last = getLast()
    if (circular) {
      chainItem(last, first)            
    } else {
      first.before = state.first      
      last.next = state.last
    }
  }

  createFromArray(Arr)

  return {
    push,
    map,
    mapReverse,
    makeCircular,
    state
  }
}