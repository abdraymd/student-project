import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { httpOptions } from '../other/options'
import { Observable, Subject } from 'rxjs'

export interface Article {
	id?: number
	title: string
	text: string
	date: string
	imageName: string
}

@Injectable({
	providedIn: 'root'
})
export class ArticleService {
	private listeners = new Subject<any>()

	static url = 'http://localhost:8080/article'

	constructor(private http: HttpClient) {}

	getAllArticles(): Observable<Article[]> {
		return this.http.get<Article[]>(`${ArticleService.url}`, httpOptions)
	}

	getArticle(id: number): Observable<Article> {
		return this.http.get<Article>(`${ArticleService.url}/${id}`, httpOptions)
	}

	create(formData: FormData): Observable<Article> {
		return this.http.post<Article>(`${ArticleService.url}`, formData)
	}

	delete(article: Article): Observable<void> {
		return this.http.delete<void>(`${ArticleService.url}/${article.id}`, httpOptions)
	}

	listen() {
		return this.listeners.asObservable()
	}

	filter(filterBy: string) {
		this.listeners.next(filterBy)
	}
}
