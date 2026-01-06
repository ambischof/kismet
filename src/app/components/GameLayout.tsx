import _ from 'lodash';
import ScoreCard from './ScoreCard';
import GameReducer, {Game, initializer} from './GameReducer';
import WorkingHand from './WorkingHand';
import {useReducer} from 'react';

type GameLayoutOptions = {
  mode: 'play'|'scorecard';
}
export default function GameLayout(gameoptions:GameLayoutOptions) {
  const options = { GAME_COUNT: 3};
  const [gameState, dispatch] = useReducer(GameReducer, options, initializer);

  function doRoll() {
    dispatch({type: 'roll'});
  }

  function doReroll(indicies: Array<number>) {
    dispatch({type: 'reroll', rerollIndicies: indicies});
  }

  function doReset() {
    dispatch({type: 'reset'});
  }
  
  function doUpdateScore (game: Game, slotId:number, score:number) {
    dispatch({type: 'updateScore', game, slotId, score })
  }


  // TODO rethink the layout. Make mobile friendly!!
  return (
    <>
      <ScoreCard
        gameState={gameState}
        doUpdateScore={doUpdateScore}
        mode={gameoptions.mode}
      />
      {gameoptions.mode === 'play' && 
      <WorkingHand 
        key={gameState.optionsLeft}
        canRerollHand={gameState.canRerollHand}
        workingHand={gameState.workingHand}
        needReset={_.isNull(gameState.activeGame)}
        doRoll={doRoll}
        doReroll={doReroll}
        doReset={doReset}
      />
      }
    </>
  )
}


