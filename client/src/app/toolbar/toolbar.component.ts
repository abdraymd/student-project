import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'
import { TokenService } from '../shared/services/token.service'
import { Router } from '@angular/router'

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	showOptions: boolean = false
	avatar: string = ''
	@Input() isToggleActive: boolean
	@Output() toggleClicked: EventEmitter<boolean> = new EventEmitter<boolean>()

	constructor(private token: TokenService, private router: Router) {}

	ngOnInit() {
		if (this.token.getAvatar()) {
			this.avatar = this.token.getAvatar()
		}
	}

	toggle() {
		this.toggleClicked.emit(!this.isToggleActive)
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

	get defaultAvatar() {
		return 'url(../../assets/images/avatar.png)'
	}
}
