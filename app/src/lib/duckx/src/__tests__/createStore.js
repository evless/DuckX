import createStore from '../createStore';

const reducerMock = (state, action) => {
    if (action.type === 'test') {
        return {
            ...state,
            test: action.payload,
        }
    }

    return state
}

describe('createStore', () => {
    it('returns error if attr clean', () => {
        try {
            createStore()
        } catch (error) {
            expect(error.message).toEqual('Expected the reducer to be a function.')   
        }
    });

    it('calls subscribe', () => {
        const store = createStore(reducerMock)
        const handler = jest.fn()

        store.subscribe(handler);

        store.dispatch({ type: 'test', payload: 'test string' })

        expect(handler).toHaveBeenCalled()
    })
})