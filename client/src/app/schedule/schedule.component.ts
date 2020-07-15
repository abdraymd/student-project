import { Component, OnInit, HostListener } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	shouldSlide: boolean
	innerWidth: any

	constructor(private title: Title) {
		this.title.setTitle('Расписание')
	}

	ngOnInit() {
		this.slideOnWidth()
	}

	slideOnWidth() {
		this.innerWidth = window.innerWidth
		if (this.innerWidth <= 768) this.shouldSlide = false
		else this.shouldSlide = true
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.slideOnWidth()
	}
}
