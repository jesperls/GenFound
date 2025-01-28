import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { ObsidianComponent } from './obsidian/obsidian.component';

const routes: Routes = [
  { path: 'chapters', component: PanelComponent },
  { path: 'alphabet', component: AlphabetComponent },
  { path: 'obsidian', component: ObsidianComponent },
  { path: '', redirectTo: '/chapters', pathMatch: 'full' },
  { path: '**', redirectTo: '/chapters' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
