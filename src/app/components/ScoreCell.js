import { isUndefined } from "lodash";

function ScoreCell (params, changeValue) {
  function onChange (e) {
    let value = Number(e.target.value);
    if (Number.isNaN(value)) value = undefined;
    changeValue(params.scoreOptionId, value)
  };
  const uniqueId = `${params.gameId}-${params.scoreOptionId}`;

  // When empty, the value in DOM should be '', not undefined.
  const renderedValue = isUndefined(params.score)? '' : params.score;

  if (params.isDone || !params.isStarted) {
    return (
      <div 
        className="cell"
        data-id={uniqueId} 
        key={uniqueId}
        data-game={params.gameId} 
        data-scoreop={params.scoreOptionId}
      >
      {renderedValue}
    </div>)
  }

  else return (
    <div className="cell input-cell" data-id={uniqueId} key={uniqueId}>
      <input 
        data-game={params.gameId} 
        data-scoreop={params.scoreOptionId}
        type="text" 
        value={renderedValue}
        onChange={onChange}
      >
      </input>
    </div>)
  }

  export default ScoreCell;