import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AnalyticsService } from '../services';

@Component({
  selector: 'app-obsidian',
  templateUrl: './obsidian.component.html',
  styleUrls: ['./obsidian.component.css'],
})
export class ObsidianComponent implements OnInit {
  obsidianUrl: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((qParams) => {
      const chapter = qParams['chapter'] || '1';
      const url = `/assets/Obsidian/Chapter${chapter}/Chapter${chapter}.html`;
      this.obsidianUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.analyticsService.trackEvent(
        'OBSIDIAN_CLICKED',
        `Obsidian Chapter ${chapter} clicked`,
        'Obsidian'
      );
    });
  }
}
