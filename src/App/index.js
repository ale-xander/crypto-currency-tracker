import React from 'react';
import './App.css';

import AppLayout from './AppLayout';
import NavBar from './NavBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings'

function App() {
  return (
  <AppLayout>
    <AppProvider>
      <NavBar/>
        <Settings />
    </AppProvider>
  </AppLayout>
  );
}

export default App;
