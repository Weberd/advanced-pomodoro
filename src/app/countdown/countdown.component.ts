import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject, takeUntil} from "rxjs";
import {WorkCountdownService} from "../services/work-countdown.service";
import {SwitchCountdownService} from "../services/switch-countdown.service";
import {SoundService} from "../services/sound.service";
import { Title } from '@angular/platform-browser';
import {HmsPipe} from "../pipes/hms.pipe";
import {WorkTimeStatService} from "../services/work-time-stat.service";
import {CountdownServiceFactory} from "../services/countdown-service.factory";
import { WorkerFactory } from '../services/worker.factory';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [
    SwitchCountdownService,
    SoundService,
    HmsPipe,
    WorkTimeStatService,
    CountdownServiceFactory,
    WorkerFactory
  ]
})
export class CountdownComponent implements OnInit, OnDestroy {

  constructor(
    protected switchCountdownService: SwitchCountdownService,
    private titleService: Title,
    private hmsPipe: HmsPipe,
    private workerFactory: WorkerFactory,
    protected workTimeStats: WorkTimeStatService,
  ) { }

  protected countdownService = this.switchCountdownService.restoreCountdownService()
  private _unsubscribeAll: Subject<any> = new Subject();
  private timerWorker = this.workerFactory.create(() => {
    if (this.countdownService) {
      this.countdownService.progress();

      if (this.countdownService.finished()) {
        this.switchCountdown(true)
      }        
    }

    if (this.titleService) {
      this.titleService.setTitle(
        `${this.countdownService.title} ${this.hmsPipe.transform(this.countdownService.seconds)}`
      )  
    }
  })

  ngOnInit(): void {
    this.initHotkeys();
  }

  private initHotkeys() {
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
    this.timerWorker.postMessage('stop')
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  protected switchCountdown(playSound: boolean) {
    this.countdownService = this.switchCountdownService.switch(
      this.countdownService,
      playSound
    )
  }

  protected getBackgroundColor(): string {
    return this.countdownService instanceof WorkCountdownService ? 'bg-rose-200' : 'bg-green-200'
  }
}
