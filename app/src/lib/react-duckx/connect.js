import React, { useContext, useState, useLayoutEffect } from 'react';
import { Context } from './';

export default function connect(
  mapStateToProp = () => {},
  mapDispatchToProps = () => {},
) {
  return (WrappedComponent) => {
    return (props) => {
      const store = useContext(Context)
      const [state, changeState] = useState({})
  
      useLayoutEffect(function() {
        return store.subscribe(() => changeState({}));
      }, [])
      
      // Используем memo для сохранения значений
      // И вызываем изменение через useState и подписку на стор
      const memoz = React.useMemo(function() {
        const state = store.getState();
        const data = mapStateToProp(state)
  
        data.actions = mapDispatchToProps(store.dispatch)
        
        console.info(`Change store`)

        return data;
      }, [state]);
  
      return React.createElement(WrappedComponent, {
        ...memoz,
        ...props,
      })
    }
  }
}
