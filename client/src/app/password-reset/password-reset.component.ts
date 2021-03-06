import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { MustMatch } from '../shared/other/must-match.validator'
import { UserService } from '../shared/services/user.service'

@Component({
	selector: 'password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
	formGroup: FormGroup
	isSuccessful: boolean = false
	isFailed: boolean = false

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group(
			{
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', Validators.required]
			},
			{
				validator: MustMatch('password', 'confirmPassword')
			}
		)
	}

	onSubmit() {
		const token = this.activatedRoute.snapshot.params['token']

		this.userService.reset(token, this.password.value).subscribe(
			response => {
				this.isSuccessful = true
			},
			error => {
				this.isFailed = true
			}
		)
	}

	// Getters
	get password() {
		return this.formGroup.get('password')
	}

	get confirmPassword() {
		return this.formGroup.get('confirmPassword')
	}
}
