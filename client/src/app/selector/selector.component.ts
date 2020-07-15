import { Component, OnInit } from '@angular/core'
import { DateService } from '../shared/date.service'

@Component({
	selector: 'app-selector',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
	constructor(private dateService: DateService) {}

	goMonth(dir: number) {
		this.dateService.changeMonth(dir)
	}

	goDay(dir: number) {
		this.dateService.changeDay(dir)
	}
}
