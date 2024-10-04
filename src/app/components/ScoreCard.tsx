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
    return <React.Fragment key={so.id}>
      <div className="cell">{so.id + 1}</div>
      <div className="cell"><strong>{so.name}</strong> - <wbr></wbr> <small>{so.scoring}</small></div>
      {soEntryCells[so.id]}
    </React.Fragment>
  }
  const basicSectionMarkup = gameManager.basicSectionItems.map(mapper);
  const kismetSectionMarkup = gameManager.kismetSectionItems.map(mapper);

  

  function makeSectionLabel(title: string, cells: ReactElement[]) {
    return <>
      <div className="cell results-section-label double-column">{title}</div>
      {cells}
    </>
  }

  // base template for a total score cell
  function makeScoreCell(key: number, content: number) {
    return <div className="cell" key={key + '-score-cell'}>{content}</div>;
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

  const gameLabels = gameManager.games.map(g => {
    return <div className="cell headercell" key={g.id + '-game-col-label'}>{ordinals[g.id]} Game</div>;
  });

  // TODO use grid layout. Table doesn't get the spacing right easily
  return (
    <div id="trad-scorecard">

        {/* <div> */}
            <div className="double-column cell headercell">
              <span className="strong">Basic Section</span>&emsp; <small>What to Score</small>
            </div>
            {gameLabels}
        {/* </div> */}

        {/* <div id="basic-section"> */}
          {basicSectionMarkup}
        {/* </div> */}
        <hr></hr>

        {/* <div className="section-results"> */}
          {basicSectionBaseMarkup}
          {basicSectionBonusMarkup}
          {basicSectionTotalMarkup}
        {/* </div> */}

        {/* <div id="mid-labels"> */}
            <div className="cell headercell double-column">
              <span className="strong">Kismet Section</span>&emsp;<small>What to Score</small>
            </div>
            <div className="cell headercell six-column"></div>
        {/* </div> */}

        {/* <div id="kismet-section"> */}
          {kismetSectionMarkup}
        {/* </div> */}

        {/* <div className="section-results"> */}
          {kismetSectionTotalMarkup}
          {basicSectionTotalMarkup}
          {totalSectionMarkup}
        {/* </div> */}


    </div>
  )
}
