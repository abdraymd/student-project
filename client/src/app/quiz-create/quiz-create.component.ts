import { Component, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { QuizService, Quiz } from '../shared/quiz.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
	selector: 'app-quiz-create',
	templateUrl: './quiz-create.component.html',
	styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent implements OnInit {
	formGroup: FormGroup

	constructor(
		public dialogBox: MatDialogRef<QuizCreateComponent>,
		private quizService: QuizService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			name: ['', Validators.required],
			text: ['', Validators.required]
		})
	}

	onClose() {
		this.dialogBox.close()
	}

	onSubmit() {
		const quiz: Quiz = {
			name: this.name.value,
			text: this.text.value
		}

		this.quizService.createQuiz(quiz).subscribe(
			response => {
				this.quizService.filter('Registered!')
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

	get text() {
		return this.formGroup.get('text')
	}
}
