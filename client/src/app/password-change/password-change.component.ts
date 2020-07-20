import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { UserService } from '../shared/services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from '../shared/other/must-match.validator'
import { PasswordForm } from '../shared/reports/requests/password-form'
import { TokenService } from '../shared/services/token.service'

@Component({
	selector: 'password-change',
	templateUrl: './password-change.component.html',
	styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
	formGroup: FormGroup
	submitFailed: boolean = false

	constructor(
		public dialogBox: MatDialogRef<PasswordChangeComponent>,
		private userService: UserService,
		private formBuilder: FormBuilder,
		private token: TokenService
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group(
			{
				password: ['', [Validators.required, Validators.minLength(6)]],
				newPassword: ['', [Validators.required, Validators.minLength(6)]],
				confirmNewPassword: ['', Validators.required]
			},
			{
				validator: MustMatch('newPassword', 'confirmNewPassword')
			}
		)
	}

	onClose() {
		this.dialogBox.close()
	}

	onSubmit() {
		const userId = parseInt(this.token.getUserId())
		const passwordForm = new PasswordForm(this.password.value, this.newPassword.value)

		this.userService.updatePassword(userId, passwordForm).subscribe(
			response => {
				this.userService.filter('Password updated!')
				this.onClose()
			},
			error => {
				this.submitFailed = true
			}
		)
	}

	// Getters
	get password() {
		return this.formGroup.get('password')
	}

	get newPassword() {
		return this.formGroup.get('newPassword')
	}

	get confirmNewPassword() {
		return this.formGroup.get('confirmNewPassword')
	}
}
