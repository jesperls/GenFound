import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { AnalyticsService } from '../services';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
})
export class AlphabetComponent implements AfterViewInit {
  text: string = '';

  @ViewChild('textArea') textArea!: ElementRef;
  @ViewChild('symbols') symbols!: ElementRef;

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit() {
    this.adjustTextAreaHeight();
  }

  addCharacter(char: string) {
    this.text += char;
    this.adjustTextAreaHeight();
  }

  deleteCharacter() {
    this.text = this.text.slice(0, -1);
    this.adjustTextAreaHeight();
  }

  clearText() {
    this.text = '';
    this.adjustTextAreaHeight();
  }

  transformToUppercase(value: string) {
    this.text = value.toUpperCase();
    this.adjustTextAreaHeight();
  }

  addNewLine() {
    this.text += '\n';
    this.adjustTextAreaHeight();
  }

  downloadImage() {
    html2canvas(this.symbols.nativeElement).then(canvas => {
      const link = document.createElement('a');
      link.download = 'text.png';
      link.href = canvas.toDataURL();
      link.click();
      this.analyticsService.trackEvent('IMAGE_DOWNLOADED', 'Image downloaded', 'Alphabet');
    });
  }

  adjustTextAreaHeight() {
    const textArea = this.textArea.nativeElement;
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
