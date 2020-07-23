import { Component, OnInit } from '@angular/core'
import { QuizService, Quiz } from '../shared/services/quiz.service'
import { ActivatedRoute } from '@angular/router'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { QuestionCreateComponent } from '../question-create/question-create.component'
import { TokenService } from '../shared/services/token.service'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'quiz-management',
	templateUrl: './quiz-management.component.html',
	styleUrls: ['./quiz-management.component.scss']
})
export class QuizManagementComponent implements OnInit {
	id: number
	quiz: Quiz
	authority: string

	constructor(
		private quizService: QuizService,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog,
		private token: TokenService,
		private title: Title
	) {
		this.quizService.listen().subscribe(response => {
			console.log(response)
			this.getQuiz(this.id)
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
		}

		this.id = this.activatedRoute.snapshot.params['id']
		this.getQuiz(this.id)
	}

	getQuiz(id: number) {
		this.quizService.getQuiz(this.id).subscribe((response: any) => {
			response.questions.sort((a: any, b: any) => {
				return a.id - b.id
			})

			this.title.setTitle(response.name)
			this.quiz = response
		})
	}

	addQuestion() {
		const dialogConfig = new MatDialogConfig()
		dialogConfig.disableClose = true
		dialogConfig.autoFocus = false
		dialogConfig.panelClass = 'custom-dialog-container'
		dialogConfig.data = { id: this.id }
		this.dialog.open(QuestionCreateComponent, dialogConfig)
	}

	deleteQuestion(questionId: number) {
		return this.quizService.deleteQuestionFromQuiz(questionId).subscribe(
			response => {
				this.quiz.questions = this.quiz.questions.filter(q => q.id !== questionId)
			},
			error => {
				console.error(error)
			}
		)
	}
}
