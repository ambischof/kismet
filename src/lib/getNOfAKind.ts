/**
 * NOTE this will take the laziest route, the FIRST number that matches.
 * If you pass in 2 for n and there is 3 of a kind, it may return the one that has 3 of a kind.
 * Always start with biggest number then go with what's left
 * @param n how many you want
 * @param numbers the array of numbers
 * @returns null if not present or the first number that matches.
 */

function getNOfAKind (n: number, numbers: Array<number>) : null | number {
  let hasN = false; // flag for if we have 3 of a kind
  const counts = {}; // holding the counts in key value pairs
  let i = 0;
  let noInQuestion : number;
  // loop through the numbers
  for (let c of numbers) {
    if (!counts[c]) counts[c] = 1;
    else counts[c]++;
    if (counts[c] === n) {
      noInQuestion = c;
      hasN = true;
      break; // once we find 3 of a kind, stop
    }
    i++;
  }

  if (!hasN) return null;
  else {
    return noInQuestion;
  }
}

export default getNOfAKind;