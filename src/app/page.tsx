'use client';
import _ from 'lodash';
import './page.scss'
import ScoreCard from './components/ScoreCard';
import GameManager from './components/GameManager';
import React from 'react';


export default function Home() {

  const gameManager = GameManager();
  const scoreCard = ScoreCard({gameManager});


  // TODO use grid layout. Table doesn't get the spacing right easily
  return (
    <main>
      {scoreCard}
    </main>
  )
}
