const _ = require('lodash')
const { TILE, isDot, isBamboo, isCharacter, isWind, isDragon } = require('.')

const REASON = {
  PURE: 0, // 清一色
  CLEAN: 1 // 混一色
}

const REASON_LIST = {
  PURE: {
    reason: REASON.PURE,
    score: 80
  },
  CLEAN: {
    reason: REASON.CLEAN,
    score: 30
  }
}

// Check for PURE
function isPure (tiles) {
  return tiles.every(isDot) || tiles.every(isBamboo) || tiles.every(isCharacter)
}

// Check for CLEAN
function isClean (tiles) {
  const simpleTiles = tiles.filter(tile => isDot(tile) || isBamboo(tile) || isCharacter(tile))
  const honorsTiles = tiles.filter(tile => isWind(tile) || isDragon(tile))

  return isPure(simpleTiles) && honorsTiles.length > 0
}

// Compute scoring
function computeScore (tiles, finalTile, modifiers) {
  const combinedTiles = _.cloneDeep(tiles)
  combinedTiles.push(finalTile)
  const flags = {}

  flags.isPure = isPure(combinedTiles)
  flags.isClean = isClean(combinedTiles)

  let reasons = []
  let score = 0

  if (flags.isPure) {
    reasons.push(REASON_LIST.PURE)
    score += REASON_LIST.PURE.score
  } else if (flags.isClean) {
    reasons.push(REASON_LIST.CLEAN)
    score += REASON_LIST.CLEAN.score
  }

  return { reasons, score }
}

function updateScores (originalScores, deltaScores) {
  function getOriginalWinners (pendingScores) {
    return pendingScores.reduce(
      (accumulator, row) => accumulator.map((value, index) => value + row[index])
    ).map(score => score > 0)
  }
  function getCurrentWinners (deltaScores) {
    return deltaScores.map(score => score > 0)
  }

  const newScores = _.cloneDeep(originalScores)

  const originalWinners = getOriginalWinners(originalScores.pending)
  const currentWinners = getCurrentWinners(deltaScores)

  if (!_.isEqual(originalWinners, currentWinners)) {
    // 結算
    for (let indexFrom = 0; indexFrom < 4; indexFrom++) {
      for (let indexTo = 0; indexTo < 4; indexTo++) {
        if (deltaScores[indexFrom] < 0 && deltaScores[indexTo] > 0 &&
          originalScores.pending[indexTo][indexFrom] > 0) {
          // 輸少一半
          originalScores.pending[indexTo][indexFrom] -= Math.ceil(originalScores.pending[indexTo][indexFrom] * 0.5)
          originalScores.pending[indexFrom][indexTo] = -originalScores.pending[indexTo][indexFrom]
        }
      }
    }

    const pendingSummaryScores = originalScores.pending.reduce(
      (accumulator, row) => accumulator.map((value, index) => value + row[index])
    )
    newScores.current = newScores.current.map((score, index) => score + pendingSummaryScores[index])
    newScores.pending = [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]
  }

  for (let indexFrom = 0; indexFrom < 4; indexFrom++) {
    for (let indexTo = 0; indexTo < 4; indexTo++) {
      if (deltaScores[indexFrom] < 0 && deltaScores[indexTo] > 0) {
        if (newScores.pending[indexFrom][indexTo] > 0) {
          // 拉 1.5 倍
          newScores.pending[indexFrom][indexTo] += Math.ceil(newScores.pending[indexFrom][indexTo] * 0.5)
        }
        newScores.pending[indexFrom][indexTo] += Math.min(-deltaScores[indexFrom], deltaScores[indexTo])
        newScores.pending[indexTo][indexFrom] = -newScores.pending[indexFrom][indexTo]
      }
    }
  }

  return newScores
}

function summarizeScores (originalScores) {
}

module.exports = {
  TILE,
  REASON,

  computeScore,
  updateScores,
  summarizeScores
}
