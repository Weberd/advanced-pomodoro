import {CountdownServiceInterface} from "./countdown.service.Interface";

export class RestCountdownService implements CountdownServiceInterface {
  title = 'Rest';
  seconds = 5 * 60;
  paused: boolean = true;

  progress() {
    if (this.seconds > 0 && !this.paused) this.seconds--;
  }

  finished() {
    return this.seconds === 0;
  }

  pause(): void {
    this.paused = true
  }

  switchPause(): void {
    this.paused = !this.paused
  }

  unpause(): void {
    this.paused = false
  }
}
