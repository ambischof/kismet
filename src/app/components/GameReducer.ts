import _ from 'lodash';
import scoringOptions from '../../lib/scoreOptions';
import gameUtils from '../../lib/gameUtil';

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
      ScoreUpdateAction ;
      // | 
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

function finishGame(game : Game, gameState: GameState) {
  const clonedGame = _.cloneDeep(game);
  clonedGame.isDone = true;

  let newGames = updateGameInArray(gameState.games, clonedGame);

  // if there is a next game, start it
  if (game.id < (gameState.GAME_COUNT - 1)) {
    const clonedNextGame = _.cloneDeep(gameState.games[game.id + 1]);
    
    clonedNextGame.isStarted = true;
    
    newGames = updateGameInArray(newGames, clonedNextGame);
  }
  return newGames;
}

function initializer (gameState: GameState) {
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
      return newState;
    }
  }
}