'use client';
import _ from 'lodash';
import './page.scss'
import ScoreCard from './components/ScoreCard';
import GameReducer, {initializer} from './components/GameReducer';
import WorkingHand from './components/WorkingHand';
import {useReducer} from 'react';

export default function Home() {
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


  // TODO rethink the layout. Make mobile friendly!!
  return (
    <main>
      <ScoreCard
        gameState={gameState}
        dispatch={dispatch}
      />
      <WorkingHand 
        key={gameState.optionsLeft}
        canRerollHand={gameState.canRerollHand}
        workingHand={gameState.workingHand}
        needReset={_.isNull(gameState.activeGame)}
        doRoll={doRoll}
        doReroll={doReroll}
        doReset={doReset}
      />
    </main>
  )
}


