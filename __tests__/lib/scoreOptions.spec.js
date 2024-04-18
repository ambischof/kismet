import scoreOptions from '@/lib/scoreOptions';

it('should give 0 for no aces in aces', () => {
  expect(scoreOptions[0].computeScore([2,2,2,2,2])).toBe(0);
});
it('should give 0 for no 2 in 2s', () => {
  expect(scoreOptions[1].computeScore([3,3,3,3,3])).toBe(0);
});
it('should give 0 for no 3 in 3s', () => {
  expect(scoreOptions[2].computeScore([4,4,4,4,4])).toBe(0);
});
it('should give 0 for no 4 in 4s', () => {
  expect(scoreOptions[3].computeScore([5,5,5,5,5])).toBe(0);
});
it('should give 0 for no 5 in 5s', () => {
  expect(scoreOptions[4].computeScore([6,6,6,6,6])).toBe(0);
});
it('should give 0 for no 6 in 6s', () => {
  expect(scoreOptions[5].computeScore([1,1,1,1,1])).toBe(0);
});
it('should give 4 for 4 aces', () => {
  expect(scoreOptions[0].computeScore([1,1,1,1,3])).toBe(4);
});
it('should give 8 for 4 2s', () => {
  expect(scoreOptions[1].computeScore([2,2,2,2,3])).toBe(8);
});
it('should give 12 for 4 3s', () => {
  expect(scoreOptions[2].computeScore([3,3,3,3,4])).toBe(12);
});
it('should give 16 for 4 4s', () => {
  expect(scoreOptions[3].computeScore([4,4,4,4,3])).toBe(16);
});
it('should give 20 for 4 5s', () => {
  expect(scoreOptions[4].computeScore([5,5,5,5,3])).toBe(20);
});
it('should give 24 for 4 6s', () => {
  expect(scoreOptions[5].computeScore([6,6,6,6,3])).toBe(24);
});
it('should give 0 for no pairs', () => {
  expect(scoreOptions[6].computeScore([1,2,3,4,5])).toBe(0);
});
it('should give 0 for pairs of different colors', () => {
  expect(scoreOptions[6].computeScore([1,1,2,2,3])).toBe(0);
});
it('it should give 17 for [1,1,6,6,3]', () => {
  expect(scoreOptions[6].computeScore([1,1,6,6,3])).toBe(17);
});
it('it should give 7 for [1,1,1,1,3]', () => {
  expect(scoreOptions[6].computeScore([1,1,1,1,3])).toBe(7);
});
it('it should give 0 for no 3 of a kind', () => {
  expect(scoreOptions[7].computeScore([1,2,3,4,5])).toBe(0);
});
it('it should give 8 for [1,1,1,2,3]', () => {
  expect(scoreOptions[7].computeScore([1,1,1,2,3])).toBe(8);
});
it('it should give 30 for low straight', () => {
  expect(scoreOptions[8].computeScore([1,2,3,4,5])).toBe(30);
});
it('it should give 30 for hight straight', () => {
  expect(scoreOptions[8].computeScore([2,3,4,5,6])).toBe(30);
});
it('it should give 0 for no flush', () => {
  expect(scoreOptions[9].computeScore([1,2,3,4,5])).toBe(0);
});
it('it should give 35 for a flush', () => {
  expect(scoreOptions[9].computeScore([2,2,2,5,5])).toBe(35);
});
it('it should give 0 for no full house', () => {
  expect(scoreOptions[10].computeScore([1,2,3,4,5])).toBe(0);
});
it('it should give 22 for [11122] (full house)', () => {
  expect(scoreOptions[10].computeScore([1,1,1,2,2])).toBe(22);
});
it('it should give 20 for [11111] (full house)', () => {
  expect(scoreOptions[10].computeScore([1,1,1,1,1])).toBe(20);
});
it('it should give 0 for no full house same color', () => {
  expect(scoreOptions[11].computeScore([1,1,1,2,2])).toBe(0);
});
it('it should give 36 for [2,2,2,5,5]', () => {
  expect(scoreOptions[11].computeScore([2,2,2,5,5])).toBe(36);
});
it('it should give 0 for not 4 of a kind', () => {
  expect(scoreOptions[12].computeScore([1,2,3,4,5])).toBe(0);
});
it('it should give 31 for [1,1,1,1,2] (four of a kind)', () => {
  expect(scoreOptions[12].computeScore([1,1,1,1,2])).toBe(31);
});
it('it should give 5 for [1,1,1,1,1] (Yarborough)', () => {
  expect(scoreOptions[13].computeScore([1,1,1,1,1])).toBe(5);
});
it.skip('it should give 0 for not 5 of a kind', () => {
  expect(scoreOptions[1].computeScore([1,2,3,4,5])).toBe(0);
});
it.skip('it should give 55 for [1,1,1,1,1] (5 of a kind)', () => {
  expect(scoreOptions[14].computeScore([1,1,1,1,1])).toBe(55);
});
