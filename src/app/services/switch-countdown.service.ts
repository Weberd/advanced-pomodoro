import {CountdownServiceInterface} from "./countdown.service.Interface";
import {WorkCountdownService} from "./work-countdown.service";
import {RestCountdownService} from "./rest-countdown.service";
import {SoundService} from "./sound.service";
import {Injectable} from "@angular/core";
import {WorkTimeStatService} from "./work-time-stat.service";
import {WorkTimeModel} from "../models/work-time.model";

@Injectable()
export class CountdownFactory {
  constructor(
    private soundService: SoundService,
    private worktimeStats: WorkTimeStatService
  ) {}

  public createWorkCountdown(playSound: boolean): CountdownServiceInterface {
    if (playSound)
      this.soundService.playGet2Work()

    return new WorkCountdownService()
  }

  switch(countdown: CountdownServiceInterface, delimiter: number, playSound: boolean): CountdownServiceInterface {
    if (countdown instanceof WorkCountdownService) {
      this.addWorktime(countdown)
      return this.createRestCountdown(countdown, delimiter)
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
    return newCountdown;
  }

  private addWorktime(countdown: WorkCountdownService) {
    const start = new Date()
    const end = new Date()
    start.setTime(start.valueOf() - countdown.seconds * 1000)

    this.worktimeStats.unshift(new WorkTimeModel(start, end))
  }
}
