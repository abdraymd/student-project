import { Component, OnInit } from '@angular/core'
import { Book, BookService } from '../shared/services/book.service'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { saveAs } from 'file-saver'

@Component({
	selector: 'book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
	id: number
	book: Book

	constructor(
		private bookService: BookService,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params['id']
		this.getBook(this.id)
	}

	getBook(id: number) {
		this.bookService.getOne(id).subscribe(response => {
			this.title.setTitle('Библиотека: ' + response.name)
			this.book = response
		})
	}

	downloadFile(fileName: string) {
		this.bookService.download(fileName).subscribe(
			response => {
				saveAs(response, fileName)
			},
			error => {
				console.error(error)
			}
		)
	}

	// Getters
	get imgUrl() {
		return 'http://localhost:8080/img/'
	}
}
