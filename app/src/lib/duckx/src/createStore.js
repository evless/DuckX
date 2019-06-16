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

  function unsubscribe(listener) {
    const index = listeners.findIndex(item => item === listener)
    listeners.splice(index, 1)
  }

  function dispatch(action) {
    const newState = currentReducers(state, action)
    
    // Проверка по ссылке, если ссылка не изменилась, то не вызываем подписки
    if (state !== newState) {
      state = newState;

      for (let i = 0; i < listeners.length; i++) {
        listeners[i]()
      }
    }

    return action
  }

  dispatch({ type: '@@INIT' })

  return {
    getState,
    dispatch,
    subscribe,
    unsubscribe,
  }
}

export default createStore
