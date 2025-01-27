import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './panel.interface';
import { AnalyticsService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  chapterLocation: string = '1-0';
  data!: Data;

  constructor(
    private analyticsService: AnalyticsService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const location = params['chapterLocation'];
      this.chapterLocation = location;
      if (location) {
        this.loadChapter(location);
      }
    });
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
        return address ? 'text' : 'unknown';
    }
  }

  getAnswers(response: any): Array<{ text: string; location?: string }> {
    const answers: Array<{ text: string; location?: string }> = [];
    for (let i = 1; i <= 10; i++) {
      const textKey = `answer${i}`;
      const locationKey = `answer${i}Location`;
      const text = response[textKey]?.trim();
      if (text) {
        answers.push({ text, location: response[locationKey] });
      }
    }
    return answers;
  }

  loadChapter(location: string, buttonClick?: boolean) {
    if (buttonClick) {
      this.historyService.add(this.chapterLocation);
    }
    this.chapterLocation = location;
    this.analyticsService.trackEvent(
      'CHAPTER_LOADED',
      `Chapter ${location} loaded`,
      'Chapter'
    );
    this.http.get<Data>(`/assets/locations/${location}.json`).subscribe(response => {
      this.data = response;
      this.router.navigate(['/chapters', location]);
    });
  }

  goBack() {
    const previousLocation = this.historyService.pop();
    if (previousLocation) {
      this.loadChapter(previousLocation);
    } else {
      this.router.navigate(['/chapters', '1-0']);
    }
  }

  get hasHistory(): boolean {
    return this.historyService.hasHistory();
  }
}
