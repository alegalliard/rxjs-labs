import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CounterComponent } from './counter/counter.component';
import { ComplexCounterComponent } from './complex-counter/complex-counter.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', 
    redirectTo: '/star-wars-search',
    data: {
      title: 'Inicial'
    }
  },
  { path: 'star-wars-search', 
    component: SearchComponent, 
    data: {
      title: 'Star Wars Typeahead Search'
    } 
},
  { path: 'counter', 
    component: CounterComponent,
    data: {
      title: 'Counter'
    } 
  },
  { path: 'complex-counter', 
    component: ComplexCounterComponent,
    data: {
      title: 'Complex Counter'
    } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
