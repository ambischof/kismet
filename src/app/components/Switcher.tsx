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

        <button 
          type="button" 
          name="scorecard"
          onClick={()=>setMode('scorecard')}>
            Interactive Scorecard
        </button>

        <button 
          type="button" 
          name="play"
          onClick={()=>setMode('play')}>
            Play!
        </button>

      </div>
    </div>
  )
}