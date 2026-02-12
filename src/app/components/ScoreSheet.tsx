import { JSX } from 'react';
import { Typography } from '@mui/material';
import { GameState } from './GameReducer';
import styles from './ScoreSheet.module.css';
import scoringOptions from '../../lib/scoreOptions';
import ScoreCell from './ScoreCell';
import gameUtils from '../../lib/gameUtil';

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

  /* 
    NOTE: I did not end up using MUI List for this because the 
    styling/abstractions did not lend themselves to this use case.
  */
  const items: JSX.Element[] = [];
  for (let i = 0; i < scoringOptions.length; i++) {
    const slot = gameState.games[0].slots[i];
    items.push(
      <ScoreCell
        key={i}
        score={slot.score}
        slotId={i}
        availableScore={computeScore(i)} 
        onApplyScore={() => {onApplyScore(i)}}
        slotName={scoringOptions[i].name}/>
    );
  }

  return (
    <div id="score-sheet-container">
      
      <div id="score-sheet-totals" className={styles.totalsContainer}>
        <Typography variant="h6" component="div" className={styles.cell} sx={{px: 1}}>
          Total Score: {gameUtils.getTotalScore(gameState.games[0])}
        </Typography>
      </div>
      
      <div className={styles.scoresheetcontainer}>
        {items}
      </div>
    </div>
  );
}

export default ScoreSheet;