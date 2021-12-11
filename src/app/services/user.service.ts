import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAPIs = {
    'auth': '/users/me',
    'login': '/users/login',
    'signup': '/users/signup',
    'moments': '/moments'
  }
  constructor(
    private apiService: ApiService
  ) { }

  async verifyToken() {
    try {
      return await this.apiService.get5dApi(this.userAPIs.auth);
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  }
}
