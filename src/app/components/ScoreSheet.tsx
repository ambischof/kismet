import { JSX } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { GameState } from './GameReducer';
import styles from './ScoreSheet.module.css';
import scoringOptions from '../../lib/scoreOptions';

type ScoreSheetOptions = {
  gameState: GameState;
  doUpdateScore: (slotId: number, score: number)=>void;
};
function ScoreSheet(scoreSheetOptions: ScoreSheetOptions) {

  // currently trying use the lib's approach and not automatically export vals to css
  const theme = useTheme();
  
  
  const {gameState, doUpdateScore} = scoreSheetOptions;
  const labels = scoringOptions.map(so=> {
    // todo: add like more info for score computation and stuff
    return (
      <Box 
        className={styles.cell} 
        sx={{backgroundColor:'background.default',  color: 'text.primary' }}
        key={'label-'+ so.id} 
        id={'score-' + so.id}>
          {so.name}
      </Box>
    );
  });
  // todo: this needs to be functional
  const values = gameState.games[0].slots.map((slot, i) => {
    return (
      <Box className={styles.cell} 
        sx={{backgroundColor:'background.default',  color: 'text.primary' }}
        key={'value-'+ i} 
        aria-describedby={'score-'+ i}>
        {slot.score || '0'}
      </Box>
    );
  });
  
  // arrange in the order needed for grid to work correctly
  const items: JSX.Element[] = [];
  for (let i = 0; i < scoringOptions.length; i++) {
    items.push(labels[i]);
    items.push(values[i]);
  }


  return (
    <div id="score-sheet-container" className={styles.scoresheetcontainer}>
      {items}
    </div>
  );
}

export default ScoreSheet;