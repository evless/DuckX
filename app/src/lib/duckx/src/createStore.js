import { Subject }  from 'rxjs';
import { startWith, scan, distinctUntilChanged, shareReplay } from 'rxjs/operators';


export default function createStore(reducers, initialState) {
  const action$ = new Subject();
  const state$ = action$
    .pipe(
      startWith(initialState),
      scan(reducers),
      distinctUntilChanged(),
      shareReplay()
    )

  const dispatch = action => action$.next(action)

  return {
    dispatch,
    subscribe: state$.subscribe.bind(state$),
    action$,
  }
}