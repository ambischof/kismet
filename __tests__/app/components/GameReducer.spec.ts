import _ from 'lodash';
import GameReducer, {initializer, GameState} from "../../../src/app/components/GameReducer";
import scoringOptions from '../../../src/lib/scoreOptions';


describe('gameReducer', function() {
  let gameState: GameState;
  beforeEach(()=>{
      gameState = initializer({games: [], GAME_COUNT: 3});
  });

  it('should initialize correctly', ()=>{
    let games = gameState.games;
    expect(games).toHaveLength(3);

    let ids = _.map(games, 'id').join();
    expect(ids).toBe('0,1,2');

    expect(_.every(games, {isDone: false})).toBe(true);
    expect(_.every(games.slice(1), {isStarted: false})).toBe(true);
    expect(games[0].isStarted).toBe(true);
    expect(games[0].slots).toHaveLength(scoringOptions.length);
  });

  it('should update score correctly', ()=> {
    let game = gameState.games[0];
    let updated = GameReducer(gameState, {type: 'updateScore', game, slotId: 0, score:3});
    expect(updated.games[0].slots[0].score).toBe(3);
  })

  it('should update score and finish game', ()=>{
    let game = gameState.games[0];

    // fill all but the first two
    for (let slot of game.slots.slice(2)) {
      slot.score = 3;
    }

    // fill the second to last one to make sure it doesn't end it prematurely
    let updated = GameReducer(gameState, {type: 'updateScore', game, slotId: 1, score:3});
    game = updated.games[0];
    expect(game.isDone).toBe(false);

    updated = GameReducer(updated, {type: 'updateScore', game, slotId: 0, score:3});
    game = updated.games[0];
    expect(game.isDone).toBe(true);
    expect(updated.games[1].isStarted).toBe(true);
  });
});