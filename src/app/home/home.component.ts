import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RssService} from '../service/rss.service';
import {News} from '../model/news';

@Component({
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RssService]
})
export class HomeComponent implements OnInit {
  news: News;

  constructor(private titleService: Title,
              private rss: RssService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Туристическое агентство "Neon-Tour" - Главная страница');
    this.news = this.rss.loadNews();
  }

  timestampToDateString(ts: number): string {
    return new Date(ts).toLocaleDateString() + ' ' + new Date(ts).toLocaleTimeString();
  }
}
