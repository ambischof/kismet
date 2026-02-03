// Contains shared types for game reducer and gameUtils

export type Hand = [number,number,number,number,number]; 

export type ScoreSlot = {
  score: number
}
export type Game = {
  id: number;
  isDone: boolean;
  isStarted: boolean;
  slots: ScoreSlot[];
}

export {Hand, Game, ScoreSlot}