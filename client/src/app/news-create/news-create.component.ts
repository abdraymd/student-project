import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NewsService } from '../shared/services/news.service'
import { DateService } from '../shared/services/date.service'

@Component({
	selector: 'news-create',
	templateUrl: './news-create.component.html',
	styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {
	formGroup: FormGroup

	constructor(
		public dialogBox: MatDialogRef<NewsCreateComponent>,
		private newsService: NewsService,
		private dateService: DateService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			title: ['', Validators.required],
			text: ['', Validators.required],
			image: [null, Validators.required]
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

	onSubmit() {
		var formData = new FormData()
		formData.append('title', this.title.value)
		formData.append('text', this.text.value)
		formData.append('date', this.dateService.date.value.format('DD-MM-YYYY'))
		formData.append('image', this.image.value)

		this.newsService.create(formData).subscribe(
			response => {
				this.newsService.filter('Registered!')
				this.onClose()
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

	get text() {
		return this.formGroup.get('text')
	}

	get image() {
		return this.formGroup.get('image')
	}
}
