import {COUNTDOWN_LOCAL_STORAGE_KEY, CountdownServiceInterface} from "./countdown.service.Interface";

export class WorkCountdownService implements CountdownServiceInterface {
  title = 'Work';
  seconds = 0;
  paused = true;

  progress() {
    if (!this.paused) {
      this.seconds++
      this.persist()
    }
  }

  finished() {
    return false;
  }

  pause() {
    this.paused = true
    this.persist()
  }

  switchPause(): void {
    this.paused = !this.paused
    this.persist()
  }

  unpause(): void {
    this.paused = false
    this.persist()
  }

  persist() {
    localStorage.setItem(COUNTDOWN_LOCAL_STORAGE_KEY, JSON.stringify(this))
  }

  restore() {
    const props = JSON.parse(localStorage.getItem(COUNTDOWN_LOCAL_STORAGE_KEY) || '{}')
    this.seconds = Number(props.seconds || 0)
    this.paused = props.paused ?? true
  }
}
