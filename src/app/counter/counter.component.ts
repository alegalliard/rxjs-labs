import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap, map, scan } from 'rxjs/operators';
import { strictEqual } from 'assert';

/*
Objetivos:
1. não devemos mutar nenhum dado!
2. deve separar as ações que manipulam o estado dos efeitos colaterais
3. deve aumentar o contador quando clicar no botão add
4. deve subtrair o contador quando clicar no botão sub
5. deve resetar o contador quando clicar no botão reset
6. deve iniciar o contador somando um a cada segundo quando clicar no botão start
7. deve pausar o contador quando clicar no botão pause
*/

enum Action {
  Start,
  Pause,
  Reset,
  Add,
  Subtract,
}

interface AppState {
  count: number,
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  private initialState: AppState = {
    count: 0,
  };

  actionType = Action;
  actions$ = new BehaviorSubject(Action.Reset);

  state$: Observable<AppState> = this.actions$.pipe(
    tap(a => console.log(Action[a])),
    scan((state, action) => {
      switch(action) {
        case (Action.Add):
          return { count: state.count +1 }
        case (Action.Subtract):
          return { count: state.count -1 }
        case (Action.Reset):
          return { count: 0 }
        default: return state;
      }
      
    }, {...this.initialState}),
  );
}
