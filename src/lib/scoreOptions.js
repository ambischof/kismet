/**
 * @typedef scoringOptions
 * @property {number} id
 * @property {string} name
 * @property {string} scoring
 * @property {number} section
 */
/**
 * @type {scoringOptions[]}
 */
const scoringOptions = [
  {
    id: 0,
    name: 'aces',
    scoring: '1 for each Ace',
    section: 1
  },    
  {
    id: 1,
    name: 'dueces',
    scoring: '2 for each Deuce',
    section: 1
  },    
  {
    id: 2,
    name: 'treys',
    scoring: '3 for each trey',
    section: 1
  },    
  {
    id: 3,
    name: 'fours',
    scoring: '4 for each Four',
    section: 1
  },
  {
    id: 4,
    name: 'fives',
    scoring: '5 for each Five',
    section: 1
  },
  {
    id: 5,
    name: 'sixes',
    scoring: '6 for each Six',
    section: 1
  },
  {
    id: 6,
    name: '2 pair - Same Color',
    scoring: 'Total All Dice',
    section: 1
  },
  {
    id: 7,
    name: '3 of a Kind',
    scoring: 'Total All Dice',
    section: 2
  },
  {
    id: 8,
    name: 'Straight 12345 or 23456',
    scoring: '30',
    section: 2
  },
  {
    id: 9,
    name: 'Flush: All Same Color',
    scoring: '35',
    section: 2
  },
  {
    id: 10,
    name: 'Full House',
    scoring: 'Total All Dice Plus 15',
    section: 2
  },
  {
    id: 11,
    name: 'Full House : Same Color',
    scoring: 'Total All Dice Plus 20',
    section: 2
  },
  {
    id: 12,
    name: '4 of a Kind',
    scoring: 'Total All Dice Plus 25',
    section: 2
  },
  {
    id: 13,
    name: 'Yarborough',
    scoring: 'Total All Dice',
    section: 2
  },
  {
    id: 14,
    name: 'Kismet: 5 of a Kind',
    scoring: 'Total All Dice Plus 50',
    section: 2
  }
];

export default scoringOptions;