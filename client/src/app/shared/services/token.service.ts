import { Injectable } from '@angular/core'

const TOKEN_KEY = 'token'
const USER_ID_KEY = 'userId'
const AVATAR_KEY = 'avatar'
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

	public getUserId(): string {
		return sessionStorage.getItem(USER_ID_KEY)
	}

	public saveUserId(userId: number) {
		window.sessionStorage.removeItem(USER_ID_KEY)
		window.sessionStorage.setItem(USER_ID_KEY, JSON.stringify(userId))
	}

	public getAvatar(): string {
		return sessionStorage.getItem(AVATAR_KEY)
	}

	public saveAvatar(avatar: string) {
		window.sessionStorage.removeItem(AVATAR_KEY)
		window.sessionStorage.setItem(AVATAR_KEY, avatar)
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
