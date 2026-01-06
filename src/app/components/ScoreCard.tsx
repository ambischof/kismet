import React, { ReactElement } from 'react';
import ScoreCell from './ScoreCell';
import scoringOptions, { ScoringOptions } from '../../lib/scoreOptions';
import ordinals from '../../lib/ordinals';
import {type GameState, Game} from './GameReducer';
import gameUtil from '../../lib/gameUtil';


type ScoreCardOptions = {
  gameState: GameState;
  doUpdateScore: (game: Game, slotId: number, score: number)=>void;
  mode: 'play'|'scorecard'
};

export default function ScoreCard(options:ScoreCardOptions) {

  const {gameState, doUpdateScore} = options;

  // get what the value of the cell would be based on the 
  // working hand
  function computeCellScore(scoreOptionId: number) : number|null {
    if (!gameState.workingHand) return null;
    return scoringOptions[scoreOptionId].computeScore(gameState.workingHand)
  }
  // Scoring option input markup
  const soEntryCells = scoringOptions.map(so => {
    return gameState.games.map( g => {
      function onScoreChange (slotId: number, score: number) {
        doUpdateScore(g, slotId, score);
      }

      return (
        <ScoreCell 
          key={`${g.id}-${so.id}`}
          gameId={g.id}
          scoreOptionId={so.id}
          score= {g.slots[so.id].score}
          isDone= {g.isDone}
          isStarted = {g.isStarted}
          hasHand = {Array.isArray(gameState.workingHand)}
          computeCellScore = {computeCellScore}
          changeValue = {onScoreChange}
          mode={options.mode}
        />
      )
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
  const basicSectionMarkup = gameUtil.getBasicSectionItems().map(mapper);
  const kismetSectionMarkup = gameUtil.getKismetSectionItems().map(mapper);

  

  function makeSectionLabel(title: string, cells: ReactElement[]) {
    return <tr>
      <td colSpan={2} className="results-section-label">{title}</td>
      {cells}
    </tr>
  }

  // base template for a total score cell
  function makeScoreCell(gameId: number, content: number) {
    const isActive = gameId === gameState.activeGame;
    const className = isActive? 'active-game-cell' : '';
    return <td key={gameId} className={className}>{content}</td>;
  }

  // Make all the score rows
  const bsbbc = gameState.games.map(game => {
    return makeScoreCell(game.id, gameUtil.getBasicBaseScore(game));
  });

  const basicSectionBaseMarkup = makeSectionLabel('Total', bsbbc);
  const bstc = gameState.games.map(game => {
    return makeScoreCell(game.id, gameUtil.getBasicTotalScore(game));
  });

  const basicSectionTotalMarkup = makeSectionLabel('Basic Section Total', bstc);

  const bsbc = gameState.games.map(game => {
    // return makeSectionLabel('Bonus', game.id, getBasicBonusScore(game));
    return makeScoreCell(game.id, gameUtil.getBasicBonusScore(game));
  });
  const basicSectionBonusMarkup = makeSectionLabel('Bonus', bsbc)

  const kstc = gameState.games.map(game => {
    return makeScoreCell(game.id, gameUtil.getKismetTotalScore(game));
  });
  const kismetSectionTotalMarkup = makeSectionLabel('Kismet Section Total', kstc)

  const tsm = gameState.games.map(game => {
    const total = gameUtil.getBasicTotalScore(game) + gameUtil.getKismetTotalScore(game);
    return makeScoreCell(game.id, total);
  })
  const totalSectionMarkup = makeSectionLabel('Game Total', tsm)



  // make the col and label rows
  const gameCols = gameState.games.map(g => {
    const className = (!g.isDone && g.isStarted) ? 'active-game' : 'inactive-game';
    return <col key={g.id} className={className}></col>;
  });

  const gameLabels = gameState.games.map(g => {
    return <th key={g.id}>{ordinals[g.id]} Game</th>;
  });

  // TODO use grid layout. Table doesn't get the spacing right easily
  return (
    <div id="trad-scorecard">

      <table>
        <colgroup className="sidelabels">
          <col id="number-column"></col>
          <col id="name-column"></col>
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
