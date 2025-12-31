import { isNumber } from "lodash";
// import { ChangeEvent } from "react";


type ScoreCellParams = {
  gameId: number;
  scoreOptionId: number;
  score: number;
  isDone: boolean;
  isStarted: boolean;
  hasHand: boolean;
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
    changeValue
  } = params;
  // function onChange (e: ChangeEvent<HTMLInputElement>) {
  //   let value = Number(e.target.value);
  //   if (Number.isNaN(value)) value = undefined;
  //   changeValue(scoreOptionId, value)
  // };

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

  // read-only if game is not active or if score is already filled
  if (!isGameActive || isNumber(score)) {
    return (
      <td 
        data-id={uniqueId} 
        key={uniqueId}
        data-game={gameId} 
        data-scoreop={scoreOptionId}
        className={cellClasses.join(' ')}
      >
      {renderedValue}
    </td>)
  }

  else return (
    <td 
      data-game={gameId} 
      data-scoreop={scoreOptionId}
      data-id={uniqueId} 
      key={uniqueId}
      tabIndex={hasHand? 0 : undefined}
      role= {hasHand? 'button': undefined}
      className={cellClasses.join(' ')}
      onClick={hasHand? onClickPossible : undefined}
    >
    {possibleCellScore}
  </td>)

  // else return (
  //   <td className="input-cell" data-id={uniqueId} key={uniqueId}>
  //     <input 
  //       data-game={params.gameId} 
  //       data-scoreop={params.scoreOptionId}
  //       type="text"
  //       name={name}
  //       title={name}
  //       value={renderedValue}
  //       onChange={onChange}
  //     >
  //     </input>
  //   </td>)
  }

  export default ScoreCell;