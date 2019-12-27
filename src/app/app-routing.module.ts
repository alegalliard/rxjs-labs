import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CounterComponent } from './counter/counter.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/star-wars-search' },
  { path: 'star-wars-search', component: SearchComponent },
  { path: 'counter', component: CounterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
