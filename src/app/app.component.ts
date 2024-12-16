import { Component } from '@angular/core';
import { AnalyticsService } from './services';
import { HistoryService } from './services/history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GenFound';
  selectedMain: string = '';

  constructor(private analyticsService: AnalyticsService, private historyService: HistoryService) {}
  selectMain(option: string) {
    if (this.selectedMain === option) {
      this.selectedMain = '';
    } else {
      this.selectedMain = option;
    }
    this.analyticsService.trackEvent('MAIN_CLICKED', `${option} clicked`, 'Main');
  }

  navigate() {
    this.selectedMain = '';
    this.historyService.clear();
  }
}
