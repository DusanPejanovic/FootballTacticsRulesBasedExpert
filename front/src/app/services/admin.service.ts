import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "../../environment";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient, private router: Router) { }


    createAdmin(formData: FormData): Observable<any> {
        return this.http.post(`${environment.apiHost}admin/create-admin`, formData, { responseType: 'text' });
    }




}
