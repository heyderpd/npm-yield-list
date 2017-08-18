import { scopedObject, isArray } from 'pytils'

import createMap from './map'

const listItem = (obj, key, remove) => {
  return scopedObject({
      obj,
      key
    }, {
      remove
    })
}

export default Arr => {
  const yieldList = {}

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

  const remove = state => () => removeFromList(state.key)

  const push = obj => {
    const key = state.lastKeys
    const item = listItem(obj, key, remove)
    state.links[key] = item

    if (!ifFirstSet(item)) {
      setLast(item)
    }

    state.lastKeys += 1
    state.length += 1

    return yieldList
  }

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
  yieldList.push = push
  yieldList.map = createMap(makeCircular, state)
  yieldList.state = state // remove in future

  return yieldList
}