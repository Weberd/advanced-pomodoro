import {CountdownServiceInterface} from "./countdown.service.Interface";

export class WorkCountdownService implements CountdownServiceInterface {
  title = 'Work';
  seconds = 0;
  paused = true;

  progress() {
    if (!this.paused) this.seconds++;
  }

  finished() {
    return false;
  }

  pause() {
    this.paused = true
  }

  switchPause(): void {
    this.paused = !this.paused
  }

  unpause(): void {
    this.paused = false
  }
}
