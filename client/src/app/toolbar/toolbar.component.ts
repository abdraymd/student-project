import { Component, OnInit } from '@angular/core'
import { TokenService } from '../auth/token.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	showOptions: boolean = false
	avatar: string = ''

	constructor(private token: TokenService, private router: Router) {}

	ngOnInit() {
		if (this.token.getAvatar()) {
			this.avatar = this.token.getAvatar()
		}
	}

	show() {
		this.showOptions = !this.showOptions
	}

	closeOptions() {
		this.showOptions = false
	}

	logout() {
		this.token.signOut()
		this.router.navigate(['signin']).then(() => {
			window.location.reload()
		})
	}

	// Getters
	get avatarUrl() {
		return 'http://localhost:8080/img/' + this.avatar
	}
}
