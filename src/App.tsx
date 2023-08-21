import React from 'react';

import { Route, Routes } from 'react-router-dom';

import './App.css';

import MainPage from './Components/MainPage/MainPage';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
