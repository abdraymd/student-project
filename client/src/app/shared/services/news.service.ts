import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { httpOptions } from '../other/options'
import { Observable, Subject } from 'rxjs'

export interface News {
	id?: number
	title: string
	text: string
	date: string
	imageName: string
}

@Injectable({
	providedIn: 'root'
})
export class NewsService {
	private listeners = new Subject<any>()

	static url = 'http://localhost:8080/news'

	constructor(private http: HttpClient) {}

	getAllNews(): Observable<News[]> {
		return this.http.get<News[]>(`${NewsService.url}`, httpOptions)
	}

	getNews(id: number): Observable<News> {
		return this.http.get<News>(`${NewsService.url}/${id}`, httpOptions)
	}

	create(formData: FormData): Observable<News> {
		return this.http.post<News>(`${NewsService.url}`, formData)
	}

	delete(news: News): Observable<void> {
		return this.http.delete<void>(`${NewsService.url}/${news.id}`, httpOptions)
	}

	listen() {
		return this.listeners.asObservable()
	}

	filter(filterBy: string) {
		this.listeners.next(filterBy)
	}
}
