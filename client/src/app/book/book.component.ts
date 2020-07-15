import { Component, OnInit, HostListener } from '@angular/core'
import { Book, BookService } from '../shared/book.service'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { saveAs } from 'file-saver'

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
	id: number
	book: Book
	shouldSlide: boolean
	innerWidth: any

	constructor(
		private bookService: BookService,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

	ngOnInit() {
		this.slideOnWidth()

		this.id = this.activatedRoute.snapshot.params['id']
		this.getBook(this.id)
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
