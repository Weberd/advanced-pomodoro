import { Injectable } from "@angular/core";

@Injectable()
export class WorkerFactory {
    public create(callback: () => void): Worker {
        if (typeof Worker !== 'undefined') {
          const worker = new Worker(new URL('../worker/timer.worker', import.meta.url))
          worker.onmessage = callback    
          worker.postMessage('start')
          return worker
        } else {
          throw new Error('Workers are not supported')
        }
      }
}