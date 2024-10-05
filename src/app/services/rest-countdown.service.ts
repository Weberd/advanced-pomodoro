import {
  COUNTDOWN_PREFIX,
  CountdownServiceInterface, FINISH_KEY,
  PAUSED_KEY, START_KEY,
  TITLE_KEY
} from "./countdown.service.Interface";

export const REST_TITLE = 'Rest'

export class RestCountdownService implements CountdownServiceInterface {
  constructor() {
    this.title = REST_TITLE
  }

  progress() {
    if (!this.paused) {
      const currentTime = (new Date()).getTime()
      localStorage.setItem(COUNTDOWN_PREFIX + START_KEY, JSON.stringify(currentTime))
    }
  }

  finished() {
    return this.seconds <= 0
  }

  switchPause(): void {
    this.paused = !this.paused
  }

  get paused(): boolean {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + PAUSED_KEY) || 'false')
  }

  set paused(paused: boolean) {
    if (!paused) {
      // in case a lot of time passed after you unpause to recalculate start time and date time
      this.seconds = this.seconds
    }

    localStorage.setItem(COUNTDOWN_PREFIX + PAUSED_KEY, JSON.stringify(paused))
  }

  private getStartTimestamp() {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + START_KEY) || 'false') || (new Date()).getTime()
  }

  private getFinishTimestamp() {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + FINISH_KEY) || 'false') || (new Date()).getTime()
  }

  get seconds(): number {
    return Math.floor((this.getFinishTimestamp() - this.getStartTimestamp()) / 1000)
  }

  set seconds(seconds: number) {
    const currentTime = (new Date()).getTime()
    localStorage.setItem(COUNTDOWN_PREFIX + START_KEY, JSON.stringify(currentTime))
    localStorage.setItem(COUNTDOWN_PREFIX + FINISH_KEY, JSON.stringify(currentTime + seconds * 1000))
  }

  get title(): string {
    return localStorage.getItem(COUNTDOWN_PREFIX + TITLE_KEY) || REST_TITLE
  }

  set title(title: string) {
    localStorage.setItem(COUNTDOWN_PREFIX + TITLE_KEY, title)
  }
}
