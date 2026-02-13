import _  from 'lodash';
import scoringOptions from '../../lib/scoreOptions';
import gameUtils from '../../lib/gameUtil';
import {Hand, Game} from '../../types/game'

type GameState = {
  games: Game[];
  GAME_COUNT: number;
  workingHand: Hand | null;
  canRerollHand: boolean;
  activeGame: number | null;
  optionsLeft: number; //to help with resetting workingHand when option is selected.
  undoState: GameState | null;
}
type RollAction = {
  type: 'roll';
}
type RerollAction = {
  type: 'reroll';
  rerollIndicies: Array<number>; // the indicies of the dice to reroll
}
type UpdateHandAction = {
  type: 'updateHand';
  workingHand: Hand;
}

type ScoreUpdateAction = {
  type: 'updateScore';
  game: Game;
  slotId: number;
  score: number;
}

type ResetAction = {
  type: 'reset'
}
type ApplyUndoAction = {
  type: 'applyUndo';
}
// interface UpdateGameAction {
//   type: 'update',
//   game: Game
// }
// interface UpdateAllGamesAction {
//   type: 'updateAll',
//   games: Game[]
// }

type GameAction = 
      ScoreUpdateAction 
      | RollAction
      | UpdateHandAction 
      | RerollAction
      | ResetAction 
      | ApplyUndoAction;
      // UpdateGameAction | 
      // UpdateAllGamesAction;

function makeGame(id : number) : Game {
  return {
    id,
    isDone: false,
    isStarted: id === 0,
    slots: scoringOptions.map(so => ({ id: so.id, score: undefined })),
  };
}

// replace the game in the array with the new one
function updateGameInArray(games:Game[], game: Game) : Game[] {
  const newGames = games.map(g => {
    if (g.id === game.id) return game;
    else return g;
  });
  return newGames;
}

function startNextGame(gameState: GameState) {
  const nextGame = gameState.games[gameState.activeGame + 1];
  const clonedNextGame = {...nextGame};
  
  clonedNextGame.isStarted = true;
  
  return {
    ...gameState,
    games: updateGameInArray(gameState.games, clonedNextGame),
    activeGame: clonedNextGame.id,
    optionsLeft: scoringOptions.length,
    undoState: null
  };
}

// end the game and start next one if existing
function finishGame(gameState: GameState) : GameState {
  const game = gameState.games[gameState.activeGame];

  const clonedGame = {
    ...game,
    isDone: true
  }

  let newGameState: GameState = {...gameState};
  newGameState.games = updateGameInArray(gameState.games, clonedGame);

  // if there is a next game, start it
  if (game.id < (gameState.GAME_COUNT - 1)) {
    newGameState = startNextGame(newGameState);
  }
  else newGameState.activeGame = null;

  return newGameState;
}

// create initial state data, taking options into account
// static function to the reducer
function initializer (options: Partial<GameState>) {
  if (!options) {options = {}}
  
  _.defaults(options, {
    games: [], 
    workingHand: null, 
    GAME_COUNT: 6,
    activeGame: 0,
    optionsLeft: scoringOptions.length,
    canRerollHand: false,
    undoState: null
  });

  const gameState : GameState = options as GameState; 
  const gameIds = _.times(gameState.GAME_COUNT, _.identity); // makes [0,1,2,3,4,5]

  const games = gameIds.map(makeGame);
  
  return {
    ...gameState,
    games
  };
}

export {initializer};

export type {GameState, GameAction, Game}

function gameReducer(gameState: GameState, action: GameAction) : GameState {
  switch (action.type) {
    // case 'update' : {
    //   // replace the game in the array with the new one
    //   const newGames = updateGameInArray(gameState.games, action.game)

    //   return {
    //     ...gameState,
    //     games: newGames
    //   };

    // }
    // case 'updateAll' : {
    // const newGames = [...gameState.games];
    //   for (let g of action.games) {
    //     newGames[g.id] = g;
    //   }
    //   let newState = {...gameState};
    //   newState.games = newGames;
    //   return newState;
    // }
    
    case 'roll' : {
      // clear undo at roll
      if (gameState.undoState) gameState.undoState = null;
 
      //I could do this DRYer with lodash _.times or _.fill but 
      // I'm not sure it's worth using casting when TS throws a fit
      const newHand : Hand =  [
        _.random(1,6), 
        _.random(1,6), 
        _.random(1,6), 
        _.random(1,6), 
        _.random(1,6)
      ]

      return {
        ...gameState,
        canRerollHand: true,
        workingHand: newHand
      };
    }

    // Reroll just the dice specified, and end rerolling
    case 'reroll' : {
      let newHand = gameState.workingHand
      for (let i of action.rerollIndicies) {
        newHand[i] = _.random(1,6);
      }
      
      return {
        ...gameState,
        canRerollHand: false,
        workingHand: newHand
      };
    }

    case 'updateHand': {
      return {
        ...gameState,
        workingHand: action.workingHand
      };      
    }

    case 'updateScore': {
      const game = _.cloneDeep(action.game);
      game.slots[action.slotId].score = action.score;

      const newGames = updateGameInArray(gameState.games, game);
      let newState = {...gameState};
      newState.games = newGames;
      
      // check if game is complete, if so, finish game
      // and maybe start new one
      if (gameUtils.isGameComplete(game)) {
        newState = finishGame(newState);
      }

      newState.workingHand = null;
      newState.canRerollHand = false;

      newState.optionsLeft = gameState.optionsLeft - 1;

      // sanity check, should not happen in UI flow
      if (gameState.undoState) gameState.undoState = null;
      newState.undoState = gameState; // save current state for undoing
      
      return newState;
    }

    case 'reset': {
      return initializer({GAME_COUNT: gameState.GAME_COUNT});
    }

    case 'applyUndo': {
      if (!gameState.undoState) return gameState;
      return gameState.undoState;
    }
  }
}


export default gameReducer;