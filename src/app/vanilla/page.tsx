'use client';
import './globals.css';
import './page.css';
import AboutDialog from './AboutDialog';
import Switcher from './Switcher';
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