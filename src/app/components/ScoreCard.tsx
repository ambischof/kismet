import React, { ReactElement } from 'react';
import ScoreCell from './ScoreCell';
import scoringOptions, { ScoringOptions } from '../../lib/scoreOptions';
import ordinals from '../../lib/ordinals';
import {type GameManagerr} from './GameManager';


export default function ScoreCard({gameManager} : {gameManager: GameManagerr }) {
  // Scoring option input markup
  const soEntryCells = scoringOptions.map(so => {
    return gameManager.games.map( g => {
      function onScoreChange (slotId: number, score: number) {
        gameManager.scoreChangeHander(g, slotId, score);
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
  let mapper = (so: ScoringOptions) => {
    return <tr key={so.id}>
      <td>{so.id + 1}</td>
      <td><strong>{so.name}</strong> - <wbr></wbr> <small>{so.scoring}</small></td>
      {soEntryCells[so.id]}
    </tr>
  }
  const basicSectionMarkup = gameManager.basicSectionItems.map(mapper);
  const kismetSectionMarkup = gameManager.kismetSectionItems.map(mapper);

  

  function makeSectionLabel(title: string, cells: ReactElement[]) {
    return <tr>
      <td colSpan={2} className="results-section-label">{title}</td>
      {cells}
    </tr>
  }

  // base template for a total score cell
  function makeScoreCell(key: number, content: number) {
    return <td key={key}>{content}</td>;
  }

  // Make all the score rows
  const bsbbc = gameManager.games.map(game => {
    return makeScoreCell(game.id, gameManager.getBasicBaseScore(game));
  });

  const basicSectionBaseMarkup = makeSectionLabel('Total', bsbbc);
  const bstc = gameManager.games.map(game => {
    return makeScoreCell(game.id, gameManager.getBasicTotalScore(game));
  });

  const basicSectionTotalMarkup = makeSectionLabel('Basic Section Total', bstc);

  const bsbc = gameManager.games.map(game => {
    // return makeSectionLabel('Bonus', game.id, getBasicBonusScore(game));
    return makeScoreCell(game.id, gameManager.getBasicBonusScore(game));
  });
  const basicSectionBonusMarkup = makeSectionLabel('Bonus', bsbc)

  const kstc = gameManager.games.map(game => {
    return makeScoreCell(game.id, gameManager.getKismetTotalScore(game));
  });
  const kismetSectionTotalMarkup = makeSectionLabel('Kismet Section Total', kstc)

  const tsm = gameManager.games.map(game => {
    const total = gameManager.getBasicTotalScore(game) + gameManager.getKismetTotalScore(game);
    return makeScoreCell(game.id, total);
  })
  const totalSectionMarkup = makeSectionLabel('Game Total', tsm)



  // make the col and label rows
  const gameCols = gameManager.games.map(g => {
    const className = (!g.isDone && g.isStarted) ? 'active-game' : 'inactive-game';
    return <col key={g.id} className={className}></col>;
  });

  const gameLabels = gameManager.games.map(g => {
    return <th key={g.id}>{ordinals[g.id]} Game</th>;
  });

  // TODO use grid layout. Table doesn't get the spacing right easily
  return (
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
            <th colSpan={2}>
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
            <th colSpan={2}>
              <span className="strong">Kismet Section</span>&emsp;<small>What to Score</small>
            </th>
            <th colSpan={6}></th>
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
  )
}
