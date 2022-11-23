import {CountdownServiceInterface} from "./countdown.service.Interface";
import {WorkCountdownService} from "./work-countdown.service";
import {RestCountdownService} from "./rest-countdown.service";
import {SoundService} from "./sound.service";
import {Injectable} from "@angular/core";
import {WorkTimeStatService} from "./work-time-stat.service";

@Injectable()
export class CountdownFactory {
  constructor(
    private soundService: SoundService,
    private worktimeStats: WorkTimeStatService
  ) {}

  switch(countdown: CountdownServiceInterface, delimiter: number): CountdownServiceInterface {
    let newCountdown = new WorkCountdownService()

    if (countdown instanceof WorkCountdownService) {
      newCountdown = new RestCountdownService()
      newCountdown.seconds = Math.floor(countdown.seconds / delimiter)
      this.worktimeStats.totalSeconds += countdown.seconds
      newCountdown.unpause()
    } else {
      this.soundService.playGet2Work()
    }

    return newCountdown;
  }
}
