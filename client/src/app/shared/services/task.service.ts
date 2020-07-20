import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from './user.service'
import * as moment from 'moment'
import { httpOptions } from '../other/options'

export interface Task {
	id?: number
	title: string
	date: string
	user: User
}

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	static url = 'http://localhost:8080/task'

	constructor(private http: HttpClient) {}

	load(userId: number, date: moment.Moment): Observable<Task[]> {
		return this.http.get<Task[]>(
			`${TaskService.url}/${userId}?date=${date.format('DD-MM-YYYY')}`,
			httpOptions
		)
	}

	create(task: Task): Observable<Task> {
		return this.http.post<Task>(`${TaskService.url}`, JSON.stringify(task), httpOptions)
	}

	remove(task: Task): Observable<void> {
		return this.http.delete<void>(`${TaskService.url}/${task.id}`, httpOptions)
	}
}
