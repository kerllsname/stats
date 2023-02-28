import './App.css';

import { Aside } from './components/aside/aside';
import { Home } from './components/main/home';

function App() {
  return (
    <div className="app">
      <Aside />
      <Home />
    </div>
  );
}

export default App;
