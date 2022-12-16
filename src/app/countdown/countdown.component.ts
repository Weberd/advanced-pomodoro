import { Component, OnInit } from '@angular/core';
import {fromEvent, Subject, takeUntil, timer} from "rxjs";
import {CountdownServiceInterface} from "../services/countdown.service.Interface";
import {WorkCountdownService} from "../services/work-countdown.service";
import {CountdownFactory} from "../services/switch-countdown.factory";
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
    public countdownFactory: CountdownFactory,
    private titleService: Title,
    private hmsPipe: HmsPipe,
    public workTimeStats: WorkTimeStatService
  ) { }

  public countdownService: CountdownServiceInterface = new WorkCountdownService();
  private _unsubscribeAll: Subject<any> = new Subject();

  ngOnInit(): void {
    this.countdownService.restore()
    this.countdownFactory.restore()

    timer(0, 1000)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => {
      this.countdownService.progress();

      if (this.countdownService.finished())
        this.switchCountdownFactory(true)

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
          this.switchCountdownFactory(false)
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

  switchCountdownFactory(playSound: boolean) {
    this.countdownService = this.countdownFactory.switch(
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
