# yield-list
creat a doubly linked list, using a simple comands.
and have a iterator map too!

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

Example:
```javascript
import yieldList from 'yield-list'

// create from array
const Arr = [1, 2, 3]
const list = yieldList(Arr)

// create using push
const a = {a: 1}
const b = {b: 2}
const c = {c: 2}
const list = yieldList()
list
  .push(a)
  .push(b)
  .push(c)

// maps!
// [{a: 1}, {b: 2}, {c: 3}]
const arr = list.map()
// [{c: 3}, {b: 2}, {a: 1}] // No need reverse the array! It's a direct map.
const arr = list.map.reverse()

// return a generator function
// function will apply by item
// do a map useind 'yield' by item
iterator = list.map.yield()

iterator.next().value // {a: 1}
iterator.next().value // {b: 2}
iterator.next().value // {c: 3}

// can make a circular array!
iterator = list.map.yield.circular()
```
