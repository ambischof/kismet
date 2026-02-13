'use client';
import { JSX, useReducer } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { isNull } from 'lodash';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Container, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import './page.css';
import GameReducer, {initializer} from './components/GameReducer';
import ScoreSheet from './components/ScoreSheet';
import WorkingHand from './components/WorkingHand';
import gameUtils from '../lib/gameUtil';

export default function HomePage(): JSX.Element {
  const theme = createTheme({
    // allow use of MUI colors in css 
    cssVariables: true,
    colorSchemes: {
      light: true,
      dark: { // enables dark mode
        palette: {
          background: {
            // shifts bg color from black to very dark blue
            default: '#00052f' 
          }
        }
      } 
    }
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

  function doUndo() {
    dispatch({type: 'applyUndo'});
  }

  const canUndo = !!gameState.undoState;
  
  return (
    <ThemeProvider theme={theme}>
    <Container component="main">
      
      <CssBaseline  />

      <Paper 
        elevation={5} 
        id="kismet-game-container">

        <AppBar id="kismet-toolbar" color="transparent" position="static" >
          <ToolBar variant="dense">

            <Typography variant="h6" component="div">
              Total Score: {gameUtils.getTotalScore(gameState.games[0])}
            </Typography>
            
            {canUndo && 
            <IconButton 
              onClick={doUndo} 
              title="Undo last action"
              sx={{ml: 'auto'}}>
              <UndoIcon />
            </IconButton>}

          </ToolBar>
        </AppBar>

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
      </Paper>

    </Container>
    </ThemeProvider>
  );
}