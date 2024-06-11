import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {
    AccessTokenResponse,
    LoginCredentials,
    Principal,
    UserType
} from "../model/User";
import { environment } from "../../environment";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, private router: Router) {
        this.loadUser();
        this.user.subscribe(val => console.log(val));
    }
    user: BehaviorSubject<Principal | undefined> = new BehaviorSubject<Principal | undefined>(undefined);

    setToken(data: AccessTokenResponse) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    }
    clearToken() {
        localStorage.clear();
        sessionStorage.clear();
    }
    getAccessToken(): string | null {
        return localStorage.getItem('token');
    }
    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }
    loadUser() {
        const helper = new JwtHelperService();
        const token: string | null = this.getAccessToken();
        if (token == null) {
            this.user.next(undefined);
            return;
        }
        const decodedToken = helper.decodeToken(token);
        const id: string = decodedToken.id;
        const email: string = decodedToken.email;
        const role: UserType = decodedToken.role as UserType;
        const principal: Principal = {
            id: id,
            email: email,
            role: role
        }
        this.user.next(principal);
    }
    private test: string | null = null;
    loginUser(credentials: LoginCredentials): Observable<AccessTokenResponse> {
        return this.http.post<AccessTokenResponse>(`${environment.apiHost}user/login`, credentials);
    }

    refreshToken(): Observable<AccessTokenResponse> {
        const refreshToken = this.getRefreshToken();
        return this.http.post<AccessTokenResponse>(environment.apiHost + 'user/refresh/token', { "refreshToken": refreshToken });
    }

    logOut() {
        this.clearToken();
        this.user.next(undefined);
        this.router.navigate([""])
    }


    registerUser(formData: FormData): Observable<any> {
        return this.http.post(`${environment.apiHost}standard-user/signup`, formData, { responseType: 'text' });
    }


    verifyEmail(token: string): Observable<string> {
        const params = new HttpParams().set('token', token);
        return this.http.put(`${environment.apiHost}standard-user/verify-email`, null, { params, responseType: 'text' });
    }



}
