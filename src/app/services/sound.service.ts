import {Injectable} from "@angular/core";

@Injectable()
export class SoundService {
  playAudio(filepath: string) {
    let audio = new Audio();
    audio.src = filepath;
    audio.load();
    audio.play();
  }

  playGet2Work() {
    this.playAudio('../../assets/get_to_work.m4a')
  }
}
