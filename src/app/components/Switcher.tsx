import Button from "./Button";

type SwitcherOptions = {
  setMode: (mode: 'scorecard' | 'play')=> void;
}
export default function Switcher({setMode}: SwitcherOptions) {
  return (
    <div id="game-mode-switcher">
      <div>
        How do you want to play Kismet?
      </div>
 
      <div id="game-mode-switcher-controls">

        <Button
          name="scorecard"
          onClick={()=>setMode('scorecard')}
          text="Interactive Scorecard"/>

        <Button
          name="play"
          onClick={()=>setMode('play')}
          text="Play!"/>
      </div>
    </div>
  )
}