import {WORK_TITLE, WorkCountdownService} from "./work-countdown.service";
import {RestCountdownService} from "./rest-countdown.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CountdownServiceFactory {
  create(title: string) {
    return title === WORK_TITLE ? new WorkCountdownService() : new RestCountdownService()
  }
}
