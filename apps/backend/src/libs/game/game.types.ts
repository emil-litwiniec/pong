export type Player = {
  id: string;
  name: string;
};

export type SetPositionPayload = {
  id: string;
  x: number;
};

export type Board = {
  height: number;
  width: number;
  obstacles: unknown[];
};

export type GameConfig = {
  roomId: string;
  board?: Board;
};
