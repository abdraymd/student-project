import { BrowserModule } from '@angular/platform-browser'
import { NgModule, LOCALE_ID } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule, MatIconModule, MatRadioModule } from '@angular/material'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { httpInterceptorProviders } from './shared/auth/auth-interceptor'
import { ScheduleComponent } from './schedule/schedule.component'
import { CalendarComponent } from './calendar/calendar.component'
import { OrganizerComponent } from './organizer/organizer.component'
import { MomentPipe } from './shared/other/moment.pipe'
import { ResultComponent } from './result/result.component'
import { QuizListComponent } from './quiz-list/quiz-list.component'
import { QuizComponent } from './quiz/quiz.component'
import { QuizManagementComponent } from './quiz-management/quiz-management.component'
import { QuestionCreateComponent } from './question-create/question-create.component'
import { ArticlesComponent } from './articles/articles.component'
import { ArticleCreateComponent } from './article-create/article-create.component'
import { QuizCreateComponent } from './quiz-create/quiz-create.component'
import { registerLocaleData } from '@angular/common'
import localeRu from '@angular/common/locales/ru'
import { BooksComponent } from './books/books.component'
import { BooksCreateComponent } from './books-create/books-create.component'
import { BookComponent } from './book/book.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ToolbarComponent } from './toolbar/toolbar.component'
import { ClickOutsideDirective } from './shared/other/click-outside.directive'
import { ArticleComponent } from './article/article.component'
import { PasswordForgotComponent } from './password-forgot/password-forgot.component'
import { PasswordResetComponent } from './password-reset/password-reset.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { SpinnerComponent } from './spinner/spinner.component'
import { MainSectionComponent } from './main-section/main-section.component'
import { SettingsComponent } from './settings/settings.component'
import { TabsComponent } from './tabs/tabs.component'
import { TabComponent } from './tab/tab.component'
import { PersonalDataComponent } from './personal-data/personal-data.component'
import { PasswordChangeComponent } from './password-change/password-change.component'
import { AccountOptionsComponent } from './account-options/account-options.component'

registerLocaleData(localeRu, 'ru')

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ScheduleComponent,
		CalendarComponent,
		OrganizerComponent,
		MomentPipe,
		ResultComponent,
		QuizListComponent,
		QuizComponent,
		QuizCreateComponent,
		QuizManagementComponent,
		QuestionCreateComponent,
		ArticlesComponent,
		ArticleCreateComponent,
		BooksComponent,
		BooksCreateComponent,
		BookComponent,
		SidebarComponent,
		ToolbarComponent,
		ClickOutsideDirective,
		ArticleComponent,
		PasswordForgotComponent,
		PasswordResetComponent,
		SpinnerComponent,
		MainSectionComponent,
		SettingsComponent,
		TabsComponent,
		TabComponent,
		PersonalDataComponent,
		PasswordChangeComponent,
		AccountOptionsComponent
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
		MatRadioModule,
		InfiniteScrollModule
	],
	providers: [{ provide: LOCALE_ID, useValue: 'ru' }, httpInterceptorProviders],
	bootstrap: [AppComponent],
	entryComponents: [
		QuizCreateComponent,
		QuestionCreateComponent,
		ArticleCreateComponent,
		BooksCreateComponent,
		PasswordChangeComponent
	]
})
export class AppModule {}
