'use client';
import { JSX, useReducer } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { isNull } from 'lodash';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Container, Paper } from '@mui/material';
import './page.css';
import GameReducer, {initializer} from './components/GameReducer';
import ScoreSheet from './components/ScoreSheet';
import WorkingHand from './components/WorkingHand';

export default function HomePage(): JSX.Element {
  const theme = createTheme({
    cssVariables: true
 });

  const options = { GAME_COUNT: 1};
  const [gameState, dispatch] = useReducer(GameReducer, options, initializer);
    
  function doUpdateScore (slotId:number, score:number) {
    dispatch({type: 'updateScore', game: gameState.games[0], slotId, score })
  }
  function doRoll() {
    dispatch({type: 'roll'});
  }

  function doReroll(indicies: Array<number>) {
    dispatch({type: 'reroll', rerollIndicies: indicies});
  }

  function doReset() {
    dispatch({type: 'reset'});
  }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main">
      
      <CssBaseline  />

      <Paper 
        elevation={5} 
        id="kismet-game-container">

        <ScoreSheet
          gameState={gameState} 
          doUpdateScore={doUpdateScore}/>

        <WorkingHand 
          key={gameState.optionsLeft}
          canRerollHand={gameState.canRerollHand}
          workingHand={gameState.workingHand}
          needReset={isNull(gameState.activeGame)}
          doRoll={doRoll}
          doReroll={doReroll}
          doReset={doReset}
        />
{/*   
        <p>find the old one at <a href="/vanilla">/vanilla</a></p> */}
      </Paper>

    </Container>
    </ThemeProvider>
  );
}