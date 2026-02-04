import { isNumber } from "lodash";
import { ChangeEvent, JSX } from "react";


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
    changeValue(scoreOptionId, value);
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
  let className = cellClasses.join(' ');
  let content: JSX.Element | number | '';

  // read-only if game is not active or if score is already filled
  if (!isGameActive || (mode === 'play' && (isNumber(score)|| !hasHand))) {
    // Read Only Cell
    content = renderedValue;
  }

  else if (mode === 'play') {  
    // Chooser Cell
    content = (
      <button
        className="score-cell-button"
        type="button"
        onClick={onClickPossible}
        >

        {possibleCellScore}
      </button>
    )
  }

  else {
    // Input Cell
    className = 'input-cell'
    content = (
      <input 
        autoComplete="off"
        type="text"
        name={uniqueId}
        value={renderedValue}
        onChange={onChange}
      />
    )
  }
  
  // General cell template
  return (
    <td 
      data-id={uniqueId} 
      key={uniqueId}
      data-game={gameId} 
      data-scoreop={scoreOptionId}
      className={className}
    >
      {content}
    </td>
  );
}

export default ScoreCell;