function createStore(reducers) {
  if (typeof reducers !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }


  let currentReducers = reducers
  let state = {}
  let listeners = []
  
  function getState() {
    return state
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  function dispatch(action) {
    const result = currentReducers(state, action)
    
    // Проверка по ссылке, если ссылка не изменилась, то не вызываем подписки
    if (state !== result.state) {
      state = result.state;

      for (let i = 0; i < listeners.length; i++) {
        // Прокидываем в подписчики список ключей в сторе, которые поменялись
        listeners[i](result.listOfChanges)
      }
    }

    return action
  }

  dispatch({ type: '@@INIT' })

  return {
    getState,
    dispatch,
    subscribe,
  }
}

export default createStore
