import {
  COUNTDOWN_PREFIX,
  CountdownServiceInterface, FINISH_KEY,
  PAUSED_KEY,
  START_KEY,
  TITLE_KEY
} from "./countdown.service.Interface";

export const WORK_TITLE = 'Work'

export class WorkCountdownService implements CountdownServiceInterface {
  constructor() {
    this.title = WORK_TITLE
  }

  progress() {
    if (!this.paused) {
      const currentTime = (new Date()).getTime();
      localStorage.setItem(COUNTDOWN_PREFIX + FINISH_KEY, JSON.stringify(currentTime))
    }
  }

  finished() {
    return false
  }

  switchPause(): void {
    this.paused = !this.paused
  }

  get paused(): boolean {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + PAUSED_KEY) || 'true')
  }

  set paused(paused: boolean) {
    if (!paused) {
      // in case a lot of time passed after you unpause to recalculate start time and date time
      this.seconds = this.seconds
    }

    localStorage.setItem(COUNTDOWN_PREFIX + PAUSED_KEY, JSON.stringify(paused))
  }

  get seconds(): number {
    return Math.floor((this.getFinishTimestamp() - this.getStartTimestamp()) / 1000)
  }

  private getStartTimestamp() {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + START_KEY) || 'false') || (new Date()).getTime()
  }

  private getFinishTimestamp() {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + FINISH_KEY) || 'false') || (new Date()).getTime()
  }

  set seconds(seconds: number) {
    const currentTime = (new Date()).getTime()
    localStorage.setItem(COUNTDOWN_PREFIX + START_KEY, JSON.stringify(currentTime - seconds * 1000))
    localStorage.setItem(COUNTDOWN_PREFIX + FINISH_KEY, JSON.stringify(currentTime))
  }

  get title(): string {
    return localStorage.getItem(COUNTDOWN_PREFIX + TITLE_KEY) || WORK_TITLE
  }

  set title(title: string) {
    localStorage.setItem(COUNTDOWN_PREFIX + TITLE_KEY, title)
  }
}
