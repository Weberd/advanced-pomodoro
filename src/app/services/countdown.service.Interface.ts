export interface CountdownServiceInterface {
  title: string;
  seconds: number;
  paused: boolean;
  progress(): void;
  finished(): boolean;
  pause(): void;
  unpause(): void;
  switchPause(): void;
}
