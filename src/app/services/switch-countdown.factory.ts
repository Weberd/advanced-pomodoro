import {CountdownServiceInterface} from "./countdown.service.Interface";
import {WorkCountdownService} from "./work-countdown.service";
import {RestCountdownService} from "./rest-countdown.service";
import {SoundService} from "./sound.service";
import {Injectable} from "@angular/core";
import {WorkTimeStatService} from "./work-time-stat.service";
import {WorkTimeModel} from "../models/work-time.model";

const COUNTDOWN_FACTORY_LOCAL_STORAGE_KEY = 'advanced-pomodoro-countdown-factory'

@Injectable()
export class CountdownFactory {
  private _delimiter = 4

  constructor(
    private soundService: SoundService,
    private worktimeStats: WorkTimeStatService
  ) {}

  persist() {
    localStorage.setItem(COUNTDOWN_FACTORY_LOCAL_STORAGE_KEY, JSON.stringify(this))
  }

  restore() {
    const props = JSON.parse(localStorage.getItem(COUNTDOWN_FACTORY_LOCAL_STORAGE_KEY) || '{}')
    this.delimiter = Number(props._delimiter || 4)
  }

  switch(countdown: CountdownServiceInterface, playSound: boolean): CountdownServiceInterface {
    if (countdown instanceof WorkCountdownService) {
      this.addWorktime(countdown)
      return this.createRestCountdown(countdown, this._delimiter)
    } else {
      if (playSound)
        this.soundService.playGet2Work()

      return  new WorkCountdownService()
    }
  }

  public createRestCountdown(countdown: WorkCountdownService, delimiter: number) {
    const newCountdown = new RestCountdownService()
    newCountdown.seconds = Math.floor(countdown.seconds / delimiter)
    newCountdown.unpause()
    return newCountdown
  }

  private addWorktime(countdown: WorkCountdownService) {
    const start = new Date()
    const end = new Date()
    start.setTime(start.valueOf() - countdown.seconds * 1000)

    this.worktimeStats.unshift(new WorkTimeModel(start, end))
  }

  get delimiter(): number {
    return this._delimiter;
  }

  set delimiter(value: number) {
    this._delimiter = value;
    this.persist()
  }
}
