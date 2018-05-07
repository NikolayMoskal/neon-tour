import {Injectable} from '@angular/core';
import {AppConfig} from '../app.config';

declare var require: any;

@Injectable()
export class RssService {
  constructor() {
  }

  loadNews(): any {
    const Feed = require('rss-to-json');
    let result: any = {};
    Feed.load(AppConfig.RSS_CHANNEL_URL, function (err, rss) {
      result = Object.assign(result, rss);
    });
    return result;
  }
}
