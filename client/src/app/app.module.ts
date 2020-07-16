import { BrowserModule } from '@angular/platform-browser'
import { NgModule, LOCALE_ID } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule, MatIconModule, MatButtonModule, MatRadioModule } from '@angular/material'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { httpInterceptorProviders } from './auth/auth-interceptor'
import { ScheduleComponent } from './schedule/schedule.component'
import { CalendarComponent } from './calendar/calendar.component'
import { SelectorComponent } from './selector/selector.component'
import { OrganizerComponent } from './organizer/organizer.component'
import { MomentPipe } from './shared/moment.pipe'
import { ResultComponent } from './result/result.component'
import { QuizListComponent } from './quiz-list/quiz-list.component'
import { QuizComponent } from './quiz/quiz.component'
import { QuizManagementComponent } from './quiz-management/quiz-management.component'
import { QuestionCreateComponent } from './question-create/question-create.component'
import { NewsComponent } from './news/news.component'
import { NewsCreateComponent } from './news-create/news-create.component'
import { QuizCreateComponent } from './quiz-create/quiz-create.component'
import { registerLocaleData } from '@angular/common'
import localeRu from '@angular/common/locales/ru'
import { BooksComponent } from './books/books.component'
import { BooksCreateComponent } from './books-create/books-create.component'
import { BookComponent } from './book/book.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { ClickOutsideDirective } from './shared/click-outside.directive'
import { NewsSingleComponent } from './news-single/news-single.component'
import { PasswordForgotComponent } from './password-forgot/password-forgot.component'
import { PasswordResetComponent } from './password-reset/password-reset.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerComponent } from './spinner/spinner.component'

registerLocaleData(localeRu, 'ru')

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ScheduleComponent,
		CalendarComponent,
		SelectorComponent,
		OrganizerComponent,
		MomentPipe,
		ResultComponent,
		QuizListComponent,
		QuizComponent,
		QuizCreateComponent,
		QuizManagementComponent,
		QuestionCreateComponent,
		NewsComponent,
		NewsCreateComponent,
		BooksComponent,
		BooksCreateComponent,
		BookComponent,
		SidebarComponent,
		ToolbarComponent,
		ClickOutsideDirective,
		NewsSingleComponent,
		PasswordForgotComponent,
		PasswordResetComponent,
		SpinnerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatIconModule,
		MatButtonModule,
		MatRadioModule,
		InfiniteScrollModule
	],
	providers: [{ provide: LOCALE_ID, useValue: 'ru' }, httpInterceptorProviders],
	bootstrap: [AppComponent],
	entryComponents: [
		QuizCreateComponent,
		QuestionCreateComponent,
		NewsCreateComponent,
		BooksCreateComponent
	]
})
export class AppModule {}
