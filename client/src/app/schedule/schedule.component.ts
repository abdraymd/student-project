import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	constructor(private title: Title) {
		this.title.setTitle('Расписание')
	}

	ngOnInit() {}
}
