export const COUNTDOWN_PREFIX = 'advanced_pomodoro_countdown_'
export const TITLE_KEY = 'title'
export const SECONDS_KEY = 'seconds'
export const PAUSED_KEY = 'paused'

export interface CountdownServiceInterface {
  progress(): void
  finished(): boolean
  switchPause(): void
  get title(): string
  set title(title: string)
  get seconds(): number
  set seconds(seconds: number)
  get paused(): boolean
  set paused(paused: boolean)
}
