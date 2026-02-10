import { JSX } from 'react';
import { Box } from '@mui/material';
import { GameState } from './GameReducer';
import styles from './ScoreSheet.module.css';
import scoringOptions from '../../lib/scoreOptions';
import ScoreCell from './ScoreCell';

type ScoreSheetOptions = {
  gameState: GameState;
  doUpdateScore: (slotId: number, score: number)=>void;
};
function ScoreSheet(scoreSheetOptions: ScoreSheetOptions) {
  const {gameState, doUpdateScore} = scoreSheetOptions;
  
  // return computed score for a given score slot
  function computeScore(slotId: number) {
    if (!gameState.workingHand) return null;
    return scoringOptions[slotId].computeScore(gameState.workingHand);
  }

  function onApplyScore(slotId: number) {
    doUpdateScore(slotId, computeScore(slotId));
  }

  const labels = scoringOptions.map(so=> {
    // todo: add like more info for score computation and stuff
    return (
      <Box 
        component="div"
        className={styles.labelCell + ' ' + styles.cell} 
        sx={{backgroundColor:'background.default',  color: 'text.primary' }}
        key={'label-'+ so.id} 
        id={'score-' + so.id}>
          {so.name}
      </Box>
    );
  });
  
  const values = gameState.games[0].slots.map((slot, i) => {
    return (
      <ScoreCell
        key={'value-'+ i} 
        score={slot.score}
        slotId={i}
        availableScore={computeScore(i)} 
        onApplyScore={() => {onApplyScore(i)}}
        slotName={scoringOptions[i].name}
        aria-describedby={'score-'+ i} />
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