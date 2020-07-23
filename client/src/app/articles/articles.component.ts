import { Component, OnInit } from '@angular/core'
import { ArticleService, Article } from '../shared/services/article.service'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { ArticleCreateComponent } from 'src/app/article-create/article-create.component'
import { TokenService } from '../shared/services/token.service'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'

@Component({
	selector: 'articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
	articles: Article[] = []
	authority: string
	scrollingArticles: Article[] = []
	scrollValue: number = 0
	isSpinning: boolean = false

	constructor(
		private articleService: ArticleService,
		private dialog: MatDialog,
		private token: TokenService,
		private title: Title,
		private router: Router
	) {
		this.title.setTitle('Статьи')

		this.articleService.listen().subscribe(response => {
			console.log(response)
			this.scrollValue = 0
			this.getArticles()
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

		this.getArticles()
	}

	onScroll() {
		if (this.scrollingArticles.length === this.articles.length) return

		this.isSpinning = true

		this.scrollingArticles = this.scrollingArticles.concat(this.sliceArticles())

		this.isSpinning = false

		this.scrollValue += 6
	}

	sliceArticles() {
		return this.articles.slice(this.scrollValue, this.scrollValue + 6)
	}

	getArticles() {
		this.articleService.getAllArticles().subscribe(response => {
			this.articles = response.sort((a, b) => {
				return b.id - a.id
			})

			this.scrollingArticles = this.articles.slice(this.scrollValue, this.scrollValue + 6)
			this.scrollValue += 6
		})
	}

	deleteArticle(article: Article) {
		this.articleService.delete(article).subscribe(() => {
			this.articles = this.articles.filter(a => a.id !== article.id)

			this.scrollValue = 0
			this.scrollingArticles = this.sliceArticles()
			this.scrollValue += 4
		})
	}

	toArticle(id: number) {
		this.router.navigate([`articles/${id}`])
	}

	onAdd() {
		const dialogConfig = new MatDialogConfig()
		dialogConfig.disableClose = true
		dialogConfig.autoFocus = false
		dialogConfig.panelClass = 'custom-dialog-container'
		this.dialog.open(ArticleCreateComponent, dialogConfig)
	}

	// Getters
	get imgUrl() {
		return 'http://localhost:8080/img/'
	}
}
