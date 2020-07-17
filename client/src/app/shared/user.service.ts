import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { httpOptions } from './options'

export interface User {
	id?: number
	username: string
	name: string
	surname: string
	email: string
	password: string
	roles: string[]
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	static url = 'http://localhost:8080/user'

	constructor(private http: HttpClient) {}

	getUser(username: string): Observable<User> {
		return this.http.get<User>(`${UserService.url}/${username}`, httpOptions)
	}

	forgot(email: string): Observable<string> {
		return this.http.post<string>(`${UserService.url}/password/forgot`, email, httpOptions)
	}

	reset(token: string, newPassword: string): Observable<any> {
		return this.http.put<any>(
			`${UserService.url}/password/reset/${token}`,
			newPassword,
			httpOptions
		)
	}
}
