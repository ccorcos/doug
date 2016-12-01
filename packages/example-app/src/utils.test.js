import assert from 'assert'
import { add } from './utils'

describe('Test', () => {
  describe('addition', () => {
    it('1 + 1 = 2', () => {
      assert.equal(add(1, 1), 2)
    })
  })
})
