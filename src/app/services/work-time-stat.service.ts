import {Injectable} from "@angular/core";
import {WorkTimeModel} from "../models/work-time.model";

const LOCAL_STORAGE_KEY = 'advanced-pomodoro-worktimes';

@Injectable()
export class WorkTimeStatService {
  private _worktimes: WorkTimeModel[] = [];

  get totalSeconds(): number {
    return this.worktimes.reduce((seconds, worktime) => seconds + worktime.seconds, 0)
  }

  get worktimes() {
    this._worktimes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]')
    this._worktimes = this._worktimes.map(worktime => {
      return new WorkTimeModel(new Date(worktime.start), new Date(worktime.end))
    })
    return this._worktimes
  }

  private save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._worktimes))
  }

  unshift(value: WorkTimeModel) {
    this._worktimes.unshift(value)
    this.save()
  }

  remove(index: number) {
    this._worktimes.splice(index, 1)
    this.save()
  }

  removeOlder(index: number) {
    this._worktimes.splice(index)
    this.save()
  }
}
