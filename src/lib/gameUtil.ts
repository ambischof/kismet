import _ from 'lodash';
import scoringOptions from './scoreOptions';
import makeBasicBonus from './makeBasicBonus';
import {Game} from '../types/game';

const bySection = _.groupBy(scoringOptions, 'section');
const basicSectionItems = bySection[1];
const kismetSectionItems = bySection[2];

function getKismetSectionItems() {
  return kismetSectionItems;
}
function getBasicSectionItems () {
  return basicSectionItems;
}

// calculation functions
function getBasicBaseScore(game : Game) : number {
  const scores = basicSectionItems.map(bsi => game.slots[bsi.id].score);
  return _.sum(_.compact(scores));
}

function getBasicBonusScore(game : Game) : number {
  const basicScore = getBasicBaseScore(game);
  return makeBasicBonus(basicScore);
}

function getBasicTotalScore(game : Game) : number {
  return getBasicBaseScore(game) + getBasicBonusScore(game);
}

function getKismetTotalScore(game : Game) : number {
  const scores = kismetSectionItems.map(ksi => game.slots[ksi.id].score);
  return _.sum(_.compact(scores));
}



/**
 * See if game is complete by seeing if all spaces are filled
 * 
 * overly simple check, in the future, can let user decide when game is done
 * @param {game} game 
 * @returns {boolean}
 */
function isGameComplete(game: Game) : boolean {
  const gameScores = game.slots.map(slot => slot.score);
  return _.every(gameScores, _.isNumber);
}
export type {Game};

const gameUtils =  {
  isGameComplete, 
  getBasicSectionItems,
  getKismetSectionItems,
  getBasicBaseScore,
  getBasicBonusScore,
  getBasicTotalScore,
  getKismetTotalScore
}
export default gameUtils;