import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  private urlSource = new BehaviorSubject('');
  currentUrl = this.urlSource.asObservable();

  private clientSource = new BehaviorSubject(false);
  currentClient = this.clientSource.asObservable();

  constructor() { }

  changeUrl(url: string) {
    this.urlSource.next(url)
  }

  checkClient(isClient: boolean){
    this.clientSource.next(isClient)
  }

}