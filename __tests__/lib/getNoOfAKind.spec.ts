import getNOfAKind from "../../src/lib/getNOfAKind";

describe('getNOfAKind', ()=>{
  it('should return null if there are no matches', ()=>{
    expect(getNOfAKind(2, [1,2,3,4,5])).toBe(null);
    expect(getNOfAKind(3, [1,2,3,4,5])).toBe(null);
    expect(getNOfAKind(4, [1,2,3,4,5])).toBe(null);
    expect(getNOfAKind(5, [1,2,3,4,5])).toBe(null);
  });

  it('should return the first number matched if there is a match', ()=>{
    expect(getNOfAKind(2, [1,1,2,2,3])).toBe(1);
  });
  
  it('should check for the correct number of items', ()=>{
    expect(getNOfAKind(3, [1,1,2,2,2])).toBe(2);
    expect(getNOfAKind(4, [1,1,2,2,2])).toBe(null);
  });
});