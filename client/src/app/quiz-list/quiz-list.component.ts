import { Component, OnInit, HostListener } from '@angular/core'
import { QuizService, Quiz } from '../shared/quiz.service'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { QuizCreateComponent } from '../quiz-create/quiz-create.component'
import { TokenService } from '../auth/token.service'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

@Component({
	selector: 'app-quiz-list',
	templateUrl: './quiz-list.component.html',
	styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
	quizzes: Quiz[] = []
	authority: string
	shouldSlide: boolean
	innerWidth: any

	constructor(
		private quizService: QuizService,
		private dialog: MatDialog,
		private token: TokenService,
		private title: Title,
		private router: Router
	) {
		this.title.setTitle('Тесты')

		this.quizService.listen().subscribe(response => {
			console.log(response)
			this.getAllQuizzes()
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
		}

		this.getAllQuizzes()
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

	getAllQuizzes() {
		this.quizService.getAllQuizzes().subscribe(response => {
			this.quizzes = response.sort((a, b) => {
				return b.id - a.id
			})
		})
	}

	toQuiz(id: number) {
		this.router.navigate(['/quizzes', id])
	}

	toQuizManagement(id: number) {
		this.router.navigate(['/quizzes/management', id])
	}

	addQuiz() {
		const dialogConfig = new MatDialogConfig()
		dialogConfig.disableClose = true
		dialogConfig.autoFocus = false
		dialogConfig.panelClass = 'custom-dialog-container'
		this.dialog.open(QuizCreateComponent, dialogConfig)
	}

	deleteQuiz(quiz: Quiz) {
		this.quizService.deleteQuiz(quiz.id).subscribe(response => {
			this.getAllQuizzes()
		})
	}
}
