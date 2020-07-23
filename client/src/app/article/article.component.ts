import { Component, OnInit } from '@angular/core'
import { Article, ArticleService } from '../shared/services/article.service'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
	id: number
	article: Article

	constructor(
		private articleService: ArticleService,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params['id']
		this.getArticle(this.id)
	}

	getArticle(id: number) {
		this.articleService.getArticle(id).subscribe(response => {
			this.title.setTitle(response.title)
			this.article = response
		})
	}

	// Getters
	get imgUrl() {
		return 'http://localhost:8080/img/'
	}
}
