import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './panel.interface';
import { AnalyticsService } from '../services';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnChanges {
  @Input() chapterLocation: string = '1-0';
  data!: Data;
  history: string[] = [];
  isGoingBack: boolean = false;

  constructor(private analyticsService: AnalyticsService, private http: HttpClient) {}

  ngOnInit() {
    this.loadChapter(this.chapterLocation);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chapterLocation'] && !changes['chapterLocation'].firstChange) {
      this.loadChapter(this.chapterLocation);
      this.history = [];
    }
  }

  getTextWithoutMarkers(text: string): string {
    return text.replace(/\^\d+|\^media/g, '').toUpperCase();
  }

  getMediaType(address: string): string {
    const extension = address.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'image';
      case 'mp4':
        return 'video';
      case 'mp3':
      case 'wav':
        return 'audio';
      default:
        return 'unknown';
    }
  }

  loadChapter(location: string) {
    if (location) {
      if (!this.isGoingBack && this.chapterLocation !== location) {
        this.history.push(this.chapterLocation);
        this.analyticsService.trackEvent('CHAPTER_LOADED', `Chapter ${location} loaded`, 'Chapter');
      }
      this.isGoingBack = false;
      this.http.get<Data>(`/assets/locations/${location}.json`).subscribe(response => {
        this.data = response;
        this.chapterLocation = location;
      });
    }
  }

  goBack() {
    if (this.history.length > 0) {
      const previousLocation = this.history.pop();
      if (previousLocation) {
        this.isGoingBack = true;
        this.loadChapter(previousLocation);
      }
    }
  }
}
