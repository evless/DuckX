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

    it('returns clean state', () => {
        const store = createStore(reducerMock)

        expect(store.getState()).toEqual({})
    });

    it('checks dispatch', () => {
        const store = createStore(reducerMock)

        store.dispatch({ type: 'test', payload: 'test string' })

        expect(store.getState()).toEqual({ test: 'test string' })
    });

    it('calls subscribe', () => {
        const store = createStore(reducerMock)
        const handler = jest.fn()

        store.subscribe(handler);

        store.dispatch({ type: 'test', payload: 'test string' })

        expect(handler).toHaveBeenCalled()
    })

    it('subscribe returns listOfChanges', () => {
        const store = createStore(reducerMock)
        const handler = (list) => expect(list).toEqual(undefined)

        store.subscribe(handler);

        store.dispatch({ type: 'test', payload: 'test string' })
    })

    it("does't call subscribe", () => {
        const store = createStore(reducerMock)
        const subscribeHandler = jest.fn()

        store.subscribe(subscribeHandler);

        store.dispatch({ type: 'another test' })

        expect(subscribeHandler).not.toHaveBeenCalled()
    })

    it('calls unsubscribe', () => {
        const store = createStore(reducerMock)
        const subscribeHandler = jest.fn()

        store.subscribe(subscribeHandler);
        store.unsubscribe(subscribeHandler);

        store.dispatch({ type: 'test', payload: 'test string' })

        expect(subscribeHandler).not.toHaveBeenCalled()
    })
})