import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConsentService } from './consent/consent.service';

const baseUrl: string = environment.appetiteUrl;
const bufferSize = 100;
const lastSentChoiceIndexKey = 'lastSentChoiceIndex';
const latestChoiceIndexKey = 'latestChoiceIndex';
// we should try to keep this batch size greater than our search tree depth
// so as to avoid splitting crystal bowl sessions
const preferredBatchSize = 20;

@Injectable({
  providedIn: 'root'
})
export class AppetiteService {

  private timer: number = Date.now();
  private storage;
  private latestIndex = 0;
  private lastSentIndex = 0;
  private chosen: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private consent: ConsentService) {
    // only use persistent local storage if we already know the user is ok with
    // us sending anonymous appetite data -- the only reason to persist this data
    // beyond a single session would be because we'd want to send the next time
    // we have a chance -- like when the user is online again, or in case they
    // close the tab or browser before they've idled long enough for us to know
    // they're done
    this.storage = consent.isKnownToBeTrue() ? localStorage : sessionStorage;
    let savedIndex = this.storage.getItem(latestChoiceIndexKey);
    if (savedIndex) {
      this.latestIndex = parseInt(savedIndex, 10);
    }
    savedIndex = this.storage.getItem(lastSentChoiceIndexKey);
    if (savedIndex) {
      this.lastSentIndex = parseInt(savedIndex, 10);
    }

    this.chosen.subscribe({ next: chosen => {
      // console.log(`new choice: ${JSON.stringify(chosen)}`);
      this.saveChosen(chosen);
    }});
  }
  incrementIndex(): number {
    const newIndex = (this.latestIndex + 1) % bufferSize;
    this.storage.setItem(latestChoiceIndexKey, `${newIndex}`);
    this.latestIndex = newIndex;
    return newIndex;
  }
  saveChosen(chosen: any): void {
    const newIndex = this.incrementIndex();
    this.storage.setItem(`chosen[${newIndex}]`, JSON.stringify(chosen));
  }

  postChosen(chosen: any): void {
    // this.storage.setItem('appetiteIndex', 5).subscribe(() => {});
    const choice = {...chosen, time: Date.now() - this.timer, hour: new Date().getHours()};
    this.chosen.next(choice);
    this.resetTimer();
    if (this.getPendingBatchSize() % preferredBatchSize === 0) {
      this.postAppetite();
    }
  }

  getPendingBatchSize(): number {
    // add 100 to account for times when circular buffer has cycled around
    // for instance the buffer size is 100, the last item sent was 95 and we're
    // our latest index has cycled around to 5. Mod operator doesn't always
    // handle negative numbers the way we might like
    return (bufferSize + this.latestIndex - this.lastSentIndex) % bufferSize;
  }

  resetTimer(): void {
    this.timer = Date.now();
  }

  flush(): void {
    // not sure this is necessary anymore
    this.postAppetite();
  }

  postAppetite(): void {
    if (this.latestIndex === this.lastSentIndex) { return; }
    this.consent.getConsent().then(consent => {
      if (consent) {
        const appetite: any[] = [];
        const start = this.lastSentIndex + 1;
        let end = this.latestIndex;
        if (end < start) { end += bufferSize; }
        for (let i = start; i <= end; i++) {
          const chosen = this.storage.getItem(`chosen[${i % bufferSize}]`);
          appetite.push(JSON.parse(chosen));
          // TODO: check for logical breaks in the pending choices
          // rather than always sending everything that's pending as one
          // huge batch, break it up into logical appetite sessions based
          // on time between choices. Also, if we have a lot pending because
          // of network connections or receiving end failures, continue
          // to break the large pending batch into preferred batch sizes
          // and only try to send once if the transmission fails
        }
        this.http.post(baseUrl, appetite).toPromise().then(x => {
          console.log(x);
          // console.log("updating the pointer");
          this.storage.setItem(lastSentChoiceIndexKey, `${this.latestIndex}`);
          this.lastSentIndex = this.latestIndex;
        }).catch(e => {});
      }
    }).catch(e => { console.log(e); });
  }
}
