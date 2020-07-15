import { Component, OnInit, HostListener } from '@angular/core'
import { News, NewsService } from '../shared/news.service'
import { ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'

@Component({
	selector: 'app-news-single',
	templateUrl: './news-single.component.html',
	styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit {
	id: number
	news: News
	shouldSlide: boolean
	innerWidth: any

	constructor(
		private newsService: NewsService,
		private activatedRoute: ActivatedRoute,
		private title: Title
	) {}

	ngOnInit() {
		this.slideOnWidth()

		this.id = this.activatedRoute.snapshot.params['id']
		this.getBook(this.id)
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
