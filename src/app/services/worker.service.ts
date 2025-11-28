import { Injectable } from "@angular/core";

@Injectable()
export class WorkerService {
    private worker: Worker | null = null

    create(callback: () => void): void {
        if (typeof Worker !== 'undefined') {
          this.worker = new Worker(new URL('./worker/timer.worker', import.meta.url))
          this.worker.onmessage = callback
        } else {
          throw new Error('Workers are not supported')
        }
    }

    start(): void { this.worker?.postMessage('start')}
    stop(): void { this.worker?.postMessage('stop')}

    destroy(): void {
        this.stop()
        this.worker?.terminate()
    }
}
