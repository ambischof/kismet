import makeBasicBonus from '@/lib/makeBasicBonus';

it('should return no bonus below 63', () => {
  expect(makeBasicBonus(62)).toEqual(0);
})
it('should return 35 for low bonus', () => {
  expect(makeBasicBonus(63)).toEqual(35);
  expect(makeBasicBonus(70)).toEqual(35);
})
it('should return 55 for mid bonus', () => {
  expect(makeBasicBonus(71)).toEqual(55);
  expect(makeBasicBonus(77)).toEqual(55);
})
it('should return 75 for high bonus', () => {
  expect(makeBasicBonus(78)).toEqual(75);
})