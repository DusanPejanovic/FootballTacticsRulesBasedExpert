import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('skip')) {
            const cloned = req.clone({ headers: req.headers.delete('skip') })
            return next.handle(cloned);
        }
        const accessToken: any = this.userService.getAccessToken();

        if (accessToken) {
            const helper = new JwtHelperService();
            const tokenType = helper.decodeToken(accessToken).type;
            const cloned = req.clone({
                headers: req.headers.set('authorization', tokenType + " " + accessToken),
            });

            return next.handle(cloned).pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse &&
                        !cloned.url.includes('user/login') &&
                        error.status == 401) {
                        this.handle401Error();
                    }
                    return throwError(() => error);
                })
            );
        } else {
            return next.handle(req);
        }
    }

    private isRefreshing = false;
    private handle401Error() {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            if (this.userService.user.getValue() != undefined) {
                this.userService.refreshToken().subscribe({
                    next: (result) => {
                        this.isRefreshing = false;
                        this.userService.setToken(result);
                        window.location.reload();
                    },
                    error: (error) => {
                        this.isRefreshing = false;
                        if (error instanceof HttpErrorResponse) {
                            if (error.status == 403 || error.status == 404) {
                                this.userService.clearToken();
                                this.userService.user.next(undefined);
                                this.router.navigate(['/']);
                            }
                        }
                    }
                });
            }
        }
    }
}
