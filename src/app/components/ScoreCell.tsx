import { isNumber } from "lodash";
import { ChangeEvent } from "react";


type ScoreCellParams = {
  gameId: number;
  scoreOptionId: number;
  score: number;
  isDone: boolean;
  isStarted: boolean;
  hasHand: boolean;
  mode: 'play'|'scorecard';
  computeCellScore: (scoreOptionId: number) => number;
  changeValue: (slotId: number, score: number)=>void;
}

function ScoreCell (params: ScoreCellParams) {
  const {
    gameId,
    scoreOptionId,
    score,
    isDone,
    isStarted, 
    hasHand,
    computeCellScore,
    changeValue,
    mode
  } = params;
  
  // handler for input cell
  function onChange (e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    if (Number.isNaN(value)) value = undefined;
    changeValue(scoreOptionId, value)
  }

  // handler for chooser cell
  function onClickPossible() {
    if (!hasHand) return;
    changeValue(scoreOptionId, computeCellScore(scoreOptionId));
  }

  const isGameActive = isStarted && !isDone;

  // if this cell already has a score
  const hasScore = isNumber(score);

  const uniqueId = `${gameId}-${scoreOptionId}`;

  // the possible cell score based on the current working hand
  const possibleCellScore = hasHand? computeCellScore(scoreOptionId) : '';
  
  const cellClasses = [];

  // if ellidgible for the working hand's score
  if (hasHand && isGameActive && !hasScore) {
    cellClasses.push('possible-score');
    if (!!possibleCellScore) cellClasses.push('good-score');
  }
  if (isGameActive) {
    cellClasses.push('active-game-cell');
  }

  // When empty, the value in DOM should be '', not undefined.
  const renderedValue = hasScore? score : '';
  const className = cellClasses.join(' ');

  // read-only if game is not active or if score is already filled
  if (!isGameActive || (isNumber(score) && mode === 'play')) {
    // Read Only Cell
    return (
      <td 
        data-id={uniqueId} 
        key={uniqueId}
        data-game={gameId} 
        data-scoreop={scoreOptionId}
        className={className}
      >
        {renderedValue}
      </td>
    )
  }

  else if (mode === 'play') {  
    // Chooser Cell
    // TODO: listen for ENTER keypress OR change to button
    return (
    <td 
      data-game={gameId} 
      data-scoreop={scoreOptionId}
      data-id={uniqueId} 
      key={uniqueId}
      tabIndex={hasHand? 0 : undefined}
      role= {hasHand? 'button': undefined}
      className={className}
      onClick={hasHand? onClickPossible : undefined}
    >
    {possibleCellScore}
    </td> )
  }

  else 
    // Input Cell
    return (
    <td className="input-cell" data-id={uniqueId} key={uniqueId}>
      <input 
        data-game={gameId} 
        data-scoreop={scoreOptionId}
        type="text"
        name={uniqueId}
        value={renderedValue}
        onChange={onChange}
      />
    </td>
  );
}

export default ScoreCell;