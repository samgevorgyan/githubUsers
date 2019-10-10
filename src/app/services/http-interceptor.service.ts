import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private errorExist = false;

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


        },
        // Operation failed; error is an HttpErrorResponse
        error => {

          if (!this.errorExist) {
            if (error.status === 403) {
              this.errorExist = true;
              alert('API rate limit exceeded, please try later');
            }
          }
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {


      })
    );
  }
}
