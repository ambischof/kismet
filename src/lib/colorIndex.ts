/**
 * Background: in kismet, the dice sides are one of three colors. 
 * 
 * The pairs of colors are at opposite ends of the die, or on the numbers that add up to 7.
 * 
 * It would make sense to store each pair in tuples, but then looking 
 * it up from tuples is annoying so I made it a map
 */

const colorIndex = new Map([
  [1, 1],
  [6, 1],
  [2, 2],
  [5, 2],
  [3, 3],
  [4, 3]
]);

export default colorIndex;