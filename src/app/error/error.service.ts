import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorListener = new Subject<string>();

  // tslint:disable-next-line:typedef
  getErrorListener() {
    return this.errorListener.asObservable();
  }

  throwError(message: string): void {
    this.errorListener.next(message);
  }

  handleError(): void {
    this.errorListener.next(null);
  }
}
