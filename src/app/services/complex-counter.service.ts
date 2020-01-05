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

export enum ComplexCounterActionType {
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

export interface ComplexCounterState {
  count: number,
}

export interface ComplexCounterAction {
  actionType: ComplexCounterActionType,
  payload?: any,
}

const initialState: ComplexCounterState = {
  count: 0,
};

@Injectable({
  providedIn: 'root'
})
export class ComplexCounterService {

  private actions$ = new BehaviorSubject<ComplexCounterAction>({
    actionType: ComplexCounterActionType.Reset
  });

  timerCount$ = this.actions$.pipe(
    filter(({actionType}) =>
      actionType === ComplexCounterActionType.CountUp ||
      actionType === ComplexCounterActionType.Pause),
    distinctUntilKeyChanged('actionType'),
    switchMap(({actionType}) =>
      actionType === ComplexCounterActionType.CountUp ? interval(1000) : NEVER),
    mapTo(this.buildAction(ComplexCounterActionType.Add)),
  )

  state$: Observable<ComplexCounterState> = merge(
    this.actions$,
    this.timerCount$,
  ).pipe(
    scan((state: ComplexCounterState, { actionType, payload }: ComplexCounterAction) => {
      switch (actionType) {
        case ComplexCounterActionType.Add:
          return { ...state, count: state.count + 1 };
        case ComplexCounterActionType.Subtract:
          return { ...state, count: state.count - 1 };
        case ComplexCounterActionType.Reset:
          return { ...initialState };
      }
      return state;
    }, { ...initialState }),
  );

  dispatch(actionType: ComplexCounterActionType, payload?: any) {
    this.actions$.next(this.buildAction(actionType, payload));
  }

  private buildAction(actionType: ComplexCounterActionType, payload?: any): ComplexCounterAction {
    return {
      actionType,
      payload,
    };
  }
}
