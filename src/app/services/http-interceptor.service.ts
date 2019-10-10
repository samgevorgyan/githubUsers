import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    return next.handle(authReq).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => {
          console.log('eventeventevent', event);
        },
        // Operation failed; error is an HttpErrorResponse
        error => {
          console.log('errorerrorerrorerrorerror', error);
          if (error.status === 403) {
            alert(error.error.message);
          }
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {


      })
    );
  }
}
