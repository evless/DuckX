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
    console.log('dispatch action', action)
    state = currentReducers(state, action)

    for (let i = 0; i < listeners.length; i++) {
      listeners[i]()
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
