const { TILE } = require('../../src/utils')
const { REASON } = require('../../src/utils/hktw_mahjong.js')

const tileTypeTests = [
  {
    tile: TILE.ONE_DOT,
    expected: {
      isDot: true,
      isBamboo: false,
      isCharacter: false,
      isWind: false,
      isDragon: false
    }
  }
]

const computeScoreTests = [
  // 一萬 一萬 一萬 二萬 二萬 二萬 三萬 三萬 三萬 四萬 四萬 四萬 五萬 五萬 五萬 六萬 + 六萬
  {
    tiles: [
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.SIX_CHARACTER
    ],
    finalTile: TILE.SIX_CHARACTER,
    modifiers: {},
    expected: {
      reasons: [{
        reason: REASON.PURE,
        score: 80
      }],
      score: 80
    }
  },
  // 一萬 一萬 一萬 二萬 二萬 二萬 三萬 三萬 三萬 四萬 四萬 四萬 五萬 五萬 六萬 六萬 + 五萬
  {
    tiles: [
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.SIX_CHARACTER,
      TILE.SIX_CHARACTER
    ],
    finalTile: TILE.FIVE_CHARACTER,
    modifiers: {},
    expected: {
      reasons: [{
        reason: REASON.PURE,
        score: 80
      }],
      score: 80
    }
  },
  // 一萬 一萬 一萬 二萬 二萬 二萬 三萬 三萬 三萬 四萬 四萬 四萬 五萬 五萬 六萬 六萬 + 四萬
  {
    tiles: [
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.SIX_CHARACTER,
      TILE.SIX_CHARACTER
    ],
    finalTile: TILE.FOUR_CHARACTER,
    modifiers: {},
    expected: {
      reasons: [{
        reason: REASON.PURE,
        score: 80
      }],
      score: 80
    }
  },
  // 一萬 一萬 一萬 二萬 二萬 二萬 三萬 三萬 三萬 四萬 四萬 五萬 五萬 六萬 六萬 南 + 南
  {
    tiles: [
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.ONE_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.TWO_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.THREE_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FOUR_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.FIVE_CHARACTER,
      TILE.SIX_CHARACTER,
      TILE.SIX_CHARACTER,
      TILE.SOUTH
    ],
    finalTile: TILE.SOUTH,
    modifiers: {},
    expected: {
      reasons: [{
        reason: REASON.CLEAN,
        score: 30
      }],
      score: 30
    }
  },
  // 一萬 二筒 三索 四萬 五筒 六索 七萬 八筒 九索 東 南 西 北 紅中 發財 白板 + 白板
  {
    tiles: [
      TILE.ONE_CHARACTER,
      TILE.TWO_DOT,
      TILE.THREE_BAMBOO,
      TILE.FOUR_CHARACTER,
      TILE.FIVE_DOT,
      TILE.SIX_BAMBOO,
      TILE.SEVEN_CHARACTER,
      TILE.EIGHT_DOT,
      TILE.NINE_BAMBOO,
      TILE.EAST,
      TILE.SOUTH,
      TILE.WEST,
      TILE.NORTH,
      TILE.RED,
      TILE.GREEN,
      TILE.WHITE
    ],
    finalTile: TILE.WHITE,
    modifiers: {},
    expected: {
      reasons: [],
      score: 0
    }
  }
]

const updateScoresTests = [
  // 開始 (A 輸俾 B)
  {
    originalScores: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    },
    deltaScores: [ -50, 50, 0, 0 ], // A 輸左 50 俾 B
    expected: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 50, 0, 0 ],
        [ -50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    }
  },
  // 拉落去 (A 輸俾 B --> A 輸俾 B)
  {
    originalScores: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 50, 0, 0 ],
        [ -50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    },
    deltaScores: [ -50, 50, 0, 0 ], // A 輸左 50 俾 B
    expected: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 125, 0, 0 ],
        [ -125, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    }
  },
  // 拉多個 (A 輸俾 B --> C 輸俾 B)
  {
    originalScores: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 50, 0, 0 ],
        [ -50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    },
    deltaScores: [ 0, 50, -50, 0 ], // C 輸左 50 俾 B
    expected: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 50, 0, 0 ],
        [ -50, 0, -50, 0 ],
        [ 0, 50, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    }
  },
  // 反食 (A 輸俾 B --> B 輸俾 A)
  {
    originalScores: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 50, 0, 0 ],
        [ -50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    },
    deltaScores: [ 50, -50, 0, 0 ], // B 輸左 50 俾 A
    expected: {
      current: [ 475, 525, 500, 500 ],
      pending: [
        [ 0, -50, 0, 0 ],
        [ 50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    }
  },
  // 斷咗 (A 輸俾 B --> C 輸俾 A)
  {
    originalScores: {
      current: [ 500, 500, 500, 500 ],
      pending: [
        [ 0, 50, 0, 0 ],
        [ -50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    },
    deltaScores: [ 50, 0, -50, 0 ], // C 輸左 50 俾 A
    expected: {
      current: [ 450, 550, 500, 500 ],
      pending: [
        [ 0, 0, -50, 0 ],
        [ 0, 0, 0, 0 ],
        [ 50, 0, 0, 0 ],
        [ 0, 0, 0, 0 ]
      ]
    }
  }
]

const summarizeScoresTests = []

module.exports = {
  tileTypeTests,
  computeScoreTests,
  updateScoresTests,
  summarizeScoresTests
}
