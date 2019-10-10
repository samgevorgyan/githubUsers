import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectForResult = new Subject<any>();
  private subjectForTheme = new Subject<any>();
  constructor() { }

  sendMessage(subjectName, message: object) {
    this[subjectName].next(message);
  }

  clearMessage(subjectName) {
    this[subjectName].next();
  }

  getMessage(subjectName): Observable<any> {
    return this[subjectName].asObservable();
  }
}
