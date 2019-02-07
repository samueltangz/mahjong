const TILE = {
  ONE_DOT: 0,
  TWO_DOT: 1,
  THREE_DOT: 2,
  FOUR_DOT: 3,
  FIVE_DOT: 4,
  SIX_DOT: 5,
  SEVEN_DOT: 6,
  EIGHT_DOT: 7,
  NINE_DOT: 8,
  ONE_BAMBOO: 10,
  TWO_BAMBOO: 11,
  THREE_BAMBOO: 12,
  FOUR_BAMBOO: 13,
  FIVE_BAMBOO: 14,
  SIX_BAMBOO: 15,
  SEVEN_BAMBOO: 16,
  EIGHT_BAMBOO: 17,
  NINE_BAMBOO: 18,
  ONE_CHARACTER: 20,
  TWO_CHARACTER: 21,
  THREE_CHARACTER: 22,
  FOUR_CHARACTER: 23,
  FIVE_CHARACTER: 24,
  SIX_CHARACTER: 25,
  SEVEN_CHARACTER: 26,
  EIGHT_CHARACTER: 27,
  NINE_CHARATCTER: 28,
  EAST: 30,
  SOUTH: 31,
  WEST: 32,
  NORTH: 33,
  RED: 40,
  GREEN: 41,
  WHITE: 42
}

function isDot (tile) {
  return tile >= 0 && tile < 10
}

function isBamboo (tile) {
  return tile >= 10 && tile < 20
}

function isCharacter (tile) {
  return tile >= 20 && tile < 30
}

function isWind (tile) {
  return tile >= 30 && tile < 40
}

function isDragon (tile) {
  return tile >= 40 && tile < 50
}

module.exports = {
  TILE,

  isDot,
  isBamboo,
  isCharacter,
  isWind,
  isDragon
}
