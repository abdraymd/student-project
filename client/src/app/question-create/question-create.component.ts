import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { QuizService, Question } from '../shared/quiz.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
	selector: 'app-question-create',
	templateUrl: './question-create.component.html',
	styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent implements OnInit {
	formGroup: FormGroup

	constructor(
		public dialogBox: MatDialogRef<QuestionCreateComponent>,
		private quizService: QuizService,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			question: ['', Validators.required],
			firstOption: ['', Validators.required],
			secondOption: ['', Validators.required],
			thirdOption: ['', Validators.required],
			fourthOption: ['', Validators.required],
			answer: ['', Validators.required]
		})
	}

	onClose() {
		this.dialogBox.close()
	}

	onSubmit() {
		const question: Question = {
			question: this.question.value,
			firstOption: this.firstOption.value,
			secondOption: this.secondOption.value,
			thirdOption: this.thirdOption.value,
			fourthOption: this.fourthOption.value,
			answer: parseInt(this.answer.value)
		}

		this.quizService.addQuestionToQuiz(this.data.id, question).subscribe(
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
	get question() {
		return this.formGroup.get('question')
	}

	get firstOption() {
		return this.formGroup.get('firstOption')
	}

	get secondOption() {
		return this.formGroup.get('secondOption')
	}

	get thirdOption() {
		return this.formGroup.get('thirdOption')
	}

	get fourthOption() {
		return this.formGroup.get('fourthOption')
	}

	get answer() {
		return this.formGroup.get('answer')
	}
}
