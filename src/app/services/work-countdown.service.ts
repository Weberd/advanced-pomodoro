import {
  COUNTDOWN_PREFIX,
  CountdownServiceInterface,
  PAUSED_KEY,
  SECONDS_KEY,
  TITLE_KEY
} from "./countdown.service.Interface";

export const WORK_TITLE = 'Work'

export class WorkCountdownService implements CountdownServiceInterface {
  constructor() {
    this.title = WORK_TITLE
  }

  progress() {
    if (!this.paused) {
      this.seconds++
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
    localStorage.setItem(COUNTDOWN_PREFIX + PAUSED_KEY, JSON.stringify(paused))
  }

  get seconds(): number {
    return JSON.parse(localStorage.getItem(COUNTDOWN_PREFIX + SECONDS_KEY) || '0')
  }

  set seconds(seconds: number) {
    localStorage.setItem(COUNTDOWN_PREFIX + SECONDS_KEY, JSON.stringify(seconds))
  }

  get title(): string {
    return localStorage.getItem(COUNTDOWN_PREFIX + TITLE_KEY) || WORK_TITLE
  }

  set title(title: string) {
    localStorage.setItem(COUNTDOWN_PREFIX + TITLE_KEY, title)
  }
}
