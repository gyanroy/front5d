import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const status = await this.setRoute(state);
    return status;
  }

  async setRoute(state: RouterStateSnapshot): Promise<boolean> {
    try {
      const user = await this.userService.verifyToken();
      console.log({user})
      if (!user) throw new Error('User not found');
      console.log('status-in', await this.setLoggedInRoute(state));
      return await this.setLoggedInRoute(state);
    } catch(err: any) {
      console.error(err);
      console.log('status-out', await this.setLoggedOutRoute(state));
      return await this.setLoggedOutRoute(state);
    }
  }

  async setLoggedInRoute(currentRoute: RouterStateSnapshot): Promise<boolean> {
    const isCurrentUrlLogin = (currentRoute.url === '/login');
    if (isCurrentUrlLogin) this.router.navigateByUrl('/home');
    return !isCurrentUrlLogin;
  }

  async setLoggedOutRoute(currentRoute: RouterStateSnapshot): Promise<boolean> {
    const isCurrentUrlLogin = (currentRoute.url === '/login');
    if (!isCurrentUrlLogin) this.router.navigateByUrl('/login');
    return isCurrentUrlLogin;
  }

  logOut(): void {
    localStorage.clear();
    // this.router.navigate(['login']);
  }
}
