export class WorkTime {
  constructor(public start: Date, public end: Date) {}

  get seconds(): number {
    return (this.end.getTime() - this.start.getTime()) / 1000;
  }
}
