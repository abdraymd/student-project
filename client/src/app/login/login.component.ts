import { Component, OnInit } from '@angular/core'
import { LoginRequest } from '../shared/reports/requests/login-request'
import { AuthService } from '../shared/services/auth.service'
import { TokenService } from '../shared/services/token.service'
import { Router } from '@angular/router'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	formGroup: FormGroup
	isLoggedIn = false
	isLoginFailed = false

	constructor(
		private authService: AuthService,
		private token: TokenService,
		private router: Router,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		if (this.token.getToken()) {
			this.isLoggedIn = true
		}

		this.formGroup = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	onSubmit() {
		const loginRequest = new LoginRequest(this.username.value, this.password.value)

		this.authService.signIn(loginRequest).subscribe(
			data => {
				this.token.saveToken(data.accessToken)
				this.token.saveUserId(data.userId)

				if (data.profileImage) this.token.saveAvatar(data.profileImage)
				else this.token.saveAvatar('')

				this.token.saveAuthorities(data.authorities)

				this.isLoggedIn = true
				this.router.navigate(['news']).then(() => window.location.reload())
			},
			error => {
				console.log(error)
				this.isLoginFailed = true
			}
		)
	}

	// Getters
	get username() {
		return this.formGroup.get('username')
	}

	get password() {
		return this.formGroup.get('password')
	}
}
