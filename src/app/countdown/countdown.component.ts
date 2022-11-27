import { Component, OnInit } from '@angular/core';
import {fromEvent, Subject, takeUntil, timer} from "rxjs";
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
  public delimiter = 4;
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
    this.countdownService = this.countdownFactory.switch(
      this.countdownService,
      this.delimiter,
      playSound
    )
  }
}
