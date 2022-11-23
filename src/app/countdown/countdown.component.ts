import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";
import {CountdownServiceInterface} from "../services/countdown.service.Interface";
import {WorkCountdownService} from "../services/work-countdown.service";
import {CountdownFactory} from "../services/switch-countdown.service";
import {SoundService} from "../services/sound.service";
import { Title } from '@angular/platform-browser';
import {HmsPipe} from "../pipes/hms.pipe";
import {WorkTimeStatService} from "../services/work-time-stat.service";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [CountdownFactory, SoundService, HmsPipe, WorkTimeStatService]
})
export class CountdownComponent implements OnInit {

  constructor(
    private countdownFactory: CountdownFactory,
    private titleService: Title,
    private hmsPipe: HmsPipe,
    public workTimeStats: WorkTimeStatService
  ) { }

  public countdownService: CountdownServiceInterface = new WorkCountdownService();
  public delimeter = 4;

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      this.countdownService.progress();

      if (this.countdownService.finished())
        this.switchCountdown()

      this.titleService.setTitle(`${this.countdownService.title} ${this.hmsPipe.transform(this.countdownService.seconds)}`)
    });
  }

  switchCountdown() {
    this.countdownService = this.countdownFactory.switch(this.countdownService, this.delimeter)
  }
}
