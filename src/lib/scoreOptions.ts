import getNOfAKind from "./getNOfAKind";
import colorIndex from "./colorIndex";

interface ScoringOptions {
  id: number;
  name: string;
  scoring: string;
  section: number;
  computeScore: (numbers: Array<number>) => number;
}
/**
 * @type {ScoringOptions[]}
 */
const scoringOptions: ScoringOptions[] = [
  {
    id: 0,
    name: 'aces',
    scoring: '1 for each Ace',
    section: 1,
    computeScore (numbers) {
      let count = numbers.filter(a => a===1).length;
      return count;
    }
  },    
  {
    id: 1,
    name: 'dueces',
    scoring: '2 for each Deuce',
    section: 1,
    computeScore (numbers) {
      let count = numbers.filter(a => a===2).length;
      return count * 2;
    }
  },    
  {
    id: 2,
    name: 'treys',
    scoring: '3 for each trey',
    section: 1,
    computeScore (numbers) {
      let count = numbers.filter(a => a===3).length;
      return count * 3;
    }
  },    
  {
    id: 3,
    name: 'fours',
    scoring: '4 for each Four',
    section: 1,
    computeScore (numbers) {
      let count = numbers.filter(a => a===4).length;
      return count * 4;
    }
  },
  {
    id: 4,
    name: 'fives',
    scoring: '5 for each Five',
    section: 1,
    computeScore (numbers) {
      let count = numbers.filter(a => a===5).length;
      return count * 5;
    }
  },
  {
    id: 5,
    name: 'sixes',
    scoring: '6 for each Six',
    section: 1,
    computeScore (numbers) {
      let count = numbers.filter(a => a===6).length;
      return count * 6;
    }
  },
  {
    id: 6,
    name: '2 pair - Same Color',
    scoring: 'Total All Dice',
    section: 1,
    computeScore (numbers) {
      // see if there are two pairs
      const sortedNumbers = numbers.sort();
      let pairedNumbers : Array<number> = [];
      for (let i = 0; i < numbers.length; i++) {
        if (sortedNumbers[i] === sortedNumbers[i+1]) {
          pairedNumbers.push(sortedNumbers[i]);
          i++; // skip past the next item in the pair
        }
      }
      if (pairedNumbers.length !== 2) return 0;
      // see if they are same color
      if (colorIndex.get(pairedNumbers[1]) !== colorIndex.get(pairedNumbers[0])) {
        return 0;
      }

      // get sum
      const total = numbers.reduce((p,c) =>  p + c);    
      // return score
      return total;
    }
  },
  {
    id: 7,
    name: '3 of a Kind',
    scoring: 'Total All Dice',
    section: 2,
    computeScore (numbers) {
      const num = getNOfAKind(3, numbers);


      if (num === null) return 0;
      else {
        return numbers.reduce((p,c) => p + c);
      }
    }
  },
  {
    id: 8,
    name: 'Straight 12345 or 23456',
    scoring: '30',
    section: 2,
    computeScore (numbers) {
      let joined = [...numbers].sort().join('');
      // stringification is easiest comparison. prove me wrong.
      if (joined === '12345' || joined === '23456') {
        return 30
      }
      
      else return 0;
    }
  },
  {
    id: 9,
    name: 'Flush: All Same Color',
    scoring: '35',
    section: 2,
    computeScore (numbers) {
      let color : number;
      for (let n of numbers) {
        // set first one as basis for comparison
        if (!color) color = colorIndex.get(n);
        // if following ones don't match, return 0 
        else if (colorIndex.get(n) !== color) return 0;
      }

      // if we made it this far, they all match
      return 35;
    }
  },
  {
    id: 10,
    name: 'Full House', // means 3 of a kind plus 2 of a kind
    scoring: 'Total All Dice Plus 15',
    section: 2,
    computeScore (numbers) {
      const num = getNOfAKind(3, numbers);
      if (num === null) return 0;
      let numClone = [...numbers]
      // get rid of three of them to see if there is a pair left.
      // doing it this way makes sure it works for 5 of a kind
      for(let i = 0; i<3; i++){
        numClone.splice(numClone.indexOf(num), 1);
      }

      if (numClone[1] === numClone[0])
        return numbers.reduce((p,c) => p + c) + 15;
      else
        return 0;
    }
  },
  {
    id: 11,
    name: 'Full House : Same Color',
    scoring: 'Total All Dice Plus 20',
    section: 2,
    computeScore (numbers) {
      const num = getNOfAKind(3, numbers);
      if (num === null) return 0;
      let numClone = [...numbers]
      // get rid of three of them to see if there is a pair left.
      // doing it this way makes sure it works for 5 of a kind
      for(let i = 0; i<3; i++){
        numClone.splice(numClone.indexOf(num), 1);
      }

      const hasPair = numClone[1] === numClone[0];

      if (hasPair && colorIndex.get(numClone[1]) === colorIndex.get(num))
        return numbers.reduce((p,c) => p + c) + 20;
      else
        return 0;
    }
  },
  {
    id: 12,
    name: '4 of a Kind',
    scoring: 'Total All Dice Plus 25',
    section: 2,
    computeScore (numbers) {
      const num = getNOfAKind(4, numbers);

      if (num === null) return 0;
      else {
        return numbers.reduce((p,c) => p + c) + 25;
      }
    }
  },
  {
    id: 13,
    name: 'Yarborough',
    scoring: 'Total All Dice',
    section: 2,
    computeScore (numbers) {
      return numbers.reduce((p,c) => p + c);
    }
  },
  {
    id: 14,
    name: 'Kismet: 5 of a Kind',
    scoring: 'Total All Dice Plus 50',
    section: 2,
    computeScore (numbers) {
      //stub
      return 0;
    }
  }
];

export default scoringOptions;
export type {ScoringOptions};