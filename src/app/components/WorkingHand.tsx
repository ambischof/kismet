import {JSX, useState} from 'react';
import { capitalize } from 'lodash';
import { Box, Typography, Button, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import dieSymbols from '../../lib/dieSymbols';
import numberNames from '../../lib/numberNames';

type Hand = [number,number,number,number,number]; 

type WorkingHandOptions = {
  workingHand: Hand | null;
  canRerollHand: boolean;
  needReset: boolean;
  doRoll: ()=>void;
  doReroll: (indicies:Array<number>)=>void;
  doReset: ()=>void;
}

export default function WorkingHand(options: WorkingHandOptions) {
  let {
    workingHand, canRerollHand, needReset, 
    doRoll, doReroll, doReset
  } = options;
  const theme= useTheme();
  
  // which dice are selected
  const [selectedState, setSelctedState] = 
    useState([false,false,false,false,false]);


  function clearSelection () {
    setSelctedState([false,false,false,false,false]);
  }
  
  function onClickRoll () {
    doRoll();
  }

  // Update the which dice are selected
  function onDieClick(i: number) {
    let newState = [...selectedState];
    newState[i] = !newState[i]; // Invert the selecteion
    setSelctedState(newState);
  }

  function onRerollClick() {
    if (!canRerollHand) return;
    // get the indicies of items which are currently `true`
    const indicies = [];

    for (let i in selectedState) {
      if (selectedState[i]) // if it's true (selected)
        indicies.push(Number(i)); // get the the index
    }
    doReroll(indicies);
    clearSelection();
  }

  function onResetClick() {
    if (needReset) doReset();
  }

  let message: string,
    controls: JSX.Element| JSX.Element[], 
    body: JSX.Element | JSX.Element[], 
    isDisabledControls:  boolean = false;
  
   if (needReset) {
    controls = (
      <Button 
        variant='contained'
        id="roll-hand"  
        onClick={onResetClick}>
        Start Over!
      </Button>
    );
    message = 'Do you want to start over?';
  }

  else if (workingHand) {
    // Dice Markup
    const diceMKU = workingHand.map((val, i) => {
      const selected = selectedState[i];
      const dieSymbol = dieSymbols[val];
      const extraClasses = [];
      if (canRerollHand && selected) {
        extraClasses.push('selected');
      }

      let image = (
        <Image 
          src={dieSymbol} 
          height={50} width={50} 
          loading="eager"
          alt={capitalize(numberNames[val]) + ' die'}/>
      );
      
      if (canRerollHand) {
        return (
          <ButtonBase
            className={"wh-rolled-die selectable " + extraClasses.join(' ')}
            onClick={()=>onDieClick(i)}
            name={'die-' + i}
            key={i}>
            {image}
          </ButtonBase>
        );
      } 
      else return (
        // with no interaction, use div instead of button
        <div className={"rolled-die"} key={i}>
          {image}
        </div>
      )
    });

    message = canRerollHand? 'Select any dice to reroll or select a combination' : 'Select a combination';
    isDisabledControls = !canRerollHand;
    body = (
      <div className="wh-dice-container">
       {diceMKU}
      </div>
    );
    controls = (
      <Button 
        variant='contained'
        id="roll-hand"
        disabled={selectedState.every(s => !s)} // disable if no dice are selected
        onClick={onRerollClick}>
          Roll!
      </Button>
    );
  }
  
  // when dice are not rolled yet
  else  {
    controls = ( 
      <Button
        variant='contained'
        id="roll-hand"
        onClick={onClickRoll}>
        Roll!
      </Button> 
    );
  }

  return (
    <Box id="working-hand-container" sx={{ p: 1}}>
      <div id="working-hand-body">
        {!!body && body}
        {!!controls && (
          <div id="working-hand-controls" className={isDisabledControls? 'disabled-hand-controls' : undefined}>
            {controls}
          </div>
        )}
      </div>
      {!!message && (
        <Box id="working-hand-message" sx={{ mt: 1, textAlign: 'center' }}>
          <Typography variant="body2">{message}</Typography>
        </Box>
      )}
    </Box>
  );
}