import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAPIs = {
    'refresh-login': '/users/refresh',
    'login': '/users/login',
    'signup': '/users',
    'moments': '/moments'
  }
  public user!: UserReturnDoc;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async refreshToken() {
    try {
      if (!localStorage.getItem('token')) throw new Error('user not logged in');
      const res: UserSuccessRes =  await this.apiService.get5dApi(this.userAPIs['refresh-login']) as UserSuccessRes;
      
      if (!res.token) throw new Error('Error in refresh token');
      localStorage.setItem('token', res.token);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const res: UserSuccessRes = await this.apiService.post5dApi(this.userAPIs.login, {email, password}) as UserSuccessRes;
      if(!res.user || !res.token) throw new Error('Login error');
      this.user = res.user;
      localStorage.setItem('token', res.token);
      this.router.navigate(['/home']);
      return res;
    } catch(err: any) {
      throw new Error(err);
    }
  }

  async signupUser(userDoc: UserDoc) {
    try {
      const res: UserSuccessRes = await this.apiService.post5dApi(this.userAPIs.signup, userDoc) as UserSuccessRes;
      if(!res.user) throw new Error('Login error');
      this.user = res.user;
      return await this.loginUser(userDoc.email, userDoc.password);
    } catch(err: any) {
      throw new Error(err);
    }
  }
}

  // types
  type UserSuccessRes = {
    msg: string,
    user?: UserReturnDoc,
    token?: string
  }
  
  type UserReturnDoc = {
    email: string,
    firstName: string,
    lastName: string,
    mobile: string,
    city: string,
    userId: string,
    verified: boolean
  }

  type UserDoc = {
    email: string,
    firstName: string,
    lastName: string,
    mobile: string,
    city: string,
    password: string
  }
  // types