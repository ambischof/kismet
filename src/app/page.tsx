'use client';
import './page.css'
import AboutDialog from './components/AboutDialog';
import Switcher from './components/Switcher';
import GameLayout from './GameLayout';
import { useState } from 'react';


export default function () {
  let [mode, setMode] = useState(undefined);

  function doSetMode (mode:string) {
    setMode(mode);
  }
  return (
    <main>
      <AboutDialog />
      {mode? 
        <GameLayout mode={mode}/>
        :   
        <Switcher setMode={doSetMode} />
      }
    </main>
  );
}