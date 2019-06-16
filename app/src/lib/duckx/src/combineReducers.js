export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  const finalReducersKeys = Object.keys(finalReducers)

  return function combination(state = {}, action) {
    // Тут сохраняем ключи, которые поменялись в сторе и отдаем их обратно
    const listOfChanges = [];
    const nextState = {}
    for (let i = 0; i < finalReducersKeys.length; i++) {
      const key = finalReducersKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      
      if (typeof nextStateForKey === 'undefined') {
        throw new Error('New state is undefined.')
      }

      nextState[key] = nextStateForKey
      if (nextStateForKey !== previousStateForKey) {
        listOfChanges.push(key)
      }
    }

    return {
      listOfChanges,
      state: Boolean(listOfChanges.length) ? nextState : state
    }
  }
}
