import React from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
