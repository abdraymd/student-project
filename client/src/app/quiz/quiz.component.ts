import { Component, OnInit } from '@angular/core'
import {
	QuizService,
	QUIZ_ID_KEY,
	SECONDS_KEY,
	QUIZ_NAME_KEY,
	PROGRESS_KEY,
	QUESTIONS_KEY,
	USER_ANSWERS_KEY
} from '../shared/services/quiz.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
	id: number

	constructor(
		private quizService: QuizService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private title: Title
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params['id']

		if (
			parseInt(sessionStorage.getItem(QUIZ_ID_KEY)) == this.id &&
			parseInt(sessionStorage.getItem(SECONDS_KEY)) > 0
		) {
			this.quizService.quizName = sessionStorage.getItem(QUIZ_NAME_KEY)
			this.title.setTitle('Тест: ' + this.quizService.quizName)

			this.quizService.seconds = parseInt(sessionStorage.getItem(SECONDS_KEY))
			this.quizService.progress = parseInt(sessionStorage.getItem(PROGRESS_KEY))
			this.quizService.questions = JSON.parse(sessionStorage.getItem(QUESTIONS_KEY))
			this.quizService.userAnswers = JSON.parse(sessionStorage.getItem(USER_ANSWERS_KEY))

			if (this.quizService.progress == this.quizService.questions.length) {
				this.router.navigate(['/result'])
			} else {
				this.startTimer()
			}
		} else {
			sessionStorage.setItem(QUIZ_ID_KEY, this.id.toString())
			sessionStorage.setItem(SECONDS_KEY, '0')
			sessionStorage.setItem(PROGRESS_KEY, '0')
			sessionStorage.setItem(USER_ANSWERS_KEY, '[]')

			this.quizService.seconds = 0
			this.quizService.progress = 0
			this.quizService.userAnswers = []

			this.getQuiz(this.id)
			this.startTimer()
		}
	}

	getQuiz(id: number) {
		this.quizService.getQuiz(this.id).subscribe((response: any) => {
			this.quizService.quizName = response.name
			this.title.setTitle('Тест: ' + this.quizService.quizName)
			sessionStorage.setItem(QUIZ_NAME_KEY, this.quizService.quizName)

			this.quizService.questions = response.questions
			this.quizService.questions.sort((a, b) => {
				return a.id - b.id
			})

			sessionStorage.setItem(QUESTIONS_KEY, JSON.stringify(this.quizService.questions))
		})
	}

	startTimer() {
		this.quizService.timer = setInterval(() => {
			this.quizService.seconds++
			sessionStorage.setItem(SECONDS_KEY, this.quizService.seconds.toString())
		}, 1000)
	}

	answer(choice: number) {
		this.quizService.userAnswers[this.quizService.progress] = choice
		sessionStorage.setItem(USER_ANSWERS_KEY, JSON.stringify(this.quizService.userAnswers))

		this.quizService.progress++
		sessionStorage.setItem(PROGRESS_KEY, this.quizService.progress.toString())

		if (this.quizService.progress == this.quizService.questions.length) {
			clearInterval(this.quizService.timer)
			this.router.navigate(['/result'])
		}
	}
}
