import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { httpOptions } from '../other/options'

export const QUIZ_ID_KEY = 'quizId'
export const QUIZ_NAME_KEY = 'quizName'
export const SECONDS_KEY = 'seconds'
export const PROGRESS_KEY = 'progress'
export const QUESTIONS_KEY = 'questions'
export const USER_ANSWERS_KEY = 'userAnswers'

export interface Quiz {
	id?: number
	name: string
	text: string
	questions?: Question[]
}

export interface Question {
	id?: number
	question: string
	firstOption: string
	secondOption: string
	thirdOption: string
	fourthOption: string
	answer: number
}

@Injectable({
	providedIn: 'root'
})
export class QuizService {
	private listeners = new Subject<any>()

	quizName: string
	questions: Question[]
	seconds: number
	timer: any
	progress: number
	userAnswers: number[]
	count: number

	static url = 'http://localhost:8080/quiz'

	constructor(private http: HttpClient) {}

	getAllQuizzes(): Observable<Quiz[]> {
		return this.http.get<Quiz[]>(`${QuizService.url}`, httpOptions)
	}

	getQuiz(id: number): Observable<Quiz> {
		return this.http.get<Quiz>(`${QuizService.url}/${id}`, httpOptions)
	}

	createQuiz(quiz: Quiz): Observable<Quiz> {
		return this.http.post<Quiz>(`${QuizService.url}`, quiz, httpOptions)
	}

	addQuestionToQuiz(id: number, question: Question): Observable<any> {
		return this.http.post<any>(`${QuizService.url}/${id}`, question, httpOptions)
	}

	deleteQuiz(id: number): Observable<void> {
		return this.http.delete<void>(`${QuizService.url}/${id}`, httpOptions)
	}

	deleteQuestionFromQuiz(questionId: number): Observable<void> {
		return this.http.delete<void>(`${QuizService.url}/question/${questionId}`, httpOptions)
	}

	displayTimeElapsed() {
		return Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60)
	}

	listen() {
		return this.listeners.asObservable()
	}

	filter(filterBy: string) {
		this.listeners.next(filterBy)
	}
}
