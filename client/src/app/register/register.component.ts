import { Component, OnInit } from '@angular/core'
import { RegistrationRequest } from '../shared/reports/requests/registration-request'
import { AuthService } from '../shared/services/auth.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { TokenService } from '../shared/services/token.service'
import { Title } from '@angular/platform-browser'
import { LoginRequest } from '../shared/reports/requests/login-request'
import { Router } from '@angular/router'

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	formGroup: FormGroup
	isLoggedIn = false
	isSignUpFailed = false

	constructor(
		private authService: AuthService,
		private token: TokenService,
		private formBuilder: FormBuilder,
		private title: Title,
		private router: Router
	) {
		this.title.setTitle('Регистрация')
	}

	ngOnInit() {
		if (this.token.getToken()) {
			this.isLoggedIn = true
		}

		this.formGroup = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			name: ['', [Validators.required, Validators.minLength(3)]],
			surname: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	onSubmit() {
		const registrationRequest = new RegistrationRequest(
			this.username.value,
			this.name.value,
			this.surname.value,
			this.email.value,
			this.password.value
		)

		this.authService.signUp(registrationRequest).subscribe(response => {
			const loginInfo = new LoginRequest(this.username.value, this.password.value)
			this.authService.signIn(loginInfo).subscribe(
				data => {
					this.token.saveToken(data.accessToken)
					this.token.saveUserId(data.userId)

					if (data.profileImage) this.token.saveAvatar(data.profileImage)
					else this.token.saveAvatar('')
					this.token.saveAuthorities(data.authorities)

					this.isLoggedIn = true
					this.isSignUpFailed = false
					this.router.navigate(['news']).then(() => window.location.reload())
				},
				error => {
					console.log(error)
					this.isSignUpFailed = true
				}
			)
		})
	}

	// Getters
	get username() {
		return this.formGroup.get('username')
	}

	get name() {
		return this.formGroup.get('name')
	}

	get surname() {
		return this.formGroup.get('surname')
	}

	get email() {
		return this.formGroup.get('email')
	}

	get password() {
		return this.formGroup.get('password')
	}
}
