import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private history: string[] = [];

  add(location: string) {
    if (this.history[this.history.length - 1] !== location) {
      this.history.push(location);
    }
  }

  pop(): string | undefined {
    return this.history.pop();
  }

  clear() {
    this.history = [];
  }

  hasHistory(): boolean {
    return this.history.length > 0;
  }

  getHistory(): string[] {
    return this.history;
  }
}
