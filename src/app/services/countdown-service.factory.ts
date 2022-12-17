import {WORK_TITLE, WorkCountdownService} from "./work-countdown.service";
import {RestCountdownService} from "./rest-countdown.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CountdownServiceFactory {
  create(title: string) {
    if (title === WORK_TITLE)
      return new WorkCountdownService()
    else
      return new RestCountdownService()
  }
}
