import React, { useContext, useState, useLayoutEffect } from 'react';
import { Context } from './';

export default function connect(
  mapStateToProp = () => {},
  mapDispatchToProps = () => {},
) {
  return (WrappedComponent) => {
    return (props) => {
      const store = useContext(Context)
      const [state, changeState] = useState(() => {
        const data = mapStateToProp(store.getState());

        data.actions = mapDispatchToProps(store.dispatch)
        return data;
      })
  
      useLayoutEffect(function() {
        console.log('useLayoutEffect')
        return store.subscribe(() => {
          changeState((prevState) => {
            const newState = mapStateToProp(store.getState());
            newState.actions = mapDispatchToProps(store.dispatch)

            let needUpdate = false;

            for (const key in prevState) {
              if (prevState.hasOwnProperty(key) && key !== 'actions') {
                if (prevState[key] !== newState[key]) {
                  needUpdate = true;
                }
              }
            }

            if (needUpdate)
              return newState
            else
              return prevState
          })
        });
      }, []);

      return React.createElement(WrappedComponent, {
        ...state,
        ...props,
      })
    }
  }
}
