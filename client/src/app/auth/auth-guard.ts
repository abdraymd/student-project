import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { TokenService } from './token.service'

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private token: TokenService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (!this.token.getToken()) {
			this.router.navigate(['signin'])
			return false
		}

		return true
	}
}
