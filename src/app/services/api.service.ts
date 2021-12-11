import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = environment.baseUrl;
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  post5dApi = async (apiURL: any, body: any, headers = {}, options = {}) => {
    try {
      const res = await this.http.post(this.baseURL + apiURL, body, Object.assign(options, { headers }));
      const promiseRes = lastValueFrom(res);
      return promiseRes;
    } catch (err: any) {
      if (err.status === 401) this.logOut(false);
      throw new Error(err);
    }
  }

  put5dApi = async (apiURL: any, body: any, headers = {}, options = {}) => {
    try {
      const res = this.http.put(this.baseURL + apiURL, body, Object.assign(options, { headers }))
      const promiseRes = lastValueFrom(res);
      return promiseRes;
    } catch (err: any) {
      if (err.status === 401) this.logOut(false);
      throw new Error(err);
    }
  }

  get5dApi = async (apiURL: any, headers = {}, options = {}) => {
    try {
      const res = await this.http.get(this.baseURL + apiURL, Object.assign(options, { headers }));
      const promiseRes = lastValueFrom(res);
      return promiseRes;
    } catch (err: any) {
      if (err.status === 401) this.logOut(false);
      throw new Error(err);
    }
  }

  logOut(redirctToLogin: boolean) {
    localStorage.clear();
    if (redirctToLogin) this.router.navigateByUrl('/login');
  }
}
