import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AnalyticsService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GenFound';
  selectedChapter: string = '1-0';
  showAlphabet: boolean = false;
  selectedMain: string = '';
  obsidianUrl: SafeResourceUrl = '';

  constructor(private analyticsService: AnalyticsService, private sanitizer: DomSanitizer) {}

  selectMain(option: string) {
    this.selectedMain = option;
    this.selectedChapter = '';
    this.showAlphabet = option === 'Alphabet';
    this.obsidianUrl = '';
    this.analyticsService.trackEvent('MAIN_CLICKED', `${option} clicked`, 'Main');
  }

  selectChapter(chapter: string) {
    if (this.selectedMain === 'Chapters') {
      this.selectedChapter = chapter;
      this.showAlphabet = false;
      this.analyticsService.trackEvent('CHAPTER_CLICKED', `Chapter ${chapter} clicked`, 'Chapter');
    } else if (this.selectedMain === 'Obsidian') {
      const url = `assets/Obsidian/Chapter${chapter}/Chapter${chapter}.html`;
      this.obsidianUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.analyticsService.trackEvent('OBSIDIAN_CLICKED', `Obsidian Chapter ${chapter} clicked`, 'Obsidian');
    }
  }

  selectAlphabet() {
    this.selectedChapter = '';
    this.showAlphabet = true;
    this.analyticsService.trackEvent('ALPHABET_CLICKED', 'Alphabet clicked', 'Alphabet');
  }
}
