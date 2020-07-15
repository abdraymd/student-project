import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { httpOptions } from './options'

export interface Book {
	id?: number
	name: string
	author: string
	genre: string
	description: string
	imageName: string
	fileName: string
}

@Injectable({
	providedIn: 'root'
})
export class BookService {
	private listeners = new Subject<any>()

	static url = 'http://localhost:8080/book'

	constructor(private http: HttpClient) {}

	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(`${BookService.url}`, httpOptions)
	}

	getOne(id: number): Observable<Book> {
		return this.http.get<Book>(`${BookService.url}/${id}`, httpOptions)
	}

	create(formData: FormData): Observable<FormData> {
		return this.http.post<FormData>(`${BookService.url}`, formData)
	}

	delete(book: Book): Observable<void> {
		return this.http.delete<void>(`${BookService.url}/${book.id}`, httpOptions)
	}

	download(fileName: string): Observable<any> {
		return this.http.get<any>(`${BookService.url}/download?fileName=${fileName}`, {
			responseType: 'blob' as 'json'
		})
	}

	listen() {
		return this.listeners.asObservable()
	}

	filter(filterBy: string) {
		this.listeners.next(filterBy)
	}
}
