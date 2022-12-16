export const COUNTDOWN_LOCAL_STORAGE_KEY = 'advanced-pomodoro-countdown'

export interface CountdownServiceInterface {
  title: string;
  seconds: number;
  paused: boolean;
  progress(): void;
  finished(): boolean;
  pause(): void;
  unpause(): void;
  switchPause(): void;
  persist(): void;
  restore(): void;
}
