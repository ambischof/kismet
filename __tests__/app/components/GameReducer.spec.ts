import _ from 'lodash';
import GameReducer, {initializer, GameState} from "../../../src/app/components/GameReducer";
import scoringOptions from '../../../src/lib/scoreOptions';


describe('gameReducer', function() {
  let gameState: GameState;
  beforeEach(()=>{
    gameState = initializer({
      games: [], 
      workingHand: null, 
      GAME_COUNT: 3
    });
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

  it('should roll working hand', ()=>{
    let newState = GameReducer(gameState, {type: 'roll'});
    let workingHand = newState.workingHand;
    expect(Array.isArray(workingHand)).toBe(true);
    expect(workingHand).toHaveLength(5);
    for (let num of workingHand) {
      expect(num).toBeLessThanOrEqual(6);
      expect(num).toBeGreaterThanOrEqual(1);
    }
  });

  it('should reroll for working hand', ()=>{
    // since the rolling is random, it makes it easier
    // to deterministically test by mocking the random fn

    //make sure it starts with all 2s, so we know initial values
    let mock = jest.spyOn(_, "random").mockReturnValue(2);
    let newState = GameReducer(gameState, {type: 'roll'});

    // make sure all edited values are 3, so we can tell what changed
    mock.mockReturnValue(3);

    newState = GameReducer(newState, {
        type: 'reroll',
        rerollIndicies: [0,1]
      });
    // we are done with mock
    mock.mockClear();

    expect(newState.workingHand.join()).toBe('3,3,2,2,2');
  });
});