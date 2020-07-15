import { Component, OnInit, HostListener } from '@angular/core'
import { QuizService } from '../shared/quiz.service'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	condition: boolean = false
	shouldSlide: boolean
	innerWidth: any

	constructor(private quizService: QuizService, private router: Router, private title: Title) {
		this.title.setTitle('Результат')
	}

	ngOnInit() {
		this.slideOnWidth()

		if (
			JSON.parse(sessionStorage.getItem('questions')) &&
			parseInt(sessionStorage.getItem('progress')) ==
				JSON.parse(sessionStorage.getItem('questions')).length
		) {
			this.condition = true

			this.quizService.seconds = parseInt(sessionStorage.getItem('seconds'))
			this.quizService.progress = parseInt(sessionStorage.getItem('progress'))
			this.quizService.questions = JSON.parse(sessionStorage.getItem('questions'))
			this.quizService.userAnswers = JSON.parse(sessionStorage.getItem('userAnswers'))

			this.quizService.count = 0

			for (var i = 0; i < this.quizService.questions.length; i++) {
				if (this.quizService.questions[i].answer == this.quizService.userAnswers[i]) {
					this.quizService.count++
				}
			}
		} else if (parseInt(sessionStorage.getItem('quizId'))) {
			this.router.navigate(['/quizzes', parseInt(sessionStorage.getItem('quizId'))])
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

	restart() {
		sessionStorage.setItem('seconds', '0')
		sessionStorage.setItem('progress', '0')
		sessionStorage.setItem('questions', '[]')
		sessionStorage.setItem('userAnswers', '[]')
		this.router.navigate(['/quizzes', parseInt(sessionStorage.getItem('quizId'))])
	}
}
