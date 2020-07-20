import { Component, OnInit } from '@angular/core'
import { TokenService } from '../shared/services/token.service'
import { UserService, User } from '../shared/services/user.service'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	avatar: string = ''
	user: User

	constructor(private token: TokenService, private userService: UserService, private title: Title) {
		this.title.setTitle('Настройки')
	}

	ngOnInit() {
		this.getUser()
	}

	getUser() {
		const userId = parseInt(this.token.getUserId())

		this.userService.getUser(userId).subscribe(response => {
			this.user = response
		})
	}
}
