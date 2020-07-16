import { Component, OnInit, HostListener } from '@angular/core'
import { Book, BookService } from '../shared/book.service'
import { TokenService } from '../auth/token.service'
import { Title } from '@angular/platform-browser'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { BooksCreateComponent } from '../books-create/books-create.component'
import { Router } from '@angular/router'

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
	books: Book[] = []
	authority: string
	shouldSlide: boolean
	innerWidth: any
	scrollingBooks: Book[] = []
	scrollValue: number = 0
	isSpinning: boolean = false

	constructor(
		private bookService: BookService,
		private token: TokenService,
		private title: Title,
		private dialog: MatDialog,
		private router: Router
	) {
		this.title.setTitle('Библиотека')

		this.bookService.listen().subscribe(response => {
			console.log(response)
			this.scrollValue = 0
			this.getBooks()
		})
	}

	ngOnInit() {
		this.slideOnWidth()

		if (this.token.getToken()) {
			const roles = this.token.getAuthorities()
			roles.every(role => {
				if (role === 'ROLE_ADMIN') {
					this.authority = 'admin'
					return false
				}

				this.authority = 'user'
				return true
			})

			this.getBooks()
		}
	}

	onScroll() {
		if (this.scrollingBooks.length === this.books.length) {
			this.isSpinning = false
			return
		}

		this.isSpinning = true

		this.scrollingBooks = this.scrollingBooks.concat(
			this.books.slice(this.scrollValue, this.scrollValue + 6)
		)

		this.isSpinning = false

		this.scrollValue += 6
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

	getBooks() {
		this.bookService.getBooks().subscribe(response => {
			this.books = response.sort((a, b) => {
				return b.id - a.id
			})

			this.scrollingBooks = this.books.slice(this.scrollValue, this.scrollValue + 6)
			this.scrollValue += 6
		})
	}

	deleteBook(book: Book) {
		this.bookService.delete(book).subscribe(() => {
			this.books = this.books.filter(b => b.id !== book.id)
		})
	}

	toOneBook(id: number) {
		this.router.navigate([`books/${id}`])
	}

	onAdd() {
		const dialogConfig = new MatDialogConfig()
		dialogConfig.disableClose = true
		dialogConfig.autoFocus = false
		dialogConfig.panelClass = 'custom-dialog-container'
		this.dialog.open(BooksCreateComponent, dialogConfig)
	}

	// Getters
	get imgUrl() {
		return 'http://localhost:8080/img/'
	}
}
