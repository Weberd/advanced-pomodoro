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

  switch(countdown: CountdownServiceInterface, delimiter: number): CountdownServiceInterface {
    let newCountdown = new WorkCountdownService()

    if (countdown instanceof WorkCountdownService) {
      const start = new Date()
      const end = new Date()
      start.setTime(start.valueOf() - countdown.seconds * 1000)

      this.worktimeStats.unshift(new WorkTimeModel(start, end))
      newCountdown = new RestCountdownService()
      newCountdown.seconds = Math.floor(countdown.seconds / delimiter)
      newCountdown.unpause()
    } else {
      this.soundService.playGet2Work()
    }

    return newCountdown;
  }
}
