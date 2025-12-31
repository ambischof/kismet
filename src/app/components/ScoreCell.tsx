import { isUndefined } from "lodash";
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
    score,
    changeValue,
    computeCellScore,
    hasHand,
    scoreOptionId
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

  const uniqueId = `${gameId}-${params.scoreOptionId}`;

  // the possible cell score based on the current working hand
  const possibleCellScore = hasHand? computeCellScore(scoreOptionId) : '';
  const className = [];
  if (hasHand) {
    className.push('possible-score');
    if (!!possibleCellScore) className.push('good-score');
  }
  

  // When empty, the value in DOM should be '', not undefined.
  const renderedValue = isUndefined(params.score)? '' : params.score;

  if (params.isDone || !params.isStarted || !Number.isNaN(score)) {
    return (
      <td 
        data-id={uniqueId} 
        key={uniqueId}
        data-game={gameId} 
        data-scoreop={params.scoreOptionId}
      >
      {renderedValue}
    </td>)
  }

  else return (
    <td 
      data-game={gameId} 
      data-scoreop={params.scoreOptionId}
      data-id={uniqueId} 
      key={uniqueId}
      tabIndex={hasHand? 0 : undefined}
      aria-role= {hasHand? 'button': undefined}
      className={className.join(' ')}
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