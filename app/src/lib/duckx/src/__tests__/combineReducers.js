import combineReducers from '../combineReducers';

const todo = (state = {}, action) => {
    if (action.type === 'test') {
        return {
            ...state,
            ...action.payload,
        }
    }

    return state
}

describe('combineReducers', () => {
    it('returns function', () => {
        const reducers = combineReducers({ todo })

        expect(typeof reducers).toEqual('function')
    })

    it('returns old state', () => {
        const reducers = combineReducers({ todo })
        const state = {
            todo: {}
        };

        const newState = reducers(state, { type: 'another test' })

        expect(state).toEqual(newState)
    })

    it('returns new state', () => {
        const reducers = combineReducers({ todo })
        const state = {
            todo: {}
        };

        const newState = reducers(state, { type: 'test', payload: { value: 'orange' } })

        expect({
            todo: {
                value: 'orange'
            }
        }).toEqual(newState)
    })

    it('returns error is reducer returns undefined', () => {
        const reducers = combineReducers({ test: () => undefined })

        try {
            reducers({}, { type: 'test' })
        } catch (error) {
            expect(error.message).toEqual('New state is undefined.')
        }
    })
})
