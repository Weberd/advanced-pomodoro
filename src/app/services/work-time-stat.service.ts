import {Injectable} from "@angular/core";
import {WorkTime} from "../models/work.time";

const WORKTIMES_LOCAL_STORAGE_KEY = 'advanced-pomodoro-worktimes';

@Injectable()
export class WorkTimeStatService {
  private _worktimes: WorkTime[] = [];

  get totalSeconds(): number {
    return this.worktimes.reduce((seconds, worktime) => seconds + worktime.seconds, 0)
  }

  get worktimes() {
    const worktimes = JSON.parse(localStorage.getItem(WORKTIMES_LOCAL_STORAGE_KEY) || '[]') || []
    this._worktimes = worktimes.map((worktime: WorkTime) => {
      return new WorkTime(new Date(worktime.start), new Date(worktime.end))
    })
    return this._worktimes
  }

  private persist() {
    localStorage.setItem(WORKTIMES_LOCAL_STORAGE_KEY, JSON.stringify(this._worktimes))
  }

  unshift(value: WorkTime) {
    this._worktimes.unshift(value)
    this.persist()
  }

  remove(index: number) {
    this._worktimes.splice(index, 1)
    this.persist()
  }

  removeOlder(index: number) {
    this._worktimes.splice(index)
    this.persist()
  }
}
