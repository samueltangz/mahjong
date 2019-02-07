const assert = require('assert')

const { isDot, isBamboo, isCharacter, isWind, isDragon } = require('../../src/utils/index')

const { tileTypeTests } = require('../test_cases')

describe('utils/index.js', () => {
  describe('isDot', () => {
    test('should check correctly', () => {
      tileTypeTests.forEach((test, index) => {
        const actualOutput = isDot(test.tile)
        assert.deepStrictEqual(actualOutput, test.expected.isDot, new Error(`incorrect output for test #${index}`))
      })
    })
  })
  describe('isBamboo', () => {
    test('should check correctly', () => {
      tileTypeTests.forEach((test, index) => {
        const actualOutput = isBamboo(test.tile)
        assert.deepStrictEqual(actualOutput, test.expected.isBamboo, new Error(`incorrect output for test #${index}`))
      })
    })
  })
  describe('isCharacter', () => {
    test('should check correctly', () => {
      tileTypeTests.forEach((test, index) => {
        const actualOutput = isCharacter(test.tile)
        assert.deepStrictEqual(actualOutput, test.expected.isCharacter, new Error(`incorrect output for test #${index}`))
      })
    })
  })
  describe('isWind', () => {
    test('should check correctly', () => {
      tileTypeTests.forEach((test, index) => {
        const actualOutput = isWind(test.tile)
        assert.deepStrictEqual(actualOutput, test.expected.isWind, new Error(`incorrect output for test #${index}`))
      })
    })
  })
  describe('isDragon', () => {
    test('should check correctly', () => {
      tileTypeTests.forEach((test, index) => {
        const actualOutput = isDragon(test.tile)
        assert.deepStrictEqual(actualOutput, test.expected.isDragon, new Error(`incorrect output for test #${index}`))
      })
    })
  })
})
