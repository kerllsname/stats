import React, { useReducer } from 'react';

import './App.css';

import { Aside } from './components/aside/aside';
import { Home } from './components/main/home';

import {
  ContextApp,
  initialState,
  playerStatReducer,
} from './components/reducer/reducer';

function App() {
  const [state, dispatch] = useReducer(playerStatReducer, initialState);

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      <div className="app">
        <Aside />
        <Home />
      </div>
    </ContextApp.Provider>
  );
}

export default App;
