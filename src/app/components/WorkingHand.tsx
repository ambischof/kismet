import {useState} from 'react';
import _ from 'lodash'
import dieSymbols from '../../lib/dieSymbols';


type Hand = [number,number,number,number,number]; 

type WorkingHandOptions = {
  workingHand: Hand | null;
  canRerollHand: boolean;
  doRoll: ()=>void;
  doReroll: (indicies:Array<number>)=>void;
}

export default function WorkingHand(options: WorkingHandOptions) {
  let {workingHand, canRerollHand, doRoll, doReroll} = options;
  
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

  if (workingHand) {
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
          <span className="die-symbol">{dieSymbol}</span>
          
        </div>
      )
    });

    const message = canRerollHand? 'Select any dice to reroll' : '';
    const handControlClass= canRerollHand? '' :'disabled-hand-controls';
  
    return (
      // when dice have been rolled
      <div id="working-hand-container">
        <div id="working-hand-body">
          {/* dice */}
          <div id="working-hand-dice">
            {diceMKU}
          </div>
          {/* controls */}
          <div id="working-hand-controls" className={handControlClass}>
            <button 
              id="roll-hand" 
              type="button"
              onClick={onRerollClick}>
              Roll!
            </button>
          </div>
        </div>
        <div id="working-hand-message">{message}</div>
      </div>
    )

    
  }
  // when dice are not rolled yet
  else return (
    <div id="working-hand-container">
      <div id="working-hand-body">
        <div id="working-hand-controls">
          <button 
            id="roll-hand"  
            type="button" 
            onClick={onClickRoll}>
            Roll!
          </button>
        </div>
      </div>
    </div>
  )
}