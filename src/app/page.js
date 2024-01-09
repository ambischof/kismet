'use client';
import _ from 'lodash';
import { useState } from 'react';
import './page.scss'
import ScoreCell from './scorecard/ScoreCell';
import scoringOptions from '../lib/scoreOptions';
import makeBasicBonus from '../lib/makeBasicBonus';
import ordinals from '../lib/ordinals';

/**
 * @typedef game
 * @property {number} id
 * @property {boolean} isDone
 * @property {boolean} isStarted
 * @property {object[]} slots
 */

export default function Home() {
  /**
   * 
   * @param {number} id 
   * @returns {game}
   */
  function makeGame (id) {
    return {
      id,
      isDone: false,
      isStarted: id === 0, 
      slots: scoringOptions.map(so => ({id: so.id, score: undefined})),
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
  function isGameComplete (game) {
    const gameScores = game.slots.map(slot => slot.score);
    return _.every(gameScores, _.isNumber);
  }

  // see if game qualifies as done
  function checkDone (gameId) {
    const game = games[gameId]
    const done = isGameComplete(game);

    if (done && !game.isDone) {
      clonedGame = _.cloneDeep(game);
      clonedGame.isDone = done;

      updateGame(clonedGame);

      // if there is a next game, start it
      if (game.id < (GAME_COUNT - 1)) {
        clonedNextGame = _.cloneDeep(games[gameId + 1]);

        clonedNextGame.isStarted = true;

        updateGame(clonedNextGame);
      }
    }
  }
  
  // Sscoring option input markup
  const soEntryCells = scoringOptions.map(so => {
    return games.map(g => {
      function onScoreChange (slotId, score) {
        const game = _.cloneDeep(g);
        game.slots[slotId].score = score;
        
        updateGame(game);

        checkDone(game.id);
      }
      
      return ScoreCell({
        gameId: g.id,
        scoreOptionId: so.id,
        score: g.slots[so.id].score,
        isDone: g.isDone,
        isStarted: g.isStarted
      }, onScoreChange);
    })
  });

  // Map over scoring options to create sidebar
  let mapper = so => {
  return <tr key={so.id}>
      <td>{so.id + 1}</td>
      <td>{so.name}</td>
      <td>{so.scoring}</td>
      {soEntryCells[so.id]}
    </tr>
  }
  const basicSectionMarkup = basicSectionItems.map(mapper);
  const kismetSectionMarkup = kismetSectionItems.map(mapper);

  // calculation functions
  function getBasicTotalScore (game) {
    const scores = basicSectionItems.map(bsi => game.slots[bsi.id].score);
    return _.sum(_.compact(scores));
  }

  function getKismetTotalScore (game) {
    const scores = kismetSectionItems.map(ksi => game.slots[ksi.id].score);
    return _.sum(_.compact(scores));
  }

  function getBasicBonusScore (game) {
    const basicScore = getBasicTotalScore(game);
    return makeBasicBonus(basicScore);
  }

  // base template for a total score cell
  function makeScoreCell (key, content) {
    return <td key={key}>{content}</td>;
  }

  // Make all the score rows
  const basicSectionTotalMarkup = games.map(game => {
    return makeScoreCell(game.id, getBasicTotalScore(game));
  });

  const basicSectionBonusMarkup = games.map(game => {
    return makeScoreCell(game.id, getBasicBonusScore(game));
  });
  
  const kismetSectionTotalMarkup = games.map(game => {
    return makeScoreCell(game.id, getKismetTotalScore(game));
  });
  
  const totalSctionMarkup = games.map(game => {
    const total = getBasicTotalScore(game) + getKismetTotalScore(game);
    return makeScoreCell(game.id, total);
  })
  
  // make the col and label rows
  const gameCols = games.map(g => {
    const className = (!g.isDone && g.isStarted)? 'active-game' : 'inactive-game';
    return <col key={g.id} className={className}></col>;
  });

  const gameLabels = games.map(g=> {
    return <th key={g.id}>{ordinals[g.id]} Game</th>;
  });
  
  // TODO use grid layout. Table doesn't get the spacing right easily
  return (
    <main>
      <div id="trad-scorecard">

        <table>
          <colgroup className="sidelabels">
            <col></col>
            <col></col>
            <col></col>
          </colgroup>
          <colgroup className="scorecols">
            {gameCols}
          </colgroup>
          <thead>
            <tr>
              <th colSpan="2">Basic Section</th>
              <th>What to Score</th>
              {gameLabels}
            </tr>
          </thead>
          
          <tbody>
            {basicSectionMarkup}
          </tbody>
          
          <tbody className="section-results">
            <tr>
              <td colSpan="3">Total</td>
              {basicSectionTotalMarkup}
            </tr>
            <tr>
              <td colSpan="3">Bonus</td>
              {basicSectionBonusMarkup}
            </tr>
            <tr>
              <td colSpan="3">Basic Section Total</td>
              {basicSectionTotalMarkup}
            </tr>
          </tbody>

          <thead>
            <tr>
              <th colSpan="2">Kismet Section</th>
              <th>What to Score</th>
              <th colSpan="6"></th>
            </tr>
          </thead>
          
          <tbody>
            {kismetSectionMarkup}
          </tbody>
          
          <tfoot className="section-results">
            <tr>
              <td colSpan="3">Kismet Section Total</td>
              {kismetSectionTotalMarkup}
            </tr>
            <tr>
              <td colSpan="3">Basic Section Total</td>
              {basicSectionTotalMarkup}
            </tr>
            <tr>
              <td colSpan="3">Game Total</td>
              {totalSctionMarkup}
            </tr>
          </tfoot>
        </table>
        
      </div>
    </main>
  )
}
