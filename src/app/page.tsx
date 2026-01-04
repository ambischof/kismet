'use client';
import _ from 'lodash';
import './page.css'
import ScoreCard from './components/ScoreCard';
import GameReducer, {Game, initializer} from './components/GameReducer';
import {useReducer} from 'react';
import AboutDialog from './components/AboutDialog';

export default function Home() {
  const [gameState, dispatch] = useReducer(GameReducer, {games: [], GAME_COUNT: 3}, initializer);

  function doUpdateScore (game: Game, slotId:number, score:number) {
    dispatch({type: 'updateScore', game, slotId, score })
  }


  // TODO rethink the layout. Make mobile friendly!!
  return (
    <main>
      <AboutDialog />
      <ScoreCard
        gameState={gameState}
        doUpdateScore={doUpdateScore}
      />
    </main>
  )
}


