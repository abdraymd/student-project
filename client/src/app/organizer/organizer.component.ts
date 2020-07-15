import { Component, OnInit } from '@angular/core'
import { DateService } from '../shared/date.service'
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'
import { TaskService, Task } from '../shared/task.service'
import { TokenService } from '../auth/token.service'
import { User, UserService } from '../shared/user.service'
import { switchMap } from 'rxjs/operators'

@Component({
	selector: 'app-organizer',
	templateUrl: './organizer.component.html',
	styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
	username: string
	userInfo: User
	tasks: Task[] = []
	formGroup: FormGroup

	constructor(
		private dateService: DateService,
		private taskService: TaskService,
		private userService: UserService,
		private token: TokenService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.username = this.token.getUsername()
		this.getUser(this.username)

		this.dateService.date
			.pipe(switchMap(value => this.taskService.load(this.username, value)))
			.subscribe(tasks => {
				this.tasks = tasks
			})

		this.formGroup = this.formBuilder.group({
			title: ['', Validators.required]
		})
	}

	onSubmit(formDirective: FormGroupDirective) {
		const title = this.title.value

		const task: Task = {
			title,
			date: this.dateService.date.value.format('DD-MM-YYYY'),
			user: this.userInfo
		}

		this.taskService.create(task).subscribe(
			task => {
				this.tasks.push(task)
				formDirective.resetForm()
				this.formGroup.reset()
			},
			error => {
				console.error(error)
			}
		)
	}

	getUser(username: string) {
		this.userService.getUser(username).subscribe(response => {
			this.userInfo = response
		})
	}

	remove(task: Task) {
		this.taskService.remove(task).subscribe(
			() => {
				this.tasks = this.tasks.filter(t => t.id !== task.id)
			},
			error => {
				console.error(error)
			}
		)
	}

	// Getters
	get title() {
		return this.formGroup.get('title')
	}
}
