import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  selectMain(option: string) {
    this.selectedMain = option;
    this.selectedChapter = '';
    this.showAlphabet = option === 'Alphabet';
    this.obsidianUrl = '';
  }

  selectChapter(chapter: string) {
    if (this.selectedMain === 'Chapters') {
      this.selectedChapter = chapter;
      this.showAlphabet = false;
    } else if (this.selectedMain === 'Obsidian') {
      const url = `assets/Obsidian/Chapter${chapter}/Chapter${chapter}.html`;
      this.obsidianUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  selectAlphabet() {
    this.selectedChapter = '';
    this.showAlphabet = true;
  }
}
