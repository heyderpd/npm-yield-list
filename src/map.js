export default (makeCircular, state) => {

  const simpleMap = (limit, nextItem, next, fx = x=>x) => {
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

  const generatorMap = function* (nextItem, next, fx = x=>x) {
    while (nextItem = next(nextItem)) {
      const { obj } = nextItem
      if (obj) {
        yield fx(obj)
      }
    }
  }

  const mapForward = fx => simpleMap(
    state.length,
    state.first,
    i => i.next,
    fx)

  const mapReverse = fx => simpleMap(
    state.length,
    state.last,
    i => i.before,
    fx)

  const mapGeneratorForward = fx => generatorMap(
    state.first,
    i => i.next,
    fx)

  const mapGeneratorReverse = fx => generatorMap(
    state.last,
    i => i.before,
    fx)

  const map = fx => {
    makeCircular(false)
    return mapForward(fx)
  }

  map.reverse = fx => {
    makeCircular(false)
    return mapReverse(fx)
  }

  map.yield = fx => {
    makeCircular(false)
    return mapGeneratorForward(fx)
  }

  map.yield.reverse = fx => {
    makeCircular(false)
    return mapGeneratorReverse(fx)
  }

  map.yield.circular = fx => {
    makeCircular(true)
    return mapGeneratorForward(fx)
  }

  map.yield.circular.reverse = fx => {
    makeCircular(true)
    return mapGeneratorReverse(fx)
  }

  return map
}