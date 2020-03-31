import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        request = request.clone({
            setHeaders: currentUser ? {
                Authorization: `Bearer ${currentUser.token}`,
            } : {}
        });
        return next.handle(request);
    }

}
