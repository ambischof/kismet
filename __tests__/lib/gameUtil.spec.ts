import gameUtil from "../../src/lib/gameUtil";
import { initializer } from "../../src/app/components/GameReducer";

describe('gameUtil', () => {
  let games;

  beforeEach(()=>{
    let state = initializer({games: [], GAME_COUNT: 3});
    games = state.games;
  })
  it('should determine if game is done when done', function() {
    let game = games[0];
    // fill all slots so it will be "done"
    for (let slot of game.slots) {
      slot.score = 3;
    }

    expect(gameUtil.isGameComplete(game)).toBe(true);
  })
  it('should not say done when not done', function() {
    let game = games[0];

    expect(gameUtil.isGameComplete(game)).toBe(false);
  })
  // let game : GameManagerType;
  // beforeEach(()=>{
  //   game = GameManager();   
  // })
  // it('should roll working hand', () => {
  //   game.rollWorkingHand();
  //   expect(Array.isArray(game.workingHand)).toBe(true);
  //   for (let num of game.workingHand) {
  //     expect(num).toBeLessThanOrEqual(6);
  //     expect(num).toBeGreaterThanOrEqual(1);
  //   }
  // })
})