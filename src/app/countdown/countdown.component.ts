import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subject, takeUntil, filter, Observable, of, interval} from "rxjs";
import {WorkCountdownService} from "../services/work-countdown.service";
import {SwitchCountdownService} from "../services/switch-countdown.service";
import { Title } from '@angular/platform-browser';
import {HoursMinutesPipe} from "../pipes/hoursMinutes.pipe";
import {WorkTimeStatService} from "../services/work-time-stat.service";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  protected countdownService = this.switchCountdownService.restoreCountdownService()
  private destroy$ = new Subject<void>();

  public editModal = {
    isOpen: false,
    selectedId: -1,
    isStartEdit: false,
    currentValue: ''
  };

  private onTick() {
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
  }

  constructor(
    protected switchCountdownService: SwitchCountdownService,
    private titleService: Title,
    private hmsPipe: HoursMinutesPipe,
    protected workTimeStats: WorkTimeStatService,
  ) { }

  ngOnInit(): void {
    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.onTick());

    this.initHotkeys()
  }

  private initHotkeys(): void {
    fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      takeUntil(this.destroy$),
      filter(event => !this.editModal.isOpen), // Don't trigger when modal open
    ).subscribe(event => {
      if (event.code === 'Space') {
        this.countdownService.togglePause();
      } else if (event.code === 'KeyF') {
        this.switchCountdown(false)
      }
    });
  }

  localeDateTime(date: Date, dateAlways: boolean = false) {
    const today = new Date();

    if (!dateAlways && date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return date.toLocaleTimeString()
    } else
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected switchCountdown(playSound: boolean) {
    this.countdownService = this.switchCountdownService.switch(
      this.countdownService,
      playSound
    )
  }

  backgroundColor(): Observable<string> {
    return of(this.countdownService.paused
      ? 'bg-blue-200'
      : this.countdownService instanceof WorkCountdownService
        ? 'bg-rose-200'
        : 'bg-green-200'
    )
  }

  get startButtonLabel(): string {
    return this.countdownService.paused ? 'Resume' : 'Pause';
  }

  get startButtonColor(): string {
    return this.countdownService.paused ? 'bg-blue-500' : 'bg-red-500';
  }

  protected workFinished(): boolean {
    return this.countdownService instanceof WorkCountdownService && this.countdownService.paused
  }

  openEditModal(id: number, text: string, field: 'start' | 'end') {
    this.editModal = {
      isOpen: true,
      selectedId: id,
      isStartEdit: field === 'start',
      currentValue: text
    }
  }

  saveChanges(value: string) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      alert('Invalid date format!');
      return;
    }

    if (this.editModal.selectedId >= 0) {
      if (this.editModal.isStartEdit) {
        this.workTimeStats.worktimes[this.editModal.selectedId].start = new Date(value);
      } else {
        this.workTimeStats.worktimes[this.editModal.selectedId].end = new Date(value);
      }

      this.workTimeStats.persist();
    }
    this.closeModal();
  }

  closeModal() {
    this.editModal.isOpen = false;
  }
}
