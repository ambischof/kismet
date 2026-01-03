'use client';
import _ from 'lodash';
import './page.scss'
import ScoreCard from './components/ScoreCard';
import GameReducer, {initializer} from './components/GameReducer';
import {useReducer} from 'react';
import AboutDialog from './components/AboutDialog';

export default function Home() {
  const [gameState, dispatch] = useReducer(GameReducer, {games: [], GAME_COUNT: 3}, initializer);



  // TODO rethink the layout. Make mobile friendly!!
  return (
    <main>
      <AboutDialog />
      <ScoreCard
        gameState={gameState}
        dispatch={dispatch}
      />
    </main>
  )
}


