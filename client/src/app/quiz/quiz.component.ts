import { Component, OnInit, HostListener } from '@angular/core'
import { QuizService, Quiz } from '../shared/quiz.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
	id: number
	shouldSlide: boolean
	innerWidth: any

	constructor(
		private quizService: QuizService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private title: Title
	) {}

	ngOnInit() {
		this.slideOnWidth()

		this.id = this.activatedRoute.snapshot.params['id']

		if (
			parseInt(sessionStorage.getItem('quizId')) == this.id &&
			parseInt(sessionStorage.getItem('seconds')) > 0
		) {
			this.quizService.quizName = sessionStorage.getItem('quizName')
			this.title.setTitle('Тест: ' + this.quizService.quizName)

			this.quizService.seconds = parseInt(sessionStorage.getItem('seconds'))
			this.quizService.progress = parseInt(sessionStorage.getItem('progress'))
			this.quizService.questions = JSON.parse(sessionStorage.getItem('questions'))
			this.quizService.userAnswers = JSON.parse(sessionStorage.getItem('userAnswers'))

			if (this.quizService.progress == this.quizService.questions.length) {
				this.router.navigate(['/result'])
			} else {
				this.startTimer()
			}
		} else {
			sessionStorage.setItem('quizId', this.id.toString())
			sessionStorage.setItem('seconds', '0')
			sessionStorage.setItem('progress', '0')
			sessionStorage.setItem('userAnswers', '[]')

			this.quizService.seconds = 0
			this.quizService.progress = 0
			this.quizService.userAnswers = []

			this.getQuiz(this.id)
			this.startTimer()
		}
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

	getQuiz(id: number) {
		this.quizService.getQuiz(this.id).subscribe((response: any) => {
			this.quizService.quizName = response.name
			this.title.setTitle('Тест: ' + this.quizService.quizName)

			this.quizService.questions = response.questions
			this.quizService.questions.sort((a, b) => {
				return a.id - b.id
			})

			sessionStorage.setItem('quizName', this.quizService.quizName)
			sessionStorage.setItem('questions', JSON.stringify(this.quizService.questions))
		})
	}

	startTimer() {
		this.quizService.timer = setInterval(() => {
			this.quizService.seconds++
			sessionStorage.setItem('seconds', this.quizService.seconds.toString())
		}, 1000)
	}

	answer(choice: number) {
		this.quizService.userAnswers[this.quizService.progress] = choice
		sessionStorage.setItem('userAnswers', JSON.stringify(this.quizService.userAnswers))

		this.quizService.progress++
		sessionStorage.setItem('progress', this.quizService.progress.toString())

		if (this.quizService.progress == this.quizService.questions.length) {
			clearInterval(this.quizService.timer)
			this.router.navigate(['/result'])
		}
	}
}
