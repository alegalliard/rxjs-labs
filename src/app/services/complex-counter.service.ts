import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, interval, NEVER, Observable, defer } from 'rxjs';
import { mapTo, startWith, scan, pluck, distinctUntilKeyChanged, map, switchMap, tap, withLatestFrom, shareReplay, filter, mergeMap } from 'rxjs/operators';

/*
Objetivos:
1. deve usar o count diff como valor de referencia para adicionar ou subtrair em tempo real
2. deve usar o count speed como velocidade de referencia para atualizar o contador em tempo real
3. deve ser possível alterar o valor do contador a qualquer momento usando o Set Count
4. deve ser possível iniciar o contador subtraindo números ao clicar no start down
*/

export enum CountActionType {
  CountUp,
  CountDown,
  UpdateCount,
  UpdateCountDiff,
  UpdateCountSpeed,
  Pause,
  Reset,
  Add,
  Subtract,
}

export interface CountState {
  count: number,
}

export interface CountAction {
  actionType: CountActionType,
  payload?: any,
}

const initialState: CountState = {
  count: 0,
};

@Injectable({
  providedIn: 'root'
})
export class ComplexCounterService {

  private actions$ = new BehaviorSubject<CountAction>({
    actionType: CountActionType.Reset
  });

  timerCount$ = this.actions$.pipe(
    filter(({actionType}) =>
      actionType === CountActionType.CountUp ||
      actionType === CountActionType.Pause),
    distinctUntilKeyChanged('actionType'),
    switchMap(({actionType}) =>
      actionType === CountActionType.CountUp ? interval(1000) : NEVER),
    mapTo(this.buildAction(CountActionType.Add)),
  )

  state$: Observable<CountState> = merge(
    this.actions$,
    this.timerCount$,
  ).pipe(
    scan((state: CountState, { actionType, payload }: CountAction) => {
      switch (actionType) {
        case CountActionType.Add:
          return { ...state, count: state.count + 1 };
        case CountActionType.Subtract:
          return { ...state, count: state.count - 1 };
        case CountActionType.Reset:
          return { ...initialState };
      }
      return state;
    }, { ...initialState }),
  );

  dispatch(actionType: CountActionType, payload?: any) {
    this.actions$.next(this.buildAction(actionType, payload));
  }

  private buildAction(actionType: CountActionType, payload?: any): CountAction {
    return {
      actionType,
      payload,
    };
  }
}
