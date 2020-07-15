import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { BookService } from '../shared/book.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-books-create',
	templateUrl: './books-create.component.html',
	styleUrls: ['./books-create.component.scss']
})
export class BooksCreateComponent implements OnInit {
	formGroup: FormGroup

	constructor(
		public dialogBox: MatDialogRef<BooksCreateComponent>,
		private bookService: BookService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			name: ['', Validators.required],
			author: ['', Validators.required],
			genre: ['', Validators.required],
			description: ['', Validators.required],
			image: [null, Validators.required],
			file: [null, Validators.required]
		})
	}

	onClose() {
		this.dialogBox.close()
	}

	onImageSelected(event: any) {
		if (event.target.files.length > 0) {
			const selectedImage = event.target.files[0]
			this.image.setValue(selectedImage)
		}
	}

	onFileSelected(event: any) {
		if (event.target.files.length > 0) {
			const selectedFile = event.target.files[0]
			this.file.setValue(selectedFile)
		}
	}

	onSubmit() {
		var formData = new FormData()
		formData.append('name', this.name.value)
		formData.append('author', this.author.value)
		formData.append('genre', this.genre.value)
		formData.append('description', this.description.value)
		formData.append('image', this.image.value)
		formData.append('file', this.file.value)

		this.bookService.create(formData).subscribe(
			response => {
				this.bookService.filter('Registered!')
				this.onClose()
			},
			error => {
				console.error(error)
			}
		)
	}

	// Getters
	get name() {
		return this.formGroup.get('name')
	}

	get author() {
		return this.formGroup.get('author')
	}

	get genre() {
		return this.formGroup.get('genre')
	}

	get description() {
		return this.formGroup.get('description')
	}

	get image() {
		return this.formGroup.get('image')
	}

	get file() {
		return this.formGroup.get('file')
	}
}
