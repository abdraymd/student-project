import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PasswordService } from '../shared/password.service'
import { ActivatedRoute } from '@angular/router'
import { MustMatch } from '../shared/must-match.validator'

@Component({
	selector: 'app-password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
	formGroup: FormGroup
	isSuccessful: boolean = false

	constructor(
		private formBuilder: FormBuilder,
		private passwordService: PasswordService,
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

		this.passwordService.reset(token, this.password.value).subscribe(response => {
			this.isSuccessful = true
		})
	}

	// Getters
	get password() {
		return this.formGroup.get('password')
	}

	get confirmPassword() {
		return this.formGroup.get('confirmPassword')
	}
}
