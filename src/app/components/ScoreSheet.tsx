import { JSX } from 'react';
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

  /* 
    NOTE: I did not end up using MUI List for this because the 
    styling/abstractions did not lend themselves to this use case.
    // todo try stack
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
      <div className={styles.scoresheetcontainer}>
        {items}
      </div>
    </div>
  );
}

export default ScoreSheet;