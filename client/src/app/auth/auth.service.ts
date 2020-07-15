import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SignInInfo } from '../report/request/signin-info'
import { JwtResponse } from '../report/response/jwt-response'
import { SignUpInfo } from '../report/request/signup-info'
import { Observable } from 'rxjs'
import { httpOptions } from '../shared/options'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	static url = 'http://localhost:8080/auth'

	constructor(private http: HttpClient) {}

	signIn(credentials: SignInInfo): Observable<JwtResponse> {
		return this.http.post<JwtResponse>(`${AuthService.url}/signin`, credentials, httpOptions)
	}

	signUp(info: SignUpInfo): Observable<string> {
		return this.http.post<string>(`${AuthService.url}/signup`, info, httpOptions)
	}
}
