import React from 'react';
import './App.css';

import AppLayout from './AppLayout';
import NavBar from './NavBar';
import {AppProvider} from './AppProvider'

function App() {
  return (
  <AppLayout>
    <AppProvider>
      <NavBar/>
        hello world.
    </AppProvider>
  </AppLayout>
  );
}

export default App;
