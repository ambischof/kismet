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
      function onScoreChange(slotId, score) {
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
      <td><strong>{so.name}</strong> - <wbo></wbo> <small>{so.scoring}</small></td>
      {soEntryCells[so.id]}
    </tr>
  }
  const basicSectionMarkup = basicSectionItems.map(mapper);
  const kismetSectionMarkup = kismetSectionItems.map(mapper);

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


  

  function makeSectionLabel(title, cells) {
    return <tr>
      <td colSpan="2" className="results-section-label">{title}</td>
      {cells}
    </tr>
  }

  // base template for a total score cell
  function makeScoreCell(key, content) {
    return <td key={key}>{content}</td>;
  }

  // Make all the score rows
  const bsbbc = games.map(game => {
    return makeScoreCell(game.id, getBasicBaseScore(game));
  });

  const basicSectionBaseMarkup = makeSectionLabel('Total', bsbbc);
  const bstc = games.map(game => {
    return makeScoreCell(game.id, getBasicTotalScore(game));
  });

  const basicSectionTotalMarkup = makeSectionLabel('Basic Section Total', bstc);

  const bsbc = games.map(game => {
    // return makeSectionLabel('Bonus', game.id, getBasicBonusScore(game));
    return makeScoreCell(game.id, getBasicBonusScore(game));
  });
  const basicSectionBonusMarkup = makeSectionLabel('Bonus', bsbc)

  const kstc = games.map(game => {
    return makeScoreCell(game.id, getKismetTotalScore(game));
  });
  const kismetSectionTotalMarkup = makeSectionLabel('Kismet Section Total', kstc)

  const tsm = games.map(game => {
    const total = getBasicTotalScore(game) + getKismetTotalScore(game);
    return makeScoreCell(game.id, total);
  })
  const totalSectionMarkup = makeSectionLabel('Game Total', tsm)



  // make the col and label rows
  const gameCols = games.map(g => {
    const className = (!g.isDone && g.isStarted) ? 'active-game' : 'inactive-game';
    return <col key={g.id} className={className}></col>;
  });

  const gameLabels = games.map(g => {
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
          </colgroup>
          <colgroup className="scorecols">
            {gameCols}
          </colgroup>
          <thead>
            <tr>
              <th colSpan="2">
                <span className="strong">Basic Section</span>&emsp; <small>What to Score</small>
              </th>
              {gameLabels}
            </tr>
          </thead>

          <tbody>
            {basicSectionMarkup}
          </tbody>

          <tbody className="section-results">
            {basicSectionBaseMarkup}
            {basicSectionBonusMarkup}
            {basicSectionTotalMarkup}
          </tbody>

          <thead>
            <tr>
              <th colSpan="2">
                <span className="strong">Kismet Section</span>&emsp;<small>What to Score</small>
              </th>
              <th colSpan="6"></th>
            </tr>
          </thead>

          <tbody>
            {kismetSectionMarkup}
          </tbody>

          <tfoot className="section-results">
            {kismetSectionTotalMarkup}
            {basicSectionTotalMarkup}
            {totalSectionMarkup}
          </tfoot>
        </table>

      </div>
    </main>
  )
}
