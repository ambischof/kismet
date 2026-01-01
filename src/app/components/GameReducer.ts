import _ from 'lodash';
import scoringOptions from '../../lib/scoreOptions';
import gameUtils from '../../lib/gameUtil';

type Hand = [number,number,number,number,number]; 
type ScoreSlot = {
  score: number;
}

type Game = {
  id: number;
  isDone: boolean;
  isStarted: boolean;
  slots: ScoreSlot[];
}
type GameState = {
  games: Game[];
  GAME_COUNT: number;
  workingHand: Hand | null;
  canRerollHand: boolean;
  activeGame: number | null;
  optionsLeft: number; //to help with resetting workingHand when option is selected.
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
      | RerollAction;
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

// end the game and start next one if existing
function finishGame(game : Game, gameState: GameState) {
  const clonedGame = _.cloneDeep(game);
  clonedGame.isDone = true;

  let newGames = updateGameInArray(gameState.games, clonedGame);

  // if there is a next game, start it
  if (game.id < (gameState.GAME_COUNT - 1)) {
    const clonedNextGame = _.cloneDeep(gameState.games[game.id + 1]);
    
    clonedNextGame.isStarted = true;
    
    newGames = updateGameInArray(newGames, clonedNextGame);
    gameState.activeGame = clonedNextGame.id;
  }
  else gameState.activeGame = null;

  return newGames;
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
    canRerollHand: false
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

export default function gameReducer(gameState: GameState, action: GameAction) : GameState {
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
        newState.games = finishGame(game, newState);
      }

      newState.workingHand = null;
      newState.canRerollHand = false;

      newState.optionsLeft = gameState.optionsLeft - 1;
      return newState;
    }
  }
}
