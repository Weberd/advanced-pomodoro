import {COUNTDOWN_PREFIX, CountdownServiceInterface, TITLE_KEY} from "./countdown.service.Interface";
import {WORK_TITLE, WorkCountdownService} from "./work-countdown.service";
import {RestCountdownService} from "./rest-countdown.service";
import {SoundService} from "./sound.service";
import {Injectable} from "@angular/core";
import {WorkTimeStatService} from "./work-time-stat.service";
import {WorkTime} from "../models/work.time";
import {CountdownServiceFactory} from "./countdown-service.factory";

const SWITCH_COUNTDOWN_PREFX = 'advanced_pomodoro_switch_countdown_';
const DELIMITER_KEY = 'delimiter';

@Injectable()
export class SwitchCountdownService {
  constructor(
    private soundService: SoundService,
    private worktimeStats: WorkTimeStatService,
    private countdownFactory: CountdownServiceFactory
  ) {}

  restoreCountdownService(): CountdownServiceInterface {
    const title = localStorage.getItem(COUNTDOWN_PREFIX + TITLE_KEY) || WORK_TITLE
    return this.countdownFactory.create(title)
  }

  switch(countdown: CountdownServiceInterface, playSound: boolean): CountdownServiceInterface {
    if (countdown instanceof WorkCountdownService) {
      this.addWorktime(countdown)
      return this.createRestCountdown(countdown, this.delimiter)
    } else {
      if (playSound)
        this.soundService.playGet2Work()

      const newCountdown = new WorkCountdownService()
      newCountdown.seconds = 0
      newCountdown.paused = true
      return newCountdown
    }
  }

  public createRestCountdown(countdown: WorkCountdownService, delimiter: number) {
    const newCountdown = new RestCountdownService()
    newCountdown.seconds = Math.floor(countdown.seconds / delimiter)
    newCountdown.paused = false
    return newCountdown
  }

  private addWorktime(countdown: WorkCountdownService) {
    const start = new Date()
    const end = new Date()
    start.setTime(start.valueOf() - countdown.seconds * 1000)

    this.worktimeStats.unshift(new WorkTime(start, end))
  }

  get delimiter(): number {
    return <number><unknown>localStorage.getItem(SWITCH_COUNTDOWN_PREFX + DELIMITER_KEY) || 5
  }

  set delimiter(value: number) {
    localStorage.setItem(SWITCH_COUNTDOWN_PREFX + DELIMITER_KEY, String(value))
  }
}
