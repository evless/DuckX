import React, { useContext, useState, useEffect } from 'react';
import { Context } from './';

export default function connect(
  mapStateToProp = () => {},
  mapDispatchToProps = () => {},
  // Можно указать ключи, на которые надо подписаться, иначе вызываться ререндер будет
  // При любых изменениях стора
  stateFields = [],
) {
  return (WrappedComponent) => {
    return (props) => {
      const store = useContext(Context)
      const [state, changeState] = useState({})
  
      useEffect(function() {
        return store.subscribe((changedStateFields) => {
          // Тут проверяем ключи из connect'a и которые изменились в сторе
          // Если хоть один совпадает, то вызываем ререндер иначе ничего не делаем
          const someChangedStateFields = stateFields.length > 0 ?
            changedStateFields.some(field => stateFields.includes(field)) :
            true;

          if (someChangedStateFields) {
            changeState({})
          }
        });
      }, [])
      
      // Используем memo для сохранения значений
      // И вызываем изменение через useState и подписку на стор
      const memoz = React.useMemo(function() {
        const state = store.getState();
        const data = mapStateToProp(state)
  
        data.actions = mapDispatchToProps(store.dispatch)
        console.log('connect data')
        return data;
      }, [state]);
  
      return React.createElement(WrappedComponent, {
        ...memoz,
        ...props,
      })
    }
  }
}
