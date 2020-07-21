import { Component, Input, OnInit } from '@angular/core'
import { TokenService } from '../shared/services/token.service'
import { UserService } from '../shared/services/user.service'

const FULLNAME_KEY = 'fullname'

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	@Input() isToggleActive: boolean
	avatar: string = ''
	fullname: string = ''

	constructor(private token: TokenService, private userService: UserService) {}

	ngOnInit() {
		if (this.token.getAvatar()) {
			this.avatar = this.token.getAvatar()
		}

		if (sessionStorage.getItem('fullname')) {
			this.fullname = sessionStorage.getItem(FULLNAME_KEY)
		} else this.getFullname()
	}

	getFullname() {
		const userId = parseInt(this.token.getUserId())

		this.userService.getUser(userId).subscribe(response => {
			this.fullname = response.name + ' ' + response.surname
			sessionStorage.setItem(FULLNAME_KEY, this.fullname)
		})
	}

	// Getters
	get avatarUrl() {
		return 'http://localhost:8080/img/' + this.avatar
	}

	get defaultAvatar() {
		return 'url(../../assets/images/avatar.png)'
	}
}
