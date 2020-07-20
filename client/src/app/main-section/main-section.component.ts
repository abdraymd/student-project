import { Component, OnInit, HostListener } from '@angular/core'

@Component({
	selector: 'main-section',
	templateUrl: './main-section.component.html',
	styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
	shouldSlide: boolean
	innerWidth: any

	constructor() {}

	ngOnInit() {
		this.slideOnWidth()
	}

	slideOnWidth() {
		this.innerWidth = window.innerWidth
		if (this.innerWidth <= 1200) this.shouldSlide = false
		else this.shouldSlide = true
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.slideOnWidth()
	}
}
