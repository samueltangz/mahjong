const assert = require('assert')

const { computeScore, updateScores, summarizeScores } = require('../../src/utils/hktw_mahjong')

const { computeScoreTests, updateScoresTests, summarizeScoresTests } = require('../test_cases')

describe('utils/hktw_mahjong.js', () => {
  describe('computeScore', () => {
    test('should compute scores correctly', () => {
      computeScoreTests.forEach((test, index) => {
        const actualOutput = computeScore(test.tiles, test.finalTile, test.modifiers)
        assert.deepStrictEqual(actualOutput, test.expected, new Error(`incorrect output for test #${index}`))
      })
    })
  })
  describe('updateScores', () => {
    test('should update scores correctly', () => {
      updateScoresTests.forEach((test, index) => {
        const actualOutput = updateScores(test.originalScores, test.deltaScores)
        assert.deepStrictEqual(actualOutput, test.expected, new Error(`incorrect output for test #${index}`))
      })
    })
  })
  describe('summarizeScores', () => {
    test('should summarize scores correctly', () => {
      summarizeScoresTests.forEach((test, index) => {
        const actualOutput = summarizeScores(test.originalScores)
        assert.deepStrictEqual(actualOutput, test.expected, new Error(`incorrect output for test #${index}`))
      })
    })
  })
})
