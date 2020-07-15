import { Injectable } from '@angular/core'

const TOKEN_KEY = 'token'
const USERNAME_KEY = 'username'
const AUTHORITIES_KEY = 'authorities'

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	private roles: Array<string> = []

	constructor() {}

	signOut() {
		window.sessionStorage.clear()
	}

	public getToken(): string {
		return sessionStorage.getItem(TOKEN_KEY)
	}

	public saveToken(token: string) {
		window.sessionStorage.removeItem(TOKEN_KEY)
		window.sessionStorage.setItem(TOKEN_KEY, token)
	}

	public getUsername(): string {
		return sessionStorage.getItem(USERNAME_KEY)
	}

	public saveUsername(username: string) {
		window.sessionStorage.removeItem(USERNAME_KEY)
		window.sessionStorage.setItem(USERNAME_KEY, username)
	}

	public getAuthorities(): string[] {
		this.roles = []

		if (sessionStorage.getItem(TOKEN_KEY)) {
			JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
				this.roles.push(authority.authority)
			})
		}

		return this.roles
	}

	public saveAuthorities(authorities: string[]) {
		window.sessionStorage.removeItem(AUTHORITIES_KEY)
		window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
	}
}
