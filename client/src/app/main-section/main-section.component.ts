import { Component, OnInit, HostListener } from '@angular/core'

@Component({
	selector: 'main-section',
	templateUrl: './main-section.component.html',
	styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
	innerWidth: any
	shouldSlide: boolean
	toggleState: boolean

	constructor() {}

	ngOnInit() {
		this.slideOnWidth()
	}

	slideOnWidth() {
		this.innerWidth = window.innerWidth
		if (this.innerWidth <= 1200) {
			this.shouldSlide = false
			this.toggleState = false
		} else {
			this.shouldSlide = true
			this.toggleState = true
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.slideOnWidth()
	}

	getToggleState($event: any) {
		this.toggleState = $event
	}
}
