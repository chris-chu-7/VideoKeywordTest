export enum Direction {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  UP_RIGHT = 'UP_RIGHT',
  DOWN_RIGHT = 'DOWN_RIGHT',
  DOWN_LEFT = 'DOWN_LEFT',
  UP_LEFT = 'UP_LEFT',
  IDLE = 'IDLE',
}

export enum DotType {
  DISTRACTOR = 'DISTRACTOR',
  WOLF = 'WOLF',
  SHEEP = 'SHEEP',
}

export type Dot = {
  id: number;
  x: number;
  y: number;
  dir: Direction;
  type: DotType;
};

export type Frame = {
  frame_num: number;
  dots: {
    [id: number]: Dot;
  };
};

export type Config = {
  trial_height: number;
  trial_width: number;
  wolf_color: string;
  sheep_color: string;
  distractor_color: string;
  wolf_size: number;
  sheep_size: number;
  distractor_size: number;
  viewing_distance_in_cm: number;
};
