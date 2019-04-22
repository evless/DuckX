const initialState = []
const ADD_OFFER = 'ADD_OFFER';

export const addOffer = payload => ({
  type: ADD_OFFER,
  payload
})

export default function offer(state = initialState, action) {
  if (action.type === ADD_OFFER) {
    return [
      ...state,
      action.payload
    ]
  }

  return state
}
