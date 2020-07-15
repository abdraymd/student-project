import { Component, OnInit, HostListener } from '@angular/core'
import { NewsService, News } from '../shared/news.service'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { NewsCreateComponent } from 'src/app/news-create/news-create.component'
import { TokenService } from '../auth/token.service'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
	news: News[] = []
	authority: string
	shouldSlide: boolean
	innerWidth: any

	constructor(
		private newsService: NewsService,
		private dialog: MatDialog,
		private token: TokenService,
		private title: Title,
		private router: Router
	) {
		this.title.setTitle('Новости')

		this.newsService.listen().subscribe(response => {
			console.log(response)
			this.getNews()
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

		this.getNews()
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

	getNews() {
		this.newsService.getAllNews().subscribe(response => {
			this.news = response.sort((a, b) => {
				return b.id - a.id
			})
		})
	}

	deleteNews(news: News) {
		this.newsService.delete(news).subscribe(response => {
			this.getNews()
		})
	}

	toOneNews(id: number) {
		this.router.navigate([`news/${id}`])
	}

	onAdd() {
		const dialogConfig = new MatDialogConfig()
		dialogConfig.disableClose = true
		dialogConfig.autoFocus = false
		dialogConfig.panelClass = 'custom-dialog-container'
		this.dialog.open(NewsCreateComponent, dialogConfig)
	}

	// Getters
	get imgUrl() {
		return 'http://localhost:8080/img/'
	}
}
