import { Component, OnInit } from '@angular/core'
import { News, NewsService } from '../shared/services/news.service'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'news-single',
	templateUrl: './news-single.component.html',
	styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit {
	id: number
	news: News

	constructor(
		private newsService: NewsService,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params['id']
		this.getBook(this.id)
	}

	getBook(id: number) {
		this.newsService.getNews(id).subscribe(response => {
			this.title.setTitle('Новости: ' + response.title)
			this.news = response
		})
	}

	// Getters
	get imgUrl() {
		return 'http://localhost:8080/img/'
	}
}
