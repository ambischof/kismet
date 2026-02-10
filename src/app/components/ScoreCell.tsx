import { isNumber } from 'lodash'; 
import styles from './ScoreSheet.module.css';


type ScoreCellProps = {
  slotId: number;
  slotName: string;
  score?: number | null; // already saved score for this slot
  availableScore?: number | null; // score available from current working hand; undefined/null means not available
  onApplyScore: () => void;
  ariaDescribedby?: string;
};

export default function ScoreCell({
  slotName,
  score,
  availableScore,
  onApplyScore,
  ariaDescribedby
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
  let value = (<>{hasSaved ? String(score) : hasAvailable ? String(availableScore) : '-'}</>);

  // Wrap in button to allow user to click if needed
  if (hasAvailable) {
    value = (
      <button
        name={'apply-score-' + slotName}
        title={`(${value}) Apply score for ${slotName}`}
        onClick={handleClick}
        className={styles.cellButton}>
        {value}
      </button>
    );
  }

  return (
    <div 
      className={styles.cell + ' ' + extraClasses.join(' ')} 
      aria-describedby={ariaDescribedby}>
      {value}
    </div> 
  );
}