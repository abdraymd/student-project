import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './shared/auth/auth-guard'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { ScheduleComponent } from './schedule/schedule.component'
import { QuizListComponent } from './quiz-list/quiz-list.component'
import { QuizComponent } from './quiz/quiz.component'
import { QuizManagementComponent } from './quiz-management/quiz-management.component'
import { ResultComponent } from './result/result.component'
import { NewsComponent } from './news/news.component'
import { BooksComponent } from './books/books.component'
import { BookComponent } from './book/book.component'
import { NewsSingleComponent } from './news-single/news-single.component'
import { PasswordForgotComponent } from './password-forgot/password-forgot.component'
import { PasswordResetComponent } from './password-reset/password-reset.component'
import { SettingsComponent } from './settings/settings.component'

const routes: Routes = [
	{ path: 'signin', component: LoginComponent },
	{ path: 'signup', component: RegisterComponent },
	{ path: 'password/forgot', component: PasswordForgotComponent },
	{ path: 'password/reset/:token', component: PasswordResetComponent },
	{ path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
	{ path: 'news/:id', component: NewsSingleComponent, canActivate: [AuthGuard] },
	{ path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
	{ path: 'quizzes', component: QuizListComponent, canActivate: [AuthGuard] },
	{ path: 'quizzes/:id', component: QuizComponent, canActivate: [AuthGuard] },
	{ path: 'quizzes/management/:id', component: QuizManagementComponent, canActivate: [AuthGuard] },
	{ path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
	{ path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
	{ path: 'books/:id', component: BookComponent, canActivate: [AuthGuard] },
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: '', redirectTo: 'news', pathMatch: 'full' }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
