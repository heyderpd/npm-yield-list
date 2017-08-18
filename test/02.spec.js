import assert from 'assert'

import yieldList from '../dist'

const items = [
  { a: 1 },
  { b: 2 },
  { c: 3 },
]

const itemsRev = [
  { c: 3 },
  { b: 2 },
  { a: 1 },
]

describe('list /dist', function() {
  it('push', () => {
    const list = yieldList()

    list
      .push(items[0])
      .push(items[1])
      .push(items[2])

    const arr = list.map()

    assert.deepEqual(
      arr,
      items)
  })

  it('from array', () => {
    const list = yieldList(items)

    const arr = list.map()

    assert.deepEqual(
      arr,
      items)
  })

  it('reverse', () => {
    const list = yieldList(items)

    const arr = list.map.reverse()

    assert.deepEqual(
      arr,
      itemsRev)
  })

  it('yield', () => {
    const list = yieldList(items)

    const iterator = list.map.yield()

    assert.deepEqual(
      iterator.next().value,
      {a: 1})
    assert.deepEqual(
      iterator.next().value,
      {b: 2})
    assert.deepEqual(
      iterator.next().value,
      {c: 3})
  })

  it('yield reverse', () => {
    const list = yieldList(items)

    const iterator = list.map.yield.reverse()

    assert.deepEqual(
      iterator.next().value,
      {c: 3})
    assert.deepEqual(
      iterator.next().value,
      {b: 2})
    assert.deepEqual(
      iterator.next().value,
      {a: 1})
  })

  it('yield reverse circular', () => {
    const list = yieldList(items)

    const iterator = list.map.yield.circular.reverse()

    assert.deepEqual(
      iterator.next().value,
      {c: 3})
    assert.deepEqual(
      iterator.next().value,
      {b: 2})
    assert.deepEqual(
      iterator.next().value,
      {a: 1})
    assert.deepEqual(
      iterator.next().value,
      {c: 3})
    assert.deepEqual(
      iterator.next().value,
      {b: 2})
  })
})
