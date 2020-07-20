import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoginRequest } from '../reports/requests/login-request'
import { JwtResponse } from '../reports/responses/jwt-response'
import { RegistrationRequest } from '../reports/requests/registration-request'
import { Observable } from 'rxjs'
import { httpOptions } from '../other/options'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	static url = 'http://localhost:8080/auth'

	constructor(private http: HttpClient) {}

	signIn(credentials: LoginRequest): Observable<JwtResponse> {
		return this.http.post<JwtResponse>(`${AuthService.url}/signin`, credentials, httpOptions)
	}

	signUp(info: RegistrationRequest): Observable<any> {
		return this.http.post<any>(`${AuthService.url}/signup`, info, httpOptions)
	}
}
