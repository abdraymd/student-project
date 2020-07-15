import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PasswordService } from '../shared/password.service'

@Component({
	selector: 'app-password-forgot',
	templateUrl: './password-forgot.component.html',
	styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
	formGroup: FormGroup
	isSubmitted: boolean = false
	isFailed: boolean = false
	isSpinning: boolean = false

	constructor(private formBuilder: FormBuilder, private passwordService: PasswordService) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			email: ['', [Validators.required, Validators.minLength(3), Validators.email]]
		})
	}

	onSubmit() {
		this.isSpinning = true

		this.passwordService.forgot(this.email.value).subscribe(
			response => {
				this.isSpinning = false
				this.isSubmitted = true
			},
			error => {
				this.isSpinning = false
				this.isFailed = true
			}
		)
	}

	// Getters
	get email() {
		return this.formGroup.get('email')
	}
}
