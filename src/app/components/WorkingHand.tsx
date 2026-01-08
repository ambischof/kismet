import {JSX, useState} from 'react';
import { capitalize } from 'lodash';
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
    newState[i] = !newState[i];
    setSelctedState(newState);
  }

  function onRerollClick() {
    if (!canRerollHand) return;
    const indicies = [];
    for (let i in selectedState) {
      if (selectedState[i]) 
        indicies.push(Number(i));
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
      <button 
        id="roll-hand"  
        type="button" 
        onClick={onResetClick}>
        Start Over!
      </button>
    );
    message = 'Do you want to start over?';
  }

  else if (workingHand) {
    const diceMKU = workingHand.map((val, i) => {
      const selected = selectedState[i];
      const dieSymbol = dieSymbols[val];
      const extraClasses = [];
      if (canRerollHand) {
        extraClasses.push('selectable');
        if (selected) extraClasses.push('selected');
      } 

      return (
        <div 
          className={"rolled-die " + extraClasses.join(' ')}
          tabIndex={canRerollHand? 0 : undefined}
          role={canRerollHand? 'button' : undefined}
          onClick={()=>onDieClick(i)}
          key={i}>
          <img src={dieSymbol.src} height={50} width={50} alt={capitalize(numberNames[val]) + ' die'}/>
        </div>
      )
    });

    message = canRerollHand? 'Select any dice to reroll or select a combination' : 'Select a combination';
    isDisabledControls = !canRerollHand;
    body = (
      <div id="working-hand-dice">
       {diceMKU}
      </div>
    );
    controls = (
      <button 
        id="roll-hand" 
        type="button"
        onClick={onRerollClick}>
        Roll!
      </button>
    );
  }
  
  // when dice are not rolled yet
  else  {
    controls = ( 
      <button 
        id="roll-hand"  
        type="button" 
        onClick={onClickRoll}>
        Roll!
      </button>
    );
  }

  return (
    <div id="working-hand-container">
      <div id="working-hand-body">
        {!!body && body}
        {!!controls && (
        <div id="working-hand-controls" className={isDisabledControls? 'disabled-hand-controls' : undefined}>
          {controls}
        </div>)}
      </div>
      {!!message && (
      <div id="working-hand-message">
       {message}
      </div>)}
    </div>
  )
}