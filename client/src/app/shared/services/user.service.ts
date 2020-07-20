import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { httpOptions } from '../other/options'
import { PersonalDataForm } from '../reports/requests/personal-data-form'
import { PasswordForm } from '../reports/requests/password-form'

export interface User {
	id?: number
	username: string
	name: string
	surname: string
	email: string
	password: string
	roles: string[]
	profileImage: string
	resetToken: string
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private listeners = new Subject<any>()

	static url = 'http://localhost:8080/user'

	constructor(private http: HttpClient) {}

	getUser(userId: number): Observable<User> {
		return this.http.get<User>(`${UserService.url}/${userId}`, httpOptions)
	}

	updateAvatar(id: number, image: FormData): Observable<User> {
		return this.http.put<User>(`${UserService.url}/${id}/image`, image)
	}

	updatePersonalData(id: number, personalDataForm: PersonalDataForm): Observable<any> {
		return this.http.put<any>(
			`${UserService.url}/${id}/personal-data`,
			personalDataForm,
			httpOptions
		)
	}

	updateEmail(id: number, email: string): Observable<any> {
		return this.http.put<any>(`${UserService.url}/${id}/email`, email, httpOptions)
	}

	updatePassword(id: number, passwordForm: PasswordForm): Observable<any> {
		return this.http.put<any>(`${UserService.url}/${id}/password`, passwordForm, httpOptions)
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

	listen() {
		return this.listeners.asObservable()
	}

	filter(filterBy: string) {
		this.listeners.next(filterBy)
	}
}
