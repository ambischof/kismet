
import _ from 'lodash';
import { useState } from 'react';
import scoringOptions from '../../lib/scoreOptions';
import makeBasicBonus from '../../lib/makeBasicBonus';

/**
 * @typedef game
 * @property {number} id
 * @property {boolean} isDone
 * @property {boolean} isStarted
 * @property {object[]} slots
 */


/**
 * Contains the state and logic of the games
 */
export default function GameManager () {
  /**
   * 
   * @param {number} id 
   * @returns {game}
   */
  function makeGame(id) {
    return {
      id,
      isDone: false,
      isStarted: id === 0,
      slots: scoringOptions.map(so => ({ id: so.id, score: undefined })),
    };
  }

  // number of games to show in UI. Traditional scorecard shows 6
  const GAME_COUNT = 6;
  const gameIds = _.times(GAME_COUNT, _.identity); // makes [0,1,2,3,4,5]

  const gamess = gameIds.map(makeGame);
  const [games, setGames] = useState(gamess);

  // take the scoring options (unified list) and separate them by section
  const bySection = _.groupBy(scoringOptions, 'section');

  const basicSectionItems = bySection[1];
  const kismetSectionItems = bySection[2];

  /**
   * given a changed (cloned) game, update the games state
   * @param {game} game 
   */
  function updateGame(game) {
    // replace the game in the array with the new one
    const newGames = games.map(g => {
      if (g.id === game.id) return game;
      else return g;
    });

    setGames(newGames);
  }

  /**
   * See if game is complete by seeing if all spaces are filled
   * 
   * overly simple check, in the future, can let user decide when game is done
   * @param {game} game 
   * @returns {boolean}
   */
  function isGameComplete(game) {
    const gameScores = game.slots.map(slot => slot.score);
    return _.every(gameScores, _.isNumber);
  }

  // see if game qualifies as done
  function checkDone(gameId) {
    const game = games[gameId]
    const done = isGameComplete(game);

    if (done && !game.isDone) {
      const clonedGame = _.cloneDeep(game);
      clonedGame.isDone = done;

      updateGame(clonedGame);

      // if there is a next game, start it
      if (game.id < (GAME_COUNT - 1)) {
        const clonedNextGame = _.cloneDeep(games[gameId + 1]);

        clonedNextGame.isStarted = true;

        updateGame(clonedNextGame);
      }
    }
  }


  // calculation functions
  function getBasicBaseScore(game) {
    const scores = basicSectionItems.map(bsi => game.slots[bsi.id].score);
    return _.sum(_.compact(scores));
  }
  
  function getBasicBonusScore(game) {
    const basicScore = getBasicBaseScore(game);
    return makeBasicBonus(basicScore);
  }
  
  function getBasicTotalScore(game) {
    return getBasicBaseScore(game) + getBasicBonusScore(game);
  }

  function getKismetTotalScore(game) {
    const scores = kismetSectionItems.map(ksi => game.slots[ksi.id].score);
    return _.sum(_.compact(scores));
  }

  
  /**
   * @param {game} g 
   * @param {number} slotId 
   * @param {number} score 
   */
  function scoreChangeHander(g, slotId, score) {
    const game = _.cloneDeep(g);
    game.slots[slotId].score = score;

    updateGame(game);

    checkDone(game.id);
  }


  return {
    games,
    getBasicBaseScore,
    updateGame,
    checkDone,
    getBasicBonusScore,
    getBasicTotalScore,
    getKismetTotalScore,
    kismetSectionItems,
    basicSectionItems,
    scoreChangeHander
  }
}