import { Component, OnInit } from '@angular/core';
import {fromEvent, Subject, takeUntil, timer} from "rxjs";
import {WorkCountdownService} from "../services/work-countdown.service";
import {SwitchCountdownService} from "../services/switch-countdown.service";
import {SoundService} from "../services/sound.service";
import { Title } from '@angular/platform-browser';
import {HmsPipe} from "../pipes/hms.pipe";
import {WorkTimeStatService} from "../services/work-time-stat.service";
import {CountdownServiceFactory} from "../services/countdown-service.factory";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [SwitchCountdownService, SoundService, HmsPipe, WorkTimeStatService, CountdownServiceFactory]
})
export class CountdownComponent implements OnInit {

  constructor(
    public switchCountdownService: SwitchCountdownService,
    private titleService: Title,
    private hmsPipe: HmsPipe,
    public workTimeStats: WorkTimeStatService
  ) { }

  public countdownService = this.switchCountdownService.restoreCountdownService()
  private _unsubscribeAll: Subject<any> = new Subject();

  ngOnInit(): void {
    timer(0, 1000)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => {
      this.countdownService.progress();

      if (this.countdownService.finished())
        this.switchCountdown(true)

      this.titleService.setTitle(`${this.countdownService.title} ${this.hmsPipe.transform(this.countdownService.seconds)}`)
    });

    fromEvent<KeyboardEvent>(document, 'keyup')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
        let key = event.code;

        if (key === 'Space') {
          this.countdownService.switchPause()
        }

        if (key === 'KeyF') {
          this.switchCountdown(false)
        }
      })
  }

  localeDateTime(date: Date) {
    return date.toLocaleTimeString()
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  switchCountdown(playSound: boolean) {
    this.countdownService = this.switchCountdownService.switch(
      this.countdownService,
      playSound
    )
  }

  getBackgroundColor(): string {
    if (this.countdownService instanceof WorkCountdownService) {
      return 'bg-rose-200';
    } else {
      return 'bg-green-200';
    }
  }
}
