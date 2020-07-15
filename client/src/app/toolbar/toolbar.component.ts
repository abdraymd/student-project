import { Component } from '@angular/core'
import { TokenService } from '../auth/token.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
	showOptions: boolean = false

	constructor(private token: TokenService, private router: Router) {}

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
}
