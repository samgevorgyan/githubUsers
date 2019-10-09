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
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      }
    });

    return next.handle(authReq).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => {

        },
        // Operation failed; error is an HttpErrorResponse
        error => {

        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {



      })
    );
}
}
