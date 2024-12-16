import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { ObsidianComponent } from './obsidian/obsidian.component';

const routes: Routes = [
  { path: 'chapters/:chapterLocation', component: PanelComponent },
  { path: 'alphabet', component: AlphabetComponent },
  { path: 'obsidian/:chapter', component: ObsidianComponent },
  { path: '', redirectTo: '/chapters/1-0', pathMatch: 'full' },
  { path: '**', redirectTo: '/chapters/1-0' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
