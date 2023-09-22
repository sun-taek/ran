import { describe, expect, it } from 'vitest'
import randomArray from '../src/sort/randomArray'
import { MinHeap } from '../src/arithmetic/index'

describe('Heap', () => {
    it('Heap sort', () => {
        const list = randomArray(20)
        const { arr } = new MinHeap(list)
        expect(arr).toEqual([...list].sort((a, b) => a - b))
    })
})