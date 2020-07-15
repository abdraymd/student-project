import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core'
import { TokenService } from '../auth/token.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	isToggleActive: boolean
	innerWidth: any

	constructor() {}

	ngOnInit() {
		this.toggleOnWidth()
	}

	toggleOnWidth() {
		this.innerWidth = window.innerWidth
		if (this.innerWidth <= 768) this.isToggleActive = false
		else this.isToggleActive = true
	}

	toggle() {
		this.isToggleActive = !this.isToggleActive
	}

	closeToggle() {
		if (this.innerWidth > 768) return
		this.isToggleActive = false
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.toggleOnWidth()
	}
}
