import { Component, OnInit } from '@angular/core'
import { Book, BookService } from '../shared/services/book.service'
import { TokenService } from '../shared/services/token.service'
import { Title } from '@angular/platform-browser'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { BooksCreateComponent } from '../books-create/books-create.component'
import { Router } from '@angular/router'

@Component({
	selector: 'books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
	books: Book[] = []
	authority: string
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
		if (this.scrollingBooks.length === this.books.length) return

		this.isSpinning = true

		this.scrollingBooks = this.scrollingBooks.concat(this.sliceBooks())

		this.isSpinning = false

		this.scrollValue += 12
	}

	sliceBooks() {
		return this.books.slice(this.scrollValue, this.scrollValue + 12)
	}

	getBooks() {
		this.bookService.getBooks().subscribe(response => {
			this.books = response.sort((a, b) => {
				return b.id - a.id
			})

			this.scrollingBooks = this.sliceBooks()
			this.scrollValue += 12
		})
	}

	deleteBook(book: Book) {
		this.bookService.delete(book).subscribe(() => {
			this.books = this.books.filter(b => b.id !== book.id)

			this.scrollValue = 0
			this.scrollingBooks = this.sliceBooks()
			this.scrollValue += 12
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
