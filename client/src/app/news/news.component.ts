import { Component, OnInit } from '@angular/core'
import { NewsService, News } from '../shared/services/news.service'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { NewsCreateComponent } from 'src/app/news-create/news-create.component'
import { TokenService } from '../shared/services/token.service'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

@Component({
	selector: 'news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
	news: News[] = []
	authority: string
	scrollingNews: News[] = []
	scrollValue: number = 0
	isSpinning: boolean = false

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
			this.scrollValue = 0
			this.getNews()
		})
	}

	ngOnInit() {
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

	onScroll() {
		if (this.scrollingNews.length === this.news.length) return

		this.isSpinning = true

		this.scrollingNews = this.scrollingNews.concat(this.sliceNews())

		this.isSpinning = false

		this.scrollValue += 6
	}

	sliceNews() {
		return this.news.slice(this.scrollValue, this.scrollValue + 6)
	}

	getNews() {
		this.newsService.getAllNews().subscribe(response => {
			this.news = response.sort((a, b) => {
				return b.id - a.id
			})

			this.scrollingNews = this.news.slice(this.scrollValue, this.scrollValue + 6)
			this.scrollValue += 6
		})
	}

	deleteNews(news: News) {
		this.newsService.delete(news).subscribe(() => {
			this.news = this.news.filter(n => n.id !== news.id)

			this.scrollValue = 0
			this.scrollingNews = this.sliceNews()
			this.scrollValue += 4
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
