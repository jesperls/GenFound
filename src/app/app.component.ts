import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GenFound';
  selectedChapter: string = '1-0';
  showAlphabet: boolean = false;

  constructor(private http: HttpClient) {}

  selectChapter(chapter: string) {
    this.showAlphabet = false;
    this.selectedChapter = chapter;
  }

  selectAlphabet() {
    this.selectedChapter = '';
    this.showAlphabet = true;
  }
}
