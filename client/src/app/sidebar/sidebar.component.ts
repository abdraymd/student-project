import { Component, HostListener, OnInit } from '@angular/core'

@Component({
	selector: 'sidebar',
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
		if (this.innerWidth <= 1200) this.isToggleActive = false
		else this.isToggleActive = true
	}

	toggle() {
		this.isToggleActive = !this.isToggleActive
	}

	closeToggle() {
		if (this.innerWidth > 1200) return
		this.isToggleActive = false
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.toggleOnWidth()
	}
}
