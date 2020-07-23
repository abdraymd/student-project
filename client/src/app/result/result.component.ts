import { Component, OnInit } from '@angular/core'
import {
	QuizService,
	QUESTIONS_KEY,
	PROGRESS_KEY,
	SECONDS_KEY,
	USER_ANSWERS_KEY,
	QUIZ_ID_KEY,
	QUIZ_NAME_KEY
} from '../shared/services/quiz.service'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	condition: boolean = false

	constructor(private quizService: QuizService, private router: Router, private title: Title) {}

	ngOnInit() {
		if (
			JSON.parse(sessionStorage.getItem(QUESTIONS_KEY)) &&
			parseInt(sessionStorage.getItem(PROGRESS_KEY)) ==
				JSON.parse(sessionStorage.getItem(QUESTIONS_KEY)).length
		) {
			this.condition = true

			this.quizService.quizName = sessionStorage.getItem(QUIZ_NAME_KEY)
			this.title.setTitle(this.quizService.quizName)

			this.quizService.seconds = parseInt(sessionStorage.getItem(SECONDS_KEY))
			this.quizService.progress = parseInt(sessionStorage.getItem(PROGRESS_KEY))
			this.quizService.questions = JSON.parse(sessionStorage.getItem(QUESTIONS_KEY))
			this.quizService.userAnswers = JSON.parse(sessionStorage.getItem(USER_ANSWERS_KEY))

			this.quizService.count = 0

			for (var i = 0; i < this.quizService.questions.length; i++) {
				if (this.quizService.questions[i].answer == this.quizService.userAnswers[i]) {
					this.quizService.count++
				}
			}
		} else if (parseInt(sessionStorage.getItem(QUIZ_ID_KEY))) {
			this.router.navigate(['/quizzes', parseInt(sessionStorage.getItem('quizId'))])
		}
	}

	restart() {
		sessionStorage.setItem(SECONDS_KEY, '0')
		sessionStorage.setItem(PROGRESS_KEY, '0')
		sessionStorage.setItem(QUESTIONS_KEY, '[]')
		sessionStorage.setItem(USER_ANSWERS_KEY, '[]')
		this.router.navigate(['/quizzes', parseInt(sessionStorage.getItem('quizId'))])
	}
}
