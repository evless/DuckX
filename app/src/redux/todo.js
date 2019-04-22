const initialState = []

export const addTodo = payload => ({
  type: 'ADD_TODO',
  payload
})

export default function todo(state = initialState, action) {
  if (action.type === 'ADD_TODO') {
    return [
      ...state,
      action.payload
    ]
  }

  if (action.type === 'FICTION_TODO') {
    return state;
  }

  return state
}
