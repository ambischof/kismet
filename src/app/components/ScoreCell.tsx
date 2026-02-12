import { Box } from '@mui/material'
import { isNumber } from 'lodash'; 
import styles from './ScoreSheet.module.css';


type ScoreCellProps = {
  slotId: number;
  slotName: string;
  score?: number | null; // already saved score for this slot
  availableScore?: number | null; // score available from current working hand; undefined/null means not available
  onApplyScore: () => void;
};

export default function ScoreCell({
  slotId,
  slotName,
  score,
  availableScore,
  onApplyScore,
}: ScoreCellProps) {
  const hasSaved =  isNumber(score);
  // means there's no existing AND a working hand exists
  const hasAvailable = !hasSaved && isNumber(availableScore);


  const handleClick = () => {
    if (!hasAvailable) return;
    onApplyScore();
  };
  
  const extraClasses = [];
  if (hasAvailable) {
    extraClasses.push(styles.available);
    if (availableScore > 0) {
      extraClasses.push(styles.goodScore);
    }
  }

  // the score to display which may or may not be wrapped
  const valueText = hasSaved ? String(score) : hasAvailable ? String(availableScore) : '-';
  

  const value = !hasAvailable? <>{valueText}</> : 
  // Wrap in button to allow user to click if needed
    (
      <button
        name={'apply-score-' + slotName}
        title={`(${valueText}) Apply score for ${slotName}`}
        onClick={handleClick}
        className={styles.cellButton}>
        {valueText}
      </button>
    );

    return (
    <Box 
      component="div"
      className={styles.labelCell + ' ' + styles.cell}
      id={'score-' + slotId}>
        <div>{slotName}</div>
      <div 
        className={styles.cellAppend + ' ' + extraClasses.join(' ')}>
        {value}
      </div> 
    </Box>
  );
}