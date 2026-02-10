import { isNumber } from 'lodash'; 
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  
  const theme = useTheme();
  
  const hlColor = theme.palette.secondary.light;
  // cell background color
  const bgColor = !hasAvailable? 'background.default' : // non-interactive cell
    (availableScore as number) > 0 ? theme.lighten(hlColor, .6) : //nonzero score
    theme.lighten(hlColor, .8); //zero score

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
    <Box className={styles.cell} 
      aria-describedby={ariaDescribedby}
      sx={{
        bgcolor: bgColor,
        border: hasAvailable ? `1px solid ${theme.palette.secondary.main}` : 'none',
        color: 'text.primary'
        }}>
      {value}
    </Box> 
  );
}