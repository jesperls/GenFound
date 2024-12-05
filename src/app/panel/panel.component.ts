import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from './panel.interface';

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

  constructor(private http: HttpClient) {}

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

  loadChapter(location: string) {
    if (location) {
      if (!this.isGoingBack && this.chapterLocation !== location) {
        this.history.push(this.chapterLocation);
      }
      this.isGoingBack = false;
      const headers = new HttpHeaders({
        'Cache-Control': 'public, max-age=3600',
        'Pragma': 'cache'
      });
      this.http.get<Data>(`/assets/locations/${location}.json`, { headers }).subscribe(response => {
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
