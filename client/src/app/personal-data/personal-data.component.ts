import { Component, Input, OnInit } from '@angular/core'
import { User, UserService } from '../shared/services/user.service'
import { TokenService } from '../shared/services/token.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PersonalDataForm } from '../shared/reports/requests/personal-data-form'
import { Router } from '@angular/router'

@Component({
	selector: 'personal-data',
	templateUrl: './personal-data.component.html',
	styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
	@Input() user: User
	avatar: string = ''
	formGroup: FormGroup
	submitFailed: boolean = false

	constructor(
		private token: TokenService,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			username: [this.user.username, [Validators.required, Validators.minLength(3)]],
			name: [this.user.name, [Validators.required, Validators.minLength(3)]],
			surname: [this.user.surname, [Validators.required, Validators.minLength(3)]]
		})
	}

	updateAvatar(event: any) {
		if (event.target.files.length > 0) {
			const selectedImage = event.target.files[0]

			var formData = new FormData()
			formData.append('image', selectedImage)

			this.userService.updateAvatar(this.user.id, formData).subscribe(response => {
				this.token.saveAvatar(response.profileImage)
				window.location.reload()
			})
		}
	}

	onSubmit() {
		this.submitFailed = false

		const personalDataForm = new PersonalDataForm(
			this.username.value,
			this.name.value,
			this.surname.value
		)

		this.userService.updatePersonalData(this.user.id, personalDataForm).subscribe(
			response => {
				this.token.signOut()
				this.router.navigate(['signin']).then(() => window.location.reload())
			},
			error => {
				this.submitFailed = true
			}
		)
	}

	// Getters
	get avatarUrl() {
		return 'http://localhost:8080/img/' + this.user.profileImage
	}

	get defaultAvatar() {
		return 'url(../../assets/images/avatar.png)'
	}

	get username() {
		return this.formGroup.get('username')
	}

	get name() {
		return this.formGroup.get('name')
	}

	get surname() {
		return this.formGroup.get('surname')
	}
}
