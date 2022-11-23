export class WorkTimeModel {
  constructor(public start: Date, public end: Date) {
  }

  get seconds(): number {
    // @ts-ignore
    return (this.end - this.start) / 1000;
  }
}
