import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { DateService } from '../shared/services/date.service'

interface Day {
	value: moment.Moment
	disabled: boolean
	selected: boolean
}

interface Week {
	days: Day[]
}

@Component({
	selector: 'calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
	calendar: Week[]

	constructor(private dateService: DateService) {}

	ngOnInit() {
		this.dateService.date.subscribe(this.generate.bind(this))
	}

	generate(now: moment.Moment) {
		const startDay = now.clone().startOf('month').startOf('isoWeek')
		const endDay = now.clone().endOf('month').endOf('isoWeek')

		const date = startDay.clone().subtract(1, 'day')

		const calendar = []

		while (date.isBefore(endDay, 'day')) {
			calendar.push({
				days: Array(7)
					.fill(0)
					.map(() => {
						const value = date.add(1, 'day').clone()
						const disabled = !now.isSame(value, 'month')
						const selected = now.isSame(value, 'date')

						return {
							value,
							disabled,
							selected
						}
					})
			})
		}

		this.calendar = calendar
	}

	select(day: moment.Moment) {
		this.dateService.changeDate(day)
	}

	goMonth(dir: number) {
		this.dateService.changeMonth(dir)
	}

	goDay(dir: number) {
		this.dateService.changeDay(dir)
	}
}
