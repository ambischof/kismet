import { Fragment, JSX } from 'react';
import { Box, Typography } from '@mui/material';
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

  const items: JSX.Element[] = [];
  for (let i = 0; i < scoringOptions.length; i++) {
    const so = scoringOptions[i];
    const slot = gameState.games[0].slots[i];
    items.push(
      <Fragment key={i}>
        <Box 
          component="div"
          className={styles.labelCell + ' ' + styles.cell}
          id={'score-' + i}>
           {so.name}
        </Box>
        <ScoreCell
          score={slot.score}
          slotId={i}
          availableScore={computeScore(i)} 
          onApplyScore={() => {onApplyScore(i)}}
          slotName={scoringOptions[i].name}
          ariaDescribedby={'score-'+ i} />
      </Fragment>
    )
  }

  return (
    <div id="score-sheet-container">
      
      <div id="score-sheet-totals" className={styles.totalsContainer}>
        <Typography variant="h6" component="div" className={styles.cell}>
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