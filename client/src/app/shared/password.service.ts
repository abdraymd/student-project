import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { httpOptions } from './options'

@Injectable({
	providedIn: 'root'
})
export class PasswordService {
	static url = 'http://localhost:8080/password'

	constructor(private http: HttpClient) {}

	forgot(email: string): Observable<string> {
		return this.http.post<string>(`${PasswordService.url}/forgot?email=${email}`, null, httpOptions)
	}

	reset(token: string, newPassword: string): Observable<any> {
		return this.http.put<any>(`${PasswordService.url}/reset/${token}`, newPassword, httpOptions)
	}
}
