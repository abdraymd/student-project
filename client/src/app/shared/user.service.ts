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
}
