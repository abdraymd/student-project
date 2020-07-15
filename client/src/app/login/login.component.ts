import { Component, OnInit } from '@angular/core'
import { SignInInfo } from '../report/request/signin-info'
import { AuthService } from '../auth/auth.service'
import { TokenService } from '../auth/token.service'
import { Router } from '@angular/router'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
	selector: 'app-login',
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
		const loginInfo = new SignInInfo(this.username.value, this.password.value)

		this.authService.signIn(loginInfo).subscribe(
			data => {
				this.token.saveToken(data.accessToken)
				this.token.saveUsername(data.username)
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
